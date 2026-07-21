import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { blogPosts, getBlogPost } from '@/lib/blog-data';
import { ArticleSchema, BreadcrumbSchema } from '@/components/seo/json-ld';
import { defaultOgImages, siteConfig } from '@/lib/seo-config';
import { Badge } from '@/components/ui/badge';
import { LegalDisclaimer } from '@/components/legal-disclaimer';
import { Calendar, Clock, ArrowLeft, ArrowRight } from 'lucide-react';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPost(params.slug);
  if (!post) return {};
  const url = `${siteConfig.url}/blog/${post.slug}`;
  return {
    title: { absolute: post.title },
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      type: 'article',
      url,
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified,
      images: defaultOgImages,
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getBlogPost(params.slug);
  if (!post) notFound();

  const currentIndex = blogPosts.findIndex((p) => p.slug === post.slug);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Blog', url: `${siteConfig.url}/blog` },
          { name: post.title, url: `${siteConfig.url}/blog/${post.slug}` },
        ]}
      />
      <ArticleSchema
        headline={post.title}
        description={post.metaDescription}
        datePublished={post.datePublished}
        dateModified={post.dateModified}
        slug={post.slug}
      />

      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-3xl px-6 py-20 lg:px-8 lg:py-28">

          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-amber transition-colors mb-10"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          {/* Post header */}
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <Badge>{post.category}</Badge>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl leading-tight">
              {post.title}
            </h1>
            <div className="mt-6 flex items-center gap-6 text-sm text-muted-foreground border-b border-border pb-6">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {new Date(post.datePublished).toLocaleDateString('en-US', {
                  month: 'long', day: 'numeric', year: 'numeric',
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {post.readingTime}
              </span>
              <span className="font-medium text-foreground">{siteConfig.name}</span>
            </div>
          </header>

          {/* Educational-use notice */}
          <div className="mb-8 rounded-xl border border-amber/25 bg-amber/5 p-5 text-sm leading-7 text-muted-foreground">
            This article offers general background and OVLP market observations only. It is not legal, tax, title, appraisal, brokerage, or investment advice. Laws, procedures, values, and timelines vary. Consult the appropriate licensed professionals before making a property decision.
          </div>

          {/* Post body */}
          <div
            className="prose prose-slate max-w-none
              prose-headings:font-bold prose-headings:text-foreground
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-p:text-muted-foreground prose-p:leading-8
              prose-li:text-muted-foreground prose-li:leading-7
              prose-ol:space-y-2 prose-ul:space-y-2
              prose-strong:text-foreground prose-strong:font-semibold
              prose-a:text-meadow prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />

          {/* CTA box */}
          <div className="mt-16 rounded-2xl border border-amber/30 bg-amber/5 p-8 text-center">
            <h2 className="text-xl font-bold text-foreground mb-2">
              Ready to Start a Property Review?
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              No obligation. OVLP will review the property only as a prospective principal buyer. Not every property will fit our criteria.
            </p>
            <Link
              href="/#property-review"
              data-analytics-event="property_review_cta_click"
              className="inline-flex items-center gap-2 rounded-lg bg-amber px-6 py-3 text-sm font-bold text-forest hover:bg-amber/90 transition-colors"
            >
              Start My Property Review <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <LegalDisclaimer className="mt-8 text-center" />

          {/* Prev / Next navigation */}
          {(prevPost || nextPost) && (
            <nav className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 border-t border-border pt-10">
              {prevPost ? (
                <Link
                  href={`/blog/${prevPost.slug}`}
                  className="group flex flex-col gap-1 rounded-xl border border-border bg-card p-5 hover:border-amber/40 transition-colors"
                >
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <ArrowLeft className="h-3.5 w-3.5" /> Previous
                  </span>
                  <span className="font-semibold text-foreground group-hover:text-amber transition-colors line-clamp-2 text-sm">
                    {prevPost.title}
                  </span>
                </Link>
              ) : <div />}
              {nextPost && (
                <Link
                  href={`/blog/${nextPost.slug}`}
                  className="group flex flex-col gap-1 rounded-xl border border-border bg-card p-5 hover:border-amber/40 transition-colors text-right sm:ml-auto sm:w-full"
                >
                  <span className="text-xs text-muted-foreground flex items-center gap-1 justify-end">
                    Next <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                  <span className="font-semibold text-foreground group-hover:text-amber transition-colors line-clamp-2 text-sm">
                    {nextPost.title}
                  </span>
                </Link>
              )}
            </nav>
          )}
        </div>
      </div>
    </>
  );
}
