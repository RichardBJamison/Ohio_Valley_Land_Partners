import { siteConfig } from '@/lib/seo-config';

interface LocalBusinessSchemaProps {
  name?: string;
  description?: string;
}

export function LocalBusinessSchema({
  name = siteConfig.name,
  description = siteConfig.description,
}: LocalBusinessSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': siteConfig.url,
    name,
    description,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      '@type': 'PostalAddress',
      ...siteConfig.address,
    },
    areaServed: siteConfig.serviceArea.map((area) => ({
      '@type': 'AdministrativeArea',
      name: area,
    })),
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 39.9612,
      longitude: -83.0007,
    },
    hasMap: 'https://maps.google.com/?q=2025+Riverside+Drive+STE+35682+Columbus+OH+43221',
    ...(siteConfig.sameAs.length > 0 && { sameAs: siteConfig.sameAs }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface RealEstateListingSchemaProps {
  name: string;
  description: string;
  price: number;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
  };
  propertyType: 'Land' | 'Commercial' | 'Residential';
  lotSize?: string;
  images?: string[];
}

export function RealEstateListingSchema({
  name,
  description,
  price,
  address,
  propertyType,
  lotSize,
  images = [],
}: RealEstateListingSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name,
    description,
    url: typeof window !== 'undefined' ? window.location.href : siteConfig.url,
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    address: {
      '@type': 'PostalAddress',
      ...address,
      addressCountry: 'US',
    },
    ...(lotSize && { floorSize: { '@type': 'QuantitativeValue', value: lotSize } }),
    ...(images.length > 0 && { image: images }),
    propertyType,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BreadcrumbSchemaProps {
  items: Array<{ name: string; url: string }>;
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  faqs: FAQItem[];
}

export function FAQSchema({ faqs }: FAQSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ArticleSchemaProps {
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  slug?: string;
  image?: string;
}

export function ArticleSchema({
  headline,
  description,
  datePublished,
  dateModified,
  slug,
  image,
}: ArticleSchemaProps) {
  const pageUrl = slug
    ? `${siteConfig.url}/blog/${slug}`
    : siteConfig.url;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageUrl,
    },
    author: {
      '@type': 'Person',
      name: siteConfig.authorName,
      url: siteConfig.authorUrl,
      jobTitle: siteConfig.authorTitle,
      worksFor: {
        '@type': 'Organization',
        name: siteConfig.name,
        url: siteConfig.url,
      },
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/logo.png`,
      },
    },
    datePublished,
    dateModified: dateModified || datePublished,
    ...(image && {
      image: {
        '@type': 'ImageObject',
        url: image,
        width: 1200,
        height: 630,
      },
    }),
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.article-intro', '.article-summary'],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteConfig.url}#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: {
      '@type': 'ImageObject',
      url: `${siteConfig.url}/logo.png`,
    },
    description: siteConfig.description,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      '@type': 'PostalAddress',
      ...siteConfig.address,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: siteConfig.phone,
      email: siteConfig.email,
      contactType: 'Customer Service',
      areaServed: 'US',
      availableLanguage: 'English',
    },
    areaServed: siteConfig.serviceArea.map((area) => ({
      '@type': 'AdministrativeArea',
      name: area,
    })),
    ...(siteConfig.sameAs.length > 0 && { sameAs: siteConfig.sameAs }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function PersonSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteConfig.url}#author`,
    name: siteConfig.authorName,
    url: siteConfig.authorUrl,
    jobTitle: siteConfig.authorTitle,
    worksFor: {
      '@type': 'Organization',
      '@id': `${siteConfig.url}#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
    },
    knowsAbout: [
      'Land acquisition',
      'Rural land sales',
      'Ohio real estate',
      'West Virginia real estate',
      'Direct land purchases',
      'Ohio Valley land market',
      'Direct land acquisition',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ServiceSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${siteConfig.url}#direct-land-acquisition`,
    serviceType: 'Direct Land Acquisition Inquiries',
    name: 'Direct Land Acquisition Inquiries — Ohio Valley Land Partners',
    description:
      'Property-specific acquisition inquiries reviewed by Ohio Valley Land Partners as a prospective principal buyer.',
    provider: {
      '@type': 'Organization',
      '@id': `${siteConfig.url}#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: siteConfig.serviceArea.map((area) => ({
      '@type': 'AdministrativeArea',
      name: area,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebSiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: {
      '@type': 'Organization',
      '@id': `${siteConfig.url}#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
