const retailNetwork = {
  slug: "retail-network",
  meta: {
    title: "Retail Network — PRISM",
    description: "PRISM's retail channel coverage across China, North America, Southeast Asia and Oceania, in both directions.",
  },
  hero: {
    eyebrow: "Retail Network",
    title: "Retail access, in both directions.",
    intro:
      "Listings are where cross-market strategy becomes revenue. These are retailers in the markets where we work, for brands going out of China and brands coming in.",
  },
  sections: [
    { type: "stats" },
    {
      type: "directions",
      eyebrow: "Two directions",
      title: "Retail entry, both ways",
      outbound: {
        label: "China → Global",
        items: ["Buyer meetings and listings with international retailers", "Vendor setup and compliance", "Launch and replenishment"],
      },
      inbound: {
        label: "Global → China",
        items: ["Sam's Club, premium and mainstream key accounts", "Regional retail and e-commerce", "Vendor onboarding and local operations"],
      },
    },
    // Logos and countries come from the existing site's channel map data.
    { type: "retailCoverage", eyebrow: "Coverage by market", title: "Retailers by market" },
    {
      type: "links",
      title: "More",
      items: [
        { title: "Interactive channel map", body: "The full retail channel map.", href: "/retail" },
        { title: "China Market Entry", body: "Entering China's retail.", href: "/china-entry" },
        { title: "Market Expansion", body: "Entering retail abroad.", href: "/market-expansion" },
      ],
    },
    { type: "cta" },
  ],
};

export default retailNetwork;
