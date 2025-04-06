"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YoutubedlSchema = exports.YoutubeDownloaderArgsSchema = void 0;
const zod_1 = require("zod");
exports.YoutubeDownloaderArgsSchema = zod_1.z.object({
    0: zod_1.z.string().url(),
    1: zod_1.z.literal('id')
        .or(zod_1.z.literal('en'))
        .or(zod_1.z.literal('es'))
        .optional()
});
const YoutubedlDataSchema = zod_1.z.object({
    quality: zod_1.z.string(),
    type: zod_1.z.string(),
    fileSizeH: zod_1.z.string(),
    fileSize: zod_1.z.number(),
    download: zod_1.z.function(zod_1.z.tuple([]), zod_1.z.promise(zod_1.z.string().url()))
});
exports.YoutubedlSchema = zod_1.z.object({
    id: zod_1.z.string(),
    thumbnail: zod_1.z.string(),
    title: zod_1.z.string(),
    duration: zod_1.z.number(),
    video: zod_1.z.record(zod_1.z.string(), YoutubedlDataSchema),
    audio: zod_1.z.record(zod_1.z.string(), YoutubedlDataSchema),
    other: zod_1.z.record(zod_1.z.string(), YoutubedlDataSchema)
});
