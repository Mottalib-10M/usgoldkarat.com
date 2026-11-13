import { definePage } from '../../lib/page-types';
export default definePage({
  id: "st-ia", group: "states", order: 63, tool: "salestax", toolProps: {"state": "IA"}, kind: 'outil',
  related: ["pawn", "silver", "salestax", "dwt"], sources: [],
  extraSources: [{"name": "Iowa: Iowa Code § 423.3(91)", "url": "https://www.legis.iowa.gov/docs/code/423.3.pdf"}],
  slug: "sell-gold-iowa", nav: "Sell gold in Iowa", card: "Iowa: bullion exempt at any amount, with the statute",
  title: "Sell Gold in Iowa: Melt Value and Bullion Sales Tax",
  description: "Selling or buying gold in Iowa: melt value at the live spot price, and the bullion sales tax rule in Iowa Code § 423.3(91), read on the official statute.",
  h1: "Sell gold in Iowa: value and tax rules",
  resume: "To sell gold in Iowa, the useful starting point is the melt value calculated on this page from the spot price and the time it was read. Iowa’s sales tax exemptions, in section 423.3 of the Iowa Code, include paragraph 91 on coins, currency and bullion. The statute defines bullion as bars, ingots or commemorative medallions of gold, silver, platinum or palladium valued for their metal content rather than their form, and coins and currency as money that is or has been legal tender. Both are exempt at any amount, so a single silver round bought in Iowa carries no sales tax. A ring or chain is neither and stays taxable. Selling your gold is not a retail sale and involves no sales tax. US Gold Karat read the code on the Iowa Legislature’s website and accepts nothing from buyers.",
  faqs: [
    { q: "Are commemorative medallions exempt from Iowa sales tax?", a: "Yes, if they are of gold, silver, platinum or palladium and valued for their metal content rather than their form. Iowa’s definition of bullion names bars, ingots and commemorative medallions. A medal priced mainly for its design or rarity sits less clearly within that wording, so ask before you buy one." },
    { q: "Do old silver coins count as currency in Iowa?", a: "The statute covers money that is or has been legal tender, so coins no longer in circulation still qualify. Pre-1965 US dimes, quarters and half dollars, often sold for their silver, are therefore exempt from Iowa sales tax when you buy them, whatever the amount of the purchase." },
    { q: "How do I check a per-pennyweight price from an Iowa pawn shop?", a: "Type it into the pawn shop price checker with the karat. It converts the posted figure into a share of melt value at the current spot price and into a price per gram, so you can set it against a buyer who quotes in grams or as one lump sum." },
  ],
  body: (h) => `
<h2>Sell gold in Iowa at a known share of melt</h2>
<p>Many buyers post a price per pennyweight. At ${h.when}, a pennyweight of 14K holds ${h.live(h.at(1.55517384, 583.3), 'XAU', 'usd2')} of gold; a posted price well below that tells you the share before you walk in. The ${h.a('pawn', 'pawn shop price checker')} does the division for any karat.</p>
<h2>Iowa’s definitions in § 423.3(91)</h2>
<p>Iowa is one of the few states to write both definitions into the exemption itself. Bullion is judged by what gives it value, its metal, not its shape; money is anything that is or was legal tender. Between them they cover bars, rounds valued as metal, and coins both current and withdrawn.</p>
<p>The ${h.a('salestax', 'comparison of the states read so far')} sets Iowa beside its neighbors Missouri and Minnesota.</p>
`,
});
