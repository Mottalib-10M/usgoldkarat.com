import { definePage } from '../../lib/page-types';
export default definePage({
  id: "chart", group: "gold", order: 15, tool: "board", toolProps: {"k": 14, "grams": 1}, kind: 'outil',
  related: ["k10", "k14", "k18", "dwt"], sources: ["ftc233", "usc295", "ftc235"],
  slug: "gold-karat-chart", nav: "Gold karat chart", card: "Every karat with its stamp, its share of gold and today’s price per gram",
  title: "Gold Karat Chart: Purity, Stamps and Price per Gram Today",
  description: "Gold karat chart with each karat’s stamp, share of pure gold and price per gram and pennyweight at the live spot price: 10K, 12K, 14K, 18K, 22K and 24K.",
  h1: "Gold karat chart with today’s prices",
  resume: "This gold karat chart lists every karat you are likely to find stamped on American and imported jewelry, the number that may appear instead of the karat, the share of pure gold it stands for, and what a gram and a pennyweight of it are worth at the spot price shown with its time. The rule behind the chart is simple: karat counts gold in twenty-fourths, so 14K is 14/24 gold and 18K is 18/24. Stamps in parts per thousand round those fractions, which is why 14K can read 583 or 585 and 10K can read 417. The calculator above the chart lets you pick a karat and a weight, and it highlights the row you chose. If a piece has no stamp at all, the chart cannot tell you its karat: only a test can. US Gold Karat is an independent site, and the chart prices metal only, not craftsmanship or stones.",
  faqs: [
    { q: "What do the numbers 417, 585 and 750 mean on gold?", a: "They are the gold content in parts per thousand: 417 is 10K, 585 is 14K and 750 is 18K. The numbers are used in Europe and on many imported pieces, while American makers usually stamp the karat. Both describe the same thing and lead to the same value." },
    { q: "Which karat has the most gold?", a: "24K, which is pure gold at 999 or 9999 parts in 1,000. Then come 22K at {f.22}, 18K at {f.18}, 14K at {f.14} and 10K at {f.10}. The higher the karat, the softer and more yellow the metal, and the more each gram is worth." },
    { q: "Does a stamp like GF or GP belong on the karat chart?", a: "No. GF (gold filled), RGP (rolled gold plate) and GP or GEP (gold plated or electroplated) describe a thin gold layer over base metal. The karat next to them is the karat of that layer only. Use the gold filled calculator for those pieces, not the karat chart." },
  ],
  body: (h) => `
<h2>Gold karat chart: stamp, purity and price</h2>
${h.table(['Karat', 'Stamp', 'Pure gold', 'Price per gram', 'Price per dwt'], h.P.gold.map((g) => [g.k + 'K', g.stamp, h.num(g.fineness / 10, 1) + '%', h.live(h.at(1, g.fineness), 'XAU', 'usd2'), h.live(h.at(1.55517384, g.fineness), 'XAU', 'usd2')]), 'Prices at ' + h.when + '; they follow the calculator when the live price loads.')}
<p>12K appears on some older American pieces and on gold-filled layers. Silver is marked differently: “sterling” must hold at least 925 parts silver and “coin silver” 900, under the ${h.src('ftc235', 'FTC silver guide')}.</p>
<h2>How accurate is a karat stamp?</h2>
<p>The ${h.src('usc295', 'National Gold and Silver Stamping Act')} allows a gold article to test up to three parts per thousand below its mark on a part without solder, and up to seven parts for the whole article with its solder. The ${h.src('ftc233', 'FTC jewelry guides')} add that a hollow piece must say so. Neither guarantees an unmarked or foreign piece: that is what the buyer's acid or X-ray test is for.</p>
`,
});
