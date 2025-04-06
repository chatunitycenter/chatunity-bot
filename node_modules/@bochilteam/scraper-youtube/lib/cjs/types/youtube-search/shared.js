"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollapsedSimpleTextSchema = exports.TextSchema = exports.CollapsedRunsClassSchema = exports.CollapsedThumbnailClassSchema = exports.CollapsedTextSchema = exports.AccessibilitySchema = exports.OwnerBadgeSchema = void 0;
const zod_1 = require("zod");
exports.OwnerBadgeSchema = zod_1.z.object({
    metadataBadgeRenderer: zod_1.z.object({
        style: zod_1.z.string(),
        tooltip: zod_1.z.string()
    })
});
exports.AccessibilitySchema = zod_1.z.object({
    accessibilityData: zod_1.z.object({
        label: zod_1.z.string()
    })
});
exports.CollapsedTextSchema = zod_1.z.object({
    text: zod_1.z.string()
});
exports.CollapsedThumbnailClassSchema = zod_1.z.object({
    thumbnails: zod_1.z.array(zod_1.z.object({
        url: zod_1.z.string(),
        width: zod_1.z.number(),
        height: zod_1.z.number()
    }))
});
exports.CollapsedRunsClassSchema = zod_1.z.object({
    runs: zod_1.z.array(exports.CollapsedTextSchema)
});
exports.TextSchema = zod_1.z.object({
    accessibility: exports.AccessibilitySchema,
    simpleText: zod_1.z.string()
});
exports.CollapsedSimpleTextSchema = zod_1.z.object({
    simpleText: zod_1.z.string()
});
