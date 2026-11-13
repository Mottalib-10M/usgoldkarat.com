import { definePage } from '../../lib/page-types';
export default definePage({
  id: "st-sc", group: "states", order: 70, tool: "salestax", toolProps: {"state": "SC"}, kind: 'outil',
  related: ["filled", "eagle", "salestax", "tax"], sources: [],
  extraSources: [{"name": "South Carolina: S.C. Code § 12-36-2120(70)", "url": "https://www.scstatehouse.gov/code/t12c036.php"}],
  slug: "sell-gold-south-carolina", nav: "Sell gold in South Carolina", card: "South Carolina: bullion exempt at any amount, with the statute",
  title: "Sell Gold in South Carolina: Melt Value, Bullion Tax",
  description: "Selling or buying gold in South Carolina: melt value at the live spot price, and the bullion sales tax rule in S.C. Code § 12-36-2120(70), read on the statute.",
  h1: "Sell gold in South Carolina: value and tax rules",
  resume: "To sell gold in South Carolina, start with the melt value shown here at the spot price, with its time, and then gather offers. South Carolina’s sales tax exemptions sit in section 12-36-2120 of its Code, and item 70 covers gold, silver or platinum bullion, coins that are or have been legal tender in the United States or another country, and currency. No dollar minimum appears in the text. What the statute adds is paperwork: it directs the Department of Revenue to prescribe the records retailers must keep to identify each exempt sale, so a dealer may describe the items closely on your invoice. Palladium is not named. Jewelry is not covered. Selling your own gold is outside the sales tax. US Gold Karat read the code on the South Carolina Legislature’s site and has no ties to any buyer.",
  faqs: [
    { q: "Is palladium bullion exempt in South Carolina?", a: "Item 70 names gold, silver and platinum bullion; palladium is not in the list as read for this site. Coins that are or were legal tender are covered whatever their metal. For a palladium bar, ask the South Carolina Department of Revenue before relying on an exemption." },
    { q: "Why does a South Carolina dealer record my bullion purchase in detail?", a: "The statute asks the Department of Revenue to set the records retailers keep to identify each exempt sale. A detailed invoice is how the dealer shows that the sale was exempt. Keep your copy too: it is also your cost record if you sell the metal later." },
    { q: "Should I sell gold-filled jewelry in South Carolina along with karat gold?", a: "Keep it separate. Gold-filled pieces hold only a thin layer of gold, at least a twentieth of the weight, and mixing them in can pull down the price of the whole lot. Value them on the gold filled page and offer them as a separate lot." },
  ],
  body: (h) => `
<h2>Sell gold in South Carolina, filled pieces apart</h2>
<p>A 25 gram bracelet stamped 1/20 14K GF carries about 1.25 grams of 14K, worth ${h.live(h.at(1.25, 583.3))} at ${h.when}; a solid 14K bracelet of the same weight holds ${h.live(h.at(25, 583.3))}. The ${h.a('filled', 'gold filled calculator')} reads the stamp for you.</p>
<h2>Item 70 of § 12-36-2120 and its records</h2>
<p>South Carolina names three metals for bullion and covers legal tender coins of any country. Its distinctive clause is the record duty on retailers, which makes the invoice the proof of an exempt sale.</p>
<p>Compare South Carolina’s list with the others on the ${h.a('salestax', 'bullion sales tax page')}.</p>
`,
});
