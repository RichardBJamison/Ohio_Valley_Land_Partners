import type { Metadata } from 'next';
import Link from 'next/link';
import {
  blogPosts,
  blogCategories,
  featuredCountyGuideSourceSlug,
  getBlogDestination,
  getBlogPost,
} from '@/lib/blog-data';
import { siteConfig } from '@/lib/seo-config';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { LegalDisclaimer } from '@/components/legal-disclaimer';
export const metadata: Metadata = {
  title: { absolute: 'Ohio Valley Land Topics & Market Observations | OVLP' },
  description:
    'General educational articles about land ownership, direct-sale inquiries, and regional market observations from Ohio Valley Land Partners.',
  keywords: [
    'sell land Ohio',
    'Ohio Valley real estate blog',
    'Ohio probate land sale',
    'direct land buyers Ohio',
    'Ohio land market 2026',
    'sell vacant land Geauga County Ohio',
  ],
  alternates: {
    canonical: `${siteConfig.url}/blog`,
  },
  openGraph: {
    url: `${siteConfig.url}/blog`,
  },
};

export default function BlogPage() {
  const guidePost = getBlogPost(featuredCountyGuideSourceSlug);
  const featured = guidePost ?? blogPosts[0];
  const rest = blogPosts.filter((p) => p.slug !== featured.slug);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">

        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber/20 bg-amber/5 px-4 py-2 mb-6">
            <BookOpen className="h-4 w-4 text-amber" />
            <span className="text-sm font-semibold text-amber">Ohio Valley Land Notes</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Land Topics & Market Observations
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            General observations about land, county markets, and direct-purchase inquiries. Legal, tax, title, valuation, and brokerage questions should be directed to licensed professionals.
          </p>
          <LegalDisclaimer className="mt-5" />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-12 justify-center">
          <Badge variant="outline" className="cursor-default">All</Badge>
          {blogCategories.map((cat) => (
            <Badge key={cat} variant="secondary" className="cursor-default">{cat}</Badge>
          ))}
        </div>

        {guidePost ? (
          <div className="mb-8 rounded-2xl border border-amber/30 bg-amber/5 px-6 py-4 text-center">
            <p className="text-sm font-semibold text-amber">
              County seller guide — Geauga County, Ohio
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Property context for vacant lots and other land in western Geauga — Chesterland, Chardon, Bainbridge, and surrounding townships.
            </p>
          </div>
        ) : null}

        {/* Featured post */}
        <article className="group relative mb-12 rounded-2xl border border-border bg-card overflow-hidden hover:border-amber/40 hover:shadow-lg transition-all">
          <div className="p-8 lg:p-12">
            <div className="flex items-center gap-3 mb-4">
              <Badge>{featured.category}</Badge>
              <span className="text-sm text-muted-foreground">
                {guidePost ? 'County Guide' : 'Featured'}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-foreground group-hover:text-amber transition-colors sm:text-3xl mb-4">
              <Link href={getBlogDestination(featured.slug)}>
                <span className="absolute inset-0" aria-hidden="true" />
                {featured.title}
              </Link>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">{featured.excerpt}</p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {new Date(featured.datePublished).toLocaleDateString('en-US', {
                  month: 'long', day: 'numeric', year: 'numeric',
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {featured.readingTime}
              </span>
              <span className="ml-auto flex items-center gap-1 font-semibold text-meadow">
                {guidePost ? 'Read guide' : 'Read article'} <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </article>

        {/* Rest of posts grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <article
              key={post.slug}
              className="group relative flex flex-col rounded-2xl border border-border bg-card p-6 hover:border-amber/40 hover:shadow-lg transition-all"
            >
              <div className="mb-3">
                <Badge variant="secondary">{post.category}</Badge>
              </div>
              <h2 className="text-lg font-bold text-foreground group-hover:text-amber transition-colors mb-3 line-clamp-2">
                <Link href={getBlogDestination(post.slug)}>
                  <span className="absolute inset-0" aria-hidden="true" />
                  {post.title}
                </Link>
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1 line-clamp-3">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground mt-auto">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {new Date(post.datePublished).toLocaleDateString('en-US', {
                    month: 'short', day: 'numeric', year: 'numeric',
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {post.readingTime}
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 rounded-2xl border border-border bg-card p-10 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-3">Ready to Sell Your Land?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Request an internal property review. Any proposal reflects only OVLP’s interest as a prospective principal buyer.
          </p>
          <Link
            href="/#property-review"
            data-analytics-event="property_review_cta_click"
            className="inline-flex items-center gap-2 rounded-lg bg-amber px-6 py-3 text-sm font-bold text-forest hover:bg-amber/90 transition-colors"
          >
            Start My Property Review <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
