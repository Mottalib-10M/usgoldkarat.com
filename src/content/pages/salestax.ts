import { definePage } from '../../lib/page-types';
export default definePage({
  id: "salestax", group: "rules", order: 53, tool: "salestax", toolProps: {"state": "NY"}, kind: 'outil',
  related: ["k24", "eagle", "reports", "near"], sources: ["usc5112"],
  slug: "gold-bullion-sales-tax-by-state", nav: "Bullion sales tax by state", card: "Which states exempt gold and silver bullion and coins, and from what amount",
  title: "Gold Bullion Sales Tax by State: Exemptions and Thresholds",
  description: "Gold and silver bullion sales tax by state, read on each statute: which states exempt bars and coins outright, which only above $1,000, and what each covers.",
  h1: "Gold bullion sales tax by state",
  resume: "Gold bullion sales tax depends entirely on the state where you take delivery, and the rules differ more than most buyers expect. Some states exempt bars and legal tender coins at any amount; others exempt them only when a single sale exceeds $1,000; some cover bullion but not coins, or bars of 99.9% purity but not jewelry or scrap. This page lists only the states whose statute we have read ourselves, with the citation and a link to the official text, and the calculator says whether a purchase of a given size is exempt there. We do not show tax rates, which combine state and local rates and change often. Jewelry is outside these exemptions. States not listed have not been checked yet: their absence says nothing about their rules. US Gold Karat is independent and sells no bullion.",
  faqs: [
    { q: "Which states have no sales tax on gold bullion?", a: "Among the states we have read, Arizona, Florida, Iowa, Kansas, Minnesota, Missouri, North Dakota and South Carolina exempt bullion at any amount, each with its own definition. Connecticut, Maryland and New York exempt it only from about $1,000 per sale. Other states are not covered yet." },
    { q: "Is sales tax charged on gold coins as well as bars?", a: "It depends on the statute. Kansas, Iowa, South Carolina and Arizona name legal tender coins; Missouri covers investment coins; Florida's paragraph names bullion only; Minnesota covers bars and rounds of 99.9% purity. New York covers coins priced close to their metal value." },
    { q: "Do I pay sales tax when I sell gold?", a: "No. Sales tax falls on the buyer at retail, so selling your gold to a dealer does not involve sales tax in any of the states covered here. Income tax on any gain is a separate question, federal and sometimes state, covered on the capital gains page." },
  ],
  body: (h) => `
<h2>Gold bullion sales tax, state by state</h2>
${h.table(['State', 'Rule', 'Law'], h.STATES.map((s) => [s.name, s.rule === 'exempt' ? 'Exempt at any amount' : (s.thresholdInclusive === false ? 'Exempt above $' : 'Exempt from $') + h.num(s.threshold ?? 0), '<a href="' + s.url + '" target="_blank" rel="nofollow noopener noreferrer">' + s.cite + '</a>']), 'Statutes read on the official state websites on November 13, 2026.')}
<p>Each state page sets out what its law covers in more detail: ${h.STATES.map((s) => h.a('st-' + s.code.toLowerCase(), s.name)).join(', ')}.</p>
<h2>Thresholds and what they cover</h2>
<p>Where a threshold applies, it is per sale, not per item: two small purchases on different days are taxed separately. New York adds a test on price: a coin sold too far above its metal value does not qualify. Federal coinage law, ${h.src('usc5112', '31 U.S.C. 5112')}, defines the US bullion coins, but each state decides for itself whether to tax them.</p>
`,
});
