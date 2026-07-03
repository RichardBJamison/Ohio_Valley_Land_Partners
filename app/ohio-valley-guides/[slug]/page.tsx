import type { Metadata } from 'next';
import { counties, defaultOgImages, siteConfig } from '@/lib/seo-config';
import { countySellPages, getCountySellPage } from '@/lib/county-sell-data';
import { notFound } from 'next/navigation';
import { MapPin, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { BreadcrumbSchema, FAQSchema } from '@/components/seo/json-ld';
import { LegalDisclaimer } from '@/components/legal-disclaimer';
import { faqFraming, softenCountyFaq } from '@/lib/public-copy';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const county = counties.find((c) => c.slug === slug);
  const sellData = getCountySellPage(slug);

  if (!county) return { title: 'County Guide Not Found' };

  const url = `${siteConfig.url}/ohio-valley-guides/${slug}`;
  return {
    title: `Sell Land in ${county.name}, ${county.state} — Ohio Valley Land Partners`,
    description:
      sellData?.metaDescription ??
      `General land information and OVLP acquisition interests in ${county.name}, ${county.state}. Property-specific review by a prospective principal buyer.`,
    keywords: sellData?.keywords ?? [`sell land ${county.name}`, 'Ohio Valley land buyer'],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `Sell Land in ${county.name}, ${county.state}`,
      description:
        sellData?.metaDescription ??
        `General land information and direct acquisition inquiries in ${county.name}, ${county.state}.`,
      url,
      type: 'website',
      images: defaultOgImages,
    },
  };
}

export async function generateStaticParams() {
  return counties.map((county) => ({ slug: county.slug }));
}

export default async function CountyGuidePage({ params }: Props) {
  const { slug } = await params;
  const county = counties.find((c) => c.slug === slug);
  const sellData = getCountySellPage(slug);

  if (!county) notFound();

  const faqs = sellData?.faqs.map((f) => ({ question: f.q, answer: softenCountyFaq(f.q, f.a) })) ?? [];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Ohio Valley Guides', url: '/ohio-valley-guides' },
          { name: `${county.name}, ${county.state}`, url: `/ohio-valley-guides/${slug}` },
        ]}
      />
      {faqs.length > 0 && <FAQSchema faqs={faqs} />}

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
                {`Sell Land in ${county.name}, ${county.state}`}
              </h1>
              <p className="mt-6 text-xl leading-8 text-muted-foreground">
                General county and property context from a prospective principal buyer active in {county.name}.
                This guide is not legal, tax, title, appraisal, brokerage, or investment advice.
              </p>
              <div className="mt-8">
                <Link
                  href={`/sell-land/${slug}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-amber px-6 py-3 text-sm font-bold text-forest hover:bg-amber/90 transition-colors"
                >
                  Request Analysis &amp; Offer <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Why section */}
        {sellData?.why && (
          <section className="py-16 bg-card border-t border-border">
            <div className="mx-auto max-w-3xl px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Why We Buy Land in {county.name}
              </h2>
              <p className="text-muted-foreground leading-8">{sellData.why}</p>
            </div>
          </section>
        )}

        {/* Common situations + land types */}
        {sellData && (
          <section className="py-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-6">
                    Common Situations We Help With
                  </h2>
                  <ul className="flex flex-col gap-4">
                    {sellData.commonSituations.map((s) => (
                      <li key={s} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-meadow flex-shrink-0 mt-0.5" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-6">
                    Types of {county.name} Land We Buy
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {sellData.landTypes.map((type) => (
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
        {sellData && sellData.faqs.length > 0 && (
          <section className="py-16 bg-card border-t border-border">
            <div className="mx-auto max-w-3xl px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-foreground mb-8">
                {faqFraming.sectionTitle} — {county.name}
              </h2>
              <div className="flex flex-col gap-6">
                {sellData.faqs.map((faq) => (
                  <div key={faq.q} className="rounded-xl border border-border bg-background p-6">
                    <h3 className="font-semibold text-foreground mb-3">{faq.q}</h3>
                    <p className="text-sm text-muted-foreground leading-7">{softenCountyFaq(faq.q, faq.a)}</p>
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
              Ready to Sell Your {county.name} Land?
            </h2>
            <p className="text-muted-foreground mb-8">
              Request an internal acquisition review. Any proposal is property-specific and reflects only OVLP’s interest as a prospective principal buyer.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href={`/sell-land/${slug}`}
                className="rounded-lg bg-amber px-6 py-3 text-sm font-bold text-forest hover:bg-amber/90 transition-colors"
              >
                Request Analysis &amp; Offer
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
