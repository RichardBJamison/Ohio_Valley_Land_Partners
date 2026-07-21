'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ChevronDown, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { silos } from '@/lib/seo-config';
import Image from 'next/image';
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from '@/components/ui/sheet';

type NavigationLink = {
  name: string;
  href: string;
  description: string;
  analyticsEvent?: string;
};

type NavigationItem = NavigationLink & {
  children?: NavigationLink[];
};

const resourceLinks: NavigationLink[] = [
  {
    name: 'Ohio Valley Guides',
    href: '/ohio-valley-guides',
    description: 'County-by-county property and regional context',
    analyticsEvent: 'county_guide_click',
  },
  {
    name: 'Community',
    href: '/community',
    description: 'Our regional commitment and community partners',
    analyticsEvent: 'community_page_click',
  },
  {
    name: 'Seller Blog',
    href: '/blog',
    description: 'Practical landowner articles and market observations',
    analyticsEvent: 'seller_resource_click',
  },
];

const navigation: NavigationItem[] = [
  { name: 'Sell Land', href: silos.land.path, description: 'Start with a direct property review' },
  {
    name: 'Seller Resources',
    href: '/blog',
    description: 'Land guides and practical answers',
    children: resourceLinks,
  },
  {
    name: 'Buy Land',
    href: '/properties',
    description: 'Browse available property opportunities',
  },
  {
    name: 'Introductions',
    href: '/land-scouts',
    description: 'Connect property opportunities with OVLP',
  },
  { name: 'About', href: '/about', description: 'Who we are' },
];

