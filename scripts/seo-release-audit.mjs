#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const outDir = path.resolve(root, process.env.SEO_AUDIT_OUT_DIR || 'out');
const reportPath = path.resolve(
  root,
  process.env.SEO_AUDIT_OUTPUT || 'reports/seo-hardening-2026-07/generated-audit.json',
);
const baseUrl = 'https://ohiovalleylandpartners.com';

const errors = [];
const warnings = [];

function assert(condition, message) {
  if (!condition) errors.push(message);
}

function warn(condition, message) {
  if (!condition) warnings.push(message);
}

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

function routeFromHtml(filePath) {
  const relative = path.relative(outDir, filePath).replaceAll(path.sep, '/');
  if (relative === 'index.html') return '/';
  return '/' + relative.replace(/\.html$/, '');
}

function htmlFileForRoute(route) {
  if (route === '/') return path.join(outDir, 'index.html');
  const clean = route.replace(/^\/+|\/+$/g, '');
  const direct = path.join(outDir, clean + '.html');
  const nested = path.join(outDir, clean, 'index.html');
  if (fs.existsSync(direct)) return direct;
  if (fs.existsSync(nested)) return nested;
  return null;
}

function allMatches(input, expression, group = 1) {
  return [...input.matchAll(expression)].map((match) => match[group]);
}

function firstMatch(input, expression) {
  return input.match(expression)?.[1] || '';
}

function decodeHtml(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#x27;', "'")
    .replaceAll('&#39;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>');
}

