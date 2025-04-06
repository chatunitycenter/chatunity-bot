"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SavefromSchema = exports.SavefromItemSchema = exports.SavefromVideoSchema = exports.SavefromUrlItemSchema = exports.SavefromArgsSchema = void 0;
const zod_1 = require("zod");
exports.SavefromArgsSchema = zod_1.z.object({
    0: zod_1.z.string().url()
});
exports.SavefromUrlItemSchema = zod_1.z.object({
    url: zod_1.z.string().url(),
    name: zod_1.z.string(),
    type: zod_1.z.string(),
    ext: zod_1.z.string(),
});
exports.SavefromVideoSchema = zod_1.z.object({
    url: zod_1.z.string().url(),
    format: zod_1.z.string().optional()
});
exports.SavefromItemSchema = zod_1.z.object({
    url: zod_1.z.array(exports.SavefromUrlItemSchema),
    thumb: zod_1.z.string().url(),
    sd: exports.SavefromVideoSchema.nullish(),
    meta: zod_1.z.object({
        title: zod_1.z.string(),
        source: zod_1.z.string().url(),
        duration: zod_1.z.string().optional(),
        tags: zod_1.z.string().optional()
    }),
    video_quality: zod_1.z.array(zod_1.z.string()).optional(),
    hosting: zod_1.z.string().optional(),
    hd: exports.SavefromVideoSchema.nullish(),
});
exports.SavefromSchema = zod_1.z.array(exports.SavefromItemSchema);
