import { definePage } from '../../lib/page-types';
export default definePage({
  id: "offer", group: "sell", order: 21, tool: "offer", toolProps: {"k": 14, "grams": 10}, kind: 'outil',
  related: ["near", "pawn", "scrap", "k14"], sources: ["ftc233"],
  slug: "cash-for-gold-offer-checker", nav: "Cash for gold offer checker", card: "Type the offer: see the share of your gold’s value it pays, and what the buyer keeps",
  title: "Cash for Gold Offer Checker: What Share of Melt Value?",
  description: "Cash for gold offer checker: type the karat, weight and the offer you got to see what share of the melt value it pays and how many dollars the buyer keeps.",
  h1: "Cash for gold offer checker",
  resume: "A cash for gold offer is only meaningful as a share of what your gold is worth, and this checker gives you that share. Choose the karat, type the weight in grams and the total you were offered, and it divides the offer by the melt value worked out at the spot price read from gold-api.com, with its time shown. You see the percentage, the dollars the buyer keeps, and the offer per gram and per pennyweight. Cash for gold shops, mail-in buyers, pawn shops and jewelers all quote differently, some per pennyweight, some per gram, some as a lump sum after testing, so a single percentage is the one way to put them side by side. No law and no agency publishes a fair rate, and we do not invent one: the test is a second quote for the same pieces on the same day. US Gold Karat is independent and is paid by no buyer.",
  faqs: [
    { q: "What percentage of melt value do cash for gold buyers pay?", a: "Nobody publishes it, and it varies by buyer, by karat and by the size of the lot. Mail-in buyers and small shops often pay well under melt; buyers who handle a lot of metal can pay more. Check your own quotes: the share is what matters, not the dollar figure." },
    { q: "Why is the offer per pennyweight shown?", a: "Many buyers post or quote per pennyweight, the jewelry trade's unit of 1.555 grams. Seeing your lump-sum offer in the same unit lets you compare it with a board price at another store, or with the melt value per pennyweight on the karat chart." },
    { q: "Can a buyer pay more than melt value?", a: "For metal alone, rarely. An offer above melt usually means the buyer recorded a higher karat or weight than you did, or is paying for the piece as jewelry. Ask what weight and karat they wrote on the ticket before you accept." },
  ],
  body: (h) => `
<h2>Before you accept a cash for gold offer</h2>
<p>Ask the buyer for the weight and karat written on the ticket, and compare them with your own scale and the stamps on the pieces. Ask whether the price is per gram or per pennyweight. Ask whether the offer stands if you come back after getting a second quote. A buyer who will not show the weight, or who weighs out of your sight, is a reason to walk away.</p>
<h2>Offers by mail</h2>
<p>Mail-in buyers send a kit, test your gold and then make an offer, often by check. Read how long you have to refuse it and get your gold back, and who pays for return shipping. Photograph and weigh everything before it goes in the envelope; once it is melted, nothing can be checked.</p>
<h2>Jewelry that is worth more than its gold</h2>
<p>Signed pieces, antique jewelry and items set with good stones can sell for more as jewelry. The federal ${h.src('ftc233', 'jewelry guides')} govern how gold must be described when sold, not what a buyer must pay you. Show such pieces to a jeweler or an auction house before a melt buyer, then use the ${h.a('near', 'quote comparison tool')} to set the offers side by side.</p>
`,
});
