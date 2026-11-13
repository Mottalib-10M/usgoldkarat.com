import { definePage } from '../../lib/page-types';
export default definePage({
  id: "scrap", group: "sell", order: 20, tool: "scrap", kind: 'outil',
  related: ["offer", "near", "k10", "k14"], sources: ["ftc233", "usc295"],
  slug: "scrap-gold-calculator", nav: "Scrap gold calculator", card: "Mixed karats in one lot: the melt value and what 60% to 90% of it pays",
  title: "Scrap Gold Calculator: Melt Value of Mixed Karats Today",
  description: "Scrap gold calculator for a drawer of mixed 10K, 14K, 18K and 22K pieces: total melt value at the live spot price, and what a buyer pays at 60% to 90% of it.",
  h1: "Scrap gold calculator for mixed karats",
  resume: "A scrap gold calculator has to deal with what people really bring to a buyer: a broken 10K chain, a 14K earring without its pair, an 18K ring, all at once. Enter the weight of each karat below, in grams or pennyweights, and the calculator adds up the pure gold in the whole lot and values it at the spot price read from gold-api.com, with its time shown. That total is the melt value. Underneath, it shows what a buyer paying 60%, 70%, 80% or 90% of melt would hand you, two reference points to read your quotes against rather than a rate anybody publishes. If you already have an offer for the lot, type it at the bottom to see its share. Sort pieces by stamp before you weigh: putting a 10K chain in with 14K costs nothing here, but it does if a buyer weighs everything together at the lower karat. US Gold Karat buys no gold.",
  faqs: [
    { q: "Should I sell scrap gold sorted by karat or all together?", a: "Sorted. A buyer who weighs a mixed pile usually prices it at the lowest karat in it, or tests a few pieces and averages. Separating 10K, 14K and 18K and having each group weighed and priced on its own makes the payout match the gold you actually have." },
    { q: "What counts as scrap gold?", a: "Anything sold for its metal rather than as jewelry: broken chains, single earrings, outdated rings, dental gold, bent class rings. Pieces with designer signatures or valuable stones are better shown to a jeweler first, because they may be worth more whole than melted." },
    { q: "How do I weigh scrap gold at home?", a: "Use a kitchen or postal scale set to grams, ideally one that reads to a tenth of a gram. Weigh each karat group separately. Remove stones, pearls and steel clasps when you can; leave them in and the result is a ceiling, since they add weight but no gold." },
  ],
  body: (h) => `
<h2>What a scrap gold buyer does with your lot</h2>
<p>Scrap buyers do not resell your pieces: they send them to a refiner, who melts the lot, assays the result and pays them for the pure gold recovered, minus the refiner's fee. Their offer to you covers that fee, the time until they are paid, the risk that the price falls meanwhile, and their own costs and profit. That is why no buyer pays 100% of melt, and why buyers who handle volume can pay a higher share.</p>
<h2>Reading a scrap gold quote</h2>
<p>For a lot of 6 g of 10K and 8 g of 14K, the melt value at ${h.when} is ${h.live(h.at(6, 416.7) + h.at(8, 583.3))}. A quote of ${h.usd(Math.round((h.at(6, 416.7) + h.at(8, 583.3)) * 0.6 / 5) * 5)} is about ${h.live(Math.round((h.at(6, 416.7) + h.at(8, 583.3)) * 0.6 / 5) * 5 / (h.at(6, 416.7) + h.at(8, 583.3)), 'XAU', 'pct')} of it. Get a second quote the same day and compare both with the ${h.a('near', 'quote comparison tool')}.</p>
<p>Under the ${h.src('usc295', 'Stamping Act')} a karat mark can overstate gold content by only a few parts per thousand, so a correctly stamped lot should test close to its marks. Large differences usually come from unmarked pieces or ${h.a('filled', 'gold-filled items')} slipped into the pile.</p>
`,
});
