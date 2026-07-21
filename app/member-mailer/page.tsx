import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowRight, CalendarDays, Download, FileText, Mail } from 'lucide-react';
import { currentMemberMailer } from '@/lib/member-mailer';

export const metadata: Metadata = {
  title: 'Builders Network Weekly Deal Mailer',
  description:
    'View the current Ohio Valley Land Partners weekly land opportunity mailer and join the OVLP Builders Network.',
  alternates: {
    canonical: 'https://ohiovalleylandpartners.com/member-mailer',
  },
};

export default function MemberMailerPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="border-b border-border bg-forest text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <p className="heading-serif mb-3 text-2xl text-amber">OVLP Builders Network</p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              This Week&apos;s Deal Mailer
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">
              A current look at land moving through the Ohio Valley Land Partners
              network. Review the edition below, then join the portal and tell us
              what your team is buying.
            </p>
            <div className="mt-7 flex flex-wrap gap-3 text-sm text-white/70">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2">
                <CalendarDays className="h-4 w-4 text-amber" />
                {currentMemberMailer.edition}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2">
                <FileText className="h-4 w-4 text-amber" />
                {currentMemberMailer.parcelCount} opportunities
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_21rem]">
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="flex flex-col gap-4 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-bold text-foreground">
                  {currentMemberMailer.title}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Use the viewer controls to page through the mailer or open the PDF directly.
                </p>
              </div>
              <a
                href={currentMemberMailer.pdfPath}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber px-4 py-2.5 text-sm font-bold text-forest transition-colors hover:bg-amber/90"
              >
                <Download className="h-4 w-4" />
                Open PDF
              </a>
            </div>
            <a
              href={currentMemberMailer.pdfPath}
              target="_blank"
              rel="noreferrer"
              className="group block bg-[#f3f0e9] p-4 sm:p-8"
              aria-label={`Open ${currentMemberMailer.title} for ${currentMemberMailer.edition}`}
            >
              <div className="relative mx-auto aspect-[8.5/11] max-w-2xl overflow-hidden rounded-sm bg-white shadow-xl ring-1 ring-black/10">
                <Image
                  src={currentMemberMailer.previewPath}
                  alt={`First page preview of ${currentMemberMailer.title} for ${currentMemberMailer.edition}`}
                  fill
                  sizes="(max-width: 1024px) 90vw, 720px"
                  className="object-contain transition-transform duration-300 group-hover:scale-[1.01]"
                  priority
                />
              </div>
              <p className="mt-5 text-center text-sm font-semibold text-foreground">
                Select the preview to open the complete {currentMemberMailer.title}
              </p>
            </a>
          </div>

          <aside className="space-y-5">
            <div className="rounded-2xl border border-border bg-card p-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber">
                Want the next edition?
              </p>
              <h2 className="mt-3 text-2xl font-bold text-foreground">
                Join the Builders Network.
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Follow the signup prompts, complete your member profile and buy box,
                then enter the portal to view opportunities.
              </p>
              <ol className="mt-5 space-y-3 text-sm text-foreground">
                {['Visit the portal', 'Follow the signup prompts', 'Complete your buy box', 'View member opportunities'].map(
                  (step, index) => (
                    <li key={step} className="flex items-center gap-3">
                      <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-forest text-xs font-bold text-amber">
                        {index + 1}
                      </span>
                      {step}
                    </li>
                  ),
                )}
              </ol>
              <a
                href="https://ovlp-portal.vercel.app"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-forest px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-forest/90"
              >
                Open the Buyer Portal
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <Mail className="h-5 w-5 text-amber" />
              <h2 className="mt-3 font-bold text-foreground">Membership help</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Questions about signing up, your buy box, or submitting a parcel?
              </p>
              <a
                href="mailto:membership@ohiovalleylandpartners.com"
                className="mt-3 block break-all text-sm font-semibold text-amber hover:underline"
              >
                membership@ohiovalleylandpartners.com
              </a>
            </div>

            <p className="px-2 text-xs leading-5 text-muted-foreground">
              Network preview. Buyers should independently verify zoning, utilities,
              dimensions, title, access, environmental conditions, and permitted use.
            </p>
          </aside>
        </div>
      </section>
    </main>
  );
}
