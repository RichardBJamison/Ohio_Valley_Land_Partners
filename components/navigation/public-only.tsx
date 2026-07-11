'use client';

import { usePathname } from 'next/navigation';

/** True on unlisted builder private-preview routes (`/p/*`). */
export function useIsPrivatePreview() {
  const pathname = usePathname();
  return Boolean(pathname?.startsWith('/p/'));
}

/**
 * Renders children only on public marketing pages.
 * Private previews have their own chrome and must not inherit the site header/footer/CTAs.
 */
export function PublicOnly({ children }: { children: React.ReactNode }) {
  const isPrivatePreview = useIsPrivatePreview();
  if (isPrivatePreview) return null;
  return <>{children}</>;
}

/** Public pages get sticky-CTA padding; private previews stay full-bleed. */
export function SiteMain({ children }: { children: React.ReactNode }) {
  const isPrivatePreview = useIsPrivatePreview();
  if (isPrivatePreview) {
    return <>{children}</>;
  }
  return <main className="min-h-screen pb-20 lg:pb-0">{children}</main>;
}
