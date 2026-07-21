import { MetadataRoute } from 'next';
import { countySellPages } from '@/lib/county-sell-data';
import { countyGuides, getSupplementalCountyGuide } from '@/lib/county-guide-data';
import { indexableBlogPosts } from '@/lib/blog-data';

const BASE_URL = 'https://ohiovalleylandpartners.com';
const CORE_CONTENT_DATE = '2026-07-21';
const COUNTY_CONTENT_DATE = '2026-07-20';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: CORE_CONTENT_DATE,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/ohio-valley-guides`,
      lastModified: CORE_CONTENT_DATE,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: CORE_CONTENT_DATE,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/land`,
      lastModified: CORE_CONTENT_DATE,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/commercial`,
      lastModified: CORE_CONTENT_DATE,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/development`,
      lastModified: CORE_CONTENT_DATE,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/community`,
      lastModified: CORE_CONTENT_DATE,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: CORE_CONTENT_DATE,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: CORE_CONTENT_DATE,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/disclaimer`,
      lastModified: CORE_CONTENT_DATE,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: CORE_CONTENT_DATE,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: CORE_CONTENT_DATE,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/land-scouts`,
      lastModified: CORE_CONTENT_DATE,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/properties`,
      lastModified: CORE_CONTENT_DATE,
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ];

  // County sell-land pages — highest priority after homepage
  const countyLandRoutes: MetadataRoute.Sitemap = countySellPages.map((county) => ({
    url: `${BASE_URL}/sell-land/${county.slug}`,
    lastModified: COUNTY_CONTENT_DATE,
    changeFrequency: 'weekly' as const,
    priority: 0.95,
  }));

  // Ohio Valley guide pages — county informational pages
  const countyGuideRoutes: MetadataRoute.Sitemap = countyGuides.map((county) => {
    const supplementalGuide = getSupplementalCountyGuide(county.slug);
    return {
      url: `${BASE_URL}/ohio-valley-guides/${county.slug}`,
      lastModified: supplementalGuide?.dateModified ?? COUNTY_CONTENT_DATE,
      changeFrequency: 'monthly' as const,
      priority: supplementalGuide ? 0.7 : 0.85,
    };
  });

  // Blog posts
  const blogRoutes: MetadataRoute.Sitemap = indexableBlogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.dateModified,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...countyLandRoutes,
    ...countyGuideRoutes,
    ...blogRoutes,
  ];
}
