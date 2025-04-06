import { z } from 'zod';
export declare const WikipediaArgsSchema: z.ZodObject<{
    0: z.ZodString;
    1: z.ZodString;
}, "strip", z.ZodTypeAny, {
    0: string;
    1: string;
}, {
    0: string;
    1: string;
}>;
export declare const WikipediaSchema: z.ZodObject<{
    title: z.ZodString;
    images: z.ZodArray<z.ZodString, "many">;
    articles: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    images: string[];
    articles: string;
}, {
    title: string;
    images: string[];
    articles: string;
}>;
export type WikipediaArgs = z.infer<typeof WikipediaArgsSchema>;
export type Wikipedia = z.infer<typeof WikipediaSchema>;
//# sourceMappingURL=wikipedia.d.ts.map