import { definePage } from '../../lib/page-types';
export default definePage({
  id: "k24", group: "gold", order: 14, tool: "karat", toolProps: {"k": 24, "grams": 31.1034768}, kind: 'outil',
  related: ["k22", "eagle", "dwt", "salestax"], sources: ["ftc233", "usc5112", "nistB9"],
  slug: "24k-gold-price-per-gram", nav: "24K gold price per gram", card: "999 and 9999: pure gold per gram, per ounce and in bars",
  title: "24K Gold Price per Gram Today: Pure Gold in US Dollars",
  description: "24K gold price per gram, per pennyweight and per troy ounce in dollars at the live spot price: 999 against 9999, bars, rounds and the Buffalo coin explained.",
  h1: "24K gold price per gram today",
  resume: "The 24K gold price per gram is, to within a few cents, the spot price of gold divided by 31.1, the number of grams in a troy ounce. 24 karat means pure gold: the federal jewelry guides say the word gold used alone, without a karat, may only describe fine 24 karat gold. In practice pure gold is sold at two purities: 999, three nines, common in jewelry and older bars, and 9999, four nines, the standard of modern bars and of the American Buffalo coin. The calculator values 24K at {f.24} parts in 1,000 and uses the spot price read from gold-api.com, with its time shown. Type a weight in grams, pennyweights or troy ounces. Bars and coins carry a dealer premium above this figure when you buy them and sell for a little under it, so the melt value is the reference point for both. US Gold Karat does not sell bullion and links to no dealer.",
  faqs: [
    { q: "Is 24K the same as 999 gold?", a: "Very nearly. 24 karat means pure gold, and since no metal can be refined to absolute purity the market sells it as 999 or 9999 parts in 1,000. The difference is 0.09%, a few cents per gram. The calculator uses 999; for a 9999 bar the value is a hair higher." },
    { q: "How much is one troy ounce of 24K gold worth?", a: "It is worth the spot price, the figure markets quote per troy ounce of pure gold. The troy ounce is 31.1035 grams, heavier than the ordinary kitchen ounce of 28.35 grams, so do not weigh bullion on a scale set to ounces and multiply by the spot price." },
    { q: "Why is 24K jewelry rare in the United States?", a: "Pure gold is too soft for most rings and chains: it scratches and bends. American jewelry is mostly 10K and 14K, with 18K for finer pieces. 24K turns up as bars, rounds, coins and some jewelry bought in Asia, which is usually tested by the buyer before any offer." },
  ],
  body: (h) => `
<h2>24K gold price per gram today, by pennyweight and ounce</h2>
${h.table(['Quantity', 'Weight in grams', '24K value'], [['1 gram', 1], ['1 pennyweight', 1.55517384], ['1 troy ounce', 31.1034768], ['10 troy ounces', 311.034768], ['1 kilogram bar', 1000]].map(([n, g]) => [n, h.num(Number(g), 3), h.live(h.at(Number(g), 999))]), 'At 999 parts in 1,000 and the price of ' + h.when + '.')}
<h2>Bars, rounds and coins</h2>
<p>A bar or round stamped 999 or 9999 carries its weight and purity, so its melt value is exact. The ${h.src('usc5112', 'coinage statute')} sets the one-ounce Buffalo at 99.99 percent gold, and the ${h.src('nistB9', 'NIST conversion table')} fixes the troy ounce at 31.1035 grams. Dealers sell above melt and buy below it; the gap is their spread, which you can measure with the ${h.a('eagle', 'coin melt calculator')} by typing the price you were quoted.</p>
<p>Several states exempt bullion from sales tax, some only above a dollar threshold. The ${h.a('salestax', 'bullion sales tax page')} lists the states whose statute we have read.</p>
`,
});
