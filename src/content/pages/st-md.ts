import { definePage } from '../../lib/page-types';
export default definePage({
  id: "st-md", group: "states", order: 65, tool: "salestax", toolProps: {"state": "MD"}, kind: 'outil',
  related: ["near", "eagle", "salestax", "tax"], sources: [],
  extraSources: [{"name": "Maryland: Md. Code, Tax-General § 11-214.1", "url": "https://mgaleg.maryland.gov/mgawebsite/Laws/StatuteText?article=gtg&section=11-214.1&enactments=false"}],
  slug: "sell-gold-maryland", nav: "Sell gold in Maryland", card: "Maryland: bullion exempt above $1,000, with the statute",
  title: "Sell Gold in Maryland: Melt Value and Bullion Sales Tax",
  description: "Selling or buying gold in Maryland: melt value at the live spot price, and the bullion sales tax rule in Md. Code, Tax-General § 11-214.1, read on the statute.",
  h1: "Sell gold in Maryland: value and tax rules",
  resume: "To sell gold in Maryland, check the melt value of your pieces first, using the calculator on this page and the time of its price. For buyers, Maryland law sets a strict threshold. Section 11-214.1 of the Tax-General Article exempts precious metal bullion or coins only when the sale price is greater than $1,000. Bullion means refined precious metal valued for its metal content; coins mean money of precious metal that is or was a medium of exchange in Maryland, the United States or another country. Jewelry and works of art are excluded. The wording matters at the edge: a sale of exactly $1,000 is taxed, while $1,000.01 is not. Selling your own gold is untouched by any of this. US Gold Karat read the section on the Maryland General Assembly’s site and works for no buyer.",
  faqs: [
    { q: "Is a $1,000 bullion purchase taxed in Maryland?", a: "Yes. Section 11-214.1 requires the sale price to be greater than $1,000, so a purchase of exactly $1,000 does not qualify. Connecticut, by contrast, exempts sales from $1,000. The calculator on this page applies the Maryland wording when you type an amount." },
    { q: "Does Maryland’s exemption include foreign coins?", a: "It covers coins made of precious metal that are or were used as a medium of exchange in Maryland, the United States or another nation. A Canadian or South African bullion coin therefore fits the definition, provided the sale price passes $1,000." },
    { q: "What should I ask a Maryland buyer before accepting?", a: "Ask what weight and karat they recorded, whether the price is per gram or per pennyweight, and whether the offer holds while you get a second quote. Then convert it into a share of melt value. A buyer unwilling to show the weight is a reason to leave." },
  ],
  body: (h) => `
<h2>Sell gold in Maryland with a second quote</h2>
<p>Take 15 grams of 14K, a heavy chain: its metal is worth ${h.live(h.at(15, 583.3))} at ${h.when}. Two offers for it a few blocks apart can differ widely, and only a second quote reveals that. The ${h.a('near', 'comparison tool')} sets them side by side.</p>
<h2>Greater than $1,000 in § 11-214.1</h2>
<p>Maryland’s line is a strict inequality, and it applies to the sale price of the bullion or coins. The text also excludes jewelry and works of art by name, so a coin set in a pendant or a sculpture in silver stays taxable whatever its weight.</p>
<p>The ${h.a('salestax', 'bullion sales tax page')} puts Maryland next to the other threshold states, Connecticut and New York.</p>
`,
});
