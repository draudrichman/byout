// Site-wide copy for the V2 pages: navigation, footer, contact prompt, stats.
// See README.md in this folder for how to edit.

const site = {
  name: "PRISM",
  tagline: "Cross-market commercialization platform",

  // Header menu. `href` values starting with "/" are pages on this site.
  nav: [
    {
      label: "Platform",
      items: [
        { label: "Operating System", href: "/operating-system", note: "How the capabilities fit together" },
        { label: "Market Expansion", href: "/market-expansion", note: "China ↔ Global, Market A ↔ Market B" },
      ],
    },
    {
      label: "Entry paths",
      items: [
        { label: "China Market Entry", href: "/china-entry", note: "Global brands into China" },
        { label: "Supply Chain Globalization", href: "/supply-chain", note: "Cross-border supply and technology" },
        { label: "Local Manufacturing", href: "/local-manufacturing", note: "Deploy production in the target market" },
        { label: "Acquisition-led Entry", href: "/acquisition", note: "Acquire, integrate, operate, grow" },
      ],
    },
    {
      label: "Proof",
      items: [
        { label: "Cases", href: "/cases", note: "Paths we have taken" },
        { label: "Retail Network", href: "/retail-network", note: "Retail coverage by market" },
      ],
    },
    {
      label: "More",
      items: [
        { label: "Technology", href: "/tech", note: "HPH and PEF product technologies" },
        { label: "Brand Development", href: "/branddev", note: "Brand building work" },
        { label: "Retail Channel Map", href: "/retail", note: "Interactive channel map" },
      ],
    },
  ],

  contactLabel: "Start a conversation",

  // Contact prompt shown at the end of pages (section type "cta").
  cta: {
    eyebrow: "Work with PRISM",
    title: "Tell us where you want to go next.",
    body:
      "Share the market, the product or the company you are thinking about. We will come back with how we would approach it and which entry path fits.",
    button: "Start a conversation",
    href: "/contact",
  },

  // Headline numbers, taken from the current live site (hero "Achievements").
  // Check each one with the client before launch.
  stats: [
    { value: "100+", label: "Brands served" },
    { value: "7", label: "Countries with retail channel coverage" },
    // Live site shows 累计销售额 11亿. Currency is not stated there; confirm.
    { value: "1.1B", label: "Cumulative sales" },
    { value: "91+", label: "Products listed" },
  ],

  footer: {
    statement: "PRISM moves brands, products, supply chains and companies across markets, in both directions.",
    copyright: "© PRISM. All rights reserved.",
  },

  contactPage: {
    meta: {
      title: "Contact — PRISM",
      description: "Start a conversation with PRISM about entering a new market.",
    },
    eyebrow: "Contact",
    title: "Start a conversation",
    intro:
      "Tell us about your company and what you want to achieve. A short note is enough; we will follow up with questions.",
  },
};

export default site;
