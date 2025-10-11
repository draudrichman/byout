import type { RefObject } from "react";

interface Props {
    companyDetailsRef: RefObject<HTMLDivElement | null>;
    statsRef: RefObject<HTMLDivElement | null>;
}

export const USA = ({ companyDetailsRef, statsRef }: { companyDetailsRef: RefObject<HTMLDivElement | null>; statsRef: RefObject<HTMLDivElement | null>; }) => {
  return (
    <>
      <div
        ref={companyDetailsRef}
        className="px-12 py-10 bg-white relative"
      >
        <div className="mb-12 p-8 bg-gradient-to-br from-blue-50 to-slate-50 rounded-2xl border border-blue-100">
          <h2 className="text-xl leading-relaxed text-slate-700 tracking-wide">
            美国作为全球最成熟的线下零售市场，以其庞大的体量与强劲的消费力持续引领全球零售格局。尽管电商渗透率已攀升至22.7%的历史高位，实体零售仍展现出强大的生命力——预计到2028年，线下渠道将贡献美国零售总额的72%。这一数据印证了实体店凭借其商品即得性、沉浸式体验和专业服务优势，在未来数年内仍将是零售生态的核心支柱。
            当前美国零售市场呈现出高度多元化的渠道格局，从大众平价零售到高端专业卖场，各渠道凭借精准定位与差异化策略占据独特生态位。对于计划进入美国市场的品牌而言，深入理解各渠道特性、销售数据及消费者趋势，是制定有效市场进入策略的基石。
          </h2>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-stone-900 mb-8">
            Key Areas
          </h2>

          <div className="grid grid-cols-5 gap-6">
            <div className="group bg-white border border-stone-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-300 hover:-translate-y-1 transition-all duration-300">
              <div className="flex flex-col space-y-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-stone-900 font-semibold mb-2 text-lg">
                    市场格局多元且成熟
                  </h3>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    美国零售市场由全国性巨头与专业连锁共同主导，形成了从大众平价到高端精选、从全品类到垂直领域的完整生态体系。
                  </p>
                </div>
              </div>
            </div>

            <div className="group bg-white border border-stone-200 rounded-xl p-6 hover:shadow-lg hover:border-green-300 hover:-translate-y-1 transition-all duration-300">
              <div className="flex flex-col space-y-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-stone-900 font-semibold mb-2 text-lg">
                    规模效应与供应链为王
                  </h3>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    领先企业如沃尔玛、克罗格凭借其庞大的门店网络与高效物流体系，在采购和分销上拥有极强的成本优势与定价权。
                  </p>
                </div>
              </div>
            </div>

            <div className="group bg-white border border-stone-200 rounded-xl p-6 hover:shadow-lg hover:border-amber-300 hover:-translate-y-1 transition-all duration-300">
              <div className="flex flex-col space-y-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-amber-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-stone-900 font-semibold mb-2 text-lg">
                    全渠道融合成为标配
                  </h3>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    线上线下无缝衔接的购物体验已成为竞争基础，巨头们通过自建电商平台、强化即时配送来满足消费者需求。
                  </p>
                </div>
              </div>
            </div>

            <div className="group bg-white border border-stone-200 rounded-xl p-6 hover:shadow-lg hover:border-emerald-300 hover:-translate-y-1 transition-all duration-300">
              <div className="flex flex-col space-y-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-emerald-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-stone-900 font-semibold mb-2 text-lg">
                    自有品牌战略深化
                  </h3>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    为提升毛利和构建差异化，各零售商均大力发展自有品牌，如塔吉特的“Target Favorite”系列，以建立独特的商品护城河。
                  </p>
                </div>
              </div>
            </div>

            <div className="group bg-white border border-stone-200 rounded-xl p-6 hover:shadow-lg hover:border-violet-300 hover:-translate-y-1 transition-all duration-300">
              <div className="flex flex-col space-y-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-violet-100 flex items-center justify-center group-hover:bg-violet-200 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-violet-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-stone-900 font-semibold mb-2 text-lg">
                    专业化与体验式转型
                  </h3>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    面对电商冲击，实体店更注重专业化服务与场景化体验，如百思买的店内顾问、全食超市的体验式餐饮，以重塑线下价值。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={statsRef}
        className="px-12 pb-10 bg-gradient-to-br from-slate-50 to-white"
      >
        <h1 className="text-3xl font-bold text-stone-900 mb-8 text-center">
          市场表现对比
        </h1>

        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-slate-100 to-stone-100 border-b border-stone-200">
                  <th className="text-left py-4 px-6 text-stone-900 font-semibold">品牌</th>
                  <th className="text-left py-4 px-6 text-stone-900 font-semibold">核心业态</th>
                  <th className="text-left py-4 px-6 text-stone-900 font-semibold">门店数量</th>
                  <th className="text-left py-4 px-6 text-stone-900 font-semibold">代表性财务数据（美金）</th>
                  <th className="text-left py-4 px-6 text-stone-900 font-semibold">市场定位与核心战略</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-stone-100 hover:bg-blue-50/30 transition-colors">
                  <td className="py-4 px-6 text-stone-800 font-medium">沃尔玛 (Walmart)</td>
                  <td className="py-4 px-6 text-stone-600">全品类大卖场</td>
                  <td className="py-4 px-6 text-stone-600">5,000家</td>
                  <td className="py-4 px-6 text-stone-600">2025财年全年收入6810亿美元</td>
                  <td className="py-4 px-6 text-stone-600">全球零售巨头，其美国本土门店的平均年销售额达到8900万美元。</td>
                </tr>
                <tr className="border-b border-stone-100 hover:bg-blue-50/30 transition-colors">
                  <td className="py-4 px-6 text-stone-800 font-medium">塔吉特 (Target)</td>
                  <td className="py-4 px-6 text-stone-600">折扣零售/全品类</td>
                  <td className="py-4 px-6 text-stone-600">1,981家</td>
                  <td className="py-4 px-6 text-stone-600">2025财年Q2净销售额252.1亿</td>
                  <td className="py-4 px-6 text-stone-600">定位“期待更多，支付更少”的中产阶级家庭，以时尚家居、自有品牌和店仓合一的全渠道模式著称。</td>
                </tr>
                <tr className="border-b border-stone-100 hover:bg-blue-50/30 transition-colors">
                  <td className="py-4 px-6 text-stone-800 font-medium">克罗格 (The Kroger Co.)</td>
                  <td className="py-4 px-6 text-stone-600">传统超市/杂货</td>
                  <td className="py-4 px-6 text-stone-600">2,800家</td>
                  <td className="py-4 px-6 text-stone-600">2024年零售额1,507.9亿</td>
                  <td className="py-4 px-6 text-stone-600">美国最大的传统超市运营商之一，通过强大的自有品牌和全渠道布局，深耕生鲜食品领域。</td>
                </tr>
                <tr className="border-b border-stone-100 hover:bg-blue-50/30 transition-colors">
                  <td className="py-4 px-6 text-stone-800 font-medium">家得宝 (The Home Depot)</td>
                  <td className="py-4 px-6 text-stone-600">家居建材零售</td>
                  <td className="py-4 px-6 text-stone-600">2,353家</td>
                  <td className="py-4 px-6 text-stone-600">2025财年Q2净销售额453亿</td>
                  <td className="py-4 px-6 text-stone-600">美国国民级建材零售品牌，渗透率最高，品种齐全，会员规模庞大。</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="px-12 py-12 bg-white">
        <div className="max-w-5xl mx-auto space-y-16">
          <section className="space-y-5">
            <h2 className="text-3xl font-bold text-stone-900">
              沃尔玛 · 全球零售巨头的全渠道霸主
            </h2>
            <p className="text-stone-700 leading-loose text-lg">
              作为全球最大零售商，沃尔玛以“每日低价”策略覆盖全美超
              <span className="font-semibold text-blue-700">4,700家门店</span>，
              2025财年总营收达
              <span className="font-semibold text-blue-700">6,810亿美元</span>。
              其电商销售额同比增长
              <span className="font-semibold text-blue-700">20.8%</span>，
              通过“Walmart+”会员服务强化全渠道战略，聚焦中低收入家庭，依托强大的供应链效率维持竞争优势。
            </p>
            <p className="text-stone-700 leading-loose text-lg">
              沃尔玛的成功得益于其无与伦比的规模效应与物流体系，结合数字化转型，确保了在大众综合零售领域的领导地位。
            </p>
          </section>

          <section className="space-y-5">
            <h2 className="text-3xl font-bold text-stone-900">
              塔吉特 · 中产家庭的时尚零售选择
            </h2>
            <p className="text-stone-700 leading-loose text-lg">
              塔吉特精准定位中产阶级家庭，拥有
              <span className="font-semibold text-blue-700">1,981家门店</span>，
              2025财年Q2净销售额达
              <span className="font-semibold text-blue-700">252.1亿美元</span>。
              通过设计师联名商品与“Good & Gather”等自有品牌提升溢价能力，其“Drive Up”线下取货服务推动数字销售额占比超
              <span className="font-semibold text-blue-700">15%</span>，
              展现了体验式零售的强大潜力。
            </p>
          </section>

          <section className="space-y-5">
            <h2 className="text-3xl font-bold text-stone-900">
              好市多 · 会员制仓储的全球标杆
            </h2>
            <p className="text-stone-700 leading-loose text-lg">
              好市多（Costco）凭借独特的会员制与极致性价比模式，2025财年第三季度净销售额达
              <span className="font-semibold text-green-700">619.6亿美元</span>，
              可比销售额增长
              <span className="font-semibold text-green-700">8.0%</span>，电商销售增长
              <span className="font-semibold text-green-700">14.8%</span>。
              其高粘性会员模式确保了稳定的收入来源，持续巩固市场地位。
            </p>
            <div className="grid md:grid-cols-3 gap-6 pt-2">
              <div className="p-6 bg-gradient-to-br from-green-50 to-white rounded-xl border border-green-200 hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-stone-900 mb-2 text-lg">
                  会员制基石
                </h4>
                <p className="text-sm text-stone-600 leading-relaxed">
                  高续费率与会员费再投入机制，支撑长期价值循环。
                </p>
              </div>
              <div className="p-6 bg-gradient-to-br from-green-50 to-white rounded-xl border border-green-200 hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-stone-900 mb-2 text-lg">
                  商品价值感
                </h4>
                <p className="text-sm text-stone-600 leading-relaxed">
                  精简SKU与自有品牌Kirkland，结合寻宝式体验，打造价格与品质护城河。
                </p>
              </div>
              <div className="p-6 bg-gradient-to-br from-green-50 to-white rounded-xl border border-green-200 hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-stone-900 mb-2 text-lg">
                  全渠道增长
                </h4>
                <p className="text-sm text-stone-600 leading-relaxed">
                  电商与即时配送布局，满足消费者多样化需求。
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-5">
            <h2 className="text-3xl font-bold text-stone-900">
              克罗格与全食 · 生鲜零售的双雄
            </h2>
            <p className="text-stone-700 leading-loose text-lg">
              克罗格凭借
              <span className="font-semibold text-amber-700">2,800家门店</span>，
              2024年零售额达
              <span className="font-semibold text-amber-700">1,507.9亿美元</span>，
              通过“Simple Truth”等自有品牌和数据驱动营销，稳坐传统超市龙头地位，生鲜品类贡献约
              <span className="font-semibold text-amber-700">55%收入</span>。
              全食超市（Whole Foods）则坚守高端有机定位，面临区域性特色零售商如Mitsuwa Marketplace的挑战。
            </p>
            <div className="grid md:grid-cols-3 gap-6 pt-2">
              <div className="p-6 bg-gradient-to-br from-amber-50 to-white rounded-xl border border-amber-200 hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-stone-900 mb-2 text-lg">
                  生鲜品类优势
                </h4>
                <p className="text-sm text-stone-600 leading-relaxed">
                  克罗格通过生鲜品类与自有品牌，深耕食品零售市场。
                </p>
              </div>
              <div className="p-6 bg-gradient-to-br from-amber-50 to-white rounded-xl border border-amber-200 hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-stone-900 mb-2 text-lg">
                  数据驱动营销
                </h4>
                <p className="text-sm text-stone-600 leading-relaxed">
                  精准营销与客户洞察，提升消费者忠诚度与复购率。
                </p>
              </div>
              <div className="p-6 bg-gradient-to-br from-amber-50 to-white rounded-xl border border-amber-200 hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-stone-900 mb-2 text-lg">
                  高端有机定位
                </h4>
                <p className="text-sm text-stone-600 leading-relaxed">
                  全食超市专注有机食品，迎合健康消费趋势。
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-8">
            <h3 className="text-2xl font-semibold text-stone-900">
              核心市场趋势
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl border border-stone-200 bg-gradient-to-br from-white to-blue-50 hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-stone-900 mb-2 text-lg">
                  全渠道融合
                </h4>
                <p className="text-sm text-stone-600 leading-relaxed">
                  零售商大数据分析市场预计2032年达986.6亿美元，品牌需优化BOPIS与线上展示。
                </p>
              </div>
              <div className="p-6 rounded-xl border border-stone-200 bg-gradient-to-br from-white to-green-50 hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-stone-900 mb-2 text-lg">
                  健康与可持续性
                </h4>
                <p className="text-sm text-stone-600 leading-relaxed">
                  绿色食品包装市场至2032年预计达7.99亿美元，可降解包装与环保供应链成关键。
                </p>
              </div>
              <div className="p-6 rounded-xl border border-stone-200 bg-gradient-to-br from-white to-amber-50 hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-stone-900 mb-2 text-lg">
                  自有品牌崛起
                </h4>
                <p className="text-sm text-stone-600 leading-relaxed">
                  零售商扩大自有品牌占比，品牌方需强化技术壁垒或OEM合作。
                </p>
              </div>
              <div className="p-6 rounded-xl border border-stone-200 bg-gradient-to-br from-white to-emerald-50 hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-stone-900 mb-2 text-lg">
                  区域市场潜力
                </h4>
                <p className="text-sm text-stone-600 leading-relaxed">
                  如ACE Hardware通过社区服务，品牌需加强店员培训与场景化营销。
                </p>
              </div>
              <div className="p-6 rounded-xl border border-stone-200 bg-gradient-to-br from-white to-violet-50 hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-stone-900 mb-2 text-lg">
                  体验式零售
                </h4>
                <p className="text-sm text-stone-600 leading-relaxed">
                  百思买通过“Geek Squad”顾问服务，构建智能家居与健康科技新增长点。
                </p>
              </div>
              <div className="p-6 rounded-xl border border-stone-200 bg-gradient-to-br from-white to-rose-50 hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-stone-900 mb-2 text-lg">
                  细分市场突破
                </h4>
                <p className="text-sm text-stone-600 leading-relaxed">
                  区域性零售如Mitsuwa Marketplace，专注文化消费细分领域。
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h3 className="text-2xl font-semibold text-stone-900">
              品牌战略启示
            </h3>
            <p className="text-stone-700 leading-loose text-lg">
              美国零售生态正经历深刻变革，线下渠道保持主体地位的同时，积极拥抱数字化与体验升级。品牌方需精准把握各渠道特性，结合消费趋势动态调整产品策略与资源配置。
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 to-white hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-blue-900 mb-2 text-lg">沃尔玛</h4>
                <p className="text-sm text-stone-700 leading-relaxed">
                  规模与供应链优势，适合高性价比产品与大规模分销合作。
                </p>
              </div>
              <div className="p-6 rounded-xl border border-green-200 bg-gradient-to-br from-green-50 to-white hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-green-900 mb-2 text-lg">塔吉特</h4>
                <p className="text-sm text-stone-700 leading-relaxed">
                  中产客群与时尚定位，适合联名设计与自有品牌合作。
                </p>
              </div>
              <div className="p-6 rounded-xl border border-amber-200 bg-gradient-to-br from-amber-50 to-white hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-amber-900 mb-2 text-lg">克罗格</h4>
                <p className="text-sm text-stone-700 leading-relaxed">
                  生鲜与自有品牌驱动，适合高品质食品与数据驱动营销合作。
                </p>
              </div>
            </div>
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
              <p className="text-stone-600 leading-relaxed">
                以上分析为品牌与渠道适配提供框架，建议结合品类结构、毛利模型与市场渗透效率进一步优化合作策略。
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}