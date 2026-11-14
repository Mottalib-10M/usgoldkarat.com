/**
 * Tous les calculateurs du site, choisis par `tool`. Chacun appelle le moteur (lib/engine/metal.ts) et
 * lit le cours par useSpot() : premier rendu = relevé du build (HTML servi), puis cours du moment
 * (RECETTE §17.5). L'état ne s'écrit dans l'adresse qu'après une action (url-state.ts, §18.1).
 */
import { useEffect, useState } from 'react';
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import Toggle from '../ui/Toggle';
import { useSpot } from '../../lib/live';
import { P, SNAPSHOT, STATES, stateByCode, type Metal } from '../../lib/engine/params';
import { finenessOfKarat, stampOfKarat, metalValue, gramPrice, dwtPrice, karatTable, toGrams, fromGrams, offerShare, lotValue, coinFineGrams, coinMetalValue, coinById, coinFineness, premium, quoteShare, plateGoldGrams, minimumFineness, collectiblesTax, dealerReports, salesTaxOn, finePerGram, OZ, DWT, UNIT_LABEL, type Unit, type PlateKind } from '../../lib/engine/metal';
import { usd, usd0, usd2, pct, grams, clock } from '../../lib/money';
import { formatNumber, formatDecimal } from '../../lib/format';
import { readParams, num, str, updateURL } from '../../lib/url-state';
import { SpotLine, Row, Frame, Big, Table, KaratSelect, UnitSelect, METAL_NAME, useExample, ExampleNote, fin } from './common';
import { exampleOffer } from '../../lib/exemple';
import { PURITY_24K, PURITY_24K_COURT } from '../../lib/purete';

export interface ToolArgs { tool: string; mini?: boolean; title?: string; idp?: string; k?: number; unit?: string; coin?: string; fineness?: number; metal?: string; kind?: string; grams?: number; offer?: number; state?: string; quoteUnit?: string }

const OFFER_PATH = '/en/cash-for-gold-offer-checker/';
const COMPARE_PATH = '/en/sell-gold-near-me/';
const NO_FAIR_RATE = 'Is it a good offer? No law or agency publishes what buyers pay, so the only yardstick is a second quote: ask one or two other buyers to price the same pieces today. The highest share wins. 100% would be every cent the gold is worth.';
const pointsWorth = (value: number) => (value > 0 ? `Each extra 10% a buyer pays is ${usd(value / 10)} more for you.` : '');
/** Les deux bornes au même format (testeurs naïfs du 2026-11-14 : « $687.47 to $1,031 » faisait négligé). */
const payRange = (value: number) => { const f = value * 0.9 >= 1000 ? usd0 : usd2; return `At 60% to 90% of this value, a buyer would pay ${f(value * 0.6)} to ${f(value * 0.9)}. Those are two reference points, not a market rate.`; };
/** Où se place une offre par rapport aux deux repères de 60 % et 90 % donnés sur l'accueil (testeurs naïfs du
 *  2026-11-14 : « Is it a good offer? » restait sans réponse). Pas de chiffre nouveau : les mêmes repères. */
const verdict = (share: number) => share < 0.6 ? `That is below 60%, the low reference point on this site: ask one or two other buyers before you say yes.`
  : share < 0.9 ? `That is between the 60% and 90% reference points on this site. Only a second quote shows whether you can get more.`
  : `That is 90% or more, the high reference point on this site: few buyers pay more than that for scrap gold.`;
const OFFER_HELP = 'The total for all the pieces. Quoted per gram or per pennyweight? Multiply by the weight. No offer yet? Leave it empty.';
const OVER_100 = 'More than the gold is worth: check the weight and karat the buyer wrote down, or ask whether it is paying for the piece as jewelry rather than as metal.';
const timeOf = (s: ReturnType<typeof useSpot>, m: Metal = 'XAU') => clock(s[m].live ? s[m].at : SNAPSHOT.at[m]);

const MINI_TITLES: Record<string, string> = {
  offer: 'Check an offer for this gold', compare: 'Compare two or three quotes', scrap: 'Value a mixed lot of scrap gold',
  quote: 'Turn a price per pennyweight into a share of the gold', units: 'Convert grams, pennyweights and ounces', gains: 'Federal tax on the sale',
  salestax: 'Is the purchase taxed in this state?', plated: 'Gold filled or plated: the gold inside', coin: 'Melt value of a coin',
};

export default function Tool(a0: ToolArgs) {
  const a = { ...a0, title: a0.title ?? (a0.mini ? MINI_TITLES[a0.tool] : undefined) };
  switch (a.tool) {
    case 'board': return <Board {...a} />;
    case 'prices': return <Prices />;
    case 'karat': return <KaratTool {...a} />;
    case 'offer': return <Offer {...a} />;
    case 'scrap': return <Scrap {...a} />;
    case 'compare': return <Compare {...a} />;
    case 'units': return <Units {...a} />;
    case 'coin': return <CoinTool {...a} />;
    case 'silver': return <Silver {...a} />;
    case 'quote': return <Quote {...a} />;
    case 'plated': return <Plated {...a} />;
    case 'gains': return <Gains {...a} />;
    case 'reports': return <Reports {...a} />;
    case 'salestax': return <SalesTax {...a} />;
    default: return null;
  }
}

/* ---------- Accueil, premier écran : le prix du gramme de chaque karat (la réponse que promet la recherche) ----------
 * Testeurs naïfs du 2026-11-14 : la liste « 10K (417): 1 g · 1 dwt / $52.08 · $81.00 » était sous le calculateur,
 * sans en-têtes, et le premier gros chiffre était un exemple (10 g de 14K). Deux colonnes nommées, au-dessus. */
