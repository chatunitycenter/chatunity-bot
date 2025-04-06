"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const got_1 = __importDefault(require("got"));
const cheerio_1 = __importDefault(require("cheerio"));
const util_js_1 = require("./util.js");
const constant_js_1 = require("./constant.js");
const sfilemobi_search_js_1 = require("../types/sfilemobi-search.js");
async function sfilemobiSearch(query, page = 1) {
    sfilemobi_search_js_1.SfilemobiSearchArgsSchema.parse(arguments);
    const data = await (0, got_1.default)('https://sfile.mobi/search.php', {
        searchParams: {
            q: query,
            page
        },
        headers: {
            ...constant_js_1.DEFAULT_HEADERS
        }
    }).text();
    const $ = cheerio_1.default.load(data);
    const results = [];
    $('div > div > div.list').each((_, el) => {
        var _a, _b;
        const $el = $(el);
        const url = $el.find('a').attr('href');
        const filename = $el.find('a').text();
        const icon = $el.find('img').attr('src');
        const type = (_a = /\/smallicon\/(.*?)\.svg/.exec(icon)) === null || _a === void 0 ? void 0 : _a[1];
        const filesizeH = (_b = /\((.*?)\)/.exec($el.text())) === null || _b === void 0 ? void 0 : _b[1];
        const filesize = filesizeH && (0, util_js_1.parseFileSize)(filesizeH);
        if (filename && url) {
            results.push({
                url,
                filename,
                icon: icon,
                type: type,
                filesizeH: filesizeH,
                filesize: filesize
            });
        }
    });
    return sfilemobi_search_js_1.SfilemobiSearchSchema.parse(results);
}
exports.default = sfilemobiSearch;
