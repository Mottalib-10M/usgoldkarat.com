import { definePage } from '../../lib/page-types';
export default definePage({
  id: "filled", group: "rules", order: 50, tool: "plated", toolProps: {"kind": "gf"}, kind: 'outil',
  related: ["k10", "k14", "scrap", "chart"], sources: ["ftc233", "ftc234"],
  slug: "gold-filled-vs-plated", nav: "Gold filled vs plated: value", card: "GF, RGP, GP, GEP, vermeil: what each stamp means and the gold inside",
  title: "Gold Filled vs Gold Plated: Stamps and Real Gold Value",
  description: "Gold filled vs gold plated, rolled gold plate and vermeil: what GF, RGP, GP and HGE stamps mean under FTC rules, and how much gold a filled piece really holds.",
  h1: "Gold filled vs gold plated: what the gold is worth",
  resume: "Gold filled and gold plated pieces look like karat gold but are mostly base metal, and the difference between the two decides whether there is any gold worth selling. Under the federal jewelry guides, “gold filled” means a layer of at least 10K gold bonded to the base metal and making up at least one twentieth of the weight; “rolled gold plate” and “gold overlay” can be as little as one fortieth. Electroplated gold is far thinner: as little as 0.175 micron of fine gold, measured in millionths of a meter. Choose the stamp on your piece, its karat and its weight, and the calculator shows the minimum gold the stamp implies and its value at the spot price read from gold-api.com. A 1/20 14K GF chain holds real gold, though only a fraction of a solid one; plated jewelry holds almost none. US Gold Karat is independent and buys nothing.",
  faqs: [
    { q: "Is gold filled jewelry worth anything?", a: "Some. A piece stamped 1/20 14K GF holds at least one twentieth of its weight in 14K gold, so a 20 gram bracelet carries about a gram of 14K. Buyers who accept gold filled pay on that layer, at a low share, and many refuse small lots." },
    { q: "What does HGE mean on jewelry?", a: "Heavy gold electroplate: an electroplated layer at least {hge.microns} microns thick of fine gold equivalent. It is still a thin coating, worth almost nothing as metal. GEP and GP mean gold electroplate or gold plated, with an even thinner minimum." },
    { q: "What is vermeil?", a: "Under the FTC guides, vermeil is sterling silver plated with gold of at least 10 karat and at least {hge.microns} microns thick. As metal, it is valued as sterling silver, since the silver base makes up nearly all the weight; the thin gold layer adds little." },
  ],
  body: (h) => `
<h2>Gold filled vs gold plated: what each stamp promises</h2>
${h.table(['Stamp', 'Meaning', 'Minimum gold'], [['14K, 585', 'Solid karat gold', 'All of the weight is the alloy'], ['1/20 14K GF', 'Gold filled', '1/20 of the weight is 14K or better'], ['1/40 12K RGP', 'Rolled gold plate, gold overlay', '1/40 of the weight in the stated karat'], ['HGE', 'Heavy gold electroplate', '2.5 microns of fine gold'], ['GEP, GP', 'Gold electroplate', '0.175 micron of fine gold'], ['Vermeil', 'Gold over sterling silver', '2.5 microns over a 925 silver base']], 'From the FTC jewelry guides, sections 23.3 and 23.4.')}
<p>The ${h.src('ftc233', 'FTC guide on gold')} sets each threshold and requires the karat of the layer to appear with the term, for example “1/20 12K G.F.”. The ${h.src('ftc234', 'vermeil section')} adds the silver base.</p>
<h2>Selling gold-filled pieces</h2>
<p>Keep gold-filled items out of a karat-gold lot: a buyer who finds them mixed in may test the whole lot lower. Sold on their own, they are priced on the thin layer of gold only. Solid pieces belong in the ${h.a('scrap', 'scrap gold calculator')}.</p>
`,
});
