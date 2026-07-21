import { counties } from '@/lib/seo-config';

export interface SupplementalCountyGuideData {
  slug: string;
  name: string;
  state: string;
  stateName: string;
  dateModified: string;
  localGeography: string;
  citations: { source: string; detail: string }[];
  landTypes: string[];
  commonSituations: string[];
}

/**
 * Informational county guides that do not represent confirmed acquisition areas.
 * Their facts are carried forward from the retired county articles; no active-buying
 * status is inferred from publication of a guide.
 */
export const supplementalCountyGuides: SupplementalCountyGuideData[] = [
  {
    slug: 'geauga-county-oh',
    name: 'Geauga County',
    state: 'OH',
    stateName: 'Ohio',
    dateModified: '2026-07-21',
    localGeography:
      'Property conditions can differ across western and central Geauga County, including Chesterland, Chardon, Bainbridge, and surrounding townships. Access, parcel shape, apparent utilities, zoning information, surrounding uses, title, and physical conditions should be reviewed for the individual property.',
    citations: [
      {
        source: 'Geauga County public offices',
        detail:
          'County parcel, tax, recorded-document, GIS, and planning resources are starting points for property-specific research.',
      },
    ],
    landTypes: [
      'Vacant residential lots',
      'Wooded parcels',
      'Access-limited land',
      'Utility-limited parcels',
      'Inherited or co-owned property',
    ],
    commonSituations: [
      'Reviewing recorded access, frontage, and parcel shape',
      'Confirming current zoning information and surrounding uses',
      'Researching utilities, taxes, title, or estate questions',
      'Comparing a direct-buyer inquiry with other possible paths',
    ],
  },
  {
    slug: 'delaware-county-oh',
    name: 'Delaware County',
    state: 'OH',
    stateName: 'Ohio',
    dateModified: '2026-07-21',
    localGeography:
      'Land conditions in Delaware County can differ substantially by township, permitted use, access, utilities, parcel size, surrounding development, and other property facts. Regional activity near New Albany may be relevant to some parcels, but proximity alone does not establish value or development potential.',
    citations: [
      {
        source: 'Delaware County public offices',
        detail:
          'County parcel, tax, recorded-document, GIS, and planning resources are starting points for property-specific research.',
      },
    ],
    landTypes: [
      'Vacant residential lots',
      'Township acreage',
      'Parcels near development corridors',
      'Access- or utility-limited land',
      'Inherited or co-owned property',
    ],
    commonSituations: [
      'Confirming recorded access and road frontage',
      'Reviewing current zoning and permitted uses',
      'Researching utility availability and site conditions',
      'Comparing verified transactions and independent professional guidance',
    ],
  },
];

export const countyGuides = [
  ...counties,
  ...supplementalCountyGuides.map(({ slug, name, state }) => ({ slug, name, state })),
];

export function getCountyGuide(slug: string) {
  return countyGuides.find((county) => county.slug === slug);
}

export function getSupplementalCountyGuide(slug: string) {
  return supplementalCountyGuides.find((county) => county.slug === slug);
}
