"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const got_1 = __importDefault(require("got"));
const cheerio_1 = __importDefault(require("cheerio"));
const constant_js_1 = require("./constant.js");
const sfilemobi_dl_js_1 = require("../types/sfilemobi-dl.js");
async function sfilemobi(url) {
    var _a, _b, _c;
    sfilemobi_dl_js_1.SfilemobidlArgsSchema.parse(arguments);
    const data = await (0, got_1.default)(url, {
        headers: {
            ...constant_js_1.DEFAULT_HEADERS
        }
    }).text();
    const $ = cheerio_1.default.load(data);
    const dlUrl = $('#download').attr('href');
    const filename = $('div.intro-container > img').attr('alt') || $('div.intro-container > h1').text();
    const icon = $('div.intro-container > img').attr('src');
    const type = (_a = /\/smallicon\/(.*?)\.svg/.exec(icon)) === null || _a === void 0 ? void 0 : _a[1];
    const $list = $('div.list');
    const mimetype = (_b = $list.eq(0).text().split('-')[1]) === null || _b === void 0 ? void 0 : _b.trim();
    const uploaded = (_c = $list.eq(2).text().split('Uploaded:')[1]) === null || _c === void 0 ? void 0 : _c.trim();
    const $upload = $list.eq(1).find('a');
    const uploadby = $upload.eq(0).text();
    const uploadbyUrl = $upload.eq(0).attr('href');
    const uploadon = $upload.eq(1).text();
    const uploadonUrl = $upload.eq(1).attr('href');
    const downloads = parseInt($list.eq(3).text().split('Downloads:')[1]);
    const result = {
        url: dlUrl,
        filename,
        icon,
        type,
        mimetype,
        uploaded,
        uploadby,
        uploadbyUrl,
        uploadon,
        uploadonUrl,
        downloads
    };
    return sfilemobi_dl_js_1.SfilemobidlSchema.parse(result);
}
exports.default = sfilemobi;
