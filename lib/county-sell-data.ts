/**
 * county-sell-data.ts — Data for county-specific seller landing pages
 * URL pattern: /sell-land/[slug]
 * Visible copy stays compliance-safe; high-intent SEO lives in meta fields via seo-meta.ts.
 */

import {
  countySellMetaDescription,
  countySellMetaTitle,
  countyVisualHeadline,
  countyVisualSubheadline,
} from '@/lib/seo-meta';

export interface CountyCitation {
  source: string;
  detail: string;
}

export interface CountySellData {
  slug: string;
  name: string;
  state: string;
  stateAbbr: string;
  headline: string;
  subheadline: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  why: string;
  localGeography: string;
  citations: CountyCitation[];
  relatedBlogSlugs: string[];
  landTypes: string[];
  commonSituations: string[];
  faqs: { q: string; a: string }[];
}

export const countySellPages: CountySellData[] = [
  {
    slug: 'franklin-county-oh',
    name: 'Franklin County',
    state: 'Ohio',
    stateAbbr: 'OH',
    headline: 'We Buy Vacant Land and Residential Lots in Franklin County, OH',
    subheadline: 'Direct acquisition inquiry for Franklin County. Any proposal is property-specific and is not an appraisal or statement of market value.',
    metaTitle: 'Franklin County Land | Direct Buyer Inquiry',
    metaDescription:
      'General information about OVLP acquisition interests in Franklin County, Ohio. Property-specific review by a prospective principal buyer; no guarantee of purchase, price, or timing.',
    keywords: [
      'sell land Franklin County Ohio',
      'cash land buyers Franklin County OH',
      'sell vacant lot Columbus Ohio',
      'sell infill lot Columbus Ohio',
      'sell inherited land Franklin County Ohio',
      'sell land with back taxes Franklin County Ohio',
      'sell teardown lot Columbus Ohio',
    ],
    why: `Franklin County remains Central Ohio's highest-growth land market, with US Census data showing sustained population gains across Columbus, Dublin, Hilliard, and New Albany. The Intel semiconductor campus expansion near Plain Township and US-33 corridor development have intensified builder demand for infill lots and acreage on the urban fringe. According to Franklin County Auditor parcel records, vacant residential lots inside Columbus city limits and along the I-270 belt consistently trade at a premium to rural Ohio Valley parcels. Ohio Valley Land Partners buys Franklin County land directly — inherited lots near German Village, tax-delinquent parcels in Whitehall, and acreage along US-40 toward Reynoldsburg — subject to property-specific review and mutually acceptable written terms.`,
    localGeography:
      'From the Intel-adjacent Plain Township corridor along US-33 to infill pockets in Clintonville, Franklinton, and the Hilliard–Dublin growth zone along I-270, Franklin County parcels vary widely by access, utilities, and zoning. Parcels near the Scioto River and the OSU campus area see different buyer pools than rural acreage east of Pickerington and south toward Grove City.',
    citations: [
      {
        source: 'Franklin County Auditor',
        detail: 'Parcel ownership, tax history, and GIS mapping for all Franklin County lots and acreage.',
      },
      {
        source: 'ORC § 5721.01',
        detail: 'Ohio delinquent property tax lien process — relevant when selling land with back taxes.',
      },
      {
        source: 'ORC § 2113.39',
        detail: 'Executor authority to sell real property during Ohio probate with court approval.',
      },
      {
        source: 'USDA NASS',
        detail: 'Ohio cropland and land value benchmarks used to contextualize rural Franklin County acreage.',
      },
    ],
    relatedBlogSlugs: ['franklin-county-ohio-sell-vacant-land-2026', 'land-near-intel-new-albany-ohio'],
    landTypes: [
      'Columbus infill lots',
      'Residential vacant lots',
      'Larger acreage of 0.8 acres and above',
      'Inherited land and estate parcels',
      'Tax-delinquent lots',
      'Teardown or redevelopment parcels',
    ],
    commonSituations: [
      'Own a vacant Columbus lot and want a direct buyer',
      'Inherited Franklin County land and do not want to list it',
      'Owe back taxes or have a parcel that has become a burden',
      'Have a small residential lot that agents have struggled to sell',
      'Want to compare a direct principal-buyer option with other paths',
    ],
    faqs: [
      {
        q: 'Is Franklin County part of the Ohio Valley?',
        a: 'Franklin County is a Central Ohio market rather than an Ohio River county. Ohio Valley Land Partners is the regional company brand, and our Franklin County work has its own acquisition criteria for Columbus-area infill lots, residential parcels, and acreage.',
      },
      {
        q: 'Do you buy small infill lots in Columbus?',
        a: 'Yes. OVLP reviews small infill and residential lots in Columbus. We consider access, utilities, zoning, frontage, surrounding activity, and possible use before deciding whether the parcel fits our current buying criteria.',
      },
      {
        q: 'Do you buy larger acreage in Franklin County?',
        a: 'Yes. OVLP also reviews larger lots and acreage. Access, ownership information, parcel configuration, surrounding uses, and possible future use all affect whether a property fits.',
      },
      {
        q: 'How do you price Franklin County land?',
        a: 'OVLP reviews location, parcel size, access, title information, taxes, zoning, utilities, nearby activity, comparable transactions, possible use, holding costs, and purchase risk. This is an internal acquisition review for our own account, not a formal appraisal or statement of market value.',
      },
      {
        q: 'Will you text me after I submit my property?',
        a: 'The short property-review form collects an email address. Phone and SMS communication is available only through the site’s GHL chat widget and its consent process. OVLP will use the contact method the owner provides.',
      },
      {
        q: 'Can I sell land in Franklin County if the property taxes are past due?',
        a: 'OVLP may review Franklin County property with reported delinquent taxes. The current balance, lien status, deadlines, and effect on any transaction must be verified with the county and the appropriate title, legal, and tax professionals. OVLP does not promise that a purchase can resolve the balance or meet a deadline.',
      },
      {
        q: 'How does Franklin County\'s land split process affect my timeline if I want to sell part of my lot?',
        a: 'A proposed split can add survey, access, zoning, subdivision, and approval questions that depend on the parcel and jurisdiction. OVLP may review the existing parcel or a proposed configuration, but only the relevant public offices and licensed professionals can determine requirements or timing.',
      },
      {
        q: 'Can I sell inherited Franklin County land while probate is still open?',
        a: 'OVLP may review inherited or estate-owned Franklin County land while probate is open. The estate’s authority to sell depends on the deed, estate documents, court orders, and Ohio law, so the personal representative should confirm the process with the estate attorney and title company.',
      },
      {
        q: 'Do you buy vacant lots inside Columbus city limits with no utilities?',
        a: 'Yes, OVLP reviews utility-limited lots case by case. Current zoning information, frontage, access, utility proximity, parcel dimensions, and surrounding development all affect our interest. Our review is not a zoning determination, survey, or appraisal.',
      },
    ],
  },
  {
    slug: 'belmont-county-oh',
    name: 'Belmont County',
    state: 'Ohio',
    stateAbbr: 'OH',
    headline: 'We Buy Vacant Land in Belmont County, OH',
    subheadline: 'Direct acquisition inquiry for Belmont County. Any proposal is property-specific and is not an appraisal or statement of market value.',
    metaTitle: 'Belmont County Land | Direct Buyer Inquiry',
    metaDescription:
      'General information about OVLP acquisition interests in Belmont County, Ohio. Property-specific review by a prospective principal buyer; no guarantee of purchase, price, or timing.',
    keywords: [
      'sell land Belmont County Ohio',
      'cash land buyers Belmont County OH',
      'sell vacant land Belmont County',
      'sell inherited land Belmont County Ohio',
      'sell land St Clairsville Ohio',
      'sell farm ground Belmont County Ohio cash',
    ],
    why: `Belmont County sits at the crossroads of Ohio's Utica and Marcellus shale plays and the I-70 corridor linking Columbus to Wheeling, WV. Surface parcels near St. Clairsville, Barnesville, and Shadyside draw interest from energy-adjacent buyers, agricultural operators, and investors holding along the Ohio River. Belmont County Auditor records show a mix of active farm ground, wooded acreage, and parcels with recorded oil and gas leases — each priced differently depending on mineral status. Ohio Valley Land Partners purchases Belmont County land directly, whether mineral rights are severed or still attached to the surface estate, subject to property-specific review and mutually acceptable written terms.`,
    localGeography:
      'Belmont County stretches from the Ohio River communities of Shadyside and Powhatan Point north to St. Clairsville along I-70 and east toward Barnesville and the Harrison County line. Parcels along the river corridor, in the Flushing–Lafferty agricultural zone, and near the I-470 bridge to Wheeling each attract different buyer profiles.',
    citations: [
      {
        source: 'Belmont County Auditor',
        detail: 'Parcel ownership, assessed values, and tax delinquency status for all Belmont County land.',
      },
      {
        source: 'ORC § 5723.01',
        detail: 'Ohio tax forfeiture process — land with unpaid taxes can eventually transfer to the state.',
      },
      {
        source: 'ORC § 5721.01',
        detail: 'Delinquent property tax lien process in Ohio, including interest accrual on back taxes.',
      },
      {
        source: 'USDA NASS',
        detail: 'Ohio cropland value data used to benchmark agricultural parcels in Belmont County.',
      },
    ],
    relatedBlogSlugs: ['sell-land-belmont-county-ohio-fast', 'sell-land-back-taxes-ohio'],
    landTypes: [
      'Vacant rural lots',
      'Agricultural and farm ground',
      'Timber and wooded parcels',
      'Mineral rights parcels',
      'Inherited estate land',
      'Delinquent tax properties',
    ],
    commonSituations: [
      'Inherited land from a family estate and need a clear first step',
      'Owe back property taxes and need to understand the parcel status',
      'Own land out of state and have no use for it',
      'Been listed with an agent for months with no results',
      'Want to explore a direct property review without an initial long questionnaire',
    ],
    faqs: [
      {
        q: 'What affects closing timing for Belmont County land?',
        a: 'Timing varies with the written agreement, title review, ownership records, property conditions, and third-party requirements. OVLP can discuss an owner’s requested timing, but does not promise a closing date before those items are reviewed.',
      },
      {
        q: 'Do you buy land with delinquent taxes in Belmont County?',
        a: 'OVLP may review Belmont County land with reported delinquent taxes. The county, title company, attorney, and tax professional should verify the balance and explain how it may affect a transaction; OVLP does not guarantee a payoff structure or owner proceeds.',
      },
      {
        q: 'What if my land is landlocked or has no road access?',
        a: 'OVLP reviews landlocked and access-limited parcels case by case. Recorded easements, neighboring ownership, terrain, and practical access may affect our interest. The review is not a survey, title opinion, legal access determination, or appraisal.',
      },
      {
        q: 'Does OVLP act as my real estate agent?',
        a: 'No. OVLP is a prospective principal buyer reviewing whether we wish to purchase your property. We do not list property, represent sellers, or advise on sale strategy.',
      },
      {
        q: 'Does having oil, gas, or mineral rights attached to my Belmont County land affect how I sell it?',
        a: 'Yes. Recorded leases and whether mineral interests are attached to or severed from the surface can affect OVLP’s interest and purchase terms. Belmont County Recorder records may provide background, but a qualified attorney and title professional should determine what interests are owned. OVLP does not provide a mineral-rights or value opinion.',
      },
      {
        q: 'What happens to my Belmont County land if it goes into the county tax forfeiture process?',
        a: 'Long-unpaid taxes can place a Belmont County parcel into a formal collection or forfeiture process. Deadlines and rights are property-specific. Confirm the current status with the county and consult an Ohio attorney promptly; OVLP may review the parcel but cannot interpret notices or promise a purchase before a deadline.',
      },
      {
        q: 'How do I check whether mineral rights were severed from my Belmont County deed?',
        a: 'The Belmont County Recorder’s records are a useful starting point for deeds, reservations, and recorded oil-and-gas documents. Because mineral ownership can involve multiple instruments, a qualified attorney or title professional should determine what is attached to the surface estate. OVLP can then explain how the verified information affects its own purchase interest.',
      },
      {
        q: 'Do you buy Belmont County land near the Ohio River or I-70 corridor?',
        a: 'Yes. OVLP reviews parcels along the Ohio River near Shadyside and Powhatan Point and along the I-70 corridor through St. Clairsville. River frontage, road access, flood information, parcel configuration, and surrounding uses are part of the property review.',
      },
    ],
  },
  {
    slug: 'jefferson-county-oh',
    name: 'Jefferson County',
    state: 'Ohio',
    stateAbbr: 'OH',
    headline: 'We Buy Vacant Land in Jefferson County, OH',
    subheadline: 'Direct acquisition inquiry for Jefferson County. Any proposal is property-specific and is not an appraisal or statement of market value.',
    metaTitle: 'Jefferson County Land | Direct Buyer Inquiry',
    metaDescription:
      'General information about OVLP acquisition interests in Jefferson County, Ohio. Property-specific review by a prospective principal buyer; no guarantee of purchase, price, or timing.',
    keywords: [
      'sell land Jefferson County Ohio',
      'cash land buyers Jefferson County OH',
      'sell vacant land Steubenville Ohio',
      'sell inherited land Jefferson County',
      'sell land back taxes Jefferson County Ohio',
    ],
    why: `Jefferson County sits on the Ohio River across from Weirton, WV, with Steubenville as the county seat and economic anchor. Jefferson County Auditor records show a mix of former industrial parcels, Ohio River frontage lots, and rural township acreage stretching toward Wintersville and Toronto. Energy activity and recreational demand from Pittsburgh-area buyers keep the market active for sellers who want a direct buyer instead of a long MLS listing. Ohio Valley Land Partners purchases throughout Jefferson County and reviews each opportunity individually.`,
    localGeography:
      'Jefferson County runs along the Ohio River from Steubenville and Mingo Junction through Toronto, Brilliant, and rural townships toward the Harrison County line. River corridor parcels, former industrial sites near US-22, and wooded acreage in the upland townships each have distinct buyer demand.',
    citations: [
      {
        source: 'Jefferson County Auditor',
        detail: 'Parcel ownership, tax history, and assessed values for all Jefferson County land.',
      },
      {
        source: 'ORC § 5721.01',
        detail: 'Ohio delinquent property tax lien process for parcels with back taxes.',
      },
      {
        source: 'ORC § 2113.39',
        detail: 'Executor authority to sell inherited real property during Ohio probate.',
      },
      {
        source: 'US Census Bureau',
        detail: 'Jefferson County population and housing data for market context.',
      },
    ],
    relatedBlogSlugs: ['sell-land-jefferson-county-ohio-steubenville', 'sell-land-back-taxes-ohio'],
    landTypes: [
      'Vacant residential and rural lots',
      'Former industrial sites',
      'Agricultural parcels',
      'Timber land',
      'Ohio River frontage parcels',
      'Inherited estate properties',
    ],
    commonSituations: [
      'Inherited land in Jefferson County and live out of state',
      'Owe delinquent property taxes and need to understand the current status',
      'Land has been sitting unused for years with no plan',
      'Listed with a realtor with no offers',
      'Need a clear path for estate-owned property',
    ],
    faqs: [
      {
        q: 'Do you buy land near Steubenville?',
        a: 'Yes. OVLP reviews property throughout Jefferson County, including Steubenville, Toronto, Brilliant, Mingo Junction, and rural townships. Every parcel still must fit the current acquisition criteria.',
      },
      {
        q: 'What if there is an old structure on the land?',
        a: 'OVLP may review parcels with old outbuildings, deteriorated structures, or debris. The structure’s condition, possible removal costs, environmental concerns, and intended use are considered before we decide whether the property fits.',
      },
      {
        q: 'How do you determine what to offer for Jefferson County land?',
        a: 'OVLP reviews Jefferson County Auditor records, comparable transactions, access, utilities, zoning information, title matters, taxes, surrounding activity, possible use, holding costs, and purchase risk. The result is an internal acquisition decision, not a formal appraisal or market-value opinion.',
      },
      {
        q: 'Can you close through a local title company?',
        a: 'If both sides choose to proceed, the transaction moves through a qualified title or closing professional for the property’s state. The written agreement and property-specific title work determine the exact closing process.',
      },
      {
        q: 'Do you buy inherited Jefferson County land from out-of-state heirs?',
        a: 'OVLP may review inherited Jefferson County property owned by out-of-state heirs. Authority to sell and whether remote signing is available depend on the estate, deed, written terms, and closing professionals. The estate representative should confirm requirements with the estate attorney and title company.',
      },
      {
        q: 'What if my Jefferson County land has delinquent property taxes?',
        a: 'OVLP may review Jefferson County property with reported delinquent taxes. The county and the appropriate title, legal, and tax professionals must verify the balance, status, and effect on a proposed transaction. OVLP does not guarantee payoff terms or proceeds.',
      },
      {
        q: 'Do you buy Ohio River frontage parcels in Jefferson County?',
        a: 'Yes. OVLP reviews river-frontage parcels near Steubenville, Mingo Junction, and Toronto. Flood information, road access, parcel configuration, environmental conditions, and surrounding uses are part of the property-specific review.',
      },
      {
        q: 'How is Jefferson County land priced compared to Belmont or Harrison counties?',
        a: 'OVLP does not apply one countywide price. We review location, parcel size, access, utilities, title information, taxes, zoning, nearby activity, comparable transactions, possible use, costs, and risk. This internal review is not a formal appraisal or comparison of market value across counties.',
      },
    ],
  },
  {
    slug: 'columbiana-county-oh',
    name: 'Columbiana County',
    state: 'Ohio',
    stateAbbr: 'OH',
    headline: 'We Buy Vacant Land in Columbiana County, OH',
    subheadline: 'Direct acquisition inquiry for Columbiana County. Any proposal is property-specific and is not an appraisal or statement of market value.',
    metaTitle: 'Columbiana County Land | Direct Buyer Inquiry',
    metaDescription:
      'General information about OVLP acquisition interests in Columbiana County, Ohio. Property-specific review by a prospective principal buyer; no guarantee of purchase, price, or timing.',
    keywords: [
      'sell land Columbiana County Ohio',
      'cash land buyers Columbiana County',
      'sell vacant land Lisbon Ohio',
      'sell farm land Columbiana County Ohio',
      'sell inherited property Columbiana County',
    ],
    why: `Columbiana County is an agricultural and recreational land market anchored by Lisbon, with steady demand from farming operations, hunters, and investors from the Youngstown–Canton corridor. Columbiana County Auditor records show productive farm ground near Salem, wooded tracts in the northern townships, and vacant lots in East Liverpool along the Ohio River. Ohio Valley Land Partners purchases throughout the county — from Lisbon to Salem to East Liverpool — and reviews each opportunity individually.`,
    localGeography:
      'Columbiana County spans from the Ohio River at East Liverpool and Wellsville north through Lisbon and Salem toward the Pennsylvania border. Farm ground in the central townships, hunting land in the wooded hills, and residential lots near the Route 30 corridor each attract different buyers.',
    citations: [
      {
        source: 'Columbiana County Auditor',
        detail: 'Parcel ownership, assessed values, and tax delinquency records for all county land.',
      },
      {
        source: 'ORC § 5721.01',
        detail: 'Ohio delinquent property tax lien process.',
      },
      {
        source: 'ORC § 5723.01',
        detail: 'Tax forfeiture process for land with long-unpaid Ohio property taxes.',
      },
      {
        source: 'USDA NASS',
        detail: 'Ohio cropland value benchmarks for agricultural parcels in Columbiana County.',
      },
    ],
    relatedBlogSlugs: ['sell-land-columbiana-county-ohio', 'sell-land-back-taxes-ohio'],
    landTypes: [
      'Farm ground and agricultural parcels',
      'Hunting and recreational tracts',
      'Wooded and timber parcels',
      'Vacant residential lots',
      'Inherited estate land',
      'Delinquent tax properties',
    ],
    commonSituations: [
      'Own farm ground that is no longer being worked',
      'Inherited property from a parent or grandparent',
      'Land is generating property tax bills with no income',
      'Exploring a direct purchase inquiry',
      'Owe back taxes and need to verify the county status and deadlines',
    ],
    faqs: [
      {
        q: 'Do you buy agricultural land in Columbiana County?',
        a: 'Yes. OVLP reviews active and fallow farm ground in Columbiana County. Access, soils and current use information, parcel configuration, leases, utilities, and surrounding activity help determine whether the property fits.',
      },
      {
        q: 'What is my Columbiana County land worth?',
        a: 'OVLP reviews location, size, access, title information, taxes, zoning, utilities, nearby activity, comparable transactions, possible use, holding costs, and purchase risk. Any OVLP proposal reflects our own acquisition criteria and is not a formal appraisal or statement of market value.',
      },
      {
        q: 'Can you close quickly if I\'m facing a tax sale?',
        a: 'Tell OVLP about any known deadline when you submit the address. We can review the requested timing, but title work, ownership, written terms, county status, and third-party requirements determine whether a transaction is possible. No closing date is guaranteed.',
      },
      {
        q: 'Do I need a survey before selling?',
        a: 'A new survey is not required merely to request an OVLP property review. Whether a survey is later needed depends on boundaries, access, the written agreement, title requirements, and the closing professionals. OVLP does not make boundary determinations.',
      },
      {
        q: 'Do you buy hunting and recreational land in Columbiana County?',
        a: 'Yes. OVLP reviews wooded and recreational tracts in northern Columbiana County. Recorded access, terrain, timber condition, zoning information, parcel size, and surrounding uses are among the factors considered.',
      },
      {
        q: 'Can I sell Columbiana County land with back taxes before the county tax sale?',
        a: 'OVLP may review Columbiana County land with reported delinquent taxes. Confirm the balance, status, and deadlines with the county and the appropriate legal, title, and tax professionals. OVLP cannot promise that a purchase will occur before a tax-sale or forfeiture deadline.',
      },
      {
        q: 'Do you buy land near East Liverpool or the Ohio River?',
        a: 'OVLP reviews Ohio River corridor parcels in East Liverpool and Wellsville. Flood information, road frontage, environmental or industrial history, parcel configuration, and surrounding uses are part of the internal review.',
      },
      {
        q: 'What if multiple heirs inherited Columbiana County land?',
        a: 'OVLP may review property with multiple heirs, but the deed, estate documents, court orders, and applicable law determine who may sign. The heirs or estate representative should work with an Ohio attorney and title company to confirm authority and resolve any disagreement before closing.',
      },
    ],
  },
  {
    slug: 'harrison-county-oh',
    name: 'Harrison County',
    state: 'Ohio',
    stateAbbr: 'OH',
    headline: 'We Buy Vacant Land in Harrison County, OH',
    subheadline: 'Direct acquisition inquiry for Harrison County. Any proposal is property-specific and is not an appraisal or statement of market value.',
    metaTitle: 'Harrison County Land | Direct Buyer Inquiry',
    metaDescription:
      'General information about OVLP acquisition interests in Harrison County, Ohio. Property-specific review by a prospective principal buyer; no guarantee of purchase, price, or timing.',
    keywords: [
      'sell land Harrison County Ohio',
      'cash land buyers Harrison County OH',
      'sell vacant land Cadiz Ohio',
      'sell timber land Harrison County',
      'sell inherited land Harrison County Ohio',
      'sell undeveloped land Harrison County Ohio fast',
    ],
    why: `Harrison County is one of Ohio's premier hunting and recreational land markets, with Cadiz as the county seat and heavily wooded terrain throughout the rural townships. Harrison County Auditor records show strong demand for hunting tracts, timber parcels, and mineral-adjacent acreage from buyers in Cleveland, Columbus, and Pittsburgh. Ohio Valley Land Partners regularly acquires land throughout Harrison County and reviews each opportunity individually through a local title company.`,
    localGeography:
      'Harrison County covers the upland terrain between the Ohio River Valley and the Tuscarawas County line, with Cadiz at the center and rural townships extending toward Scio, Freeport, and the Carroll County border. Timber tracts, hunting ground, and parcels with oil and gas activity each have distinct market values.',
    citations: [
      {
        source: 'Harrison County Auditor',
        detail: 'Parcel ownership, tax history, and assessed values for all Harrison County land.',
      },
      {
        source: 'ORC § 5721.01',
        detail: 'Ohio delinquent property tax lien process.',
      },
      {
        source: 'Ohio DNR Division of Wildlife',
        detail: 'White-tailed deer harvest data — Harrison County ranks among Ohio\'s top hunting counties.',
      },
      {
        source: 'USDA NASS',
        detail: 'Ohio timberland and cropland value benchmarks.',
      },
    ],
    relatedBlogSlugs: ['brooke-harrison-carroll-county-land-buyers', 'sell-land-back-taxes-ohio'],
    landTypes: [
      'Hunting and recreational land',
      'Timber and wooded parcels',
      'Agricultural ground',
      'Mineral rights parcels',
      'Inherited estate land',
      'Vacant rural lots',
    ],
    commonSituations: [
      'Own hunting land that no one in the family uses anymore',
      'Inherited wooded acreage in Harrison County',
      'Owe back taxes on a rural parcel',
      'Want to compare a direct purchase inquiry with other sale paths',
      'Timber has been cut and land is no longer productive',
    ],
    faqs: [
      {
        q: 'Is there demand for hunting land in Harrison County?',
        a: 'Hunting and recreational land is an established parcel type in Harrison County. Buyer interest still varies with access, acreage, terrain, timber, neighboring uses, improvements, and price, so OVLP reviews each tract individually.',
      },
      {
        q: 'Do you buy timber land in Harrison County?',
        a: 'Yes. OVLP reviews timber parcels whether timber has been harvested or remains standing. Access, terrain, remaining timber condition, boundaries, surrounding uses, and possible use all affect our acquisition interest; we do not provide a timber appraisal.',
      },
      {
        q: 'What if my land has an old oil or gas well on it?',
        a: 'OVLP reviews available records for active, plugged, or orphaned wells and considers how they may affect access, use, cost, and risk. A qualified attorney, title professional, environmental professional, or public agency should verify the well and lease status.',
      },
      {
        q: 'How do I find out if I owe back taxes in Harrison County?',
        a: 'Contact the Harrison County Treasurer\'s office in Cadiz, or we can look it up when you submit your property address.',
      },
      {
        q: 'Do you buy mineral rights parcels in Harrison County?',
        a: 'OVLP may review surface property and disclosed mineral interests. Recorded leases and whether minerals are severed can affect our purchase interest, but OVLP does not determine mineral ownership or provide a mineral-rights opinion. Use the Harrison County Recorder and qualified title and legal professionals to verify the records.',
      },
      {
        q: 'Can I sell inherited Harrison County hunting land during probate?',
        a: 'OVLP may review inherited Harrison County land while probate is open. Whether the estate can sell depends on the deed, estate documents, court orders, and Ohio law. The fiduciary should confirm authority and timing with the estate attorney and title company.',
      },
      {
        q: 'What if my Harrison County land has no road access?',
        a: 'OVLP reviews landlocked and access-limited Harrison County parcels case by case. Auditor GIS, recorded easements, neighboring ownership, and terrain can provide background, but a surveyor, title professional, or attorney must verify boundaries and legal access.',
      },
      {
        q: 'What affects timing when Harrison County land has back taxes?',
        a: 'Timing depends on the written agreement, ownership, title review, county status, and third-party requirements. Tell OVLP about any known tax deadline, but confirm it with the county and an Ohio attorney. OVLP does not guarantee a payoff structure or closing date.',
      },
    ],
  },
  {
    slug: 'carroll-county-oh',
    name: 'Carroll County',
    state: 'Ohio',
    stateAbbr: 'OH',
    headline: 'We Buy Vacant Land in Carroll County, OH',
    subheadline: 'Direct acquisition inquiry for Carroll County. Any proposal is property-specific and is not an appraisal or statement of market value.',
    metaTitle: 'Carroll County Land | Direct Buyer Inquiry',
    metaDescription:
      'General information about OVLP acquisition interests in Carroll County, Ohio. Property-specific review by a prospective principal buyer; no guarantee of purchase, price, or timing.',
    keywords: [
      'sell land Carroll County Ohio',
      'cash land buyers Carroll County OH',
      'sell vacant land Carrollton Ohio',
      'sell hunting land Carroll County Ohio',
      'sell farm land Carroll County Ohio',
      'Carroll County Ohio vacant land buyers cash',
    ],
    why: `Carroll County sits between Canton and the Ohio River Valley, with Carrollton as the county seat and Atwood Lake as a major recreational draw. Carroll County Auditor records show a mix of hunting ground, productive farmland, and Utica shale-adjacent acreage from Carrollton through Malvern and Minerva. Ohio Valley Land Partners actively buys throughout Carroll County and reviews each opportunity individually.`,
    localGeography:
      'Carroll County stretches from Carrollton and Sherrodsville south toward Atwood Lake and east toward the Columbiana County line. Farm ground in the central townships, recreational land near Atwood Lake, and wooded acreage in the northern hills each attract different buyer profiles.',
    citations: [
      {
        source: 'Carroll County Auditor',
        detail: 'Parcel ownership, assessed values, and tax delinquency status.',
      },
      {
        source: 'ORC § 5721.01',
        detail: 'Ohio delinquent property tax lien process.',
      },
      {
        source: 'ORC § 2113.39',
        detail: 'Executor authority to sell inherited real property during probate.',
      },
      {
        source: 'USDA NASS',
        detail: 'Ohio cropland value data for agricultural parcels in Carroll County.',
      },
    ],
    relatedBlogSlugs: ['brooke-harrison-carroll-county-land-buyers', 'sell-land-back-taxes-ohio'],
    landTypes: [
      'Hunting and recreational tracts',
      'Agricultural and farm parcels',
      'Wooded and timber land',
      'Vacant residential lots',
      'Inherited estate properties',
      'Oil and gas parcels',
    ],
    commonSituations: [
      'Family farm or hunting land that no one is using',
      'Inherited Carroll County property from an estate',
      'Repeated or delinquent property-tax bills',
      'Out-of-state owner who no longer uses the land',
      'Exploring a direct sale timeline',
    ],
    faqs: [
      {
        q: 'Do you buy land near Carrollton, Ohio?',
        a: 'Yes. OVLP reviews property throughout Carroll County, including Carrollton, Sherrodsville, Malvern, Minerva, and rural townships. Each parcel must still fit the current acquisition criteria.',
      },
      {
        q: 'What affects closing timing in Carroll County?',
        a: 'Timing varies with ownership, the written agreement, title review, property conditions, and third-party requirements. OVLP can discuss a requested timeline but does not guarantee a closing date.',
      },
      {
        q: 'Do oil and gas rights affect my land\'s value?',
        a: 'Recorded leases and whether mineral interests are attached to or severed from the surface can affect OVLP’s acquisition interest. A qualified attorney and title professional should determine ownership; OVLP’s review is not a mineral-rights opinion or appraisal.',
      },
      {
        q: 'What happens if there\'s a dispute among heirs about selling?',
        a: 'OVLP can review the property, but only the deed, estate documents, court orders, and applicable law determine who may sell. The heirs or estate representative should work with an attorney and title company to confirm authority and resolve any dispute.',
      },
      {
        q: 'Do you buy land near Atwood Lake or Carrollton?',
        a: 'Yes. OVLP reviews recreational parcels near Atwood Lake and rural acreage around Carrollton. Lake and road access, zoning information, utilities, parcel configuration, and surrounding uses are part of the property review.',
      },
      {
        q: 'How do Utica shale leases affect Carroll County land value?',
        a: 'Recorded oil-and-gas leases and severed mineral interests can affect use, title, and OVLP’s purchase interest. Share any known lease information when you submit, and use the Carroll County Recorder plus qualified legal and title professionals to verify the recorded interests.',
      },
      {
        q: 'Can I sell Carroll County farm ground that is no longer being worked?',
        a: 'Yes. OVLP reviews active and fallow farm ground in Carroll County. Access, current use, parcel configuration, leases, soils information, surrounding activity, comparable transactions, costs, and risk all inform our internal acquisition review.',
      },
      {
        q: 'What if my Carroll County land has delinquent taxes?',
        a: 'OVLP may review Carroll County property with reported delinquent taxes. Confirm the balance, collection status, and deadlines with the county and the appropriate legal, title, and tax professionals. OVLP does not promise that a purchase can resolve the balance or occur before a deadline.',
      },
    ],
  },
  {
    slug: 'ohio-county-wv',
    name: 'Ohio County',
    state: 'West Virginia',
    stateAbbr: 'WV',
    headline: 'We Buy Vacant Land in Ohio County, WV',
    subheadline: 'Direct acquisition inquiry for Ohio County. Any proposal is property-specific and is not an appraisal or statement of market value.',
    metaTitle: 'Ohio County Land | Direct Buyer Inquiry',
    metaDescription:
      'General information about OVLP acquisition interests in Ohio County, West Virginia. Property-specific review by a prospective principal buyer; no guarantee of purchase, price, or timing.',
    keywords: [
      'sell land Ohio County West Virginia',
      'cash land buyers Ohio County WV',
      'sell vacant land Wheeling WV',
      'sell inherited land Ohio County WV',
      'sell land fast Wheeling West Virginia',
    ],
    why: `Ohio County is the economic center of West Virginia's northern panhandle, anchored by Wheeling along the Ohio River. Ohio County Assessor records show a diverse land market — from urban residential lots in Wheeling to rural acreage in Triadelphia and Valley Grove. Proximity to Pittsburgh and the I-70 corridor makes this one of the more liquid WV land markets. Ohio Valley Land Partners buys throughout Ohio County and reviews each opportunity individually through a West Virginia title company.`,
    localGeography:
      'Ohio County runs along the Ohio River from Wheeling through Triadelphia, Valley Grove, and the rural townships toward the Marshall County line. Urban lots in Wheeling, Ohio River corridor parcels, and hillside acreage toward the Pennsylvania border each have distinct buyer demand.',
    citations: [
      {
        source: 'Ohio County Assessor',
        detail: 'Parcel ownership, assessed values, and tax records for all Ohio County WV land.',
      },
      {
        source: 'WV Code § 11A-3',
        detail: 'West Virginia delinquent property tax lien and sheriff\'s sale process.',
      },
      {
        source: 'WV Code § 44-1',
        detail: 'West Virginia estates and probate administration for inherited land sales.',
      },
      {
        source: 'US Census Bureau',
        detail: 'Ohio County WV population and housing data for market context.',
      },
    ],
    relatedBlogSlugs: ['sell-land-ohio-county-west-virginia-wheeling', 'cash-land-buyers-ohio-valley'],
    landTypes: [
      'Vacant urban and suburban lots',
      'Rural acreage and farm parcels',
      'Inherited estate land',
      'Commercial-adjacent parcels',
      'Ohio River corridor land',
      'Delinquent tax properties',
    ],
    commonSituations: [
      'Inherited a lot or parcel in the Wheeling area',
      'Own land that\'s been sitting vacant for years',
      'Repeated or delinquent West Virginia property-tax bills',
      'Out-of-state heir with West Virginia land',
      'Exploring a direct purchase inquiry',
    ],
    faqs: [
      {
        q: 'Do you buy land in West Virginia?',
        a: 'Yes. OVLP reviews property in Ohio, Marshall, and Brooke counties in West Virginia, along with other Ohio Valley acquisition areas. Current interest still depends on the county and the parcel.',
      },
      {
        q: 'Is West Virginia land harder to sell than Ohio land?',
        a: 'West Virginia land is not uniformly harder or easier to sell. Buyer interest varies with location, access, topography, utilities, title and mineral interests, parcel size, and possible use. Ohio County parcels near Wheeling differ from remote hillside acreage, so each property needs its own review.',
      },
      {
        q: 'How does WV probate differ from Ohio probate for land sales?',
        a: 'West Virginia and Ohio have different estate laws, offices, documents, and procedures. OVLP may review inherited property as a prospective buyer, but cannot explain which state process applies or who has authority to sign. The estate representative should consult a West Virginia attorney and title professional.',
      },
      {
        q: 'Do you buy land in the city of Wheeling?',
        a: 'Yes. OVLP reviews urban and suburban lots in Wheeling. Location, access, zoning information, utilities, parcel dimensions, existing structures, surrounding uses, costs, and risk affect whether a property fits.',
      },
      {
        q: 'Do you work with out-of-state heirs who inherited Ohio County WV land?',
        a: 'OVLP may review inherited Ohio County property owned by out-of-state heirs. Authority to sell and whether remote signing is available depend on the estate, deed, written terms, and closing professionals. Confirm the requirements with a West Virginia attorney and title professional.',
      },
      {
        q: 'What happens if my Ohio County WV property taxes are delinquent?',
        a: 'Reported delinquent taxes can affect timing, title, and whether a transaction is possible. Confirm the current balance, status, notices, and deadlines with the county and a West Virginia attorney. OVLP may review the parcel but cannot interpret notices or promise a purchase before a deadline.',
      },
      {
        q: 'Do you buy Ohio River frontage land in Ohio County?',
        a: 'Yes. OVLP reviews river-corridor parcels near Wheeling and the I-70 bridge. Flood information, road access, parcel configuration, environmental conditions, and surrounding uses are part of the property-specific review.',
      },
      {
        q: 'How is WV land in Ohio County priced compared to across the river in Ohio?',
        a: 'OVLP does not apply a blanket Ohio-versus-West-Virginia discount. We review Ohio County location, size, access, utilities, title and mineral information, taxes, nearby activity, comparable transactions, possible use, costs, and risk. The result is not a formal appraisal or cross-state market-value opinion.',
      },
    ],
  },
  {
    slug: 'marshall-county-wv',
    name: 'Marshall County',
    state: 'West Virginia',
    stateAbbr: 'WV',
    headline: 'We Buy Vacant Land in Marshall County, WV',
    subheadline: 'Direct acquisition inquiry for Marshall County. Any proposal is property-specific and is not an appraisal or statement of market value.',
    metaTitle: 'Marshall County Land | Direct Buyer Inquiry',
    metaDescription:
      'General information about OVLP acquisition interests in Marshall County, West Virginia. Property-specific review by a prospective principal buyer; no guarantee of purchase, price, or timing.',
    keywords: [
      'sell land Marshall County West Virginia',
      'cash land buyers Marshall County WV',
      'sell vacant land Moundsville WV',
      'sell rural land Marshall County WV',
      'sell inherited land Marshall County West Virginia',
    ],
    why: `Marshall County stretches along the Ohio River south of Wheeling, with Moundsville as the county seat and a mix of rural farmland, wooded hills, and river corridor parcels. Marshall County Assessor records show steady demand from rural residential buyers, farmers, and recreational investors — quieter than Ohio County but with solid liquidity for well-located parcels. Ohio Valley Land Partners actively purchases in Marshall County and reviews each opportunity individually.`,
    localGeography:
      'Marshall County runs along the Ohio River from Moundsville and Glen Dale south through Cameron and the rural townships toward Wetzel County. River corridor parcels, farm ground in the central valleys, and wooded hillside acreage each attract different buyers.',
    citations: [
      {
        source: 'Marshall County Assessor',
        detail: 'Parcel ownership, assessed values, and tax records for all Marshall County WV land.',
      },
      {
        source: 'WV Code § 11A-3',
        detail: 'West Virginia delinquent property tax lien and sheriff\'s sale process.',
      },
      {
        source: 'WV Code § 44-1',
        detail: 'West Virginia probate and estate administration for inherited land.',
      },
      {
        source: 'US Census Bureau',
        detail: 'Marshall County WV population data for market context.',
      },
    ],
    relatedBlogSlugs: ['sell-land-marshall-county-wv-moundsville', 'cash-land-buyers-ohio-valley'],
    landTypes: [
      'Rural and agricultural parcels',
      'Wooded and recreational tracts',
      'Ohio River frontage land',
      'Inherited estate properties',
      'Vacant residential lots',
      'Oil and gas parcels',
    ],
    commonSituations: [
      'Inherited West Virginia land and live out of state',
      'Own land that\'s been unused for a decade or more',
      'Delinquent WV property taxes on a rural parcel',
      'Family land that no one wants to continue managing',
      'Want a clear direct-purchase process for West Virginia property',
    ],
    faqs: [
      {
        q: 'Do you buy land near Moundsville, WV?',
        a: 'Yes. OVLP reviews property throughout Marshall County, including Moundsville, Cameron, Glen Dale, Benwood, and rural areas. Each parcel must still fit the current acquisition criteria.',
      },
      {
        q: 'Is there demand for Marshall County land?',
        a: 'Buyer interest in Marshall County varies by location, road access, terrain, utilities, parcel size, title and mineral information, surrounding uses, and price. Rural residential land, recreational acreage, farm ground, and Ohio River corridor parcels each draw different buyer groups, so OVLP reviews the specific property rather than applying one countywide demand claim.',
      },
      {
        q: 'What if my West Virginia land has mineral rights issues?',
        a: 'Severed mineral interests can affect title, use, access, and OVLP’s purchase interest. OVLP can review the disclosed surface and mineral information but does not determine ownership or provide a mineral-rights or value opinion. Qualified legal and title professionals should verify the records.',
      },
      {
        q: 'What affects timing when a Marshall County estate has a deadline?',
        a: 'Tell OVLP about the requested timing when you submit the address. Estate authority, title work, written terms, property conditions, and third-party requirements determine whether and when a closing is possible. No closing date is guaranteed.',
      },
      {
        q: 'Do you buy land near Moundsville or the former prison site area?',
        a: 'Yes. OVLP reviews parcels in and around Moundsville, Glen Dale, and along US-2. Zoning information, road access, recorded easements, utilities, parcel configuration, and surrounding uses are part of the review.',
      },
      {
        q: 'What if my Marshall County WV land has severed mineral rights?',
        a: 'OVLP may review the surface estate even when mineral interests are severed. The Marshall County Clerk’s records are a useful starting point, but a qualified attorney and title professional should determine what is owned. OVLP will explain how verified information affects its own acquisition interest.',
      },
      {
        q: 'Can I sell Marshall County land with delinquent WV property taxes?',
        a: 'OVLP may review Marshall County land with reported delinquent taxes. The county and the appropriate legal, title, and tax professionals must verify the balance, status, deadlines, and effect on a proposed transaction. OVLP does not guarantee payoff terms or owner proceeds.',
      },
      {
        q: 'Do you buy Ohio River frontage in Marshall County?',
        a: 'Yes. OVLP reviews Ohio River frontage and river-corridor parcels in Marshall County. Flood information, legal and practical access, parcel configuration, environmental conditions, utilities, and surrounding uses are part of the property review.',
      },
    ],
  },
  {
    slug: 'brooke-county-wv',
    name: 'Brooke County',
    state: 'West Virginia',
    stateAbbr: 'WV',
    headline: 'We Buy Vacant Land in Brooke County, WV',
    subheadline: 'Direct acquisition inquiry for Brooke County. Any proposal is property-specific and is not an appraisal or statement of market value.',
    metaTitle: 'Brooke County Land | Direct Buyer Inquiry',
    metaDescription:
      'General information about OVLP acquisition interests in Brooke County, West Virginia. Property-specific review by a prospective principal buyer; no guarantee of purchase, price, or timing.',
    keywords: [
      'sell land Brooke County West Virginia',
      'cash land buyers Brooke County WV',
      'sell vacant land Wellsburg WV',
      'sell inherited land Brooke County WV',
      'sell land fast Brooke County West Virginia',
    ],
    why: `Brooke County is the northernmost county in West Virginia's panhandle — a narrow strip between Pennsylvania and Ohio, anchored by Wellsburg along the Ohio River. Brooke County Assessor records show steady demand from Pittsburgh-metro buyers seeking WV rural and recreational land at lower price points than comparable Pennsylvania parcels. Ohio Valley Land Partners buys throughout Brooke County — Wellsburg, Follansbee, Beech Bottom — and reviews each opportunity individually.`,
    localGeography:
      'Brooke County hugs the Ohio River from Wellsburg and Beech Bottom south through Follansbee toward the Hancock County line, with the Pennsylvania border to the east. Compact parcels, river corridor lots, and wooded hillside acreage each have limited but active buyer pools.',
    citations: [
      {
        source: 'Brooke County Assessor',
        detail: 'Parcel ownership, assessed values, and tax records for all Brooke County WV land.',
      },
      {
        source: 'WV Code § 11A-3',
        detail: 'West Virginia delinquent property tax lien and sheriff\'s sale process.',
      },
      {
        source: 'WV Code § 44-1',
        detail: 'West Virginia probate administration for inherited land sales.',
      },
      {
        source: 'US Census Bureau',
        detail: 'Brooke County WV population data — the smallest county in the WV panhandle.',
      },
    ],
    relatedBlogSlugs: ['brooke-county-wv-land-worth-2026', 'brooke-harrison-carroll-county-land-buyers', 'cash-land-buyers-ohio-valley'],
    landTypes: [
      'Vacant residential lots',
      'Rural acreage',
      'Inherited estate parcels',
      'Wooded recreational tracts',
      'Agricultural ground',
      'Ohio River frontage land',
    ],
    commonSituations: [
      'Inherited property in Brooke County WV as an out-of-state heir',
      'Old family land with delinquent taxes',
      'Small parcel that\'s hard to sell through traditional channels',
      'Exploring a direct purchase inquiry',
      'Need a clear first step for estate-owned property',
    ],
    faqs: [
      {
        q: 'Do you buy land in Brooke County, WV?',
        a: 'Yes. OVLP reviews property throughout Brooke County, including Wellsburg, Beech Bottom, Follansbee, and rural areas. Each parcel must still fit the current acquisition criteria.',
      },
      {
        q: 'Is Brooke County land hard to sell?',
        a: 'Brooke County buyer interest varies with location, access, topography, utilities, parcel size, title and mineral information, and possible use. Some small or access-limited parcels have a narrower buyer pool, but no single countywide rule determines marketability or timing.',
      },
      {
        q: 'Do you work with out-of-state WV landowners?',
        a: 'Yes. OVLP reviews Brooke County property owned from outside West Virginia. Whether remote signing is available depends on the ownership documents, written agreement, and closing professionals, so we confirm the process after the property review.',
      },
      {
        q: 'What is the WV property tax situation on delinquent parcels?',
        a: 'Delinquent-tax status and deadlines are property-specific. Confirm the current balance, notices, sale status, and any rights with the county and a West Virginia attorney. OVLP may review the parcel but cannot interpret notices or promise a transaction before a deadline.',
      },
      {
        q: 'Do you buy small Brooke County lots that are hard to sell on the MLS?',
        a: 'Yes. OVLP reviews small Brooke County lots, including parcels that did not sell through a prior listing. Access, dimensions, utilities, zoning information, title, surrounding uses, costs, and possible use determine whether a parcel fits our criteria.',
      },
      {
        q: 'Can I sell inherited Brooke County land from Pennsylvania or Ohio?',
        a: 'OVLP may review inherited Brooke County land owned from Pennsylvania, Ohio, or another state. The estate’s authority to sell and remote-signing options depend on the deed, estate documents, written terms, and closing professionals. Confirm requirements with a West Virginia attorney and title professional.',
      },
      {
        q: 'Do you buy land near Wellsburg or along the Ohio River?',
        a: 'Yes. OVLP reviews river-corridor parcels and hillside acreage near Wellsburg and Follansbee. Flood information, access, topography, parcel configuration, utilities, environmental conditions, and surrounding uses are part of the review.',
      },
      {
        q: 'What affects closing timing for Brooke County WV land?',
        a: 'Timing depends on ownership, title review, the written agreement, property conditions, county status, and third-party requirements. Tell OVLP about any known deadline and confirm it with the county and a West Virginia attorney. OVLP does not guarantee a closing date.',
      },
    ],
  },
];

for (const page of countySellPages) {
  page.headline = countyVisualHeadline(page.name, page.stateAbbr);
  page.subheadline = countyVisualSubheadline(page.name);
  page.metaTitle = countySellMetaTitle(page.name, page.stateAbbr, page.slug);
  page.metaDescription = countySellMetaDescription(
    page.name,
    page.state,
    page.stateAbbr,
    page.slug,
  );
}

export function getCountySellPage(slug: string): CountySellData | undefined {
  return countySellPages.find((c) => c.slug === slug);
}
