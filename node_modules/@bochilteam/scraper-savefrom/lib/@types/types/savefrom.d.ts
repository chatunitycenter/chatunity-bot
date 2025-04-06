import { z } from 'zod';
export declare const SavefromArgsSchema: z.ZodObject<{
    0: z.ZodString;
}, "strip", z.ZodTypeAny, {
    0: string;
}, {
    0: string;
}>;
export declare const SavefromUrlItemSchema: z.ZodObject<{
    url: z.ZodString;
    name: z.ZodString;
    type: z.ZodString;
    ext: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: string;
    url: string;
    name: string;
    ext: string;
}, {
    type: string;
    url: string;
    name: string;
    ext: string;
}>;
export declare const SavefromVideoSchema: z.ZodObject<{
    url: z.ZodString;
    format: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    url: string;
    format?: string | undefined;
}, {
    url: string;
    format?: string | undefined;
}>;
export declare const SavefromItemSchema: z.ZodObject<{
    url: z.ZodArray<z.ZodObject<{
        url: z.ZodString;
        name: z.ZodString;
        type: z.ZodString;
        ext: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: string;
        url: string;
        name: string;
        ext: string;
    }, {
        type: string;
        url: string;
        name: string;
        ext: string;
    }>, "many">;
    thumb: z.ZodString;
    sd: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        url: z.ZodString;
        format: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        url: string;
        format?: string | undefined;
    }, {
        url: string;
        format?: string | undefined;
    }>>>;
    meta: z.ZodObject<{
        title: z.ZodString;
        source: z.ZodString;
        duration: z.ZodOptional<z.ZodString>;
        tags: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        title: string;
        source: string;
        duration?: string | undefined;
        tags?: string | undefined;
    }, {
        title: string;
        source: string;
        duration?: string | undefined;
        tags?: string | undefined;
    }>;
    video_quality: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    hosting: z.ZodOptional<z.ZodString>;
    hd: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        url: z.ZodString;
        format: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        url: string;
        format?: string | undefined;
    }, {
        url: string;
        format?: string | undefined;
    }>>>;
}, "strip", z.ZodTypeAny, {
    url: {
        type: string;
        url: string;
        name: string;
        ext: string;
    }[];
    thumb: string;
    meta: {
        title: string;
        source: string;
        duration?: string | undefined;
        tags?: string | undefined;
    };
    sd?: {
        url: string;
        format?: string | undefined;
    } | null | undefined;
    video_quality?: string[] | undefined;
    hosting?: string | undefined;
    hd?: {
        url: string;
        format?: string | undefined;
    } | null | undefined;
}, {
    url: {
        type: string;
        url: string;
        name: string;
        ext: string;
    }[];
    thumb: string;
    meta: {
        title: string;
        source: string;
        duration?: string | undefined;
        tags?: string | undefined;
    };
    sd?: {
        url: string;
        format?: string | undefined;
    } | null | undefined;
    video_quality?: string[] | undefined;
    hosting?: string | undefined;
    hd?: {
        url: string;
        format?: string | undefined;
    } | null | undefined;
}>;
export declare const SavefromSchema: z.ZodArray<z.ZodObject<{
    url: z.ZodArray<z.ZodObject<{
        url: z.ZodString;
        name: z.ZodString;
        type: z.ZodString;
        ext: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: string;
        url: string;
        name: string;
        ext: string;
    }, {
        type: string;
        url: string;
        name: string;
        ext: string;
    }>, "many">;
    thumb: z.ZodString;
    sd: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        url: z.ZodString;
        format: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        url: string;
        format?: string | undefined;
    }, {
        url: string;
        format?: string | undefined;
    }>>>;
    meta: z.ZodObject<{
        title: z.ZodString;
        source: z.ZodString;
        duration: z.ZodOptional<z.ZodString>;
        tags: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        title: string;
        source: string;
        duration?: string | undefined;
        tags?: string | undefined;
    }, {
        title: string;
        source: string;
        duration?: string | undefined;
        tags?: string | undefined;
    }>;
    video_quality: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    hosting: z.ZodOptional<z.ZodString>;
    hd: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        url: z.ZodString;
        format: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        url: string;
        format?: string | undefined;
    }, {
        url: string;
        format?: string | undefined;
    }>>>;
}, "strip", z.ZodTypeAny, {
    url: {
        type: string;
        url: string;
        name: string;
        ext: string;
    }[];
    thumb: string;
    meta: {
        title: string;
        source: string;
        duration?: string | undefined;
        tags?: string | undefined;
    };
    sd?: {
        url: string;
        format?: string | undefined;
    } | null | undefined;
    video_quality?: string[] | undefined;
    hosting?: string | undefined;
    hd?: {
        url: string;
        format?: string | undefined;
    } | null | undefined;
}, {
    url: {
        type: string;
        url: string;
        name: string;
        ext: string;
    }[];
    thumb: string;
    meta: {
        title: string;
        source: string;
        duration?: string | undefined;
        tags?: string | undefined;
    };
    sd?: {
        url: string;
        format?: string | undefined;
    } | null | undefined;
    video_quality?: string[] | undefined;
    hosting?: string | undefined;
    hd?: {
        url: string;
        format?: string | undefined;
    } | null | undefined;
}>, "many">;
export type Savefrom = z.infer<typeof SavefromSchema>;
//# sourceMappingURL=savefrom.d.ts.map