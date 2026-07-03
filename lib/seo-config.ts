export const siteConfig = {
  name: 'Ohio Valley Land Partners',
  description: 'Direct land acquisition inquiries, portfolio marketing, and regional property information from a prospective principal buyer in the Ohio Valley',
  url: 'https://ohiovalleylandpartners.com',
  ogImage: 'https://ohiovalleylandpartners.com/og.jpg',
  phone: '(614) 653-7430',
  email: 'info@ohiovalleylandpartners.com',
  // Author / founder — used in Article schema and About page
  // TODO: Replace with real name once About page is updated
  authorName: 'Richard B. Jamison',
  authorTitle: 'Founder, Ohio Valley Land Partners',
  authorUrl: 'https://ohiovalleylandpartners.com/about',
  // sameAs — populate as each account is created
  // TODO: Replace placeholder comments with real URLs
  // Set after signing up at clarity.microsoft.com (rbjpholdings@gmail.com)
  clarityProjectId: process.env.NEXT_PUBLIC_CLARITY_ID ?? '',
  indexNowKey: '97803ac8eb1a4fb997336648f3d7eb26',
  sameAs: [
    // 'https://www.linkedin.com/company/ohio-valley-land-partners', // add after LinkedIn created
    // 'https://www.google.com/maps/place/[GBP_ID]',                 // add after GBP verified
    // 'https://www.bbb.org/us/wv/wheeling/profile/[profile]',       // add after BBB listing
    // 'https://www.landwatch.com/[listing]',                        // add after LandWatch listing
    // 'https://www.land.com/[listing]',                             // add after Land.com listing
  ] as string[],
  address: {
    streetAddress: '2025 Riverside Drive STE 35682',
    addressLocality: 'Columbus',
    addressRegion: 'OH',
    postalCode: '43221',
    addressCountry: 'US',
  },
  serviceArea: [
    'Franklin County, OH',
    'Belmont County, OH',
    'Jefferson County, OH',
    'Columbiana County, OH',
    'Harrison County, OH',
    'Carroll County, OH',
    'Ohio County, WV',
    'Marshall County, WV',
    'Brooke County, WV',
  ],
};

export const defaultOgImages = [
  {
    url: siteConfig.ogImage,
    width: 1200,
    height: 630,
    alt: 'Ohio Valley Land Partners — Local Land Buyers in the Ohio Valley',
  },
];

export const silos = {
  land: {
    title: 'Land Offers',
    path: '/land',
    description: 'Direct land acquisition inquiries and private portfolio opportunities from a prospective principal buyer',
    keywords: 'land offers, cash land buyers, motivated sellers, Ohio Valley land',
  },
  commercial: {
    title: 'Commercial Real Estate',
    path: '/commercial',
    description: 'Industrial and retail development opportunities across the Ohio Valley region',
    keywords: 'commercial real estate, industrial development, retail properties, Ohio Valley',
  },
  development: {
    title: 'Residential Development',
    path: '/development',
    description: 'Long-term residential development projects and investor relations',
    keywords: 'residential development, investor relations, long-term projects, Ohio Valley',
  },
  guides: {
    title: 'Ohio Valley Guides',
    path: '/ohio-valley-guides',
    description: 'General county-by-county land information and market observations for the Ohio Valley region',
    keywords: 'Ohio Valley real estate, Franklin County land, county guides, local market analysis',
  },
};

export const ohioValleyStates = [
  { name: 'Ohio', href: '/land' },
  { name: 'Pennsylvania', href: '/land' },
  { name: 'West Virginia', href: '/land' },
  { name: 'Kentucky', href: '/land' },
  { name: 'Indiana', href: '/land' },
] as const;

export const counties = [
  { name: 'Franklin County', state: 'OH', slug: 'franklin-county-oh' },
  { name: 'Belmont County', state: 'OH', slug: 'belmont-county-oh' },
  { name: 'Jefferson County', state: 'OH', slug: 'jefferson-county-oh' },
  { name: 'Columbiana County', state: 'OH', slug: 'columbiana-county-oh' },
  { name: 'Harrison County', state: 'OH', slug: 'harrison-county-oh' },
  { name: 'Carroll County', state: 'OH', slug: 'carroll-county-oh' },
  { name: 'Ohio County', state: 'WV', slug: 'ohio-county-wv' },
  { name: 'Marshall County', state: 'WV', slug: 'marshall-county-wv' },
  { name: 'Brooke County', state: 'WV', slug: 'brooke-county-wv' },
];
