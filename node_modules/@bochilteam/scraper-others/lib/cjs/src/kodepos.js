"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const got_1 = __importDefault(require("got"));
const cheerio_1 = __importDefault(require("cheerio"));
const kodepos_js_1 = require("../types/kodepos.js");
const constant_js_1 = require("./constant.js");
async function kodepos(query) {
    kodepos_js_1.KodePosArgsSchema.parse(arguments);
    const form = {
        kodepos: query
    };
    const html = await got_1.default.post('https://kodepos.posindonesia.co.id/CariKodepos', {
        headers: {
            ...constant_js_1.DEFAULT_HEADERS
        },
        form
    }).text();
    const $ = cheerio_1.default.load(html);
    const result = $('tbody > tr').map((_, el) => {
        const $td = $(el).find('td');
        const kodepos = $td.eq(1).text();
        const desa = $td.eq(2).text();
        const kecamatan = $td.eq(3).text();
        const kota = $td.eq(4).text();
        const provinsi = $td.eq(5).text();
        return {
            kodepos,
            desa,
            kecamatan,
            kota,
            provinsi
        };
    }).toArray();
    return kodepos_js_1.KodePosSchema.parse(result);
}
exports.default = kodepos;
