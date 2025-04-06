import { z } from 'zod';
export declare const SnapSaveArgsSchema: z.ZodObject<{
    0: z.ZodString;
}, "strip", z.ZodTypeAny, {
    0: string;
}, {
    0: string;
}>;
export declare const SnapSaveSchema: z.ZodObject<{
    description: z.ZodOptional<z.ZodString>;
    title: z.ZodOptional<z.ZodString>;
    results: z.ZodArray<z.ZodObject<{
        resolution: z.ZodOptional<z.ZodString>;
        thumbnail: z.ZodOptional<z.ZodString>;
        url: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        url: string;
        resolution?: string | undefined;
        thumbnail?: string | undefined;
    }, {
        url: string;
        resolution?: string | undefined;
        thumbnail?: string | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    results: {
        url: string;
        resolution?: string | undefined;
        thumbnail?: string | undefined;
    }[];
    description?: string | undefined;
    title?: string | undefined;
}, {
    results: {
        url: string;
        resolution?: string | undefined;
        thumbnail?: string | undefined;
    }[];
    description?: string | undefined;
    title?: string | undefined;
}>;
export type SnapSave = z.infer<typeof SnapSaveSchema>;
//# sourceMappingURL=snapsave.d.ts.map