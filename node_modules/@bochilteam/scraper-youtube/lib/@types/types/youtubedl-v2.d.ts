import { z } from 'zod';
declare const LinkItemSchema: z.ZodObject<{
    url: z.ZodString;
    name: z.ZodString;
    subname: z.ZodString;
    type: z.ZodString;
    ext: z.ZodString;
    downloadable: z.ZodBoolean;
    quality: z.ZodString;
    qualityNumber: z.ZodNumber;
    audio: z.ZodBoolean;
    contentLength: z.ZodOptional<z.ZodNumber>;
    no_audio: z.ZodBoolean;
    itag: z.ZodString;
    isBundle: z.ZodBoolean;
    isOtf: z.ZodBoolean;
    isDrm: z.ZodBoolean;
    filesize: z.ZodOptional<z.ZodNumber>;
    attr: z.ZodObject<{
        title: z.ZodString;
        class: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        title: string;
        class: string;
    }, {
        title: string;
        class: string;
    }>;
}, "strip", z.ZodTypeAny, {
    type: string;
    quality: string;
    audio: boolean;
    url: string;
    name: string;
    subname: string;
    ext: string;
    downloadable: boolean;
    qualityNumber: number;
    no_audio: boolean;
    itag: string;
    isBundle: boolean;
    isOtf: boolean;
    isDrm: boolean;
    attr: {
        title: string;
        class: string;
    };
    contentLength?: number | undefined;
    filesize?: number | undefined;
}, {
    type: string;
    quality: string;
    audio: boolean;
    url: string;
    name: string;
    subname: string;
    ext: string;
    downloadable: boolean;
    qualityNumber: number;
    no_audio: boolean;
    itag: string;
    isBundle: boolean;
    isOtf: boolean;
    isDrm: boolean;
    attr: {
        title: string;
        class: string;
    };
    contentLength?: number | undefined;
    filesize?: number | undefined;
}>;
export type LinkItem = z.infer<typeof LinkItemSchema>;
export declare const YoutubedlV2ResponseSchema: z.ZodObject<{
    id: z.ZodString;
    cipher: z.ZodBoolean;
    meta: z.ZodObject<{
        title: z.ZodString;
        source: z.ZodString;
        duration: z.ZodString;
        tags: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        title: string;
        duration: string;
        source: string;
        tags: string;
    }, {
        title: string;
        duration: string;
        source: string;
        tags: string;
    }>;
    thumb: z.ZodString;
    itags: z.ZodArray<z.ZodString, "many">;
    video_quality: z.ZodArray<z.ZodString, "many">;
    url: z.ZodArray<z.ZodObject<{
        url: z.ZodString;
        name: z.ZodString;
        subname: z.ZodString;
        type: z.ZodString;
        ext: z.ZodString;
        downloadable: z.ZodBoolean;
        quality: z.ZodString;
        qualityNumber: z.ZodNumber;
        audio: z.ZodBoolean;
        contentLength: z.ZodOptional<z.ZodNumber>;
        no_audio: z.ZodBoolean;
        itag: z.ZodString;
        isBundle: z.ZodBoolean;
        isOtf: z.ZodBoolean;
        isDrm: z.ZodBoolean;
        filesize: z.ZodOptional<z.ZodNumber>;
        attr: z.ZodObject<{
            title: z.ZodString;
            class: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            title: string;
            class: string;
        }, {
            title: string;
            class: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        type: string;
        quality: string;
        audio: boolean;
        url: string;
        name: string;
        subname: string;
        ext: string;
        downloadable: boolean;
        qualityNumber: number;
        no_audio: boolean;
        itag: string;
        isBundle: boolean;
        isOtf: boolean;
        isDrm: boolean;
        attr: {
            title: string;
            class: string;
        };
        contentLength?: number | undefined;
        filesize?: number | undefined;
    }, {
        type: string;
        quality: string;
        audio: boolean;
        url: string;
        name: string;
        subname: string;
        ext: string;
        downloadable: boolean;
        qualityNumber: number;
        no_audio: boolean;
        itag: string;
        isBundle: boolean;
        isOtf: boolean;
        isDrm: boolean;
        attr: {
            title: string;
            class: string;
        };
        contentLength?: number | undefined;
        filesize?: number | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    id: string;
    url: {
        type: string;
        quality: string;
        audio: boolean;
        url: string;
        name: string;
        subname: string;
        ext: string;
        downloadable: boolean;
        qualityNumber: number;
        no_audio: boolean;
        itag: string;
        isBundle: boolean;
        isOtf: boolean;
        isDrm: boolean;
        attr: {
            title: string;
            class: string;
        };
        contentLength?: number | undefined;
        filesize?: number | undefined;
    }[];
    cipher: boolean;
    meta: {
        title: string;
        duration: string;
        source: string;
        tags: string;
    };
    thumb: string;
    itags: string[];
    video_quality: string[];
}, {
    id: string;
    url: {
        type: string;
        quality: string;
        audio: boolean;
        url: string;
        name: string;
        subname: string;
        ext: string;
        downloadable: boolean;
        qualityNumber: number;
        no_audio: boolean;
        itag: string;
        isBundle: boolean;
        isOtf: boolean;
        isDrm: boolean;
        attr: {
            title: string;
            class: string;
        };
        contentLength?: number | undefined;
        filesize?: number | undefined;
    }[];
    cipher: boolean;
    meta: {
        title: string;
        duration: string;
        source: string;
        tags: string;
    };
    thumb: string;
    itags: string[];
    video_quality: string[];
}>;
export {};
//# sourceMappingURL=youtubedl-v2.d.ts.map