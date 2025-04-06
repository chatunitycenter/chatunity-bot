"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KodePosSchema = exports.KodePosArgsSchema = void 0;
const zod_1 = require("zod");
exports.KodePosArgsSchema = zod_1.z.object({
    0: zod_1.z.string()
});
exports.KodePosSchema = zod_1.z.array(zod_1.z.object({
    kodepos: zod_1.z.string(),
    desa: zod_1.z.string(),
    kecamatan: zod_1.z.string(),
    kota: zod_1.z.string(),
    provinsi: zod_1.z.string(),
}));
