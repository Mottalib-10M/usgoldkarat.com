import { definePage } from '../../lib/page-types';
export default definePage({
  id: "st-nd", group: "states", order: 69, tool: "salestax", toolProps: {"state": "ND"}, kind: 'outil',
  related: ["k10", "offer", "salestax", "eagle"], sources: [],
  extraSources: [{"name": "North Dakota: N.D.C.C. § 57-39.2-04(31)", "url": "https://ndlegis.gov/cencode/t57c39-2.pdf"}],
  slug: "sell-gold-north-dakota", nav: "Sell gold in North Dakota", card: "North Dakota: bullion exempt at any amount, with the statute",
  title: "Sell Gold in North Dakota: Melt Value and Bullion Sales Tax",
  description: "Selling or buying gold in North Dakota: melt value at the live spot price, and the bullion sales tax rule in N.D.C.C. § 57-39.2-04(31), read on the statute.",
  h1: "Sell gold in North Dakota: value and tax rules",
  resume: "To sell gold in North Dakota, have the melt value in hand: this page computes it at the spot price, with the time that price was read. North Dakota’s sales tax exemptions, in section 57-39.2-04 of the Century Code, treat money and bullion in one item, number 31. It exempts gross receipts from the sale of money, including all legal tender coins and currency, and from precious metal bullion refined to at least 999 parts per thousand and in a form whose value depends on its metal content. A legal tender gold coin is therefore exempt even though it is 22 karat, while a bar must be three nines or better. There is no minimum amount. Selling gold to a dealer carries no sales tax. US Gold Karat read the code on the North Dakota Legislative Branch site and takes no payments from buyers.",
  faqs: [
    { q: "Is a 22K Gold Eagle exempt from North Dakota sales tax?", a: "Yes, as legal tender. Item 31 exempts all legal tender coins as money, separately from bullion, so the Eagle’s 916.7 fineness does not matter. A privately minted round of the same purity would not qualify, because the bullion branch of the item requires 999." },
    { q: "What purity must a bar have in North Dakota?", a: "At least 999 parts per thousand, and its value must depend on its metal content. Most modern refinery bars are 999 or 9999 and meet it. A bar of lower purity, or an item valued for its design, falls outside the exemption and is taxed." },
    { q: "How much is a 10K class ring worth to a North Dakota buyer?", a: "Its metal is worth the gold weight times 416.7 parts in 1,000 times the spot price, after the stone is removed. Use the 10K page to get the figure, then compare offers as a share of it. No law sets what a buyer must pay." },
  ],
  body: (h) => `
<h2>Sell gold in North Dakota: class rings and chains</h2>
<p>A 10K class ring with 12 grams of metal holds ${h.live(h.at(12, 416.7))} of gold at ${h.when}. Stones and enamel add weight but no value, so ask the buyer whether the weight on the ticket includes them. The ${h.a('k10', '10K page')} covers class rings in more detail.</p>
<h2>Money and bullion in § 57-39.2-04(31)</h2>
<p>North Dakota is the only state read here that ties its bullion exemption to 999 fineness while exempting legal tender coins with no purity condition. That combination favors government coins over private rounds of the same alloy.</p>
<p>The ${h.a('salestax', 'comparison of states')} lists each purity rule side by side.</p>
`,
});
