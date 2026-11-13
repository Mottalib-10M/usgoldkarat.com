/** Outils d'écriture passés au corps de chaque page, et jetons des textes statiques. */
import { route, ROUTES } from '../i18n/routes';
import { P, SNAPSHOT, STATES, type SourceKey } from './engine/params';
import type { Helpers } from './page-types';
import { formatNumber, formatDecimal } from './format';
import { metalValue, finenessOfKarat, coinById, coinFineGrams, OZ, DWT, OZ_AV } from './engine/metal';
import { usd, usd2, pct, stamp } from './money';

const esc = (s: string | number) => String(s).replace(/&(?!(?:[a-z]+|#\d+);)/g, '&amp;').replace(/</g, '&lt;');

export function helpers(): Helpers {
  return {
    P, STATES, usd, usd2, pct,
    a: (id, text) => {
      if (!ROUTES.some((r) => r.id === id)) throw new Error(`lien interne inconnu : ${id}`);
      return `<a href="${route(id, 'en')}">${text}</a>`;
    },
    src: (key: SourceKey, text?: string) => { const s = P.sources[key]; if (!s) throw new Error(`source inconnue ${key}`); return `<a href="${s.url}" target="_blank" rel="nofollow noopener noreferrer">${text ?? s.label.en}</a>`; },
    num: (n, d = 0) => formatNumber(n, d),
    at: (g, f, m = 'XAU') => metalValue(g, f, SNAPSHOT.usdPerOz[m]),
    // Un seul chiffre par notion : un montant qui dépend du cours est posé dans un span que live.ts recalcule
    // au cours du calculateur ; l'heure citée suit le même cours.
    live: (n, m = 'XAU', f = 'usd') => `<span data-cours="${m}" data-v="${n}" data-f="${f}">${f === 'usd2' ? usd2(n) : f === 'pct' ? pct(n, 1) : usd(n)}</span>`,
    when: `<span data-cours-heure="XAU">${stamp(SNAPSHOT.at.XAU)}</span>`,
    whenOf: (m) => `<span data-cours-heure="${m}">${stamp(SNAPSHOT.at[m])}</span>`,
    recorded: stamp(SNAPSHOT.at.XAU),
    table: (headers, rows, caption) => { return `<div class="not-prose my-6 overflow-x-auto"><table class="journal empile w-full text-sm">${caption ? `<caption class="mb-2 text-start text-sm text-navy-600">${caption}</caption>` : ''}<thead><tr>${headers.map((x) => `<th scope="col" class="px-3 py-2 text-start font-semibold text-navy-900">${x}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr class="border-b border-navy-100">${r.map((c, i) => `<td data-label="${String(headers[i] ?? '').replace(/"/g, '&quot;')}" class="tabular-nums px-3 py-2 text-start text-navy-800">${typeof c === 'number' ? esc(formatNumber(c, 0)) : c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`; },
  };
}

/** Jetons des textes (titre, description, bloc citable, FAQ, corps) remplacés par la valeur du fichier
 *  de paramètres : une valeur réglementaire ne s'écrit jamais en dur (RECETTE §17.4, point 7).
 *  Ex. « {f.14} » → « 583.3 », « {oz} » → « 31.1034768 », « {cash} » → « $10,000 ». */
export function fill(s: string): string {
  const eagle = coinById('eagle-1oz');
  const se = coinById('silver-eagle');
  const map: Record<string, string> = {
    year: String(P.year), taxYear: P.taxYear,
    oz: formatDecimal(OZ, 7), oz2: formatDecimal(OZ, 2), dwt: formatDecimal(DWT, 8), dwt3: formatDecimal(DWT, 3), ozav: formatDecimal(OZ_AV, 2), grain: formatDecimal(P.units.grainGrams, 8),
    'f.10': formatDecimal(finenessOfKarat(10), 1), 'f.12': String(finenessOfKarat(12)), 'f.14': formatDecimal(finenessOfKarat(14), 1), 'f.18': String(finenessOfKarat(18)), 'f.22': formatDecimal(finenessOfKarat(22), 1), 'f.24': String(finenessOfKarat(24)),
    'tol.gold': String(P.tolerance.goldNoSolder), 'tol.goldSolder': String(P.tolerance.goldWithSolder), 'tol.silver': String(P.tolerance.silverNoSolder), 'tol.silverSolder': String(P.tolerance.silverWithSolder),
    sterling: String(P.tolerance.sterlingMin), coinsilver: String(P.tolerance.coinSilverMin),
    'gf.share': '1/20', 'rgp.share': '1/40', 'plate.k': String(P.plating.plateMinKarat), 'ep.microns': formatDecimal(P.plating.electroplateMinMicrons, 3), 'hge.microns': formatDecimal(P.plating.heavyElectroplateMinMicrons, 1),
    'tax.max': pct(P.tax.collectiblesMaxRate, 0), 'tax.top': pct(P.tax.ordinaryRates[P.tax.ordinaryRates.length - 1], 0), 'tax.low': pct(P.tax.ordinaryRates[0], 0),
    cash: usd(P.reporting.form8300CashOver).replace('.00', ''), 'cash.days': String(P.reporting.form8300Days),
    'eagle.g': `${formatDecimal(eagle.grossG!, 3)} g`, 'eagle.fine': `${formatDecimal(coinFineGrams(eagle), 3)} g`, 'se.g': `${formatDecimal(se.grossG!, 3)} g`,
    'spot.when': stamp(SNAPSHOT.at.XAU),
  };
  return s.replace(/\{([a-zA-Z][a-zA-Z.0-9]*)\}/g, (m, k) => { if (!(k in map)) throw new Error(`jeton inconnu ${m}`); return map[k]; });
}
