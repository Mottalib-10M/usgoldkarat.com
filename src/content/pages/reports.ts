import { definePage } from '../../lib/page-types';
export default definePage({
  id: "reports", group: "rules", order: 52, tool: "reports", kind: 'outil',
  related: ["tax", "near", "eagle", "salestax"], sources: ["irs1099b", "irs8300"],
  slug: "gold-sale-1099-b-and-form-8300", nav: "1099-B and Form 8300", card: "When a gold dealer reports your sale to the IRS, and when it does not",
  title: "Gold Sale 1099-B and Form 8300: What Dealers Report",
  description: "Does a gold dealer report your sale? The 1099-B rule for precious metals, the 24-hour aggregation, Form 8300 for cash over $10,000, and what you report.",
  h1: "Gold sale reporting: Form 1099-B and Form 8300",
  resume: "A gold sale is reported to the IRS by the dealer in two situations only, and this page sets both out from the IRS's own instructions. Form 1099-B applies to a sale of gold, silver, platinum or palladium only when the metal is in a form approved for delivery on a regulated futures contract and in at least the quantity that contract requires; sales by one customer within 24 hours are added together for that test. Selling a single coin or a handful of jewelry does not trigger it. Form 8300 is about cash, not metal: any business that receives or pays more than {cash} in cash in one transaction or related transactions must file it within {cash.days} days. The tool below asks three questions and says which form, if any, the dealer files. Neither form changes your own duty to report a gain. US Gold Karat is independent and gives no tax advice.",
  faqs: [
    { q: "Does selling gold jewelry trigger a 1099-B?", a: "No. Jewelry is not in a form that can be delivered on a regulated futures contract, so the 1099-B rule for precious metals does not reach it, whatever the amount. Any gain is still taxable and is reported by you, not the buyer." },
    { q: "Which gold sales does a dealer report on 1099-B?", a: "Sales of bars or coins of a kind approved for futures delivery, in at least the contract's minimum quantity. The IRS example: a single gold coin is not reportable when all approved gold coin contracts call for at least 25 coins. Sales within 24 hours are combined for the test." },
    { q: "Is Form 8300 filed when I sell gold for a check?", a: "No. Form 8300 covers cash, meaning currency and coin and, in some cases, cashier's checks and money orders under $10,000 used in a designated transaction. A personal check or wire transfer is not cash for this rule. Ask the dealer how it pays." },
  ],
  body: (h) => `
<h2>Gold sale on Form 1099-B: the precious metals test</h2>
<p>The ${h.src('irs1099b', 'IRS instructions for Form 1099-B')} say a sale of a precious metal in any form for which the Commodity Futures Trading Commission has not approved trading by regulated futures contract is not reportable, and that even an approved form is not reportable below the contract's minimum quantity. They add that a broker must aggregate a customer's sales over 24 hours and that the exception falls away if a customer splits sales to avoid reporting.</p>
<h2>Form 8300 and cash payments</h2>
<p>The ${h.src('irs8300', 'IRS page on Form 8300')} says the form must be filed within 15 days after a cash transaction of more than $10,000, and that the business must send a written statement to each person named on it by January 31 of the following year. Splitting a cash sale into smaller ones to dodge the form is itself illegal.</p>
<p>Whatever the dealer files, the gain is reported on your own return; see the ${h.a('tax', 'gold capital gains tax page')} for the rate.</p>
`,
});
