# Ohio Valley Land Partners — Marketing Site Handoff

*Last updated: 2026-06-21 · source: GROK · Status: LIVE — weekend copy pass deployed (`6700b42`)*

---

## Conversion-copy mockup — LOCAL REVIEW (2026-07-20)

- **Branch:** `codex/ovlp-conversion-copy-mockup`
- **Worktree:** `/Users/macbook15/Me-Nexus/working/ovlp-conversion-copy-mockup`
- **Local preview:** `http://127.0.0.1:8894/?v=20260720-qa2`
- **Production:** unchanged; nothing pushed or deployed
- **Scope:** seller clarity, Property Review terminology, form-language consistency, principal trust, seller empathy, five-step process, FAQ quality, county acquisition/guide intent separation, risky-claim cleanup, and GA4 conversion events
- **Preserved:** county URLs, canonicals, sitemap, forms/API endpoints, Resend routing, GHL A2P widget, GA4, logo, colors, typography, imagery, animations, breakpoints, and shared design system
- **Verification:** `tsc --noEmit` passed; production build passed for 63 pages; ESLint passed for every changed TS/TSX file; 9 acquisition pages and 9 county guides generated; key local URLs return HTTP 200
- **Visual-review note:** the cache-busted mockup is open in Chrome. The Chrome review connection did not attach despite extension/native-host checks passing, so interactive automated visual QA was not substituted with another browser.
- **Pickup:** Richard reviews the Chrome mockup. Only after explicit approval should this branch be pushed, merged, or deployed.

---

## Live URLs

| What | URL |
|---|---|
| **Production** | https://ohiovalleylandpartners.com |
| **Community page (live)** | https://ohiovalleylandpartners.com/community |
| **Guides hub (live)** | https://ohiovalleylandpartners.com/ohio-valley-guides |
| **GitHub** | `RichardBJamiosn/Ohio_Valley_Land_Partners` (private) |
| **Portal (separate repo)** | https://ovlp-portal.vercel.app — see `OVLP_Portal/HANDOFF.md` |

---

## Repo location

**MacMe (canonical):**
```
/Users/macbook15/Documents/May 4 Clean/Next Clean From MacMe 4:30/Ohio_Valley_Land_Partners/
```

**MiniMe (mirror):**
```
/Users/richardjamison/Documents/Projects/Ohio_Valley_Land_Partners/
```

**SEO agent prompts:** `SEO-AGENT-PROMPTS.md` (weekly Agent 1–4 rotation)

Stack: **Next.js** (static export) + **Cloudflare Pages** + form APIs in `functions/api/`.

---

## Community page redesign — LIVE (2026-06-15)

Richard approved mockup v2. **Shipped** in `app/community/page.tsx`.

### Mockup files

| File | Purpose |
|---|---|
| `mockups/community-redesign.html` | Full scrollable redesign mockup (v2) |
| `mockups/images/` | Local JPEG assets — mockup must use these, not hotlinked Unsplash |

### Open mockup

```bash
open /Users/richardjamison/Documents/Projects/Ohio_Valley_Land_Partners/mockups/community-redesign.html
```

### v2 design decisions (approved direction)

- **Community-first hero** — not donation/transparency led
- **No transparency timeline section** — felt touch-and-go for a new operation
- **Stats:** 9 counties · 1.77M+ acres · Local (not 5% giving stats in hero)
- **Pillars:** Land · People · Partners
- **Photo-forward partner cards** (alternating layout)
- **East Palestine** full-bleed feature block
- **Closing:** Landowners CTA + Builders Network CTA (two sides of the table)
- **Giving mention:** one quiet italic line at bottom only

### Production images

Stock photography in `public/community/` — replace with real org/county photography when available.

| File | Used for |
|---|---|
| `hero-valley.jpg` | Hero background |
| `forest-arch.jpg` | Hero quote panel |
| `partner-forest.jpg` | Arc of Appalachia card |
| `partner-community.jpg` | Salvation Army card |
| `partner-urban.jpg` | COCIC card |
| `ep-feature.jpg` | East Palestine feature |

---

## Guides hub redesign — LIVE (2026-06-15)

Richard approved mockup v2. **Shipped** in `app/ohio-valley-guides/page.tsx`.

### Mockup files

| File | Purpose |
|---|---|
| `mockups/guides-redesign.html` | Full scrollable redesign mockup (v2) |
| `mockups/images/guides/` | Guide-specific JPEG assets |

### Open mockup

```bash
open /Users/richardjamison/Documents/Projects/Ohio_Valley_Land_Partners/mockups/guides-redesign.html
```

### v2 design decisions (approved direction)

- **Hero:** "for buyers and sellers" — editorial, not sales-led
- **Atlas card:** PA, OH, WV, KY + 981-mile river scope (not deal stats)
- **Scope strip:** 4 states · 981 miles · 9 guides — replaces sales metrics strip
- **Sticky filter tabs** — every link is an existing sitemap route
- **Featured Franklin** campaign card + photo county grid with unique hooks
- **County detail pages unchanged** (`app/ohio-valley-guides/[slug]/page.tsx`)

### Production images

