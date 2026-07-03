import type { Metadata } from 'next';
import { HeroSection } from '@/components/home/hero-section';
import { LocalBusinessSchema, FAQSchema } from '@/components/seo/json-ld';
import { TreePine, Clock, DollarSign, MapPin, Heart, ChevronDown, ArrowRight, Target } from 'lucide-react';
import Link from 'next/link';
import { defaultOgImages, silos, siteConfig } from '@/lib/seo-config';
import { countySellPages } from '@/lib/county-sell-data';
import { campaignFeaturedSlug } from '@/lib/blog-data';
import { LegalDisclaimer } from '@/components/legal-disclaimer';
import { communityGiving, faqFraming, sellerPositioning } from '@/lib/public-copy';
import { homepageSeoMeta } from '@/lib/seo-meta';

export const metadata: Metadata = {
  title: homepageSeoMeta.title,
  description: homepageSeoMeta.description,
  keywords: [...homepageSeoMeta.keywords],
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: homepageSeoMeta.title,
    description: homepageSeoMeta.description,
    url: siteConfig.url,
    images: defaultOgImages,
  },
};

const homepageFAQs = [
  {
    question: 'What does a direct sale to Ohio Valley Land Partners look like?',
    answer:
      'Submit your parcel information for our internal acquisition review. If the property fits our criteria, we may present a written purchase proposal as a prospective principal buyer. Owners remain free to consult an attorney, appraiser, tax professional, or licensed real estate professional and to compare other sale options.',
  },
  {
    question: 'Do you buy land with back taxes or tax liens?',
    answer:
      'We consider properties with reported delinquent taxes, but the effect on ownership, timing, and proceeds depends on the parcel and local process. A title company, attorney, and tax professional can explain how any balance may affect a transaction. Our role is limited to evaluating whether we wish to purchase the property.',
  },
  {
    question: 'Will OVLP consider inherited or estate-owned land?',
    answer:
      'We may review estate-owned parcels as a prospective buyer. Who has authority to sell, and whether a sale can occur before probate concludes, depends on the estate, title, and applicable law. OVLP does not advise on estate strategy. Consult the estate attorney and title company.',
  },
  {
    question: 'Do you buy landlocked parcels with no road access?',
    answer:
      'We review access-limited parcels case by case from our own acquisition perspective. Access, recorded easements, terrain, and neighboring uses may affect our interest and proposed price. Our review is not an appraisal, survey, title opinion, or legal determination.',
  },
  {
    question: 'How fast can you close on vacant land?',
    answer:
      'We can discuss a requested timeline, but every transaction depends on title review, the written agreement, third-party professionals, and property-specific conditions. Any timing discussed before a signed agreement is an estimate, not a guarantee.',
  },
  {
    question: 'What counties in Ohio and West Virginia do you buy land in?',
    answer:
      'We buy across the entire Ohio Valley — Ohio, Pennsylvania, West Virginia, Kentucky, and Indiana — with multiple active campaigns and dedicated sell-land pages and Ohio Valley guides for Franklin, Belmont, Jefferson, Columbiana, Harrison, Carroll, Ohio County WV, Marshall, and Brooke counties.',
  },
  {
    question: 'How do you develop a purchase proposal for land?',
    answer:
      'We review public records and property characteristics to decide what we may be willing to pay for our own account. That figure reflects our intended use, costs, risk, and business judgment; it is not an appraisal, broker price opinion, or statement of market value.',
  },
  {
    question: 'What happens after I submit my parcel information?',
    answer:
      'We start with a full property analysis using available parcel information. If interested, we contact you with a written purchase proposal. Any transaction requires a mutually signed agreement and appropriate title and professional review. You can also reach us at (614) 653-7430.',
  },
];

const whatWeDo = [
  {
    name: silos.land.title,
    description: 'Direct acquisition inquiries for vacant land and other parcels across the Ohio Valley. OVLP acts only as a prospective principal buyer.',
    href: silos.land.path,
    icon: TreePine,
    tag: 'Core Business',
  },
  {
    name: silos.guides.title,
    description: 'County-by-county guides to selling land in the Ohio Valley and active campaign markets — what land sells for, who buys it, and how the process works.',
    href: silos.guides.path,
    icon: MapPin,
    tag: '9 Active',
  },
];

