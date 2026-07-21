import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Download, Mail, Phone } from 'lucide-react';
import {
  getPrivatePreview,
  privatePreviewTokens,
} from '@/lib/private-previews';

interface Props {
  params: { token: string };
}

export async function generateStaticParams() {
  return privatePreviewTokens.map((token) => ({ token }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const preview = getPrivatePreview(params.token);
  if (!preview) {
    return { title: 'Preview Not Found', robots: { index: false, follow: false } };
  }

  return {
    title: `${preview.title} — Private Preview`,
    description:
      'Confidential Ohio Valley Land Partners network preview for invited builders.',
    robots: {
      index: false,
      follow: false,
      googleBot: { index: false, follow: false, noimageindex: true },
    },
  };
}

export default function PrivatePreviewPage({ params }: Props) {
  const preview = getPrivatePreview(params.token);
  if (!preview) notFound();

  const mailto = `mailto:membership@ohiovalleylandpartners.com?subject=${encodeURIComponent(preview.inquirySubject)}`;

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-white/10 bg-forest text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber text-xs font-bold text-forest">
              OVLP
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em]">
                Ohio Valley Land Partners
              </p>
              <p className="text-xs text-white/55">Builders Network — Private Preview</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-amber/35 bg-amber/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-amber">
            <span className="h-1.5 w-1.5 rounded-full bg-amber" />
            Confidential · Not indexed
          </span>
        </div>
      </div>

      <section className="bg-gradient-to-br from-forest via-[#1a4a3a] to-meadow text-white">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber">
            {preview.eyebrow}
          </p>
          <h1 className="heading-serif mt-3 max-w-2xl text-4xl leading-tight sm:text-5xl">
            {preview.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/78">{preview.summary}</p>
          <p className="mt-3 text-sm text-white/60">
            {preview.address} · Parcel {preview.parcelId}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {preview.stats.map((stat) => (
              <div
                key={stat.label}
                className="min-w-[140px] rounded-xl border border-white/12 bg-white/10 px-4 py-3 backdrop-blur-sm"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-amber">
                  {stat.label}
                </p>
                <p className="mt-1 text-base font-semibold">{stat.value}</p>
                {stat.detail ? (
                  <p className="mt-0.5 text-[11px] text-white/50">{stat.detail}</p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_19rem]">
          <article className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="flex flex-col gap-4 border-b border-border bg-[#faf8f4] p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-bold text-foreground">Property Sheet</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Full deal overview — maps, positioning, and development snapshot
                </p>
              </div>
              <a
                href={preview.flyerPath}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber px-4 py-2.5 text-sm font-bold text-forest transition-colors hover:bg-amber/90"
              >
                <Download className="h-4 w-4" />
                Open full image
              </a>
            </div>
            <a
              href={preview.flyerPath}
              target="_blank"
              rel="noreferrer"
              className="group block bg-[#ece8df] p-5 sm:p-10"
              aria-label={`Open property sheet for ${preview.address}`}
            >
              <div className="relative mx-auto aspect-[4/5] max-w-2xl overflow-hidden rounded-sm bg-white shadow-xl ring-1 ring-black/10">
                <Image
                  src={preview.flyerPath}
                  alt={preview.flyerAlt}
                  fill
                  sizes="(max-width: 1024px) 90vw, 720px"
                  className="object-contain transition-transform duration-300 group-hover:scale-[1.01]"
                  priority
                />
              </div>
              <p className="mt-5 text-center text-sm font-semibold text-foreground">
                Select the sheet to view full resolution
              </p>
            </a>
          </article>

          <aside className="space-y-5">
            <div className="rounded-2xl border border-border bg-card p-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-amber">
                Interested?
              </p>
              <h2 className="mt-2 text-2xl font-bold text-forest">Request title packet &amp; terms</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Reply to the email that brought you here, or contact us directly for utility
                details, title notes, and next steps.
              </p>
              <a
                href={mailto}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-amber px-5 py-3 text-sm font-bold text-forest transition-colors hover:bg-amber/90"
              >
                Email OVLP
                <ArrowRight className="h-4 w-4" />
              </a>
              <div className="mt-4 space-y-2">
                <a
                  href="tel:+16146537430"
                  className="flex items-center gap-3 rounded-xl bg-muted/60 px-4 py-3 text-sm transition-colors hover:bg-muted"
                >
                  <Phone className="h-4 w-4 text-amber" />
                  <span>
                    <strong className="block text-foreground">(614) 653-7430</strong>
                    <span className="text-muted-foreground">Call Ohio Valley Land Partners</span>
                  </span>
                </a>
                <a
                  href={mailto}
                  className="flex items-center gap-3 rounded-xl bg-muted/60 px-4 py-3 text-sm transition-colors hover:bg-muted"
                >
                  <Mail className="h-4 w-4 text-amber" />
                  <span>
                    <strong className="block text-foreground">membership@ohiovalleylandpartners.com</strong>
                    <span className="text-muted-foreground">Builder inquiries</span>
                  </span>
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-amber">
                Nine active parcels
              </p>
              <h2 className="mt-2 text-2xl font-bold text-forest">Browse the full network</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Portal access was set up for you. Log in to see every property, set your buy box,
                and submit offers.
              </p>
              <ol className="mt-4 space-y-2.5 text-sm text-foreground">
                {[
                  'Open the buyer portal',
                  'Log in with your email + OVLPNEW@2026',
                  'Review inventory and the weekly mailer',
                ].map((step, index) => (
                  <li key={step} className="flex items-center gap-3">
                    <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-forest text-xs font-bold text-amber">
                      {index + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
              <Link
                href="https://ovlp-portal.vercel.app/login"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-forest px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-forest/90"
              >
                Enter Buyer Portal
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <p className="px-1 text-xs leading-5 text-muted-foreground">
              Confidential network preview · Not a public listing · OVLP is a principal buyer, not a
              broker. Buyer to independently verify dimensions, zoning, utilities, access, tap fees,
              setbacks, flood status, title, and all permitted development uses before purchase.
            </p>
          </aside>
        </div>
      </section>
    </div>
  );
}
