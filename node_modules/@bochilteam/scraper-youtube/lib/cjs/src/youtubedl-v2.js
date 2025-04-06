"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convert = void 0;
const got_1 = __importDefault(require("got"));
const human_readable_1 = require("human-readable");
const index_js_1 = require("../types/index.js");
const constant_js_1 = require("./constant.js");
const util_js_1 = require("./util.js");
const youtubedl_v2_js_1 = require("../types/youtubedl-v2.js");
const toFormat = (0, human_readable_1.sizeFormatter)({
    std: 'JEDEC', // 'SI' (default) | 'IEC' | 'JEDEC'
    decimalPlaces: 2,
    keepTrailingZeroes: false,
    render: (literal, symbol) => `${literal} ${symbol}B`
});
async function youtubedlv2(url, server) {
    index_js_1.YoutubeDownloaderArgsSchema.parse(arguments);
    const form = {
        ts: Date.now(),
        url,
        _s: (0, util_js_1.generateHash)(url),
        _ts: 1720429578286,
        _tsc: 0
    };
    const data = await got_1.default.post('https://api.ssyoutube.com/api/convert', {
        headers: {
            ...constant_js_1.DEFAULT_HEADERS,
            'origin': 'https://ssyoutube.com'
        },
        json: form
    }).json();
    const json = youtubedl_v2_js_1.YoutubedlV2ResponseSchema.parse(data);
    const video = {};
    const audio = {};
    const other = {};
    for (const item of json.url) {
        const type = item.ext; // 'mp4' 'mp3' 'webm'
        const quality = item.quality;
        const fileSize = item.filesize || item.contentLength || 0;
        const fileSizeH = toFormat(fileSize);
        (type === 'mp4' ? video : ['mp3', 'opus'].includes(type) ? audio : other)[quality.toLowerCase()] = {
            quality,
            type,
            fileSizeH,
            fileSize,
            download: async () => url
        };
    }
    const duration = (0, util_js_1.time2Number)(json.meta.duration);
    const res = {
        id: json.id,
        title: json.meta.title,
        thumbnail: `https://i.ytimg.com/vi/${json.id}/0.jpg`,
        duration,
        video,
        audio,
        other
    };
    return index_js_1.YoutubedlSchema.parse(res);
}
exports.default = youtubedlv2;
async function convert(serverUrl, v_id, ftype, fquality, token, timeExpire) {
}
exports.convert = convert;