export default function Home() {
  return (
    <>
      <LocalBusinessSchema />
      <FAQSchema faqs={homepageFAQs} />

      <HeroSection />

      {/* Geauga County campaign — Monday outbound push */}
      <section className="border-b border-amber/20 bg-amber/5">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber/30 bg-amber/10 px-3 py-1 text-xs font-semibold text-amber mb-4">
                <Target className="h-3.5 w-3.5" />
                Active Campaign — Geauga County, OH
              </div>
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                Selling vacant land in Chesterland, Chardon, or western Geauga?
              </h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                We are buying vacant lots, inherited parcels, and long-held infill ground across
                western Geauga — ZIP codes 44022, 44023, 44026, 44065, 44072, and 44202. Free
                full property analysis through our Geauga County campaign page.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href={`/blog/${campaignFeaturedSlug}`}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground hover:border-amber/40 transition-colors"
              >
                Read the Geauga guide
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber px-5 py-3 text-sm font-bold text-forest hover:bg-amber/90 transition-colors"
              >
                Request Your Analysis <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sell-land index — crawl paths for county conversion pages */}
      <section className="py-16 border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="heading-serif text-amber text-xl mb-2">Sell Your Land</p>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              {sellerPositioning.countySectionTitle}
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              {sellerPositioning.countySectionSub}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {countySellPages.map((county) => (
              <Link
                key={county.slug}
                href={`/sell-land/${county.slug}`}
                className="flex items-center justify-between rounded-xl border border-border bg-background px-5 py-4 text-sm font-medium text-foreground hover:border-amber/40 hover:text-amber transition-colors"
              >
                <span>
                  {county.name}, {county.stateAbbr}
                </span>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Also buying in{' '}
            <Link href={`/blog/${campaignFeaturedSlug}`} className="text-meadow font-semibold hover:underline">
              Geauga County, Ohio
            </Link>
            {' '}this season —{' '}
            <Link href="/ohio-valley-guides" className="text-meadow font-semibold hover:underline">
              browse all county guides
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Market Coverage — Census-verified numbers */}
      <section className="py-16 border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 text-center">
            <div className="flex flex-col items-center gap-2">
              <span className="text-5xl font-black text-amber">1.77M+</span>
              <span className="text-sm font-semibold text-foreground">Core Ohio Valley Acres</span>
              <span className="text-xs text-muted-foreground max-w-[200px]">
                Multiple active campaigns across OH, PA, WV, KY, and Indiana
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-5xl font-black text-amber">370K+</span>
              <span className="text-sm font-semibold text-foreground">Core Service-Area Population</span>
              <span className="text-xs text-muted-foreground max-w-[200px]">
                Active builders network connecting local buyers across the Ohio Valley.
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-5xl font-black text-amber">9</span>
              <span className="text-sm font-semibold text-foreground">Active Campaigns</span>
              <span className="text-xs text-muted-foreground max-w-[200px]">
                Multiple Ohio Valley campaigns actively giving back to local communities.
              </span>
            </div>
          </div>
          <p className="mt-8 text-center text-xs text-muted-foreground">
            Source: U.S. Census Bureau, 2020 Decennial Census
          </p>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-24 sm:py-32 bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="heading-serif text-amber text-2xl mb-3">Who we are / What we do</p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              We are builders and developers working directly with landowners.
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              No hedge fund. We evaluate land for our own account and connect portfolio opportunities with our private builders network. Property owners choose whether our direct-purchase model fits their goals.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-4xl grid grid-cols-1 gap-8 sm:grid-cols-2">
            {whatWeDo.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.name}
                  className="group relative flex flex-col gap-6 rounded-2xl border border-border bg-card p-8 hover:border-amber/40 transition-all hover:shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber/10 text-amber group-hover:bg-amber group-hover:text-forest transition-colors">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-semibold text-amber/70 border border-amber/20 rounded-full px-3 py-1">
                      {item.tag}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-amber transition-colors">
                      <Link href={item.href}>
                        <span className="absolute inset-0" />
                        {item.name}
                      </Link>
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-auto">
                    <Link
                      href={item.href}
                      className="text-sm font-semibold text-meadow hover:text-meadow/80 transition-colors"
                    >
                      Learn more &rarr;
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ section */}
      <section className="py-24 sm:py-32 bg-background border-t border-border">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="heading-serif text-amber text-2xl mb-3">Common Questions</p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {faqFraming.sectionTitle}
            </h2>
            <p className="mt-4 text-muted-foreground">
              {faqFraming.sectionSub}
            </p>
          </div>
          <dl className="flex flex-col gap-4">
            {homepageFAQs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-xl border border-border bg-card p-6 open:border-amber/30 transition-all"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold text-foreground list-none">
                  <dt>{faq.question}</dt>
                  <ChevronDown className="h-5 w-5 text-amber shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <dd className="mt-4 text-sm leading-7 text-muted-foreground">{faq.answer}</dd>
              </details>
            ))}
          </dl>
          <LegalDisclaimer className="mt-10 text-center max-w-xl mx-auto" />
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Have a question that isn&apos;t answered here?{' '}
            <Link href="/contact" className="text-meadow hover:underline font-semibold">
              Contact us directly.
            </Link>
          </p>
        </div>
      </section>

      {/* Mission section */}
      <section className="py-24 sm:py-32 bg-card border-t border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
            <div>
              <p className="heading-serif text-amber text-2xl mb-3">Why we exist</p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Built for the Ohio Valley.
                <span className="block text-amber mt-1">Not Just Built in It.</span>
              </h2>
              <div className="mt-6 flex flex-col gap-4 text-muted-foreground leading-8">
                <p>
                  We are an intentional buyer — not an international one. Rooted in the
                  Ohio Valley, buying land across counties in Ohio, Pennsylvania, West Virginia,
                  Kentucky, and Indiana — not just one market. No out-of-state hedge fund.
                  A local buyer who knows this region, understands what this
                  land means to families here, and answers the phone.
                </p>
                <p>
                  {communityGiving.mission}
                </p>
              </div>
              <div className="mt-8">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-meadow hover:text-meadow/80 transition-colors"
                >
                  More about who we are and why we started &rarr;
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {[
                { label: sellerPositioning.analysisLabel, value: 'Free', sub: sellerPositioning.analysisSub, icon: Clock },
                { label: 'Ohio Valley coverage', value: '5 States', sub: 'Every county across OH, PA, WV, KY, and IN', icon: MapPin },
                { label: 'Agent fees charged', value: '$0', sub: 'You deal directly with the buyer', icon: DollarSign },
                { label: 'Back to the Ohio Valley', value: '5%', sub: communityGiving.statSub, icon: Heart },
              ].map((item) => (
                <div key={item.label} className="rounded-xl border border-border bg-background p-6">
                  <div className="text-2xl font-black text-amber mb-1">{item.value}</div>
                  <div className="text-sm font-semibold text-foreground mb-1">{item.label}</div>
                  <div className="text-xs text-muted-foreground">{item.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
