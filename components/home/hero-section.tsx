'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MapPin, ShieldCheck, Users, Target, Globe2 } from 'lucide-react';
import { SellerForm } from '@/components/forms/seller-form';
import { InvestorIntakeForm } from '@/components/forms/investor-intake-form';
import { communityGiving, sellerPositioning } from '@/lib/public-copy';
import { HeroVideo } from '@/components/home/hero-video';

const stats = [
  { label: sellerPositioning.analysisLabel, value: 'Direct', icon: MapPin },
  { label: 'Regional Focus', value: 'Ohio Valley', icon: Globe2 },
  { label: 'No Obligation', value: 'Your Choice', icon: ShieldCheck },
  { label: 'Direct Communication', value: 'Principal‑Led', icon: Target },
];

const campaignRegions = [
  { label: 'Geauga County', href: '/ohio-valley-guides/geauga-county-oh', highlight: true },
];

const serviceRegions = [
  { label: 'Franklin County', slug: 'franklin-county-oh' },
  { label: 'Belmont County', slug: 'belmont-county-oh' },
  { label: 'Jefferson County', slug: 'jefferson-county-oh' },
  { label: 'Columbiana County', slug: 'columbiana-county-oh' },
  { label: 'Harrison County', slug: 'harrison-county-oh' },
  { label: 'Carroll County', slug: 'carroll-county-oh' },
  { label: 'Ohio County WV', slug: 'ohio-county-wv' },
  { label: 'Marshall County WV', slug: 'marshall-county-wv' },
  { label: 'Brooke County WV', slug: 'brooke-county-wv' },
];

const sellerTrustPoints = [
  'Local principal buyer',
  'Property-specific review',
  'Direct communication',
  'No obligation to accept a proposal',
];

const buyerTrustPoints = [
  'Direct notice of matching land opportunities',
  'Hunting, farm, development & investment parcels',
  'Property criteria reviewed by the OVLP team',
];

type Tab = 'sell' | 'buy';

export function HeroSection() {
  const [activeTab, setActiveTab] = useState<Tab>('sell');

  return (
    <section className="relative overflow-hidden bg-forest bg-[url('/og.jpg')] bg-cover bg-center md:bg-none motion-reduce:bg-[url('/og.jpg')] motion-reduce:bg-cover motion-reduce:bg-center">

      <HeroVideo />

      {/* Gradient overlay — heavy on the left where content lives, fades right so video shows through */}
      <div className="absolute inset-0 bg-gradient-to-r from-forest/95 via-forest/75 to-forest/40" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-start">

          {/* Left — Headline + trust points + stats */}
          <div className="pt-2 animate-fade-up">

            {/* Serif italic label — Mynd style */}
            <p className="heading-serif text-amber text-2xl mb-4">
              {activeTab === 'sell' ? 'Ohio Valley. Local. Intentional. Fair.' : 'Ohio Valley opportunities for active buyers.'}
            </p>

            {activeTab === 'sell' ? (
              <>
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl leading-tight">
                  Explore a direct sale for your land.
                </h1>
                <p className="mt-6 text-lg leading-8 text-white/70">
                  Ohio Valley Land Partners reviews vacant, inherited, tax-burdened, and
                  difficult-to-manage property across the region for possible direct purchase.
                  Share the property address and we will determine whether it fits our current
                  buying criteria.
                </p>
                <ul className="mt-6 flex flex-col gap-3">
                  {sellerTrustPoints.map((point) => (
                    <li key={point} className="flex items-center gap-3 text-sm font-medium text-white/80">
                      <ShieldCheck className="h-4 w-4 text-amber flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <>
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl leading-tight">
                  Off-Market Land Deals
                  <span className="block text-amber mt-1">in the Ohio Valley.</span>
                </h1>
                <p className="mt-6 text-lg leading-8 text-white/70">
                  Join our active builders network and hear directly about potential land opportunities —
                  hunting tracts, farm ground, development sites, and investment parcels
                  across the Ohio Valley. Inventory and active focus vary by county.
                </p>
                <ul className="mt-6 flex flex-col gap-3">
                  {buyerTrustPoints.map((point) => (
                    <li key={point} className="flex items-center gap-3 text-sm font-medium text-white/80">
                      <Users className="h-4 w-4 text-amber flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {/* Stats row */}
            <div className="mt-10 grid grid-cols-4 gap-4 border-t border-white/10 pt-10">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="flex flex-col items-center text-center">
                    <Icon className="h-4 w-4 text-amber mb-2" />
                    <div className="whitespace-nowrap text-lg font-bold tracking-[-0.01em] text-white">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-xs leading-tight text-white/50">{stat.label}</div>
                  </div>
                );
              })}
            </div>

            {/* Community giving badge */}
            <div className="mt-8">
              <Link
                href="/community"
                className="inline-flex items-center gap-2 rounded-full border border-meadow/40 bg-meadow/10 px-4 py-2 text-xs font-medium text-meadow hover:bg-meadow/20 transition-colors"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-meadow" />
                {communityGiving.badge}
              </Link>
            </div>
          </div>

          {/* Right — Tabbed form card */}
          <div id="property-review" className="w-full animate-fade-up-delay-1 scroll-mt-28">
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden shadow-2xl">

              {/* Tab switcher */}
              <div className="grid grid-cols-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('sell')}
                  data-analytics-event="seller_property_review_tab_click"
                  className={`py-4 text-sm font-bold tracking-wide transition-all ${
                    activeTab === 'sell'
                      ? 'bg-amber text-forest'
                      : 'bg-transparent text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  I Want to SELL
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('buy')}
                  data-analytics-event="builders_network_click"
                  className={`py-4 text-sm font-bold tracking-wide transition-all border-l border-white/10 ${
                    activeTab === 'buy'
                      ? 'bg-amber text-forest'
                      : 'bg-transparent text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Builders Network
                </button>
              </div>

              {/* Form content */}
              <div className="p-8 bg-white rounded-b-2xl">
                {activeTab === 'sell' ? (
                  <>
                    <div className="mb-6 text-center">
                      <h2 className="text-xl font-bold text-foreground">{sellerPositioning.formTitle}</h2>
                      <p className="text-sm text-muted-foreground mt-1">
                        {sellerPositioning.formSub}
                      </p>
                    </div>
                    <SellerForm />
                  </>
                ) : (
                  <>
                    <div className="mb-6 text-center">
                      <h2 className="text-xl font-bold text-foreground">Join the Deal List</h2>
                      <p className="text-sm text-muted-foreground mt-1">
                        Tell us what you want. We call when it’s available.
                      </p>
                    </div>
                    <InvestorIntakeForm />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* County strip */}
        <div className="mt-16 border-t border-white/10 pt-10">
          <p className="text-xs font-semibold text-white/40 uppercase tracking-widest text-center mb-5">
            Where We Review Property
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {campaignRegions.map((region) => (
              <Link
                key={region.href}
                href={region.href}
                className="inline-flex items-center gap-1.5 rounded-full border border-amber/50 bg-amber/15 px-3 py-1.5 text-xs font-semibold text-amber hover:bg-amber/25 transition-colors"
              >
                <Target className="h-3 w-3" />
                {region.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {serviceRegions.map((region) => (
              <Link
                key={region.slug}
                href={`/sell-land/${region.slug}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70 hover:border-amber/50 hover:text-amber transition-colors"
              >
                <MapPin className="h-3 w-3" />
                {region.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
