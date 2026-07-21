#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';

const [outputFile, origin = 'https://ohiovalleylandpartners.com', mode = 'production'] = process.argv.slice(2);
if (!outputFile) {
  throw new Error('Usage: node scripts/live-site-audit.mjs <output-file> [origin] [preview|production]');
}

const canonicalOrigin = 'https://ohiovalleylandpartners.com';
const errors = [];
const warnings = [];

function assert(condition, message) {
  if (!condition) errors.push(message);
}

function firstMatch(input, expression) {
  return input.match(expression)?.[1] || '';
}

function decodeHtml(value) {
  return value.replaceAll('&amp;', '&').replaceAll('&quot;', '"');
}

function localPath(value, currentPath = '/') {
  try {
    const parsed = new URL(decodeHtml(value), origin + currentPath);
    if (parsed.origin !== new URL(origin).origin) return null;
    return parsed.pathname.replace(/\/+$/, '') || '/';
  } catch {
    return null;
  }
}

async function request(pathname, options = {}) {
  const started = performance.now();
  const response = await fetch(origin + pathname, { redirect: 'manual', ...options });
  const durationMs = performance.now() - started;
  return { response, durationMs };
}

async function mapLimit(values, limit, mapper) {
  const results = new Array(values.length);
  let cursor = 0;
  async function worker() {
    while (cursor < values.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await mapper(values[index], index);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, values.length) }, worker));
  return results;
}

const sitemapResult = await request('/sitemap.xml');
assert(sitemapResult.response.status === 200, 'sitemap.xml did not return 200');
const sitemapXml = await sitemapResult.response.text();
const sitemapUrls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const sitemapPaths = sitemapUrls.map((url) => new URL(url).pathname.replace(/\/+$/, '') || '/');
assert(sitemapUrls.length > 0, 'Sitemap has no URLs');
assert(sitemapUrls.length === new Set(sitemapUrls).size, 'Sitemap has duplicate URLs');

const pages = await mapLimit(sitemapPaths, 8, async (pathname) => {
  const { response, durationMs } = await request(pathname);
  const html = await response.text();
  const canonical = decodeHtml(firstMatch(html, /<link\s+rel="canonical"\s+href="([^"]+)"/i));
  const ogUrl = decodeHtml(firstMatch(html, /<meta\s+property="og:url"\s+content="([^"]+)"/i));
  const robots = decodeHtml(firstMatch(html, /<meta\s+name="robots"\s+content="([^"]+)"/i)).toLowerCase();
  const expectedCanonical = pathname === '/' ? canonicalOrigin + '/' : canonicalOrigin + pathname;
  const xRobotsTag = response.headers.get('x-robots-tag') || '';

  assert(response.status === 200, 'Sitemap route did not return 200: ' + pathname + ' (' + response.status + ')');
  assert(canonical === expectedCanonical, 'Live canonical mismatch: ' + pathname + ' -> ' + canonical);
  assert(ogUrl === canonical, 'Live Open Graph URL mismatch: ' + pathname);
  assert(!robots.includes('noindex'), 'Sitemap page has meta noindex: ' + pathname);
  if (mode === 'production') {
    assert(!xRobotsTag.toLowerCase().includes('noindex'), 'Production sitemap page has X-Robots noindex: ' + pathname);
  } else {
    assert(xRobotsTag.toLowerCase().includes('noindex'), 'Preview is missing platform X-Robots noindex: ' + pathname);
  }

  return {
    pathname,
    status: response.status,
    durationMs: Math.round(durationMs),
    canonical,
    openGraphUrl: ogUrl,
    xRobotsTag: xRobotsTag || null,
    contentLength: Number(response.headers.get('content-length') || 0),
  };
});

const redirectLines = (await fs.readFile(path.resolve('public/_redirects'), 'utf8'))
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter((line) => line.startsWith('/'))
  .map((line) => {
    const [source, destination, status] = line.split(/\s+/);
    return { source, destination, expectedStatus: Number(status) };
  });
