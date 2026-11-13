/** Pièces communes aux calculateurs : cadre, lignes de résultat, ligne du cours avec son heure. */
import { useState, type ReactNode } from 'react';
import { useEffect } from 'react';
import SelectField from '../ui/SelectField';
import { P, SNAPSHOT, type Metal } from '../../lib/engine/params';
import { refreshSpot, type Spot } from '../../lib/live';
import { usd, usd2, stamp } from '../../lib/money';
import { finePerGram, finePerDwt, UNIT_LABEL, type Unit } from '../../lib/engine/metal';
import { formatNumber } from '../../lib/format';

export const METAL_NAME: Record<Metal, string> = { XAU: 'Gold', XAG: 'Silver' };

/** Ligne d'état du cours : une chose à la fois, le prix et l'heure à laquelle il a été vérifié ; la source et
 *  le bouton « Check for a newer price » dans un repli. Le texte et les tableaux de la page suivent le même
 *  cours que le calculateur (live.ts, majTexte) : une seule ligne, un seul prix. */
export function SpotLine({ spot, metals }: { spot: Spot; metals: Metal[] }) {
  const [note, setNote] = useState('');
  const anyFailed = metals.some((m) => spot[m].failed);
  const allLive = metals.every((m) => spot[m].live);
  return (
    <div className="mt-1 text-xs leading-relaxed text-navy-600" data-chrome>
      {metals.map((m) => {
        const q = spot[m];
        const name = METAL_NAME[m].toLowerCase();
        return (
          <p key={m}>
            <span className={`mr-1.5 inline-block h-2 w-2 shrink-0 rounded-full align-middle ${q.live ? 'bg-green-600' : 'bg-navy-400'}`} aria-hidden="true" />
            <span>{q.live ? `Live ${name} price` : `${METAL_NAME[m]} price recorded`}, {stamp(q.live ? q.at : SNAPSHOT.at[m])}: <span className="tabular-nums font-medium text-navy-900">{usd2(finePerGram(q.usdPerOz))}</span> a gram, <span className="tabular-nums font-medium text-navy-900">{usd2(finePerDwt(q.usdPerOz))}</span> a pennyweight of pure {name}. Your result uses this price.</span>
          </p>
        );
      })}
      {anyFailed && <p className="text-amber-800">The live price could not be reached: the figures use the price recorded when this page was built, at the time shown.</p>}
      <details className="mt-0.5">
        <summary className="cursor-pointer underline hover:text-navy-900">Where this price comes from</summary>
        <p className="mt-1">It is the spot price, the price traders pay for pure {metals.map((m) => METAL_NAME[m].toLowerCase()).join(' and ')}, from gold-api.com, a free price service: {metals.map((m) => `${usd(spot[m].usdPerOz)}`).join(' and ')} per troy ounce, the 31.1 g unit precious metals are priced in. A buyer pays less than this. The page reads it once when it opens, and the tables and examples in the text are worked out at the same price.</p>
        <p className="mt-1">
          <button type="button" className="underline hover:text-navy-900" onClick={() => setNote(refreshSpot(metals) ? 'Checking for a newer price…' : 'Wait a few seconds before asking again.')}>Check for a newer price</button>
          {note && !allLive && <span className="ml-2">{note}</span>}
        </p>
      </details>
    </div>
  );
}

/** Réassurance sur les données, près des champs. */
export function PrivacyLine() {
  return <p className="text-xs text-navy-600" data-chrome>Nothing you type here leaves your phone or computer. We never ask for your name, email or ZIP code.</p>;
}

/** Valeurs d'exemple : tout calculateur pré-rempli le dit tant que rien n'a été tapé ou choisi, et pas quand
 *  les valeurs viennent d'un lien partagé (une des clés de l'adresse est présente). */
export function useExample(keys: string[]) {
  const [example, setExample] = useState(true);
  useEffect(() => { const u = new URLSearchParams(location.search); if (keys.some((k) => u.has(k))) setExample(false); }, []);
  const typed = <T,>(f: (v: T) => void) => (v: T) => { setExample(false); f(v); };
  return { example, typed };
}

