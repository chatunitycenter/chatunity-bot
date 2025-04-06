"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediafiredlSchema = exports.MediafiredlArgsSchema = void 0;
const zod_1 = require("zod");
exports.MediafiredlArgsSchema = zod_1.z.object({
    0: zod_1.z.string().url()
});
exports.MediafiredlSchema = zod_1.z.object({
    url: zod_1.z.string().url(),
    url2: zod_1.z.string().url(),
    filename: zod_1.z.string(),
    filetype: zod_1.z.string(),
    ext: zod_1.z.string(),
    aploud: zod_1.z.string(),
    filesizeH: zod_1.z.string(),
    filesize: zod_1.z.number()
});
