// Map coordinates for each country/region as percentages of the image
export const mapPoints = [
  {
    country: "Canada",
    chineseName: "加拿大",
    x: 15,    // Canada is in the upper-left portion of North America
    y: 16,    // Northern part of the map
    flag: "🇨🇦"
  },
  {
    country: "United States", 
    chineseName: "美国",
    x: 15,    // United States is slightly to the right and below Canada
    y: 30,    // Mid-upper portion of the map
    flag: "🇺🇸"
  },
  {
    country: "Cambodia",
    chineseName: "柬埔寨",
    x: 78.5,    // Cambodia is in Southeast Asia
    y: 49.5,    // Upper-mid portion of Asia
    flag: "🇰🇭"
  },
  {
    country: "China",
    chineseName: "中国",
    x: 75,    // China is in East Asia, slightly west of Cambodia
    y: 35,    // Mid portion of Asia
    flag: "🇨🇳"
  },
  {
    country: "Australia",
    chineseName: "澳大利亚",
    x: 87,    // Australia is in Oceania
    y: 76,    // Lower portion, southern hemisphere
    flag: "🇦🇺"
  },
  {
    country: "New Zealand",
    chineseName: "新西兰",
    x: 97,    // New Zealand is southeast of Australia
    y: 90,    // Lower portion, further south
    flag: "🇳🇿"
  }
];

// Country values for StatisticsDisplay data - [retailTotal, offlinePercentage]
export const countryValues = [
  { country: "Canada", values: [2.5, 82] },
  { country: "United States", values: [7.5, 85] },
  { country: "Cambodia", values: [0.8, 90] },
  { country: "China", values: [45.2, 75] },
  { country: "Australia", values: [3.8, 88] },
  { country: "New Zealand", values: [1.2, 85] }
];

// Helper function to get map point by country name
export const getMapPointByCountry = (country) => {
  return mapPoints.find(point => point.country === country);
};

// Country text data for display
export const countryTextData = [
  {
    country: "Canada",
    section1: {
      value: "1万+ 门店",
      chineseLabel: "全品类超市 & 便利店",
      englishLabel: "Supermarket & Convenient stores"
    },
    section2: {
      value: "1200 + 门店",
      chineseLabel: "建材类超市",
      englishLabel: "Home Improvements"
    },
    section3: {
      value: "4% ~ 6%",
      chineseLabel: "同店销售额增长",
      englishLabel: "Same-Store Sales Growth"
    }
  },
  {
    country: "United States",
    section1: {
      value: "3万+ 门店",
      chineseLabel: "线下零售总门店数",
      englishLabel: "Total Retail locations"
    },
    section2: {
      value: "30+",
      chineseLabel: "成功入驻品类",
      englishLabel: "Onboard products"
    },
    section3: {
      value: "7%",
      chineseLabel: "品牌年增长率",
      englishLabel: "Annual Growth Rate"
    }
  },
  {
    country: "Cambodia",
    section1: {
      value: "500+ 门店",
      chineseLabel: "本地合作零售店",
      englishLabel: "Local Partner Stores"
    },
    section2: {
      value: "8个",
      chineseLabel: "覆盖主要城市",
      englishLabel: "Major Cities Covered"
    },
    section3: {
      value: "25%",
      chineseLabel: "市场份额增长",
      englishLabel: "Market Share Growth"
    }
  },
  {
    country: "China",
    section1: {
      value: "10万+ 门店",
      chineseLabel: "全国零售网络",
      englishLabel: "Nationwide Retail Network"
    },
    section2: {
      value: "300+",
      chineseLabel: "城市覆盖范围",
      englishLabel: "Cities Coverage"
    },
    section3: {
      value: "18%",
      chineseLabel: "数字化销售增长",
      englishLabel: "Digital Sales Growth"
    }
  },
  {
    country: "Australia",
    section1: {
      value: "2千+ 门店",
      chineseLabel: "专业药房连锁",
      englishLabel: "Pharmacy Chain Stores"
    },
    section2: {
      value: "500+",
      chineseLabel: "健康产品系列",
      englishLabel: "Health Product Lines"
    },
    section3: {
      value: "12%",
      chineseLabel: "健康市场占有率",
      englishLabel: "Health Market Share"
    }
  },
  {
    country: "New Zealand",
    section1: {
      value: "800+ 门店",
      chineseLabel: "有机食品专营店",
      englishLabel: "Organic Food Specialists"
    },
    section2: {
      value: "50+",
      chineseLabel: "天然产品品牌",
      englishLabel: "Natural Product Brands"
    },
    section3: {
      value: "15%",
      chineseLabel: "可持续产品增长",
      englishLabel: "Sustainable Product Growth"
    }
  }
];

