import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Heart, Shield, MapPin, Handshake } from 'lucide-react';
import { LegalDisclaimer } from '@/components/legal-disclaimer';
import { communityGiving } from '@/lib/public-copy';
import { siteConfig } from '@/lib/seo-config';

export const metadata: Metadata = {
  title: 'About Us — Ohio Valley Land Partners',
  description:
    'Ohio Valley Land Partners is a principal land buyer focused on direct acquisition inquiries, private portfolio marketing, and community investment in the Ohio Valley.',
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
    title: 'Local. Not a Land Grab.',
    description:
      'There is real concern in the Ohio Valley about outside investors sweeping in to buy family land cheap. We are not that. We are rooted here — buying in specific Ohio Valley counties and running a deliberate Franklin County campaign because we know these markets, not because an algorithm pointed us here.',
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
              We Started This Because
              <span className="block text-amber mt-2">Landowners Deserve Better.</span>
            </h1>
            <div className="mt-8 flex flex-col gap-5 text-lg leading-9 text-muted-foreground">
              <p>
                Selling land in the Ohio Valley is harder than it should be. The traditional
                market ignores rural parcels. National bulk buyers treat them as line items.
                Agents who do take the listing rarely know the county, the zoning, or the
                specific circumstances that make every land sale different.
              </p>
              <p>
                Ohio Valley Land Partners was built to change that — one parcel at a time,
                in counties we know and care about, including our active Franklin County
                campaign. Direct, honest, and committed to doing right by every seller we
                work with.
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

      {/* The mission */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                The Commitment Beyond the Deal
              </h2>
              <div className="flex flex-col gap-5 text-muted-foreground leading-8">
                <p>
                  Ohio Valley Land Partners is currently forming a nonprofit organization
                  dedicated to children and families in need across the Ohio Valley region.
                  A portion of every land transaction we close will fund that organization.
                </p>
                <p>
                  This isn't a cause we added to a website to look good. It is the reason
                  the company was built the way it was — with a long-term commitment to this
                  specific region, not a short-term play to flip deals and move on.
                </p>
                <p>
                  When you sell your land to Ohio Valley Land Partners, part of that transaction
                  stays in the Ohio Valley — invested in the people and families who live here.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-meadow/30 bg-meadow/5 p-10">
              <Heart className="h-10 w-10 text-meadow mb-6" />
              <h3 className="text-xl font-bold text-foreground mb-4">
                Our Community Partners
              </h3>
              <div className="flex flex-col gap-4 text-sm text-muted-foreground leading-7 mb-6">
                <p>
                  <strong className="text-foreground">Arc of Appalachia</strong> — protecting
                  Ohio's forests, wetlands, and waterways. Cleaning up what others have left behind.
                </p>
                <p>
                  <strong className="text-foreground">Salvation Army — East Palestine</strong> — on
                  the ground for Columbiana County families since the 2023 Norfolk Southern
                  derailment. Clean water, cleanup support, and recovery resources.
                </p>
                <p>
                  <strong className="text-foreground">COCIC Franklin County Land Bank</strong> — returning
                  vacant and abandoned properties to productive use in the communities we operate in most.
                </p>
              </div>
              <p className="text-sm font-bold text-foreground mb-4">
                {communityGiving.headline}
              </p>
              <Link
                href="/community"
                className="inline-flex items-center gap-2 text-sm font-semibold text-meadow hover:text-meadow/80 transition-colors"
              >
                See how our giving works <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Who this is for */}
      <section className="py-16 bg-card border-t border-border">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Who We're Here For</h2>
          <div className="flex flex-col gap-4 text-muted-foreground leading-8">
            <p>
              We built this company for the family that inherited land from a parent and
              doesn't know what to do with it. For the landowner who's been paying taxes
              on a parcel they haven't visited in years. For an estate representative exploring possible buyers while relying on the estate's own attorney and other professionals. For the out-of-state heir who just
              needs the process to be simple.
            </p>
            <p>
              We are not the right buyer for every deal. But for land in the Ohio Valley
              or Franklin County — rural parcels, vacant lots, inherited properties,
              back-tax land, and infill lots — we are prepared to review the property and determine whether it fits our acquisition criteria.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg bg-amber px-6 py-3 text-sm font-bold text-forest hover:bg-amber/90 transition-colors"
            >
              Request Analysis &amp; Offer <ArrowRight className="h-4 w-4" />
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
