# GEO Audit Report: Ohio Valley Land Partners

**Audit Date:** 2026-03-31
**URL:** https://www.ohiovalleylandpartners.com
**Business Type:** Local Service Business — Cash Land Buyer (Principal Buyer, not a licensed broker)
**Pages Analyzed:** 15 pages crawled across 47 in sitemap
**Auditor:** Claude GEO Audit System

---

## Executive Summary

**Overall GEO Score: 36/100 (Critical)**

Ohio Valley Land Partners has a technically sound Next.js foundation and a well-conceived site architecture, but scores in the Critical range for AI visibility due to three systemic gaps: the business has near-zero brand presence off-site (no Wikipedia, no Reddit, no directory listings, no press), no named team members or author attribution anywhere on the site, and zero external citations in any content. AI systems cannot cite a source they cannot verify, and they cannot verify an entity that exists only on its own domain. The technical infrastructure (SSR rendering, sitemap, schema presence) is the site's strongest asset. Everything else requires urgent attention.

### Score Breakdown

| Category | Score | Weight | Weighted Score |
|---|---|---|---|
| AI Citability | 34/100 | 25% | 8.50 |
| Brand Authority | 8/100 | 20% | 1.60 |
| Content E-E-A-T | 41/100 | 20% | 8.20 |
| Technical GEO | 71/100 | 15% | 10.65 |
| Schema & Structured Data | 41/100 | 10% | 4.10 |
| Platform Optimization | 31/100 | 10% | 3.10 |
| **Overall GEO Score** | | | **36/100 — Critical** |

---

## Critical Issues (Fix Immediately)

### C-1: No llms.txt file
`https://www.ohiovalleylandpartners.com/llms.txt` returns 404. This is the primary machine-readable content manifest for AI systems. Its absence means GPTBot, ClaudeBot, and PerplexityBot have no structured guidance on what this site contains or which pages to prioritize.

**Fix:** Create `/public/llms.txt` in the Next.js project. Minimum viable content:
```
# Ohio Valley Land Partners
> Regional principal buyer reviewing property in eastern Ohio and northern West Virginia.
> We review vacant, inherited, tax-burdened, and difficult-to-manage land for possible direct purchase.

## Core Pages
- /: Homepage — overview, service counties, process
- /about: Company background, giving commitment
- /sell-land/[county]: County-specific direct property-review pages (8 pages)
- /ohio-valley-guides/[county]: County land market guides (8 pages)
- /blog: Land seller educational content
- /contact: Start a property review

## Service Area
Ohio counties: Belmont, Jefferson, Columbiana, Harrison, Carroll
West Virginia counties: Ohio, Marshall, Brooke

## Key Topics
- Direct purchase inquiries and property-specific internal review
- Inherited land, back taxes, probate situations
- Ohio Valley land market data
```

---

### C-2: /sell-land returns 404 but is listed in sitemap
The URL `https://ohiovalleylandpartners.com/sell-land` is included in the sitemap and triggers 404. This signals an unmaintained sitemap to all crawlers and can suppress crawl budget allocation across the entire 47-URL sitemap.

**Fix (immediate):** Remove `/sell-land` from `sitemap.xml`, OR add a 301 redirect in `next.config.js`:
```js
async redirects() {
  return [
    { source: '/sell-land', destination: '/sell-your-land', permanent: true },
  ]
}
```

---

### C-3: Zero external citations across all content
Every statistic on the site — market appreciation figures, days-on-market data, probate timelines — is presented without attribution. AI systems are reluctant to cite unsourced claims. This single issue suppresses citability across the entire blog and guide content library.

**Minimum fix:** Source the three most-used statistics:
- Probate timeline (4–6 / 12–24 months): cite Ohio Revised Code § 2113 or Ohio State Bar Association
- Market appreciation (15–30%): cite USDA NASS Ohio or county auditor data
- Days on market (35–55 days): attribute explicitly as "Ohio Valley Land Partners transaction data, 2024–2025" if proprietary

---

### C-4: No named team members or author attribution anywhere
Every blog post and content page is attributed to "Ohio Valley Land Partners" (Organization). Google's Quality Rater Guidelines and AI model entity resolution both require identifiable human authors for content credibility. This is the single largest E-E-A-T gap on the site.

**Fix:** Add one named author to the About page and all blog posts. This does not require a full name — "R. Jamison, Land Acquisition Specialist" with a county-of-residence and a year of experience is sufficient to create a Person entity. Add Person schema (see Schema section below).

