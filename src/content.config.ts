import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

// Every folder in src/content/ has one file (or one sub-folder) per language: en and tr.

// An image slot: set `src` (a path inside /public) once the real file exists.
// Until then the site shows a dashed placeholder with `label` as its text.
const image = z.object({
  label: z.string(),
  src: z.string().optional(),
  alt: z.string().optional(),
});

// Projects: src/content/projects/en/<slug>.md and src/content/projects/tr/<slug>.md
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
  loader: glob({ pattern: '*.json', base: './src/content/experience' }),
  schema: z.object({
    jobs: z.array(
      z.object({
        company: z.string(),
        location: z.string(),
        order: z.number(),
        summary: z.string(),
        roles: z.array(z.object({ role: z.string(), dates: z.string() })),
        bullets: z.array(z.string()),
        links: z.array(z.object({ label: z.string(), href: z.string() })).default([]),
      }),
    ),
  }),
});

const profile = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/profile' }),
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
    // Optional: add { "label": "...", "src": "/photo.jpg", "alt": "..." } to show a photo.
    photo: image.optional(),
    summary: z.string(),
    about: z.array(z.string()),
    quickFacts: z.array(z.object({ value: z.string(), label: z.string() })),
    education: z.array(z.object({ degree: z.string(), school: z.string(), dates: z.string() })),
    certifications: z.array(z.object({ name: z.string(), issuer: z.string().optional() })),
  }),
});

const skillGroup = z.object({
  label: z.string(),
  heading: z.string(),
  items: z.array(z.string()),
});

const skills = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/skills' }),
  schema: z.object({ engineering: skillGroup, business: skillGroup, languages: skillGroup }),
});

// All interface text (menus, headings, buttons, page titles). One file per language.
const ui = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/ui' }),
  schema: z.any(),
});

export const collections = { projects, experience, profile, skills, ui };
