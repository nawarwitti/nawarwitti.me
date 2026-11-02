import { getCollection, getEntry, type CollectionEntry } from 'astro:content';
import type uiEn from '../content/ui/en.json';

export const LOCALES = ['en', 'tr'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

/** Shape of the interface text files in src/content/ui/ (en.json is the reference). */
export type Ui = typeof uiEn;
export type Profile = CollectionEntry<'profile'>['data'];
export type Project = CollectionEntry<'projects'> & { slug: string };
export type Job = CollectionEntry<'experience'>['data']['jobs'][number];

async function entryFor<C extends 'ui' | 'profile' | 'skills' | 'experience'>(
  collection: C,
  locale: Locale,
) {
  const entry = await getEntry(collection, locale);
  if (!entry) throw new Error(`Missing src/content/${collection}/${locale}.json`);
  return entry.data;
}

export async function getUi(locale: Locale) {
  return (await entryFor('ui', locale)) as Ui;
}

export async function getProfile(locale: Locale) {
  return (await entryFor('profile', locale)) as Profile;
}

export async function getSkills(locale: Locale) {
  return (await entryFor('skills', locale)) as CollectionEntry<'skills'>['data'];
}

export async function getExperience(locale: Locale) {
  const data = (await entryFor('experience', locale)) as CollectionEntry<'experience'>['data'];
  return [...data.jobs].sort((a, b) => a.order - b.order);
}

/**
 * Projects for one language, sorted by `order`. A project that exists only in English
 * is still shown on the Turkish site (in English) until its Turkish file is added.
 */
export async function getProjects(locale: Locale): Promise<Project[]> {
  const all = await getCollection('projects');
  const bySlug = new Map<string, Project>();
  for (const entry of all) {
    const [lang, ...rest] = entry.id.split('/');
    const slug = rest.join('/');
    if (lang !== locale && lang !== DEFAULT_LOCALE) continue;
    if (lang === DEFAULT_LOCALE && bySlug.has(slug)) continue;
    bySlug.set(slug, { ...entry, slug });
  }
  return [...bySlug.values()].sort((a, b) => a.data.order - b.data.order);
}

/** '/projects/' → '/projects/' in English, '/tr/projects/' in Turkish. */
export function localePath(locale: Locale, path: string) {
  return locale === DEFAULT_LOCALE ? path : `/${locale}${path}`;
}

export function projectUrl(locale: Locale, slug: string) {
  return localePath(locale, `/projects/${slug}/`);
}

/** The same page in another language: '/tr/about/' ↔ '/about/'. */
export function switchLocale(pathname: string, target: Locale) {
  const bare = pathname.replace(/^\/(tr)(?=\/|$)/, '') || '/';
  return localePath(target, bare);
}

/** Spans from the oldest start to the newest end of a company's roles, e.g. "Jan 2017 – Present". */
export function companyDates(roles: { dates: string }[]) {
  if (roles.length === 1) return roles[0].dates;
  const newestEnd = roles[0].dates.split('–')[1]?.trim() ?? '';
  const oldestStart = roles[roles.length - 1].dates.split('–')[0]?.trim() ?? '';
  return `${oldestStart} – ${newestEnd}`;
}
