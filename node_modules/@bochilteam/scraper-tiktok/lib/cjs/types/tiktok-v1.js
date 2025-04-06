"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TiktokDlSchema = exports.TiktokDlArgsSchema = void 0;
const zod_1 = require("zod");
exports.TiktokDlArgsSchema = zod_1.z.object({
    0: zod_1.z.string().url()
});
exports.TiktokDlSchema = zod_1.z.object({
    nickname: zod_1.z.string(),
    username: zod_1.z.string(),
    avatar: zod_1.z.string().url(),
    description: zod_1.z.string(),
    thumbnail: zod_1.z.string().url(),
    played: zod_1.z.string(),
    commented: zod_1.z.string(),
    saved: zod_1.z.string(),
    shared: zod_1.z.string(),
    song: zod_1.z.string(),
    video: zod_1.z.object({
        noWatermark: zod_1.z.string().url(),
        withWatermark: zod_1.z.string().url()
    }),
    audio: zod_1.z.string().url()
});
