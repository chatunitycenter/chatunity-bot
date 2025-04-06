import { z } from 'zod';
export declare const FacebookDlArgsSchema: z.ZodObject<{
    0: z.ZodString;
}, "strip", z.ZodTypeAny, {
    0: string;
}, {
    0: string;
}>;
export declare const FacebookDlMediaSchema: z.ZodArray<z.ZodObject<{
    quality: z.ZodString;
    download: z.ZodFunction<z.ZodTuple<[], null>, z.ZodPromise<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    quality: string;
    download: () => Promise<string>;
}, {
    quality: string;
    download: () => Promise<string>;
}>, "many">;
export declare const FacebookDlSchema: z.ZodObject<{
    thumbnail: z.ZodString;
    duration: z.ZodOptional<z.ZodString>;
    video: z.ZodArray<z.ZodObject<{
        quality: z.ZodString;
        download: z.ZodFunction<z.ZodTuple<[], null>, z.ZodPromise<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        quality: string;
        download: () => Promise<string>;
    }, {
        quality: string;
        download: () => Promise<string>;
    }>, "many">;
    audio: z.ZodArray<z.ZodObject<{
        quality: z.ZodString;
        download: z.ZodFunction<z.ZodTuple<[], null>, z.ZodPromise<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        quality: string;
        download: () => Promise<string>;
    }, {
        quality: string;
        download: () => Promise<string>;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    thumbnail: string;
    video: {
        quality: string;
        download: () => Promise<string>;
    }[];
    audio: {
        quality: string;
        download: () => Promise<string>;
    }[];
    duration?: string | undefined;
}, {
    thumbnail: string;
    video: {
        quality: string;
        download: () => Promise<string>;
    }[];
    audio: {
        quality: string;
        download: () => Promise<string>;
    }[];
    duration?: string | undefined;
}>;
export type FacebookDlMediaSchema = z.infer<typeof FacebookDlMediaSchema>;
export type FacebookDl = z.infer<typeof FacebookDlSchema>;
//# sourceMappingURL=facebook-v1.d.ts.map