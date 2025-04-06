"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SfilemobiSearchSchema = exports.SfilemobiSearchArgsSchema = void 0;
const zod_1 = require("zod");
exports.SfilemobiSearchArgsSchema = zod_1.z.object({
    0: zod_1.z.string(),
    1: zod_1.z.number().min(1).optional().default(1)
});
exports.SfilemobiSearchSchema = zod_1.z.array(zod_1.z.object({
    url: zod_1.z.string().url(),
    filename: zod_1.z.string(),
    icon: zod_1.z.string().url(),
    type: zod_1.z.string(),
    filesizeH: zod_1.z.string(),
    filesize: zod_1.z.number()
}));
