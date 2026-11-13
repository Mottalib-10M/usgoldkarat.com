import { definePage } from '../../lib/page-types';
export default definePage({
  id: "st-ny", group: "states", order: 68, tool: "salestax", toolProps: {"state": "NY"}, kind: 'outil',
  related: ["eagle", "near", "salestax", "reports"], sources: [],
  extraSources: [{"name": "New York: N.Y. Tax Law § 1115(a)(27)", "url": "https://www.nysenate.gov/legislation/laws/TAX/1115"}],
  slug: "sell-gold-new-york", nav: "Sell gold in New York", card: "New York: bullion exempt above $1,000, with the statute",
  title: "Sell Gold in New York: Melt Value and Bullion Sales Tax",
  description: "Selling or buying gold in New York: melt value at the live spot price, and the bullion sales tax rule in N.Y. Tax Law § 1115(a)(27), read on the statute.",
  h1: "Sell gold in New York: value and tax rules",
  resume: "To sell gold in New York, start from the melt value calculated here at the spot price, with its time; then compare quotes from several buyers. New York’s sales tax exemption for bullion, in Tax Law § 1115(a)(27), is the most detailed read for this site. It exempts bars, ingots or coins of precious metal sold for investment, and treats a sale as for investment only when it exceeds one thousand dollars and the metal is kept in the same form. The price must rest on metal value: silver coins can carry a price of no more than 140 percent of their metal value, and gold coins of a quarter ounce or less no more than 120 percent, with a further limit for larger gold coins. The retailer must also be registered where state law requires. Selling is untaxed. US Gold Karat read the law on the New York State Senate’s site.",
  faqs: [
    { q: "Why can a gold coin lose New York’s sales tax exemption?", a: "Because § 1115(a)(27) caps the premium. A gold coin of a quarter ounce or less qualifies only if priced at no more than 120 percent of its metal value, and a silver coin at no more than 140 percent. A rare coin priced well above melt fails that test and is taxed." },
    { q: "Does a $1,000 bullion purchase qualify in New York?", a: "No. The sale must be for more than $1,000. A purchase of exactly that amount, or two smaller ones on different days, is taxed. The calculator on this page applies the threshold; the premium test is yours to check with the coin melt value page." },
    { q: "Where should I start when selling gold in New York City?", a: "With your own weights and the melt value from this site. Manhattan’s jewelry district has many buyers close together, which makes it easy to get two or three quotes for the same pieces in an hour. Compare them as shares of melt value, not as dollar amounts." },
  ],
  body: (h) => `
<h2>Sell gold in New York: test the premium too</h2>
<p>When buying coins, divide the price by the metal value. A one-ounce Gold Eagle holds ${h.live(h.at(31.1034768, 1000))} of gold at ${h.when}; the ${h.a('eagle', 'coin melt value page')} gives the ratio for any price you type, which is the figure the New York premium test uses.</p>
<h2>The investment test in § 1115(a)(27)</h2>
<p>Three conditions stack up: more than $1,000 per sale, the metal kept in the same form, and a price that depends on metal value within the 140 and 120 percent limits. A purchase that meets the first and fails the third is taxed in full.</p>
<p>Compare with Connecticut and Maryland on the ${h.a('salestax', 'state comparison page')}.</p>
`,
});
