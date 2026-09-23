import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const faq = z.array(z.object({ q: z.string(), a: z.string() })).default([]);

const learn = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/learn' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    summary: z.string(),
    order: z.number(),
    faqs: faq,
    related: z.array(z.string()).default([]),
    updated: z.coerce.date(),
  }),
});

const questions = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/questions' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    answer: z.string(),
    category: z.string(),
    popular: z.boolean().default(false),
    faqs: faq,
    related: z.array(z.string()).default([]),
    learn: z.array(z.string()).default([]),
    updated: z.coerce.date(),
  }),
});

export const collections = { learn, questions };