function plainText(html) {
  return decodeHtml(
    html
      .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
      .replace(/<svg\b[\s\S]*?<\/svg>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim(),
  );
}

function canonicalForRoute(route) {
  return route === '/' ? baseUrl + '/' : baseUrl + route;
}

function normalizeInternalPath(rawValue, currentRoute) {
  const value = decodeHtml(rawValue).trim();
  if (
    !value ||
    value.startsWith('#') ||
    value.startsWith('mailto:') ||
    value.startsWith('tel:') ||
    value.startsWith('javascript:') ||
    value.startsWith('data:')
  ) {
    return null;
  }

  let url;
  try {
    url = new URL(value, canonicalForRoute(currentRoute));
  } catch {
    return null;
  }
  if (url.origin !== baseUrl) return null;
  const pathname = decodeURIComponent(url.pathname).replace(/\/+$/, '') || '/';
  return pathname === '/index.html' ? '/' : pathname;
}

function parseRedirects() {
  return read('public/_redirects')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'))
    .map((line) => {
      const [source, destination, status] = line.split(/\s+/);
      return { source, destination, status: Number(status) };
    });
}

function collectSchemaTypes(value, types = []) {
  if (!value || typeof value !== 'object') return types;
  if (typeof value['@type'] === 'string') types.push(value['@type']);
  if (Array.isArray(value)) {
    value.forEach((item) => collectSchemaTypes(item, types));
  } else {
    Object.values(value).forEach((item) => collectSchemaTypes(item, types));
  }
  return types;
}

assert(fs.existsSync(outDir), 'Build output directory is missing: ' + outDir);
assert(fs.existsSync(path.join(outDir, 'sitemap.xml')), 'Generated sitemap.xml is missing');
assert(fs.existsSync(path.join(outDir, 'robots.txt')), 'Generated robots.txt is missing');

const sitemapXml = fs.readFileSync(path.join(outDir, 'sitemap.xml'), 'utf8');
const sitemapUrls = allMatches(sitemapXml, /<loc>([^<]+)<\/loc>/g);
const sitemapLastmods = allMatches(sitemapXml, /<lastmod>([^<]+)<\/lastmod>/g);
const sitemapRoutes = sitemapUrls.map((url) => new URL(url).pathname.replace(/\/+$/, '') || '/');
const sitemapRouteSet = new Set(sitemapRoutes);

assert(sitemapUrls.length === new Set(sitemapUrls).size, 'Sitemap contains duplicate URLs');
assert(sitemapUrls.length === sitemapLastmods.length, 'Every sitemap URL must have one truthful lastmod');
assert(new Set(sitemapLastmods).size > 1, 'Sitemap must not assign one deployment date to every URL');
sitemapUrls.forEach((url) => {
  const parsed = new URL(url);
  assert(parsed.origin === baseUrl, 'Non-canonical sitemap origin: ' + url);
  assert(!parsed.search && !parsed.hash, 'Sitemap URL contains a query or fragment: ' + url);
});

const redirectRules = parseRedirects();
const localRedirects = redirectRules.filter((rule) => rule.source.startsWith('/'));
const redirectMap = new Map(localRedirects.map((rule) => [rule.source, rule]));
localRedirects.forEach((rule) => {
  assert(rule.status === 301, 'Redirect is not a permanent 301: ' + rule.source);
  assert(rule.source !== rule.destination, 'Self-redirect found: ' + rule.source);
  assert(!redirectMap.has(rule.destination), 'Redirect chain found: ' + rule.source + ' -> ' + rule.destination);
  assert(Boolean(htmlFileForRoute(rule.destination)), 'Redirect target is not a generated 200 route: ' + rule.destination);
  assert(!sitemapRouteSet.has(rule.source), 'Redirect source remains in sitemap: ' + rule.source);
});

const expectedRedirects = {
  '/blog/franklin-county-ohio-sell-vacant-land-2026': '/ohio-valley-guides/franklin-county-oh',
  '/blog/sell-vacant-land-geauga-county-ohio-2026': '/ohio-valley-guides/geauga-county-oh',
  '/blog/sell-vacant-land-delaware-county-ohio': '/ohio-valley-guides/delaware-county-oh',
};
Object.entries(expectedRedirects).forEach(([source, destination]) => {
  assert(redirectMap.get(source)?.destination === destination, 'Missing required redirect: ' + source);
});

const htmlFiles = walk(outDir).filter(
  (filePath) => filePath.endsWith('.html') && path.basename(filePath) !== '404.html',
);
const routeInventory = [];
const titles = new Map();
const descriptions = new Map();
const brokenInternalLinks = [];
const redirectingInternalLinks = [];
const brokenAssets = [];

for (const filePath of htmlFiles) {
  const route = routeFromHtml(filePath);
  const html = fs.readFileSync(filePath, 'utf8');
  const title = decodeHtml(firstMatch(html, /<title>([\s\S]*?)<\/title>/i));
  const description = decodeHtml(
    firstMatch(html, /<meta\s+name="description"\s+content="([^"]*)"/i),
  );
  const canonical = decodeHtml(
    firstMatch(html, /<link\s+rel="canonical"\s+href="([^"]+)"/i),
  );
  const ogUrl = decodeHtml(
    firstMatch(html, /<meta\s+property="og:url"\s+content="([^"]+)"/i),
  );
  const robots = decodeHtml(
    firstMatch(html, /<meta\s+name="robots"\s+content="([^"]+)"/i),
  ).toLowerCase();
  const noindex = robots.includes('noindex');
  const inSitemap = sitemapRouteSet.has(route);
  const h1Count = allMatches(html, /<h1\b[^>]*>/gi, 0).length;
  const ids = allMatches(html, /\sid="([^"]+)"/gi);
  const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
  const bodyText = plainText(firstMatch(html, /<body\b[^>]*>([\s\S]*?)<\/body>/i));

  assert(Boolean(title), 'Missing title: ' + route);
  assert(Boolean(description), 'Missing meta description: ' + route);
  assert(h1Count === 1, 'Expected one H1 on ' + route + ', found ' + h1Count);
  assert(duplicateIds.length === 0, 'Duplicate IDs on ' + route + ': ' + duplicateIds.join(', '));

  if (inSitemap) {
    const expectedCanonical = canonicalForRoute(route);
    assert(!noindex, 'Sitemap route is noindex: ' + route);
    assert(canonical === expectedCanonical, 'Canonical mismatch on ' + route + ': ' + canonical);
    assert(ogUrl === canonical, 'Open Graph URL does not match canonical on ' + route);
    titles.set(title, [...(titles.get(title) || []), route]);
    descriptions.set(description, [...(descriptions.get(description) || []), route]);
    warn(title.length <= 70, 'Long title (' + title.length + '): ' + route);
    warn(description.length >= 70 && description.length <= 180, 'Meta description length ' + description.length + ': ' + route);
  } else {
    assert(noindex, 'Generated public route is neither in sitemap nor noindex: ' + route);
  }

  assert(
    !/cash offer in 24 hours|offer within 24 hours|guaranteed offer|same-day offer|instant offer/i.test(bodyText),
    'Unverified offer-speed claim visible on ' + route,
  );
  assert(
    !/target keyword|seo keyword|primary phrase/i.test(bodyText),
    'Visible internal SEO note on ' + route,
  );

  const schemaScripts = allMatches(
    html,
    /<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi,
  );
  const schemas = [];
  schemaScripts.forEach((json, index) => {
    try {
      schemas.push(JSON.parse(json));
    } catch (error) {
      errors.push('Invalid JSON-LD on ' + route + ' script ' + (index + 1) + ': ' + error.message);
    }
  });
  const schemaTypes = collectSchemaTypes(schemas);
  if (route === '/') {
    assert(schemaTypes.includes('Organization'), 'Homepage Organization schema is missing');
    assert(schemaTypes.includes('WebSite'), 'Homepage WebSite schema is missing');
    assert(schemaTypes.includes('FAQPage'), 'Homepage visible FAQ schema is missing');
  }
  if (route.startsWith('/blog/')) {
    assert(schemaTypes.includes('Article'), 'Article schema is missing on ' + route);
    assert(schemaTypes.includes('BreadcrumbList'), 'Article breadcrumb schema is missing on ' + route);
  }
  if (route.startsWith('/sell-land/') || route.startsWith('/ohio-valley-guides/')) {
    assert(schemaTypes.includes('BreadcrumbList'), 'County breadcrumb schema is missing on ' + route);
    assert(schemaTypes.includes('FAQPage'), 'Visible county FAQ schema is missing on ' + route);
  }

  const imageTags = allMatches(html, /(<img\b[^>]*>)/gi);
  imageTags.forEach((tag) => {
    assert(/\salt=(?:"[^"]*"|'[^']*')/i.test(tag), 'Image missing alt attribute on ' + route);
  });

  const linkedValues = [
    ...allMatches(html, /\shref="([^"]+)"/gi),
    ...allMatches(html, /\ssrc="([^"]+)"/gi),
    ...allMatches(html, /\sposter="([^"]+)"/gi),
  ];
  const internalPaths = new Set();
  linkedValues.forEach((value) => {
    const internalPath = normalizeInternalPath(value, route);
    if (!internalPath) return;
    internalPaths.add(internalPath);

    if (redirectMap.has(internalPath)) {
      redirectingInternalLinks.push({ from: route, to: internalPath });
      return;
    }

    const extension = path.posix.extname(internalPath);
    if (extension) {
      const assetPath = path.join(outDir, internalPath.replace(/^\/+/, ''));
      if (!fs.existsSync(assetPath)) brokenAssets.push({ from: route, to: internalPath });
      return;
    }

    if (!htmlFileForRoute(internalPath) && !internalPath.startsWith('/api/')) {
      brokenInternalLinks.push({ from: route, to: internalPath });
    }
  });

  routeInventory.push({
    route,
    outputFile: path.relative(root, filePath),
    indexable: !noindex,
    inSitemap,
    canonical: canonical || null,
    openGraphUrl: ogUrl || null,
    title,
    metaDescription: description,
    h1Count,
    schemaTypes: [...new Set(schemaTypes)].sort(),
    internalLinkCount: internalPaths.size,
  });
}

