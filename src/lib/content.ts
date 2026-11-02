import { getCollection, getEntry, type CollectionEntry } from 'astro:content';
import type uiEn from '../content/ui/en.json';

/** Shape of the interface text files in src/content/ui/ (en.json is the reference). */
export type Ui = typeof uiEn;
export type Profile = CollectionEntry<'profile'>['data'];
export type Project = CollectionEntry<'projects'>;
export type Job = CollectionEntry<'experience'>;
export type ProjectStatus = Project['data']['status'];

export const DEFAULT_LOCALE = 'en';

export async function getUi(locale: string = DEFAULT_LOCALE) {
  const entry = await getEntry('ui', locale);
  if (!entry) throw new Error(`Missing UI text file: src/content/ui/${locale}.json`);
  return entry.data as Ui;
}

export async function getProfile() {
  const entry = await getEntry('profile', 'nawar');
  if (!entry) throw new Error('Missing src/content/profile.json');
  return entry.data;
}

export async function getSkills() {
  const all = await getCollection('skills');
  const byId = Object.fromEntries(all.map((s) => [s.id, s.data]));
  return byId as Record<'engineering' | 'business' | 'languages', (typeof all)[number]['data']>;
}

export async function getProjects() {
  const all = await getCollection('projects');
  return all.sort((a, b) => a.data.order - b.data.order);
}

export async function getExperience() {
  const all = await getCollection('experience');
  return all.sort((a, b) => a.data.order - b.data.order);
}

export function projectUrl(id: string) {
  return `/projects/${id}/`;
}

/** Spans from the oldest start to the newest end of a company's roles, e.g. "Jan 2017 – Present". */
export function companyDates(roles: { dates: string }[]) {
  if (roles.length === 1) return roles[0].dates;
  const newestEnd = roles[0].dates.split('–')[1]?.trim() ?? '';
  const oldestStart = roles[roles.length - 1].dates.split('–')[0]?.trim() ?? '';
  return `${oldestStart} – ${newestEnd}`;
}