---

### C-5: No off-site brand presence — entity does not exist in AI knowledge graphs
No Wikipedia article, no confirmed Reddit presence, no industry directory listings (LandWatch, Land.com, BBB), no press coverage, no Google Business Profile confirmed. AI models cross-reference entities across sources; a business visible only on its own domain scores near-zero for entity recognition.

**Fix (ordered by impact):**
1. Create and verify a Google Business Profile — highest single-action impact
2. Submit to LandWatch and Land.com (land-specific directories)
3. Create a LinkedIn company page
4. Submit to Better Business Bureau
5. Pitch the East Palestine / Arc of Appalachia giving story to The Intelligencer (Wheeling), Times Leader, and Parkersburg News & Sentinel — this story has regional newsworthiness

---

## High Priority Issues

### H-1: robots.txt has duplicate User-agent: * blocks and throttles AI crawlers
The current robots.txt declares `User-agent: *` twice. Most crawlers merge or honor only the first block — the `Crawl-delay: 10` in the second block may not apply consistently. Additionally, all AI crawlers (GPTBot, ClaudeBot, PerplexityBot, CCBot) are treated identically to low-priority bots and given a 10-second crawl delay. Googlebot gets 0-second delay.

**Fix — replace robots.txt entirely:**
```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /investor-portal/
Disallow: /_next/
Crawl-delay: 2

User-agent: Googlebot
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: CCBot
Allow: /

Sitemap: https://ohiovalleylandpartners.com/sitemap.xml
```

---

### H-2: Organization schema missing sameAs — entity is unresolvable by AI
Both the RealEstateAgent and Organization schema blocks on the homepage have zero `sameAs` properties. This is how AI models confirm that the business on this site is the same entity on LinkedIn, Google Business Profile, or any directory. Without it, the business is an ambiguous, unverifiable entity.

**Fix:** Add `sameAs` array to Organization schema immediately:
```json
"sameAs": [
  "https://www.linkedin.com/company/ohio-valley-land-partners",
  "https://www.google.com/maps/place/[GBP_ID]",
  "https://www.bbb.org/us/wv/wheeling/profile/[profile]",
  "https://www.landwatch.com/[listing]"
]
```
Populate with real URLs as each account is created.

---

### H-3: Article schema uses Organization as author — invalid for E-E-A-T
All blog post Article schemas declare `"author": {"@type": "Organization"}`. Google's Article rich result requirements and AI model E-E-A-T evaluation both require `"author": {"@type": "Person"}`. This makes all blog content ineligible for Article rich results and eliminates human expertise signaling.