function Prices() {
  const spot = useSpot(['XAU']);
  const oz = spot.XAU.usdPerOz;
  const rows = karatTable(oz).filter((r) => r.common);
  return (
    <section aria-labelledby="prix-du-jour" className="rounded-lg border border-accent-300 bg-white px-3 py-2 sm:px-4" data-chrome>
      <h2 id="prix-du-jour" className="text-base font-semibold leading-snug text-navy-900">Gold price per gram today, by karat</h2>
      <table className="mt-1 w-full text-sm">
        <thead><tr className="text-left text-xs font-medium text-navy-600"><th className="py-0.5 pr-2 font-medium">Karat (stamp)</th><th className="py-0.5 pr-2 text-right font-medium">Per gram</th><th className="py-0.5 text-right font-medium">Per pennyweight{'\u00a0'}(1.555{'\u00a0'}g)</th></tr></thead>
        <tbody className="divide-y divide-accent-200">
          {rows.map((r) => <tr key={r.k}><td className="py-0.5 pr-2 font-semibold text-navy-900">{r.k}K <span className="font-normal text-navy-600">({r.stamp})</span></td><td className="tabular-nums py-0.5 pr-2 text-right text-base font-bold text-navy-900">{usd2(r.gram)}</td><td className="tabular-nums py-0.5 text-right text-navy-800">{usd2(r.dwt)}</td></tr>)}
        </tbody>
      </table>
      <p className="mt-1 text-xs text-navy-600">{PURITY_24K_COURT(oz)} {spot.XAU.live ? 'Live price' : 'Price recorded'} at {timeOf(spot)}.</p>
    </section>
  );
}

/* ---------- Accueil : valeur d'un poids ---------- */
function Board({ mini, title, idp = 'b', k: k0 = 14, grams: g0 = 10 }: ToolArgs) {
  const [k, setK] = useState(k0);
  const [w, setW] = useState(g0);
  const [u, setU] = useState<Unit>('g');
  const [offer, setOffer] = useState(0);
  const { example, typed } = useExample(['k', 'w', 'u', 'o']);
  useEffect(() => { const q = readParams(location.search); setK(num(q, 'k', k0)); setW(num(q, 'w', g0)); const uu = str(q, 'u', 'g'); if (['g', 'dwt', 'ozt'].includes(uu)) setU(uu as Unit); setOffer(num(q, 'o', 0)); }, []);
  useEffect(() => { updateURL({ k, w, u, o: offer || undefined }); }, [k, w, u, offer]);
  const spot = useSpot(['XAU']);
  const oz = spot.XAU.usdPerOz;
  const value = metalValue(toGrams(w, u), finenessOfKarat(k), oz);
  const s = offerShare(offer, value);
  const unitShort = u === 'g' ? 'g' : u === 'dwt' ? 'dwt' : 'ozt';
  return (
    <Frame mini={mini} title={title}
      fields={<>
        {example && <ExampleNote>Example: {formatDecimal(w, 3)} {unitShort} of {k}K. Type your own weight.</ExampleNote>}
        <div className="grid grid-cols-2 gap-x-4"><KaratSelect id={`${idp}-k`} value={k} onChange={typed(setK)} /><NumberField id={`${idp}-w`} label="Weight" value={w} onChange={typed(setW)} unit={unitShort} decimals={3} max={100000} /></div>
        <UnitSelect id={`${idp}-u`} value={u} onChange={typed(setU)} units={['g', 'dwt', 'ozt']} label="Weighed in" />
        <div className="-mt-2"><p className="text-xs text-navy-600">Karat (K): the number stamped inside a ring or on a clasp, such as 14K or 585 (585 is the European mark for 14K; the calculator counts 14K as exactly 14/24 gold). No stamp? Choose 10K so the value is not too high. A kitchen scale in grams is fine.</p></div>
      </>}
      result={<>
        <Big label={`${example ? 'Example: ' : ''}${formatDecimal(w, 3)} ${unitShort} of ${k}K gold is worth`} value={usd(value)} sub={<>The gold itself, at the live price of {timeOf(spot)}. A buyer pays less, because it has to melt and refine it.</>} />
        <p className="mt-2 text-sm font-medium text-navy-900">{payRange(value)}</p>
        <p className="mt-2 text-sm text-navy-700">1 gram of {k}K is worth <span className="font-semibold text-navy-900">{usd2(gramPrice(finenessOfKarat(k), oz))}</span> right now; the price of each karat is in the table above the calculator.</p>
      </>}
      foot={mini ? undefined : <div className="mt-4 grid gap-3 border-t border-accent-200 pt-4 md:grid-cols-2">
        <div>
          <NumberField id={`${idp}-o`} label="Already have an offer? (optional)" value={offer} onChange={typed(setOffer)} unit="$" decimals={2} max={10000000} help={OFFER_HELP} />
          {offer > 0 && <div aria-live="polite" className="mt-2">
            <p className="text-base font-semibold text-navy-900">Your offer of {usd(offer)} pays {pct(s.share)} of this gold value{s.gap > 0 ? <>; the buyer keeps {usd(s.gap)}</> : null}.</p>
            <p className={`mt-1 text-sm ${s.share > 1 ? 'text-amber-800' : 'text-navy-700'}`}>{s.share > 1 ? OVER_100 : <>{verdict(s.share)} {pointsWorth(value)}</>}</p>
            <p className="mt-1 text-sm"><a href={`${OFFER_PATH}?k=${k}&g=${formatDecimal(toGrams(w, u), 3)}&o=${offer}`} className="font-medium text-accent-700 underline hover:text-navy-900">What to check before you say yes →</a></p>
          </div>}
        </div>
        <SpotLine spot={spot} metals={['XAU']} />
      </div>} />
  );
}

