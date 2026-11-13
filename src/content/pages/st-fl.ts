import { definePage } from '../../lib/page-types';
export default definePage({
  id: "st-fl", group: "states", order: 62, tool: "salestax", toolProps: {"state": "FL"}, kind: 'outil',
  related: ["scrap", "k10", "salestax", "pawn"], sources: [],
  extraSources: [{"name": "Florida: Fla. Stat. § 212.08(7)(ww)", "url": "http://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0200-0299/0212/Sections/0212.08.html"}],
  slug: "sell-gold-florida", nav: "Sell gold in Florida", card: "Florida: bullion exempt at any amount, with the statute",
  title: "Sell Gold in Florida: Melt Value and Bullion Sales Tax",
  description: "Selling or buying gold in Florida: melt value at the live spot price, and the bullion sales tax rule in Fla. Stat. § 212.08(7)(ww), read on the statute.",
  h1: "Sell gold in Florida: value and tax rules",
  resume: "To sell gold in Florida, work out the melt value first, here, at the spot price shown with its time; a Florida buyer prices your gold from that same figure, less its margin. Florida’s sales tax law handles bullion in a single sentence: section 212.08(7)(ww) exempts the sale of gold, silver or platinum bullion, or any combination of them, in a single transaction. It does not mention coins. Whether a legal tender coin counts as bullion under that sentence is a reading for the Florida Department of Revenue, and this page does not guess at it. Jewelry is outside the exemption either way. Selling your own pieces to a dealer carries no sales tax at all. US Gold Karat read the statute on the Florida Legislature’s site; it is independent of every buyer and dealer.",
  faqs: [
    { q: "Does Florida’s bullion exemption cover gold coins?", a: "The paragraph speaks of gold, silver or platinum bullion and is silent on coins. Some dealers treat investment coins as bullion and some do not; the Florida Department of Revenue is the place to confirm. Ask your dealer how it charges before you buy, and keep the invoice that shows what was sold." },
    { q: "Is there a minimum purchase for Florida’s bullion exemption?", a: "The text read for this site sets no dollar threshold: it speaks of bullion sold in a single transaction, without a floor. That differs from Connecticut, Maryland and New York, which tie their exemption to about $1,000 per sale. Check the current wording through the link below before a large purchase." },
    { q: "What should I bring to sell gold in Florida?", a: "A photo ID, your pieces sorted by karat, and your own weights in grams from a kitchen scale. Note any stones you could not remove. With those, you can check that the buyer’s ticket matches what you brought and turn the offer into a share of melt value." },
  ],
  body: (h) => `
<h2>Sell gold in Florida: weigh before you go</h2>
<p>Sorting by stamp before the visit pays. A small lot of 5 grams of 10K and 7 grams of 14K is worth ${h.live(h.at(5, 416.7) + h.at(7, 583.3))} as metal at ${h.when}; mixed together and priced as 10K, the gold would be valued lower. The ${h.a('scrap', 'scrap gold calculator')} adds up mixed karats the way a fair buyer should.</p>
<h2>What § 212.08(7)(ww) covers</h2>
<p>The paragraph is short: bullion of gold, silver or platinum, alone or combined, sold in a single transaction. It names no purity and no coin. That brevity is why a bar purchase is the clear case, and why coin buyers should ask how the dealer reads it.</p>
<p>Compare the wording with the ten other states on the ${h.a('salestax', 'bullion sales tax page')}.</p>
`,
});
