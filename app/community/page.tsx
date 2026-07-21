import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { communityGiving } from '@/lib/public-copy';
import { siteConfig } from '@/lib/seo-config';

export const metadata: Metadata = {
  title: { absolute: 'Community — Ohio Valley Land Partners' },
  description:
    'Ohio Valley Land Partners is rooted in the Ohio Valley — landowners, builders, conservation partners, and families rebuilding after disaster. One valley. One table.',
  keywords: [
    'Ohio Valley community',
    'Ohio land buyer local',
    'Arc of Appalachia partner',
    'East Palestine land buyer',
    'COCIC Franklin County Land Bank',
    'Ohio Valley builders network',
  ],
  alternates: {
    canonical: `${siteConfig.url}/community`,
  },
};

const COUNTY_PILLS = [
  'Franklin County',
  'Columbiana County',
  'Belmont County',
  'Jefferson County',
  '+ 5 more',
];

const HERO_STATS = [
  { num: '9', label: 'Active Counties', sub: 'Ohio & West Virginia campaigns' },
  { num: '1.77M+', label: 'Valley Acres', sub: 'The landscape we know and work in' },
  { num: 'Local', label: 'Not a Land Grab', sub: 'Intentional buyer, not an algorithm' },
];

const PILLARS = [
  {
    icon: '🌲',
    title: 'The Land',
    description:
      'Forests, infill lots, inherited parcels, back-tax acreage — land that matters to families here, not line items on a spreadsheet.',
  },
  {
    icon: '🤝',
    title: 'The People',
    description:
      'Landowners selling with dignity. Builders getting first look at inventory. Neighbors still living with East Palestine.',
  },
  {
    icon: '🏘️',
    title: 'The Partners',
    description:
      'Organizations already doing stewardship, recovery, and stabilization — we stand with them because we work in the same counties.',
  },
];

const PARTNERS = [
  {
    tag: 'Conservation',
    name: 'Arc of Appalachia',
    url: 'https://arcofappalachia.org',
    tagline: "Protecting Ohio's forests, wetlands, and wild places.",
    description:
      'Permanently protects natural lands across the Ohio Hill Country — restoring invasive damage, clearing illegal dumps, maintaining trails that connect communities to the landscape.',
    region: 'Southern & Eastern Ohio',
    image: '/community/partner-forest.jpg',
    alt: 'Appalachian forest canopy',
  },
  {
    tag: 'Disaster Recovery',
    name: 'Salvation Army — East Palestine',
    url: 'https://www.salvationarmyusa.org',
    tagline: 'On the ground when Ohio Valley families need it most.',
    description:
      'Since the February 2023 derailment in Columbiana County — clean water, supplies, food, and emotional support for families whose land and health were compromised through no fault of their own.',
    region: 'East Palestine, OH',
    image: '/community/partner-community.jpg',
    alt: 'Community members together',
  },
  {
    tag: 'Land Banking',
    name: 'COCIC Franklin County Land Bank',
    url: 'https://cocic.org',
    tagline: 'Returning vacant properties to productive community use.',
    description:
      'Acquires tax-delinquent and abandoned parcels, demolishes blight, cleans contaminated sites, and transfers stabilized land to trusts, developers, and homeowners rebuilding neighborhoods.',
    region: 'Franklin County, OH',
    image: '/community/partner-urban.jpg',
    alt: 'Urban neighborhood renewal',
  },
];