/* ---------- Page d'un karat ---------- */
function KaratTool({ mini, title, idp = 'c', k = 14, grams: g0 = 10 }: ToolArgs) {
  const [w, setW] = useState(g0);
  const [u, setU] = useState<Unit>('g');
  const { example, typed } = useExample(['w', 'u']);
  useEffect(() => { const q = readParams(location.search); setW(num(q, 'w', g0)); const uu = str(q, 'u', 'g'); if (['g', 'dwt', 'ozt'].includes(uu)) setU(uu as Unit); }, []);
  useEffect(() => { updateURL({ w, u }); }, [w, u]);
  const spot = useSpot(['XAU']);
  const oz = spot.XAU.usdPerOz;
  const f = finenessOfKarat(k);
  const g = toGrams(w, u);
  const value = metalValue(g, f, oz);
  const unitShort = u === 'g' ? 'g' : u === 'dwt' ? 'dwt' : 'ozt';
  return (
    <Frame mini={mini} title={title} spotLine={<SpotLine spot={spot} metals={['XAU']} />}
      fields={<>
        {example && <ExampleNote>Example: {formatDecimal(w, 3)} {unitShort}{u === 'g' && Math.abs(w - OZ) < 0.001 ? ', one troy ounce, the weight of a 1 ounce bar or coin' : ''}. Type the weight of your own {k}K piece.</ExampleNote>}
        <div className="grid grid-cols-2 gap-x-4"><NumberField id={`${idp}-w`} label={`Weight of your ${k}K gold`} value={w} onChange={typed(setW)} unit={unitShort} decimals={3} max={100000} />
          <UnitSelect id={`${idp}-u`} value={u} onChange={typed(setU)} units={['g', 'dwt', 'ozt']} label="Weighed in" /></div>
        <p className="-mt-2 text-xs text-navy-600">Stones, clasps and springs add weight but no gold, so the real value of the piece is a little lower.</p>
      </>}
      result={<>
        <Big label={`${example ? 'Example: ' : ''}${formatDecimal(w, 3)} ${unitShort} of ${k}K gold is worth`} value={usd(value)} sub={<>The gold itself, at the live price of {timeOf(spot)}. A buyer pays less.</>} />
        <p className="mt-2 text-sm font-medium text-navy-900">{payRange(value)}</p>
        <Table caption={`${k}K gold value`}>
          <Row label="Pure gold inside" value={grams(g * f / 1000, 3)} />
          <Row label={`1 gram of ${k}K`} value={usd2(gramPrice(f, oz))} />
          <Row label={`1 pennyweight of ${k}K`} value={usd2(dwtPrice(f, oz))} />
          {k === 24 && <Row label="1 gram of 100% pure gold (spot price)" value={usd2(finePerGram(oz))} />}
        </Table>
        {k === 24 && <p className="mt-2 text-sm text-navy-700">{PURITY_24K(oz)}</p>}
      </>} />
  );
}

/* ---------- Vérificateur d'offre ---------- */
function Offer({ mini, title, idp = 'o', k: k0 = 14, grams: g0 = 10, offer: given }: ToolArgs) {
  const o0 = given ?? exampleOffer(g0, k0, 0.7);
  const [k, setK] = useState(k0);
  const [g, setG] = useState(g0);
  const [offer, setOffer] = useState(o0);
  const [example, setExample] = useState(given === undefined);
  useEffect(() => { const q = readParams(location.search); const kk = num(q, 'k', k0), gg = num(q, 'g', g0); setK(kk); setG(gg); setOffer(num(q, 'o', gg === g0 && kk === k0 ? o0 : exampleOffer(gg, kk, 0.7))); if (q.has('o')) setExample(false); }, []);
  useEffect(() => { updateURL({ k, g, o: offer }); }, [k, g, offer]);
  const spot = useSpot(['XAU']);
  const value = metalValue(g, finenessOfKarat(k), spot.XAU.usdPerOz);
  const s = offerShare(offer, value);
  const scale = Math.max(value, offer);
  return (
    <Frame mini={mini} title={title} spotLine={<SpotLine spot={spot} metals={['XAU']} />}
      fields={<>
        <div className="grid grid-cols-2 gap-x-4"><KaratSelect id={`${idp}-k`} value={k} onChange={(v) => setK(v)} /><NumberField id={`${idp}-g`} label="Weight" value={g} onChange={setG} unit="g" decimals={3} max={100000} /></div>
        {example && <p data-exemple className="rounded bg-accent-50 px-2 py-1 text-sm font-medium text-navy-900">Example: {formatDecimal(g, 3)} g of {k}K and a made-up offer of {usd(offer)}. Type your own weight and the offer you were given.</p>}
        <NumberField id={`${idp}-o`} label="Offer you were given (total)" value={offer} onChange={(v) => { setOffer(v); setExample(false); }} unit="$" decimals={2} max={10000000} help={OFFER_HELP} />
      </>}
      result={<>
        <Big label={example ? 'Example: this offer pays' : 'This offer pays'} value={pct(s.share)} sub={<>of the {usd(value)} the gold is worth in {formatDecimal(g, 3)} g of {k}K, at the live price of {timeOf(spot)}</>} />
        <p className={`mt-2 text-sm font-medium ${s.share > 1 ? 'text-amber-800' : 'text-navy-900'}`}>{s.share > 1 ? OVER_100 : <>{verdict(s.share)} {pointsWorth(value)}</>}</p>
        <p className="mt-1 text-sm"><a href={`${COMPARE_PATH}?k=${k}&g=${g}${example ? '' : `&x=${offer}`}`} className="font-medium text-accent-700 underline hover:text-navy-900">Got two or three quotes? Compare them side by side →</a></p>
        <Table caption="Offer compared with the melt value">
          <Row label="Melt value of the gold" value={usd(value)} bar={scale > 0 ? value / scale : 0} />
          <Row label="Offer" value={usd(offer)} bar={scale > 0 ? offer / scale : 0} />
          <Row label={s.gap >= 0 ? 'Kept by the buyer' : 'Offer above the melt value'} value={usd(Math.abs(s.gap))} strong />
          <Row label="Offer per gram · per pennyweight" value={g > 0 ? `${usd2(offer / g)} · ${usd2(offer / g * DWT)}` : '–'} />
        </Table>
      </>} />
  );
}

