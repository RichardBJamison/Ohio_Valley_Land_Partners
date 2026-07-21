import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/seo-config';

export const metadata: Metadata = {
  title: 'Legal Disclaimer',
  description: `Legal disclaimer for ${siteConfig.name}. Educational content, principal buyer status, and limitations of liability.`,
  alternates: {
    canonical: `${siteConfig.url}/disclaimer`,
  },
  openGraph: {
    url: `${siteConfig.url}/disclaimer`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function LegalDisclaimerPage() {
  const addr = siteConfig.address;

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-6 py-24 lg:px-8 lg:py-32">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Legal Disclaimer
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">Last updated: June 20, 2026</p>

        <div className="mt-10 prose prose-neutral max-w-none text-muted-foreground [&_h2]:text-foreground [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-10 [&_h2]:mb-4 [&_p]:mb-4 [&_ul]:mb-4 [&_li]:mb-1">
          <h2>1. Who We Are</h2>
          <p>
            <strong>{siteConfig.name}</strong> (&quot;OVLP,&quot; &quot;we,&quot; &quot;us,&quot; or
            &quot;our&quot;) is a principal buyer of real estate. We purchase vacant land, inherited
            property, tax-delinquent parcels, and related real property for our own account. We are
            not a law firm and do not provide legal services. We are not licensed as real estate
            brokers, agents, or appraisers in Ohio, West Virginia, Pennsylvania, Kentucky, Indiana,
            or any other jurisdiction, and we do not represent sellers or buyers in an agency
            capacity.
          </p>

          <h2>2. Educational Content Only — Not Legal Advice</h2>
          <p>
            Articles, blog posts, county guides, FAQs, market commentary, and other materials on this
            website (the &quot;Site&quot;) are provided for general educational and informational
            purposes. They are not legal advice, tax advice, estate-planning advice, or investment
            advice. Nothing on the Site creates an attorney-client relationship or any other
            professional advisory relationship between you and OVLP.
          </p>
          <p>
            Laws affecting real property — including probate, inheritance, partition, tax liens,
            forfeiture, mineral rights, and title — vary by state, county, and individual facts. You
            should consult a licensed attorney in the relevant jurisdiction before making decisions
            about your property.
          </p>

          <h2>3. Not Real Estate Brokerage or Appraisal Services</h2>
          <p>
            OVLP does not list property for third parties, negotiate on behalf of sellers, or provide
            brokerage services. We do not offer appraisals, broker price opinions, or certified
            valuations. Any discussion of market conditions, comparable sales, or offer amounts
            reflects our perspective as a prospective buyer, not an independent valuation of your
            property.
          </p>
          <p>
            If you wish to test the open market, engage a licensed real estate professional in your
            area. We are one option among many for owners who prefer a direct sale to a principal
            buyer.
          </p>

          <h2>4. Statutory and Regulatory References</h2>
          <p>
            References to Ohio Revised Code sections, West Virginia Code sections, county processes,
            court procedures, or similar authorities are provided as general reference material
            only. We do not warrant that citations are current, complete, or applicable to your
            situation. Statutes and local practices change. Interpretation belongs with qualified
            legal counsel and the courts — not with OVLP.
          </p>

          <h2>5. No Offer or Contract From Website Content</h2>
          <p>
            Nothing on the Site constitutes a binding offer to purchase property. Any purchase
            requires a written agreement signed by both parties. Information about timelines,
            processes, or typical transactions is illustrative only. See our{' '}
            <Link href="/terms" className="text-amber hover:underline">
              Terms of Service
            </Link>{' '}
            for additional terms.
          </p>

          <h2>6. Third-Party Professionals</h2>
          <p>
            We routinely work with title companies, attorneys, and other professionals during
            closings, but we do not replace your own advisors. Sellers are encouraged to retain
            independent legal and tax counsel, especially for probate sales, multi-heir situations,
            back taxes, and complex title issues.
          </p>

          <h2>7. Marketing and Portfolio</h2>
          <p>
            OVLP may lawfully market its acquisition interests, active campaigns, buyer network, and
            portfolio in any manner permitted by applicable law. Marketing materials describe our
            business model and geographic focus. They are not guarantees of purchase, pricing, or
            closing timelines for any specific parcel.
          </p>

          <h2>8. No Reliance or Fiduciary Relationship</h2>
          <p>
            Do not rely on Site content as a substitute for advice from professionals who represent
            your interests. OVLP does not owe Site users a fiduciary duty and does not undertake to
            investigate, protect, or advise them concerning deadlines, value, title, taxes, estate
            authority, mineral interests, land use, or transaction alternatives.
          </p>

          <h2>9. Accuracy and Updates</h2>
          <p>
            We strive to keep Site content accurate but make no warranty that information is
            complete, current, or error-free. Content may be updated without notice. Your use of
            the Site is at your own risk.
          </p>

          <h2>10. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, OVLP disclaims liability for any action you take
            or fail to take based on Site content. For warranty disclaimers and liability
            limitations governing use of the Site, see our{' '}
            <Link href="/terms" className="text-amber hover:underline">
              Terms of Service
            </Link>
            .
          </p>

          <h2>11. Governing Law</h2>
          <p>
            This disclaimer is governed by the laws of the State of West Virginia, consistent with
            our Terms of Service, without regard to conflict-of-law principles.
          </p>

          <h2>12. Contact</h2>
          <p>Questions about this disclaimer:</p>
          <p>
            <strong>{siteConfig.name}</strong>
            <br />
            {addr.streetAddress}
            <br />
            {addr.addressLocality}, {addr.addressRegion} {addr.postalCode}
            <br />
            Phone:{' '}
            <a href={`tel:${siteConfig.phone}`} className="text-amber hover:underline">
              {siteConfig.phone}
            </a>
            <br />
            Email:{' '}
            <a href={`mailto:${siteConfig.email}`} className="text-amber hover:underline">
              {siteConfig.email}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
