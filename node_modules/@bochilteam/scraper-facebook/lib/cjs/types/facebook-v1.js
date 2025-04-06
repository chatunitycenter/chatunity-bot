"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacebookDlSchema = exports.FacebookDlMediaSchema = exports.FacebookDlArgsSchema = void 0;
const zod_1 = require("zod");
exports.FacebookDlArgsSchema = zod_1.z.object({
    0: zod_1.z.string().url()
});
exports.FacebookDlMediaSchema = zod_1.z.array(zod_1.z.object({
    quality: zod_1.z.string(),
    download: zod_1.z.function(zod_1.z.tuple([])).returns(zod_1.z.promise(zod_1.z.string().url()))
}));
exports.FacebookDlSchema = zod_1.z.object({
    thumbnail: zod_1.z.string().url(),
    duration: zod_1.z.string().optional(),
    video: exports.FacebookDlMediaSchema,
    audio: exports.FacebookDlMediaSchema
});
