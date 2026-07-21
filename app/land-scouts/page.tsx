import type { Metadata } from 'next';
import Link from 'next/link';
import { Handshake, MapPin, Users, FileText } from 'lucide-react';
import { LegalDisclaimer } from '@/components/legal-disclaimer';
import { siteConfig } from '@/lib/seo-config';

export const metadata: Metadata = {
  title: 'Introductions & Local Partnerships',
  description:
    'Learn how landowners, professionals, and community members can introduce property opportunities to Ohio Valley Land Partners for direct acquisition review.',
  alternates: {
    canonical: `${siteConfig.url}/land-scouts`,
  },
  openGraph: {
    url: `${siteConfig.url}/land-scouts`,
  },
};

const partnerTypes = [
  {
    icon: FileText,
    title: 'Attorneys and Other Licensed Professionals',
    description:
      'Professionals may introduce OVLP as one possible principal buyer when consistent with their own duties, licensing rules, and client instructions. OVLP does not ask anyone to provide services outside their professional role.',
  },
  {
    icon: MapPin,
    title: 'Landowners and Neighbors',
    description:
      'If you know an owner who may want to speak with a direct buyer, you may share our public contact information or make an introduction with the owner’s permission.',
  },
  {
    icon: Users,
    title: 'Builders and Community Partners',
    description:
      'We welcome conversations about parcels that may fit our acquisition interests or private builders network. Each opportunity is reviewed independently.',
  },
];

export default function IntroductionsPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber/20 bg-amber/5 px-4 py-2">
            <Handshake className="h-4 w-4 text-amber" />
            <span className="text-sm font-semibold text-amber">Introductions &amp; Local Partnerships</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Know of a Property We Should Review?
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            You may introduce Ohio Valley Land Partners to a property owner who wants to explore a
            direct sale. We act only as a prospective principal buyer. An introduction does not
            create an agency, brokerage, advisory, employment, or fiduciary relationship.
          </p>
          <div className="mt-10">
            <Link
              href="/contact?type=partnership"
              className="inline-flex items-center rounded-lg bg-amber px-8 py-4 text-base font-bold text-forest hover:bg-amber/90 transition-colors"
            >
              Start a Partnership Conversation
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-card border-t border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {partnerTypes.map((type) => {
              const Icon = type.icon;
              return (
                <div key={type.title} className="rounded-2xl border border-border bg-background p-8">
                  <Icon className="h-6 w-6 text-amber mb-5" />
                  <h2 className="text-lg font-bold text-foreground mb-3">{type.title}</h2>
                  <p className="text-sm leading-7 text-muted-foreground">{type.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="rounded-2xl border border-border bg-card p-8 sm:p-10">
            <h2 className="text-2xl font-bold text-foreground mb-5">Important Boundaries</h2>
            <ul className="list-disc pl-6 space-y-3 text-sm leading-7 text-muted-foreground">
              <li>Do not negotiate, price, advertise, or speak for OVLP or a property owner.</li>
              <li>Do not obtain confidential records or use nonpublic information without authorization.</li>
              <li>Do not imply that compensation is promised. Any lawful arrangement must be separately reviewed and documented in writing before services are performed.</li>
              <li>Licensed professionals remain responsible for their own legal, ethical, disclosure, and licensing obligations.</li>
              <li>OVLP may decline any introduction or property for any lawful reason.</li>
            </ul>
            <LegalDisclaimer className="mt-8" />
          </div>
        </div>
      </section>
    </div>
  );
}
