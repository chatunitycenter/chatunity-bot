import { z } from 'zod';
export declare const SfilemobidlArgsSchema: z.ZodObject<{
    0: z.ZodString;
}, "strip", z.ZodTypeAny, {
    0: string;
}, {
    0: string;
}>;
export declare const SfilemobidlSchema: z.ZodObject<{
    url: z.ZodString;
    filename: z.ZodString;
    icon: z.ZodString;
    type: z.ZodString;
    mimetype: z.ZodString;
    uploaded: z.ZodString;
    uploadby: z.ZodString;
    uploadbyUrl: z.ZodString;
    uploadon: z.ZodString;
    uploadonUrl: z.ZodString;
    downloads: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type: string;
    url: string;
    filename: string;
    icon: string;
    mimetype: string;
    uploaded: string;
    uploadby: string;
    uploadbyUrl: string;
    uploadon: string;
    uploadonUrl: string;
    downloads: number;
}, {
    type: string;
    url: string;
    filename: string;
    icon: string;
    mimetype: string;
    uploaded: string;
    uploadby: string;
    uploadbyUrl: string;
    uploadon: string;
    uploadonUrl: string;
    downloads: number;
}>;
export type Sfilemobidl = z.infer<typeof SfilemobidlSchema>;
//# sourceMappingURL=sfilemobi-dl.d.ts.map