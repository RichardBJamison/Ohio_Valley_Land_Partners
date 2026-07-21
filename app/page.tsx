import type { Metadata } from 'next';
import { HeroSection } from '@/components/home/hero-section';
import {
  AccountabilityFlipGrid,
  CountyFlipGrid,
  HomepageFAQFlipList,
  TrustFlipGrid,
} from '@/components/home/flip-groups';
import type { AccountabilityItem } from '@/components/home/flip-groups';
import { FAQSchema } from '@/components/seo/json-ld';
import { ArrowRight, Target } from 'lucide-react';
import Link from 'next/link';
import { defaultOgImages, siteConfig } from '@/lib/seo-config';
import { countySellPages } from '@/lib/county-sell-data';
import { LegalDisclaimer } from '@/components/legal-disclaimer';
import { communityGiving, faqFraming, sellerPositioning } from '@/lib/public-copy';
import { homepageSeoMeta } from '@/lib/seo-meta';

export const metadata: Metadata = {
  title: { absolute: homepageSeoMeta.title },
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
    question: 'What types of property does Ohio Valley Land Partners review?',
    answer:
      'OVLP reviews vacant lots, inherited land, tax-burdened parcels, rural acreage, infill lots, and other difficult-to-manage property for possible direct purchase. Acquisition focus varies by county and by the facts of each parcel.',
  },
  {
    question: 'What happens after I share the property address?',
    answer:
      'OVLP reviews available parcel, tax, access, title, zoning, surrounding-activity, and possible-use information. If the property appears to fit our current criteria, we contact you, ask any necessary questions, and decide whether a written proposal makes sense.',
  },
  {
    question: 'Does requesting a property review commit me to sell?',
    answer:
      'No. Sharing a property does not commit you to sell, and receiving a proposal does not require you to accept it. You decide whether the written terms make sense for you.',
  },
  {
    question: 'How does OVLP develop a direct purchase proposal?',
    answer:
      'OVLP considers location, size, access, title information, taxes, zoning, nearby activity, possible use, holding costs, and purchase risk. This is an internal acquisition review for OVLP’s own account, not a formal appraisal or statement of market value.',
  },
  {
    question: 'Will every submitted property receive an offer?',
    answer:
      'No. Some properties will not fit OVLP’s current buying criteria. When the property fits and the available information supports a purchase, OVLP may present a written proposal.',
  },
  {
    question: 'Will OVLP review inherited land or property with delinquent taxes?',
    answer:
      'Yes, OVLP may review inherited or tax-burdened property. Ownership authority, balances, deadlines, and closing requirements are property-specific, so owners should confirm those issues with the appropriate attorney, title company, county office, and tax professional.',
  },
  {
    question: 'Will OVLP review a landlocked parcel or land with difficult access?',
    answer:
      'Yes, access-limited parcels are reviewed case by case. Recorded access, easements, terrain, neighboring uses, and possible future use may affect whether the property fits our criteria. OVLP’s review is not a survey or legal access opinion.',
  },
  {
    question: 'Where does Ohio Valley Land Partners review property?',
    answer:
      'OVLP reviews property across the Ohio Valley, with active acquisition focus varying by county and campaign. The county pages list the areas where we currently publish local acquisition information; owners in other regional counties may still share an address for review.',
  },
];

const whatWeDo: AccountabilityItem[] = [
  {
    name: 'A principal-led review',
    description: 'OVLP keeps property review, acquisition strategy, seller communication, and purchase decisions close to the people responsible for each transaction.',
    href: '/about',
    icon: 'tree',
    tag: 'Direct Accountability',
  },
  {
    name: 'A property-specific review',
    description: 'The goal is to understand the parcel, explain whether it fits OVLP’s buying criteria, and create a clear path when both sides want to proceed.',
    href: '/land#how-it-works',
    icon: 'map',
    tag: 'Direct Process',
  },
];

