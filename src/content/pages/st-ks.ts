import { definePage } from '../../lib/page-types';
export default definePage({
  id: "st-ks", group: "states", order: 64, tool: "salestax", toolProps: {"state": "KS"}, kind: 'outil',
  related: ["offer", "k18", "salestax", "chart"], sources: [],
  extraSources: [{"name": "Kansas: K.S.A. 79-3606(mmmm)", "url": "https://www.ksrevisor.gov/statutes/chapters/ch79/079_036_0006.html"}],
  slug: "sell-gold-kansas", nav: "Sell gold in Kansas", card: "Kansas: bullion exempt at any amount, with the statute",
  title: "Sell Gold in Kansas: Melt Value and Bullion Sales Tax",
  description: "Selling or buying gold in Kansas: melt value at the live spot price, and the bullion sales tax rule in K.S.A. 79-3606(mmmm), read on the official statute.",
  h1: "Sell gold in Kansas: value and tax rules",
  resume: "To sell gold in Kansas, have the melt value of your pieces before any offer: the calculator works it out at the spot price and prints the time. On the buying side, Kansas law is among the broadest read for this site. K.S.A. 79-3606, item (mmmm), exempts all sales of gold or silver coins and of palladium, platinum, gold or silver bullion, defining bullion as bars, ingots or commemorative medallions whose value depends on their metal rather than their form. There is no minimum amount and no purity test in the text. Fabricated items such as jewelry fall outside it. The exemption is for purchases; selling your gold to a Kansas dealer is not taxed. US Gold Karat read the statute on the Kansas Revisor of Statutes’ website and is independent of every dealer.",
  faqs: [
    { q: "Does Kansas charge sales tax on platinum or palladium bars?", a: "No. Item (mmmm) of K.S.A. 79-3606 lists palladium, platinum, gold and silver bullion together, so bars and ingots of any of the four metals are exempt from Kansas sales tax. Coins are covered only when they are of gold or silver, as the wording reads." },
    { q: "Can a Kansas buyer pay me less for 18K than for 14K?", a: "Per gram of metal, an honest offer for 18K should be higher, because 18K holds 750 parts gold in 1,000 against 583.3. If a buyer pays the same per gram for both, sell the 18K elsewhere. Turning each offer into a share of melt value makes the gap obvious." },
    { q: "Is gold jewelry ever exempt in Kansas?", a: "Not under this item. Its definition of bullion rests on value coming from metal content rather than form, and jewelry is sold for its form as much as for its metal. A jewelry purchase in Kansas is taxed like any other retail sale, whatever its karat." },
  ],
  body: (h) => `
<h2>Sell gold in Kansas by karat, not by the pile</h2>
<p>Ask for a price per karat. At ${h.when}, 6 grams of 18K are worth ${h.live(h.at(6, 750))} as metal and 6 grams of 14K ${h.live(h.at(6, 583.3))}. A buyer who weighs both together and quotes one figure leaves you unable to see which karat paid less. The ${h.a('offer', 'offer checker')} handles each karat on its own.</p>
<h2>Item (mmmm) of K.S.A. 79-3606</h2>
<p>The Kansas wording covers coins without asking whether they are legal tender in a particular country, and bullion of four metals without a purity floor. Its one condition is the definition: value dependent on content, not form.</p>
<p>The ${h.a('salestax', 'state comparison')} shows how much narrower some other states are.</p>
`,
});
