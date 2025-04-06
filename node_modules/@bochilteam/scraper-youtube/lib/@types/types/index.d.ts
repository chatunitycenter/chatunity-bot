import { z } from 'zod';
export declare const YoutubeDownloaderArgsSchema: z.ZodObject<{
    0: z.ZodString;
    1: z.ZodOptional<z.ZodUnion<[z.ZodUnion<[z.ZodLiteral<"id">, z.ZodLiteral<"en">]>, z.ZodLiteral<"es">]>>;
}, "strip", z.ZodTypeAny, {
    0: string;
    1?: "id" | "en" | "es" | undefined;
}, {
    0: string;
    1?: "id" | "en" | "es" | undefined;
}>;
export type YoutubeDownloaderArgs = z.infer<typeof YoutubeDownloaderArgsSchema>;
export declare const YoutubedlSchema: z.ZodObject<{
    id: z.ZodString;
    thumbnail: z.ZodString;
    title: z.ZodString;
    duration: z.ZodNumber;
    video: z.ZodRecord<z.ZodString, z.ZodObject<{
        quality: z.ZodString;
        type: z.ZodString;
        fileSizeH: z.ZodString;
        fileSize: z.ZodNumber;
        download: z.ZodFunction<z.ZodTuple<[], null>, z.ZodPromise<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        type: string;
        quality: string;
        fileSizeH: string;
        fileSize: number;
        download: () => Promise<string>;
    }, {
        type: string;
        quality: string;
        fileSizeH: string;
        fileSize: number;
        download: () => Promise<string>;
    }>>;
    audio: z.ZodRecord<z.ZodString, z.ZodObject<{
        quality: z.ZodString;
        type: z.ZodString;
        fileSizeH: z.ZodString;
        fileSize: z.ZodNumber;
        download: z.ZodFunction<z.ZodTuple<[], null>, z.ZodPromise<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        type: string;
        quality: string;
        fileSizeH: string;
        fileSize: number;
        download: () => Promise<string>;
    }, {
        type: string;
        quality: string;
        fileSizeH: string;
        fileSize: number;
        download: () => Promise<string>;
    }>>;
    other: z.ZodRecord<z.ZodString, z.ZodObject<{
        quality: z.ZodString;
        type: z.ZodString;
        fileSizeH: z.ZodString;
        fileSize: z.ZodNumber;
        download: z.ZodFunction<z.ZodTuple<[], null>, z.ZodPromise<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        type: string;
        quality: string;
        fileSizeH: string;
        fileSize: number;
        download: () => Promise<string>;
    }, {
        type: string;
        quality: string;
        fileSizeH: string;
        fileSize: number;
        download: () => Promise<string>;
    }>>;
}, "strip", z.ZodTypeAny, {
    other: Record<string, {
        type: string;
        quality: string;
        fileSizeH: string;
        fileSize: number;
        download: () => Promise<string>;
    }>;
    title: string;
    id: string;
    thumbnail: string;
    duration: number;
    video: Record<string, {
        type: string;
        quality: string;
        fileSizeH: string;
        fileSize: number;
        download: () => Promise<string>;
    }>;
    audio: Record<string, {
        type: string;
        quality: string;
        fileSizeH: string;
        fileSize: number;
        download: () => Promise<string>;
    }>;
}, {
    other: Record<string, {
        type: string;
        quality: string;
        fileSizeH: string;
        fileSize: number;
        download: () => Promise<string>;
    }>;
    title: string;
    id: string;
    thumbnail: string;
    duration: number;
    video: Record<string, {
        type: string;
        quality: string;
        fileSizeH: string;
        fileSize: number;
        download: () => Promise<string>;
    }>;
    audio: Record<string, {
        type: string;
        quality: string;
        fileSizeH: string;
        fileSize: number;
        download: () => Promise<string>;
    }>;
}>;
export type Youtubedl = z.infer<typeof YoutubedlSchema>;
//# sourceMappingURL=index.d.ts.map