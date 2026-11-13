/**
 * Moteur du site : fonctions pures, testées (tests/metal.test.ts). Aucune valeur réglementaire en dur :
 * elles viennent de params-2026.json ; le cours (dollars par once troy) vient de l'appelant.
 *
 * Valeur métal d'un objet = poids × titre (millièmes ÷ 1000) × cours du gramme de métal fin.
 * Le titre d'un karat américain est k/24 (16 CFR 23.3) : 10K = 416,7, 14K = 583,3, 18K = 750, 22K = 916,7 ;
 * 24K est compté à 999.
 */
import { P, type Coin, type StateRule } from './params';

/** Grammes d'une once troy (480 grains) et d'un pennyweight (24 grains), déduits du grain NIST. */
export const OZ = P.units.troyOunceGrains * P.units.grainGrams;
export const DWT = P.units.pennyweightGrains * P.units.grainGrams;
export const OZ_AV = P.units.avoirdupoisOunceGrams;

/** Cours d'un gramme de métal fin, en dollars, depuis le cours de l'once troy. */
export const finePerGram = (usdPerOz: number) => usdPerOz / OZ;
export const finePerDwt = (usdPerOz: number) => usdPerOz / 20;

/** Titre (millièmes) d'un karat ; un karat hors table suit la proportion k/24 arrondie au dixième. */
export function finenessOfKarat(k: number): number {
  const row = P.gold.find((g) => g.k === k);
  return row ? row.fineness : Math.round((k / 24) * 10000) / 10;
}
/** Karat équivalent d'un titre (583,3 → 14). */
export const karatOfFineness = (fineness: number) => (fineness / 1000) * 24;
/** Poinçon en millièmes tel qu'on le voit sur le bijou (417, 585, 750, 916, 999). */
export function stampOfKarat(k: number): string {
  const row = P.gold.find((g) => g.k === k);
  return row ? row.stamp : String(Math.round((k / 24) * 1000));
}

/** Valeur métal d'un poids (grammes) à un titre donné. */
export function metalValue(grams: number, fineness: number, usdPerOz: number): number {
  return Math.max(0, grams) * (fineness / 1000) * finePerGram(usdPerOz);
}
/** Prix d'un gramme d'objet à un titre donné. */
export const gramPrice = (fineness: number, usdPerOz: number) => metalValue(1, fineness, usdPerOz);
/** Prix d'un pennyweight d'objet à un titre donné. */
export const dwtPrice = (fineness: number, usdPerOz: number) => metalValue(DWT, fineness, usdPerOz);

/** Tableau des karats publiés : prix du gramme et du pennyweight pour chacun. */
export function karatTable(usdPerOz: number) {
  return P.gold.map((g) => ({ ...g, gram: gramPrice(g.fineness, usdPerOz), dwt: dwtPrice(g.fineness, usdPerOz), oz: metalValue(OZ, g.fineness, usdPerOz) }));
}

export type Unit = 'g' | 'dwt' | 'ozt' | 'oz' | 'kg' | 'grain';
export const UNIT_LABEL: Record<Unit, string> = { g: 'grams', dwt: 'pennyweights (dwt)', ozt: 'troy ounces', oz: 'ounces (regular, 28.35 g)', kg: 'kilograms', grain: 'grains' };
/** Conversion vers le gramme. */
export function toGrams(value: number, unit: Unit): number {
  if (unit === 'ozt') return value * OZ;
  if (unit === 'dwt') return value * DWT;
  if (unit === 'oz') return value * OZ_AV;
  if (unit === 'kg') return value * 1000;
  if (unit === 'grain') return value * P.units.grainGrams;
  return value;
}
export const fromGrams = (grams: number, unit: Unit) => grams / toGrams(1, unit);

/** Part du métal qu'une offre paie, et l'écart en dollars. */
export function offerShare(offer: number, metal: number): { share: number; gap: number } {
  return { share: metal > 0 ? offer / metal : 0, gap: metal - offer };
}

/** Une offre « au pennyweight » ou « au gramme » ramenée à une part du métal fin de ce karat. */
export function quoteShare(quotePerUnit: number, unit: 'g' | 'dwt', fineness: number, usdPerOz: number): number {
  const metalPerUnit = unit === 'dwt' ? dwtPrice(fineness, usdPerOz) : gramPrice(fineness, usdPerOz);
  return metalPerUnit > 0 ? quotePerUnit / metalPerUnit : 0;
}

/** Lot de pièces de titres différents (bijoux mêlés) : valeur métal totale et métal fin. */
export function lotValue(items: Array<{ grams: number; fineness: number }>, usdPerOz: number) {
  const fineGrams = items.reduce((s, i) => s + Math.max(0, i.grams) * (i.fineness / 1000), 0);
  return { fineGrams, value: fineGrams * finePerGram(usdPerOz) };
}

