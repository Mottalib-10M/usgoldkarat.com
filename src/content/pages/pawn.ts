import { definePage } from '../../lib/page-types';
export default definePage({
  id: "pawn", group: "sell", order: 22, tool: "quote", toolProps: {"k": 14, "quoteUnit": "dwt"}, kind: 'outil',
  related: ["offer", "dwt", "near", "k10"], sources: ["nistB9"],
  slug: "pawn-shop-gold-prices", nav: "Pawn shop gold prices", card: "A posted price per pennyweight or per gram, turned into a share of melt",
  title: "Pawn Shop Gold Prices: Check a Price per Pennyweight Today",
  description: "Pawn shop gold prices posted per pennyweight or per gram, turned into a share of melt value at the live spot price, for 10K, 14K, 18K, 22K and 24K gold.",
  h1: "Pawn shop gold prices: check a posted price",
  resume: "Pawn shop gold prices are usually posted on a board or a website as dollars per pennyweight, karat by karat, and almost never as a share of the gold. This checker reverses that. Choose the karat, say whether the price is per pennyweight or per gram, type it, and it shows what share of the melt value that price pays at the spot price read from gold-api.com, with its time shown. It also converts the posted price to the other unit, so a pawn shop that quotes $40 per dwt can be set against a gold buyer that quotes per gram. A pawn shop can buy your gold outright or lend against it: this page covers an outright sale. A pawn loan is a different deal with interest and fees, and the gold is usually valued lower. US Gold Karat is an independent calculator and is not connected to any pawn shop.",
  faqs: [
    { q: "Is selling gold to a pawn shop a good idea?", a: "It can be quick and local, but the price is often lower than a dedicated gold buyer's because the shop resells through a refiner too. Check the posted price as a share of melt here, then ask at least one other buyer the same day before you decide." },
    { q: "What is the difference between pawning and selling gold?", a: "Selling transfers the gold for good. Pawning is a loan: the shop holds your gold, lends you part of its value and charges interest and fees; if you do not repay in time, it keeps the gold. Rules on pawn loans are set by each state." },
    { q: "Why does the pawn shop price change from day to day?", a: "Because it follows the spot price of gold, which moves with the markets on every trading day. A board price that has not changed for a week may be out of date in either direction. The share of melt value is a steadier way to compare shops." },
  ],
  body: (h) => `
<h2>Reading a pawn shop gold board</h2>
<p>A typical board lists 10K, 14K and 18K with a dollar amount each, per pennyweight. The amount for 14K should be about 1.4 times the 10K figure, because 14K holds {f.14} parts gold in 1,000 against {f.10}. When it is much less than that, the shop pays a lower share on the higher karat: sell 10K there, and 14K elsewhere.</p>
${h.table(['Karat', 'Melt value per dwt', 'Melt value per gram'], h.P.gold.filter((g) => [10, 14, 18].includes(g.k)).map((g) => [g.k + 'K', h.live(h.at(1.55517384, g.fineness), 'XAU', 'usd2'), h.live(h.at(1, g.fineness), 'XAU', 'usd2')]), 'At the spot price of ' + h.when + '.')}
<h2>Units and scales</h2>
<p>A pennyweight is 24 grains, 1.555 grams, defined from the grain in the ${h.src('nistB9', 'NIST conversion tables')}. Pawn shops must use legal-for-trade scales under state weights and measures law; you can ask to see the reading. Convert any figure with the ${h.a('dwt', 'pennyweight converter')}, or check a lump-sum offer with the ${h.a('offer', 'cash for gold checker')}.</p>
`,
});
