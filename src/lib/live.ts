/**
 * Cours du moment, lu par le navigateur APRÈS le premier rendu (RECETTE §17.5) :
 *  - premier rendu = relevé du build (spot-snapshot.json), identique au HTML servi ;
 *  - puis, pour chaque métal affiché sur la page, UNE requête GET vers
 *    api.gold-api.com, route price/<métal>/USD (dollars par once troy, CORS ouvert ; conditions relues le
 *    2026-11-13 : § 9 usage commercial permis, § 4 jamais plusieurs requêtes par seconde). Les requêtes
 *    d'une même page passent par une file : au plus une toutes les 1,2 s.
 *  - si la requête échoue, le relevé du build reste affiché, avec sa date et son heure.
 * Rien de ce que tape le visiteur n'est envoyé : ce sont de simples GET publics, sans paramètre.
 * Aucune actualisation automatique : un bouton permet de redemander le cours (au plus une fois par 15 s).
 */
import { useEffect, useState } from 'react';
import { SNAPSHOT, type Metal } from './engine/params';
import { usd, usd2, pct, stamp } from './money';

export interface Quote { usdPerOz: number; at: string; live: boolean; failed: boolean }
export type Spot = Record<Metal, Quote>;

const initial: Spot = {
  XAU: { usdPerOz: SNAPSHOT.usdPerOz.XAU, at: SNAPSHOT.at.XAU, live: false, failed: false },
  XAG: { usdPerOz: SNAPSHOT.usdPerOz.XAG, at: SNAPSHOT.at.XAG, live: false, failed: false },
};
const BOUNDS: Record<Metal, [number, number]> = { XAU: [500, 30000], XAG: [5, 800] };
let current: Spot = initial;
const subs = new Set<(s: Spot) => void>();
const requested = new Set<Metal>();
let queue: Promise<void> = Promise.resolve();
let lastManual = 0;
const pause = (ms: number) => new Promise((r) => setTimeout(r, ms));

function fetchMetal(m: Metal) {
  queue = queue.then(async () => {
    try {
      const r = await fetch(`https://api.gold-api.com/price/${m}/USD`, { cache: 'no-store' });
      const g = await r.json();
      const [lo, hi] = BOUNDS[m];
      if (g?.currency !== 'USD' || !(g.price > lo && g.price < hi)) throw new Error('bornes');
      current = { ...current, [m]: { usdPerOz: g.price, at: g.updatedAt ?? new Date().toISOString(), live: true, failed: false } };
    } catch {
      current = { ...current, [m]: { ...current[m], failed: true } };
    }
    subs.forEach((f) => f(current));
    majTexte(m);
    await pause(1200);
  });
}

/** Un seul chiffre par notion : les montants du texte et des tableaux qui dépendent du cours sont posés au
 *  build dans un <span data-cours="XAU" data-v="…" data-f="usd|usd2|pct"> (helpers.live), au relevé du build ;
 *  quand le cours du moment arrive, ils sont recalculés au même cours que le calculateur (une valeur de métal
 *  est proportionnelle au cours ; une part d'offre, « pct », lui est inversement proportionnelle). L'heure du
 *  relevé citée par le texte (<span data-cours-heure="XAU">) passe à celle du cours du moment. */
function majTexte(m: Metal) {
  if (typeof document === 'undefined') return;
  const q = current[m];
  if (!q.live) return;
  const r = q.usdPerOz / SNAPSHOT.usdPerOz[m];
  document.querySelectorAll<HTMLElement>(`[data-cours="${m}"]`).forEach((el) => {
    const v = Number(el.dataset.v);
    if (!Number.isFinite(v)) return;
    const f = el.dataset.f;
    el.textContent = f === 'pct' ? pct(v / r, Number(el.dataset.d ?? 1)) : f === 'usd2' ? usd2(v * r) : usd(v * r);
  });
  document.querySelectorAll<HTMLElement>(`[data-cours-heure="${m}"]`).forEach((el) => { el.textContent = stamp(q.at); });
}

/** Lit le cours des métaux demandés. Premier rendu : relevé du build ; ensuite : cours du moment. */
export function useSpot(metals: Metal[] = ['XAU']): Spot {
  const [s, setS] = useState<Spot>(initial);
  useEffect(() => {
    subs.add(setS);
    setS(current);
    for (const m of metals) if (!requested.has(m)) { requested.add(m); fetchMetal(m); }
    return () => { subs.delete(setS); };
  }, []);
  return s;
}

/** Redemande le cours (bouton), au plus une fois toutes les 15 secondes. */
export function refreshSpot(metals: Metal[]): boolean {
  const now = Date.now();
  if (now - lastManual < 15000) return false;
  lastManual = now;
  metals.forEach(fetchMetal);
  return true;
}
