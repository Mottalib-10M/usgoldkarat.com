/** Paramètres 2026 (RECETTE §4) : toute valeur réglementaire se lit ici, jamais en dur dans une page. */
import raw from '../../data/params-2026.json';
import snapRaw from '../../data/spot-snapshot.json';
import statesRaw from '../../data/states-sales-tax.json';

export type Metal = 'XAU' | 'XAG';
export const METALS: Metal[] = ['XAU', 'XAG'];
export interface GoldGrade { k: number; fineness: number; stamp: string; common: boolean }
export interface Coin { id: string; name: string; grossG?: number; fineOz?: number; fineness?: number; metal: Metal; source: string }
export interface Source { url: string; label: { en: string } }

export interface Params {
  year: number; taxYear: string; retrieved_at: string; valid_from: string; valid_to: string;
  units: { grainGrams: number; troyOunceGrains: number; pennyweightGrains: number; avoirdupoisOunceGrams: number };
  gold: GoldGrade[];
  tolerance: { goldNoSolder: number; goldWithSolder: number; goldWatchcaseFlatware: number; silverNoSolder: number; silverWithSolder: number; sterlingMin: number; coinSilverMin: number };
  plating: { goldFilledMinWeightShare: number; rolledGoldPlateMinWeightShare: number; plateMinKarat: number; electroplateMinMicrons: number; heavyElectroplateMinMicrons: number; vermeilMinMicrons: number };
  silver: number[];
  coins: Coin[];
  tax: { collectiblesMaxRate: number; ordinaryRates: number[]; longTermMonths: number };
  reporting: { form8300CashOver: number; form8300Days: number };
  sources: Record<string, Source>;
}
export const P = raw as unknown as Params;
export type SourceKey = keyof typeof raw.sources;

export interface Snapshot { source: string; currency: string; usdPerOz: Record<Metal, number>; at: Record<Metal, string> }
export const SNAPSHOT = snapRaw as Snapshot;

/** Taxe de vente d'un État sur l'or et l'argent d'investissement (lingots, pièces), relue sur le statut ou la
 *  page fiscale de l'État. `rule` : 'none' = pas de taxe de vente générale dans l'État ; 'exempt' = métaux
 *  précieux exonérés quel que soit le montant ; 'threshold' = exonérés à partir de `threshold` dollars par
 *  vente (en dessous, taxés) ; 'taxed' = aucune exonération. `rate` : taux de l'État seul, quand il a été relu. */
export interface StateRule { code: string; name: string; rule: 'none' | 'exempt' | 'threshold' | 'taxed'; threshold?: number; thresholdInclusive?: boolean; scope: string; cite: string; url: string; read: string; rate?: number; rateUrl?: string; note?: string; slug?: string }
export const STATES = (statesRaw as { states: StateRule[] }).states;
export const stateByCode = (c: string) => STATES.find((s) => s.code === c);