**Fix:** Create a Person schema for the primary author and reference it in all Article schemas:
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "R. Jamison",
  "url": "https://ohiovalleylandpartners.com/about",
  "jobTitle": "Land Acquisition Specialist",
  "worksFor": {
    "@type": "Organization",
    "name": "Ohio Valley Land Partners"
  },
  "sameAs": ["https://www.linkedin.com/in/[profile]"]
}
```

---

### H-4: No FAQ on homepage — highest-traffic page has zero extractable Q&A
The homepage gets the most traffic and AI crawler attention, but contains zero structured Q&A content. The FAQPage schema on county pages is the site's strongest GEO structural asset — it is absent from the page that matters most.

**Fix:** Add a FAQ section to the homepage with FAQPage schema (4–6 questions minimum):
- What happens after I share my property with OVLP?
- What counties do you buy land in?
- Does requesting a property review commit me to sell?
- Can you buy land with back taxes?
- What types of land do you buy?
- What does OVLP consider before presenting a proposal?

---

### H-5: Probate blog post is 450 words on a legally complex topic
The article "How to Sell Inherited Land in Ohio Probate" is labeled "6 minute read" but contains approximately 450 words — a 6-minute read requires ~1,400 words. This inconsistency signals low editorial quality to content scoring systems. More critically, Ohio probate land sales require covering Letters Testamentary, Executor authority limits, court approval thresholds, WV vs. OH differences, and creditor windows. 450 words cannot do this.

**Fix:** Expand to 1,400–1,800 words with ORC citations:
- Ohio Revised Code § 2113.39 (Executor sale authority)
- Ohio Revised Code § 2117 (creditor claim window)
- Add a separate section for WV probate distinctions
- Fix read-time metadata to match actual word count

---

### H-6: No Google Business Profile confirmed
For a local/regional service business targeting 8 specific counties, a verified GBP is the single highest-impact action for Google AI Overviews and Google Gemini. Without it, local entity resolution fails across the entire Google ecosystem.

**Fix:** Create and fully verify at https://business.google.com. Set primary category: "Real Estate Investor." Add service area for all 8 counties. Upload photos. Add business description matching site value proposition.

---

## Medium Priority Issues

### M-1: og:image and twitter:image not confirmed
OG and Twitter Card image tags are used by AI systems (Perplexity, ChatGPT Browse, Bing AI) for citation previews. Missing image tags reduce visual representation in AI-surfaced results.

**Fix:** Add a default 1200×630 OG image in `app/layout.tsx`:
```ts
export const metadata: Metadata = {
  openGraph: {
    images: [{ url: '/og-default.jpg', width: 1200, height: 630 }],
  },
}
```

---

### M-2: No testimonials or transaction history
A cash land buyer with zero disclosed transaction volume and zero client testimonials has no social proof. This is a critical trust gap for a business asking sellers to hand over a significant asset.

**Fix:** Request Google Business Profile reviews from past sellers. Display 3–5 on the homepage and About page. A single anonymized case study ("47-acre Guernsey County inherited parcel, closed in 21 days") would double the E-E-A-T score on the About page.

---

### M-3: Blog posts not cross-linked to county pages
The probate article and cash buyer guide have no internal links to county-specific pages, which are directly relevant to readers. The topical cluster is architecturally present but not wired together.

**Fix:** Add 2–3 internal links from each blog post to related county guide pages. The probate article should link to Belmont, Jefferson, and Columbiana county pages at minimum.

---

### M-4: Community page has no structured data
The community page contains differentiated regional context and a forward-looking reinvestment commitment but has only OG meta tags — no schema markup.

**Fix:** Add only schema that can be verified. Do not use `memberOf`, recipient, donation, or partnership relationships unless OVLP can document them. Regional topics may be described with `knowsAbout`; any event reference should link to an authoritative public source.

---

### M-5: WV county pages appear templated from Ohio pages
West Virginia (Ohio, Marshall, Brooke counties) operates under a separate probate code, deed types, and land sale legal process than Ohio. Pages that treat WV identically to Ohio suggest template generation and undermine expertise signals for WV sellers.

**Fix:** Add a minimum 150-word WV-specific section to each WV county page covering: WV Code distinctions from Ohio, deed types (general warranty vs. special warranty in WV), and any county-specific land market characteristics.

---

### M-6: speakable schema absent across all pages
No content is marked with `speakable` specification for AI assistant consumption. This is a medium-term GEO signal as voice and AI assistants increasingly use this property to select content for audio/conversational delivery.

**Fix:** Add `speakable` to Article schema blocks targeting `h1` and the first summary paragraph CSS selector.

---

### M-7: Bing Webmaster Tools not verified
No `msvalidate.01` meta tag confirmed. Without Bing Webmaster Tools verification, the site relies on organic Bing crawl discovery, which can take months for new content. Bing indexing feeds ChatGPT web search and Bing Copilot.

**Fix:** Register at bing.com/webmasters, verify the domain, submit the sitemap, and implement IndexNow for real-time content push.

---

## Low Priority Issues

### L-1: No YouTube channel
Video content is a major AI-adjacent discovery surface and creates cross-property entity depth. A single "How Selling Land for Cash Works in Ohio Valley" video (2–4 minutes) would establish a YouTube entity node.

### L-2: FAQPage rich results are restricted
FAQPage schema is present on 8+ county pages. Note: Since August 2023, Google only shows FAQPage rich results for government and major health authority sites — this site will not receive rich result display from FAQPage blocks. Keep the schema for semantic AI crawler value, but do not prioritize adding more.

### L-3: Hero image alt text non-descriptive
Only the logo alt text is confirmed. Hero/feature images should use descriptive alt text reinforcing geographic and topical relevance: `alt="Rural land parcel in Belmont County, Ohio Valley"`.

### L-4: WebSite + SearchAction schema absent
No sitelinks search box schema. Minor gap for a local service site but worth adding to the homepage as a 30-minute task.

---

## Category Deep Dives

### AI Citability — 34/100

The site's most citable content block is the probate timeline ("4–6 months simple estates, 12–24 months complex"), but it is buried in prose without source attribution. The FAQPage schema blocks on county pages are structurally correct for AI extraction but generic in their answers — no county-specific data points, no figures, no legal citations.

The 2026 Ohio Valley Land Market article is the longest and most data-rich piece, but every statistic is unsourced. AI systems will not chain-cite content that cites nothing.

Homepage marketing copy ("Sell your land with confidence") scores 28/100 for citability — promotional language does not get extracted by AI systems.

**Best current citability asset:** The community page's East Palestine reference — specific, verifiable, hyper-local, and emotionally differentiated. It is formatted as a filler paragraph. It should be a prominent callout block with structured data.

---

### Brand Authority — 8/100

The brand exists on one domain. No Wikipedia, no Reddit, no YouTube, no confirmed directory listings, no press coverage. AI models build entity maps by cross-referencing a name across multiple authoritative sources. Ohio Valley Land Partners has one source: its own website.

The community-reinvestment commitment may become a useful earned-media angle once distributions can be documented. Until then, describe it only as OVLP's commitment to reinvest 5% of company profits as the business grows; do not name recipients or claim completed outcomes without records.

---

### Content E-E-A-T — 41/100

| Dimension | Score | Primary Gap |
|---|---|---|
| Experience | 9/25 | No transaction history, no case studies, no first-hand outcomes |
| Expertise | 7/25 | No named authors, no credentials, no methodology transparency |
| Authoritativeness | 13/25 | No external recognition, no citations from or to authoritative sources |
| Trustworthiness | 15/25 | No testimonials, unsourced statistics, unverified giving claims |

The content architecture (hub → county guides → blog) is correct. The substance within that architecture is thin. A single 1,500-word, ORC-cited probate guide with a named author would move this score materially.

---

### Technical GEO — 71/100 (Site's Strongest Category)

Next.js 13.5 with App Router defaults to server-side rendering — this is the optimal posture for AI crawler discoverability. All content is delivered as fully-formed HTML, requiring no JavaScript execution from crawlers.

The primary technical gaps are:
1. No llms.txt (high impact)
2. 10-second crawl delay for all non-Googlebot crawlers including all AI bots (high impact)
3. Duplicate User-agent: * blocks in robots.txt (medium impact)
4. /sell-land 404 in sitemap (medium impact)

Everything else (HTTPS, sitemap, OG tags, SSR rendering, Netlify deployment) is solid.

---

### Schema & Structured Data — 41/100

Schema types present: RealEstateAgent, Organization, Article, FAQPage, BreadcrumbList.

| Schema Type | Status | Critical Gap |
|---|---|---|
| Organization | Partial | Missing sameAs, logo, description, foundingDate |
| RealEstateAgent | Partial | Missing address (PostalAddress), url, logo |
| Article | Partial | Author type is Organization, not Person — invalid |
| FAQPage | Valid | Rich results restricted; semantic value retained |
| BreadcrumbList | Valid | No issues |
| Person | Absent | Critical — no author or team member entity exists |
| speakable | Absent | Medium gap |
| WebSite + SearchAction | Absent | Low gap |

The JSON-LD rendering method in Next.js must be verified. If schema blocks are injected via client-side components (`useEffect`), they are invisible to AI crawlers. All schema must be in Server Components or `layout.tsx`/`page.tsx` metadata exports.

---

### Platform Optimization — 31/100

| Platform | Score | Primary Blocker |
|---|---|---|
| Google AI Overviews | 38/100 | No GBP, no inbound authority citations, new domain |
| ChatGPT Web Search | 22/100 | No entity recognition signals, no sameAs, no llms.txt |
| Perplexity AI | 28/100 | No Reddit presence, no third-party citations |
| Google Gemini | 30/100 | No GBP, no YouTube, no Google ecosystem footprint |
| Bing Copilot | 35/100 | No Bing Webmaster Tools, no LinkedIn, no IndexNow |

The site's best platform opportunity is Google AI Overviews — the FAQ content and county guide structure map directly to "who buys land in [county]" query patterns. With a GBP, sameAs schema, and a few directory citations, Google AI Overviews is achievable within 60–90 days.

---

## Quick Wins (Implement This Week)

1. **Fix /sell-land 404** — Remove from sitemap or add 301 redirect. 15 minutes. Immediately restores sitemap integrity.

2. **Rewrite robots.txt** — Remove duplicate User-agent blocks, set AI crawler-specific rules, reduce crawl delay to 2 seconds. 15 minutes. Immediately improves AI crawl frequency.

3. **Create llms.txt** — Build `/public/llms.txt` with service summary, page list, and service counties. 1–2 hours. Highest single-leverage GEO infrastructure action.

4. **Create Google Business Profile** — Register, verify, set category to "Real Estate Investor," add 8 service area counties. 1–2 hours. Unlocks Google AI Overviews and Gemini local entity resolution.

5. **Add sameAs to Organization schema** — Add LinkedIn, GBP URL, and any directory URLs to the existing Organization block. 30 minutes. Immediately enables cross-platform entity resolution.

---

## 30-Day Action Plan

### Week 1: Infrastructure & Entity Foundation
- [ ] Fix /sell-land 404 (remove from sitemap or 301)
- [ ] Rewrite robots.txt with AI crawler-specific directives
- [ ] Create `/public/llms.txt` and deploy
- [ ] Create and verify Google Business Profile
- [ ] Create LinkedIn company page
- [ ] Add `sameAs` to Organization schema (GBP URL + LinkedIn URL)

### Week 2: Author Identity & Schema Repair
- [ ] Add named author (first name + role + tenure) to About page
- [ ] Add Person schema block to homepage and reference in all Article schemas
- [ ] Fix Article schema author type from Organization → Person on all blog posts
- [ ] Complete RealEstateAgent schema (add PostalAddress, url, logo ImageObject)
- [ ] Add `og:image` and `twitter:image` default to `app/layout.tsx`
- [ ] Confirm all JSON-LD blocks are server-rendered (not client-injected)

### Week 3: Content Quality & Citability
- [ ] Expand probate blog post from 450 to 1,400+ words with ORC citations
- [ ] Source all statistics in the 2026 market article (USDA NASS, county auditor data, or label as proprietary transaction data)
- [ ] Add homepage FAQ section (4–6 Q&As) with FAQPage schema
- [ ] Add 2–3 internal links from each blog post to related county pages
- [ ] Add WV-specific legal content section to Ohio, Marshall, Brooke county pages

### Week 4: Off-Site Presence & Platform Optimization
- [ ] Submit to LandWatch and Land.com (land-specific directories)
- [ ] Submit to BBB Wheeling/Charleston offices
- [ ] Verify Bing Webmaster Tools and submit sitemap
- [ ] Implement IndexNow API route in Next.js
- [ ] Pitch East Palestine / Arc of Appalachia story to The Intelligencer and Parkersburg News & Sentinel
- [ ] Collect 3–5 Google Business Profile reviews from past sellers
- [ ] Begin Reddit participation in r/Ohio, r/WestVirginia, r/RealEstate on probate/cash sale threads

---

## Appendix: Pages Analyzed

| URL | Title | Status | Key GEO Issues |
|---|---|---|---|
| / | Ohio Valley Land Partners | 200 | No FAQ, no author, thin homepage schema |
| /about | About | 200 | No team names, no credentials, no testimonials |
| /sell-land | — | **404** | **Listed in sitemap — critical defect** |
| /sell-land/belmont-county-oh | We Buy Vacant Land in Belmont County | 200 | FAQPage schema present, no external citations |
| /ohio-valley-guides | Ohio Valley Land Seller Guides | 200 | Hub page, BreadcrumbList only, no data citations |
| /ohio-valley-guides/belmont-county-oh | Belmont County Guide | 200 | FAQPage + BreadcrumbList, no external data |
| /blog | Blog | 200 | Not individually analyzed |
| /blog/sell-inherited-land-ohio-probate | How to Sell Inherited Land in Ohio Probate | 200 | 450 words, no author, no citations, Article schema (Org author) |
| /blog/cash-land-buyers-ohio-valley | Cash Land Buyers in the Ohio Valley | 200 | ~650 words, no author, no citations |
| /blog/ohio-valley-land-market-2026 | Ohio Valley Land Market 2026 | 200 | Best content depth, no sourced statistics |
| /community | Community | 200 | No structured data, strongest differentiation content |
| /llms.txt | — | **404** | **Does not exist — critical gap** |
| /robots.txt | — | 200 | Duplicate User-agent blocks, AI crawlers throttled |
| /sitemap.xml | — | 200 | 47 URLs, one 404 reference (/sell-land) |

---

*Report generated by Claude GEO Audit System — ohiovalleylandpartners.com — 2026-03-31*
