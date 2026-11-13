/** Offre d'exemple : une part de la valeur métal au relevé du build, arrondie à 5 $. Jamais au-dessus de
 *  100 % (un acheteur ne paie pas plus que l'or). Ce n'est pas un taux de marché : aucun organisme n'en
 *  publie. Partagée par les calculateurs et par le texte des pages : l'offre citée en exemple dans le texte
 *  est celle que montre le calculateur (même calcul, même arrondi). */
import { metalValue, finenessOfKarat } from './engine/metal';
import { SNAPSHOT } from './engine/params';

export const exampleOffer = (g: number, k: number, share: number) => Math.round(metalValue(g, finenessOfKarat(k), SNAPSHOT.usdPerOz.XAU) * share / 5) * 5;
