import { definePage } from '../../lib/page-types';
export default definePage({
  id: "k10", group: "gold", order: 11, tool: "karat", toolProps: {"k": 10, "grams": 6}, kind: 'outil',
  related: ["k14", "scrap", "chart", "filled"], sources: ["ftc233", "usc295"],
  slug: "10k-gold-price-per-gram", nav: "10K gold price per gram", card: "417 parts gold in 1,000: class rings, chains and what 10K is really worth",
  title: "10K Gold Price per Gram Today: Value of 10 Karat in Dollars",
  description: "10K gold price per gram and per pennyweight at the live spot price, timed: how much gold a 10 karat class ring or chain holds, and its melt value in dollars.",
  h1: "10K gold price per gram today",
  resume: "The 10K gold price per gram is ten twenty-fourths of a gram of pure gold: {f.10} parts gold in every 1,000, a little over two fifths. The other 58% is silver, copper and zinc, which buyers do not pay for. Enter the weight of your piece below and the calculator turns it into dollars at the spot price of the moment, with its time printed, so you know the melt value before you walk into a store. 10 karat is the karat of most American class rings, of inexpensive chains and of a lot of men's jewelry, because it is hard and holds up to daily wear. The stamp reads 10K, 10KT or 417. Because so little of the piece is gold, the weight matters more than anything else: a heavy 10K class ring can be worth more than a light 18K band. US Gold Karat does not buy gold and takes no commission from anyone who does.",
  faqs: [
    { q: "How much is a 10K gold class ring worth?", a: "Weigh it. A typical men's class ring weighs 15 to 30 grams with its stone, and only the metal counts. Multiply the gold weight by {f.10} parts in 1,000 and by the spot price: the calculator above does it. Remove the stone's weight if you can; a buyer will either pry it out or deduct an estimate." },
    { q: "Is 10K real gold?", a: "Yes. It is a gold alloy that is a little over 41% pure gold, and it is sold as karat gold under the federal jewelry guides when the karat is stamped next to the word gold. It is not plated or filled: the alloy is the same all the way through, so the whole weight counts." },
    { q: "Why do buyers pay less per gram for 10K than for 14K?", a: "Because a gram of 10K holds less gold: {f.10} parts in 1,000 against {f.14}. Per gram of pure gold inside, a fair buyer should pay about the same share for either karat. Compare offers as a percentage of melt value, not as dollars per gram." },
  ],
  body: (h) => `
<h2>10K gold by the pennyweight and the gram</h2>
${h.table(['Weight', '10K melt value', 'Same weight in 14K'], [[1, 1], [5, 5], [10, 10], [1.55517384, 'dwt']].map(([g, l]) => [l === 'dwt' ? '1 dwt (1.555 g)' : g + ' g', h.live(h.at(Number(g), 416.7)), h.live(h.at(Number(g), 583.3))]), 'Melt values at the gold price of ' + h.when + '.')}
<p>Class rings are the most common 10K item brought to buyers. Many are hollow-backed and carry a synthetic stone and a school crest; the gold in them is often 8 to 20 grams once the stone is out. Weigh several pieces together in the ${h.a('scrap', 'scrap gold calculator')}, which adds karats of different fineness in one lot.</p>
<h2>10K gold compared with gold filled</h2>
<p>A chain stamped “1/20 10K GF” is not 10K gold: it is base metal with a layer of 10K that makes up a twentieth of the weight, as the ${h.src('ftc233', 'FTC jewelry guides')} define it. Its gold is worth a small fraction of a solid 10K chain of the same weight. The ${h.a('filled', 'gold filled calculator')} works out what that layer contains.</p>
<p>Unmarked pieces that test as gold are often 10K. If you cannot read a mark, value them as 10K so the figure is not too high, and let the buyer test before quoting.</p>
`,
});
