import { definePage } from '../../lib/page-types';
export default definePage({
  id: "silver", group: "silver", order: 30, tool: "silver", toolProps: {"fineness": 999, "grams": 31.1034768}, kind: 'outil',
  related: ["sterling", "eagle", "dwt", "salestax"], sources: ["ftc235", "usc5112", "nistB9"],
  slug: "silver-price-per-gram", nav: "Silver price per gram", card: "Fine, sterling and coin silver per gram, pennyweight and troy ounce",
  title: "Silver Price per Gram Today: Fine, Sterling and Coin Silver",
  description: "Silver price per gram in dollars at the live spot price, with the time shown: fine 999, sterling 925 and coin silver 900, per gram, pennyweight and troy ounce.",
  h1: "Silver price per gram today",
  resume: "The silver price per gram is the spot price of silver, quoted per troy ounce, divided by 31.1, the grams in a troy ounce. This page reads that spot price from gold-api.com, shows its time, and turns it into a value for any weight of fine, sterling or coin silver. Fine silver is 999 parts in 1,000 and is the standard of bars, rounds and the American Silver Eagle. Sterling must be at least 925 parts silver under the federal guides, and coin silver at least 900. Choose the standard, type the weight in grams, troy ounces, pennyweights or regular ounces, and you get the melt value. Silver is far cheaper per gram than gold, so buyers often pay a lower share of melt on small lots: the refining cost is about the same, but the metal is worth less. US Gold Karat is independent and sells no silver.",
  faqs: [
    { q: "How much is a gram of silver worth?", a: "A gram of fine silver is worth the spot price per troy ounce divided by {oz2}. The calculator shows it at the price of the moment, with the time. A gram of sterling is worth 92.5% of that, and a gram of coin silver 90%, since the rest of the alloy is copper." },
    { q: "How much silver is in an American Silver Eagle?", a: "Federal law sets it at {se.g} of .999 fine silver, which is one troy ounce. Its melt value is therefore close to the spot price. Dealers sell Silver Eagles above melt and buy them back a little below or around it." },
    { q: "Why do buyers pay less of melt value for silver than for gold?", a: "Because handling and refining cost about the same per ounce for both metals, while an ounce of silver is worth a small fraction of an ounce of gold. On a small lot of silver, fixed costs eat a larger share of the value, so offers as a percentage of melt run lower." },
  ],
  body: (h) => `
<h2>Silver price per gram today, by standard and weight</h2>
${h.table(['Standard', '1 gram', '1 troy ounce', '1 kilogram'], [[999, 'Fine silver (999)'], [925, 'Sterling (925)'], [900, 'Coin silver (900)']].map(([f, n]) => [n, h.live(h.at(1, Number(f), 'XAG'), 'XAG', 'usd2'), h.live(h.at(31.1034768, Number(f), 'XAG'), 'XAG', 'usd2'), h.live(h.at(1000, Number(f), 'XAG'), 'XAG')]), 'At the silver price of ' + h.whenOf('XAG') + '.')}
<h2>Silver marks in the United States</h2>
<p>Under the ${h.src('ftc235', 'FTC silver guide')}, the word silver alone must be preceded by its fineness, “sterling” requires at least 925 parts per thousand and “coin silver” at least 900. The ${h.src('usc5112', 'coinage statute')} sets the Silver Eagle at 31.103 grams of .999 silver. Silver plate, marked EP, EPNS or “silverplate”, is a thin coat over base metal and has almost no melt value.</p>
<p>For forks, spoons and tea sets marked sterling, see the ${h.a('sterling', 'sterling silver page')}, which explains how to estimate the silver in weighted pieces.</p>
`,
});
