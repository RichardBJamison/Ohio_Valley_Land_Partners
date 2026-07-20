import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { countySellPages, getCountySellPage } from '@/lib/county-sell-data';
import { getBlogPost } from '@/lib/blog-data';
import { defaultOgImages, siteConfig } from '@/lib/seo-config';
import { countySubheadline, faqFraming, sellerPositioning, softenCountyFaq } from '@/lib/public-copy';
import { BreadcrumbSchema, FAQSchema, LocalBusinessSchema } from '@/components/seo/json-ld';
import { LegalDisclaimer } from '@/components/legal-disclaimer';
import { SellerForm } from '@/components/forms/seller-form';
import { CheckCircle, MapPin, ChevronRight, BookOpen, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return countySellPages.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const county = getCountySellPage(params.slug);
  if (!county) return {};
  const url = `${siteConfig.url}/sell-land/${county.slug}`;
  return {
    title: county.metaTitle,
    description: county.metaDescription,
    keywords: county.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: county.metaTitle,
      description: county.metaDescription,
      url,
      type: 'website',
      images: defaultOgImages,
    },
  };
}

export default function CountySellPage({ params }: Props) {
  const county = getCountySellPage(params.slug);
  if (!county) notFound();

  const faqs = county.faqs.map((f) => ({ question: f.q, answer: softenCountyFaq(f.q, f.a) }));
  const relatedPosts = county.relatedBlogSlugs
    .map((slug) => getBlogPost(slug))
    .filter(Boolean);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Sell Land', url: `${siteConfig.url}/land` },
          { name: `${county.name}, ${county.stateAbbr}`, url: `${siteConfig.url}/sell-land/${county.slug}` },
        ]}
      />
      <LocalBusinessSchema
        name={`Ohio Valley Land Partners — ${county.name}, ${county.stateAbbr}`}
        description={county.metaDescription}
      />
      <FAQSchema faqs={faqs} />

      <div className="min-h-screen bg-background">

        {/* Breadcrumb nav */}
        <nav aria-label="Breadcrumb" className="border-b border-border bg-card">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-3">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              </li>
              <li aria-hidden="true"><ChevronRight className="h-3 w-3" /></li>
              <li>
                <Link href="/land" className="hover:text-foreground transition-colors">Sell Land</Link>
              </li>
              <li aria-hidden="true"><ChevronRight className="h-3 w-3" /></li>
              <li className="font-medium text-foreground">{county.name}, {county.stateAbbr}</li>
            </ol>
          </div>
        </nav>

        {/* Hero + Form */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-start">

              {/* Left */}
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber/20 bg-amber/5 px-3 py-1.5">
                  <MapPin className="h-3.5 w-3.5 text-amber" />
                  <span className="text-xs font-semibold text-amber">
                    {county.name}, {county.state}
                  </span>
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                  {county.headline}
                </h1>
                <p className="mt-4 text-lg text-muted-foreground leading-8 county-subheadline">
                  {county.subheadline || countySubheadline(county.name)}
                </p>

                <div className="mt-8">
                  <h2 className="text-base font-semibold text-foreground mb-4">
                    Common Property and Owner Situations
                  </h2>
                  <ul className="flex flex-col gap-3">
                    {county.commonSituations.map((s) => (
                      <li key={s} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-meadow flex-shrink-0 mt-0.5" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  <h2 className="text-base font-semibold text-foreground mb-4">
                    Types of {county.name} Land We Buy
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {county.landTypes.map((type) => (
                      <span
                        key={type}
                        className="inline-flex items-center rounded-md border border-border bg-card px-3 py-1 text-xs font-medium text-foreground"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right — Seller form */}
              <div>
                <div id="property-review" className="rounded-2xl border border-border bg-card p-8 shadow-lg scroll-mt-28">
                  <div className="mb-6 text-center">
                    <h2 className="text-xl font-bold text-foreground">
                      {sellerPositioning.formTitle}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      {sellerPositioning.formSub}
                    </p>
                  </div>
                  <SellerForm />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Local geography */}
        <section className="py-12 bg-card border-t border-border">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <h2 className="text-xl font-bold text-foreground mb-4">
              {county.name} Land Market — Local Geography
            </h2>
            <p className="text-muted-foreground leading-8">{county.localGeography}</p>
          </div>
        </section>

        {/* Why section */}
        <section className="py-16 border-t border-border">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Why We Buy Land in {county.name}
            </h2>
            <p className="text-muted-foreground leading-8">{county.why}</p>
          </div>
        </section>

        {/* External citations */}
        <section className="py-12 bg-card border-t border-border">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <h2 className="text-xl font-bold text-foreground mb-6">
              Sources &amp; References for {county.name} Land Sellers
            </h2>
            <ul className="flex flex-col gap-4">
              {county.citations.map((cite) => (
                <li key={cite.source} className="flex items-start gap-3 text-sm">
                  <ExternalLink className="h-4 w-4 text-amber flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-foreground">{cite.source}</strong>
                    <span className="text-muted-foreground"> — {cite.detail}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 border-t border-border">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-foreground mb-8">
              {faqFraming.sectionTitle} — {county.name}
            </h2>
            <div className="flex flex-col gap-6">
              {county.faqs.map((faq) => (
                <div key={faq.q} className="rounded-xl border border-border bg-card p-6">
                  <h3 className="font-semibold text-foreground mb-3">{faq.q}</h3>
                  <p className="text-sm text-muted-foreground leading-7">{softenCountyFaq(faq.q, faq.a)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related resources */}
        <section className="py-12 bg-card border-t border-border">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <h2 className="text-xl font-bold text-foreground mb-6">
              More Resources for {county.name} Land Sellers
            </h2>
            <ul className="flex flex-col gap-3">
              <li>
                <Link
                  href={`/ohio-valley-guides/${county.slug}`}
                  data-analytics-event="county_guide_click"
                  className="inline-flex items-center gap-2 text-sm font-medium text-amber hover:text-amber/80 transition-colors"
                >
                  <BookOpen className="h-4 w-4" />
                  {county.name} Land Market and Seller Guide
                </Link>
              </li>
              {relatedPosts.map((post) => post && (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-amber hover:text-amber/80 transition-colors"
                  >
                    <BookOpen className="h-4 w-4" />
                    {post.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/#property-review"
                  data-analytics-event="county_page_cta_click"
                  className="inline-flex items-center gap-2 text-sm font-medium text-amber hover:text-amber/80 transition-colors"
                >
                  <ChevronRight className="h-4 w-4" />
                  Start a direct property review
                </Link>
              </li>
            </ul>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16 border-t border-border">
          <div className="mx-auto max-w-xl px-6 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Not sure whether your {county.name} property fits? Start with the address.
            </h2>
            <p className="text-muted-foreground mb-8">
              You do not need to understand the title, zoning, taxes, access, or possible use
              before reaching out. Share what you know, or browse our{' '}
              <Link href={`/ohio-valley-guides/${county.slug}`} className="text-amber hover:underline">
                {county.name} land guide
              </Link>{' '}
              for more market information.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="#property-review"
                data-analytics-event="county_page_cta_click"
                className="rounded-lg bg-amber px-5 py-2.5 text-sm font-bold text-forest hover:bg-amber/90 transition-colors"
              >
                Start My Property Review
              </Link>
              <Link
                href={`/ohio-valley-guides/${county.slug}`}
                className="rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground hover:border-amber/50 transition-colors"
              >
                {county.name} Land Guide
              </Link>
              <Link
                href="/blog"
                className="rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground hover:border-amber/50 transition-colors"
              >
                Seller Resources &amp; Blog
              </Link>
            </div>
            <LegalDisclaimer className="mt-8 text-center" />
          </div>
        </section>
      </div>
    </>
  );
}
