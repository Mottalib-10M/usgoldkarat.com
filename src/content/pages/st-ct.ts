import { definePage } from '../../lib/page-types';
export default definePage({
  id: "st-ct", group: "states", order: 61, tool: "salestax", toolProps: {"state": "CT"}, kind: 'outil',
  related: ["near", "eagle", "salestax", "k18"], sources: [],
  extraSources: [{"name": "Connecticut: Conn. Gen. Stat. § 12-412(45)", "url": "https://www.cga.ct.gov/current/pub/chap_219.htm"}],
  slug: "sell-gold-connecticut", nav: "Sell gold in Connecticut", card: "Connecticut: bullion exempt from $1,000, with the statute",
  title: "Sell Gold in Connecticut: Melt Value and Bullion Sales Tax",
  description: "Selling or buying gold in Connecticut: melt value at the live spot price, and the bullion sales tax rule in Conn. Gen. Stat. § 12-412(45), read on the statute.",
  h1: "Sell gold in Connecticut: value and tax rules",
  resume: "To sell gold in Connecticut, begin with the melt value of what you have, worked out on this page at the spot price with its time, and then hear offers. Buying is where Connecticut law has a catch. Section 12-412(45) of the General Statutes exempts gold and silver bullion, gold or silver legal tender traded on its metal value, and rare or antique coins, but not in a sale where the total value is less than one thousand dollars. A $999 purchase is taxed in full; one of $1,000 or more is exempt. The threshold applies to the whole sale, so buyers who want a few small coins often group them into one order. None of this touches selling: a dealer buying your gold charges you no sales tax. US Gold Karat read the text on the Connecticut General Assembly’s website and has no tie to any buyer.",
  faqs: [
    { q: "Does Connecticut tax a gold coin purchase under $1,000?", a: "Yes. Section 12-412(45) lifts the exemption for any sale in which the total value of the bullion or legal tender sold is less than $1,000. A single tenth-ounce Gold Eagle or a few silver rounds will usually fall below that line, so the ordinary sales tax applies to that purchase." },
    { q: "Are rare coins exempt in Connecticut?", a: "The paragraph names rare or antique coins alongside bullion, so collector coins can qualify too, subject to the same $1,000 floor per sale. Whether a given coin is rare is for the dealer to show. Melt value is still a useful floor when you sell one: the coin cannot be worth less than its metal." },
    { q: "How should I compare two Connecticut gold buyers?", a: "Take the same pieces to both on the same day, note the weight and karat each records, and type both offers into the comparison tool. It shows each as a share of melt value. A buyer who records a lower karat than the stamp should explain why, ideally by showing you the test." },
  ],
  body: (h) => `
<h2>Sell gold in Connecticut with the numbers in hand</h2>
<p>For 8 grams of 18K, a common weight for a pair of rings, melt value at ${h.when} is ${h.live(h.at(8, 750))}. Each quote you hear can be set beside it in the ${h.a('near', 'quote comparison tool')}. Bring a photo ID; buyers commonly record who sells to them.</p>
<h2>The $1,000 line in § 12-412(45)</h2>
<p>Connecticut writes its threshold as an exception: the exemption does not apply where the total value sold is less than one thousand dollars. So $1,000 exactly is exempt, unlike Maryland and New York, which require more than $1,000. Two purchases on different days count separately; combining them into one order is what moves a buyer over the line.</p>
<p>See how other states draw the line on the ${h.a('salestax', 'bullion sales tax comparison')}.</p>
`,
});
