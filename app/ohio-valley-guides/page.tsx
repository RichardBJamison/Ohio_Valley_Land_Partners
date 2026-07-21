import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import { silos, siteConfig } from '@/lib/seo-config';
import { BreadcrumbSchema } from '@/components/seo/json-ld';
import { LegalDisclaimer } from '@/components/legal-disclaimer';

export const metadata: Metadata = {
  title: { absolute: silos.guides.title },
  description: silos.guides.description,
  keywords: silos.guides.keywords,
  alternates: {
    canonical: `${siteConfig.url}/ohio-valley-guides`,
  },
};

const FILTER_TABS = [
  { label: 'All Guides', href: '/ohio-valley-guides', active: true },
  { label: 'Geauga County Notes', href: '/blog/sell-vacant-land-geauga-county-ohio-2026' },
  { label: 'Valley Market Guide', href: '/blog/ohio-valley-land-market-2026' },
  { label: 'Franklin County', href: '/ohio-valley-guides/franklin-county-oh' },
  { label: 'Belmont County', href: '/ohio-valley-guides/belmont-county-oh' },
  { label: 'Columbiana County', href: '/ohio-valley-guides/columbiana-county-oh' },
  { label: 'Sell Land', href: '/land' },
  { label: 'Browse Listings', href: '/properties' },
];

const ATLAS_STATES = [
  { abbr: 'PA', name: 'Pennsylvania' },
  { abbr: 'OH', name: 'Ohio' },
  { abbr: 'WV', name: 'West Virginia' },
  { abbr: 'KY', name: 'Kentucky' },
];

const COUNTY_GUIDES = [
  {
    slug: 'belmont-county-oh',
    name: 'Belmont County',
    state: 'Ohio',
    hook: 'Timber, shale country & Ohio River acreage',
    description:
      "Rural parcels, inherited land, and farm ground in one of the valley's most active land markets.",
  },
  {
    slug: 'jefferson-county-oh',
    name: 'Jefferson County',
    state: 'Ohio',
    hook: 'Hill country & river-bottom land',
    description:
      'Steep acreage, timber tracts, and parcels along the Ohio — a market with its own pricing logic.',
  },
  {
    slug: 'columbiana-county-oh',
    name: 'Columbiana County',
    state: 'Ohio',
    hook: 'East Palestine & post-derailment context',
    description:
      'General market observations and property factors that may be relevant in this county.',
    highlighted: true,
  },
  {
    slug: 'harrison-county-oh',
    name: 'Harrison County',
    state: 'Ohio',
    hook: 'Remote acreage & hunting land',
    description:
      'Wooded tracts, rural ground, and general observations from our acquisition activity.',
  },
  {
    slug: 'carroll-county-oh',
    name: 'Carroll County',
    state: 'Ohio',
    hook: 'Farm ground & rolling hill country',
    description: 'Agricultural parcels, wooded acreage, and inherited family land in Amish country.',
  },
  {
    slug: 'franklin-county-oh',
    name: 'Franklin County',
    state: 'Ohio',
    hook: 'Columbus infill & metro-fringe lots',
    description: 'Central Ohio context — a different market from the river counties, with distinct infill and development conditions.',
  },
  {
    slug: 'ohio-county-wv',
    name: 'Ohio County, WV',
    state: 'West Virginia',
    hook: 'Wheeling metro & northern panhandle',
    description:
      'Vacant lots and acreage on the West Virginia side of the valley — market overview and FAQs.',
  },
  {
    slug: 'marshall-county-wv',
    name: 'Marshall County',
    state: 'West Virginia',
    hook: 'Industrial fringe & river parcels',
    description: 'Land near Moundsville and the Ohio River — development and investment market notes.',
  },
  {
    slug: 'brooke-county-wv',
    name: 'Brooke County',
    state: 'West Virginia',
    hook: 'Ohio River frontage & small-town lots',
    description: 'River-adjacent acreage and vacant parcels in the northern panhandle.',
  },
];

const INSIDE_GUIDES = [
  {
    num: '01',
    title: 'Land types in this county',
    description:
      "Vacant lots, timber, farm ground, and other parcel types commonly seen in the area.",
  },
  {
    num: '02',
    title: 'Seller situations we see',
    description:
      'Examples of owner situations we encounter, without offering legal, tax, or transaction advice.',
  },
  {
    num: '03',
    title: 'County FAQs',
    description:
      'General county observations from a prospective buyer. Verify zoning, value, and process with the appropriate professionals.',
  },
];

