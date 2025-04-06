import { z } from 'zod';
declare const LinkItemSchema: z.ZodObject<{
    size: z.ZodString;
    f: z.ZodString;
    q: z.ZodString;
    q_text: z.ZodString;
    k: z.ZodString;
}, "strip", z.ZodTypeAny, {
    size: string;
    f: string;
    q: string;
    q_text: string;
    k: string;
}, {
    size: string;
    f: string;
    q: string;
    q_text: string;
    k: string;
}>;
export type LinkItem = z.infer<typeof LinkItemSchema>;
export declare const YoutubedlResponseSchema: z.ZodObject<{
    status: z.ZodString;
    mess: z.ZodString;
    page: z.ZodString;
    vid: z.ZodString;
    extractor: z.ZodString;
    title: z.ZodString;
    t: z.ZodNumber;
    a: z.ZodString;
    links: z.ZodObject<{
        mp4: z.ZodRecord<z.ZodString, z.ZodObject<{
            size: z.ZodString;
            f: z.ZodString;
            q: z.ZodString;
            q_text: z.ZodString;
            k: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            size: string;
            f: string;
            q: string;
            q_text: string;
            k: string;
        }, {
            size: string;
            f: string;
            q: string;
            q_text: string;
            k: string;
        }>>;
        mp3: z.ZodRecord<z.ZodString, z.ZodObject<{
            size: z.ZodString;
            f: z.ZodString;
            q: z.ZodString;
            q_text: z.ZodString;
            k: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            size: string;
            f: string;
            q: string;
            q_text: string;
            k: string;
        }, {
            size: string;
            f: string;
            q: string;
            q_text: string;
            k: string;
        }>>;
        other: z.ZodRecord<z.ZodString, z.ZodObject<{
            size: z.ZodString;
            f: z.ZodString;
            q: z.ZodString;
            q_text: z.ZodString;
            k: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            size: string;
            f: string;
            q: string;
            q_text: string;
            k: string;
        }, {
            size: string;
            f: string;
            q: string;
            q_text: string;
            k: string;
        }>>;
    }, "strip", z.ZodTypeAny, {
        mp4: Record<string, {
            size: string;
            f: string;
            q: string;
            q_text: string;
            k: string;
        }>;
        mp3: Record<string, {
            size: string;
            f: string;
            q: string;
            q_text: string;
            k: string;
        }>;
        other: Record<string, {
            size: string;
            f: string;
            q: string;
            q_text: string;
            k: string;
        }>;
    }, {
        mp4: Record<string, {
            size: string;
            f: string;
            q: string;
            q_text: string;
            k: string;
        }>;
        mp3: Record<string, {
            size: string;
            f: string;
            q: string;
            q_text: string;
            k: string;
        }>;
        other: Record<string, {
            size: string;
            f: string;
            q: string;
            q_text: string;
            k: string;
        }>;
    }>;
    related: z.ZodArray<z.ZodObject<{
        title: z.ZodString;
        contents: z.ZodArray<z.ZodObject<{
            v: z.ZodString;
            t: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            v: string;
            t: string;
        }, {
            v: string;
            t: string;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        title: string;
        contents: {
            v: string;
            t: string;
        }[];
    }, {
        title: string;
        contents: {
            v: string;
            t: string;
        }[];
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    status: string;
    t: number;
    title: string;
    mess: string;
    page: string;
    vid: string;
    extractor: string;
    a: string;
    links: {
        mp4: Record<string, {
            size: string;
            f: string;
            q: string;
            q_text: string;
            k: string;
        }>;
        mp3: Record<string, {
            size: string;
            f: string;
            q: string;
            q_text: string;
            k: string;
        }>;
        other: Record<string, {
            size: string;
            f: string;
            q: string;
            q_text: string;
            k: string;
        }>;
    };
    related: {
        title: string;
        contents: {
            v: string;
            t: string;
        }[];
    }[];
}, {
    status: string;
    t: number;
    title: string;
    mess: string;
    page: string;
    vid: string;
    extractor: string;
    a: string;
    links: {
        mp4: Record<string, {
            size: string;
            f: string;
            q: string;
            q_text: string;
            k: string;
        }>;
        mp3: Record<string, {
            size: string;
            f: string;
            q: string;
            q_text: string;
            k: string;
        }>;
        other: Record<string, {
            size: string;
            f: string;
            q: string;
            q_text: string;
            k: string;
        }>;
    };
    related: {
        title: string;
        contents: {
            v: string;
            t: string;
        }[];
    }[];
}>;
export declare const ConvertResponseSchema: z.ZodObject<{
    status: z.ZodString;
    mess: z.ZodString;
    c_status: z.ZodString;
    vid: z.ZodString;
    title: z.ZodString;
    ftype: z.ZodString;
    fquality: z.ZodString;
    dlink: z.ZodString;
}, "strip", z.ZodTypeAny, {
    status: string;
    title: string;
    mess: string;
    vid: string;
    c_status: string;
    ftype: string;
    fquality: string;
    dlink: string;
}, {
    status: string;
    title: string;
    mess: string;
    vid: string;
    c_status: string;
    ftype: string;
    fquality: string;
    dlink: string;
}>;
export {};
//# sourceMappingURL=youtubedl-v1.d.ts.map