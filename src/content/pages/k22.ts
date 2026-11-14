import { definePage } from '../../lib/page-types';
export default definePage({
  id: "k22", group: "gold", order: 13, tool: "karat", toolProps: {"k": 22, "grams": 10}, kind: 'outil',
  related: ["k24", "eagle", "chart", "offer"], sources: ["ftc233", "usc5112"],
  slug: "22k-gold-price-per-gram", nav: "22K gold price per gram", card: "916 parts in 1,000: South Asian and Gulf jewelry and the Gold Eagle alloy",
  title: "22K Gold Price per Gram Today: 916 Gold in US Dollars",
  description: "22K gold price per gram in dollars at the live spot price, timed: what 916 means, bangles and wedding sets from South Asia, and why a Gold Eagle is 22 karat.",
  h1: "22K gold price per gram today",
  resume: "The 22K gold price per gram is shown below, at the live price: 22K is about 92% gold, usually stamped 916. Type the weight of your bangles, chain or wedding set below to see what the gold is worth at the spot price of the moment, with the time shown. In the United States 22 karat is mostly found in jewelry bought in India, Pakistan, Bangladesh or the Gulf, where families buy gold as savings and expect to sell it back at close to its metal value. It is soft and deep yellow, and it is often weighed in grams or tolas rather than pennyweights. The same alloy is used for the American Gold Eagle coin, whose one ounce of pure gold is mixed with copper and silver to make a coin that weighs more than an ounce. US Gold Karat is an independent site and shows the metal value only: no buyer pays to appear here.",
  faqs: [
    { q: "What does 916 stamped on gold jewelry mean?", a: "It means 916 parts gold in 1,000, which is 22 karat. The mark is used in India and the Gulf, often next to a hallmark logo of the country where it was tested. Twenty-two twenty-fourths is 916.7, and the stamp drops the fraction. Value a 916 piece as 22K." },
    { q: "Do American gold buyers pay more for 22K jewelry?", a: "They pay for the gold inside, so a gram of 22K should bring more than a gram of 14K. Some local buyers apply the same percentage to every karat; others pay less on high karats because they misjudge them. Turn each quote into a share of melt value to see which is which." },
    { q: "Is a Gold Eagle coin 22 karat?", a: "Yes. Federal law sets the one-ounce Gold Eagle at {eagle.g} for one troy ounce of fine gold, which works out to about 916.7 parts gold in 1,000, the 22 karat alloy. Its value is set by the full ounce of gold it contains, not by its weight." },
  ],
  body: (h) => `
<h2>22K gold price per gram today, for common jewelry weights</h2>
${h.table(['Item', 'Typical weight', '22K melt value'], [['Thin bangle', 10], ['Wedding necklace', 40], ['Pair of earrings', 5], ['One tola (11.66 g)', 11.6638038]].map(([n, g]) => [n, h.num(Number(g), 2) + ' g', h.live(h.at(Number(g), 916.7))]), 'Weights are examples; melt values at ' + h.when + '.')}
<p>A tola, the South Asian unit of 180 grains, is 11.66 grams. Jewelers in India quote 22K per 10 grams or per tola, so a receipt from home can be compared with the per-gram value here once you convert it.</p>
<h2>Selling 22K jewelry in the United States</h2>
<p>American buyers usually test 22K with acid or an X-ray fluorescence scanner because the mark comes from another country's system. The ${h.src('ftc233', 'FTC guides')} require karat marks to be accurate, but they do not certify foreign hallmarks. Expect a test, ask to see the result, and check the weight they record.</p>
<p>Coins and jewelry of the same karat are valued differently: a ${h.a('eagle', 'Gold Eagle')} is priced on its stated ounce of fine gold, set by ${h.src('usc5112', 'federal coinage law')}, while a bangle is priced on what testing shows.</p>
`,
});
