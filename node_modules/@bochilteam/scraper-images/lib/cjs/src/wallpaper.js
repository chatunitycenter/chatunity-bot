"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wallpaper = void 0;
const cheerio_1 = __importDefault(require("cheerio"));
const got_1 = __importDefault(require("got"));
const index_js_1 = require("../types/index.js");
const constant_js_1 = require("./constant.js");
async function wallpaper(query) {
    const data = await (0, got_1.default)(`https://www.shutterstock.com/search/${query}`, {
        headers: constant_js_1.DEFAULT_HEADERS
    }).text();
    const $ = cheerio_1.default.load(data);
    const results = [
        ...new Set([
            ...$.html().matchAll(/https?:\/\/(image|www)\.shutterstock\.com\/([^"]+)/gim)
        ]
            .map((v) => v[0])
            .filter((v) => /.*\.jpe?g|png$/gi.test(v)))
    ];
    return results.map((value) => index_js_1.WallpaperSchema.parse(value));
}
exports.wallpaper = wallpaper;
