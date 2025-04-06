import { z } from 'zod';
export declare const TwitterDlArgsSchema: z.ZodObject<{
    0: z.ZodString;
}, "strip", z.ZodTypeAny, {
    0: string;
}, {
    0: string;
}>;
export declare const TwitterDLVariantSchema: z.ZodObject<{
    bitrate: z.ZodOptional<z.ZodNumber>;
    content_type: z.ZodString;
    url: z.ZodString;
    height: z.ZodEffects<z.ZodString, string, unknown>;
    width: z.ZodEffects<z.ZodString, string, unknown>;
}, "strip", z.ZodTypeAny, {
    content_type: string;
    url: string;
    height: string;
    width: string;
    bitrate?: number | undefined;
}, {
    content_type: string;
    url: string;
    bitrate?: number | undefined;
    height?: unknown;
    width?: unknown;
}>;
export declare const TwitterDLResponseSchema: z.ZodObject<{
    includes: z.ZodObject<{
        media: z.ZodArray<z.ZodObject<{
            media_url_https: z.ZodString;
            type: z.ZodString;
            variants: z.ZodArray<z.ZodObject<{
                bitrate: z.ZodOptional<z.ZodNumber>;
                content_type: z.ZodString;
                url: z.ZodString;
                height: z.ZodEffects<z.ZodString, string, unknown>;
                width: z.ZodEffects<z.ZodString, string, unknown>;
            }, "strip", z.ZodTypeAny, {
                content_type: string;
                url: string;
                height: string;
                width: string;
                bitrate?: number | undefined;
            }, {
                content_type: string;
                url: string;
                bitrate?: number | undefined;
                height?: unknown;
                width?: unknown;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            type: string;
            media_url_https: string;
            variants: {
                content_type: string;
                url: string;
                height: string;
                width: string;
                bitrate?: number | undefined;
            }[];
        }, {
            type: string;
            media_url_https: string;
            variants: {
                content_type: string;
                url: string;
                bitrate?: number | undefined;
                height?: unknown;
                width?: unknown;
            }[];
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        media: {
            type: string;
            media_url_https: string;
            variants: {
                content_type: string;
                url: string;
                height: string;
                width: string;
                bitrate?: number | undefined;
            }[];
        }[];
    }, {
        media: {
            type: string;
            media_url_https: string;
            variants: {
                content_type: string;
                url: string;
                bitrate?: number | undefined;
                height?: unknown;
                width?: unknown;
            }[];
        }[];
    }>;
}, "strip", z.ZodTypeAny, {
    includes: {
        media: {
            type: string;
            media_url_https: string;
            variants: {
                content_type: string;
                url: string;
                height: string;
                width: string;
                bitrate?: number | undefined;
            }[];
        }[];
    };
}, {
    includes: {
        media: {
            type: string;
            media_url_https: string;
            variants: {
                content_type: string;
                url: string;
                bitrate?: number | undefined;
                height?: unknown;
                width?: unknown;
            }[];
        }[];
    };
}>;
export declare const TwitterDlSchema: z.ZodArray<z.ZodObject<{
    bitrate: z.ZodOptional<z.ZodNumber>;
    content_type: z.ZodString;
    url: z.ZodString;
    height: z.ZodEffects<z.ZodString, string, unknown>;
    width: z.ZodEffects<z.ZodString, string, unknown>;
}, "strip", z.ZodTypeAny, {
    content_type: string;
    url: string;
    height: string;
    width: string;
    bitrate?: number | undefined;
}, {
    content_type: string;
    url: string;
    bitrate?: number | undefined;
    height?: unknown;
    width?: unknown;
}>, "many">;
export type TwitterDl = z.infer<typeof TwitterDlSchema>;
//# sourceMappingURL=twitter-v1.d.ts.map