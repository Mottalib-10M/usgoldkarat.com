import { definePage } from '../../lib/page-types';
export default definePage({
  id: "sterling", group: "silver", order: 31, tool: "silver", toolProps: {"fineness": 925, "grams": 500}, kind: 'outil',
  related: ["silver", "scrap", "near", "offer"], sources: ["ftc235", "usc296"],
  slug: "sterling-silver-price-per-gram", nav: "Sterling silver price per gram", card: "925 silver: flatware, tea sets and jewelry, and what weighted pieces really hold",
  title: "Sterling Silver Price per Gram Today: 925 Melt Value in USD",
  description: "Sterling silver price per gram and per troy ounce at the live spot price: what 925 means, how much silver a flatware set or a weighted candlestick really holds.",
  h1: "Sterling silver price per gram today",
  resume: "The sterling silver price per gram is 92.5% of the price of a gram of fine silver, because sterling must contain at least 925 parts silver in 1,000 under federal law. Type the weight of your flatware, tea set or jewelry below to see its melt value at the spot price read from gold-api.com, with the time shown. Sterling flatware is the most common silver Americans sell: a service for eight or twelve can weigh several pounds. Watch for two traps. Knives and some candlesticks are “weighted”: only a thin sterling shell surrounds a filler of cement or resin, so their scale weight is mostly not silver. And silver-plated items, often marked EP or EPNS, contain almost no silver at all. Weigh forks, spoons and solid pieces separately, and count knife handles at a fraction of their weight. US Gold Karat is an independent site and buys no silver.",
  faqs: [
    { q: "How much is a sterling silver flatware set worth?", a: "Weigh the solid pieces, forks, spoons and serving spoons, and multiply by 925 parts in 1,000 and the silver price: the calculator does it. Knives with hollow handles are mostly filler; buyers often count only a small part of their weight. Pattern and maker can make a set worth more than melt to a collector." },
    { q: "What does 925 mean on silver?", a: "It means 925 parts silver in 1,000, the sterling standard. The federal stamping law forbids marking anything sterling unless it holds at least 925 parts silver, with a tolerance of {tol.silver} parts per thousand on solder-free parts. Pieces marked 925 or STERLING are valued the same way." },
    { q: "Is silver plate worth anything as metal?", a: "Very little. Plating is a microscopic layer of silver over copper or nickel alloy, so a whole tray may hold less than a gram of silver. Buyers of melt metal usually decline it. Sell plated pieces as household goods, not as silver." },
  ],
  body: (h) => `
<h2>Sterling silver price per gram today, for common items</h2>
${h.table(['Item', 'Typical solid silver weight', 'Melt value at 925'], [['Dinner fork', 50], ['Teaspoon', 25], ['Service of 8, forks and spoons', 1200], ['Small bowl', 200]].map(([n, g]) => [n, h.num(Number(g), 0) + ' g', h.live(h.at(Number(g), 925, 'XAG'), 'XAG')]), 'Weights are examples; values at the silver price of ' + h.whenOf('XAG') + '.')}
<h2>What the law says about the word sterling</h2>
<p>The ${h.src('usc296', 'National Gold and Silver Stamping Act')} allows the word sterling only on articles of at least 925 parts silver, and “coin” only from 900. It allows four parts per thousand of shortfall on a part tested without solder and ten parts when the whole piece is assayed with its solder. The ${h.src('ftc235', 'FTC silver guide')} repeats the standards and forbids calling plated items sterling.</p>
<p>Mixed lots of sterling and coin silver can be valued one standard at a time with the selector above. For jewelry that mixes gold and silver, value the gold with the ${h.a('scrap', 'scrap gold calculator')}.</p>
`,
});
