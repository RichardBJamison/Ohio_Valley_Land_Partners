import { FAQSchema } from '@/components/seo/json-ld';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  county: string;
  state: string;
}

export function FAQSection({ county, state }: FAQSectionProps) {
  const faqs: FAQItem[] = [
    {
      question: `What is the average price of land in ${county}, ${state}?`,
      answer: `There is no single countywide price that applies to every parcel in ${county}. Location, size, access, utilities, title information, zoning, nearby activity, comparable transactions, possible use, costs, and risk all matter. OVLP's review is an internal acquisition decision, not a formal appraisal or market-value opinion.`,
    },
    {
      question: `Is ${county} a good investment for real estate?`,
      answer: `OVLP does not advise whether property in ${county} is a good investment or predict appreciation. A buyer should review the specific parcel, objectives, costs, risks, and independent professional advice before making an investment decision.`,
    },
    {
      question: `What types of properties are available in ${county}?`,
      answer: `Parcel types in ${county} can include vacant lots, rural acreage, farm ground, wooded land, residential sites, and commercial-adjacent property. Available OVLP inventory changes over time; buyer-network members can share their criteria for possible matching opportunities.`,
    },
    {
      question: `How long does it take to sell land in ${county}?`,
      answer: `Timing depends on property type, title review, the written agreement, and third-party requirements. OVLP completes a property review first, then discusses next steps only if the parcel fits our current acquisition criteria.`,
    },
    {
      question: `What are the zoning regulations in ${county}?`,
      answer: `Zoning rules in ${county} can vary by township, municipality, and parcel. OVLP may review published zoning information for its own acquisition decision, but does not provide a zoning determination or development feasibility study. Confirm permitted use with the appropriate local office and qualified professionals.`,
    },
    {
      question: `Does Ohio Valley Land Partners offer financing?`,
      answer: `Ohio Valley Land Partners buys land for its own account as a principal buyer and does not advertise a public financing program on this site. Buyers should arrange financing and professional advice independently.`,
    },
  ];

  return (
    <>
      <FAQSchema faqs={faqs} />
      <section className="py-20 sm:py-28 bg-muted/30">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <article key={idx} className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">{faq.question}</h3>
                <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
