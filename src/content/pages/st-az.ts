import { definePage } from '../../lib/page-types';
export default definePage({
  id: "st-az", group: "states", order: 60, tool: "salestax", toolProps: {"state": "AZ"}, kind: 'outil',
  related: ["offer", "eagle", "salestax", "k14"], sources: [],
  extraSources: [{"name": "Arizona: A.R.S. § 42-5061(A)(21)", "url": "https://www.azleg.gov/ars/42/05061.htm"}],
  slug: "sell-gold-arizona", nav: "Sell gold in Arizona", card: "Arizona: bullion exempt at any amount, with the statute",
  title: "Sell Gold in Arizona: Melt Value and Bullion Sales Tax",
  description: "Selling or buying gold in Arizona: melt value at the live spot price, and the bullion sales tax rule in A.R.S. § 42-5061(A)(21), read on the official statute.",
  h1: "Sell gold in Arizona: value and tax rules",
  resume: "To sell gold in Arizona, the figure to know first is melt value: the weight of pure gold in your pieces times the spot price, which the calculator on this page works out with the time of that price. Arizona has no sales tax in the usual sense; it levies a transaction privilege tax on sellers, and its list of deductions, A.R.S. § 42-5061(A)(21), takes precious metal bullion and monetized bullion out of that tax. Monetized bullion is the statute’s term for coins and other money made of precious metal. The deduction has one exception worth knowing: coins sold to be turned into jewelry or works of art stay taxable. Selling your own gold to a dealer is a different matter, outside the tax entirely. US Gold Karat reads the statute on the Arizona Legislature’s site, lists no buyers and takes no fees.",
  faqs: [
    { q: "What is the transaction privilege tax on gold in Arizona?", a: "It is Arizona’s version of a sales tax, charged to the seller for the privilege of doing business and usually passed on to the buyer. Section 42-5061 lists the retail sales deducted from it, and paragraph (A)(21) covers precious metal bullion and monetized bullion. A bar or a legal tender coin bought as an investment is therefore not taxed." },
    { q: "Is a gold coin pendant taxed in Arizona?", a: "Usually yes. The same paragraph excludes coins sold to be made into jewelry or works of art, and a finished pendant is jewelry, which never fell under the bullion deduction. The coin’s metal value does not change that: the tax follows what is being sold and why, not how much gold it holds." },
    { q: "Does Arizona tax me when I sell my old jewelry for cash?", a: "No. The privilege tax is on retail sales by businesses, and you are not making a retail sale when a dealer buys your gold. What matters to you is the price: check it against melt value with the offer checker, and remember that a gain over what you paid may count as income on your returns." },
  ],
  body: (h) => `
<h2>Sell gold in Arizona: start from melt value</h2>
<p>An Arizona buyer works from the same world price as any other: a 14K chain of 12 grams holds ${h.live(h.at(12, 583.3))} of gold at ${h.when}. Ask the buyer to weigh it in front of you and to say whether the quote is per gram or per pennyweight, then turn the offer into a percentage with the ${h.a('offer', 'offer checker')}. A percentage survives the drive between two stores; a dollar quote does not, because the price moves.</p>
<h2>Bullion, coins and jewelry under § 42-5061</h2>
<p>Paragraph (A)(21) draws its line by purpose, not by metal. A one-ounce bar and a Gold Eagle bought to hold are deducted; the same Eagle bought by a jeweler to set in a bezel is not. Jewelry was never part of the deduction. If you buy bullion and the invoice shows privilege tax, ask the dealer which part of the paragraph it applied.</p>
<p>The ${h.a('salestax', 'state-by-state bullion page')} compares Arizona with the ten other states read for this site.</p>
`,
});
