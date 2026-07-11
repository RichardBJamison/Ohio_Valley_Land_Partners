import './globals.css';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Poppins, Cormorant_Garamond } from 'next/font/google';
import { MainNav } from '@/components/navigation/main-nav';
import { Footer } from '@/components/navigation/footer';
import { MobileStickyCta } from '@/components/navigation/mobile-sticky-cta';
import { PublicOnly, SiteMain } from '@/components/navigation/public-only';
import SiteHitTracker from '@/components/analytics/site-hit-tracker';
import { WebSiteSchema, PersonSchema, OrganizationSchema, ServiceSchema } from '@/components/seo/json-ld';
import { siteConfig } from '@/lib/seo-config';
import Script from 'next/script';
import { GhlBubbleOnly } from '@/components/ghl-bubble-only';
import { GhlChatEmbed } from '@/components/ghl-chat-embed';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400'],
  style: ['italic'],
  variable: '--font-cormorant',
  display: 'swap',
  preload: false,
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'Ohio Valley real estate',
    'land offers',
    'sell land Ohio Valley',
    'cash land buyer Ohio',
    'Belmont County land',
    'Jefferson County land',
    'sell inherited land Ohio',
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: 'Ohio Valley Land Partners — Local Land Buyers in the Ohio Valley',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${cormorant.variable}`}>
      <body className={poppins.className}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-7FQDXC8DVC"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7FQDXC8DVC');
          `}
        </Script>
        <WebSiteSchema />
        <OrganizationSchema />
        <ServiceSchema />
        <PersonSchema />
        {siteConfig.clarityProjectId ? (
          <Script id="microsoft-clarity" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${siteConfig.clarityProjectId}");
            `}
          </Script>
        ) : null}
        <Suspense fallback={null}>
          <SiteHitTracker />
        </Suspense>
        {/* Marketing chrome is public-only — private /p/* previews ship their own header. */}
        <PublicOnly>
          <MainNav />
        </PublicOnly>
        <SiteMain>{children}</SiteMain>
        <PublicOnly>
          <Footer />
          <MobileStickyCta />
          {/* GHL LeadConnector — public pages only; marker div for A2P scanner; script loads post-hydration. */}
          <GhlChatEmbed />
          <GhlBubbleOnly />
        </PublicOnly>
      </body>
    </html>
  );
}