// Helper function to get country values by country name
export const getCountryValues = (country) => {
  return countryValues.find(data => data.country === country);
};

// Helper function to get country text data by country name
export const getCountryTextData = (country) => {
  return countryTextData.find(data => data.country === country);
};

// Country descriptions for the info panel
export const countryDescriptions = [
  {
    country: "Canada",
    chineseName: "加拿大",
    title: "Leading North American Retail Markets",
    chineseTitle: "北美领先零售市场",
    description: "得线下者得北美 - 加拿大线下销售占比总零售85%，线下实体店的主导地位与消费场景紧密深度绑定，北美线下销售占比93.9% BOPIS（线上购买，到店自提）盛行",
    chineseDescription: "得线下者得北美\n\n加拿大线下销售占比总零售85%，线下实体店的主导地位与消费场景紧密深度绑定，北美线下销售占比93.9% BOPIS（线上购买，到店自提）盛行"
  },
  {
    country: "United States",
    chineseName: "美国", 
    title: "Dominant Offline Retail Landscape",
    chineseTitle: "主导线下零售格局",
    description: "得线下者得北美 - 美国线下销售占比总零售85%，线下实体店的主导地位与消费场景紧密深度绑定，北美线下销售占比93.9% BOPIS（线上购买，到店自提）盛行",
    chineseDescription: "得线下者得北美\n\n美国线下销售占比总零售85%，线下实体店的主导地位与消费场景紧密深度绑定，北美线下销售占比93.9% BOPIS（线上购买，到店自提）盛行"
  },
  {
    country: "Cambodia",
    chineseName: "柬埔寨",
    title: "Emerging Southeast Asian Market",
    chineseTitle: "新兴东南亚市场",
    description: "快速发展的东南亚新兴市场，拥有年轻的人口结构和不断增长的消费能力。零售业正在经历数字化转型，传统市场与现代零售渠道并存发展。",
    chineseDescription: "快速发展的东南亚新兴市场\n\n拥有年轻的人口结构和不断增长的消费能力。零售业正在经历数字化转型，传统市场与现代零售渠道并存发展。"
  },
  {
    country: "China",
    chineseName: "中国",
    title: "World's Largest Consumer Market",
    chineseTitle: "全球最大消费市场",
    description: "全球最大的消费市场，拥有超过14亿人口的巨大消费潜力。新零售模式引领全球，线上线下深度融合，移动支付普及率全球领先，消费升级趋势明显。",
    chineseDescription: "全球最大的消费市场\n\n拥有超过14亿人口的巨大消费潜力。新零售模式引领全球，线上线下深度融合，移动支付普及率全球领先，消费升级趋势明显。"
  },
  {
    country: "Australia", 
    chineseName: "澳大利亚",
    title: "Premium Health & Wellness Market",
    chineseTitle: "高端健康养生市场",
    description: "成熟的健康养生市场，消费者注重产品质量和可持续性。有机食品、天然保健品需求旺盛，零售业高度集中，连锁经营模式成熟。",
    chineseDescription: "成熟的健康养生市场\n\n消费者注重产品质量和可持续性。有机食品、天然保健品需求旺盛，零售业高度集中，连锁经营模式成熟。"
  },
  {
    country: "New Zealand",
    chineseName: "新西兰", 
    title: "Sustainable & Organic Focus",
    chineseTitle: "可持续有机理念",
    description: "以可持续发展和有机产品为核心的市场，消费者环保意识强烈。农业优势明显，绿色食品和天然产品享誉全球，小而精的零售模式。",
    chineseDescription: "以可持续发展和有机产品为核心\n\n消费者环保意识强烈。农业优势明显，绿色食品和天然产品享誉全球，小而精的零售模式。"
  }
];

// Helper function to get country description by country name
export const getCountryDescription = (country) => {
  return countryDescriptions.find(data => data.country === country);
};
