import { definePage } from '../../lib/page-types';
export default definePage({
  id: "near", group: "sell", order: 23, tool: "compare", toolProps: {"k": 14, "grams": 10}, kind: 'outil',
  related: ["offer", "pawn", "scrap", "salestax"], sources: ["irs8300", "ftc233"],
  slug: "sell-gold-near-me", nav: "Sell gold near me: compare quotes", card: "Two or three local quotes for the same gold, compared as shares of melt",
  title: "Sell Gold Near Me: Compare Local Quotes as a Share of Melt",
  description: "Selling gold near you? Type two or three local quotes for the same pieces and see which pays the highest share of melt value at the live spot price, today.",
  h1: "Sell gold near me: compare the quotes you get",
  resume: "When you search to sell gold near me, you get a map of jewelers, pawn shops, coin dealers and cash for gold stores, and each one quotes in its own way. This tool lines their quotes up. Choose the karat, type the weight once, then enter two or three offers for the same pieces: it shows each as a share of the melt value at the spot price read from gold-api.com, with its time, highlights the best, and gives the gap in dollars between the best and the worst. Getting quotes on the same day matters, because the gold price moves daily and a quote from last week is not comparable with one from today. The tool does not list or rate any store and receives nothing from any of them: it only does the arithmetic so the comparison is fair. US Gold Karat is published by Radif Partners and is independent of every buyer.",
  faqs: [
    { q: "Which kind of local buyer pays the most for gold?", a: "It depends on the store, not the category. Coin and bullion dealers often pay well for bars and coins, jewelers sometimes pay more for wearable pieces, and pawn shops are convenient but variable. The only reliable answer is two or three quotes for the same gold on the same day." },
    { q: "Will a local buyer ask for my ID?", a: "Most will. Many states and cities require secondhand and precious metal dealers to record the seller's identity and hold items for a period before melting them, to help trace stolen goods. The rules differ by state and city; bring a photo ID." },
    { q: "Do I have to report cash from selling gold?", a: "The dealer, not you, files Form 8300 when it pays or receives more than {cash} in cash in one transaction or related ones. Separately, any gain you make is yours to report on your own tax return, whether you were paid in cash or by check." },
  ],
  body: (h) => `
<h2>Sell gold near me: getting comparable quotes</h2>
<p>Bring the same pieces to every store, sorted by karat. Note the weight each one records and whether it quotes per gram, per pennyweight or as a total. Ask for the quote in writing or take a photo of the ticket. Then type the totals above: the comparison only works when every quote is for the same gold.</p>
<h2>What stores must and need not tell you</h2>
<p>The federal ${h.src('ftc233', 'FTC jewelry guides')} govern how gold is described and marked when it is sold to you, not the price a buyer offers. Large cash payments are reported by the dealer on ${h.src('irs8300', 'Form 8300')}. State and local rules on secondhand dealers, such as holding periods and seller ID, vary and are not covered by this site.</p>
<p>If you are also buying bullion while you are there, check whether your state taxes it on the ${h.a('salestax', 'sales tax by state page')}.</p>
`,
});