for (const [title, routes] of titles) {
  assert(routes.length === 1, 'Duplicate title "' + title + '": ' + routes.join(', '));
}
for (const [description, routes] of descriptions) {
  assert(routes.length === 1, 'Duplicate meta description: ' + routes.join(', '));
}
assert(brokenInternalLinks.length === 0, 'Broken internal links: ' + JSON.stringify(brokenInternalLinks));
assert(redirectingInternalLinks.length === 0, 'Internal links still hit redirects: ' + JSON.stringify(redirectingInternalLinks));
assert(brokenAssets.length === 0, 'Broken local assets: ' + JSON.stringify(brokenAssets));

sitemapRoutes.forEach((route) => {
  assert(Boolean(htmlFileForRoute(route)), 'Sitemap route has no generated HTML: ' + route);
});

const robotsText = read('public/robots.txt').trim();
assert(/^User-agent: \*\nAllow: \/\n\nSitemap: https:\/\/ohiovalleylandpartners\.com\/sitemap\.xml$/.test(robotsText), 'Source robots.txt is not the approved crawlable form');
assert(!sitemapRouteSet.has('/member-mailer'), 'Member mailer must not be in sitemap');
assert(routeInventory.find((item) => item.route === '/member-mailer')?.indexable === false, 'Member mailer must be noindex');

