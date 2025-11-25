import sevenEleven from "~/assets/logos/canada/7-eleven.png";
import bmr from "~/assets/logos/canada/bmr.jpeg";
import brunet from "~/assets/logos/canada/brunet.png";
import canac from "~/assets/logos/canada/canac.png";
import canadianTire from "~/assets/logos/canada/canadian-tire.png";
import costco from "~/assets/logos/canada/costco.png";
import coucheTard from "~/assets/logos/canada/couche-tard.png";
import filgo from "~/assets/logos/canada/filgo.png";
import giantTiger from "~/assets/logos/canada/giant-tiger.png";
import harnoisEnergies from "~/assets/logos/canada/harnois-energies.png";
import iga from "~/assets/logos/canada/iga.png";
import jeanCoutu from "~/assets/logos/canada/jean-coutu.png";
import materiaxAudet from "~/assets/logos/canada/materiax-audet.jpeg";
import maxi from "~/assets/logos/canada/maxi.png";
import mpMaterials from "~/assets/logos/canada/mp-materials.png";
import patrickMorin from "~/assets/logos/canada/patrick-morin.png";
import phramaprix from "~/assets/logos/canada/phramaprix.png";
import renoDepot from "~/assets/logos/canada/reno-depot.png";
import rona from "~/assets/logos/canada/rona.jpeg";
import superC from "~/assets/logos/canada/super-c.jpeg";
import walmart from "~/assets/logos/canada/walmart.png";
import bestBuy from "~/assets/logos/us/best-buy.png";
import cvs from "~/assets/logos/us/cvs.jpeg";
import hMart from "~/assets/logos/us/h-mart.png";
import kroger from "~/assets/logos/us/kroger.png";
import mitsuwa from "~/assets/logos/us/mitsuwa.png";
import ranchMarket from "~/assets/logos/us/ranch-market.png";
import riteAid from "~/assets/logos/us/rite-aid.png";
import walgreens from "~/assets/logos/us/walgreens.jpeg";
import sams from "~/assets/logos/china/sams.png";
import aldi from "~/assets/logos/china/aldi.png";
import chcostco from "~/assets/logos/china/costcobg.png";

import type { CountryCompanies } from "~/models/company";

const LOGOS: CountryCompanies[] = [
  {
    canada: [
      { name: "7-eleven", src: sevenEleven },
      { name: "bmr", src: bmr },
      { name: "brunet", src: brunet },
      { name: "canac", src: canac },
      { name: "canadian-tire", src: canadianTire },
      { name: "costco", src: costco },
      { name: "couche-tard", src: coucheTard },
      { name: "filgo", src: filgo },
      { name: "giant-tiger", src: giantTiger },
      { name: "harnois-energies", src: harnoisEnergies },
      { name: "iga", src: iga },
      { name: "jean-coutu", src: jeanCoutu },
      { name: "materiax-audet", src: materiaxAudet },
      { name: "maxi", src: maxi },
      { name: "mp-materials", src: mpMaterials },
      { name: "patrick-morin", src: patrickMorin },
      { name: "pharmaprix", src: phramaprix },
      { name: "reno-depot", src: renoDepot },
      { name: "rona", src: rona },
      { name: "super-c", src: superC },
      { name: "walmart", src: walmart },
    ],
  },
  {
    usa: [
      { name: "best-buy", src: bestBuy },
      { name: "cvs", src: cvs },
      { name: "h-mart", src: hMart },
      { name: "kroger", src: kroger },
      { name: "mitsuwa", src: mitsuwa },
      { name: "ranch-market", src: ranchMarket },
      { name: "rite-aid", src: riteAid },
      { name: "walgreens", src: walgreens },
    ],
  },
  {
    china: [
      {
        name: `Sam's Club`,
        src: sams,
      },
      {
        name: `Costco`,
        src: chcostco,
      },
      {
        name: `Aldi`,
        src: aldi,
      },
    ],
  },
  {
    australia: [],
  },
  {
    zealand: [],
  },
  {
    cambodia: [],
  },
  {
    japan: [],
  },
];

export default LOGOS;
