import type { Metadata } from 'next';
import { siteConfig } from '@/lib/seo-config';
import { Phone, Mail } from 'lucide-react';
import { Suspense } from 'react';
import { ContactPageClient } from './contact-client';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Ohio Valley Land Partners. Contact our team for inquiries about selling land, joining our buyer network, or Land Scout partnerships.',
  alternates: {
    canonical: `${siteConfig.url}/contact`,
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-2xl">
          <p className="heading-serif text-amber text-2xl mb-4">Reach out</p>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Get in Touch
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            For a property review, share the property address and the best email to reach you.
            You do not need to answer a long list of property questions before the first
            conversation. Buyer-network, partnership, and general questions can use the same form.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-7xl grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-border bg-card p-8">
              <Suspense fallback={<div className="text-center py-8 text-muted-foreground">Loading form...</div>}>
                <ContactPageClient />
              </Suspense>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="rounded-2xl border border-border bg-card p-8">
              <h3 className="text-lg font-semibold text-foreground mb-6">Contact Information</h3>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <Phone className="h-6 w-6 text-amber" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground">Phone</p>
                    <a
                      href={`tel:${siteConfig.phone}`}
                      className="mt-1 text-foreground font-semibold hover:text-amber transition-colors"
                    >
                      {siteConfig.phone}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <Mail className="h-6 w-6 text-amber" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground">Email</p>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="mt-1 text-foreground font-semibold hover:text-amber transition-colors"
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                </div>

              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">What to Expect</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-baseline gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-amber flex-shrink-0" />
                  <span>
                    <strong className="text-foreground">Property Review:</strong> Start with the address and your email
                  </span>
                </li>
                <li className="flex items-baseline gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-amber flex-shrink-0" />
                  <span>
                    <strong className="text-foreground">Direct Communication:</strong> We follow up when the property appears to fit
                  </span>
                </li>
                <li className="flex items-baseline gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-amber flex-shrink-0" />
                  <span>
                    <strong className="text-foreground">No Obligation:</strong> A review request does not commit you to sell
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
