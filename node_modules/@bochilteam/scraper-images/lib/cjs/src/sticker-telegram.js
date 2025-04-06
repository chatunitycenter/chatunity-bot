"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = __importDefault(require("cheerio"));
const got_1 = __importDefault(require("got"));
const index_js_1 = require("../types/index.js");
const constant_js_1 = require("./constant.js");
async function stickerTelegram(query, page) {
    const data = await (0, got_1.default)(`https://combot.org/stickers?q=${encodeURI(query)}&page=${page || 1}`, {
        headers: {
            ...constant_js_1.DEFAULT_HEADERS,
            'user-agent': 'PostmanRuntime/7.39.1' // prevent forbidden
        }
    }).text();
    const $ = cheerio_1.default.load(data);
    const results = [];
    $('body > div > main > div.page > div > div.stickers-catalogue > div.tab-content > div > div').each(function () {
        var _a;
        const title = (_a = $(this).find('.sticker-pack__title').text()) === null || _a === void 0 ? void 0 : _a.trim();
        const icon = $(this)
            .find('.sticker-pack__sticker > div.sticker-pack__sticker-inner > div.sticker-pack__sticker-img')
            .attr('data-src');
        const link = $(this)
            .find('.sticker-pack__header > a.sticker-pack__btn')
            .attr('href');
        const stickers = [];
        $(this)
            .find('.sticker-pack__list > div.sticker-pack__sticker')
            .each(function () {
            const sticker = $(this)
                .find('.sticker-pack__sticker-inner > div.sticker-pack__sticker-img')
                .attr('data-src');
            if (sticker)
                stickers.push(sticker);
        });
        results.push({
            title,
            icon,
            link,
            stickers
        });
    });
    return results.map((value) => index_js_1.StickerTelegramSchema.parse(value));
}
exports.default = stickerTelegram;
