import { z } from 'zod';
export const WikipediaArgsSchema = z.object({
    0: z.string(),
    1: z.string()
});
export const WikipediaSchema = z.object({
    title: z.string(),
    images: z.string().url().array(),
    articles: z.string()
});