/* ---------- Lot mêlé ---------- */
function Scrap({ mini, title, idp = 's' }: ToolArgs) {
  const KS = [10, 14, 18, 22, 24];
  const KEYS = ['a', 'b', 'c', 'd', 'e'];
  const DEF: Record<number, number> = { 10: 6, 14: 8, 18: 0, 22: 0, 24: 0 };
  const [q, setQ] = useState<Record<number, number>>(DEF);
  const [u, setU] = useState<Unit>('g');
  const [offer, setOffer] = useState(0);
  const [example, setExample] = useState(true);
  useEffect(() => { const p = readParams(location.search); setQ(Object.fromEntries(KS.map((k, i) => [k, num(p, KEYS[i], DEF[k])]))); const uu = str(p, 'u', 'g'); if (['g', 'dwt'].includes(uu)) setU(uu as Unit); setOffer(num(p, 'o', 0)); if (KEYS.some((x) => p.has(x))) setExample(false); }, []);
  useEffect(() => { updateURL({ ...Object.fromEntries(KS.map((k, i) => [KEYS[i], q[k] || undefined])), u, o: offer || undefined }); }, [q, u, offer]);
  const spot = useSpot(['XAU']);
  const lot = lotValue(KS.map((k) => ({ grams: toGrams(q[k], u), fineness: finenessOfKarat(k) })), spot.XAU.usdPerOz);
  const set = (k: number) => (v: number) => { setExample(false); setQ((o) => ({ ...o, [k]: v })); };
  const s = offerShare(offer, lot.value);
  return (
    <Frame mini={mini} title={title} spotLine={<SpotLine spot={spot} metals={['XAU']} />}
      fields={<>
        {example && <p data-exemple className="rounded bg-accent-50 px-2 py-1 text-sm font-medium text-navy-900">Example: a 6 g chain in 10K and an 8 g class ring in 14K. Type the weights of your own pieces.</p>}
        <UnitSelect id={`${idp}-u`} value={u} onChange={(v) => { setExample(false); setU(v); }} units={['g', 'dwt']} label="Weights in" />
        <div className="grid grid-cols-2 gap-x-4 gap-y-3">{KS.map((k) => <NumberField key={k} id={`${idp}-${k}`} label={`${k}K`} value={q[k]} onChange={set(k)} unit={u === 'g' ? 'g' : 'dwt'} decimals={3} max={100000} />)}</div>
        <p className="-mt-2 text-xs text-navy-600">Leave empty the karats you do not have. Unmarked pieces go under 10K.</p>
      </>}
      result={<>
        <Big label={example ? 'Example: melt value of the whole lot' : 'Melt value of the whole lot'} value={usd(lot.value)} sub={<>{grams(lot.fineGrams, 3)} of pure gold, at the live price of {timeOf(spot)}.</>} />
        <Table caption="Payout at different shares of the melt value">
          {[60, 70, 80, 90].map((p) => <Row key={p} label={`Paid at ${p}% of melt`} value={usd(lot.value * p / 100)} />)}
        </Table>
      </>}
      foot={mini ? undefined : <div className="mt-4 border-t border-accent-200 pt-4 md:max-w-[50%]">
        <NumberField id={`${idp}-o`} label="Offer for the whole lot (optional)" value={offer} onChange={(v) => { setExample(false); setOffer(v); }} unit="$" decimals={2} max={10000000} help={OFFER_HELP} />
        {offer > 0 && <p aria-live="polite" className="mt-2 text-base font-semibold text-navy-900">The offer of {usd(offer)} pays {pct(s.share)} of the gold in the lot{s.gap > 0 ? <>; the buyer keeps {usd(s.gap)}</> : null}.</p>}
      </div>} />
  );
}

/* ---------- Comparer trois devis ---------- */
function Compare({ mini, title, idp = 'cp', k: k0 = 14, grams: g0 = 10 }: ToolArgs) {
  const ex = (gg: number, kk: number): [number, number, number] => [exampleOffer(gg, kk, 0.6), exampleOffer(gg, kk, 0.75), 0];
  const [k, setK] = useState(k0);
  const [g, setG] = useState(g0);
  const [o, setO] = useState<[number, number, number]>(ex(g0, k0));
  const [example, setExample] = useState(true);
  useEffect(() => { const q = readParams(location.search); const kk = num(q, 'k', k0), gg = num(q, 'g', g0); const d = ex(gg, kk); setK(kk); setG(gg); setO([num(q, 'x', d[0]), num(q, 'y', d[1]), num(q, 'z', 0)]); if (q.has('x') || q.has('y')) setExample(false); }, []);
  useEffect(() => { updateURL({ k, g, x: o[0], y: o[1], z: o[2] }); }, [k, g, o]);
  const spot = useSpot(['XAU']);
  const value = metalValue(g, finenessOfKarat(k), spot.XAU.usdPerOz);
  const scale = Math.max(value, ...o);
  const names = ['Quote A', 'Quote B', 'Quote C'];
  const best = o.reduce((bi, v, i) => (v > o[bi] ? i : bi), 0);
  const pos = o.filter((v) => v > 0);
  const setI = (i: number) => (v: number) => { setExample(false); setO((x) => { const y = [...x] as [number, number, number]; y[i] = v; return y; }); };
  return (
    <Frame mini={mini} title={title} spotLine={<SpotLine spot={spot} metals={['XAU']} />}
      fields={<>
        <div className="grid grid-cols-2 gap-x-4"><KaratSelect id={`${idp}-k`} value={k} onChange={setK} /><NumberField id={`${idp}-g`} label="Weight" value={g} onChange={setG} unit="g" decimals={3} max={100000} /></div>
        {example && <p data-exemple className="rounded bg-accent-50 px-2 py-1 text-sm font-medium text-navy-900">Example: {formatDecimal(g, 3)} g of {k}K and two made-up quotes. Type the quotes you were given.</p>}
        <div className="grid grid-cols-2 gap-x-4"><NumberField id={`${idp}-x`} label="Quote A" value={o[0]} onChange={setI(0)} unit="$" decimals={2} max={10000000} /><NumberField id={`${idp}-y`} label="Quote B" value={o[1]} onChange={setI(1)} unit="$" decimals={2} max={10000000} /></div>
        <NumberField id={`${idp}-z`} label="Quote C (optional)" value={o[2]} onChange={setI(2)} unit="$" decimals={2} max={10000000} help="Leave at 0 if you only have two quotes" />
      </>}
      result={<>
        <Big label={`${example ? 'Example: ' : ''}${names[best]} pays the most`} value={pct(value > 0 ? o[best] / value : 0)} sub={<>of the {usd(value)} melt value of {formatDecimal(g, 3)} g of {k}K</>} />
        <Table caption="Each quote as a share of the melt value">
          {o.map((v, i) => v > 0 && <Row key={i} label={`${names[i]}: ${usd(v)}`} value={pct(value > 0 ? v / value : 0)} bar={scale > 0 ? v / scale : 0} strong={i === best} />)}
          <Row label="Gap between best and worst" value={usd(pos.length ? Math.max(...pos) - Math.min(...pos) : 0)} />
        </Table>
      </>} />
  );
}

