"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SfilemobidlSchema = exports.SfilemobidlArgsSchema = void 0;
const zod_1 = require("zod");
const URL_ERROR_MESSAGE = 'Input must be a valid sfile.mobi URL!';
exports.SfilemobidlArgsSchema = zod_1.z.object({
    0: zod_1.z.string().url({ message: URL_ERROR_MESSAGE }).regex(/^(https?:\/\/)?sfile\.mobi/i, URL_ERROR_MESSAGE)
});
exports.SfilemobidlSchema = zod_1.z.object({
    url: zod_1.z.string().url(),
    filename: zod_1.z.string(),
    icon: zod_1.z.string(),
    type: zod_1.z.string(),
    mimetype: zod_1.z.string(),
    uploaded: zod_1.z.string(),
    uploadby: zod_1.z.string(),
    uploadbyUrl: zod_1.z.string().url(),
    uploadon: zod_1.z.string(),
    uploadonUrl: zod_1.z.string().url(),
    downloads: zod_1.z.number()
});
