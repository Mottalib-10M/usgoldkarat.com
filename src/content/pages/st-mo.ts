import { definePage } from '../../lib/page-types';
export default definePage({
  id: "st-mo", group: "states", order: 67, tool: "salestax", toolProps: {"state": "MO"}, kind: 'outil',
  related: ["sterling", "silver", "salestax", "inherited"], sources: [],
  extraSources: [{"name": "Missouri: RSMo § 144.815", "url": "https://revisor.mo.gov/main/OneSection.aspx?section=144.815"}],
  slug: "sell-gold-missouri", nav: "Sell gold in Missouri", card: "Missouri: bullion exempt at any amount, with the statute",
  title: "Sell Gold in Missouri: Melt Value and Bullion Sales Tax",
  description: "Selling or buying gold in Missouri: melt value at the live spot price, and the bullion sales tax rule in RSMo § 144.815, read on the official statute.",
  h1: "Sell gold in Missouri: value and tax rules",
  resume: "To sell gold in Missouri, find the melt value first: the calculator on this page multiplies the gold in your pieces by the spot price and shows its time. Missouri gives bullion its own section of the sales tax law. RSMo 144.815 exempts purchases of bullion and investment coins from state and local sales taxes. Bullion is gold, silver, platinum or palladium in a bulk state, valued for its content rather than its form, at a purity of at least 900 parts per thousand. Investment coins include numismatic coins and other legal tender of those metals. No minimum amount is set, so one coin is exempt. Jewelry stays taxable. Selling your own gold to a dealer involves no sales tax. US Gold Karat read the section on the Missouri Revisor of Statutes’ site and is paid by no buyer.",
  faqs: [
    { q: "Are 90% silver coins exempt from sales tax in Missouri?", a: "The bullion definition starts at 900 parts per thousand, and investment coins include legal tender made of silver. Pre-1965 US silver coins, at 900, fit both readings. Missouri exempts them from state and local sales tax at any amount, so one coin is as exempt as a roll." },
    { q: "Does Missouri exempt local sales taxes on bullion as well?", a: "Yes. Section 144.815 exempts bullion and investment coins from state and local sales taxes alike, so a city or county rate does not apply either. In states whose text mentions only the state tax, local rules can differ; Missouri’s wording settles that question." },
    { q: "What share of melt value should I expect for sterling silver in Missouri?", a: "No law or agency sets one, and silver usually brings a lower share than gold because handling costs weigh more on a cheaper metal. Get the melt value on the sterling page, then ask two buyers. The share each offers is the only fair basis for choosing." },
  ],
  body: (h) => `
<h2>Sell gold in Missouri and value the silver too</h2>
<p>Estates often mix gold and silver. 20 grams of 14K are worth ${h.live(h.at(20, 583.3))} as metal at ${h.when}, and a set of sterling forks can add more than people expect. Value the silver separately on the ${h.a('sterling', 'sterling silver page')}, so a buyer cannot fold it into a single round figure.</p>
<h2>RSMo 144.815: bulk state and 900 fineness</h2>
<p>Missouri’s 900 floor is lower than North Dakota’s 999 or Minnesota’s 99.9 percent, which is why coin silver and 22 karat coins both sit inside it. Investment coins, including numismatic ones, are named separately, so rarity does not take a coin out of the exemption.</p>
<p>See how other states set their purity floor on the ${h.a('salestax', 'bullion sales tax page')}.</p>
`,
});