const SCOPE_STATS = [
  {
    num: '4',
    label: 'Ohio River states',
    sub: 'Pennsylvania, Ohio, West Virginia & Kentucky — regional geography, not equal acquisition depth.',
  },
  {
    num: '981',
    label: 'Miles of river',
    sub: "From Pittsburgh to Cairo — the corridor that defines Appalachia's western edge.",
  },
  {
    num: '9',
    label: 'County guides',
    sub: 'County-specific context for the areas where we currently publish acquisition information.',
  },
];

export default function GuidesPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[{ name: 'Home', url: '/' }, { name: silos.guides.title, url: silos.guides.path }]}
      />

      <div className="min-h-screen bg-background">

        {/* Hero — valley photo with heavy overlay for readable type */}
        <section className="relative min-h-[72vh] flex items-center overflow-hidden bg-forest text-white">
          <Image
            src="/guides/atlas-hero.jpg"
            alt=""
            fill
            priority
            className="object-cover object-center brightness-[0.55]"
            sizes="100vw"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-forest/96 via-forest/88 to-forest/82"
            aria-hidden
          />

          <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <p className="heading-serif text-[#e8c47a] text-2xl sm:text-3xl mb-4">
                  County-by-county. Written by the buyer.
                </p>
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl leading-[1.08]">
                  Ohio Valley Guides
                  <span className="block text-amber mt-2">for buyers and sellers.</span>
                </h1>
                <p className="mt-6 text-base sm:text-lg text-white/80 leading-relaxed max-w-lg">
                  Field notes from counties where we operate — general property factors, acquisition interests, and regional observations. These guides are informational and are not appraisals or professional advice.
                </p>
                <div className="flex flex-wrap gap-2 mt-8">
                  <a
                    href="#county-guides"
                    className="text-xs font-semibold px-4 py-2 rounded-full bg-white/10 border border-white/15 hover:bg-white/15 transition-colors"
                  >
                    9 county guides
                  </a>
                  <Link
                    href="/blog/ohio-valley-land-market-2026"
                    className="text-xs font-semibold px-4 py-2 rounded-full bg-white/10 border border-white/15 hover:bg-white/15 transition-colors"
                  >
                    Ohio Valley market guide
                  </Link>
                  <Link
                    href="/blog"
                    className="text-xs font-semibold px-4 py-2 rounded-full bg-white/10 border border-white/15 hover:bg-white/15 transition-colors"
                  >
                    All blog posts
                  </Link>
                </div>
              </div>

              <div className="rounded-2xl border border-white/15 bg-[#142218]/90 backdrop-blur-sm p-7 sm:p-8 shadow-xl">
                <h2 className="text-xs font-bold uppercase tracking-widest text-center text-white/90 mb-2">
                  The Ohio Valley atlas
                </h2>
                <p className="text-sm text-white/65 text-center mb-5 leading-relaxed">
                  The Ohio River runs 981 miles — Pennsylvania to Illinois. These four states show
                  the broader geography surrounding our published county areas.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {ATLAS_STATES.map((state) => (
                    <div
                      key={state.abbr}
                      className="text-center py-4 px-2 rounded-xl bg-black/25 border border-white/10"
                    >
                      <div className="text-xl font-extrabold text-amber">{state.abbr}</div>
                      <div className="text-[0.65rem] font-semibold text-white/70 uppercase tracking-wide mt-1">
                        {state.name}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-5 text-center text-sm text-white/55 heading-serif italic">
                  Our guides cover 9 published county areas, with acquisition focus varying by county.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Filter tabs */}
        <div className="sticky top-[72px] z-40 bg-card border-b border-border">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-4 flex flex-wrap items-center gap-3">
            {FILTER_TABS.map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                className={`text-sm font-semibold px-4 py-2 rounded-full border transition-colors ${
                  tab.active
                    ? 'bg-forest text-white border-forest'
                    : 'bg-background text-muted-foreground border-border hover:border-amber hover:text-foreground'
                }`}
              >
                {tab.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Franklin */}
        <section className="mx-auto max-w-7xl px-6 lg:px-8 pt-14 pb-4">
          <p className="heading-serif text-amber text-2xl mb-2">Central Ohio guide</p>
          <h2 className="text-3xl font-extrabold tracking-tight">Start here if you&apos;re in Central Ohio</h2>

          <article className="mt-6 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] rounded-2xl overflow-hidden border-2 border-amber bg-card shadow-[0_12px_48px_rgba(200,150,58,0.12)]">
            <div className="relative min-h-[240px] lg:min-h-[300px]">
              <Image
                src="/guides/county-infill.jpg"
                alt="Columbus metro skyline"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              <span className="absolute top-5 left-5 bg-amber text-forest text-xs font-extrabold uppercase tracking-wider px-3 py-1.5 rounded-md">
                Franklin County · Central Ohio
              </span>
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-10">
              <h3 className="text-2xl font-extrabold">Franklin County, OH</h3>
              <p className="text-amber font-semibold text-sm mt-2">
                Columbus infill lots, residential parcels & urban-fringe acreage
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed mt-4">
                Franklin sits outside the core Ohio River Valley and has its own zoning, access,
                utility, infill, and surrounding-development considerations.
              </p>
              <div className="flex flex-wrap gap-2 mt-5">
                {['Infill lots', 'Intel corridor', 'Columbus metro'].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-semibold px-3 py-1 rounded-lg bg-muted text-meadow"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href="/ohio-valley-guides/franklin-county-oh"
                className="mt-6 inline-flex w-fit items-center gap-2 rounded-lg bg-amber px-5 py-3 text-sm font-bold text-forest hover:bg-amber/90 transition-colors"
              >
                Read Franklin County Guide <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </article>
        </section>

        {/* County grid — clean text cards, no photos */}
        <section id="county-guides" className="mx-auto max-w-7xl px-6 lg:px-8 py-12 pb-20">
          <p className="heading-serif text-amber text-2xl mb-2">Our active footprint</p>
          <h2 className="text-3xl font-extrabold tracking-tight">County guides — Ohio & West Virginia</h2>
          <p className="text-muted-foreground mt-3 max-w-xl leading-relaxed">
            Nine counties where we publish local property context. Each guide covers land types,
            common owner situations, local geography, and county-specific questions.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {COUNTY_GUIDES.map((county) => (
              <Link
                key={county.slug}
                href={`/ohio-valley-guides/${county.slug}`}
                className={`group rounded-xl border bg-card p-6 transition-all hover:border-amber/40 hover:shadow-md ${
                  county.highlighted ? 'border-amber/30' : 'border-border'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-lg font-bold group-hover:text-amber transition-colors">
                      {county.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{county.state}</p>
                  </div>
                  <MapPin className="h-5 w-5 text-amber shrink-0" aria-hidden />
                </div>
                <p className="text-sm text-amber font-semibold leading-snug">{county.hook}</p>
                <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                  {county.description}
                </p>
                <span className="block mt-5 pt-4 border-t border-border text-sm font-semibold text-meadow group-hover:text-meadow/80 transition-colors">
                  Read guide →
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* What's inside */}
        <section className="bg-forest text-white py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-center mb-10">What&apos;s inside every guide</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {INSIDE_GUIDES.map((item) => (
                <div
                  key={item.num}
                  className="rounded-2xl border border-white/10 bg-white/[0.06] p-7"
                >
                  <div className="text-3xl font-extrabold text-amber/50 leading-none">{item.num}</div>
                  <h3 className="text-base font-bold mt-3 mb-2">{item.title}</h3>
                  <p className="text-sm text-white/70 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Editorial scope */}
        <section className="mx-auto max-w-7xl px-6 lg:px-8 py-16 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {SCOPE_STATS.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-extrabold text-amber">{stat.num}</div>
                <div className="text-xs font-bold uppercase tracking-wider text-foreground mt-2">
                  {stat.label}
                </div>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{stat.sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-7xl px-6 lg:px-8 pb-20 sm:pb-28">
          <div className="rounded-2xl bg-forest text-white p-8 sm:p-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold">Go deeper on your county</h2>
            <p className="text-sm text-white/75 leading-relaxed mt-3 max-w-2xl">
              Pick a guide above, or read the full{' '}
              <Link
                href="/blog/ohio-valley-land-market-2026"
                className="text-[#e8c47a] font-semibold hover:text-amber transition-colors"
              >
                Ohio Valley Land Market Guide
              </Link>{' '}
              for regional context across PA, OH, WV, and KY.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-lg bg-amber px-5 py-3 text-sm font-bold text-forest hover:bg-amber/90 transition-colors"
              >
                Read the Blog <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/land"
                data-analytics-event="property_review_cta_click"
                className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-5 py-3 text-sm font-bold hover:bg-white/10 transition-colors"
              >
                Start My Property Review
              </Link>
            </div>
            <LegalDisclaimer className="mt-8" tone="on-dark" />
          </div>
        </section>

      </div>
    </>
  );
}
