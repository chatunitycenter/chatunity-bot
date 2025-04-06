"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleItSchema = exports.GoogleItArgsSchema = void 0;
const zod_1 = require("zod");
exports.GoogleItArgsSchema = zod_1.z.object({
    0: zod_1.z.string()
});
exports.GoogleItSchema = zod_1.z.object({
    title: zod_1.z.string().optional(),
    type: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    // image: z.string().array().optional(),
    related: zod_1.z.string().array(),
    articles: zod_1.z.object({
        header: zod_1.z.string(),
        iconBase64: zod_1.z.string().optional(),
        title: zod_1.z.string(),
        url: zod_1.z.string(),
        thumbnail: zod_1.z.string().optional(),
        gif: zod_1.z.string().url().optional(),
        description: zod_1.z.string(),
        footer: zod_1.z.string().optional()
    }).array()
});
