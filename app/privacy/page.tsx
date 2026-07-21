import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/seo-config';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `Privacy Policy for ${siteConfig.name}. Learn how we collect, use, and protect your personal information.`,
  alternates: {
    canonical: `${siteConfig.url}/privacy`,
  },
  openGraph: {
    url: `${siteConfig.url}/privacy`,
  },
};

export default function PrivacyPolicyPage() {
  const addr = siteConfig.address;

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-6 py-24 lg:px-8 lg:py-32">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Last updated: May 17, 2026
        </p>

        <div className="mt-10 prose prose-neutral max-w-none text-muted-foreground [&_h2]:text-foreground [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-foreground [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-3 [&_p]:mb-4 [&_ul]:mb-4 [&_li]:mb-1">
          <h2>1. Who We Are</h2>
          <p>
            This Privacy Policy applies to <strong>{siteConfig.name}</strong> (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;),
            a principal buyer of real estate operating at {addr.streetAddress}, {addr.addressLocality}, {addr.addressRegion} {addr.postalCode}.
            Our website is located at{' '}
            <Link href="/" className="text-amber hover:underline">{siteConfig.url}</Link>.
          </p>

          <h2>2. Information We Collect</h2>
          <p>We may collect the following types of information when you interact with our website, forms, or communications:</p>
          <ul className="list-disc pl-6">
            <li><strong>Contact information:</strong> name, email address, phone number, mailing address</li>
            <li><strong>Property information:</strong> property address, parcel ID, acreage, land use type</li>
            <li><strong>Investment preferences:</strong> counties of interest, budget range, intended use</li>
            <li><strong>Usage data:</strong> pages visited, time on site, referral source (collected via Google Analytics)</li>
            <li><strong>Device data:</strong> browser type, IP address, operating system</li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-6">
            <li>Respond to your inquiries and evaluate possible direct property acquisitions</li>
            <li>Send transactional messages related to your inquiry (e.g., review status, proposed terms, closing updates)</li>
            <li>Send promotional messages about land buying opportunities, if you have opted in</li>
            <li>Improve our website and services</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2>4. SMS/Text Messaging Policy</h2>
          <p>
            By providing your phone number and submitting a form on our website, you consent to receive
            SMS/text messages from {siteConfig.name} related to your inquiry. This may include
            property offer details, follow-up communications, and appointment reminders.
          </p>
          <ul className="list-disc pl-6">
            <li>Message frequency varies based on your inquiry</li>
            <li>Message and data rates may apply</li>
            <li>Reply <strong>STOP</strong> to any message to opt out of future texts</li>
            <li>Reply <strong>HELP</strong> for assistance or contact us at {siteConfig.phone}</li>
            <li>Consent is not a condition of purchase</li>
          </ul>
          <p>
            We do not sell, rent, or share your phone number or opt-in data with third parties
            for their marketing purposes. Phone numbers collected through our forms are used
            solely by {siteConfig.name} to communicate with you about your property inquiry.
          </p>

          <h2>5. How We Share Your Information</h2>
          <p>We do not sell your personal information. We may share your information with:</p>
          <ul className="list-disc pl-6">
            <li><strong>Service providers:</strong> email delivery (Resend), analytics (Google Analytics), and hosting (Cloudflare) providers that help us operate our website</li>
            <li><strong>Title companies and closing agents:</strong> when necessary to complete a real estate transaction you have agreed to</li>
            <li><strong>Legal compliance:</strong> when required by law, subpoena, or court order</li>
          </ul>

          <h2>6. Data Security</h2>
          <p>
            We use commercially reasonable measures to protect your personal information, including
            SSL/TLS encryption on our website, secure hosting infrastructure, and access controls.
            However, no method of transmission over the Internet is 100% secure.
          </p>

          <h2>7. Cookies and Tracking</h2>
          <p>
            Our website uses Google Analytics (GA4) to understand how visitors use our site. This
            service may place cookies on your browser. You can opt out of Google Analytics by
            installing the{' '}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber hover:underline"
            >
              Google Analytics Opt-out Browser Add-on
            </a>.
          </p>

          <h2>8. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-6">
            <li>Request access to the personal information we hold about you</li>
            <li>Request correction or deletion of your information</li>
            <li>Opt out of promotional communications at any time</li>
            <li>Opt out of SMS messages by replying STOP</li>
          </ul>

          <h2>9. Children&apos;s Privacy</h2>
          <p>
            Our website and services are not directed to individuals under the age of 18.
            We do not knowingly collect personal information from children.
          </p>

          <h2>10. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on
            this page with an updated &quot;Last updated&quot; date. Continued use of our website
            after changes constitutes acceptance of the revised policy.
          </p>

          <h2>11. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy or your personal information,
            contact us at:
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
