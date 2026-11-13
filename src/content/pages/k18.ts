import { definePage } from '../../lib/page-types';
export default definePage({
  id: "k18", group: "gold", order: 12, tool: "karat", toolProps: {"k": 18, "grams": 5}, kind: 'outil',
  related: ["k14", "k22", "chart", "offer"], sources: ["ftc233", "usc295"],
  slug: "18k-gold-price-per-gram", nav: "18K gold price per gram", card: "750 parts in 1,000: three quarters gold, European jewelry and watch cases",
  title: "18K Gold Price per Gram Today: 750 Gold Melt Value in USD",
  description: "18K gold price per gram in US dollars at the live spot price, with its time: what 750 means, values by weight, watch cases, and how much a buyer usually keeps.",
  h1: "18K gold price per gram today",
  resume: "The 18K gold price per gram is three quarters of the price of a gram of pure gold, because 18 karat is 18 parts gold out of 24, written {f.18} on the piece. Type the weight below and the calculator shows its melt value in dollars at the spot price read from gold-api.com, with the time of that price. 18K is the usual karat of fine European jewelry, of engagement rings set in yellow or white gold and of luxury watch cases. White 18K gold is the same 750 alloyed with palladium or nickel and usually plated with rhodium: the gold content, and so the value, is the same as yellow 18K of the same weight. Because the share of gold is high, small errors in weight cost more here than with 10K or 14K, so weigh carefully and remove stones where you can. US Gold Karat is an independent calculator, not a buyer: it prints no buying price of its own.",
  faqs: [
    { q: "Is 18K white gold worth the same as 18K yellow gold?", a: "Per gram of metal, yes: both are 750 parts gold in 1,000, and only the other 250 parts differ. A buyer melts both and pays for the gold. Rhodium plating on white gold adds nothing measurable. Heavily set white gold pieces simply contain less metal than their total weight suggests." },
    { q: "What does 750 mean on a ring?", a: "It is the gold content in parts per thousand: 750 parts gold in 1,000, which is 18 karat. The mark is common on pieces made in Europe and on watches. American makers more often stamp 18K or 18KT. The value is worked out the same way from either mark." },
    { q: "How much gold is in an 18K watch case?", a: "Weigh the case alone, without movement, crystal, crown and strap, and multiply by 750 parts in 1,000. Federal law allows watch cases only {tol.gold} parts per thousand of shortfall even when the solder is included, a tighter limit than for other jewelry." },
  ],
  body: (h) => `
<h2>18K gold price per gram today, by weight</h2>
${h.table(['Weight', 'Pure gold', '18K value'], [2, 3.5, 5, 7, 10, 25].map((g) => [g + ' g', h.num(g * 0.75, 3) + ' g', h.live(h.at(g, 750))]), 'At the gold price of ' + h.when + ', the price the calculator uses.')}
<p>A plain 18K wedding band weighs 3 to 7 grams; a heavy signet ring can pass 15 grams. Weigh to a tenth of a gram where you can, because at three quarters gold each tenth is worth ${h.live(h.at(0.1, 750), 'XAU', 'usd2')}.</p>
<h2>18K and the federal tolerance for watch cases</h2>
<p>The ${h.src('usc295', 'Stamping Act')} sets a stricter rule for watch cases and flatware than for other gold articles: assayed as a whole piece, solder included, they may fall no more than three parts per thousand below their mark, against seven for a ring or chain. An 18K case must therefore test at 747 or better. That is why buyers of vintage watches trust the case mark more readily than the mark on old soldered jewelry.</p>
<h2>Selling 18K jewelry</h2>
<p>Signed or designer 18K pieces can be worth more as jewelry than as metal. Get the melt value here first, then ask a jeweler and a gold buyer for quotes, and compare them side by side with the ${h.a('near', 'quote comparison tool')}.</p>
`,
});
