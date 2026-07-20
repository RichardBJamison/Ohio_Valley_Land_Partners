/**
 * Public-facing copy safeguards.
 * OVLP speaks only as a prospective principal buyer. Questions involving law,
 * taxes, title, valuation, brokerage, or professional judgment are redirected
 * to independent licensed professionals.
 */

/** Community reinvestment commitment — avoid implying distributions before they are verified. */
export const communityGiving = {
  headline: '5% of company profits committed to local community reinvestment.',
  principles:
    'OVLP has committed 5% of company profits to local community reinvestment as the business grows.',
  mission:
    'OVLP has committed 5% of company profits to local community reinvestment as the business grows.',
  statSub: 'Committed to local community reinvestment as the business grows',
  badge: '5% of company profits committed to local reinvestment',
  footer: '5% of company profits committed to the Ohio Valley',
  communityClosing:
    'OVLP has committed 5% of company profits to local community reinvestment as the business grows.',
} as const;

/** Visible seller positioning — clear first, with legal limits after the useful answer. */
export const sellerPositioning = {
  analysisLabel: 'Property Review',
  analysisSub: 'Property-specific review before any proposal',
  countySectionTitle: 'Where We Review Property',
  countySectionSub:
    'Our county pages preserve local property context and provide a direct path to start a property review.',
  formTitle: 'Start My Property Review',
  formSub: 'Share the property address and the best email to reach you.',
  reassurance:
    'Requesting a review does not commit you to sell. If the property fits our current criteria, we will contact you, ask a few questions, and determine whether a written proposal makes sense.',
  reviewExplanation:
    'We review the parcel, taxes, access, title information, surrounding activity, zoning considerations, and possible use to determine whether OVLP can present a direct purchase proposal.',
} as const;

export function countySubheadline(countyName: string): string {
  return `Direct property review for ${countyName} parcels by a regional principal buyer.`;
}

/** FAQ section framing — process only, not seller advice. */
export const faqFraming = {
  sectionTitle: 'Questions About a Direct Property Review',
  sectionSub:
    'Useful answers about OVLP’s acquisition process, with legal and professional limits noted where they matter.',
} as const;

export function softenCountyFaq(question: string, answer: string): string {
  const combined = `${question} ${answer}`;

  if (/how (?:do|to) i sell|without a real estate agent|without an agent|sell.*without.*agent/i.test(combined)) {
    return 'OVLP does not advise on how to sell property or whether to use an agent. We review submitted parcel information only to decide whether we may wish to purchase the property for our own account. Sale strategy, listing decisions, and legal questions belong with a licensed attorney, tax professional, or real estate professional.';
  }

  if (/(real estate agent|listing agent|hire an agent|need.*agent|without an agent|without a mls)/i.test(combined)) {
    return 'OVLP is a prospective principal buyer, not a listing agent or broker. Whether you use a real estate agent is your decision. We do not advise on sale strategy or marketing. Consult a licensed real estate professional if you want guidance on your options.';
  }

  return answer
    .replace(/we can close fast/gi, 'we can review the requested timing')
    .replace(/we handle remote closings/gi, 'remote participation may be available through the closing professionals')
    .replace(/worth less/gi, 'may be evaluated differently')
    .replace(/we handle them/gi, 'additional professional review may be needed');
}

export function publicBlogSummary(category: string): string {
  if (category === 'Market Reports') {
    return 'General regional market observations from OVLP. Not an appraisal, forecast, investment recommendation, or professional real estate advice.';
  }
  if (category === 'County Guides') {
    return 'General county property observations and OVLP acquisition interests. Property value, title, taxes, land use, and sale strategy require independent professional review.';
  }
  return 'General educational background from OVLP. Not legal, tax, title, appraisal, brokerage, investment, or transaction advice.';
}
