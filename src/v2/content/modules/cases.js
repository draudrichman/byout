const cases = {
  slug: "cases",
  meta: {
    title: "Cases — PRISM",
    description: "PRISM case studies told as paths: the challenge, the entry architecture, the execution and the commercial result.",
  },
  hero: {
    eyebrow: "Cases",
    title: "Proof, told as the path we took.",
    intro:
      "Fewer, stronger cases. Each one shows the route into the market and what it produced, not a logo wall.",
  },
  sections: [
    {
      type: "caseFramework",
      eyebrow: "How we tell a case",
      title: "Four parts, every time",
      steps: [
        { title: "Challenge", body: "Where the business was and what stood in the way." },
        { title: "Entry architecture", body: "The route chosen and why: export, localization, manufacturing or acquisition." },
        { title: "Execution", body: "What was done, by whom, in what order." },
        { title: "Commercial result", body: "Listings, sales, margin or market position, stated plainly." },
      ],
    },
    {
      type: "cases",
      eyebrow: "Selected cases",
      emptyTitle: "Detailed cases are shared in conversation.",
      emptyBody:
        "We publish a case only when every number in it is verified and the client has agreed. Ask us for examples relevant to your market and category.",
      // Only entries with verified: true appear on the site. Fill these in
      // with real, client-approved details, then set verified to true.
      items: [
        {
          verified: false,
          title: "Case title",
          tags: ["Market A → Market B", "Category"],
          challenge: "",
          architecture: "",
          execution: "",
          result: "",
        },
      ],
    },
    { type: "stats", eyebrow: "Across our work" },
    {
      type: "links",
      title: "Related",
      items: [
        { title: "Retail Network", body: "Retail coverage by market.", href: "/retail-network" },
        { title: "Operating System", body: "How the work is organized.", href: "/operating-system" },
      ],
    },
    { type: "cta" },
  ],
};

export default cases;
