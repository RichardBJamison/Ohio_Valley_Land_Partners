import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Heart, Shield, MapPin, Handshake } from 'lucide-react';
import { LegalDisclaimer } from '@/components/legal-disclaimer';
import { communityGiving } from '@/lib/public-copy';
import { siteConfig } from '@/lib/seo-config';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Meet the people behind Ohio Valley Land Partners, a regional principal buyer focused on property-specific review, direct communication, and local reinvestment.',
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
};

const principles = [
  {
    icon: Shield,
    title: 'Clear Purchase Proposals.',
    description:
      'When we present a proposal, we explain the acquisition factors that shaped our number. It reflects our own business judgment and is not an appraisal or statement of market value.',
  },
  {
    icon: Handshake,
    title: 'Direct. No Middlemen.',
    description:
      'We approach owners as a prospective principal buyer. Any transaction depends on property review, mutually acceptable written terms, title work, and the parties\' independent professional advice.',
  },
  {
    icon: MapPin,
    title: 'Regional Accountability.',
    description:
      'OVLP reviews property across the Ohio Valley, with active acquisition focus varying by county and campaign. Local context, direct communication, and property-specific facts shape every decision.',
  },
  {
    icon: Heart,
    title: 'Built to Give Back.',
    description:
      communityGiving.principles,
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">

      {/* Hero */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <p className="heading-serif text-amber text-2xl mb-4">Our story</p>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl leading-tight">
              A Direct Regional Buyer
              <span className="block text-amber mt-2">That Studies Each Property.</span>
            </h1>
            <div className="mt-8 flex flex-col gap-5 text-lg leading-9 text-muted-foreground">
              <p>
                Land can become difficult to manage for many reasons: inheritance, distance,
                recurring taxes, uncertain access, title questions, or a parcel that no longer
                has a clear purpose for the owner.
              </p>
              <p>
                Ohio Valley Land Partners approaches those situations as a prospective principal
                buyer. We study the available property information, explain whether the parcel
                fits our current buying criteria, and communicate directly with the owner.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-16 border-t border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-foreground">How We Operate</h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Four principles that guide how we approach direct acquisition inquiries.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="rounded-2xl border border-border bg-background p-8">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber/10 text-amber mb-5">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-3">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-7">{p.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Principal trust layer */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                A principal-led property review
              </h2>
              <div className="flex flex-col gap-5 text-muted-foreground leading-8">
                <p>
                  <strong className="text-foreground">Ohio Valley Land Partners</strong><br />
                  Regional principal buyer
                </p>
                <p>
                  Property review, acquisition strategy, seller communication, and the systems
                  behind each transaction stay close to the people responsible for the decision.
                  The goal is not to pressure an owner into selling. It is to understand the
                  property, explain whether it fits OVLP’s buying criteria, and create a clear path
                  when both sides want to proceed.
                </p>
                <p>
                  Your property is not sent into a national call center or an anonymous offer system.
                  OVLP reviews each opportunity directly and communicates with owners throughout the process.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-meadow/30 bg-meadow/5 p-10">
              <Heart className="h-10 w-10 text-meadow mb-6" />
              <h3 className="text-xl font-bold text-foreground mb-4">
                Community Reinvestment Commitment
              </h3>
              <div className="flex flex-col gap-4 text-sm text-muted-foreground leading-7 mb-6">
                <p>{communityGiving.principles}</p>
                <p>
                  The community page highlights regional stewardship, recovery, and land-banking
                  work that helps explain the kinds of local needs OVLP is studying. It does not
                  claim a completed distribution, recipient relationship, or community outcome.
                </p>
              </div>
              <Link
                href="/community"
                className="inline-flex items-center gap-2 text-sm font-semibold text-meadow hover:text-meadow/80 transition-colors"
              >
                Read our community commitment <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Who this is for */}
      <section className="py-16 bg-card border-t border-border">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Who We’re Here For</h2>
          <div className="flex flex-col gap-4 text-muted-foreground leading-8">
            <p>
              We built this company for the family that inherited land from a parent and does not
              know what to do with it. For the owner paying taxes on a parcel they have not visited
              in years. For the estate representative exploring possible buyers while relying on
              the estate’s own professionals. For the out-of-state owner who needs a clear first step.
            </p>
            <p>
              We are not the right buyer for every deal. But for land in the Ohio Valley
              or Franklin County — rural parcels, vacant lots, inherited properties,
              back-tax land, and infill lots — we are prepared to review the property and determine whether it fits our acquisition criteria.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/#property-review"
              data-analytics-event="property_review_cta_click"
              className="inline-flex items-center gap-2 rounded-lg bg-amber px-6 py-3 text-sm font-bold text-forest hover:bg-amber/90 transition-colors"
            >
              Start My Property Review <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-6 py-3 text-sm font-bold text-foreground hover:border-amber/50 transition-colors"
            >
              Contact Us
            </Link>
          </div>
          <LegalDisclaimer className="mt-10" />
        </div>
      </section>
    </div>
  );
}
