import type { Metadata } from 'next';
import { silos, siteConfig } from '@/lib/seo-config';
import { ArrowRight, Home, Users, TreePine } from 'lucide-react';
import Link from 'next/link';
import { BreadcrumbSchema } from '@/components/seo/json-ld';

export const metadata: Metadata = {
  title: silos.development.title,
  description: silos.development.description,
  keywords: silos.development.keywords,
  alternates: {
    canonical: `${siteConfig.url}${silos.development.path}`,
  },
  openGraph: {
    url: `${siteConfig.url}${silos.development.path}`,
  },
};

export default function DevelopmentPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Home', url: '/' }, { name: silos.development.title, url: silos.development.path }]} />

      <div className="min-h-screen bg-background">

        {/* Hero */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <p className="heading-serif text-amber text-2xl mb-4">Residential development</p>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl leading-tight">
                Building Communities
                <span className="block text-amber mt-1">in the Ohio Valley.</span>
              </h1>
              <p className="mt-6 text-xl leading-8 text-muted-foreground">
                Residential development is part of our long-term vision for the Ohio Valley.
                Our current focus is land acquisition — we are actively identifying parcels with
                development potential in active acquisition areas across the Ohio Valley.
              </p>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                If you have land you believe has residential development potential, contact us.
                We review possible development sites for our own account and may present a property-specific purchase proposal when a parcel fits our criteria.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/#property-review"
                  data-analytics-event="property_review_cta_click"
                  className="inline-flex items-center gap-2 rounded-lg bg-amber px-6 py-3 text-sm font-bold text-forest hover:bg-amber/90 transition-colors"
                >
                  Start My Property Review <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/investor-portal"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-sm font-bold text-foreground hover:border-amber/50 transition-colors"
                >
                  Join Our Buyer Network
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* What we're building toward */}
        <section className="py-16 bg-card border-t border-border">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-foreground mb-10">What We’re Building Toward</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              {[
                {
                  icon: TreePine,
                  title: 'Land-First Strategy',
                  description: 'Every development starts with a land acquisition. We buy the parcels first — off-market, direct from owners — before development planning begins.',
                },
                {
                  icon: Home,
                  title: 'Ohio Valley-Focused',
                  description: 'We study development opportunities within active Ohio Valley acquisition areas, with local context shaping every property decision.',
                },
                {
                  icon: Users,
                  title: 'Community-First Design',
                  description: 'Development in the Ohio Valley means understanding the local economy, the people, and what actually serves the region — not what works in a bigger market.',
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="rounded-xl border border-border bg-background p-8">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber/10 text-amber mb-5">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-bold text-foreground mb-3">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-7">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Sell your development land */}
        <section className="py-20">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <div className="rounded-2xl border border-amber/30 bg-amber/5 p-8 sm:p-10 text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Own Land with Development Potential?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                If you have a parcel in the Ohio Valley — large acreage, vacant land near existing
                infrastructure, or farm ground near growing areas — we welcome a conversation.
                We may present a property-specific proposal when the parcel fits our criteria.
              </p>
              <Link
                href="/#property-review"
                data-analytics-event="property_review_cta_click"
                className="inline-flex items-center gap-2 rounded-lg bg-amber px-8 py-4 text-base font-bold text-forest hover:bg-amber/90 transition-colors"
              >
                Start My Property Review <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="mt-6 text-xs text-muted-foreground">
                Ohio Valley Land Partners operates as a principal buyer of real estate, not a licensed broker or agent.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
