import Link from 'next/link';
import { Mail, Phone, Heart, MapPin } from 'lucide-react';
import { siteConfig, ohioValleyStates } from '@/lib/seo-config';
import { communityGiving } from '@/lib/public-copy';
import Image from 'next/image';

const footerNavigation = {
  services: [
    { name: 'Sell Land', href: '/land' },
    { name: 'How It Works', href: '/land#how-it-works' },
    { name: 'Seller Resources', href: '/blog' },
    { name: 'Commercial Real Estate', href: '/commercial' },
    { name: 'Residential Development', href: '/development' },
    { name: 'Investor Portal', href: 'https://investors.ohiovalleylandpartners.com' },
  ],
  sellLandStates: ohioValleyStates.map((state) => ({
    name: state.name,
    href: state.href,
  })),
  campaigns: [
    { name: 'Geauga County, OH', href: '/ohio-valley-guides/geauga-county-oh' },
    { name: 'Franklin County, OH', href: '/sell-land/franklin-county-oh' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Community Commitment', href: '/community' },
    { name: 'Introductions', href: '/land-scouts' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Legal Disclaimer', href: '/disclaimer' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-forest border-t border-white/10" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="Ohio Valley Land Partners"
                width={512}
                height={341}
                className="h-32 w-auto object-contain"
              />
            </Link>
            <p className="text-sm leading-6 text-white/60 max-w-xs">
              Direct regional land buyer reviewing vacant, inherited, tax-burdened, and difficult-to-manage property across the Ohio Valley.
            </p>
            <div className="flex flex-col gap-3 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-amber flex-shrink-0" />
                <a href={`tel:${siteConfig.phone}`} className="hover:text-amber transition-colors">
                  {siteConfig.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-amber flex-shrink-0" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-amber transition-colors">
                  {siteConfig.email}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-amber flex-shrink-0 mt-0.5" />
                <span>
                  {siteConfig.address.streetAddress}<br />
                  {siteConfig.address.addressLocality}, {siteConfig.address.addressRegion} {siteConfig.address.postalCode}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-meadow/30 bg-meadow/10 px-3 py-1.5 w-fit">
              <Heart className="h-3.5 w-3.5 text-meadow" />
              <span className="text-xs text-meadow font-medium">{communityGiving.footer}</span>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-6">Services</h3>
                <ul role="list" className="space-y-4">
                  {footerNavigation.services.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        data-analytics-event={item.name === 'Investor Portal' ? 'buyer_portal_click' : undefined}
                        className="text-sm text-white/60 hover:text-amber transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">Sell Land</h3>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-white/35 mb-2">
                  Ohio Valley
                </p>
                <ul role="list" className="space-y-2">
                  {footerNavigation.sellLandStates.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm text-white/60 hover:text-amber transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-6">Company</h3>
                <ul role="list" className="space-y-4">
                  {footerNavigation.company.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-white/60 hover:text-amber transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-6">County Pages</h3>
                <ul role="list" className="space-y-4 mb-8">
                  {footerNavigation.campaigns.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm text-white/60 hover:text-amber transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-6">Legal</h3>
                <ul role="list" className="space-y-4">
                  {footerNavigation.legal.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-white/60 hover:text-amber transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24 flex flex-col gap-3 text-center">
          <p className="text-xs leading-5 text-white/40">
            &copy; {new Date().getFullYear()} Ohio Valley Land Partners. All rights reserved.
          </p>
          <p className="text-xs leading-5 text-white/30 max-w-2xl mx-auto">
            Principal buyer — not a licensed broker, agent, or law firm.{' '}
            <Link href="/disclaimer" className="underline underline-offset-2 hover:text-white/45">
              Legal disclaimer
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
