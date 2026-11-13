import { definePage } from '../../lib/page-types';
export default definePage({
  id: "st-mn", group: "states", order: 66, tool: "salestax", toolProps: {"state": "MN"}, kind: 'outil',
  related: ["scrap", "k24", "salestax", "filled"], sources: [],
  extraSources: [{"name": "Minnesota: Minn. Stat. § 297A.67, subd. 34", "url": "https://www.revisor.mn.gov/statutes/cite/297A.67"}],
  slug: "sell-gold-minnesota", nav: "Sell gold in Minnesota", card: "Minnesota: bullion exempt at any amount, with the statute",
  title: "Sell Gold in Minnesota: Melt Value and Bullion Sales Tax",
  description: "Selling or buying gold in Minnesota: melt value at the live spot price, and the bullion sales tax rule in Minn. Stat. § 297A.67, subd. 34, read on the statute.",
  h1: "Sell gold in Minnesota: value and tax rules",
  resume: "To sell gold in Minnesota, know the melt value before you hear an offer; the calculator gives it at the spot price and prints the time. For buying, Minnesota’s exemption is narrow and precise. Section 297A.67, subdivision 34, exempts precious metal bullion, which it defines as bars or rounds of at least 99.9 percent gold, silver, platinum or palladium by weight, marked with weight, purity and content. It excludes jewelry, works of art and scrap metal, and the legislature stated its aim: to treat bullion like stocks, bonds and funds that hold bullion. Coins are not named in the definition, and how they are treated is a matter for the Minnesota Department of Revenue. Selling gold is not taxed. US Gold Karat read the statute on the Minnesota Revisor’s site and has no link with any dealer.",
  faqs: [
    { q: "Is a 90% silver round exempt in Minnesota?", a: "Not under subdivision 34 as read: its bars and rounds must be at least 99.9 percent metal by weight and marked with weight, purity and content. A round of lower purity, or one with no markings, falls outside the definition and is taxed as an ordinary retail sale." },
    { q: "Why does Minnesota exclude scrap metal?", a: "The statute says so in terms, together with jewelry and works of art. Its stated purpose is to treat investment bullion like securities, and scrap is not sold as an investment product. Selling your own scrap gold is a different transaction, which involves no sales tax for you." },
    { q: "How do I value a box of mixed scrap before selling in Minnesota?", a: "Sort the pieces by stamp, weigh each group in grams, and enter them in the scrap gold calculator. It totals the pure gold and values it at the spot price, then shows what 60% to 90% of that would be, as points to read each quote against." },
  ],
  body: (h) => `
<h2>Sell gold in Minnesota: sort the scrap first</h2>
<p>A scrap lot of 4 grams of 10K, 9 grams of 14K and 3 grams of 18K holds ${h.live(h.at(4, 416.7) + h.at(9, 583.3) + h.at(3, 750))} of gold at ${h.when}. Bringing it sorted, with your own weights, is the quickest way to spot a ticket that records the wrong karat. The ${h.a('scrap', 'scrap gold calculator')} takes all three groups at once.</p>
<h2>Subdivision 34: purity and markings</h2>
<p>Minnesota asks two things of exempt bullion: 99.9 percent purity by weight and a stamp showing weight, purity and content. Four-nines bars from a refiner meet both. Unmarked pieces and lower purities do not, whatever their metal value.</p>
<p>Iowa and Missouri are broader; see the ${h.a('salestax', 'state comparison')}.</p>
`,
});
