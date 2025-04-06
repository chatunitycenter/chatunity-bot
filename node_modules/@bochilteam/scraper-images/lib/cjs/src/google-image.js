"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = __importDefault(require("cheerio"));
const got_1 = __importDefault(require("got"));
const index_js_1 = require("../types/index.js");
const constant_js_1 = require("./constant.js");
async function googleImage(query) {
    const data = await (0, got_1.default)(`https://www.google.com/search?q=${query}&tbm=isch`, {
        headers: constant_js_1.DEFAULT_HEADERS
    }).text();
    const $ = cheerio_1.default.load(data);
    const pattern = /\[1,\[0,"(?<id>[\d\w\-_]+)",\["https?:\/\/(?:[^"]+)",\d+,\d+\]\s?,\["(?<url>https?:\/\/(?:[^"]+))",\d+,\d+\]/gm;
    const matches = $.html().matchAll(pattern);
    const decodeUrl = (url) => decodeURIComponent(JSON.parse(`"${url}"`));
    return [...matches]
        .map(({ groups }) => decodeUrl(groups === null || groups === void 0 ? void 0 : groups.url))
        .filter((v) => /.*\.jpe?g|png$/gi.test(v))
        .map((value) => index_js_1.GoogleImageSchema.parse(value));
}
exports.default = googleImage;
