import { definePage } from '../../lib/page-types';
export default definePage({
  id: "inherited", group: "sell", order: 24, tool: "gains", toolProps: {"kind": "inherited"}, kind: 'outil',
  related: ["tax", "scrap", "near", "eagle"], sources: ["usc1014", "usc1h", "irsTc409"],
  slug: "inherited-gold-value", nav: "Inherited gold: value and tax", card: "What inherited jewelry and coins are worth, and the tax when you sell",
  title: "Inherited Gold Value: Melt Price and Tax When You Sell It",
  description: "Inherited gold jewelry or coins: work out the melt value, why your tax cost is the value on the date of death, and the federal tax on the gain when you sell.",
  h1: "Inherited gold: what it is worth and the tax on selling",
  resume: "Inherited gold is worth what its metal is worth today, and for tax purposes your cost is not what the owner paid decades ago but its fair market value on the date of death, under section 1014 of the Internal Revenue Code. That rule, often called a stepped-up basis, usually leaves little or no taxable gain when you sell soon after an estate is settled. The calculator below takes the sale price and that date-of-death value and works out the federal tax on any gain: as a collectible, gold held long term is taxed at your ordinary rate, but at no more than {tax.max}. To find today's value first, weigh the pieces by karat in the scrap gold calculator. Keep anything signed, antique or set with good stones apart: it may be worth more as jewelry. US Gold Karat is an independent calculator, not a buyer or a tax adviser.",
  faqs: [
    { q: "Do I pay tax when I inherit gold jewelry?", a: "Receiving it is not income for you. Large estates may owe federal estate tax, paid by the estate, and a few states have their own inheritance taxes. Income tax comes in only when you sell, on the difference between the sale price and the value on the date of death." },
    { q: "How do I prove what inherited gold was worth on the date of death?", a: "An appraisal made for the estate is the best evidence. Without one, the spot price on that date times the weight of gold is a reasonable record for plain jewelry and coins: keep a note of weights, karats and the price source used." },
    { q: "Should I melt inherited gold or sell it as jewelry?", a: "Get both figures. The melt value here is the floor any metal buyer works from. Signed, antique or stone-set pieces may fetch more from a jeweler or at auction. Plain broken or dated pieces usually sell for their gold, so a metal buyer is the natural route for those." },
  ],
  body: (h) => `
<h2>Why your cost is the value on the date of death</h2>
<p>${h.src('usc1014', 'Section 1014(a)')} says property acquired from a decedent takes as its basis its fair market value at the date of death. If a ring bought for $300 in 1985 held gold worth $1,800 when its owner died and you sell it for $1,900, the gain is $100, not $1,600. Keep a record of how you set that value.</p>
<h2>How the gain is taxed</h2>
<p>Gold and silver are collectibles in the tax code: ${h.src('usc408m', 'section 408(m)')} lists any metal and any coin. The ${h.src('usc1h', 'capital gains rules in section 1(h)')} tax collectibles gain held more than a year at no more than 28%, and ${h.src('irsTc409', 'IRS Topic 409')} says the same in plain words. If your ordinary bracket is lower, the lower rate applies. The ${h.a('tax', 'gold tax page')} covers purchases you made yourself.</p>
<h2>Three steps for an inherited box of gold</h2>
<p>Sort by stamp and weigh each karat in the ${h.a('scrap', 'scrap gold calculator')}. Set aside anything that may be worth more as jewelry. Then take the rest to two or three buyers on the same day and compare their quotes with the ${h.a('near', 'comparison tool')}.</p>
`,
});
