/** 24K est compté à 999 ‰ (params-2026.json, poinçon « 999 ») : son gramme vaut 0,1 % de moins que le gramme d'or
 *  pur à 100 % que donne le cours (testeurs naïfs du 2026-11-14 : « $124.99 a gram of pure gold » à côté de
 *  « 24K … $124.86 », sans explication). La phrase affiche les deux montants, formatés comme dans les tableaux. */
import { finePerGram, gramPrice, finenessOfKarat } from './engine/metal';
import { usd2 } from './money';
export const gram24K = (oz: number) => gramPrice(finenessOfKarat(24), oz);
export const PURITY_24K = (oz: number) => `24K is counted as 999 parts gold in 1,000, or 99.9% pure, so a gram of it is worth ${usd2(gram24K(oz))}, a few cents below the ${usd2(finePerGram(oz))} of a gram of 100% pure gold.`;
/** Version courte, sous le tableau du premier écran. */
export const PURITY_24K_COURT = (oz: number) => `24K is 99.9% gold, so its gram is a few cents below the ${usd2(finePerGram(oz))} of a gram of 100% pure gold.`;
