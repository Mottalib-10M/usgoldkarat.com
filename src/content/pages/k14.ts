import { definePage } from '../../lib/page-types';
export default definePage({
  id: "k14", group: "gold", order: 10, tool: "karat", toolProps: {"k": 14, "grams": 10}, kind: 'outil',
  related: ["k10", "k18", "offer", "pawn"], sources: ["ftc233", "usc295", "nistB9"],
  slug: "14k-gold-price-per-gram", nav: "14K gold price per gram", card: "583.3 parts gold in 1,000, the most common US jewelry karat, by gram and pennyweight",
  title: "14K Gold Price per Gram Today: Melt Value in US Dollars",
  description: "14K gold price per gram and per pennyweight at the live spot price in dollars, with the time shown: why 14K is 583.3 and not 585, and what a buyer pays.",
  h1: "14K gold price per gram today",
  resume: "The 14K gold price per gram is shown below, at the live price: 14K is about 58% gold, and buyers pay only for that gold. Type the weight of your chain, ring or bracelet below to see what your piece is worth at the spot price, the price traders pay for pure gold, read from gold-api.com with its time shown. The result is the melt value: what the gold in the piece is worth before anyone takes a margin. Many 14K pieces made abroad are stamped 585 rather than 14K; that is the European standard, a hair richer than the American 583.3, and the difference is cents on a typical ring. Weigh in grams or in pennyweights (dwt), the unit most US gold buyers quote in. US Gold Karat is an independent site that does not buy gold, so it can show you the full figure before you hear an offer.",
  faqs: [
    { q: "Why is my 14K ring stamped 585 instead of 14K?", a: "Jewelry made for European or international markets is often marked in parts per thousand, and 585 is the European standard for 14 karat. Fourteen twenty-fourths is 583.3, so a 585 piece holds slightly more gold. Both are 14 karat for an American buyer, who will usually test the metal before paying for it." },
    { q: "How much gold is in a 14K chain that weighs 20 grams?", a: "About 11.67 grams of pure gold: 20 grams times 583.3 parts in 1,000. Clasps are often made of a lower karat or of steel, and a hollow chain weighs less than it looks, so the scale weight of the whole chain sets a ceiling on the gold rather than an exact figure." },
    { q: "Is a 14K piece allowed to hold a little less gold than 583.3?", a: "Slightly. Federal stamping law lets the metal fall {tol.gold} parts per thousand below the mark when a solder-free part is tested, and {tol.goldSolder} parts when the whole piece, solder included, is assayed. Anything lower is falsely stamped. The calculator values the piece at the full 583.3 and shows the legal floor beside it." },
  ],
  body: (h) => `
<h2>14K gold price per gram today, by weight</h2>
${h.table(['Weight', 'Pure gold inside', 'Melt value of 14K'], [1, 2, 5, 10, 20, 50].map((g) => [g + ' g', h.num(g * 0.5833, 2) + ' g', h.live(h.at(g, 583.3))]), 'Worked out at the same gold price as the calculator above (' + h.when + ').')}
<p>A pennyweight is 1.555 grams, so a 14K piece weighed at a pawn shop in pennyweights is worth ${h.live(h.at(1.55517384, 583.3), 'XAU', 'usd2')} per dwt at the same price. Convert any posted price with the ${h.a('dwt', 'pennyweight converter')}.</p>
<h2>Why 14K became the American standard</h2>
<p>Most gold jewelry sold in the United States is 14 karat: hard enough to wear daily, rich enough in gold to keep its color, and cheaper per gram than 18K. The Federal Trade Commission's ${h.src('ftc233', 'jewelry guides')} require the karat to sit right before the word gold, as in “14K Gold” or “14 Kt.”, and the ${h.src('usc295', 'National Gold and Silver Stamping Act')} sets how far the real metal may fall below the mark. A piece stamped 14K that tests at 10K was falsely marked, and a buyer will price it at what it really contains.</p>
<h2>From melt value to an offer</h2>
<p>No buyer pays the full melt value, because the gold still has to be refined and resold. Type the offer you were given into the ${h.a('offer', 'offer checker')} to see it as a share of the metal, or turn a per-pennyweight price into a percentage with the ${h.a('pawn', 'pawn shop price checker')}.</p>
`,
});
