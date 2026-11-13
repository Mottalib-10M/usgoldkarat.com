import { definePage } from '../../lib/page-types';
export default definePage({
  id: "eagle", group: "coins", order: 40, tool: "coin", toolProps: {"coin": "eagle-1oz"}, kind: 'outil',
  related: ["k22", "k24", "silver", "reports"], sources: ["usc5112", "usc408m"],
  slug: "gold-eagle-melt-value", nav: "Gold Eagle melt value", card: "American Gold Eagles, Buffalo and Silver Eagle: metal value and dealer premium",
  title: "Gold Eagle Melt Value Today: 1 oz, ½, ¼ and 1/10 oz Coins",
  description: "Gold Eagle melt value at the live spot price: the fine gold set by law in the 1 oz, ½, ¼ and 1/10 oz coins, the Buffalo and Silver Eagle, and dealer premiums.",
  h1: "Gold Eagle melt value today",
  resume: "The Gold Eagle melt value is the value of the fine gold the coin contains, and federal law states exactly how much: one troy ounce in the $50 coin, a half ounce in the $25, a quarter in the $10 and a tenth in the $5. The coins weigh more than that because the gold is alloyed to 22 karat for hardness, which is why you should never value an Eagle by its scale weight times the price of pure gold. Choose the coin and how many you have, and the calculator multiplies the legal gold content by the spot price read from gold-api.com, with its time shown. Type a dealer's price to see the premium it asks above melt, or the share of melt it offers. The same tool covers the 99.99% gold American Buffalo and the one-ounce American Silver Eagle. US Gold Karat does not sell coins and links to no dealer.",
  faqs: [
    { q: "How much gold is in a 1 oz Gold Eagle?", a: "Exactly one troy ounce of fine gold, {eagle.fine}, in a coin that weighs {eagle.g} in total, under the federal coinage statute. The rest is copper and silver. Its melt value is the spot price of one ounce of gold." },
    { q: "Is a Gold Eagle worth more than its melt value?", a: "Dealers sell new Eagles above melt, the premium covering minting and distribution, and buy them back near or slightly above melt depending on demand. Proof and rare dated Eagles can carry collector premiums. Use melt value as the floor in either direction." },
    { q: "Are Gold Eagles taxed differently from other gold?", a: "Sold at a gain after a year, they are taxed as collectibles like other gold, at no more than 28% federally. The coinage statute matters for tax in one place only: section 408(m)(3) lets IRAs hold these coins without treating them as collectibles." },
  ],
  body: (h) => `
<h2>Gold Eagle melt value today, and the other US bullion coins</h2>
${h.table(['Coin', 'Legal weight', 'Fine metal', 'Melt value'], h.P.coins.map((c) => [c.name, c.grossG ? h.num(c.grossG, 3) + ' g' : 'not set in grams', (c.fineOz !== undefined ? h.num(c.fineOz, 4) + ' troy oz' : h.num((c.grossG ?? 0) * (c.fineness ?? 0) / 1000 / 31.1034768, 4) + ' troy oz'), c.metal === 'XAU' ? h.live(h.at((c.fineOz ?? 0) * 31.1034768, 1000)) : h.live(h.at(c.grossG ?? 0, c.fineness ?? 0, 'XAG'), 'XAG')]), 'Gold at ' + h.when + '; silver at ' + h.whenOf('XAG') + '.')}
<h2>What the coinage law sets</h2>
<p>${h.src('usc5112', '31 U.S.C. 5112')} fixes the gold content and weight of each Eagle in subsection (a), the Buffalo at 99.99 percent gold in paragraph (a)(11), and the Silver Eagle at 31.103 grams of .999 silver in subsection (e). The ${h.src('usc408m', 'collectibles rule in section 408(m)')} names these coins as an exception for retirement accounts only.</p>
<p>Older circulating US gold coins, minted before 1933, are not covered here: their gold content is set by acts that are no longer in the code, and their collector value often exceeds melt. For the 22 karat alloy itself, see the ${h.a('k22', '22K page')}.</p>
`,
});