function ValleyMap() {
  return (
    <svg className="w-full h-auto" viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect width="400" height="280" rx="12" fill="#f0ebe3" />
      <ellipse cx="200" cy="140" rx="160" ry="110" fill="#d4e8dc" opacity="0.6" />
      <circle cx="120" cy="100" r="28" fill="#33755e" opacity="0.85" />
      <circle cx="200" cy="80" r="22" fill="#c8963a" opacity="0.9" />
      <circle cx="280" cy="120" r="26" fill="#33755e" opacity="0.75" />
      <circle cx="160" cy="170" r="20" fill="#33755e" opacity="0.7" />
      <circle cx="240" cy="180" r="18" fill="#33755e" opacity="0.65" />
      <text x="120" y="104" textAnchor="middle" fill="white" fontSize="9" fontFamily="sans-serif" fontWeight="700">Franklin</text>
      <text x="200" y="84" textAnchor="middle" fill="#1a2e1a" fontSize="8" fontFamily="sans-serif" fontWeight="700">Columbiana</text>
      <text x="280" y="124" textAnchor="middle" fill="white" fontSize="8" fontFamily="sans-serif" fontWeight="700">Belmont</text>
      <text x="200" y="250" textAnchor="middle" fill="#6b7268" fontSize="11" fontFamily="serif" fontStyle="italic">Ohio Valley</text>
    </svg>
  );
}

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-background">

      {/* Hero */}
      <section className="relative min-h-[85vh] lg:min-h-[92vh] flex items-center overflow-hidden bg-forest">
        <Image
          src="/community/hero-valley.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-forest/95 via-forest/80 to-forest/35"
          aria-hidden
        />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="animate-fade-up">
              <p className="heading-serif text-amber text-2xl sm:text-3xl mb-4 text-[#e8c47a]">
                This is our home.
              </p>
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.08]">
                The Ohio Valley
                <span className="block text-amber mt-2">is the community.</span>
              </h1>
              <p className="mt-6 text-base sm:text-lg text-white/80 leading-relaxed max-w-lg">
                OVLP isn&apos;t a buyer that happens to operate here — we&apos;re rooted in these counties.
                Landowners, builders, conservation partners, families rebuilding after disaster.
                One valley. One table.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
                {HERO_STATS.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-white/10 bg-white/[0.07] backdrop-blur-sm px-4 py-5"
                  >
                    <div className="text-2xl font-extrabold text-amber">{stat.num}</div>
                    <div className="text-[0.65rem] font-semibold uppercase tracking-wider text-white/90 mt-1">
                      {stat.label}
                    </div>
                    <div className="text-[0.65rem] text-white/50 mt-1.5 leading-snug">{stat.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative hidden lg:block animate-fade-up-delay-1">
              <div className="relative arch-frame shadow-2xl">
                <Image
                  src="/community/forest-arch.jpg"
                  alt="Ohio Appalachian forest"
                  width={480}
                  height={600}
                  className="w-full aspect-[4/5] object-cover"
                  sizes="(max-width: 1024px) 0vw, 480px"
                />
              </div>
              <div className="absolute -bottom-6 -left-8 max-w-[280px] rounded-2xl bg-white p-5 shadow-xl">
                <p className="heading-serif text-forest text-lg leading-snug">
                  &ldquo;We&apos;re not building a business on top of this valley. We&apos;re building it into the valley.&rdquo;
                </p>
                <cite className="block mt-3 text-xs font-semibold text-muted-foreground not-italic">
                  — Ohio Valley Land Partners
                </cite>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* County ribbon */}
      <div className="bg-forest text-white/90 text-center px-6 py-4 border-b border-white/10">
        <p className="text-sm font-medium">Active across the Ohio Valley</p>
        <div className="flex flex-wrap justify-center gap-2.5 mt-2.5">
          {COUNTY_PILLS.map((county) => (
            <span
              key={county}
              className="text-xs font-semibold px-3.5 py-1.5 rounded-full bg-white/[0.08] border border-white/10 text-[#e8c47a]"
            >
              {county}
            </span>
          ))}
        </div>
      </div>

      {/* Pillars */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="heading-serif text-amber text-2xl mb-3">What community means here</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Land. People. Partners.</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Community on this page isn&apos;t a giving report — it&apos;s the counties, the families,
              and the organizations doing real work alongside us.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PILLARS.map((pillar) => (
              <div
                key={pillar.title}
                className="rounded-2xl border border-border bg-card p-8 shadow-sm"
              >
                <div className="text-3xl mb-4" aria-hidden>{pillar.icon}</div>
                <h3 className="text-lg font-bold">{pillar.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map + place */}
      <section className="py-20 sm:py-24 bg-card">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <p className="heading-serif text-amber text-2xl mb-3">Where we show up</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Same counties.
              <br />
              Same obligation.
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Franklin County infill. Columbiana County recovery. Belmont timber and watershed.
              When we close a deal in a county, we&apos;re already connected to the people and organizations
              doing the hardest work there.
            </p>
          </div>
          <div className="rounded-3xl border border-border bg-muted p-8 shadow-sm">
            <ValleyMap />
            <div className="flex flex-wrap gap-2 mt-5">
              {['Arc of Appalachia', 'Salvation Army — East Palestine', 'COCIC Land Bank'].map((label) => (
                <span
                  key={label}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full bg-card text-meadow"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="heading-serif text-amber text-2xl mb-3">Organizations we stand with</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Real partners. Real work.</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Stewardship, recovery, and land banking — in the same counties where we buy and close.
            </p>
          </div>

          <div className="flex flex-col gap-8">
            {PARTNERS.map((partner, i) => (
              <article
                key={partner.name}
                className={`grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden border border-border bg-card shadow-sm min-h-[320px] ${
                  i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
                }`}
              >
                <div className="relative min-h-[240px] lg:min-h-full">
                  <Image
                    src={partner.image}
                    alt={partner.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest/50 to-transparent" aria-hidden />
                </div>
                <div className="flex flex-col justify-center p-8 sm:p-10">
                  <span className="text-[0.68rem] font-bold uppercase tracking-widest text-meadow mb-3">
                    {partner.tag}
                  </span>
                  <h3 className="text-2xl font-extrabold">{partner.name}</h3>
                  <p className="text-amber font-semibold text-sm mt-2">{partner.tagline}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-4">{partner.description}</p>
                  <span className="inline-flex w-fit mt-5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-muted text-muted-foreground">
                    {partner.region}
                  </span>
                  <a
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 text-sm font-bold text-meadow hover:text-meadow/80 transition-colors"
                  >
                    Visit {partner.name.split(' — ')[0]} →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* East Palestine */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 pb-20 sm:pb-24">
        <div className="relative rounded-3xl overflow-hidden min-h-[420px] flex items-end">
          <Image
            src="/community/ep-feature.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-forest/95 via-forest/55 to-forest/20"
            aria-hidden
          />
          <div className="relative z-10 p-8 sm:p-12 max-w-xl text-white">
            <p className="heading-serif text-[#e8c47a] text-xl mb-3">Personal to us</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold">Why East Palestine Matters</h2>
            <p className="mt-4 text-sm sm:text-base text-white/80 leading-relaxed">
              Columbiana County is one of our core markets. Families there are still living with contaminated
              soil, water, and air — some selling to relocate, others staying to rebuild.
            </p>
            <p className="mt-3 text-sm sm:text-base text-white/80 leading-relaxed">
              They deserve a buyer who understands what happened — not one treating it as just another deal.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/sell-land/columbiana-county-oh"
                className="inline-flex items-center gap-2 rounded-lg bg-amber px-5 py-3 text-sm font-bold text-forest hover:bg-amber/90 transition-colors"
              >
                Sell Columbiana County Land <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg border border-white/35 px-5 py-3 text-sm font-bold text-white hover:bg-white/10 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Two sides of the table */}
      <section className="pb-20 sm:pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-3xl bg-muted p-10 flex flex-col justify-center">
            <h3 className="text-xl sm:text-2xl font-extrabold">Own land in the Ohio Valley?</h3>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Direct buyer. No agents. No runaround. We know these counties because we work them every day —
              not because a spreadsheet told us to.
            </p>
            <Link
              href="/#property-review"
              data-analytics-event="property_review_cta_click"
              className="mt-6 inline-flex w-fit items-center gap-2 rounded-lg bg-amber px-5 py-3 text-sm font-bold text-forest hover:bg-amber/90 transition-colors"
            >
              Request Property Review <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="rounded-3xl bg-forest p-10 flex flex-col justify-center text-white">
            <h3 className="text-xl sm:text-2xl font-extrabold">Build or develop here?</h3>
            <p className="mt-4 text-sm text-white/75 leading-relaxed">
              The Builders Network gives members first look at off-market parcels across the valley —
              before they go anywhere public.
            </p>
            <Link
              href="/investor-portal"
              data-analytics-event="builders_network_click"
              className="mt-6 inline-flex w-fit items-center gap-2 rounded-lg bg-amber px-5 py-3 text-sm font-bold text-forest hover:bg-amber/90 transition-colors"
            >
              Join the Builders Network <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Quiet giving line */}
      <section className="pb-20 sm:pb-28">
        <p className="mx-auto max-w-2xl px-6 text-center heading-serif text-meadow text-xl sm:text-2xl leading-relaxed">
          {communityGiving.communityClosing}
        </p>
      </section>

    </div>
  );
}
