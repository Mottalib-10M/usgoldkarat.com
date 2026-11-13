import { route, type Locale } from './routes';
import { PAGES, pageById } from '../lib/pages';
import type { Group } from '../lib/page-types';
export interface NavLink { href: string; label: string } export interface NavCategory { label: string; links: NavLink[] }
const CORE: Record<string, string> = { home: 'Gold price per gram by karat', method: 'How the values are worked out', about: 'About', widget: 'Embed the calculator', contact: 'Contact', editorial: 'Editorial policy', privacy: 'Privacy', terms: 'Legal notice', cookies: 'Cookies' };
const GROUP_LABEL: Record<Group, string> = { gold: 'Gold price by karat and weight', sell: 'Selling gold', coins: 'Gold and silver coins', silver: 'Silver', rules: 'Stamps, tax and reporting', states: 'Selling gold by state' };
const COURT: Record<Group, string> = { gold: 'Gold price', sell: 'Selling', coins: 'Coins', silver: 'Silver', rules: 'Stamps and tax', states: 'By state' };
export const GROUPS_ORDER: Group[] = ['gold', 'sell', 'silver', 'coins', 'rules', 'states'];
export const label = (id: string, _lang: Locale = 'en') => CORE[id] ?? pageById(id)?.nav ?? id;
const link = (id: string, lang: Locale): NavLink => ({ href: route(id, lang), label: label(id, lang) });
const inGroup = (g: Group, lang: Locale) => PAGES.filter((p) => p.group === g).map((p) => link(p.id, lang));
// Menu ☰ : la vente d'abord (test naïf, 4e tour) ; le reste du site garde GROUPS_ORDER.
const MENU_ORDER: Group[] = ['sell', 'gold', 'silver', 'coins', 'rules', 'states'];
export const navCategories = (lang: Locale, court = true): NavCategory[] =>
  (court ? MENU_ORDER : GROUPS_ORDER).map((g) => ({ label: court ? COURT[g] : GROUP_LABEL[g], links: court && g === 'gold' ? [{ href: route('home', lang), label: 'Home: gold price per gram by karat' }, ...inGroup(g, lang)] : inGroup(g, lang) })).filter((c) => c.links.length);
export const navDirect = (_lang: Locale): NavLink[] => [];
export const footerColumns = (lang: Locale): NavCategory[] => [
  { label: GROUP_LABEL.gold, links: [link('home', lang), ...inGroup('gold', lang)] },
  { label: `${GROUP_LABEL.sell}, silver and coins`, links: [...inGroup('sell', lang), ...inGroup('silver', lang), ...inGroup('coins', lang)] },
  { label: GROUP_LABEL.rules, links: inGroup('rules', lang) },
  { label: GROUP_LABEL.states, links: inGroup('states', lang) },
  { label: 'This site', links: ['method', 'about', 'contact', 'editorial', 'widget', 'terms', 'privacy', 'cookies'].map((i) => link(i, lang)) },
];
export const popularLinks = (_lang: Locale): NavLink[] => [];
