import { describe, it, expect } from 'vitest';
import { OZ, DWT, finenessOfKarat, metalValue, toGrams, fromGrams, coinById, coinFineGrams, plateGoldGrams, minimumFineness, collectiblesTax, dealerReports, salesTaxOn, offerShare } from '../src/lib/engine/metal';
import { stateByCode, STATES } from '../src/lib/engine/params';

describe('unités NIST', () => {
  it('once troy = 480 grains, pennyweight = 24 grains', () => {
    expect(OZ).toBeCloseTo(31.1034768, 7);
    expect(DWT).toBeCloseTo(1.55517384, 8);
    expect(toGrams(20, 'dwt')).toBeCloseTo(OZ, 9);
    expect(fromGrams(28.349523125, 'oz')).toBeCloseTo(1, 9);
  });
});

describe('karats (16 CFR 23.3)', () => {
  it('k/24', () => {
    expect(finenessOfKarat(14)).toBeCloseTo(583.3, 1);
    expect(finenessOfKarat(10)).toBeCloseTo(416.7, 1);
    expect(finenessOfKarat(18)).toBe(750);
    expect(finenessOfKarat(24)).toBe(999);
  });
  it('valeur métal : une once d’or fin = le cours', () => {
    expect(metalValue(OZ, 1000, 4000)).toBeCloseTo(4000, 6);
    expect(metalValue(10, 583.3, 4000)).toBeCloseTo(10 * 0.5833 * 4000 / OZ, 6);
  });
  it('tolérances du Stamping Act', () => {
    expect(minimumFineness(18, false)).toBeCloseTo(747, 6);
    expect(minimumFineness(18, true)).toBeCloseTo(743, 6);
  });
});

describe('pièces (31 U.S.C. 5112)', () => {
  it('Gold Eagle 1 oz = une once troy d’or fin', () => {
    expect(coinFineGrams(coinById('eagle-1oz'))).toBeCloseTo(OZ, 6);
    expect(coinFineGrams(coinById('eagle-tenth'))).toBeCloseTo(OZ / 10, 6);
  });
  it('Silver Eagle 31,103 g à 999', () => {
    expect(coinFineGrams(coinById('silver-eagle'))).toBeCloseTo(31.103 * 0.999, 6);
  });
});

describe('plaqué et rempli', () => {
  it('1/20 14K GF', () => {
    const r = plateGoldGrams(20, 'gf', 14);
    expect(r.goldAlloyGrams).toBeCloseTo(1, 9);
    expect(r.fineGrams).toBeCloseTo(finenessOfKarat(14) / 1000, 9);
    expect(plateGoldGrams(20, 'plate', 14).fineGrams).toBe(0);
  });
});

describe('offre', () => {
  it('part de la valeur métal', () => { expect(offerShare(70, 100).share).toBeCloseTo(0.7, 9); });
});

describe('impôt fédéral (26 U.S.C. 1(h))', () => {
  it('plafond de 28 % à long terme', () => {
    const r = collectiblesTax({ proceeds: 5000, cost: 3000, heldMonths: 24, ordinaryRate: 0.37 });
    expect(r.rule).toBe('long-capped'); expect(r.tax).toBeCloseTo(560, 6);
  });
  it('taux ordinaire plus bas', () => {
    expect(collectiblesTax({ proceeds: 5000, cost: 3000, heldMonths: 24, ordinaryRate: 0.22 }).tax).toBeCloseTo(440, 6);
  });
  it('court terme non plafonné, perte sans impôt', () => {
    expect(collectiblesTax({ proceeds: 5000, cost: 3000, heldMonths: 6, ordinaryRate: 0.37 }).tax).toBeCloseTo(740, 6);
    expect(collectiblesTax({ proceeds: 1000, cost: 3000, heldMonths: 24, ordinaryRate: 0.37 }).rule).toBe('loss');
  });
});

describe('déclarations du négociant', () => {
  it('8300 au-dessus de 10 000 $ en espèces', () => {
    expect(dealerReports({ cash: 10000, cftcForm: false, meetsMinimum: false }).form8300).toBe(false);
    expect(dealerReports({ cash: 10001, cftcForm: false, meetsMinimum: false }).form8300).toBe(true);
  });
  it('1099-B seulement forme et quantité CFTC', () => {
    expect(dealerReports({ cash: 0, cftcForm: true, meetsMinimum: false }).form1099b).toBe(false);
    expect(dealerReports({ cash: 0, cftcForm: true, meetsMinimum: true }).form1099b).toBe(true);
  });
});

describe('taxe de vente des États', () => {
  it('11 États relus', () => { expect(STATES.length).toBe(11); });
  it('Connecticut : exonéré à partir de 1 000 $', () => {
    const ct = stateByCode('CT')!;
    expect(salesTaxOn(ct, 999).taxable).toBe(true);
    expect(salesTaxOn(ct, 1000).taxable).toBe(false);
  });
  it('Maryland et New York : il faut dépasser 1 000 $', () => {
    expect(salesTaxOn(stateByCode('MD')!, 1000).taxable).toBe(true);
    expect(salesTaxOn(stateByCode('NY')!, 1000.01).taxable).toBe(false);
  });
  it('Missouri : exonéré à tout montant', () => { expect(salesTaxOn(stateByCode('MO')!, 50).taxable).toBe(false); });
});

/* Testeurs naïfs du 2026-11-14 : « $124.99 a gram of pure gold » (ligne du cours) et « 24K (999) $124.86 »
 * (tableau) se contredisaient en apparence. Cause : 24K est compté à 999 ‰, le cours est celui de l'or à 100 %.
 * Les deux chiffres doivent rester dans ce rapport exact, et la phrase affichée doit porter les deux. */
import { finePerGram, karatTable, gramPrice } from '../src/lib/engine/metal';
import { PURITY_24K, gram24K } from '../src/lib/purete';
import { usd2 } from '../src/lib/money';
describe('cohérence 24K / or pur', () => {
  for (const oz of [3887.6, 2000, 5123.45]) {
    it(`cours ${oz} $/oz`, () => {
      const row = karatTable(oz).find((r) => r.k === 24)!;
      expect(row.gram).toBeCloseTo(finePerGram(oz) * 0.999, 9);
      expect(row.gram).toBe(gram24K(oz));
      expect(row.gram).toBeLessThan(finePerGram(oz));
      const phrase = PURITY_24K(oz);
      expect(phrase).toContain(usd2(row.gram));
      expect(phrase).toContain(usd2(finePerGram(oz)));
      // chaque karat du tableau d'accueil = cours du gramme pur × titre
      for (const r of karatTable(oz)) expect(r.gram).toBeCloseTo(finePerGram(oz) * r.fineness / 1000, 9);
      expect(gramPrice(1000, oz)).toBeCloseTo(finePerGram(oz), 9);
    });
  }
});
import { PURITY_24K_COURT } from '../src/lib/purete';
describe('cohérence 24K / or pur, phrase courte du premier écran', () => {
  it('porte le prix du gramme pur affiché par la ligne du cours', () => {
    expect(PURITY_24K_COURT(3887.6)).toContain(usd2(finePerGram(3887.6)));
  });
});
