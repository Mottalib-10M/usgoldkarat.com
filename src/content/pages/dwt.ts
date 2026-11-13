import { definePage } from '../../lib/page-types';
export default definePage({
  id: "dwt", group: "gold", order: 16, tool: "units", toolProps: {"unit": "dwt", "k": 14}, kind: 'outil',
  related: ["pawn", "k14", "chart", "k24"], sources: ["nistB9"],
  slug: "gold-price-per-pennyweight", nav: "Gold price per pennyweight", card: "The jeweler’s unit: 1 dwt = 1.555 g, with grams, troy and regular ounces",
  title: "Gold Price per Pennyweight Today: dwt to Grams and Ounces",
  description: "Gold price per pennyweight (dwt) for every karat at the live spot price, and a converter between pennyweights, grams, troy ounces, regular ounces and grains.",
  h1: "Gold price per pennyweight, and the dwt converter",
  resume: "The gold price per pennyweight is the unit most American gold buyers, refiners and pawn shops still post on their boards: one pennyweight, written dwt, is 24 grains, or {dwt3} grams, and twenty pennyweights make a troy ounce. That is why the price of pure gold per pennyweight is the spot price divided by twenty. The converter below takes a quantity in pennyweights, grams, troy ounces, regular kitchen ounces or grains, turns it into all the others and values it at the karat you choose, using the spot price read from gold-api.com with its time shown. The definitions come from the National Institute of Standards and Technology, which fixes the grain exactly and the pennyweight and troy ounce from it. Many people are underpaid simply because they compare a price per pennyweight with a price per gram. US Gold Karat is an independent site; it buys nothing.",
  faqs: [
    { q: "How many grams is a pennyweight of gold?", a: "One pennyweight is exactly 24 grains, and a grain is 0.06479891 grams, so a pennyweight is {dwt} grams, about 1.555. Twenty pennyweights make one troy ounce of {oz2} grams. The pennyweight measures any metal, not just gold; it says nothing about purity." },
    { q: "Why do gold buyers quote prices per pennyweight?", a: "It is the traditional unit of the American jewelry trade and of refiners' settlement sheets. A price per dwt looks smaller than a price per ounce and larger than a price per gram, which makes comparisons hard. Convert every quote to the same unit, or to a share of melt value, before deciding." },
    { q: "Is a troy ounce heavier than a regular ounce?", a: "Yes. A troy ounce is {oz2} grams; the avoirdupois ounce used for food and on kitchen scales is {ozav} grams. Weighing gold in regular ounces and multiplying by the spot price undervalues it by almost 9%, so switch the scale to grams." },
  ],
  body: (h) => `
<h2>Gold price per pennyweight today, for each karat</h2>
${h.table(['Karat', 'Price per pennyweight', 'Price per gram'], h.P.gold.filter((g) => g.common).map((g) => [g.k + 'K', h.live(h.at(1.55517384, g.fineness), 'XAU', 'usd2'), h.live(h.at(1, g.fineness), 'XAU', 'usd2')]), 'At the gold price of ' + h.when + '.')}
<h2>Units of weight for precious metals</h2>
<p>The ${h.src('nistB9', 'NIST guide to the SI, appendix B.9')}, gives the grain as exactly 64.79891 milligrams. The troy system builds on it: 24 grains make a pennyweight and 480 grains make a troy ounce. The avoirdupois ounce, 437.5 grains, is a different system altogether. Spot prices are always per troy ounce.</p>
<p>When a store offers a price per pennyweight for 14K, check it against the 14K row above, or type it into the ${h.a('pawn', 'pawn shop price checker')}, which gives the share of melt value directly.</p>
`,
});
