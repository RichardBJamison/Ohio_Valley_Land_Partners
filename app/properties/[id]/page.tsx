import type { Metadata } from 'next';
import { sampleProperties } from '@/lib/property-data';
import { BreadcrumbSchema } from '@/components/seo/json-ld';
import { ArrowRight, Bell } from 'lucide-react';
import Link from 'next/link';
import { InvestorIntakeForm } from '@/components/forms/investor-intake-form';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Buyer Network',
    description: 'Join the Ohio Valley Land Partners buyer network and share the counties, acreage, and property types that match your buying criteria.',
    robots: {
      index: false,
      follow: true,
    },
  };
}

export async function generateStaticParams() {
  return sampleProperties.map((property) => ({ id: property.id }));
}

export default async function PropertyPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Buy Land', url: '/properties' },
          { name: 'Buyer Network', url: '/properties' },
        ]}
      />

      <div className="min-h-screen bg-background">
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-start">

              <div>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber/20 bg-amber/5 px-4 py-2">
                  <Bell className="h-4 w-4 text-amber" />
                  <span className="text-sm font-semibold text-amber">Buyer Network</span>
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl leading-tight">
                  Ohio Valley Land Deals
                  <span className="block text-amber mt-1">Shared With Matching Buyers.</span>
                </h1>
                <p className="mt-6 text-lg leading-8 text-muted-foreground">
                  We don’t list every property publicly. When a parcel is ready to share,
                  OVLP may contact buyers whose stated criteria appear to match.
                </p>
                <p className="mt-4 text-lg leading-8 text-muted-foreground">
                  Tell us what you’re looking for — acreage, county, and intended use — so we can
                  understand which opportunities may be relevant to you.
                </p>
                <div className="mt-8">
                  <Link
                    href="/investor-portal"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-meadow hover:text-meadow/80 transition-colors"
                  >
                    Learn more about the buyer network <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-8 shadow-lg">
                <div className="mb-6 text-center">
                  <h2 className="text-xl font-bold text-foreground">Join the Deal List</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Tell us what fits. We’ll reach out when there may be a match.
                  </p>
                </div>
                <InvestorIntakeForm />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
