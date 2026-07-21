import type { Metadata } from 'next';
import { defaultOgImages, siteConfig } from '@/lib/seo-config';
import { getCountySellPage } from '@/lib/county-sell-data';
import {
  countyGuides,
  getCountyGuide,
  getSupplementalCountyGuide,
} from '@/lib/county-guide-data';
import { notFound } from 'next/navigation';
import { MapPin, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { BreadcrumbSchema, FAQSchema } from '@/components/seo/json-ld';
import { LegalDisclaimer } from '@/components/legal-disclaimer';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const county = getCountyGuide(slug);

  if (!county) return { title: 'County Guide Not Found' };

  const url = `${siteConfig.url}/ohio-valley-guides/${slug}`;
  const guideTitle = `${county.name}, ${county.state} Land Market and Seller Guide | OVLP`;
  const guideDescription = `${county.name}, ${county.state} land context, local geography, parcel considerations, and seller guidance. General information—not an appraisal or value opinion.`;
  return {
    title: { absolute: guideTitle },
    description: guideDescription,
    keywords: [
      `${county.name} ${county.state} land market guide`,
      `${county.name} parcel information`,
      `${county.name} land seller guide`,
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: guideTitle,
      description: guideDescription,
      url,
      type: 'website',
      images: defaultOgImages,
    },
  };
}

export async function generateStaticParams() {
  return countyGuides.map((county) => ({ slug: county.slug }));
}

export default async function CountyGuidePage({ params }: Props) {
  const { slug } = await params;
  const county = getCountyGuide(slug);
  const sellData = getCountySellPage(slug);
  const supplementalData = getSupplementalCountyGuide(slug);
  const guideData = sellData ?? supplementalData;

  if (!county) notFound();

  const propertyReviewHref = sellData ? `/sell-land/${slug}#property-review` : '/#property-review';
  const propertyReviewEvent = sellData ? 'county_page_cta_click' : 'property_review_cta_click';
  const guideFaqs = guideData
    ? [
        {
          question: `What land conditions vary across ${county.name}?`,
          answer: guideData.localGeography,
        },
        {
          question: `Where can I verify parcel and tax information in ${county.name}?`,
          answer: `Start with ${guideData.citations[0]?.source ?? 'the appropriate county office'} for public parcel, ownership, assessment, and tax records. Recorded documents and professional review may still be needed for title, access, mineral, estate, survey, or legal questions.`,
        },
        {
          question: `Does this ${county.name} guide tell me what my land is worth?`,
          answer: 'No. This guide provides general county context and does not provide a formal appraisal, certified valuation report, broker price opinion, or statement of market value. Property-specific value guidance should come from the appropriate licensed professional.',
        },
        {
          question: `How do I ask OVLP to review property in ${county.name}?`,
          answer: sellData
            ? 'Share the property address and the best email to reach you. OVLP will review whether the parcel fits its current buying criteria. Requesting a review does not commit you to sell, and not every property receives a proposal.'
            : 'Share the property address and the best email to reach you. Publishing this guide does not confirm active acquisition coverage in the county. OVLP may still review the inquiry, with no obligation to sell and no promise that a proposal will be presented.',
        },
      ]
    : [];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Ohio Valley Guides', url: '/ohio-valley-guides' },
          { name: `${county.name}, ${county.state}`, url: `/ohio-valley-guides/${slug}` },
        ]}
      />
      {guideFaqs.length > 0 && <FAQSchema faqs={guideFaqs} />}

      <div className="min-h-screen bg-background">

        {/* Hero */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber/20 bg-amber/5 px-3 py-1.5">
                <MapPin className="h-3.5 w-3.5 text-amber" />
                <span className="text-xs font-semibold text-amber">{county.name}, {county.state}</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl leading-tight">
                {`${county.name}, ${county.state} Land Market and Seller Guide`}
              </h1>
              <p className="mt-6 text-xl leading-8 text-muted-foreground">
                General market context, local geography, parcel considerations, and questions
                owners may want to investigate before making a property decision.
              </p>
              <div className="mt-8">
                <Link
                  href={propertyReviewHref}
                  data-analytics-event={propertyReviewEvent}
                  className="inline-flex items-center gap-2 rounded-lg bg-amber px-6 py-3 text-sm font-bold text-forest hover:bg-amber/90 transition-colors"
                >
                  Start My Property Review <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Why section */}
        {guideData?.localGeography && (
          <section className="py-16 bg-card border-t border-border">
            <div className="mx-auto max-w-3xl px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {county.name} land patterns and local geography
              </h2>
              <p className="text-muted-foreground leading-8">{guideData.localGeography}</p>
            </div>
          </section>
        )}

        {/* Common situations + land types */}
        {guideData && (
          <section className="py-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-6">
                    Common owner situations
                  </h2>
                  <ul className="flex flex-col gap-4">
                    {guideData.commonSituations.map((s) => (
                      <li key={s} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-meadow flex-shrink-0 mt-0.5" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-6">
                    Common {county.name} Property Types
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {guideData.landTypes.map((type) => (
                      <span
                        key={type}
                        className="inline-flex items-center rounded-md border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        {guideFaqs.length > 0 && (
          <section className="py-16 bg-card border-t border-border">
            <div className="mx-auto max-w-3xl px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-foreground mb-8">
                Questions About the {county.name} Land Guide
              </h2>
              <div className="flex flex-col gap-6">
                {guideFaqs.map((faq) => (
                  <div key={faq.question} className="rounded-xl border border-border bg-background p-6">
                    <h3 className="font-semibold text-foreground mb-3">{faq.question}</h3>
                    <p className="text-sm text-muted-foreground leading-7">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-20">
          <div className="mx-auto max-w-xl px-6 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              {sellData
                ? `Want OVLP to review your ${county.name} property?`
                : `Have questions about your ${county.name} property?`}
            </h2>
            <p className="text-muted-foreground mb-8">
              {sellData
                ? 'Start with the address and the best email to reach you. There is no obligation to sell, and not every property receives a proposal.'
                : 'This guide does not establish active acquisition coverage. You may still share the address for review, with no obligation and no promise of a proposal.'}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href={propertyReviewHref}
                data-analytics-event={propertyReviewEvent}
                className="rounded-lg bg-amber px-6 py-3 text-sm font-bold text-forest hover:bg-amber/90 transition-colors"
              >
                Start My Property Review
              </Link>
              <Link
                href="/contact"
                className="rounded-lg border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground hover:border-amber/50 transition-colors"
              >
                Ask a Question
              </Link>
            </div>
            <LegalDisclaimer className="mt-8 text-center" />
          </div>
        </section>
      </div>
    </>
  );
}
