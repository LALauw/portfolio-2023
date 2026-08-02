import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const work = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/work" }),
  schema: z.object({
    title: z.string(),
    smallTitle: z.string(),
    subtitle: z.string(),
    summary: z.string(),
    date: z.string(),
    hero: z.string(),
    role: z.string(),
    context: z.string(),
    stack: z.array(z.string()),
    order: z.number(),
  }),
});

export const collections = { work };