export function MainNav() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileResourcesOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-forest border-b border-white/10 backdrop-blur-sm">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-6 lg:px-8 lg:py-3 xl:py-4"
        aria-label="Global"
      >
        {/* Logo */}
        <div className="flex min-w-0 shrink-0">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Ohio Valley Land Partners"
              width={512}
              height={341}
              className="h-16 w-auto object-contain sm:h-20 lg:h-20 xl:h-28"
              priority
            />
          </Link>
        </div>

        {/* Mobile menu — Sheet portals to body so backdrop-blur on header cannot trap fixed UI */}
        <div className="flex shrink-0 lg:hidden">
          <button
            type="button"
            className="relative z-10 inline-flex items-center justify-center rounded-lg p-3 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-main-menu"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-7 w-7" />
          </button>
        </div>

        {/* Desktop nav links */}
        <div className="hidden lg:flex lg:gap-x-5 xl:gap-x-7">
          {navigation.map((item) => {
            const childIsActive = item.children?.some((child) =>
              pathname?.startsWith(child.href)
            );
            const isActive = childIsActive || pathname?.startsWith(item.href);

            if (item.children) {
              return (
                <div key={item.name} className="group relative flex items-center">
                  <button
                    type="button"
                    aria-haspopup="menu"
                    className={cn(
                      'inline-flex items-center gap-1.5 whitespace-nowrap text-[15px] font-semibold transition-colors xl:text-[17px]',
                      isActive ? 'text-amber' : 'text-white/70 hover:text-white'
                    )}
                  >
                    {item.name}
                    <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180" />
                  </button>

                  <div
                    role="menu"
                    className="pointer-events-none invisible absolute left-1/2 top-full z-[60] w-80 -translate-x-1/2 pt-4 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:opacity-100"
                  >
                    <div className="rounded-xl border border-white/10 bg-forest p-2 shadow-2xl">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          role="menuitem"
                          data-analytics-event={child.analyticsEvent}
                          className={cn(
                            'block rounded-lg px-4 py-3 transition-colors hover:bg-white/10',
                            pathname?.startsWith(child.href) ? 'bg-white/10' : ''
                          )}
                        >
                          <span className={cn(
                            'block text-sm font-semibold',
                            pathname?.startsWith(child.href) ? 'text-amber' : 'text-white'
                          )}>
                            {child.name}
                          </span>
                          <span className="mt-1 block text-xs leading-relaxed text-white/50">
                            {child.description}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'whitespace-nowrap text-[15px] font-semibold transition-colors xl:text-[17px]',
                  isActive ? 'text-amber' : 'text-white/70 hover:text-white'
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden shrink-0 lg:flex lg:gap-x-3 xl:gap-x-4">
          <Link
            href="/#property-review"
            data-analytics-event="property_review_cta_click"
            className="whitespace-nowrap rounded-lg bg-amber px-4 py-2.5 text-sm font-semibold text-forest hover:bg-amber/90 transition-colors xl:px-5 xl:py-3 xl:text-base"
          >
            Start Property Review
          </Link>
          <a
            href="https://ovlp-portal.vercel.app"
            data-analytics-event="buyer_portal_click"
            className="whitespace-nowrap rounded-lg border border-white/20 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors xl:px-5 xl:py-3 xl:text-base"
          >
            Buyer Portal
          </a>
        </div>
      </nav>

      <Sheet
        open={mobileMenuOpen}
        onOpenChange={(open) => {
          setMobileMenuOpen(open);
          if (!open) setMobileResourcesOpen(false);
        }}
      >
        <SheetContent
          id="mobile-main-menu"
          side="right"
          className="w-full max-w-sm overflow-y-auto border-white/10 bg-forest p-6 text-white sm:max-w-sm [&>button]:text-white/70 [&>button]:hover:text-white"
        >
          <SheetTitle className="sr-only">Main menu</SheetTitle>

          <div className="mb-8 flex items-center justify-between">
            <Link
              href="/"
              onClick={closeMobileMenu}
              className="flex items-center"
            >
              <Image
                src="/logo.png"
                alt="Ohio Valley Land Partners"
                width={512}
                height={341}
                className="h-24 w-auto object-contain"
              />
            </Link>
          </div>

          <div className="flex flex-col gap-1">
            {navigation.map((item) => {
              const childIsActive = item.children?.some((child) =>
                pathname?.startsWith(child.href)
              );
              const isActive = childIsActive || pathname?.startsWith(item.href);

              if (item.children) {
                return (
                  <div key={item.name}>
                    <button
                      type="button"
                      aria-expanded={mobileResourcesOpen}
                      aria-controls="mobile-seller-resources"
                      onClick={() => setMobileResourcesOpen((open) => !open)}
                      className={cn(
                        'flex w-full items-center justify-between rounded-lg px-4 py-3.5 text-left text-lg font-semibold transition-colors',
                        isActive
                          ? 'bg-white/10 text-amber'
                          : 'text-white/80 hover:bg-white/10 hover:text-white'
                      )}
                    >
                      <span>
                        {item.name}
                        <span className="mt-1 block text-sm font-normal text-white/45">
                          {item.description}
                        </span>
                      </span>
                      <ChevronDown
                        className={cn(
                          'h-5 w-5 shrink-0 transition-transform duration-200',
                          mobileResourcesOpen ? 'rotate-180' : ''
                        )}
                      />
                    </button>

                    <div
                      id="mobile-seller-resources"
                      hidden={!mobileResourcesOpen}
                      className="ml-4 mt-1 border-l border-white/10 pl-3"
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          onClick={closeMobileMenu}
                          data-analytics-event={child.analyticsEvent}
                          className={cn(
                            'block rounded-lg px-4 py-3 transition-colors',
                            pathname?.startsWith(child.href)
                              ? 'bg-white/10 text-amber'
                              : 'text-white/75 hover:bg-white/10 hover:text-white'
                          )}
                        >
                          <span className="block text-base font-semibold">{child.name}</span>
                          <span className="mt-1 block text-xs font-normal leading-relaxed text-white/45">
                            {child.description}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className={cn(
                    'rounded-lg px-4 py-3.5 text-lg font-semibold transition-colors',
                    isActive
                      ? 'bg-white/10 text-amber'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  )}
                >
                  {item.name}
                  <div className="mt-1 text-sm font-normal text-white/45">{item.description}</div>
                </Link>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-8">
            <Link
              href="/#property-review"
              onClick={closeMobileMenu}
              data-analytics-event="property_review_cta_click"
              className="w-full rounded-lg bg-amber py-3.5 text-center text-base font-bold text-forest hover:bg-amber/90 transition-colors"
            >
              Start Property Review
            </Link>
            <a
              href="https://ovlp-portal.vercel.app"
              onClick={closeMobileMenu}
              data-analytics-event="buyer_portal_click"
              className="w-full rounded-lg border border-white/20 py-3.5 text-center text-base font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Buyer Portal
            </a>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