/* ---------- Unités ---------- */
function Units({ mini, title, idp = 'u', unit = 'dwt', k: k0 = 14 }: ToolArgs) {
  const [n, setN] = useState(5);
  const [u, setU] = useState<Unit>(unit as Unit);
  const [k, setK] = useState(k0);
  const { example, typed } = useExample(['n', 'u', 'k']);
  useEffect(() => { const q = readParams(location.search); setN(num(q, 'n', 5)); const uu = str(q, 'u', unit); if (uu in UNIT_LABEL) setU(uu as Unit); setK(num(q, 'k', k0)); }, []);
  useEffect(() => { updateURL({ n, u, k }); }, [n, u, k]);
  const spot = useSpot(['XAU']);
  const g = toGrams(n, u);
  const value = metalValue(g, finenessOfKarat(k), spot.XAU.usdPerOz);
  return (
    <Frame mini={mini} title={title} spotLine={<SpotLine spot={spot} metals={['XAU']} />}
      fields={<>
        {example && <ExampleNote>Example: {formatDecimal(n, 4)} {UNIT_LABEL[u]} of {k}K. Type your own quantity.</ExampleNote>}
        <div className="grid grid-cols-2 gap-x-4"><NumberField id={`${idp}-n`} label="Quantity" value={n} onChange={typed(setN)} decimals={4} max={1000000} />
          <UnitSelect id={`${idp}-u`} value={u} onChange={typed(setU)} units={['dwt', 'g', 'ozt', 'oz', 'grain']} /></div>
        <KaratSelect id={`${idp}-k`} value={k} onChange={typed(setK)} />
      </>}
      result={<>
        <Big label={`${example ? 'Example: ' : ''}${formatDecimal(n, 4)} ${UNIT_LABEL[u]} of ${k}K`} value={usd(value)} sub={`${grams(g, 3)} of ${k}K gold, ${stampOfKarat(k)} parts gold in 1,000`} />
        <Table caption="The same weight in other units">
          <Row label="Grams" value={formatNumber(g, 3)} />
          <Row label="Pennyweights (dwt)" value={formatNumber(fromGrams(g, 'dwt'), 3)} />
          <Row label="Troy ounces" value={formatNumber(fromGrams(g, 'ozt'), 4)} />
          <Row label="Regular (avoirdupois) ounces" value={formatNumber(fromGrams(g, 'oz'), 4)} />
          <Row label="Grains" value={formatNumber(fromGrams(g, 'grain'), 1)} />
        </Table>
      </>} />
  );
}

/* ---------- Pièces ---------- */
function CoinTool({ mini, title, idp = 'cn', coin = 'eagle-1oz' }: ToolArgs) {
  const [id, setId] = useState(coin);
  const [n, setN] = useState(1);
  const [price, setPrice] = useState(0);
  const { example, typed } = useExample(['c', 'n', 'p']);
  useEffect(() => { const q = readParams(location.search); const c = str(q, 'c', coin); if (P.coins.some((x) => x.id === c)) setId(c); setN(num(q, 'n', 1)); setPrice(num(q, 'p', 0)); }, []);
  useEffect(() => { updateURL({ c: id, n, p: price || undefined }); }, [id, n, price]);
  const c = coinById(id);
  const spot = useSpot([c.metal]);
  const one = coinMetalValue(c, spot[c.metal].usdPerOz);
  const total = one * n;
  const metalWord = c.metal === 'XAG' ? 'silver' : 'gold';
  return (
    <Frame mini={mini} title={title} spotLine={<SpotLine spot={spot} metals={[c.metal]} />}
      fields={<>
        {example && <ExampleNote>Example: {n} × {c.name}. Choose your coin and how many you have.</ExampleNote>}
        <SelectField id={`${idp}-c`} label="Coin" value={id} onChange={typed(setId)} options={P.coins.map((x) => ({ value: x.id, label: x.name }))} />
        <NumberField id={`${idp}-n`} label="How many" value={n} onChange={typed(setN)} max={10000} />
        <NumberField id={`${idp}-p`} label="Price offered or asked for them all (optional)" value={price} onChange={typed(setPrice)} unit="$" decimals={2} max={100000000} help="No price yet? Leave it empty." />
      </>}
      result={<>
        <Big label={`${example ? 'Example: m' : 'M'}elt value of ${n} × ${c.name}`} value={usd(total)} sub={<>{grams(coinFineGrams(c), 3)} of pure {metalWord} per coin, at the live price of {timeOf(spot, c.metal)}.</>} />
        <Table caption="Coin melt value">
          {c.grossG !== undefined && <Row label="Weight of one coin (set by law)" value={grams(c.grossG, 3)} />}
          <Row label={`Share of the coin that is ${metalWord}`} value={`${fin(Math.round(coinFineness(c) * 10) / 10)} parts in 1,000`} />
          {n > 1 && <Row label="One coin" value={usd2(one)} />}
          {price > 0 && <Row label="Price as a share of melt" value={`${pct(total > 0 ? price / total : 0)} (${premium(price, total) >= 0 ? '+' : ''}${pct(premium(price, total))})`} strong />}
        </Table>
      </>} />
  );
}