/** Métal fin d'une pièce, en grammes : teneur légale en onces troy, ou poids brut × titre. */
export function coinFineGrams(c: Coin): number {
  if (c.fineOz !== undefined) return c.fineOz * OZ;
  return (c.grossG ?? 0) * ((c.fineness ?? 0) / 1000);
}
/** Titre implicite d'une pièce (once d'or fin ÷ poids brut). */
export const coinFineness = (c: Coin) => (c.fineness !== undefined ? c.fineness : c.grossG ? (coinFineGrams(c) / c.grossG) * 1000 : 1000);
export const coinMetalValue = (c: Coin, usdPerOz: number) => coinFineGrams(c) * finePerGram(usdPerOz);
export const coinById = (id: string) => {
  const c = P.coins.find((x) => x.id === id);
  if (!c) throw new Error(`pièce inconnue ${id}`);
  return c;
};

/** Prime payée au-dessus du métal (0,05 = 5 %). */
export const premium = (price: number, metal: number) => (metal > 0 ? price / metal - 1 : 0);

/** Or plaqué ou « gold filled » : part du poids qui est de l'alliage d'or, selon la marque FTC. */
export type PlateKind = 'gf' | 'rgp' | 'plate' | 'solid';
export function plateGoldGrams(grams: number, kind: PlateKind, karat: number, share?: number): { goldAlloyGrams: number; fineGrams: number; share: number } {
  const s = kind === 'solid' ? 1 : kind === 'gf' ? (share ?? P.plating.goldFilledMinWeightShare) : kind === 'rgp' ? (share ?? P.plating.rolledGoldPlateMinWeightShare) : 0;
  const goldAlloyGrams = Math.max(0, grams) * s;
  return { goldAlloyGrams, fineGrams: goldAlloyGrams * (finenessOfKarat(karat) / 1000), share: s };
}

/** Teneur minimale réelle d'un article marqué d'un karat, tolérance du National Stamping Act comprise. */
export function minimumFineness(k: number, soldered: boolean, watchOrFlatware = false): number {
  const t = soldered ? (watchOrFlatware ? P.tolerance.goldWatchcaseFlatware : P.tolerance.goldWithSolder) : P.tolerance.goldNoSolder;
  return finenessOfKarat(k) - t;
}

/** Impôt fédéral sur la plus-value d'une vente d'or ou d'argent (objets de collection, 26 U.S.C. 1(h)). */
export interface GainIn { proceeds: number; cost: number; costs?: number; heldMonths: number; ordinaryRate: number }
export interface GainOut { gain: number; longTerm: boolean; rate: number; tax: number; rule: 'loss' | 'short' | 'long-capped' | 'long-ordinary' }
export function collectiblesTax(i: GainIn): GainOut {
  const gain = Math.max(0, i.proceeds) - Math.max(0, i.cost) - Math.max(0, i.costs ?? 0);
  const longTerm = i.heldMonths > P.tax.longTermMonths;
  if (gain <= 0) return { gain, longTerm, rate: 0, tax: 0, rule: 'loss' };
  if (!longTerm) return { gain, longTerm, rate: i.ordinaryRate, tax: gain * i.ordinaryRate, rule: 'short' };
  const capped = i.ordinaryRate > P.tax.collectiblesMaxRate;
  const rate = capped ? P.tax.collectiblesMaxRate : i.ordinaryRate;
  return { gain, longTerm, rate, tax: gain * rate, rule: capped ? 'long-capped' : 'long-ordinary' };
}

/** Déclarations du négociant : formulaire 8300 (espèces) et test 1099-B (forme et quantité). */
export interface ReportIn { cash: number; cftcForm: boolean; meetsMinimum: boolean }
export function dealerReports(i: ReportIn): { form8300: boolean; form1099b: boolean } {
  return { form8300: i.cash > P.reporting.form8300CashOver, form1099b: i.cftcForm && i.meetsMinimum };
}

/** Taxe de vente d'un État sur un achat de métal d'investissement : taxé ou non, et pourquoi. */
export interface SalesTaxOut { taxable: boolean; rule: StateRule['rule']; threshold?: number; tax: number; rateKnown: boolean }
export function salesTaxOn(state: StateRule, amount: number): SalesTaxOut {
  const a = Math.max(0, amount);
  let taxable = false;
  if (state.rule === 'taxed') taxable = true;
  else if (state.rule === 'threshold') taxable = state.thresholdInclusive === false ? a <= (state.threshold ?? 0) : a < (state.threshold ?? 0);
  const rateKnown = typeof state.rate === 'number';
  return { taxable, rule: state.rule, threshold: state.threshold, tax: taxable && rateKnown ? a * (state.rate as number) : 0, rateKnown };
}
