// Registry of V2 module pages. The order here is the order used in menus
// and footers. Each page's copy is in its own file under ./modules.
import marketExpansion from "./modules/marketExpansion";
import supplyChain from "./modules/supplyChain";
import localManufacturing from "./modules/localManufacturing";
import chinaEntry from "./modules/chinaEntry";
import acquisition from "./modules/acquisition";
import operatingSystem from "./modules/operatingSystem";
import cases from "./modules/cases";
import retailNetwork from "./modules/retailNetwork";

export { default as site } from "./site";
export { default as home } from "./home";

export const modulePages = [
  operatingSystem,
  marketExpansion,
  chinaEntry,
  supplyChain,
  localManufacturing,
  acquisition,
  cases,
  retailNetwork,
];

export const getModulePage = (slug) => modulePages.find((p) => p.slug === slug);