const requiredAnalyticsEvents = [
  'homepage_property_review_cta_click',
  'county_page_cta_click',
  'form_started',
  'form_submitted',
  'successful_submission',
  'form_error',
  'phone_link_click',
  'email_link_click',
  'seller_resource_click',
  'county_guide_click',
  'buyer_portal_click',
  'builders_network_click',
  'contact_page_visit',
];
const analyticsSource = [
  read('components/analytics/conversion-tracker.tsx'),
  ...walk(path.join(root, 'app')).filter((file) => file.endsWith('.tsx')).map((file) => fs.readFileSync(file, 'utf8')),
  ...walk(path.join(root, 'components')).filter((file) => file.endsWith('.tsx')).map((file) => fs.readFileSync(file, 'utf8')),
].join('\n');
const analyticsEvents = Object.fromEntries(
  requiredAnalyticsEvents.map((event) => [event, analyticsSource.includes(event)]),
);
Object.entries(analyticsEvents).forEach(([event, present]) => {
  assert(present, 'Required analytics event is missing: ' + event);
});

const functionRoutes = walk(path.join(root, 'functions', 'api'))
  .filter((file) => file.endsWith('.js'))
  .map((file) => '/api/' + path.basename(file, '.js'))
  .sort();
['/api/contact', '/api/investor-intake', '/api/property-upload', '/api/seller'].forEach((route) => {
  assert(functionRoutes.includes(route), 'Form function route missing: ' + route);
});

const indexNowKeyFiles = fs.readdirSync(path.join(root, 'public')).filter((name) => /^[a-f0-9]{32}\.txt$/.test(name));
assert(indexNowKeyFiles.length === 1, 'Expected exactly one IndexNow key file');
if (indexNowKeyFiles.length === 1) {
  const key = indexNowKeyFiles[0].replace(/\.txt$/, '');
  assert(read('public/' + indexNowKeyFiles[0]).trim() === key, 'IndexNow key file content mismatch');
}

const allOutputFiles = walk(outDir);
const assetMetrics = {};
for (const [label, extensions] of Object.entries({
  html: ['.html'],
  javascript: ['.js'],
  css: ['.css'],
  images: ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.svg'],
  video: ['.mp4', '.webm'],
  fonts: ['.woff', '.woff2'],
})) {
  const files = allOutputFiles.filter((file) => extensions.includes(path.extname(file).toLowerCase()));
  assetMetrics[label] = {
    files: files.length,
    bytes: files.reduce((total, file) => total + fs.statSync(file).size, 0),
  };
}

const report = {
  generatedAt: new Date().toISOString(),
  baseUrl,
  passed: errors.length === 0,
  errors,
  warnings,
  counts: {
    generatedRoutes: routeInventory.length,
    indexableRoutes: routeInventory.filter((item) => item.indexable).length,
    noindexRoutes: routeInventory.filter((item) => !item.indexable).length,
    sitemapUrls: sitemapUrls.length,
    redirects: redirectRules.length,
    functionRoutes: functionRoutes.length,
    brokenInternalLinks: brokenInternalLinks.length,
    redirectingInternalLinks: redirectingInternalLinks.length,
    brokenAssets: brokenAssets.length,
  },
  sitemap: sitemapUrls.map((url, index) => ({ url, lastModified: sitemapLastmods[index] })),
  redirects: redirectRules,
  functionRoutes,
  routeInventory: routeInventory.sort((a, b) => a.route.localeCompare(b.route)),
  analyticsEvents,
  assetMetrics,
};

const routeInventoryReport = {
  generatedAt: report.generatedAt,
  canonicalOrigin: baseUrl,
  publicRoutes: report.routeInventory,
  sitemapRoutes: report.sitemap,
  redirectRoutes: report.redirects,
  formRoutes: functionRoutes,
  thankYouRoutes: [],
  notes: [
    'No standalone thank-you route exists; successful forms render an in-place confirmation.',
    'The How It Works and Where We Buy destinations are preserved as anchors on /land and /.',
    'Property-detail and private-preview routes remain available with noindex directives.',
  ],
};

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2) + '\n');
const inventoryPath = path.join(path.dirname(reportPath), 'route-inventory.json');
fs.writeFileSync(inventoryPath, JSON.stringify(routeInventoryReport, null, 2) + '\n');

console.log(JSON.stringify({
  passed: report.passed,
  counts: report.counts,
  warnings: warnings.length,
  report: path.relative(root, reportPath),
  routeInventory: path.relative(root, inventoryPath),
}, null, 2));

if (errors.length > 0) {
  errors.forEach((error) => console.error('ERROR: ' + error));
  process.exitCode = 1;
}
