import type { RefObject } from "react";
import StoreTable from "../store-table";
import RadialStats from "../radial";

interface ChinaProps {
    companyDetailsRef: RefObject<HTMLDivElement | null>;
    statsRef: RefObject<HTMLDivElement | null>;
}

export const China = ({ companyDetailsRef, statsRef }: { companyDetailsRef: RefObject<HTMLDivElement | null>; statsRef: RefObject<HTMLDivElement | null>; }) => {

    return (
        <>
            <div
                ref={companyDetailsRef}
                className="px-12 py-10 bg-white relative"
            >
                <div className="mb-12 p-8 bg-gradient-to-br from-blue-50 to-slate-50 rounded-2xl border border-blue-100">
                    <h2 className="text-xl leading-relaxed text-slate-700 tracking-wide">
                        山姆预测在未来十年,有望在中国实现100+店铺,开市客作为全球第一会员店连锁,全力开店深耕中国市场,将提前进入超快开店计划,并打开即时零售,以最快速度追逐山姆。届时双方有望销售额进入6000亿人民币/年。目前所知山姆会员连锁、已经快速介入三线高消费力城市扩展例如广州、深圳、北京等地区。而开市客更多抢占一二线大市场。
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
                                        全渠道深耕
                                    </h3>
                                    <p className="text-stone-600 text-sm leading-relaxed">
                                        成熟的 "店仓一体化"
                                        网络与高效的会员数据系统,实现线上销售占比超50%,极速达服务覆盖核心市场。
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
                                        全国化布局
                                    </h3>
                                    <p className="text-stone-600 text-sm leading-relaxed">
                                        持续向三线高消费力城市下沉,全国门店已突破50家,会员数近900万,续卡率行业领先
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
                                        卓越商品力
                                    </h3>
                                    <p className="text-stone-600 text-sm leading-relaxed">
                                        严控SKU数量,自有品牌Member's
                                        Mark占比超30%,打造多款年销售破20亿明星单品。
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
                                        稳健增长
                                    </h3>
                                    <p className="text-stone-600 text-sm leading-relaxed">
                                        年销售额突破千亿,保持双位数增长,成为沃尔玛中国业绩核心引擎。
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
                                        行业标杆
                                    </h3>
                                    <p className="text-stone-600 text-sm leading-relaxed">
                                        中国付费会员制零售开创者与模式定义者,持续引领行业标准与消费体验升级。
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
                                    <th className="text-left py-4 px-6 text-stone-900 font-semibold">年销售额（人民币）</th>
                                    <th className="text-left py-4 px-6 text-stone-900 font-semibold">门店数量</th>
                                    <th className="text-left py-4 px-6 text-stone-900 font-semibold">会员规模</th>
                                    <th className="text-left py-4 px-6 text-stone-900 font-semibold">线上占比</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-stone-100 hover:bg-blue-50/30 transition-colors">
                                    <td className="py-4 px-6 text-stone-800 font-medium">山姆会员店</td>
                                    <td className="py-4 px-6 text-stone-600">1000亿+</td>
                                    <td className="py-4 px-6 text-stone-600">54</td>
                                    <td className="py-4 px-6 text-stone-600">近900万</td>
                                    <td className="py-4 px-6 text-stone-600">&gt;50%</td>
                                </tr>
                                <tr className="border-b border-stone-100 hover:bg-blue-50/30 transition-colors">
                                    <td className="py-4 px-6 text-stone-800 font-medium">开市客</td>
                                    <td className="py-4 px-6 text-stone-600">87亿+</td>
                                    <td className="py-4 px-6 text-stone-600">7</td>
                                    <td className="py-4 px-6 text-stone-600">未公开（全球8100万）</td>
                                    <td className="py-4 px-6 text-stone-600"></td>
                                </tr>
                                <tr className="border-b border-stone-100 hover:bg-blue-50/30 transition-colors">
                                    <td className="py-4 px-6 text-stone-800 font-medium">奥乐齐</td>
                                    <td className="py-4 px-6 text-stone-600">20亿+</td>
                                    <td className="py-4 px-6 text-stone-600">78</td>
                                    <td className="py-4 px-6 text-stone-600">未公开</td>
                                    <td className="py-4 px-6 text-stone-600"></td>
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
                            山姆会员店 · 会员制仓储巨头深耕中国
                        </h2>
                        <p className="text-stone-700 leading-loose text-lg">
                            作为沃尔玛旗下的高端会员制商店,山姆自1996年进入中国后,已成为沃尔玛中国业务的重要增长引擎,其
                            2024 年销售额已突破
                            <span className="font-semibold text-blue-700"> 1000 亿元人民币</span>
                            ,贡献了沃尔玛中国约七成的销售额。
                        </p>
                        <p className="text-stone-700 leading-loose text-lg">
                            截至 2025 年初,山姆在中国拥有{" "}
                            <span className="font-semibold text-blue-700">54 家门店</span>
                            ,并预计在年底突破 60。其会员数已逼近
                            <span className="font-semibold text-blue-700">
                                {" "}
                                900 万
                            </span>,会员续费率高达{" "}
                            <span className="font-semibold text-blue-700">80%</span>
                            ,卓越会员续卡率更是达到
                            <span className="font-semibold text-blue-700">
                                {" "}
                                92%
                            </span>。线上销售占比已超过{" "}
                            <span className="font-semibold text-blue-700">50%</span>,超过 80%
                            的订单可在一小时内送达,形成高粘性服务闭环。
                        </p>
                    </section>

                    <section className="space-y-5">
                        <h3 className="text-2xl font-semibold text-stone-900">
                            山姆预测与市场扩展
                        </h3>
                        <p className="text-stone-700 leading-loose text-lg">
                            山姆预测在未来十年,有望在中国实现{" "}
                            <span className="font-semibold text-blue-700">100+ 店铺</span>
                            。开市客作为全球第一会员店连锁,将全力开店深耕中国市场,预计将提前进入"超快开店计划",并全面发力即时零售,以最快速度追逐山姆。双方在成熟市场与高线城市的深耕下,有望推动整体销售规模进入{" "}
                            <span className="font-semibold text-blue-700">6000 亿元人民币 / 年</span>{" "}
                            级别。
                        </p>
                        <p className="text-stone-700 leading-loose text-lg">
                            当前山姆已加速进入具备高消费力的三线城市与富裕县域(如晋江、昆山等),而开市客更多集中在一二线核心圈层,形成不同节奏的渗透策略差异。
                        </p>
                    </section>

                    <section className="space-y-8">
                        <h3 className="text-2xl font-semibold text-stone-900">
                            核心战略支柱
                        </h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="p-6 rounded-xl border border-stone-200 bg-gradient-to-br from-white to-blue-50 hover:shadow-md transition-shadow">
                                <h4 className="font-semibold text-stone-900 mb-2 text-lg">
                                    全渠道深耕
                                </h4>
                                <p className="text-sm text-stone-600 leading-relaxed">
                                    "店仓一体化 + 会员数据体系" 支撑极速配送及高复购;线上占比超
                                    50%。
                                </p>
                            </div>
                            <div className="p-6 rounded-xl border border-stone-200 bg-gradient-to-br from-white to-green-50 hover:shadow-md transition-shadow">
                                <h4 className="font-semibold text-stone-900 mb-2 text-lg">
                                    全国化布局
                                </h4>
                                <p className="text-sm text-stone-600 leading-relaxed">
                                    加速下沉至高消费潜力区域,渠道结构层次化推进,提升边缘市场渗透。
                                </p>
                            </div>
                            <div className="p-6 rounded-xl border border-stone-200 bg-gradient-to-br from-white to-amber-50 hover:shadow-md transition-shadow">
                                <h4 className="font-semibold text-stone-900 mb-2 text-lg">
                                    卓越商品力
                                </h4>
                                <p className="text-sm text-stone-600 leading-relaxed">
                                    严控 SKU(≈4000),自有品牌 Member's Mark 占比
                                    30%+,打造爆品矩阵。
                                </p>
                            </div>
                            <div className="p-6 rounded-xl border border-stone-200 bg-gradient-to-br from-white to-emerald-50 hover:shadow-md transition-shadow">
                                <h4 className="font-semibold text-stone-900 mb-2 text-lg">
                                    稳健增长
                                </h4>
                                <p className="text-sm text-stone-600 leading-relaxed">
                                    持续双位数增长态势,驱动沃尔玛中国整体盈利结构优化。
                                </p>
                            </div>
                            <div className="p-6 rounded-xl border border-stone-200 bg-gradient-to-br from-white to-violet-50 hover:shadow-md transition-shadow">
                                <h4 className="font-semibold text-stone-900 mb-2 text-lg">
                                    行业标杆
                                </h4>
                                <p className="text-sm text-stone-600 leading-relaxed">
                                    付费会员模式定义者,体验标准与运营效率持续被同行对标。
                                </p>
                            </div>
                            <div className="p-6 rounded-xl border border-stone-200 bg-gradient-to-br from-white to-rose-50 hover:shadow-md transition-shadow">
                                <h4 className="font-semibold text-stone-900 mb-2 text-lg">
                                    高质量下沉
                                </h4>
                                <p className="text-sm text-stone-600 leading-relaxed">
                                    拓展至富裕县域结合服务履约半径优化,实现结构性新增。
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-5">
                        <h2 className="text-3xl font-bold text-stone-900">
                            开市客 · 全球巨头的本土化探索
                        </h2>
                        <p className="text-stone-700 leading-loose text-lg">
                            作为全球仓储会员店的开创者,开市客于 2019
                            年进入中国大陆。虽然门店数量尚少,但单店影响力与开业声量极高。截止
                            2025 年 9 月,开市客在中国大陆拥有{" "}
                            <span className="font-semibold text-green-700">7 家门店</span>
                            ,覆盖上海、苏州、深圳等 6 座城市;2024 年中国业务销售额达到{" "}
                            <span className="font-semibold text-green-700">87 亿元人民币</span>
                            ,单店销售逼近 13 亿元,苏州店销售增速位居其全球体系前列。
                        </p>
                        <div className="grid md:grid-cols-3 gap-6 pt-2">
                            <div className="p-6 bg-gradient-to-br from-green-50 to-white rounded-xl border border-green-200 hover:shadow-md transition-shadow">
                                <h4 className="font-semibold text-stone-900 mb-2 text-lg">
                                    会员制基石
                                </h4>
                                <p className="text-sm text-stone-600 leading-relaxed">
                                    全球续费率≈89.8%,会员费再投入机制支撑长期价值循环。
                                </p>
                            </div>
                            <div className="p-6 bg-gradient-to-br from-green-50 to-white rounded-xl border border-green-200 hover:shadow-md transition-shadow">
                                <h4 className="font-semibold text-stone-900 mb-2 text-lg">
                                    商品价值感
                                </h4>
                                <p className="text-sm text-stone-600 leading-relaxed">
                                    精简 SKU + Kirkland 自有品牌 +
                                    寻宝式体验,塑造价格与品质复合护城河。
                                </p>
                            </div>
                            <div className="p-6 bg-gradient-to-br from-green-50 to-white rounded-xl border border-green-200 hover:shadow-md transition-shadow">
                                <h4 className="font-semibold text-stone-900 mb-2 text-lg">
                                    审慎本土化
                                </h4>
                                <p className="text-sm text-stone-600 leading-relaxed">
                                    在电商 &
                                    即时零售补课中,逐步构建与中国消费者的持续交互触点。
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-5">
                        <h2 className="text-3xl font-bold text-stone-900">
                            奥乐齐 · 硬折扣鼻祖的质价比模式
                        </h2>
                        <p className="text-stone-700 leading-loose text-lg">
                            来自德国的奥乐齐(ALDI),依托"硬折扣"模式在华东区域稳步拓展。截至
                            2025 年 7 月,在中国拥有{" "}
                            <span className="font-semibold text-amber-700">78 家门店</span>
                            ,主要集中于上海,并进入苏州、无锡等扩张带。2024 年销售额约{" "}
                            <span className="font-semibold text-amber-700">20 亿元人民币</span>
                            ,同比增速高达 100%,位列中国超市 Top100 增长前列。
                        </p>
                        <div className="grid md:grid-cols-3 gap-6 pt-2">
                            <div className="p-6 bg-gradient-to-br from-amber-50 to-white rounded-xl border border-amber-200 hover:shadow-md transition-shadow">
                                <h4 className="font-semibold text-stone-900 mb-2 text-lg">
                                    极致质价比
                                </h4>
                                <p className="text-sm text-stone-600 leading-relaxed">
                                    大量 9.9 元以下商品 +
                                    "长期降价"策略,抓住价格敏感与理性消费共振。
                                </p>
                            </div>
                            <div className="p-6 bg-gradient-to-br from-amber-50 to-white rounded-xl border border-amber-200 hover:shadow-md transition-shadow">
                                <h4 className="font-semibold text-stone-900 mb-2 text-lg">
                                    自有品牌核心
                                </h4>
                                <p className="text-sm text-stone-600 leading-relaxed">
                                    自有品牌占比≈90%,与国内优质生产商深度协同,降低中间成本。
                                </p>
                            </div>
                            <div className="p-6 bg-gradient-to-br from-amber-50 to-white rounded-xl border border-amber-200 hover:shadow-md transition-shadow">
                                <h4 className="font-semibold text-stone-900 mb-2 text-lg">
                                    精细化运营
                                </h4>
                                <p className="text-sm text-stone-600 leading-relaxed">
                                    精简 SKU + 整箱上货 + 智能订货 + 即时零售(3km / 30
                                    分钟达)提升结构效率。
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-6">
                        <h3 className="text-2xl font-semibold text-stone-900">
                            PRISM 瓴境对合作路径的研判
                        </h3>
                        <p className="text-stone-700 leading-loose text-lg">
                            三种模式在中国形成差异化通道:山姆以"规模 +
                            会员结构价值"拉升运营深度;开市客依靠"全球供应链 +
                            价值感体验"稳步推进;奥乐齐以"高结构效率 +
                            自有品牌驱动"在局部市场做深做透。
                        </p>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="p-6 rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 to-white hover:shadow-md transition-shadow">
                                <h4 className="font-semibold text-blue-900 mb-2 text-lg">山姆</h4>
                                <p className="text-sm text-stone-700 leading-relaxed">
                                    扩张节奏快,履约半径与数字化成熟,适配高客单复购型合作。
                                </p>
                            </div>
                            <div className="p-6 rounded-xl border border-green-200 bg-gradient-to-br from-green-50 to-white hover:shadow-md transition-shadow">
                                <h4 className="font-semibold text-green-900 mb-2 text-lg">开市客</h4>
                                <p className="text-sm text-stone-700 leading-relaxed">
                                    价值密度高,商品精选属性强,适合差异化组合与品牌表达。
                                </p>
                            </div>
                            <div className="p-6 rounded-xl border border-amber-200 bg-gradient-to-br from-amber-50 to-white hover:shadow-md transition-shadow">
                                <h4 className="font-semibold text-amber-900 mb-2 text-lg">奥乐齐</h4>
                                <p className="text-sm text-stone-700 leading-relaxed">
                                    性价比人群聚焦,适合结构优化与快速试错型新品验证。
                                </p>
                            </div>
                        </div>
                        <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                            <p className="text-stone-600 leading-relaxed">
                                以上分析为后续品牌/产品与渠道适配策略奠定框架基础,可进一步结合品类结构、毛利模型与渠道渗透效率展开量化评估。
                            </p>
                        </div>
                    </section>
                </div>
            </div>

            <div className="bg-white">
                <StoreTable />
                <RadialStats />
            </div>

        </>
    )
}