"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConvertResponseSchema = exports.YoutubedlResponseSchema = void 0;
const zod_1 = require("zod");
const LinkItemSchema = zod_1.z.object({
    size: zod_1.z.string(),
    f: zod_1.z.string(),
    q: zod_1.z.string(),
    q_text: zod_1.z.string(),
    k: zod_1.z.string(),
});
const LinksSchema = zod_1.z.object({
    mp4: zod_1.z.record(LinkItemSchema),
    mp3: zod_1.z.record(LinkItemSchema),
    other: zod_1.z.record(LinkItemSchema),
});
const RelatedContentSchema = zod_1.z.object({
    v: zod_1.z.string(),
    t: zod_1.z.string(),
});
const RelatedVideosSchema = zod_1.z.object({
    title: zod_1.z.string(),
    contents: zod_1.z.array(RelatedContentSchema),
});
exports.YoutubedlResponseSchema = zod_1.z.object({
    status: zod_1.z.string(),
    mess: zod_1.z.string(),
    page: zod_1.z.string(),
    vid: zod_1.z.string(),
    extractor: zod_1.z.string(),
    title: zod_1.z.string(),
    t: zod_1.z.number(),
    a: zod_1.z.string(),
    links: LinksSchema,
    related: zod_1.z.array(RelatedVideosSchema),
});
exports.ConvertResponseSchema = zod_1.z.object({
    status: zod_1.z.string(),
    mess: zod_1.z.string(),
    c_status: zod_1.z.string(),
    vid: zod_1.z.string(),
    title: zod_1.z.string(),
    ftype: zod_1.z.string(),
    fquality: zod_1.z.string(),
    dlink: zod_1.z.string().url(),
});
