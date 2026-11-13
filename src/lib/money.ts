/** Montants en dollars (RECETTE §4.1) : un total s'affiche sans cents au-delà de 1 000 $ ; un prix au
 *  gramme, au pennyweight ou une petite somme garde ses cents, comme sur l'étiquette d'un bijoutier. */
import { formatNumber } from './format';
export const usd = (n: number) => `$${formatNumber(n, Math.abs(n) >= 1000 ? 0 : 2)}`;
export const usd0 = (n: number) => `$${formatNumber(n, 0)}`;
export const usd2 = (n: number) => `$${formatNumber(n, 2)}`;
export const pct = (x: number, d = 1) => `${formatNumber(x * 100, d)}%`;
export const grams = (n: number, d = 2) => `${formatNumber(n, d)} g`;
/** Heure d'un relevé de cours, en heure de New York (la place où l'or se cote en dollars), écrite en mots
 *  simples : « November 13, 2026, 8:49 am Eastern time ». Pas de sigle ET/EST/EDT (testeurs naïfs du 2026-11-09). */
export function stamp(iso: string): string {
  const d = new Date(iso);
  const day = d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'America/New_York' });
  return `${day}, ${clock(iso)}`;
}
/** Heure seule d'un relevé (New York) : « 8:49 am Eastern time ». */
export function clock(iso: string): string {
  const t = new Date(iso).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'America/New_York' }).replace(/\s+/g, ' ').toLowerCase();
  return `${t} Eastern time`;
}