| File | Used for |
|---|---|
| `public/guides/atlas-hero.jpg` | Hero background (heavy dark overlay for readable type) |
| `public/guides/county-infill.jpg` | Franklin featured split card (skyline photo, left panel) |
| `public/guides/county-rural.jpg` | Rural county thumbnails |
| `public/guides/carroll-green-field.jpg` | Carroll county card |

County grid is **text-only** (MapPin + hooks) — no photo grid, no `/community/` image reuse.

---

## GHL chat widget (A2P compliance)

Widget loads on **all pages** via raw HTML in `app/layout.tsx` (required for scanner detection).

| Item | Value |
|---|---|
| Widget ID | `6a1730411b5a98ef9dec746a` |
| Location ID | `bNT4wp0nukIQdBJbQDaa` |
| Loader | `https://widgets.leadconnectorhq.com/loader.js` |

**CSP:** `public/_headers` must allow `widgets.leadconnectorhq.com`, `services.leadconnectorhq.com`, `services.msgsndr.com`, and `stcdn.leadconnectorhq.com` — otherwise the phone popup never renders (`884e53c`, `70d6790`).

**Avatar:** Prompt/header image is configured in GHL dashboard (Sites → Chat Widget), not in repo code. Do **not** hide the widget panel via shadow-DOM CSS — breaks the form and A2P opt-in (`dd84cc6` reverted in `a73daeb`).

Phone fields on site forms remain hidden; GHL widget is the single SMS opt-in source.

---

## SEO indexing blitz — LIVE (2026-06-19)

Commit `6ab6ce2` — targets 20+ indexed pages by weeks 3–4.

| Fix | Status |
|-----|--------|
| Removed root-layout homepage canonical (was blocking blog/guide indexing) | Done |
| Per-page canonical + OG url on blog, guides, sell-land | Done |
| Homepage county sell-land grid + footer sell-land links | Done |
| IndexNow submits all sitemap URLs (not just 12) | Done |
| Geauga County campaign blog + homepage/hero/footer promotion | Done |

**Geauga campaign URL:** `/blog/sell-vacant-land-geauga-county-ohio-2026` — featured on blog hub for Monday outbound.

**Post-deploy:** run `scripts/indexnow-notify.sh` · GSC → URL Inspection → Request indexing on top 20 URLs.

---

## SEO pre-Columbus blitz — LIVE (2026-06-18)

Per `OVLP-SEO-HANDOFF-PRE-COLUMBUS.md` — all 9 code tasks shipped before Columbus trip (June 21–22).

| Task | Status |
|------|--------|
| Copy errors (hero, about, terms, FAQ 30-day) | Done |
| Blog internal links (12 posts → county pages) | Done |
| OrganizationSchema + ServiceSchema in layout | Done |
| Blog BreadcrumbSchema | Done |
| Homepage FAQ (8 seller-intent Q&As) | Done |
| Mobile sticky CTA + GA4 events | Done |
| IndexNow key + notify script | Done |
| Microsoft Clarity | Blocked — set `NEXT_PUBLIC_CLARITY_ID` after signup |

**IndexNow:** key file at `/a7f3e91c2b8d4056e6f1a9c3d7e5b204.txt` — run `scripts/indexnow-notify.sh` after deploy.

**Still blocked until after Columbus:** GBP verification, `sameAs` URLs, off-site directory backlinks.

---

## SEO enterprise pass — LIVE (2026-06-18)

Commit `1dac65d` — built on MacMe, pushed via MiniMe (MacMe git HTTPS auth blocked).

### Critical fix
- Removed wildcard `public/_redirects` rule `/sell-land/* → /ohio-valley-guides` that 301'd all 9 county sell pages
- County pages now return **200** (e.g. `/sell-land/franklin-county-oh`, `/sell-land/belmont-county-oh`)
- Bare `/sell-land` still 301s to guides hub (intentional)

### County sell pages (all 9)
- 8–9 FAQs each with ORC / WV Code citations
- `localGeography`, `citations`, `relatedBlogSlugs` in `lib/county-sell-data.ts`
- Template enriched: breadcrumbs, geography, sources, internal links to guides/blog/contact (`app/sell-land/[slug]/page.tsx`)

### Content
- Probate blog expanded with ORC § 2113 / § 5307 / § 5721 (`sell-inherited-land-ohio-probate`)
- `llms.txt` — all 15 blog posts including `brooke-county-wv-land-worth-2026`
- 59 static pages in build

### Still manual (per SEO-AGENT-PROMPTS.md)
- Google Business Profile verification (C-5 / H-6)
- `sameAs` URLs in `lib/seo-config.ts` once GBP / LinkedIn exist
- Off-site directory backlinks

### MacMe build note
Path contains `4:30` — use direct binary, not `npm run build`:
```bash
cd "/Users/macbook15/Documents/May 4 Clean/Next Clean From MacMe 4:30/Ohio_Valley_Land_Partners"
source ~/.nvm/nvm.sh
./node_modules/.bin/next build
```

---

## Weekend copy pass — SHIPPED 2026-06-20 → 2026-06-21