export default function Home() {
  return (
    <>
      <FAQSchema faqs={homepageFAQs} />

      <HeroSection />

      {/* Seller empathy — existing banner design retained */}
      <section className="border-b border-amber/20 bg-amber/5">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber/30 bg-amber/10 px-3 py-1 text-xs font-semibold text-amber mb-4">
                <Target className="h-3.5 w-3.5" />
                Start with what you know
              </div>
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                Owning land can become more complicated than expected.
              </h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Some owners inherited property they have never visited. Others are paying taxes
                on land they no longer use, dealing with title questions, or trying to understand
                whether a parcel has any practical future. You do not need to solve every issue
                before contacting OVLP. Start with the address. We will help identify the questions
                that matter.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href={`tel:${siteConfig.phone.replace(/\D/g, '')}`}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground hover:border-amber/40 transition-colors"
              >
                Talk With a Local Buyer
              </a>
              <Link
                href="/#property-review"
                data-analytics-event="homepage_property_review_cta_click"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber px-5 py-3 text-sm font-bold text-forest hover:bg-amber/90 transition-colors"
              >
                Start My Property Review <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sell-land index — crawl paths for county conversion pages */}
      <section id="where-we-buy" className="py-16 border-b border-border bg-card scroll-mt-28">
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
          <CountyFlipGrid
            counties={countySellPages.map(({ slug, name, stateAbbr }) => ({ slug, name, stateAbbr }))}
          />
          <p className="mt-8 text-center text-sm text-muted-foreground">
            We also publish property context for{' '}
            <Link href="/ohio-valley-guides/geauga-county-oh" className="text-meadow font-semibold hover:underline">
              Geauga County, Ohio
            </Link>
            {' '}—{' '}
            <Link href="/ohio-valley-guides" className="text-meadow font-semibold hover:underline">
              browse all county guides
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Trust strip — existing three-column layout retained */}
      <section className="py-16 border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 text-center">
            <div className="flex flex-col items-center gap-2">
              <span className="text-5xl font-black text-amber">Local</span>
              <span className="text-sm font-semibold text-foreground">Principal Buyer</span>
              <span className="text-xs text-muted-foreground max-w-[200px]">
                Property review and seller communication stay close to the people making the purchase decision.
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-5xl font-black text-amber">Specific</span>
              <span className="text-sm font-semibold text-foreground">Parcel-by-Parcel Review</span>
              <span className="text-xs text-muted-foreground max-w-[200px]">
                Access, taxes, title information, zoning, surroundings, and possible use all matter.
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-5xl font-black text-amber">Optional</span>
              <span className="text-sm font-semibold text-foreground">No Obligation to Sell</span>
              <span className="text-xs text-muted-foreground max-w-[200px]">
                A property review is a first conversation, not a commitment to accept a proposal.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-24 sm:py-32 bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="heading-serif text-amber text-2xl mb-3">Direct accountability</p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              The people reviewing your property
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Your property is not sent into a national call center or an anonymous offer system.
              Ohio Valley Land Partners reviews each opportunity directly, studies the available
              property information, and communicates with owners throughout the process.
            </p>
          </div>
          <AccountabilityFlipGrid items={whatWeDo} />
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
          <HomepageFAQFlipList faqs={homepageFAQs} />
          <LegalDisclaimer className="mt-10 text-center max-w-xl mx-auto" />
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Have a question that isn&apos;t answered here?{' '}
            <Link href="/contact" className="text-meadow hover:underline font-semibold">
              Contact us directly.
            </Link>
          </p>
        </div>
      </section>

      {/* Final CTA — existing split section and cards retained */}
      <section className="py-24 sm:py-32 bg-card border-t border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
            <div>
              <p className="heading-serif text-amber text-2xl mb-3">Start with the address</p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Not sure whether your property fits?
                <span className="block text-amber mt-1">Start with the address.</span>
              </h2>
              <div className="mt-6 flex flex-col gap-4 text-muted-foreground leading-8">
                <p>
                  You do not need to understand the title, zoning, taxes, access, or possible use
                  before reaching out. Share what you know, and we will begin there.
                </p>
                <p>
                  {communityGiving.mission}
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/#property-review"
                  data-analytics-event="homepage_property_review_cta_click"
                  className="inline-flex items-center gap-2 rounded-lg bg-amber px-6 py-3 text-sm font-bold text-forest hover:bg-amber/90 transition-colors"
                >
                  Start My Property Review <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={`tel:${siteConfig.phone.replace(/\D/g, '')}`}
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-6 py-3 text-sm font-bold text-foreground hover:border-amber/50 transition-colors"
                >
                  Talk With a Local Buyer
                </a>
              </div>
            </div>

            <TrustFlipGrid
              items={[
                { label: sellerPositioning.analysisLabel, value: 'Direct', sub: sellerPositioning.analysisSub },
                { label: 'Regional focus', value: 'Ohio Valley', sub: 'Active acquisition focus varies by county and campaign' },
                { label: 'Owner choice', value: 'No obligation', sub: 'Requesting a review does not commit you to sell' },
                { label: 'Community commitment', value: '5%', sub: communityGiving.statSub },
              ]}
            />
          </div>
        </div>
      </section>
    </>
  );
}
