import { z } from 'zod';
export declare const SfilemobiSearchArgsSchema: z.ZodObject<{
    0: z.ZodString;
    1: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    0: string;
    1: number;
}, {
    0: string;
    1?: number | undefined;
}>;
export declare const SfilemobiSearchSchema: z.ZodArray<z.ZodObject<{
    url: z.ZodString;
    filename: z.ZodString;
    icon: z.ZodString;
    type: z.ZodString;
    filesizeH: z.ZodString;
    filesize: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type: string;
    url: string;
    filename: string;
    icon: string;
    filesizeH: string;
    filesize: number;
}, {
    type: string;
    url: string;
    filename: string;
    icon: string;
    filesizeH: string;
    filesize: number;
}>, "many">;
export type SfilemobiSearch = z.infer<typeof SfilemobiSearchSchema>;
//# sourceMappingURL=sfilemobi-search.d.ts.map