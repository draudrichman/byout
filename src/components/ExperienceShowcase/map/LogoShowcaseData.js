export const flagItems = [
    {
      country: "Canada",
      flag: "🇨🇦"
    },
    {
      country: "United States",
      flag: "🇺🇸"
    },
    {
      country: "Cambodia",
      flag: "🇰🇭"
    },
    {
      country: "China",
      flag: "🇨🇳"
    },
    {
      country: "Australia",
      flag: "🇦🇺"
    },
    {
      country: "New Zealand",
      flag: "🇳🇿"
    }
  ];

export const logosByCountry = {
  "Canada": [
    {
      src: "/Logos/Canada/Brunet.png",
      title: "Brunet",
    },
    {
      src: "/Logos/Canada/CanadianTire.png",
      title: "Canadian Tire",
    },
    {
      src: "/Logos/Canada/Costco.png",
      title: "Costco",
    },
    {
      src: "/Logos/Canada/CoucheTard.png",
      title: "Couche-Tard",
    },
    {
      src: "/Logos/Canada/Filgo.webp",
      title: "Filgo",
    },
    {
      src: "/Logos/Canada/GiantTiger.jpeg",
      title: "Giant Tiger",
    },
    {
      src: "/Logos/Canada/Harnois.png",
      title: "Harnois",
    },
    {
      src: "/Logos/Canada/IGA.png",
      title: "IGA",
    },
    {
      src: "/Logos/Canada/JianCoutu.png",
      title: "Jean Coutu",
    },
    {
      src: "/Logos/Canada/Maxi.png",
      title: "Maxi",
    },
    {
      src: "/Logos/Canada/Metro.png",
      title: "Metro",
    },
    {
      src: "/Logos/Canada/Pharmaprix.png",
      title: "Pharmaprix",
    },
    {
      src: "/Logos/Canada/Provigo.png",
      title: "Provigo",
    },
    {
      src: "/Logos/Canada/SevenEleven.png",
      title: "7-11",
    },
    {
      src: "/Logos/Canada/SuperC.png",
      title: "Super C",
    },
    {
      src: "/Logos/Canada/Walmart.png",
      title: "Walmart",
    },
  ],
  "United States": [
    {
      src: "/Logos/US/TheHomeDepot.jpeg",
      title: "The Home Depot",
    },
    {
      src: "/Logos/US/Lowes.avif",
      title: "Lowe's",
    },
    {
      src: "/Logos/US/Target.png",
      title: "Target",
    },
    {
      src: "/Logos/US/Costco.png",
      title: "Costco",
    },
    {
      src: "/Logos/US/Walmart.png",
      title: "Walmart",
    },
    {
      src: "/Logos/US/TraderJoes.jpg",
      title: "Trader Joe's",
    },
    {
      src: "/Logos/US/AceHardware.png",
      title: "Ace Hardware",
    },
    {
      src: "/Logos/US/WholeFoods.png",
      title: "Whole Foods",
    },
    {
      src: "/Logos/US/BestBuy.png",
      title: "Best Buy",
    },
    {
      src: "/Logos/US/HMart.webp",
      title: "H-Mart",
    },
    {
      src: "/Logos/US/Mitsuwa.png",
      title: "Mitsuwa",
    },
    {
      src: "/Logos/US/Kroger.png",
      title: "Kroger",
    },
    {
      src: "/Logos/US/RiteAid.png",
      title: "Rite Aid",
    },
    {
      src: "/Logos/US/99RanchMarket.png",
      title: "99 Ranch Market",
    },
    {
      src: "/Logos/US/Walgreens.jpg",
      title: "Walgreens",
    }
  ],
  "Cambodia": [
    {
      src: "/Logos/Cambodia/LuckySupermarket.jpg",
      title: "Lucky Supermarket",
    },
  ],
  "China": [
    {
      src: "/Logos/China/SamsClub.png",
      title: "Sam's Club",
    },
  ],
  "Australia": [
    {
      src: "/Logos/Australia/Aldi.png",
      title: "Aldi",
    },
    {
      src: "/Logos/Australia/Coles.png",
      title: "Coles",
    },
    {
      src: "/Logos/Australia/Countdown.png",
      title: "Countdown",
    },
  ],
  "New Zealand": [
    {
      src: "/Logos/New Zealand/Countdown.png",
      title: "Countdown",
    },
    {
      src: "/Logos/New Zealand/NewWorld.png",
      title: "New World",
    },
    {
      src: "/Logos/New Zealand/PaknSave.png",
      title: "Pak'n Save",
    },
  ],
};

// Helper function to split logos into three groups for separate loops
export const splitLogosIntoThreeGroups = (logos) => {
  const group1 = [];
  const group2 = [];
  const group3 = [];
  
  logos.forEach((logo, index) => {
    const groupIndex = index % 3;
    if (groupIndex === 0) {
      group1.push(logo);
    } else if (groupIndex === 1) {
      group2.push(logo);
    } else {
      group3.push(logo);
    }
  });
  
  return { group1, group2, group3 };
};

// Helper function to split logos into two groups for separate loops
export const splitLogosIntoTwoGroups = (logos) => {
  const group1 = [];
  const group2 = [];
  
  logos.forEach((logo, index) => {
    if (index % 2 === 0) {
      group1.push(logo);
    } else {
      group2.push(logo);
    }
  });
  
  return { group1, group2 };
};

// Get logos split into appropriate groups for a specific country
export const getLogoGroupsForCountry = (country) => {
  const logos = logosByCountry[country] || logosByCountry["Canada"];
  
  // Use 1 group for United States and Canada, 1 group for smaller countries
  if (country === "United States" || country === "Canada") {
    return { group1: logos, group2: [], group3: [], useTwoGroups: false, useOneGroup: true };
  } else if (country === "Japan" || logos.length <= 3) {
    return { group1: logos, group2: [], group3: [], useTwoGroups: false, useOneGroup: true };
  } else {
    const { group1, group2, group3 } = splitLogosIntoThreeGroups(logos);
    return { group1, group2, group3, useTwoGroups: false };
  }
};

// Keep backward compatibility with existing logoItems export
export const logoItems = logosByCountry["Canada"];
