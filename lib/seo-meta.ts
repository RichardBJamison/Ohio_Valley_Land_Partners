/**
 * Backend-only SEO copy (meta titles, descriptions, OG).
 * High-intent keywords live here — not in visible page copy.
 */

export function countyVisualHeadline(countyName: string, stateAbbr: string): string {
  return `We Buy Land in ${countyName}, ${stateAbbr}`;
}

export function countyVisualSubheadline(countyName: string): string {
  return `Direct acquisition inquiry for ${countyName}. Property-specific review by a prospective principal buyer in the Ohio Valley.`;
}

export function countySellMetaTitle(
  countyName: string,
  stateAbbr: string,
  _slug?: string,
): string {
  return `We Buy Land in ${countyName}, ${stateAbbr} | Direct Property Review`;
}

export function countySellMetaDescription(
  countyName: string,
  state: string,
  stateAbbr: string,
  slug?: string,
): string {
  const region = slug === 'franklin-county-oh' ? 'Columbus and Central Ohio' : `${countyName}, ${state}`;
  return `Ohio Valley Land Partners reviews vacant, inherited, tax-burdened, and difficult-to-manage property in ${region} for possible direct purchase. No obligation; not every property receives a proposal.`;
}

export const homepageSeoMeta = {
  title: 'Sell Land in the Ohio Valley | Direct Property Review',
  description:
    'Explore a direct sale with Ohio Valley Land Partners. We review vacant, inherited, tax-burdened, and difficult-to-manage property for possible direct purchase, with no obligation to sell.',
  keywords: [
    'sell land Ohio Valley',
    'direct land buyer Ohio',
    'direct property review Ohio',
    'sell vacant land Ohio',
    'sell inherited land Ohio',
    'we buy land Ohio Valley',
    'sell land West Virginia',
  ],
} as const;
