#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';

const [outputFile, origin = 'https://ohiovalleylandpartners.com'] = process.argv.slice(2);
if (!outputFile) {
  throw new Error('Usage: node scripts/chrome-performance-audit.mjs <output-file> [origin]');
}

const pages = [
  ['homepage', '/'],
  ['sell-land', '/land'],
  ['community', '/community'],
  ['franklin-acquisition', '/sell-land/franklin-county-oh'],
];
const viewports = [
  ['desktop', { width: 1440, height: 1200, mobile: false }],
  ['mobile', { width: 390, height: 844, mobile: true }],
];
const runsPerPage = Number(process.env.OVLP_PERF_RUNS || 2);
const chromePort = Number(process.env.CHROME_DEBUG_PORT || 9223);

class CdpClient {
  constructor(url) {
    this.socket = new WebSocket(url);
    this.nextId = 1;
    this.pending = new Map();
    this.openPromise = new Promise((resolve, reject) => {
      this.socket.addEventListener('open', resolve, { once: true });
      this.socket.addEventListener('error', reject, { once: true });
    });
  }

  async open() {
    await this.openPromise;
    this.socket.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);
      if (!message.id) return;
      const pending = this.pending.get(message.id);
      if (!pending) return;
      this.pending.delete(message.id);
      if (message.error) pending.reject(new Error(JSON.stringify(message.error)));
      else pending.resolve(message.result);
    });
  }

  send(method, params = {}) {
    const id = this.nextId++;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.socket.send(JSON.stringify({ id, method, params }));
    });
  }

  close() {
    this.socket.close();
  }
}

async function createTarget() {
  const response = await fetch(
    'http://127.0.0.1:' + chromePort + '/json/new?' + encodeURIComponent('about:blank'),
    { method: 'PUT' },
  );
  if (!response.ok) throw new Error('Chrome target creation failed: ' + response.status);
  return response.json();
}

async function closeTarget(id) {
  const response = await fetch('http://127.0.0.1:' + chromePort + '/json/close/' + id);
  await response.text();
}