Commits `ac2dbf1` → `6700b42` on `main`. Cloudflare Pages live.

| Change | Status |
|---|---|
| Removed generic speed-and-price public positioning | Done |
| Centralized seller voice in `lib/public-copy.ts` | Done |
| County section: internal parcel review + property-specific timing | Done |
| Removed "call center" negative framing | Done |
| FAQs reframed as OVLP process — not seller advice | Done |
| Blog cards cleaned (Geauga, Franklin, tri-county, Columbiana, probate) | Done |
| Removed anti-realtor / "without an agent" framing | Done |
| `softenCountyFaq()` blocks leading how-to-sell questions | Done |

Earlier legal/advisory pass (same weekend branch):
- Softened language that could read as legal, tax, title, appraisal, or brokerage advice.
- Land Scouts reframed as introductions/partnerships only.
- Organization schema corrected — OVLP is not a RealEstateAgent.

## Search engine indexing — 2026-06-21

**Sitemap:** 48 URLs at `/sitemap.xml` — all county sell-land pages return 200.

**Post-deploy checklist:**

1. **IndexNow** — run `scripts/indexnow-notify.sh` after every deploy.
   - Key file live: `/a7f3e91c2b8d4056e6f1a9c3d7e5b204.txt`
   - 2026-06-21: API returned `UserForbiddedToAccessSite` — **re-verify domain in Bing Webmaster Tools** (Sites → Add site → URL prefix `https://ohiovalleylandpartners.com` → HTML file or DNS verify), then re-run script.

2. **Google Search Console** — submit sitemap + request indexing on priority URLs:
   - GSC → Sitemaps → submit `https://ohiovalleylandpartners.com/sitemap.xml`
   - URL Inspection → Request indexing for each URL in `scripts/gsc-priority-urls.txt`

3. **Bing Webmaster Tools** — submit same sitemap after verification.

4. **Do not index** `ovlp-portal.vercel.app` — private portal is `noindex`.

Priority URL list: `scripts/gsc-priority-urls.txt` (20 URLs).

## Recent session notes (2026-06-15 → 2026-06-16)

- Community page v2 mockup approved → implemented and deployed
- Guides hub v2 mockup approved → implemented and deployed
- Guides hub iterated: clean editorial layout, atlas hero photo restored, Franklin skyline card, text-only county grid
- GHL CSP fixed → phone registration popup working again
- Brief experiment hiding chat panel (bubble only) → **reverted**; full widget with avatar restored
- Portal onboarding work shipped separately — see `OVLP_Portal/HANDOFF.md`

**Recent commits:** `a73daeb` (widget revert) · `70d6790` (CSP) · `5f796a9` (Franklin photo) · `4694f6e` (hero photo) · `a2b524b` (editorial rebuild)

---

## Key paths

| Path | What |
|---|---|
| `app/community/page.tsx` | Live community page |
| `app/ohio-valley-guides/page.tsx` | Live guides hub |
| `mockups/guides-redesign.html` | Approved guides redesign mockup |
| `app/page.tsx` + `components/home/hero-section.tsx` | Landing page (design reference) |
| `app/globals.css` | Design system tokens |
| `app/layout.tsx` | GHL widget embed (raw HTML) |
| `public/_headers` | CSP — must include GHL domains |
| `mockups/community-redesign.html` | Approved redesign mockup |
| `public/hero.mp4` | Landing hero video |
| `public/og.jpg` | OG / fallback imagery |
| `app/member-mailer/page.tsx` | Permanent public weekly-mailer viewer at `/member-mailer` |
| `public/member-assets/current.pdf` | Stable current mailer asset; email links should point to `/member-mailer`, not this file |
| `public/member-assets/current-preview.jpg` | Fast first-page preview generated during the weekly update |
| `lib/member-mailer.ts` | Current edition/date/opportunity metadata |
| `scripts/update-member-mailer.sh` | Weekly PDF and preview replacement helper |

## Weekly member mailer workflow

The permanent public link is:

`https://ohiovalleylandpartners.com/member-mailer`

Update it each week with:

```bash
scripts/update-member-mailer.sh \
  "/absolute/path/to/new-mailer.pdf" \
  "YYYY-MM-DD" \
  "Week of Month D, YYYY" \
  <opportunity-count>
npm run build
```

The script copies the new PDF to the stable `public/member-assets/current.pdf`,
generates a first-page JPEG preview with Poppler, and updates
`lib/member-mailer.ts`. Commit and push the generated changes; Cloudflare Pages
then publishes the new edition without changing the email link. Keep dated
source editions in the operating package archive rather than duplicating them
inside the website repo.

---

## Deploy

```bash
cd /Users/richardjamison/Documents/Projects/Ohio_Valley_Land_Partners
npm run build
git push origin main   # Cloudflare Pages auto-deploys
bash scripts/indexnow-notify.sh   # after deploy settles (~2 min)
# Then GSC: submit sitemap + request indexing on scripts/gsc-priority-urls.txt
```

---

*Next hands: read this file first. Do not overwrite `~/Me-Nexus/current_state.md` or `last_session.md` — those are watcher-owned per `nexus_rules.md`.*
