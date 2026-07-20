import type { Metadata } from 'next';
import { BreadcrumbSchema, OrganizationSchema } from '@/components/seo/json-ld';
import { Bell, MapPin, ArrowRight, TreePine } from 'lucide-react';
import Link from 'next/link';
import { InvestorIntakeForm } from '@/components/forms/investor-intake-form';

export const metadata: Metadata = {
  title: 'Buy Land — Ohio Valley Land Partners',
  description: 'Join the OVLP buyer network and share your property criteria. Inventory and acquisition focus vary by county, with published acquisition areas concentrated in Ohio and West Virginia.',
  keywords: 'buy land Ohio Valley, off-market land deals Ohio, hunting land Ohio, farm ground Ohio West Virginia, land buyer network',
};

const regions = [
  'Ohio acquisition areas',
  'West Virginia acquisition areas',
  'Other matching Ohio Valley inventory',
];

export default function PropertiesPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Home', url: '/' }, { name: 'Buy Land', url: '/properties' }]} />
      <OrganizationSchema />

      <div className="min-h-screen bg-background">

        {/* Hero */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-start">

              <div>
                <p className="heading-serif text-amber text-2xl mb-4">Buyer network</p>
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl leading-tight">
                  Off-Market Land Deals
                  <span className="block text-amber mt-1">in the Ohio Valley.</span>
                </h1>
                <p className="mt-6 text-lg leading-8 text-muted-foreground">
                  Join the buyer list and tell us what you are looking for. OVLP may contact
                  members when matching inventory becomes available; inventory, timing, and
                  active focus vary by county.
                </p>

                <div className="mt-8 flex flex-col gap-3">
                  {[
                    { icon: Bell, text: 'Updates when matching inventory becomes available' },
                    { icon: TreePine, text: 'Hunting, farm, development & investment parcels' },
                    { icon: MapPin, text: 'Published acquisition areas are concentrated in Ohio and West Virginia' },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.text} className="flex items-center gap-3 text-sm font-medium text-foreground">
                        <Icon className="h-4 w-4 text-amber flex-shrink-0" />
                        {item.text}
                      </div>
                    );
                  })}
                </div>

                {/* County coverage */}
                <div className="mt-10 pt-8 border-t border-border">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">
                    Ohio Valley Region
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {regions.map((r) => (
                      <span
                        key={r}
                        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground"
                      >
                        <MapPin className="h-3 w-3 text-amber" />
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Intake form */}
              <div className="rounded-2xl border border-border bg-card p-8 shadow-lg">
                <div className="mb-6 text-center">
                  <h2 className="text-xl font-bold text-foreground">Join the Deal List</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Share your criteria. We contact you when a matching opportunity is available.
                  </p>
                </div>
                <InvestorIntakeForm />
              </div>
            </div>
          </div>
        </section>

        {/* No public listings note */}
        <section className="py-16 bg-card border-t border-border">
          <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
            <h2 className="text-xl font-bold text-foreground mb-4">How Buyer-List Updates Work</h2>
            <p className="text-muted-foreground leading-8 mb-4">
              When OVLP has a parcel ready for buyer review, we may contact buyer-list members
              whose submitted criteria appear to match. Property availability, outreach order,
              process, and terms vary by opportunity.
            </p>
            <p className="text-muted-foreground leading-8">
              Join the list if you want OVLP to consider your criteria when matching inventory
              becomes available in a current acquisition area.
            </p>
            <div className="mt-8">
              <Link
                href="/investor-portal"
                data-analytics-event="buyer_portal_click"
                className="inline-flex items-center gap-2 rounded-lg bg-amber px-6 py-3 text-sm font-bold text-forest hover:bg-amber/90 transition-colors"
              >
                Full Buyer Portal <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
