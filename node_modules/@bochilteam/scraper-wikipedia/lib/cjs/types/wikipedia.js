"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WikipediaSchema = exports.WikipediaArgsSchema = void 0;
const zod_1 = require("zod");
exports.WikipediaArgsSchema = zod_1.z.object({
    0: zod_1.z.string(),
    1: zod_1.z.string()
});
exports.WikipediaSchema = zod_1.z.object({
    title: zod_1.z.string(),
    images: zod_1.z.string().url().array(),
    articles: zod_1.z.string()
});
