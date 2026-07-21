import type { Metadata } from 'next';
import { Users, MapPin, TrendingUp, Bell } from 'lucide-react';
import { InvestorIntakeForm } from '@/components/forms/investor-intake-form';
import { PortalLoginForm } from './PortalLoginForm';

export const metadata: Metadata = {
  title: 'Investor Portal — Join the Ohio Valley Land Deal List',
  description:
    'Join the Ohio Valley Land Partners buyer network and share the counties, acreage, and property types that match your current buying criteria.',
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

const benefits = [
  {
    icon: Bell,
    title: 'Direct Updates',
    description:
      'When an opportunity matches your stated criteria, OVLP may contact you directly through the buyer network.',
  },
  {
    icon: MapPin,
    title: 'Regional Focus',
    description:
      'Acquisition and inventory focus varies by county across the Ohio Valley.',
  },
  {
    icon: TrendingUp,
    title: 'Property Types',
    description:
      'Network interests may include recreational tracts, farm ground, development sites, and commercial parcels.',
  },
  {
    icon: Users,
    title: 'Clear Criteria',
    description:
      'Tell us the counties, acreage, intended use, and budget range that fit your current buying plans.',
  },
];

export default function InvestorPortal() {
  return (
    <div className="min-h-screen bg-background">

      {/* Hero */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <p className="heading-serif text-amber text-2xl mb-3">Buyer Network</p>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Ohio Valley Land
              <span className="block text-amber mt-1">Deal List</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              We’re building a direct network for Ohio Valley land opportunities.
              Tell us what you’re looking for, and we may contact you when a parcel matches
              your stated criteria and the opportunity is ready to share.
            </p>
          </div>

          {/* Member login — embedded form, posts to portal.ohiovalleylandpartners.com */}
          <div className="mx-auto max-w-md mb-20">
            <PortalLoginForm />
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-20">
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.title}
                  className="rounded-xl border border-border bg-card p-6"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber/10 text-amber mb-4">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{b.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{b.description}</p>
                </div>
              );
            })}
          </div>

          {/* Intake form */}
          <div className="mx-auto max-w-2xl">
            <div className="rounded-2xl border border-border bg-card p-8 sm:p-10">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-foreground">Join the Deal List</h2>
                <p className="text-sm text-muted-foreground mt-2">
                  Fill out your criteria below. We match deals to buyers manually — no algorithm, just a direct call.
                </p>
              </div>
              <InvestorIntakeForm />
            </div>
          </div>

          {/* Honest disclaimer */}
          <p className="mt-10 text-center text-xs text-muted-foreground max-w-xl mx-auto">
            Ohio Valley Land Partners operates as a principal buyer — not a licensed real estate
            agent or broker. Inventory and deal flow vary. Joining the list gives OVLP permission
            to contact you when an opportunity appears to match your stated criteria.
          </p>
        </div>
      </section>
    </div>
  );
}