export function ExampleNote({ children }: { children: ReactNode }) {
  return <p data-exemple className="rounded bg-accent-50 px-2 py-1 text-sm font-medium text-navy-900">{children}</p>;
}

export function Row({ label, value, strong = false, bar }: { label: ReactNode; value: ReactNode; strong?: boolean; bar?: number }) {
  return (
    <tr>
      <td className={`py-1.5 pr-3 ${strong ? 'font-semibold text-navy-900' : 'text-navy-700'}`}>{label}{bar !== undefined && <span className="mt-1 block h-1 rounded bg-accent-500" style={{ width: `${Math.max(2, Math.min(100, bar * 100))}%` }} />}</td>
      <td className={`tabular-nums py-1.5 text-right ${strong ? 'font-semibold text-navy-900' : 'text-navy-900'}`}>{value}</td>
    </tr>
  );
}

/** Cadre d'un calculateur : champs à gauche, résultat à côté (`data-resultat`). La ligne du cours passe sous
 *  le résultat, pour que le montant reste sur le premier écran du téléphone. */
export function Frame({ title, fields, result, foot, spotLine, mini = false }: { title?: string; fields: ReactNode; result: ReactNode; foot?: ReactNode; spotLine?: ReactNode; mini?: boolean }) {
  return (
    <div className={`not-prose rechner rounded-lg border border-accent-300 bg-white p-4 sm:p-5`} data-chrome>
      {title && <p className="mb-3 text-base font-semibold text-navy-900">{title}</p>}
      <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <form className="grid content-start gap-4" onSubmit={(e) => e.preventDefault()} {...(mini ? { 'data-simulateur-secondaire': '' } : {})}>{fields}{!mini && <PrivacyLine />}</form>
        <div data-resultat aria-live="polite" className="rounded-lg bg-accent-50 p-4">{result}</div>
      </div>
      {foot}
      {spotLine && <div className="mt-3">{spotLine}</div>}
    </div>
  );
}

export function Big({ label, value, sub }: { label: string; value: string; sub?: ReactNode }) {
  return (<>
    <p className="text-sm font-medium text-navy-700">{label}</p>
    <p className="mt-1 text-[2.2rem] font-bold leading-tight text-navy-900 tabular-nums">{value}</p>
    {sub && <p className="mt-1 text-sm text-navy-700">{sub}</p>}
  </>);
}

export function Table({ caption, children }: { caption: string; children: ReactNode }) {
  return <table className="mt-3 w-full text-sm"><caption className="sr-only">{caption}</caption><tbody className="divide-y divide-accent-200">{children}</tbody></table>;
}

/** Liste des karats publiés (titre k/24, poinçon en millièmes). */
export function KaratSelect({ id, value, onChange, label = 'Karat' }: { id: string; value: number; onChange: (k: number) => void; label?: string }) {
  return <SelectField id={id} label={label} value={String(value)} onChange={(v) => onChange(Number(v))}
    options={P.gold.map((g) => ({ value: String(g.k), label: `${g.k}K · ${g.stamp}` }))} />;
}

/** Unité de poids : grammes, pennyweights, onces troy, onces ordinaires. */
export function UnitSelect({ id, value, onChange, units = ['g', 'dwt', 'ozt', 'oz'], label = 'Unit' }: { id: string; value: Unit; onChange: (u: Unit) => void; units?: Unit[]; label?: string }) {
  return <SelectField id={id} label={label} value={value} onChange={(v) => onChange(v as Unit)} options={units.map((u) => ({ value: u, label: UNIT_SHORT[u] }))} />;
}
/** Libellés courts pour une demi-colonne sur téléphone (check-layout : une ligne, hauteur égale aux champs voisins). */
const UNIT_SHORT: Record<Unit, string> = { g: 'grams', dwt: 'dwt', ozt: 'troy oz', oz: 'regular oz', kg: 'kg', grain: 'grains' };

export const fin = (f: number) => formatNumber(f, f % 1 ? 1 : 0);
