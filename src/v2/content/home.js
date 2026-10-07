// Copy for the "cross-market platform" section added to the homepage, and for
// the China ↔ Global flow map (used on the homepage and on module pages).

const home = {
  platform: {
    eyebrow: "Cross-market commercialization",
    title: "One platform for taking brands, products, supply chains and companies across markets.",
    intro:
      "PRISM is a cross-market commercialization platform. We create value by moving what works in one market into another, from China to the world and from the world into China, and run the execution end to end.",
    framework: {
      label: "The Transcendence Framework",
      native: "穿越化",
      body: "Crossing cultures, geographies and cycles. Every idea in it maps to a capability we run, not a slogan.",
      tags: ["Cultures", "Geographies", "Cycles"],
    },
    entryTitle: "Four ways into a market",
    entryPaths: [
      {
        title: "Export-led",
        body: "Take an existing product and brand into new retail and online channels.",
        href: "/market-expansion",
      },
      {
        title: "Localization-led",
        body: "Rebuild product, pack, price and story for the buyers in the target market.",
        href: "/china-entry",
      },
      {
        title: "Manufacturing-led",
        body: "Move the capability to make the product into the market that buys it.",
        href: "/local-manufacturing",
      },
      {
        title: "Acquisition-led",
        body: "Buy a business that already has the customers, then integrate and grow it.",
        href: "/acquisition",
      },
    ],
    systemLink: { label: "See how it works as one system", href: "/operating-system" },
  },

  // The interactive map. Each asset can move in both directions.
  flowMap: {
    eyebrow: "China ↔ Global",
    title: "What crosses, and which way",
    intro: "Pick a direction and an asset to see what PRISM does at each crossing.",
    poles: { china: "China", global: "Global markets" },
    directions: {
      outbound: "China → Global",
      inbound: "Global → China",
    },
    assets: [
      {
        key: "brand",
        label: "Brand",
        outbound: {
          summary: "Chinese brands rebuilt for international buyers.",
          items: ["Positioning and story written for the target market", "Packaging and naming", "Retail and online launch"],
          link: { label: "Market Expansion", href: "/market-expansion" },
        },
        inbound: {
          summary: "International brands made relevant to Chinese consumers.",
          items: ["China localization of brand and claims", "Price and pack architecture", "Launch across KA, regional retail and e-commerce"],
          link: { label: "China Market Entry", href: "/china-entry" },
        },
      },
      {
        key: "product",
        label: "Product",
        outbound: {
          summary: "Products adapted, certified and listed abroad.",
          items: ["Product innovation for local demand", "Compliance and certification", "Retail entry and vendor setup"],
          link: { label: "Market Expansion", href: "/market-expansion" },
        },
        inbound: {
          summary: "Imported products onboarded with China's retailers.",
          items: ["Import and supply chain", "Vendor onboarding", "Sam's Club, premium and mainstream key accounts"],
          link: { label: "China Market Entry", href: "/china-entry" },
        },
      },
      {
        key: "supply",
        label: "Supply Chain",
        outbound: {
          summary: "China's manufacturing advantages, commercialized abroad.",
          items: ["OEM, ODM and private label", "Ingredients and retail-exclusive programs", "Overseas supply-chain deployment"],
          link: { label: "Supply Chain Globalization", href: "/supply-chain" },
        },
        inbound: {
          summary: "Global products supplied into China reliably.",
          items: ["Import routes and logistics", "Inventory and replenishment", "Local operations"],
          link: { label: "China Market Entry", href: "/china-entry" },
        },
      },
      {
        key: "business",
        label: "Business",
        outbound: {
          summary: "Production and companies established in the target market.",
          items: ["Local manufacturing: build, retrofit, JV, co-manufacture", "Acquisition-led entry", "Post-merger integration"],
          link: { label: "Local Manufacturing", href: "/local-manufacturing" },
        },
        inbound: {
          summary: "Operating presence for global companies in China.",
          items: ["Local operating structure", "Channel and partner network", "Ongoing operations"],
          link: { label: "Operating System", href: "/operating-system" },
        },
      },
    ],
  },
};

export default home;
