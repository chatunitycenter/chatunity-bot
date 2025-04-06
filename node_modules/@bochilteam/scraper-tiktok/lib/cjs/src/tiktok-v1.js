"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const got_1 = __importDefault(require("got"));
const cheerio_1 = __importDefault(require("cheerio"));
const tiktok_v1_js_1 = require("../types/tiktok-v1.js");
const constant_js_1 = require("./constant.js");
async function tiktokdl(url) {
    tiktok_v1_js_1.TiktokDlArgsSchema.parse(arguments);
    const html = await got_1.default.post('https://ttsave.app/download', {
        headers: {
            ...constant_js_1.DEFAULT_HEADERS,
            origin: 'https://ttsave.app'
        },
        json: {
            language_id: '1',
            query: url
        }
    }).text();
    const $ = cheerio_1.default.load(html);
    const $div = $('div.flex');
    const nickname = $div.find('h2').text();
    const username = $div.find('a.font-extrabold').text();
    const avatar = $div.find('a > img').attr('src');
    const description = $div.find('p').text();
    const $span = $div.find('div.flex > div.flex > span');
    const played = $span.eq(0).text();
    const commented = $span.eq(1).text();
    const saved = $span.eq(2).text();
    const shared = $span.eq(3).text();
    const song = $div.find('div.flex > span').eq(4).text();
    const $a = $('#button-download-ready > a');
    const noWatermark = $a.eq(0).attr('href');
    const withWatermark = $a.eq(1).attr('href');
    const audio = $a.eq(2).attr('href');
    const thumbnail = $a.eq(4).attr('href');
    const result = {
        nickname,
        username,
        avatar,
        description,
        thumbnail,
        played,
        commented,
        saved,
        shared,
        song,
        video: {
            noWatermark,
            withWatermark
        },
        audio
    };
    return tiktok_v1_js_1.TiktokDlSchema.parse(result);
}
exports.default = tiktokdl;
