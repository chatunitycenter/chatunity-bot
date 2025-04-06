"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const got_1 = __importDefault(require("got"));
const cheerio_1 = __importDefault(require("cheerio"));
const constant_js_1 = require("./constant.js");
const util_js_1 = require("./util.js");
const mediafire_dl_js_1 = require("../types/mediafire-dl.js");
async function mediafiredl(url) {
    var _a, _b;
    mediafire_dl_js_1.MediafiredlArgsSchema.parse(arguments);
    const data = await (0, got_1.default)(url, {
        headers: {
            ...constant_js_1.DEFAULT_HEADERS
        }
    }).text();
    const $ = cheerio_1.default.load(data);
    const Url = ($('#downloadButton').attr('href') || '').trim();
    const url2 = ($('#download_link > a.retry').attr('href') || '').trim();
    const $intro = $('div.dl-info > div.intro');
    const filename = $intro.find('div.filename').text().trim();
    const filetype = $intro.find('div.filetype > span').eq(0).text().trim();
    const ext = ((_b = (_a = /\(\.(.*?)\)/.exec($intro.find('div.filetype > span').eq(1).text())) === null || _a === void 0 ? void 0 : _a[1]) === null || _b === void 0 ? void 0 : _b.trim()) || 'bin';
    const $li = $('div.dl-info > ul.details > li');
    const aploud = $li.eq(1).find('span').text().trim();
    const filesizeH = $li.eq(0).find('span').text().trim();
    const filesize = (0, util_js_1.parseFileSize)(filesizeH);
    const result = {
        url: Url || url2,
        url2,
        filename,
        filetype,
        ext,
        aploud,
        filesizeH,
        filesize
    };
    return mediafire_dl_js_1.MediafiredlSchema.parse(result);
}
exports.default = mediafiredl;
