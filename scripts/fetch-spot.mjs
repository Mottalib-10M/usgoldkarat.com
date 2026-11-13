#!/usr/bin/env node
/**
 * Relevé du cours au build (brief BRIEF-LOT-30-2026-11-13, site 1).
 * Source : https://api.gold-api.com/price/<XAU|XAG>/USD (gold-api.com, dollars par once troy ; conditions relues
 * le 2026-11-13, version du 10 septembre 2026 : § 9 usage commercial permis, y compris sur un site web tiers ;
 * § 4 jamais plusieurs requêtes par seconde, d'où une requête par métal espacée de 1,5 s ; § 5 aucune garantie).
 * Le fichier écrit (src/data/spot-snapshot.json) donne le premier rendu de chaque page et sert de repli
 * daté quand le navigateur ne joint pas l'API. En cas d'échec réseau, le fichier existant est gardé tel
 * quel : la page affiche alors la date et l'heure de ce dernier relevé.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
const F = new URL('../src/data/spot-snapshot.json', import.meta.url);
const old = existsSync(F) ? JSON.parse(readFileSync(F, 'utf8')) : null;
const BOUNDS = { XAU: [500, 30000], XAG: [5, 800] };
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
async function j(u) { const r = await fetch(u, { signal: AbortSignal.timeout(15000) }); if (!r.ok) throw new Error(`${u} ${r.status}`); return r.json(); }
const out = { source: 'gold-api.com', currency: 'USD', usdPerOz: { ...(old?.usdPerOz ?? {}) }, at: { ...(old?.at ?? {}) } };
let ok = 0;
for (const sym of ['XAU', 'XAG']) {
  try {
    const g = await j(`https://api.gold-api.com/price/${sym}/USD`);
    const [lo, hi] = BOUNDS[sym];
    if (g.currency !== 'USD' || !(g.price > lo && g.price < hi)) throw new Error(`${sym} hors bornes ou devise ${g.currency}`);
    out.usdPerOz[sym] = Math.round(g.price * 100) / 100;
    out.at[sym] = g.updatedAt ?? new Date().toISOString();
    ok++;
  } catch (err) { console.warn(`relevé ${sym} impossible (${err.message}) : on garde ${old?.at?.[sym] ?? 'rien'}`); }
  await wait(1500);
}
if (!ok && !old) { console.error('aucun relevé et aucun fichier existant'); process.exit(1); }
if (['XAU', 'XAG'].some((s) => !out.usdPerOz[s])) { console.error('un métal manque dans le relevé'); process.exit(1); }
writeFileSync(F, JSON.stringify(out, null, 1) + '\n');
console.log(`cours relevés (USD/oz) : ${Object.entries(out.usdPerOz).map(([k, v]) => `${k} ${v}`).join(' · ')}`);
