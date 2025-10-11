import type { RefObject } from "react";
import StoreTable from "../store-table";
import RadialStats from "../radial";

interface Props {
    companyDetailsRef: RefObject<HTMLDivElement | null>;
    statsRef: RefObject<HTMLDivElement | null>;
}

export const Canada = ({ companyDetailsRef, statsRef }: { companyDetailsRef: RefObject<HTMLDivElement | null>; statsRef: RefObject<HTMLDivElement | null>; }) => {
  return (
    <>
      <div
        ref={companyDetailsRef}
        className="px-12 py-10 bg-white relative"
      >
        <div className="mb-12 p-8 bg-gradient-to-br from-blue-50 to-slate-50 rounded-2xl border border-blue-100">
          <h2 className="text-xl leading-relaxed text-slate-700 tracking-wide">
            加拿大零售市场格局多元且成熟，形成实体为王与全渠道融合的韧性生态。在“实体店为王”的北美商业土壤中，线下销售占比90%以上的超庞大市场份额。既有国际零售巨头占据重要地位，也有众多本土连锁品牌深耕细分领域。超过70%的商超开通“线上下单+到店自提”（BOPIS），这不仅是便利，更是驱动交叉销售的成熟多元生态体系。尽管年轻群体是线上渗透的主力，但85%的中老年消费者（55岁以上）购物仍发生在实体店。类似数据凸显了实体店在覆盖全龄段客户、维系社区纽带方面的社会价值与经济价值。主流零售品牌的门店网络，是其应对人口结构变化、保持基本盘的稳定器。
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
                    市场格局稳固
                  </h3>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    全国市场由少数几家巨头主导，形成了全品类、建材、便利店等多业态并存的成熟零售生态，供应链与网点布局完善。
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
                    本土与全球巨头共存
                  </h3>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    既有Costco、Walmart等全球巨头深耕，亦有Couche-Tard、METRO等本土巨头崛起并成功进行国际扩张，展现出强大的商业活力。
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
                    区域化深度运营
                  </h3>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    众多品牌如IGA、RONA等采用区域特许经营模式，深入社区，在各省形成了强大的品牌忠诚度和市场渗透。
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
                    多业态覆盖全客群
                  </h3>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    从大型仓储会员店、标准超市到社区便利店、专业药妆店，业态丰富，精准满足不同客群的全方位消费需求。
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
                    供应链与自有品牌强大
                  </h3>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    领先企业建有高效供应链体系，通过高比例自有品牌商品（如Costco的Kirkland Signature）巩固利润壁垒和差异化优势。
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
                  <th className="text-left py-4 px-6 text-stone-900 font-semibold">所属业态</th>
                  <th className="text-left py-4 px-6 text-stone-900 font-semibold">门店数量（约）</th>
                  <th className="text-left py-4 px-6 text-stone-900 font-semibold">代表性财务数据（加元）</th>
                  <th className="text-left py-4 px-6 text-stone-900 font-semibold">核心特征</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-stone-100 hover:bg-blue-50/30 transition-colors">
                  <td className="py-4 px-6 text-stone-800 font-medium">Walmart Canada</td>
                  <td className="py-4 px-6 text-stone-600">全品类</td>
                  <td className="py-4 px-6 text-stone-600">403家</td>
                  <td className="py-4 px-6 text-stone-600">2025年Q1净销售额72.8亿</td>
                  <td className="py-4 px-6 text-stone-600">以“天天平价”策略覆盖广泛客群，是美国以外的核心市场之一，食品杂货占据重要销售比例。</td>
                </tr>
                <tr className="border-b border-stone-100 hover:bg-blue-50/30 transition-colors">
                  <td className="py-4 px-6 text-stone-800 font-medium">Loblaw Companies Ltd.</td>
                  <td className="py-4 px-6 text-stone-600">食品零售/药房</td>
                  <td className="py-4 px-6 text-stone-600">2,400+家</td>
                  <td className="py-4 px-6 text-stone-600">2025年Q2营收147亿</td>
                  <td className="py-4 px-6 text-stone-600">加拿大最大的食品零售商，拥有PC Optimum忠诚度计划，通过硬折扣和超级中心捕捉价值型消费。</td>
                </tr>
                <tr className="border-b border-stone-100 hover:bg-blue-50/30 transition-colors">
                  <td className="py-4 px-6 text-stone-800 font-medium">Canadian Tire</td>
                  <td className="py-4 px-6 text-stone-600">综合零售/汽车服务</td>
                  <td className="py-4 px-6 text-stone-600">500+家</td>
                  <td className="py-4 px-6 text-stone-600">2025年Q2零售收入38.1亿</td>
                  <td className="py-4 px-6 text-stone-600">独特的“生活用品+汽车服务”一站式模式，拥有强大的Triangle Rewards忠诚度体系。</td>
                </tr>
                <tr className="border-b border-stone-100 hover:bg-blue-50/30 transition-colors">
                  <td className="py-4 px-6 text-stone-800 font-medium">Costco Wholesale Canada</td>
                  <td className="py-4 px-6 text-stone-600">仓储会员店</td>
                  <td className="py-4 px-6 text-stone-600">109家</td>
                  <td className="py-4 px-6 text-stone-600">2025财年Q1同店销售增长6.7%</td>
                  <td className="py-4 px-6 text-stone-600">全球会员制零售巨头，凭借会员费模式和明星自有品牌深耕市场，消费者多为中高收入家庭。</td>
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
              全品类超市与便利店 · 万家门店构筑日常消费网络
            </h2>
            <p className="text-stone-700 leading-loose text-lg">
              加拿大全品类超市及便利店市场高度发达，主要由国际大型连锁品牌与区域型本地超市共同构成，覆盖都会区至偏远社区，形成密集的零售服务网络。
            </p>
          </section>

          <section className="space-y-5">
            <h3 className="text-2xl font-semibold text-stone-900">
              国际巨头主导大众市场
            </h3>
            <p className="text-stone-700 leading-loose text-lg">
              Costco：以会员制仓储式卖场模式著称，凭借大批量、低单价的商品策略吸引家庭及中小企业客户。其自有品牌
              <span className="font-semibold text-blue-700">Kirkland Signature</span>
              覆盖食品、日用品等多品类，品质与价格优势明显。
            </p>
            <p className="text-stone-700 leading-loose text-lg">
              Walmart：作为全渠道零售领导者，Walmart在加拿大拥有庞大的超级中心与线上平台，以
              <span className="font-semibold text-blue-700">“天天低价”</span>
              策略占据市场份额，商品范围从生鲜食品到家电服装一应俱全。
            </p>
          </section>

          <section className="space-y-5">
            <h3 className="text-2xl font-semibold text-stone-900">
              本土连锁超市区域深耕
            </h3>
            <p className="text-stone-700 leading-loose text-lg">
              Metro、Provigo、IGA、Longo’s等品牌在魁北克、安大略等省份拥有较强影响力，注重本地化选品与社区服务。例如，Metro强调生鲜品质与店内体验，Provigo（隶属Loblaw集团）则以多样自有品牌及积分系统增强用户黏性。
            </p>
            <p className="text-stone-700 leading-loose text-lg">
              Sobeys及其旗下品牌如FreshCo、Foodland等覆盖全国，尤其在东部地区占据重要地位，通过差异化门店形态适应不同客群需求。
            </p>
            <div className="grid md:grid-cols-3 gap-6 pt-2">
              <div className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-200 hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-stone-900 mb-2 text-lg">
                  本地化选品
                </h4>
                <p className="text-sm text-stone-600 leading-relaxed">
                  Metro、Provigo等注重区域化商品与社区服务，增强消费者黏性。
                </p>
              </div>
              <div className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-200 hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-stone-900 mb-2 text-lg">
                  差异化门店
                </h4>
                <p className="text-sm text-stone-600 leading-relaxed">
                  Sobeys通过FreshCo、Foodland等品牌，适应多样化客群需求。
                </p>
              </div>
              <div className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-200 hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-stone-900 mb-2 text-lg">
                  积分系统
                </h4>
                <p className="text-sm text-stone-600 leading-relaxed">
                  Provigo等通过积分与自有品牌，提升用户忠诚度。
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-5">
            <h3 className="text-2xl font-semibold text-stone-900">
              便利店与药妆集成零售
            </h3>
            <p className="text-stone-700 leading-loose text-lg">
              Couche-Tard（旗下包括Circle K）是全球便利店巨头之一，在加拿大布局密集，提供即时消费品、零食及加油服务，满足便捷性与应急需求。
            </p>
            <p className="text-stone-700 leading-loose text-lg">
              Shoppers Drug Mart（Pharmaprix为其在魁省名称）与Jean Coutu等将药房服务与日用零售深度结合，美妆、健康品类尤为突出，成为社区健康与美容消费的重要节点。
            </p>
            <div className="grid md:grid-cols-3 gap-6 pt-2">
              <div className="p-6 bg-gradient-to-br from-green-50 to-white rounded-xl border border-green-200 hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-stone-900 mb-2 text-lg">
                  便利店布局
                </h4>
                <p className="text-sm text-stone-600 leading-relaxed">
                  Couche-Tard提供即时消费品与加油服务，满足便捷需求。
                </p>
              </div>
              <div className="p-6 bg-gradient-to-br from-green-50 to-white rounded-xl border border-green-200 hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-stone-900 mb-2 text-lg">
                  药妆集成
                </h4>
                <p className="text-sm text-stone-600 leading-relaxed">
                  Shoppers Drug Mart结合药房与美妆，服务社区健康消费。
                </p>
              </div>
              <div className="p-6 bg-gradient-to-br from-green-50 to-white rounded-xl border border-green-200 hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-stone-900 mb-2 text-lg">
                  社区服务
                </h4>
                <p className="text-sm text-stone-600 leading-relaxed">
                  Jean Coutu等通过健康与美容品类，强化社区联结。
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-5">
            <h2 className="text-3xl font-bold text-stone-900">
              建材家居类超市 · 千店规模的专业与DIY双轨并行
            </h2>
            <p className="text-stone-700 leading-loose text-lg">
              加拿大建材家居零售市场集中度较高，主要玩家包括全国性大型连锁与区域性专业经销商，满足专业建筑商与DIY家装用户的双重需求。
            </p>
            <p className="text-stone-700 leading-loose text-lg">
              Home Depot作为全球头部家居建材零售商，在加拿大凭借齐全的商品种类、专业建议及工具租赁服务，占据市场主导地位，深受专业承包商与DIY爱好者信赖。
            </p>
            <p className="text-stone-700 leading-loose text-lg">
              RONA（后被Lowe’s收购，部分门店正进行整合）是加拿大本土重要品牌，通过
              <span className="font-semibold text-amber-700">“RONA+”</span>
              等大型门店与社区门店网络结合，覆盖不同区域市场，强调本地化供应链与产品适配性。
            </p>
            <div className="grid md:grid-cols-3 gap-6 pt-2">
              <div className="p-6 bg-gradient-to-br from-amber-50 to-white rounded-xl border border-amber-200 hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-stone-900 mb-2 text-lg">
                  专业服务
                </h4>
                <p className="text-sm text-stone-600 leading-relaxed">
                  Home Depot提供专业建议与工具租赁，服务承包商与DIY用户。
                </p>
              </div>
              <div className="p-6 bg-gradient-to-br from-amber-50 to-white rounded-xl border border-amber-200 hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-stone-900 mb-2 text-lg">
                  本地化供应链
                </h4>
                <p className="text-sm text-stone-600 leading-relaxed">
                  RONA通过区域化产品适配，增强市场覆盖力。
                </p>
              </div>
              <div className="p-6 bg-gradient-to-br from-amber-50 to-white rounded-xl border border-amber-200 hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-stone-900 mb-2 text-lg">
                  DIY趋势
                </h4>
                <p className="text-sm text-stone-600 leading-relaxed">
                  家居改造需求上升，推动建材与软装品类增长。
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-5">
            <h3 className="text-2xl font-semibold text-stone-900">
              区域与专业型零售商
            </h3>
            <p className="text-stone-700 leading-loose text-lg">
              Réno-Dépôt（属Lowe’s加拿大体系）在魁北克等地具有影响力，定位与Home Depot类似，主打建材全品类与家装解决方案。
            </p>
            <p className="text-stone-700 leading-loose text-lg">
              BMR、Canac、Patrick Morin等区域品牌在魁省及沿海省份深耕，注重建筑材料批发及农场景观类产品，服务专业客户群体。
            </p>
            <p className="text-stone-700 leading-loose text-lg">
              JYSK来自丹麦，以平价北欧风格的家居装饰与实用家具见长，填补了中低端软装市场的需求。
            </p>
            <div className="grid md:grid-cols-3 gap-6 pt-2">
              <div className="p-6 bg-gradient-to-br from-emerald-50 to-white rounded-xl border border-emerald-200 hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-stone-900 mb-2 text-lg">
                  区域影响力
                </h4>
                <p className="text-sm text-stone-600 leading-relaxed">
                  Réno-Dépôt、BMR等深耕魁省，服务专业客户。
                </p>
              </div>
              <div className="p-6 bg-gradient-to-br from-emerald-50 to-white rounded-xl border border-emerald-200 hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-stone-900 mb-2 text-lg">
                  平价软装
                </h4>
                <p className="text-sm text-stone-600 leading-relaxed">
                  JYSK以北欧风格家具，满足中低端家装需求。
                </p>
              </div>
              <div className="p-6 bg-gradient-to-br from-emerald-50 to-white rounded-xl border border-emerald-200 hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-stone-900 mb-2 text-lg">
                  绿色建材
                </h4>
                <p className="text-sm text-stone-600 leading-relaxed">
                  绿色建材与智能家居产品成为新的增长点。
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-8">
            <h3 className="text-2xl font-semibold text-stone-900">
              核心战略支柱
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl border border-stone-200 bg-gradient-to-br from-white to-blue-50 hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-stone-900 mb-2 text-lg">
                  高度集中与区域差异
                </h4>
                <p className="text-sm text-stone-600 leading-relaxed">
                  少数大型连锁控制主要市场份额，区域品牌如IGA、BMR凭借本地化运营保持竞争力。
                </p>
              </div>
              <div className="p-6 rounded-xl border border-stone-200 bg-gradient-to-br from-white to-green-50 hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-stone-900 mb-2 text-lg">
                  多元化业态
                </h4>
                <p className="text-sm text-stone-600 leading-relaxed">
                  从Costco的仓储式购物到Shoppers的药妆集成，精准对应消费场景。
                </p>
              </div>
              <div className="p-6 rounded-xl border border-stone-200 bg-gradient-to-br from-white to-amber-50 hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-stone-900 mb-2 text-lg">
                  自有品牌竞争力
                </h4>
                <p className="text-sm text-stone-600 leading-relaxed">
                  Costco的Kirkland、Loblaw的President’s Choice通过供应链控制提升利润。
                </p>
              </div>
              <div className="p-6 rounded-xl border border-stone-200 bg-gradient-to-br from-white to-emerald-50 hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-stone-900 mb-2 text-lg">
                  全渠道转型
                </h4>
                <p className="text-sm text-stone-600 leading-relaxed">
                  电商与店内科技应用加速，线上线下融合提升客户体验。
                </p>
              </div>
              <div className="p-6 rounded-xl border border-stone-200 bg-gradient-to-br from-white to-violet-50 hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-stone-900 mb-2 text-lg">
                  健康与有机趋势
                </h4>
                <p className="text-sm text-stone-600 leading-relaxed">
                  健康、有机产品需求增长，推动零售商调整选品策略。
                </p>
              </div>
              <div className="p-6 rounded-xl border border-stone-200 bg-gradient-to-br from-white to-rose-50 hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-stone-900 mb-2 text-lg">
                  社区联结
                </h4>
                <p className="text-sm text-stone-600 leading-relaxed">
                  本土品牌通过社区服务与本地化运营，增强消费者忠诚度。
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h3 className="text-2xl font-semibold text-stone-900">
              竞争与整合的零售图景
            </h3>
            <p className="text-stone-700 leading-loose text-lg">
              加拿大零售市场在全球化与本土化之间形成了独特平衡，主流品牌不仅在规模与效率上竞争，更通过深度理解本地需求、强化社区联结，持续塑造着该国稳定而富有韧性的零售生态。在未来，能够持续优化线下体验、并无缝整合线上线下服务的零售商，将继续在这一稳健而充满活力的市场中占据主导地位。
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 to-white hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-blue-900 mb-2 text-lg">Costco</h4>
                <p className="text-sm text-stone-700 leading-relaxed">
                  会员制与自有品牌驱动，适合高品质、大批量商品合作。
                </p>
              </div>
              <div className="p-6 rounded-xl border border-green-200 bg-gradient-to-br from-green-50 to-white hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-green-900 mb-2 text-lg">Walmart</h4>
                <p className="text-sm text-stone-700 leading-relaxed">
                  全渠道与低价策略，适合广泛客群的高性价比产品分销。
                </p>
              </div>
              <div className="p-6 rounded-xl border border-amber-200 bg-gradient-to-br from-amber-50 to-white hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-amber-900 mb-2 text-lg">Home Depot</h4>
                <p className="text-sm text-stone-700 leading-relaxed">
                  专业建材与DIY服务，适合家装与绿色建材产品合作。
                </p>
              </div>
            </div>
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
              <p className="text-stone-600 leading-relaxed">
                以上分析为后续品牌/产品与渠道适配策略奠定框架基础，可进一步结合品类结构、毛利模型与渠道渗透效率展开量化评估。
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};