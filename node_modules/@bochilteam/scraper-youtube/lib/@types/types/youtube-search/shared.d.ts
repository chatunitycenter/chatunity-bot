import { z } from "zod";
export declare const OwnerBadgeSchema: z.ZodObject<{
    metadataBadgeRenderer: z.ZodObject<{
        style: z.ZodString;
        tooltip: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        style: string;
        tooltip: string;
    }, {
        style: string;
        tooltip: string;
    }>;
}, "strip", z.ZodTypeAny, {
    metadataBadgeRenderer: {
        style: string;
        tooltip: string;
    };
}, {
    metadataBadgeRenderer: {
        style: string;
        tooltip: string;
    };
}>;
export declare const AccessibilitySchema: z.ZodObject<{
    accessibilityData: z.ZodObject<{
        label: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        label: string;
    }, {
        label: string;
    }>;
}, "strip", z.ZodTypeAny, {
    accessibilityData: {
        label: string;
    };
}, {
    accessibilityData: {
        label: string;
    };
}>;
export declare const CollapsedTextSchema: z.ZodObject<{
    text: z.ZodString;
}, "strip", z.ZodTypeAny, {
    text: string;
}, {
    text: string;
}>;
export declare const CollapsedThumbnailClassSchema: z.ZodObject<{
    thumbnails: z.ZodArray<z.ZodObject<{
        url: z.ZodString;
        width: z.ZodNumber;
        height: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        url: string;
        width: number;
        height: number;
    }, {
        url: string;
        width: number;
        height: number;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    thumbnails: {
        url: string;
        width: number;
        height: number;
    }[];
}, {
    thumbnails: {
        url: string;
        width: number;
        height: number;
    }[];
}>;
export declare const CollapsedRunsClassSchema: z.ZodObject<{
    runs: z.ZodArray<z.ZodObject<{
        text: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        text: string;
    }, {
        text: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    runs: {
        text: string;
    }[];
}, {
    runs: {
        text: string;
    }[];
}>;
export declare const TextSchema: z.ZodObject<{
    accessibility: z.ZodObject<{
        accessibilityData: z.ZodObject<{
            label: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            label: string;
        }, {
            label: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        accessibilityData: {
            label: string;
        };
    }, {
        accessibilityData: {
            label: string;
        };
    }>;
    simpleText: z.ZodString;
}, "strip", z.ZodTypeAny, {
    accessibility: {
        accessibilityData: {
            label: string;
        };
    };
    simpleText: string;
}, {
    accessibility: {
        accessibilityData: {
            label: string;
        };
    };
    simpleText: string;
}>;
export declare const CollapsedSimpleTextSchema: z.ZodObject<{
    simpleText: z.ZodString;
}, "strip", z.ZodTypeAny, {
    simpleText: string;
}, {
    simpleText: string;
}>;
//# sourceMappingURL=shared.d.ts.map