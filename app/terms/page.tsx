import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/seo-config';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: `Terms of Service for ${siteConfig.name}. Read the terms governing your use of our website and services.`,
  alternates: {
    canonical: `${siteConfig.url}/terms`,
  },
};

export default function TermsOfServicePage() {
  const addr = siteConfig.address;

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-6 py-24 lg:px-8 lg:py-32">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Terms of Service
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Last updated: May 17, 2026
        </p>

        <div className="mt-10 prose prose-neutral max-w-none text-muted-foreground [&_h2]:text-foreground [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-foreground [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-3 [&_p]:mb-4 [&_ul]:mb-4 [&_li]:mb-1">
          <h2>1. Agreement to Terms</h2>
          <p>
            By accessing or using the website at{' '}
            <Link href="/" className="text-amber hover:underline">{siteConfig.url}</Link>{' '}
            (the &quot;Site&quot;), operated by <strong>{siteConfig.name}</strong> (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;),
            you agree to be bound by these Terms of Service. If you do not agree to these terms,
            do not use the Site.
          </p>

          <h2>2. About Our Business</h2>
          <p>
            {siteConfig.name} is a principal buyer of real estate. We purchase vacant land,
            inherited property, and tax-delinquent parcels across nine counties in Ohio and
            West Virginia. We are not licensed real estate brokers or agents and do not represent
            sellers or buyers in an agency capacity. We purchase properties for our own account.
          </p>
          <p>
            Our business address is {addr.streetAddress}, {addr.addressLocality}, {addr.addressRegion} {addr.postalCode}.
          </p>

          <h2>3. Use of the Site</h2>
          <p>You agree to use the Site only for lawful purposes. You may not:</p>
          <ul className="list-disc pl-6">
            <li>Use the Site in any way that violates applicable federal, state, or local laws</li>
            <li>Submit false, inaccurate, or misleading information through any form</li>
            <li>Attempt to gain unauthorized access to any portion of the Site or its systems</li>
            <li>Use automated tools to scrape, crawl, or collect data from the Site without permission</li>
          </ul>

          <h2>4. Forms and Submissions</h2>
          <p>
            When you submit information through our website forms (including the property review form, contact form, or investor intake form), you represent that the
            information you provide is truthful and accurate. Submitting a form does not create
            a binding contract or obligation on either party.
          </p>
          <p>
            By submitting a form that includes your phone number, you consent to receive
            communications from {siteConfig.name} regarding your inquiry, including phone
            calls and SMS/text messages. Message frequency varies. Message and data rates may
            apply. You may opt out of text messages at any time by replying STOP. See our{' '}
            <Link href="/privacy" className="text-amber hover:underline">Privacy Policy</Link>{' '}
            for details on how we handle your information.
          </p>

          <h2>5. No Offer or Commitment</h2>
          <p>
            Nothing on this Site constitutes a binding offer to purchase property. Any purchase proposal is made individually after review of property-specific information and is
            subject to the terms of a written purchase agreement signed by both parties.
            Information displayed on the Site (including estimated values, timelines, and
            service descriptions) is for general informational purposes only.
          </p>

          <h2>6. Intellectual Property</h2>
          <p>
            All content on this Site — including text, images, logos, graphics, and code — is
            owned by or licensed to {siteConfig.name} and is protected by applicable copyright
            and trademark laws. You may not reproduce, distribute, or create derivative works
            from our content without written permission.
          </p>

          <h2>7. Third-Party Links</h2>
          <p>
            The Site may contain links to third-party websites (e.g., county assessor sites,
            nonprofit partners). We are not responsible for the content, accuracy, or practices
            of third-party websites. Visiting external links is at your own risk.
          </p>

          <h2>8. Disclaimer of Warranties</h2>
          <p>
            The Site and its content are provided &quot;as is&quot; and &quot;as available&quot; without
            warranties of any kind, either express or implied. We do not warrant that the Site
            will be uninterrupted, error-free, or free of viruses or other harmful components.
          </p>

          <h2>9. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, {siteConfig.name} shall not be liable for
            any indirect, incidental, special, consequential, or punitive damages arising from
            your use of the Site, even if we have been advised of the possibility of such damages.
          </p>

          <h2>10. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless {siteConfig.name}, its owners, employees,
            and agents from any claims, damages, or expenses arising from your use of the Site
            or your violation of these Terms.
          </p>

          <h2>11. Governing Law</h2>
          <p>
            These Terms are governed by and construed in accordance with the laws of the State
            of West Virginia, without regard to conflict of law principles.
          </p>

          <h2>12. Changes to These Terms</h2>
          <p>
            We may update these Terms of Service at any time. Changes will be posted on this
            page with an updated &quot;Last updated&quot; date. Continued use of the Site after
            changes constitutes acceptance of the revised terms.
          </p>

          <h2>13. Contact Us</h2>
          <p>
            If you have questions about these Terms of Service, contact us at:
          </p>
          <p>
            <strong>{siteConfig.name}</strong><br />
            {addr.streetAddress}<br />
            {addr.addressLocality}, {addr.addressRegion} {addr.postalCode}<br />
            Phone: <a href={`tel:${siteConfig.phone}`} className="text-amber hover:underline">{siteConfig.phone}</a><br />
            Email: <a href={`mailto:${siteConfig.email}`} className="text-amber hover:underline">{siteConfig.email}</a>
          </p>
        </div>
      </div>
    </div>
  );
}