/* ---------- Argent ---------- */
function Silver({ mini, title, idp = 'ag', fineness = 999, grams: g0 = 31.1 }: ToolArgs) {
  const [f, setF] = useState(fineness);
  const [n, setN] = useState(g0);
  const [u, setU] = useState<Unit>('g');
  const { example, typed } = useExample(['f', 'n', 'u']);
  useEffect(() => { const q = readParams(location.search); setF(num(q, 'f', fineness)); setN(num(q, 'n', g0)); const uu = str(q, 'u', 'g'); if (['g', 'ozt', 'oz', 'dwt'].includes(uu)) setU(uu as Unit); }, []);
  useEffect(() => { updateURL({ f, n, u }); }, [f, n, u]);
  const spot = useSpot(['XAG']);
  const oz = spot.XAG.usdPerOz;
  const value = metalValue(toGrams(n, u), f, oz);
  const label = (s: number) => (s === 925 ? '925 sterling' : s === 900 ? '900 coin silver' : s === 999 ? '999 fine silver' : `${s}`);
  return (
    <Frame mini={mini} title={title} spotLine={<SpotLine spot={spot} metals={['XAG']} />}
      fields={<>
        {example && <ExampleNote>Example: {formatDecimal(n, 3)} {u === 'ozt' ? 'troy oz' : u} of {label(f)}. Type the weight of your own silver.</ExampleNote>}
        <SelectField id={`${idp}-f`} label="Silver standard" value={String(f)} onChange={(v) => typed(setF)(Number(v))} options={P.silver.map((s) => ({ value: String(s), label: label(s) }))} />
        <div className="grid grid-cols-2 gap-x-4"><NumberField id={`${idp}-n`} label="Weight" value={n} onChange={typed(setN)} decimals={3} max={1000000} />
          <UnitSelect id={`${idp}-u`} value={u} onChange={typed(setU)} units={['g', 'ozt', 'dwt', 'oz']} /></div>
      </>}
      result={<>
        <Big label={`${example ? 'Example: ' : ''}${formatDecimal(n, 3)} ${u === 'ozt' ? 'troy oz' : u} of ${label(f)}`} value={usd(value)} sub={<>Melt value of the silver itself at the live price of {timeOf(spot, 'XAG')}, before a buyer takes its cut.</>} />
        <Table caption="Silver price by unit">
          <Row label={`1 g at ${f}`} value={usd2(gramPrice(f, oz))} />
          <Row label={`1 pennyweight at ${f}`} value={usd2(dwtPrice(f, oz))} />
          <Row label={`1 troy oz at ${f}`} value={usd2(gramPrice(f, oz) * OZ)} />
          <Row label="Pure silver, per gram" value={usd2(finePerGram(oz))} />
        </Table>
      </>} />
  );
}

/* ---------- Prix d'achat au pennyweight ou au gramme → part du métal ---------- */
function Quote({ mini, title, idp = 'qt', k: k0 = 14, quoteUnit = 'dwt' }: ToolArgs) {
  const [k, setK] = useState(k0);
  const [qu, setQu] = useState(quoteUnit);
  const spot0 = SNAPSHOT.usdPerOz.XAU;
  const def = Math.round((qu === 'dwt' ? dwtPrice(finenessOfKarat(k0), spot0) : gramPrice(finenessOfKarat(k0), spot0)) * 0.55);
  const [price, setPrice] = useState(def);
  const { example, typed } = useExample(['k', 'qu', 'q']);
  useEffect(() => { const q = readParams(location.search); setK(num(q, 'k', k0)); const uu = str(q, 'qu', quoteUnit); if (uu === 'g' || uu === 'dwt') setQu(uu); setPrice(num(q, 'q', def)); }, []);
  useEffect(() => { updateURL({ k, qu, q: price }); }, [k, qu, price]);
  const spot = useSpot(['XAU']);
  const oz = spot.XAU.usdPerOz;
  const f = finenessOfKarat(k);
  const share = quoteShare(price, qu as 'g' | 'dwt', f, oz);
  const melt = qu === 'dwt' ? dwtPrice(f, oz) : gramPrice(f, oz);
  return (
    <Frame mini={mini} title={title} spotLine={<SpotLine spot={spot} metals={['XAU']} />}
      fields={<>
        {example && <ExampleNote>Example: a made-up posted price of {usd2(price)} per {qu === 'dwt' ? 'pennyweight' : 'gram'} for {k}K. Type the price on the board or in the text you got.</ExampleNote>}
        <div className="grid grid-cols-2 gap-x-4"><KaratSelect id={`${idp}-k`} value={k} onChange={typed(setK)} />
          <SelectField id={`${idp}-qu`} label="Price is per" value={qu} onChange={typed(setQu)} options={[{ value: 'dwt', label: 'dwt' }, { value: 'g', label: 'gram' }]} /></div>
        <NumberField id={`${idp}-q`} label="Buyer's posted price" value={price} onChange={typed(setPrice)} unit="$" decimals={2} max={100000} />
      </>}
      result={<>
        <Big label={`${example ? 'Example: ' : ''}this price pays`} value={pct(share)} sub={<>of the melt value of {k}K, which is {usd2(melt)} per {qu === 'dwt' ? 'pennyweight' : 'gram'} at {timeOf(spot)}</>} />
        <Table caption="Posted price compared with melt value">
          <Row label={`Melt value per ${qu === 'dwt' ? 'pennyweight' : 'gram'}`} value={usd2(melt)} />
          <Row label="Posted price" value={usd2(price)} />
          <Row label={qu === 'dwt' ? 'Same price per gram' : 'Same price per pennyweight'} value={usd2(qu === 'dwt' ? price / DWT : price * DWT)} />
          <Row label="Kept by the buyer per unit" value={usd2(Math.max(0, melt - price))} strong />
        </Table>
        {share > 1 && <p className="mt-2 text-sm text-amber-800">{OVER_100}</p>}
      </>} />
  );
}

