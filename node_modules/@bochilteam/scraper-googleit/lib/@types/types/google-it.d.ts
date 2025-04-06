import { z } from 'zod';
export declare const GoogleItArgsSchema: z.ZodObject<{
    0: z.ZodString;
}, "strip", z.ZodTypeAny, {
    0: string;
}, {
    0: string;
}>;
export declare const GoogleItSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    type: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    related: z.ZodArray<z.ZodString, "many">;
    articles: z.ZodArray<z.ZodObject<{
        header: z.ZodString;
        iconBase64: z.ZodOptional<z.ZodString>;
        title: z.ZodString;
        url: z.ZodString;
        thumbnail: z.ZodOptional<z.ZodString>;
        gif: z.ZodOptional<z.ZodString>;
        description: z.ZodString;
        footer: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        title: string;
        description: string;
        header: string;
        url: string;
        iconBase64?: string | undefined;
        thumbnail?: string | undefined;
        gif?: string | undefined;
        footer?: string | undefined;
    }, {
        title: string;
        description: string;
        header: string;
        url: string;
        iconBase64?: string | undefined;
        thumbnail?: string | undefined;
        gif?: string | undefined;
        footer?: string | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    related: string[];
    articles: {
        title: string;
        description: string;
        header: string;
        url: string;
        iconBase64?: string | undefined;
        thumbnail?: string | undefined;
        gif?: string | undefined;
        footer?: string | undefined;
    }[];
    title?: string | undefined;
    type?: string | undefined;
    description?: string | undefined;
}, {
    related: string[];
    articles: {
        title: string;
        description: string;
        header: string;
        url: string;
        iconBase64?: string | undefined;
        thumbnail?: string | undefined;
        gif?: string | undefined;
        footer?: string | undefined;
    }[];
    title?: string | undefined;
    type?: string | undefined;
    description?: string | undefined;
}>;
export type GoogleIt = z.infer<typeof GoogleItSchema>;
//# sourceMappingURL=google-it.d.ts.map