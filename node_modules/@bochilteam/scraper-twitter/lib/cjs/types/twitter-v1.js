"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwitterDlSchema = exports.TwitterDLResponseSchema = exports.TwitterDLVariantSchema = exports.TwitterDlArgsSchema = void 0;
const zod_1 = require("zod");
exports.TwitterDlArgsSchema = zod_1.z.object({
    0: zod_1.z.string().url()
});
exports.TwitterDLVariantSchema = zod_1.z.object({
    bitrate: zod_1.z.number().optional(),
    content_type: zod_1.z.string(),
    url: zod_1.z.string().url(),
    height: zod_1.z.preprocess((data) => typeof data === 'number' ? data.toString() : data, zod_1.z.string()),
    width: zod_1.z.preprocess((data) => typeof data === 'number' ? data.toString() : data, zod_1.z.string())
});
exports.TwitterDLResponseSchema = zod_1.z.object({
    includes: zod_1.z.object({
        media: zod_1.z.array(zod_1.z.object({
            media_url_https: zod_1.z.string().url(),
            type: zod_1.z.string(),
            variants: zod_1.z.array(exports.TwitterDLVariantSchema)
        }))
    })
});
exports.TwitterDlSchema = exports.TwitterDLVariantSchema.array();
