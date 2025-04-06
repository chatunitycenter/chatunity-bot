"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnapSaveSchema = exports.SnapSaveArgsSchema = void 0;
const zod_1 = require("zod");
exports.SnapSaveArgsSchema = zod_1.z.object({
    0: zod_1.z.string().url()
});
exports.SnapSaveSchema = zod_1.z.object({
    description: zod_1.z.string().optional(),
    title: zod_1.z.string().optional(),
    results: zod_1.z.array(zod_1.z.object({
        resolution: zod_1.z.string().optional(),
        thumbnail: zod_1.z.string().url().optional(),
        url: zod_1.z.string().url()
    }))
});
