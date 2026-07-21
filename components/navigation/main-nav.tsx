'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { silos } from '@/lib/seo-config';
import Image from 'next/image';
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from '@/components/ui/sheet';

const navigation = [
  { name: 'Sell Land', href: silos.land.path, description: 'Start with a direct property review' },
  { name: 'How It Works', href: '/land#how-it-works', description: 'The five-step purchase process' },
  { name: 'Where We Buy', href: '/#where-we-buy', description: 'County acquisition areas and guides' },
  { name: 'Seller Resources', href: '/blog', description: 'Land guides and practical answers' },
  { name: 'About', href: '/about', description: 'Who we are' },
];

export function MainNav() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'whitespace-nowrap text-[15px] font-semibold transition-colors xl:text-[17px]',
                pathname?.startsWith(item.href)
                  ? 'text-amber'
                  : 'text-white/70 hover:text-white'
              )}
            >
              {item.name}
            </Link>
          ))}
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

      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent
          id="mobile-main-menu"
          side="right"
          className="w-full max-w-sm overflow-y-auto border-white/10 bg-forest p-6 text-white sm:max-w-sm [&>button]:text-white/70 [&>button]:hover:text-white"
        >
          <SheetTitle className="sr-only">Main menu</SheetTitle>

          <div className="mb-8 flex items-center justify-between">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
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
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'rounded-lg px-4 py-3.5 text-lg font-semibold transition-colors',
                  pathname?.startsWith(item.href)
                    ? 'bg-white/10 text-amber'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                )}
              >
                {item.name}
                <div className="mt-1 text-sm font-normal text-white/45">{item.description}</div>
              </Link>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-8">
            <Link
              href="/#property-review"
              onClick={() => setMobileMenuOpen(false)}
              data-analytics-event="property_review_cta_click"
              className="w-full rounded-lg bg-amber py-3.5 text-center text-base font-bold text-forest hover:bg-amber/90 transition-colors"
            >
              Start Property Review
            </Link>
            <a
              href="https://ovlp-portal.vercel.app"
              onClick={() => setMobileMenuOpen(false)}
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
