import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const work = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/work" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.string(),
    context: z.string(),
    role: z.string(),
    stack: z.array(z.string()),
    color: z.enum(["sky", "sage", "lilac", "peach", "butter"]),
    icon: z.enum(["drop", "hex", "tablet", "iac", "kubernetes", "gitops"]),
    order: z.number(),
  }),
});

export const collections = { work };
