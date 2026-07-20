'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

type AnalyticsParams = Record<string, string | number | boolean | undefined>;

type AnalyticsWindow = Window & {
  dataLayer?: Array<Record<string, unknown> | IArguments>;
  gtag?: (...args: unknown[]) => void;
};

export function trackConversionEvent(eventName: string, params: AnalyticsParams = {}) {
  if (typeof window === 'undefined') return;

  const analyticsWindow = window as AnalyticsWindow;
  if (typeof analyticsWindow.gtag === 'function') {
    analyticsWindow.gtag('event', eventName, params);
    return;
  }

  analyticsWindow.dataLayer = analyticsWindow.dataLayer ?? [];
  analyticsWindow.dataLayer.push({ event: eventName, ...params });
}

function formName(form: HTMLFormElement): string {
  return form.dataset.analyticsForm || form.getAttribute('name') || 'website_form';
}

function linkContext(element: HTMLElement) {
  const anchor = element.closest('a');
  return {
    link_text: (element.textContent || anchor?.textContent || '').trim().slice(0, 100),
    link_url: anchor?.getAttribute('href') || undefined,
  };
}

export default function ConversionTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/contact') {
      trackConversionEvent('contact_page_visit', { page_path: pathname });
    }
  }, [pathname]);

  useEffect(() => {
    const startedForms = new WeakSet<HTMLFormElement>();

    function onFocus(event: FocusEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const form = target.closest<HTMLFormElement>('form[data-analytics-form]');
      if (!form || startedForms.has(form)) return;

      startedForms.add(form);
      trackConversionEvent('form_started', {
        form_name: formName(form),
        page_path: window.location.pathname,
      });
    }

    function onSubmit(event: SubmitEvent) {
      const form = event.target;
      if (!(form instanceof HTMLFormElement) || !form.dataset.analyticsForm) return;

      const name = formName(form);
      const path = window.location.pathname;
      trackConversionEvent('form_submitted', { form_name: name, page_path: path });
    }

    function onClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const element = target.closest<HTMLElement>(
        '[data-analytics-event], a[href], form[data-analytics-form] button[type="submit"]',
      );
      if (!element) return;

      const explicitEvent = element.dataset.analyticsEvent;
      if (explicitEvent) {
        const path = window.location.pathname;
        trackConversionEvent(explicitEvent, {
          ...linkContext(element),
          page_path: path,
        });
        if (explicitEvent === 'property_review_cta_click') {
          if (path === '/') {
            trackConversionEvent('homepage_property_review_cta_click', { page_path: path });
          } else if (path.startsWith('/sell-land/')) {
            trackConversionEvent('county_page_cta_click', { page_path: path });
          }
        }
        return;
      }

      const sellerForm = element.closest<HTMLFormElement>(
        'form[data-analytics-form="seller_property_review"]',
      );
      if (sellerForm && element.matches('button[type="submit"]')) {
        const path = window.location.pathname;
        if (path === '/') {
          trackConversionEvent('homepage_property_review_cta_click', { page_path: path });
        } else if (path.startsWith('/sell-land/')) {
          trackConversionEvent('county_page_cta_click', { page_path: path });
        }
        return;
      }

      const anchor = element.closest<HTMLAnchorElement>('a[href]');
      const href = anchor?.getAttribute('href') || '';
      if (!href) return;

      const params = { ...linkContext(element), page_path: window.location.pathname };
      if (href.startsWith('tel:')) trackConversionEvent('phone_link_click', params);
      else if (href.startsWith('mailto:')) trackConversionEvent('email_link_click', params);
      else if (href.includes('ovlp-portal.vercel.app')) trackConversionEvent('buyer_portal_click', params);
      else if (href.startsWith('/ohio-valley-guides')) trackConversionEvent('county_guide_click', params);
      else if (href.startsWith('/blog')) trackConversionEvent('seller_resource_click', params);
    }

    document.addEventListener('focusin', onFocus);
    document.addEventListener('submit', onSubmit);
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('focusin', onFocus);
      document.removeEventListener('submit', onSubmit);
      document.removeEventListener('click', onClick);
    };
  }, []);

  return null;
}