/* ---------- Or plaqué ou « gold filled » ---------- */
function Plated({ mini, title, idp = 'pl', kind = 'gf' }: ToolArgs) {
  const [kd, setKd] = useState<PlateKind>(kind as PlateKind);
  const [k, setK] = useState(14);
  const [g, setG] = useState(20);
  const { example, typed } = useExample(['pk', 'k', 'g']);
  useEffect(() => { const q = readParams(location.search); const v = str(q, 'pk', kind); if (['gf', 'rgp', 'plate', 'solid'].includes(v)) setKd(v as PlateKind); setK(num(q, 'k', 14)); setG(num(q, 'g', 20)); }, []);
  useEffect(() => { updateURL({ pk: kd, k, g }); }, [kd, k, g]);
  const spot = useSpot(['XAU']);
  const r = plateGoldGrams(g, kd, k);
  const value = r.fineGrams * finePerGram(spot.XAU.usdPerOz);
  const solid = metalValue(g, finenessOfKarat(k), spot.XAU.usdPerOz);
  const NAMES: Record<PlateKind, string> = { gf: 'Gold filled (GF, 1/20)', rgp: 'Rolled gold plate (RGP, 1/40)', plate: 'Gold plated or electroplated (GP, GEP, HGE)', solid: 'Solid karat gold' };
  return (
    <Frame mini={mini} title={title} spotLine={<SpotLine spot={spot} metals={['XAU']} />}
      fields={<>
        {example && <ExampleNote>Example: a 20 g bracelet stamped 1/20 14K GF. Choose what is stamped on yours.</ExampleNote>}
        <SelectField id={`${idp}-pk`} label="What the stamp says" value={kd} onChange={(v) => typed(setKd)(v as PlateKind)} options={(Object.keys(NAMES) as PlateKind[]).map((x) => ({ value: x, label: NAMES[x] }))} />
        <div className="grid grid-cols-2 gap-x-4"><KaratSelect id={`${idp}-k`} value={k} onChange={typed(setK)} label="Karat in the stamp" /><NumberField id={`${idp}-g`} label="Weight of the piece" value={g} onChange={typed(setG)} unit="g" decimals={3} max={100000} /></div>
      </>}
      result={<>
        <Big label={`${example ? 'Example: ' : ''}gold in this piece is worth`} value={usd(value)} sub={kd === 'plate' ? 'A plated layer is a few microns thick: its gold weighs almost nothing and buyers do not pay for it.' : kd === 'solid' ? 'Solid karat gold all the way through.' : `At least ${kd === 'gf' ? '1/20' : '1/40'} of the weight is ${k}K gold; the rest is base metal. The value assumes exactly that minimum.`} />
        <Table caption="Gold inside a filled or plated piece">
          <Row label={`${k}K gold layer (minimum)`} value={grams(r.goldAlloyGrams, 3)} />
          <Row label="Pure gold inside" value={grams(r.fineGrams, 3)} />
          <Row label={`If it were solid ${k}K`} value={usd(solid)} />
        </Table>
      </>} />
  );
}

/* ---------- Impôt fédéral sur la plus-value ---------- */
function Gains({ mini, title, idp = 'gn', kind = 'sale' }: ToolArgs) {
  const inh = kind === 'inherited';
  const [proceeds, setProceeds] = useState(inh ? 6000 : 5000);
  const [cost, setCost] = useState(inh ? 4500 : 2000);
  const [months, setMonths] = useState(inh ? 0 : 36);
  const [rate, setRate] = useState(0.24);
  const { example, typed } = useExample(['s', 'c', 'm', 'r']);
  useEffect(() => { const q = readParams(location.search); setProceeds(num(q, 's', inh ? 6000 : 5000)); setCost(num(q, 'c', inh ? 4500 : 2000)); setMonths(num(q, 'm', inh ? 0 : 36)); setRate(num(q, 'r', 0.24)); }, []);
  useEffect(() => { updateURL({ s: proceeds, c: cost, m: months, r: rate }); }, [proceeds, cost, months, rate]);
  // Bien hérité : la durée de détention n'est pas présumée (règle non relue ici) : on la demande et on le dit.
  const r = collectiblesTax({ proceeds, cost, heldMonths: months, ordinaryRate: rate });
  const ruleText = { loss: 'No gain: no federal tax on this sale.', short: 'Held one year or less: the gain is taxed like wages, at your ordinary rate.', 'long-capped': `Held more than a year: gold and silver are collectibles, so the gain is taxed at no more than ${pct(P.tax.collectiblesMaxRate, 0)}.`, 'long-ordinary': `Held more than a year: your ordinary rate is below the ${pct(P.tax.collectiblesMaxRate, 0)} cap, so it applies.` }[r.rule];
  return (
    <Frame mini={mini} title={title}
      fields={<>
        {example && <ExampleNote>{inh ? 'Example: gold worth $4,500 when the owner died, sold for $6,000.' : 'Example: gold bought for $2,000, sold three years later for $5,000.'} Type your own figures.</ExampleNote>}
        <div className="grid grid-cols-2 gap-x-4"><NumberField id={`${idp}-s`} label="Sale price" value={proceeds} onChange={typed(setProceeds)} unit="$" max={100000000} />
          <NumberField id={`${idp}-c`} label={inh ? 'Value on the date of death' : 'What you paid'} value={cost} onChange={typed(setCost)} unit="$" max={100000000} /></div>
        <div className="grid grid-cols-2 gap-x-4"><NumberField id={`${idp}-m`} label="Months you held it" value={months} onChange={typed(setMonths)} max={1200} />
          <SelectField id={`${idp}-r`} label="Your top tax bracket" value={String(rate)} onChange={(v) => typed(setRate)(Number(v))} options={P.tax.ordinaryRates.map((x) => ({ value: String(x), label: pct(x, 0) }))} /></div>
        {inh && <p className="-mt-2 text-xs text-navy-600">Inherited: your cost is the value on the date of death, not what the owner paid. Ask a tax professional how long you are treated as holding it.</p>}
      </>}
      result={<>
        <Big label={`${example ? 'Example: ' : ''}federal tax on this gain`} value={usd(r.tax)} sub={ruleText} />
        <Table caption="How the tax is worked out">
          <Row label="Gain" value={usd(r.gain)} />
          <Row label="Rate applied" value={pct(r.rate, 0)} strong />
        </Table>
        <p className="mt-2 text-xs text-navy-600">Federal income tax only: state income tax and any other federal surtax are not included. Not tax advice.</p>
      </>} />
  );
}

