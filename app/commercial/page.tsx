import type { Metadata } from 'next';
import { silos, siteConfig } from '@/lib/seo-config';
import { ArrowRight, Building2, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';
import { BreadcrumbSchema } from '@/components/seo/json-ld';

export const metadata: Metadata = {
  title: silos.commercial.title,
  description: silos.commercial.description,
  keywords: silos.commercial.keywords,
  alternates: {
    canonical: `${siteConfig.url}${silos.commercial.path}`,
  },
};

export default function CommercialPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Home', url: '/' }, { name: silos.commercial.title, url: silos.commercial.path }]} />

      <div className="min-h-screen bg-background">

        {/* Hero */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <p className="heading-serif text-amber text-2xl mb-4">Commercial real estate</p>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl leading-tight">
                Commercial Opportunities
                <span className="block text-amber mt-1">in the Ohio Valley.</span>
              </h1>
              <p className="mt-6 text-xl leading-8 text-muted-foreground">
                Ohio Valley Land Partners is actively building its commercial real estate presence
                across the region. Our primary focus is land acquisition — commercial opportunities
                are evaluated on a deal-by-deal basis.
              </p>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                If you have a commercial property in an active Ohio Valley acquisition area and
                want to talk, contact us directly. We don’t run automated
                valuations — we evaluate real deals with real numbers.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/contact?type=commercial"
                  className="inline-flex items-center gap-2 rounded-lg bg-amber px-6 py-3 text-sm font-bold text-forest hover:bg-amber/90 transition-colors"
                >
                  Discuss a Commercial Property <ArrowRight className="h-4 w-4" />
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

        {/* What we look at */}
        <section className="py-16 bg-card border-t border-border">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-foreground mb-10">What We Evaluate</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              {[
                {
                  icon: MapPin,
                  title: 'Known-Market Location',
                  description: 'We prioritize commercial parcels inside active Ohio Valley acquisition areas, with each location reviewed on its own facts.',
                },
                {
                  icon: Building2,
                  title: 'Property-Specific Fit',
                  description: 'We review the location, parcel facts, possible use, and the owner’s situation before deciding whether a direct conversation makes sense.',
                },
                {
                  icon: Phone,
                  title: 'Direct Conversation',
                  description: 'No online intake process for commercial deals. Call us or use the contact form and we\'ll have a direct conversation about what you have.',
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

        {/* CTA */}
        <section className="py-20">
          <div className="mx-auto max-w-xl px-6 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Have a Commercial Property to Discuss?</h2>
            <p className="text-muted-foreground mb-8">
              Use the contact form and select &quot;Commercial&quot; as your inquiry type. Share the address and the best email to reach you.
            </p>
            <Link
              href="/contact?type=commercial"
              className="inline-flex items-center gap-2 rounded-lg bg-amber px-8 py-4 text-base font-bold text-forest hover:bg-amber/90 transition-colors"
            >
              Contact Us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
