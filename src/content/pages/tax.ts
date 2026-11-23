import { definePage } from '../../lib/page-types';
export default definePage({
  id: "tax", group: "rules", order: 51, tool: "gains", toolProps: {"kind": "sale"}, kind: 'outil',
  related: ["inherited", "reports", "salestax", "eagle"], sources: ["usc1h", "usc408m", "irsTc409"],
  slug: "gold-capital-gains-tax", nav: "Tax on selling gold", card: "Gold is a collectible: the 28% federal cap on long-term gains",
  title: "Gold Capital Gains Tax: The 28% Collectibles Rate Explained",
  description: "Gold capital gains tax when you sell coins, bars or jewelry: why gold is a collectible, the 28% federal cap on long-term gains, and a calculator for your sale.",
  h1: "Gold capital gains tax when you sell",
  resume: "Gold capital gains tax follows its own rule: the tax code treats gold, silver and coins as collectibles, so a gain on gold held more than a year is taxed at your ordinary income tax rate but never more than {tax.max}, instead of the lower long-term rates that apply to stocks. Gold held a year or less is taxed like wages, at your ordinary rate. The calculator below takes your sale price, what you paid, how long you held it and your top tax bracket, and works out the federal tax on the gain. Fees you paid to buy or sell count against the gain. The rule is in section 1(h) of the Internal Revenue Code, and section 408(m) defines collectibles as including any metal and any coin. US Gold Karat is an independent site, not a tax adviser: for your own return, check with a tax professional.",
  faqs: [
    { q: "Is gold taxed at 28%?", a: "At most 28% on a long-term gain. If your ordinary tax bracket is 10%, 12%, 22% or 24%, the gain is taxed at that lower rate. Only taxpayers in the 32%, 35% and 37% brackets see their collectibles gain capped at 28%. Short-term gains are taxed at the ordinary rate, uncapped." },
    { q: "Do I owe tax if I sell gold for less than I paid?", a: "No. A loss on a collectible is not taxed and may offset other capital gains under the netting rules of section 1(h). Jewelry you wore yourself is personal-use property, and a loss on it cannot be deducted. Keep your purchase records either way." },
    { q: "Do I pay tax on gold jewelry I sell for scrap?", a: "Only on a gain. Most people sell jewelry bought years ago at retail prices for less than they paid, so there is no gain. Gold bought as bars or coins, when the price has risen since, is where gains usually arise." },
    { q: "What changes for tax on selling gold in 2027?", a: "The 28% cap on long-term collectibles gains stays in the law, and the ordinary rates stay at 10% to 37%. The IRS published the 2027 brackets on November 5, 2026 (Rev. Proc. 2026-35): the 32% rate, the first above the cap, starts above $208,325 for a single filer and $416,650 for a married couple filing jointly." },
  ],
  body: (h) => `
<h2>Why gold capital gains tax is different</h2>
<p>${h.src('usc408m', 'Section 408(m)(2)')} lists what counts as a collectible: works of art, rugs and antiques, any metal or gem, any stamp or coin, alcoholic beverages. ${h.src('usc1h', 'Section 1(h)(4) and (5)')} then put collectibles gain into the “28-percent rate gain” bucket. ${h.src('irsTc409', 'IRS Topic 409')} sums it up: net capital gains from selling collectibles such as coins are taxed at a maximum 28% rate.</p>
${h.table(['Your top bracket', 'Long-term gold gain taxed at', 'Short-term gold gain taxed at'], h.P.tax.ordinaryRates.map((r) => [h.pct(r, 0), h.pct(Math.min(r, h.P.tax.collectiblesMaxRate), 0), h.pct(r, 0)]), 'Federal income tax only; brackets and thresholds change each year.')}
<h2>Gold capital gains tax in 2027</h2>
<p>The IRS published the 2027 figures on November 5, 2026 (${h.src('irsRp202635', 'Rev. Proc. 2026-35')}). The collectibles cap of 28% is written in ${h.src('usc1h', 'section 1(h)')} and does not change in 2027, nor do the seven ordinary rates. What moves is where the brackets start: the 32% rate, the first one above the cap, begins above $208,325 of taxable income for a single filer and $416,650 for a married couple filing jointly in 2027, up from $201,775 and $403,550 in 2026. Below those amounts, a long-term gold gain is taxed at your ordinary rate of 24% or less. State income tax rules for 2027 are added as each state publishes them.</p>
<h2>Keeping records</h2>
<p>Keep receipts showing what you paid, including dealer premiums and shipping, and the date. Your gain is the sale price minus that cost and minus selling fees. Whether the dealer files a form or not, the gain is yours to report: see the ${h.a('reports', 'page on dealer reporting')}. Inherited gold follows a different cost rule, explained on the ${h.a('inherited', 'inherited gold page')}.</p>
`,
});
