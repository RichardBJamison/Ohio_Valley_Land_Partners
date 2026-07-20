'use client';

import Link from 'next/link';
import { Phone } from 'lucide-react';
import { siteConfig } from '@/lib/seo-config';

function trackEvent(eventName: string) {
  if (typeof window === 'undefined') return;
  const w = window as Window & { gtag?: (...args: unknown[]) => void };
  w.gtag?.('event', eventName);
}

export function MobileStickyCta() {
  const telHref = `tel:${siteConfig.phone.replace(/\D/g, '')}`;

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-50 border-t border-border bg-card/95 backdrop-blur-sm p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden"
      aria-label="Mobile call to action"
    >
      <div className="mx-auto flex max-w-lg gap-3">
        <a
          href={telHref}
          onClick={() => trackEvent('click_phone_mobile_cta')}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-3 text-sm font-bold text-foreground hover:border-amber/50 transition-colors"
        >
          <Phone className="h-4 w-4" />
          Call Now
        </a>
      <Link
          href="/#property-review"
          onClick={() => trackEvent('click_offer_mobile_cta')}
          data-analytics-event="property_review_cta_click"
          className="flex flex-1 items-center justify-center rounded-lg bg-amber px-4 py-3 text-sm font-bold text-forest hover:bg-amber/90 transition-colors"
        >
          Start Property Review
        </Link>
      </div>
    </div>
  );
}
