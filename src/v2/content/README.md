# V2 content

All English copy for the V2 pages lives in this folder. Change the words here;
the layout picks them up. No component code needs to change for copy edits.

| File | What it controls |
| --- | --- |
| `site.js` | Navigation labels, footer, contact prompt, verified headline stats |
| `home.js` | The "cross-market platform" section on the homepage and the China ↔ Global flow map |
| `modules/*.js` | One file per page: `/market-expansion`, `/supply-chain`, `/local-manufacturing`, `/china-entry`, `/acquisition`, `/operating-system`, `/cases`, `/retail-network` |
| `index.js` | Which module pages exist and their order in the menu |

## Editing copy

Each page file exports a plain object. Edit any string in quotes. Keep the
keys (`title:`, `body:`) as they are.

```js
hero: {
  eyebrow: "Market expansion",
  title: "Take a proven business into its next market.",   // ← edit this
  intro: "…",
},
```

## Adding, removing or reordering sections

A page's `sections` array is rendered top to bottom. Move an entry to reorder
it, delete an entry to remove it, or copy one to add another. Each entry has a
`type` that picks the layout:

| `type` | Layout |
| --- | --- |
| `statement` | One large statement with a supporting paragraph |
| `pillars` | A grid of titled points (2–8 items) |
| `chain` | A numbered step-by-step process |
| `structures` | Option chips/cards (e.g. Build / Acquire / JV) |
| `directions` | China → Global and Global → China side by side |
| `flowMap` | The interactive China ↔ Global map (copy comes from `home.js`) |
| `systemMap` | The layered operating-system diagram |
| `caseFramework` | The four-part case template |
| `cases` | Case studies (only entries with `verified: true` are shown) |
| `retailCoverage` | Retailer logos by country (data from the existing site) |
| `stats` | The verified headline numbers from `site.js` |
| `links` | Cards linking to related pages |
| `cta` | The contact prompt from `site.js` |

## Adding a page

1. Copy a file in `modules/`, give it a new `slug` (this becomes the URL).
2. Import it in `index.js` and add it to `modulePages`.

## Verified claims

The client brief says to publish only verified logos, relationships, metrics,
technology claims and results. Case studies stay hidden until `verified: true`.
Numbers in `site.js` come from the current live site; check them before launch.
