import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { file, glob } from 'astro/loaders';

// An image slot: set `src` (a path inside /public) once the real file exists.
// Until then the site shows a dashed placeholder with `label` as its text.
const image = z.object({
  label: z.string(),
  src: z.string().optional(),
  alt: z.string().optional(),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    fullTitle: z.string().optional(),
    summary: z.string(),
    status: z.enum(['Completed', 'In progress']),
    date: z.string().optional(),
    context: z.string().optional(),
    contextTags: z.array(z.string()).default([]),
    tags: z.array(z.string()),
    featured: z.boolean().default(false),
    order: z.number(),
    cover: image,
    problem: z.string().optional(),
    approach: z.string().optional(),
    chain: z.array(z.object({ name: z.string(), role: z.string() })).default([]),
    chainNote: z.string().optional(),
    whatIDid: z.array(z.string()).default([]),
    results: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
    resultsNote: z.string().optional(),
    tools: z.array(z.string()).default([]),
    gallery: z.array(image).default([]),
    nextSteps: z.array(z.string()).default([]),
    disclaimer: z.string().optional(),
  }),
});

const experience = defineCollection({
  loader: file('./src/content/experience.json'),
  schema: z.object({
    company: z.string(),
    location: z.string(),
    order: z.number(),
    summary: z.string(),
    roles: z.array(
      z.object({
        role: z.string(),
        dates: z.string(),
        location: z.string().optional(),
      }),
    ),
    bullets: z.array(z.string()),
    links: z.array(z.object({ label: z.string(), href: z.string() })).default([]),
  }),
});

const profile = defineCollection({
  loader: file('./src/content/profile.json'),
  schema: z.object({
    name: z.string(),
    title: z.string(),
    headline: z.string(),
    pitch: z.string(),
    location: z.string(),
    email: z.email(),
    linkedin: z.url(),
    website: z.url(),
    cv: z.string(),
    photo: image,
    summary: z.string(),
    about: z.array(z.string()),
    quickFacts: z.array(z.object({ value: z.string(), label: z.string() })),
    education: z.array(z.object({ degree: z.string(), school: z.string(), dates: z.string() })),
    certifications: z.array(z.object({ name: z.string(), issuer: z.string().optional() })),
  }),
});

const skills = defineCollection({
  loader: file('./src/content/skills.json'),
  schema: z.object({
    label: z.string(),
    heading: z.string(),
    items: z.array(z.string()),
  }),
});

// All interface text (menus, headings, buttons, page titles). One file per language.
const ui = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/ui' }),
  schema: z.any(),
});

export const collections = { projects, experience, profile, skills, ui };