const redirects = [];
for (const rule of redirectLines) {
  const { response, durationMs } = await request(rule.source);
  const location = response.headers.get('location') || '';
  const destinationPath = localPath(location, rule.source);
  const acceptedStatus =
    rule.source === '/index.html'
      ? response.status === 301 || response.status === 308
      : response.status === rule.expectedStatus;
  assert(acceptedStatus, 'Redirect status mismatch: ' + rule.source + ' (' + response.status + ')');
  assert(destinationPath === rule.destination, 'Redirect destination mismatch: ' + rule.source + ' -> ' + location);
  const destination = await request(rule.destination);
  assert(destination.response.status === 200, 'Redirect target is not 200: ' + rule.destination);
  assert(![301, 302, 307, 308].includes(destination.response.status), 'Redirect chain found at ' + rule.destination);
  redirects.push({
    source: rule.source,
    status: response.status,
    location,
    targetStatus: destination.response.status,
    durationMs: Math.round(durationMs),
  });
}

const robotsResult = await request('/robots.txt');
const robotsText = await robotsResult.response.text();
assert(robotsResult.response.status === 200, 'robots.txt did not return 200');
assert(robotsText.includes('Sitemap: https://ohiovalleylandpartners.com/sitemap.xml'), 'robots.txt sitemap declaration is missing');
assert(!/Disallow:\s*\/sell-land|Disallow:\s*\/ohio-valley-guides|Disallow:\s*\/blog/i.test(robotsText), 'robots.txt blocks a public content network');

const noindexPaths = ['/member-mailer', '/investor-portal', '/property-uploads', '/properties/belmont-45-raw', '/p/k7m2x9q4'];
const noindexPages = [];
for (const pathname of noindexPaths) {
  const { response } = await request(pathname);
  const html = await response.text();
  const metaRobots = decodeHtml(firstMatch(html, /<meta\s+name="robots"\s+content="([^"]+)"/i)).toLowerCase();
  const headerRobots = (response.headers.get('x-robots-tag') || '').toLowerCase();
  assert(response.status === 200, 'Noindex route did not return 200: ' + pathname);
  assert(metaRobots.includes('noindex'), 'Noindex route lacks meta noindex: ' + pathname);
  assert(headerRobots.includes('noindex'), 'Noindex route lacks X-Robots noindex: ' + pathname);
  assert(!sitemapPaths.includes(pathname), 'Noindex route remains in sitemap: ' + pathname);
  noindexPages.push({ pathname, status: response.status, metaRobots, headerRobots });
}

const homeResult = await request('/');
const homeHtml = await homeResult.response.text();
const requiredSecurityHeaders = [
  'content-security-policy',
  'permissions-policy',
  'referrer-policy',
  'strict-transport-security',
  'x-content-type-options',
  'x-frame-options',
];
const securityHeaders = Object.fromEntries(
  requiredSecurityHeaders.map((name) => [name, homeResult.response.headers.get(name)]),
);
Object.entries(securityHeaders).forEach(([name, value]) => {
  assert(Boolean(value), 'Missing security header: ' + name);
});
assert(homeHtml.includes('G-7FQDXC8DVC'), 'GA4 measurement ID is missing from homepage');
assert(homeHtml.includes('widgets.leadconnectorhq.com'), 'GHL widget loader is missing from homepage');
assert(homeHtml.includes('tel:'), 'Phone fallback link is missing from homepage');
assert(homeHtml.includes('mailto:'), 'Email fallback link is missing from shared page output');

const assets = new Set();
for (const pathname of ['/', '/land', '/community', '/blog', '/ohio-valley-guides']) {
  const { response } = await request(pathname);
  const html = await response.text();
  for (const match of html.matchAll(/\s(?:src|href|poster)="([^"]+)"/gi)) {
    const assetPath = localPath(match[1], pathname);
    if (assetPath && /\.[a-z0-9]+$/i.test(assetPath)) assets.add(assetPath);
  }
}
const assetResults = await mapLimit([...assets], 8, async (pathname) => {
  const { response } = await request(pathname, { method: 'HEAD' });
  assert(response.status === 200, 'Live asset did not return 200: ' + pathname + ' (' + response.status + ')');
  return {
    pathname,
    status: response.status,
    cacheControl: response.headers.get('cache-control'),
    contentType: response.headers.get('content-type'),
  };
});

