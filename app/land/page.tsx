import type { Metadata } from 'next';
import { silos, siteConfig } from '@/lib/seo-config';
import { ArrowRight, MapPin, ShieldCheck, TreePine } from 'lucide-react';
import Link from 'next/link';
import { BreadcrumbSchema } from '@/components/seo/json-ld';
import { SellerForm } from '@/components/forms/seller-form';
import { LegalDisclaimer } from '@/components/legal-disclaimer';
import { sellerPositioning } from '@/lib/public-copy';
import { ProcessFlipGrid } from '@/components/home/flip-groups';
import type { ProcessItem } from '@/components/home/flip-groups';

export const metadata: Metadata = {
  title: { absolute: 'Sell Land Directly in the Ohio Valley | OVLP' },
  description: silos.land.description,
  keywords: silos.land.keywords,
  alternates: {
    canonical: `${siteConfig.url}/land`,
  },
  openGraph: {
    url: `${siteConfig.url}/land`,
  },
};

const counties = [
  { label: 'Franklin County, OH', slug: 'franklin-county-oh' },
  { label: 'Belmont County, OH', slug: 'belmont-county-oh' },
  { label: 'Jefferson County, OH', slug: 'jefferson-county-oh' },
  { label: 'Columbiana County, OH', slug: 'columbiana-county-oh' },
  { label: 'Harrison County, OH', slug: 'harrison-county-oh' },
  { label: 'Carroll County, OH', slug: 'carroll-county-oh' },
  { label: 'Ohio County, WV', slug: 'ohio-county-wv' },
  { label: 'Marshall County, WV', slug: 'marshall-county-wv' },
  { label: 'Brooke County, WV', slug: 'brooke-county-wv' },
];

const process: ProcessItem[] = [
  {
    step: '0.1',
    title: 'Share the Property',
    description: 'Send the property address and the best email to reach you. A parcel number is helpful later, but it is not required to begin.',
  },
  {
    step: '0.2',
    title: 'We Review the Parcel',
    description: 'OVLP examines available property, tax, access, title, zoning, surrounding-market, and possible-use information.',
  },
  {
    step: '0.3',
    title: 'We Speak With You',
    description: 'We ask any necessary questions and explain whether the property appears to fit our current acquisition criteria.',
  },
  {
    step: '0.4',
    title: 'You May Receive a Written Proposal',
    description: 'When the property fits and the information supports a purchase, OVLP may present a direct written proposal.',
  },
  {
    step: '0.5',
    title: 'You Decide',
    description: 'There is no obligation to accept. If both sides proceed, the transaction moves through title review and closing.',
  },
];

const whatWeBuy = [
  'Vacant lots and unused land',
  'Inherited and estate-owned property',
  'Land with delinquent or repeated tax bills',
  'Farm ground and rural acreage',
  'Timber tracts and hunting land',
  'Property owned from outside the region',
  'Parcels that did not sell through a prior listing',
  'Family property no one wants to manage',
];

export default function LandPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Home', url: '/' }, { name: silos.land.title, url: silos.land.path }]} />

      <div className="min-h-screen bg-background">

        {/* Hero + Form */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-start">

              <div>
                <p className="heading-serif text-amber text-2xl mb-4">Local land buyer</p>
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl leading-tight">
                  Explore a direct sale for your land.
                  <span className="block text-amber mt-1">Regional knowledge. Property-specific review.</span>
                </h1>
                <p className="mt-6 text-lg leading-8 text-muted-foreground">
                  Ohio Valley Land Partners reviews vacant, inherited, tax-burdened, and
                  difficult-to-manage property across the region for possible direct purchase.
                  Active acquisition focus varies by county and campaign. Share the address and we
                  will determine whether the property fits our current buying criteria.
                </p>
                <ul className="mt-6 flex flex-col gap-3">
                  {[
                    'Local principal buyer',
                    'Property-specific review',
                    'Direct communication',
                    'No obligation to accept a proposal',
                  ].map((point) => (
                    <li key={point} className="flex items-center gap-3 text-sm font-medium text-foreground">
                      <ShieldCheck className="h-4 w-4 text-amber flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>

                {/* County strip */}
                <div className="mt-10 pt-8 border-t border-border">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">
                    Ohio Valley Region
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {counties.map((c) => (
                      <Link
                        key={c.slug}
                        href={`/sell-land/${c.slug}`}
                        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground hover:border-amber/50 hover:text-amber transition-colors"
                      >
                        <MapPin className="h-3 w-3" />
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Seller form */}
              <div id="property-review" className="rounded-2xl border border-border bg-card p-8 shadow-lg scroll-mt-28">
                <div className="mb-6 text-center">
                  <h2 className="text-xl font-bold text-foreground">{sellerPositioning.formTitle}</h2>
                  <p className="text-sm text-muted-foreground mt-1">{sellerPositioning.formSub}</p>
                </div>
                <SellerForm />
              </div>
            </div>
          </div>
        </section>

        {/* Process */}
        <section id="how-it-works" className="py-20 bg-card border-t border-border scroll-mt-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold text-foreground">How It Works</h2>
              <p className="mt-4 text-muted-foreground">Five clear steps, with no obligation to accept a proposal.</p>
            </div>
            <ProcessFlipGrid steps={process} />
          </div>
        </section>

        {/* What we buy */}
        <section className="py-20">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <div className="rounded-2xl border border-border bg-card p-8 sm:p-12">
              <div className="flex items-center gap-3 mb-8">
                <TreePine className="h-6 w-6 text-amber" />
                <h2 className="text-2xl font-bold text-foreground">What We Buy</h2>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {whatWeBuy.map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="mt-1 h-2 w-2 rounded-full bg-amber flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
              <div className="mt-10 pt-8 border-t border-border">
                <p className="text-sm text-muted-foreground mb-4">
                  Not sure whether your property fits? Start with the address. You do not need to
                  understand the title, zoning, taxes, access, or possible use before reaching out.
                  Share what you know, and we will begin there.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/#property-review"
                    data-analytics-event="property_review_cta_click"
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
            </div>
            <LegalDisclaimer className="mt-10 text-center" />
          </div>
        </section>
      </div>
    </>
  );
}
