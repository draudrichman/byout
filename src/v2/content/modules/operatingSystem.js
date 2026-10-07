const operatingSystem = {
  slug: "operating-system",
  meta: {
    title: "Operating System — PRISM",
    description:
      "PRISM's capabilities organized as one commercialization system: strategy, brand and product, compliance, supply chain, channels, capital and operations, on an infrastructure of people, systems and AI.",
  },
  hero: {
    eyebrow: "Operating System",
    title: "One commercialization system, not a list of services.",
    intro:
      "Every market entry needs the same layers working together. We run them as one system with one team accountable for the result, so nothing falls between suppliers and advisers.",
  },
  sections: [
    {
      type: "statement",
      eyebrow: "The Transcendence Framework · 穿越化",
      title: "Crossing cultures, geographies and cycles.",
      body:
        "Our method for cross-market value creation. Cultures: products and brands rebuilt for how local customers think. Geographies: supply, production and channels set up where the market is. Cycles: entry timed to where the market and the business are, and run long enough to compound.",
    },
    {
      type: "systemMap",
      eyebrow: "The system",
      title: "Seven layers on one infrastructure",
      intro: "Select a layer to see what it covers and where to go next.",
      top: "Markets · China ↔ Global · Market A ↔ Market B",
      layers: [
        {
          title: "Strategy & market insight",
          body: "Demand, competition, price corridors and channel economics, and the choice of entry architecture.",
          links: [{ label: "Market Expansion", href: "/market-expansion" }],
        },
        {
          title: "Brand & product",
          body: "Positioning, story, range, formulation and packaging built for the target market.",
          links: [{ label: "Market Expansion", href: "/market-expansion" }, { label: "Brand Development", href: "/branddev" }],
        },
        {
          title: "Compliance & localization",
          body: "Registration, labeling, certification, claims and the localization that makes a product legal and relevant.",
          links: [{ label: "China Market Entry", href: "/china-entry" }],
        },
        {
          title: "Supply chain & manufacturing",
          body: "Cross-border supply programs and local manufacturing deployment.",
          links: [{ label: "Supply Chain", href: "/supply-chain" }, { label: "Local Manufacturing", href: "/local-manufacturing" }],
        },
        {
          title: "Channels & retail",
          body: "Key accounts, regional retail, e-commerce and vendor onboarding in each market.",
          links: [{ label: "Retail Network", href: "/retail-network" }],
        },
        {
          title: "Capital & acquisition",
          body: "Target sourcing, due diligence, deal architecture and closing when buying is the better route in.",
          links: [{ label: "Acquisition-led Entry", href: "/acquisition" }],
        },
        {
          title: "Integration & operations",
          body: "Post-merger integration, local teams, replenishment and the day-to-day running of the business.",
          links: [{ label: "Acquisition-led Entry", href: "/acquisition" }],
        },
      ],
      base: {
        title: "Infrastructure: Human expertise × Systems × AI",
        body: "People accountable for decisions, shared systems and data across every layer, and AI tooling that makes both faster.",
        links: [{ label: "Technology", href: "/tech" }],
      },
    },
    {
      type: "pillars",
      eyebrow: "Why one system",
      title: "What changes when the layers work together",
      columns: 3,
      items: [
        { title: "One owner", body: "A single team answers for the commercial result, not for a piece of it." },
        { title: "Shared picture", body: "Market, product, supply and channel decisions are made with the same information." },
        { title: "Fewer handoffs", body: "Work moves from step to step without being re-briefed to a new supplier each time." },
      ],
    },
    { type: "flowMap" },
    { type: "cta" },
  ],
};

export default operatingSystem;
