"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YoutubedlV2ResponseSchema = void 0;
const zod_1 = require("zod");
const LinkItemSchema = zod_1.z.object({
    url: zod_1.z.string().url(),
    name: zod_1.z.string(),
    subname: zod_1.z.string(),
    type: zod_1.z.string(),
    ext: zod_1.z.string(),
    downloadable: zod_1.z.boolean(),
    quality: zod_1.z.string(),
    qualityNumber: zod_1.z.number(),
    audio: zod_1.z.boolean(),
    contentLength: zod_1.z.number().optional(),
    no_audio: zod_1.z.boolean(),
    itag: zod_1.z.string(),
    isBundle: zod_1.z.boolean(),
    isOtf: zod_1.z.boolean(),
    isDrm: zod_1.z.boolean(),
    filesize: zod_1.z.number().optional(),
    attr: zod_1.z.object({
        title: zod_1.z.string(),
        class: zod_1.z.string(),
    }),
});
exports.YoutubedlV2ResponseSchema = zod_1.z.object({
    id: zod_1.z.string(),
    cipher: zod_1.z.boolean(),
    meta: zod_1.z.object({
        title: zod_1.z.string(),
        source: zod_1.z.string().url(),
        duration: zod_1.z.string(),
        tags: zod_1.z.string(),
    }),
    thumb: zod_1.z.string().url(),
    itags: zod_1.z.array(zod_1.z.string()),
    video_quality: zod_1.z.array(zod_1.z.string()),
    url: zod_1.z.array(LinkItemSchema),
});