/* ---------- Déclarations du négociant ---------- */
function Reports({ mini, title, idp = 'rp' }: ToolArgs) {
  const [cash, setCash] = useState(0);
  const [form, setForm] = useState('no');
  const [min, setMin] = useState('no');
  const { example, typed } = useExample(['cash', 'cf', 'mq']);
  useEffect(() => { const q = readParams(location.search); setCash(num(q, 'cash', 0)); setForm(str(q, 'cf', 'no') === 'yes' ? 'yes' : 'no'); setMin(str(q, 'mq', 'no') === 'yes' ? 'yes' : 'no'); }, []);
  useEffect(() => { updateURL({ cash, cf: form, mq: min }); }, [cash, form, min]);
  const r = dealerReports({ cash, cftcForm: form === 'yes', meetsMinimum: min === 'yes' });
  return (
    <Frame mini={mini} title={title}
      fields={<>
        {example && <ExampleNote>Example: jewelry sold for a check, no cash. Answer for your own sale.</ExampleNote>}
        <NumberField id={`${idp}-cash`} label="Cash (bills and coins) the dealer pays or receives" value={cash} onChange={typed(setCash)} unit="$" max={100000000} help="Checks, wires and cards are not cash for this rule" />
        <Toggle id={`${idp}-cf`} label="Bars or coins of a kind traded on a futures exchange?" value={form} onChange={typed(setForm)} options={[{ value: 'no', label: 'No' }, { value: 'yes', label: 'Yes' }]} />
        {form === 'yes' && <Toggle id={`${idp}-mq`} label="At least the quantity of one futures contract?" value={min} onChange={typed(setMin)} options={[{ value: 'no', label: 'No' }, { value: 'yes', label: 'Yes' }]} />}
      </>}
      result={<>
        <Big label={`${example ? 'Example: ' : ''}forms the dealer files`} value={r.form8300 && r.form1099b ? '8300 and 1099-B' : r.form8300 ? 'Form 8300' : r.form1099b ? 'Form 1099-B' : 'None'} sub="Whatever the dealer files, a gain is yours to report on your own return." />
        <Table caption="Dealer reporting test">
          <Row label={`Cash over ${usd(P.reporting.form8300CashOver).replace('.00', '')}`} value={r.form8300 ? `Yes: Form 8300 within ${P.reporting.form8300Days} days` : 'No'} />
          <Row label="Futures-contract form and quantity" value={r.form1099b ? 'Yes: Form 1099-B' : 'No'} />
        </Table>
      </>} />
  );
}

/* ---------- Taxe de vente d'un État ---------- */
function SalesTax({ mini, title, idp = 'st', state = 'NY' }: ToolArgs) {
  const [code, setCode] = useState(state);
  const [amount, setAmount] = useState(800);
  const { example, typed } = useExample(['st', 'a']);
  useEffect(() => { const q = readParams(location.search); const c = str(q, 'st', state); if (stateByCode(c)) setCode(c); setAmount(num(q, 'a', 800)); }, []);
  useEffect(() => { updateURL({ st: code, a: amount }); }, [code, amount]);
  const s = stateByCode(code) ?? STATES[0];
  const r = salesTaxOn(s, amount);
  return (
    <Frame mini={mini} title={title}
      fields={<>
        {example && <ExampleNote>Example: {usd(amount)} of bullion bought in {s.name}. Type your own purchase.</ExampleNote>}
        <SelectField id={`${idp}-st`} label="State" value={code} onChange={typed(setCode)} options={STATES.map((x) => ({ value: x.code, label: x.name }))} help="Only the states whose statute we have read are listed." />
        <NumberField id={`${idp}-a`} label="Purchase total (one sale)" value={amount} onChange={typed(setAmount)} unit="$" max={100000000} />
      </>}
      result={<>
        <Big label={`${example ? 'Example: ' : ''}state sales tax on this purchase`} value={r.taxable ? 'Taxable' : 'Exempt'} sub={s.scope} />
        <Table caption="Sales tax rule">
          <Row label="Rule" value={s.rule === 'threshold' ? `Exempt from ${usd(s.threshold ?? 0).replace('.00', '')}` : s.rule === 'exempt' ? 'Exempt at any amount' : s.rule === 'none' ? 'No state sales tax' : 'Taxed'} />
          <Row label="Law" value={s.cite} />
        </Table>
        {r.taxable && <p className="mt-2 text-sm text-navy-800">Below the threshold the purchase is taxed at the combined state and local rate where you buy it.</p>}
        <p className="mt-2 text-xs text-navy-600">These exemptions cover investment metal as each state law defines it, not jewelry.</p>
      </>} />
  );
}