const canonicalOriginHeader = { Origin: canonicalOrigin, 'Content-Type': 'application/json' };
const formValidationResults = [];
for (const pathname of ['/api/seller', '/api/contact', '/api/investor-intake', '/api/property-upload']) {
  const { response } = await request(pathname, {
    method: 'POST',
    headers: canonicalOriginHeader,
    body: '{}',
  });
  assert(response.status === 403, 'Form endpoint did not require a Turnstile token: ' + pathname + ' (' + response.status + ')');
  formValidationResults.push({ pathname, missingSecurityTokenStatus: response.status });
}
const badOrigin = await request('/api/seller', {
  method: 'POST',
  headers: { Origin: 'https://example.invalid', 'Content-Type': 'application/json' },
  body: '{}',
});
assert(badOrigin.response.status === 403, 'Seller form endpoint did not reject a foreign origin');

const indexNowFile = '97803ac8eb1a4fb997336648f3d7eb26.txt';
const indexNowResult = await request('/' + indexNowFile);
assert(indexNowResult.response.status === 200, 'IndexNow key file did not return 200');
assert((await indexNowResult.response.text()).trim() === indexNowFile.replace('.txt', ''), 'IndexNow key file content mismatch');

const slashResult = await request('/about/');
assert([301, 308].includes(slashResult.response.status), 'Trailing-slash duplicate is not permanently redirected');
assert(localPath(slashResult.response.headers.get('location') || '', '/about/') === '/about', 'Trailing-slash redirect target is incorrect');
const queryResult = await request('/?utm_source=seo-release-qa');
const queryHtml = await queryResult.response.text();
assert(firstMatch(queryHtml, /<link\s+rel="canonical"\s+href="([^"]+)"/i) === canonicalOrigin + '/', 'Query-string page canonical is incorrect');
const missingResult = await request('/seo-release-qa-missing-route');
assert(missingResult.response.status === 404, 'Unknown route does not return 404');

const domainRedirects = [];
if (mode === 'production') {
  for (const url of ['http://ohiovalleylandpartners.com/about', 'https://www.ohiovalleylandpartners.com/about']) {
    const response = await fetch(url, { redirect: 'manual' });
    assert(response.status === 301, 'Canonical-domain redirect is not 301: ' + url);
    assert(response.headers.get('location') === canonicalOrigin + '/about', 'Canonical-domain redirect target mismatch: ' + url);
    domainRedirects.push({ url, status: response.status, location: response.headers.get('location') });
  }
}

const report = {
  auditedAt: new Date().toISOString(),
  origin,
  mode,
  passed: errors.length === 0,
  errors,
  warnings,
  counts: {
    sitemapUrls: sitemapPaths.length,
    pages200: pages.filter((page) => page.status === 200).length,
    redirects: redirects.length,
    noindexPagesChecked: noindexPages.length,
    assetsChecked: assetResults.length,
    formValidationEndpoints: formValidationResults.length,
  },
  pages,
  redirects,
  noindexPages,
  securityHeaders,
  assets: assetResults,
  formValidationResults,
  foreignOriginStatus: badOrigin.response.status,
  robots: {
    status: robotsResult.response.status,
    text: robotsText,
  },
  domainRedirects,
  trailingSlash: {
    status: slashResult.response.status,
    location: slashResult.response.headers.get('location'),
  },
  queryCanonical: firstMatch(queryHtml, /<link\s+rel="canonical"\s+href="([^"]+)"/i),
  missingRouteStatus: missingResult.response.status,
  indexNowKeyStatus: indexNowResult.response.status,
};

await fs.mkdir(path.dirname(path.resolve(outputFile)), { recursive: true });
await fs.writeFile(path.resolve(outputFile), JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify({
  passed: report.passed,
  counts: report.counts,
  errors: errors.length,
  outputFile: path.resolve(outputFile),
}, null, 2));
if (errors.length > 0) {
  errors.forEach((error) => console.error('ERROR: ' + error));
  process.exitCode = 1;
}
