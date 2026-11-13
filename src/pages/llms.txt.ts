/** llms.txt (RECETTE §21) : ce qu'est le site, d'où viennent ses chiffres, ses pages. Construit depuis les données. */
import type { APIRoute } from 'astro';
import { PAGES } from '../lib/pages';
import { route } from '../i18n/routes';
import { SITE_URL, LAST_UPDATED } from '../data/site-config';
import { STATES } from '../lib/engine/params';
import { fill } from '../lib/helpers';
export const GET: APIRoute = () => {
  const lines = [
    '# US Gold Karat',
    '',
    `> Calculators that turn the spot price of gold and silver in US dollars (gold-api.com, time shown in Eastern time, dated fallback) into the melt value of American karat gold: 10K = 416.7, 14K = 583.3, 18K = 750, 22K = 916.7 parts per 1,000 under the FTC jewelry guides (16 CFR 23.3), with the tolerances of the Gold and Silver Stamping Act; units from NIST (pennyweight, troy ounce); Gold Eagles, Buffalo and Silver Eagle from 31 U.S.C. 5112. An offer checker turns a buyer's quote into a share of melt. Federal tax on collectibles (26 U.S.C. 1(h), 408(m), 1014), IRS dealer reporting (Form 1099-B, Form 8300) and bullion sales tax in ${STATES.length} states read on their statutes on ${LAST_UPDATED}. Independent site published by Radif Partners: not a gold buyer or a dealer; no buyer prices, no advice.`,
    '',
    '## Calculators',
    `- [Gold price per gram by karat](${SITE_URL}${route('home', 'en')}): melt value of any weight of 10K to 24K gold at the spot price.`,
    ...PAGES.map((p) => `- [${p.nav}](${SITE_URL}${route(p.id, 'en')}): ${fill(p.card)}`),
    '',
    '## Method',
    `- [How the values are worked out](${SITE_URL}${route('method', 'en')})`,
    `- [About](${SITE_URL}${route('about', 'en')})`,
  ];
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