async function measure(route, viewport) {
  const target = await createTarget();
  const cdp = new CdpClient(target.webSocketDebuggerUrl);
  await cdp.open();
  await Promise.all([
    cdp.send('Page.enable'),
    cdp.send('Runtime.enable'),
    cdp.send('Network.enable'),
    cdp.send('Performance.enable'),
  ]);
  await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
  await cdp.send('Network.clearBrowserCache');
  await cdp.send('Emulation.setDeviceMetricsOverride', {
    width: viewport.width,
    height: viewport.height,
    deviceScaleFactor: 1,
    mobile: viewport.mobile,
    screenWidth: viewport.width,
    screenHeight: viewport.height,
  });
  await cdp.send('Page.addScriptToEvaluateOnNewDocument', {
    source: [
      'window.__ovlpLab = { lcp: 0, cls: 0, longTaskMs: 0 };',
      'new PerformanceObserver((list) => {',
      '  for (const entry of list.getEntries()) window.__ovlpLab.lcp = entry.startTime;',
      '}).observe({ type: "largest-contentful-paint", buffered: true });',
      'new PerformanceObserver((list) => {',
      '  for (const entry of list.getEntries()) {',
      '    if (!entry.hadRecentInput) window.__ovlpLab.cls += entry.value;',
      '  }',
      '}).observe({ type: "layout-shift", buffered: true });',
      'new PerformanceObserver((list) => {',
      '  for (const entry of list.getEntries()) window.__ovlpLab.longTaskMs += entry.duration;',
      '}).observe({ type: "longtask", buffered: true });',
    ].join('\n'),
  });

  await cdp.send('Page.navigate', { url: origin + route });
  await cdp.send('Runtime.evaluate', {
    expression: [
      'new Promise((resolve) => {',
      '  const done = () => setTimeout(resolve, 3500);',
      '  if (document.readyState === "complete") done();',
      '  else addEventListener("load", done, { once: true });',
      '}).then(() => document.fonts.ready).then(() => {',
      '  const navigation = performance.getEntriesByType("navigation")[0];',
      '  const resources = performance.getEntriesByType("resource");',
      '  const paints = Object.fromEntries(performance.getEntriesByType("paint").map((entry) => [entry.name, entry.startTime]));',
      '  return {',
      '    status: navigation?.responseStatus || 0,',
      '    ttfb: navigation?.responseStart || 0,',
      '    domContentLoaded: navigation?.domContentLoadedEventEnd || 0,',
      '    loadEvent: navigation?.loadEventEnd || 0,',
      '    fcp: paints["first-contentful-paint"] || 0,',
      '    lcp: window.__ovlpLab.lcp,',
      '    cls: window.__ovlpLab.cls,',
      '    longTaskMs: window.__ovlpLab.longTaskMs,',
      '    resourceCount: resources.length,',
      '    transferBytes: (navigation?.transferSize || 0) + resources.reduce((sum, entry) => sum + (entry.transferSize || 0), 0),',
      '    encodedBytes: (navigation?.encodedBodySize || 0) + resources.reduce((sum, entry) => sum + (entry.encodedBodySize || 0), 0),',
      '    scriptBytes: resources.filter((entry) => entry.initiatorType === "script").reduce((sum, entry) => sum + (entry.transferSize || 0), 0),',
      '    imageBytes: resources.filter((entry) => entry.initiatorType === "img").reduce((sum, entry) => sum + (entry.transferSize || 0), 0),',
      '  };',
      '})',
    ].join('\n'),
    awaitPromise: true,
    returnByValue: true,
  });
  const evaluated = await cdp.send('Runtime.evaluate', {
    expression: 'JSON.stringify((() => { const navigation = performance.getEntriesByType("navigation")[0]; const resources = performance.getEntriesByType("resource"); const paints = Object.fromEntries(performance.getEntriesByType("paint").map((entry) => [entry.name, entry.startTime])); return { status: navigation?.responseStatus || 0, ttfb: navigation?.responseStart || 0, domContentLoaded: navigation?.domContentLoadedEventEnd || 0, loadEvent: navigation?.loadEventEnd || 0, fcp: paints["first-contentful-paint"] || 0, lcp: window.__ovlpLab.lcp, cls: window.__ovlpLab.cls, longTaskMs: window.__ovlpLab.longTaskMs, resourceCount: resources.length, transferBytes: (navigation?.transferSize || 0) + resources.reduce((sum, entry) => sum + (entry.transferSize || 0), 0), encodedBytes: (navigation?.encodedBodySize || 0) + resources.reduce((sum, entry) => sum + (entry.encodedBodySize || 0), 0), scriptBytes: resources.filter((entry) => entry.initiatorType === "script").reduce((sum, entry) => sum + (entry.transferSize || 0), 0), imageBytes: resources.filter((entry) => entry.initiatorType === "img").reduce((sum, entry) => sum + (entry.transferSize || 0), 0) }; })())',
    returnByValue: true,
  });
  const cdpMetrics = await cdp.send('Performance.getMetrics');
  const metricMap = Object.fromEntries(cdpMetrics.metrics.map(({ name, value }) => [name, value]));
  const result = {
    ...JSON.parse(evaluated.result.value),
    taskDurationMs: (metricMap.TaskDuration || 0) * 1000,
    jsHeapUsedBytes: metricMap.JSHeapUsedSize || 0,
  };

  cdp.close();
  await closeTarget(target.id);
  return result;
}

function median(values) {
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

const samples = [];
for (const [viewportName, viewport] of viewports) {
  for (const [pageName, route] of pages) {
    for (let run = 1; run <= runsPerPage; run += 1) {
      const metrics = await measure(route, viewport);
      samples.push({ viewport: viewportName, page: pageName, route, run, ...metrics });
      console.log(viewportName + ' ' + pageName + ' run ' + run + ': LCP ' + Math.round(metrics.lcp) + 'ms, CLS ' + metrics.cls.toFixed(4));
    }
  }
}

const summaries = [];
for (const [viewportName] of viewports) {
  for (const [pageName, route] of pages) {
    const group = samples.filter((sample) => sample.viewport === viewportName && sample.page === pageName);
    const keys = [
      'ttfb',
      'domContentLoaded',
      'loadEvent',
      'fcp',
      'lcp',
      'cls',
      'longTaskMs',
      'resourceCount',
      'transferBytes',
      'encodedBytes',
      'scriptBytes',
      'imageBytes',
      'taskDurationMs',
      'jsHeapUsedBytes',
    ];
    const metrics = Object.fromEntries(keys.map((key) => [key, median(group.map((sample) => sample[key]))]));
    summaries.push({ viewport: viewportName, page: pageName, route, ...metrics });
  }
}

const report = {
  origin,
  capturedAt: new Date().toISOString(),
  browser: (await (await fetch('http://127.0.0.1:' + chromePort + '/json/version')).json()).Browser,
  runsPerPage,
  summaries,
  samples,
};
await fs.mkdir(path.dirname(path.resolve(outputFile)), { recursive: true });
await fs.writeFile(path.resolve(outputFile), JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify({ outputFile: path.resolve(outputFile), samples: samples.length }, null, 2));
