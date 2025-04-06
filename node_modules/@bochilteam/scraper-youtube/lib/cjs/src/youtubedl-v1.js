"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convert = void 0;
const got_1 = __importDefault(require("got"));
const youtubedl_v1_js_1 = require("../types/youtubedl-v1.js");
const index_js_1 = require("../types/index.js");
const constant_js_1 = require("./constant.js");
const util_js_1 = require("./util.js");
async function youtubedl(url, server) {
    index_js_1.YoutubeDownloaderArgsSchema.parse(arguments);
    const form = {
        k_query: url,
        k_page: 'home',
        hl: server || 'en',
        q_auto: 0
    };
    const data = await got_1.default.post('https://www.y2mate.com/mates/analyzeV2/ajax', {
        headers: {
            ...constant_js_1.DEFAULT_HEADERS,
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            cookie: '_ga=GA1.1.1058493269.1720585210; _ga_PSRPB96YVC=GS1.1.1720585209.1.1.1720585486.0.0.0',
            origin: 'https://www.y2mate.com'
        },
        form
    }).json();
    const json = youtubedl_v1_js_1.YoutubedlResponseSchema.parse(data);
    const video = {};
    const audio = {};
    const other = {};
    for (const key in json.links) {
        for (const tag in json.links[key]) {
            const data = json.links[key][tag];
            const quality = data.q;
            const type = data.f;
            const fileSizeH = data.size;
            const fileSize = (0, util_js_1.parseFileSize)(fileSizeH);
            (type === 'mp4' ? video : type === 'mp3' ? audio : other)[quality.toLowerCase()] = {
                quality,
                type,
                fileSizeH,
                fileSize,
                download: convert.bind(convert, json.vid, data.k)
            };
        }
    }
    const result = {
        id: json.vid,
        thumbnail: `https://i.ytimg.com/vi/${json.vid}/0.jpg`,
        title: json.title,
        duration: json.t,
        video,
        audio,
        other
    };
    return index_js_1.YoutubedlSchema.parse(result);
}
exports.default = youtubedl;
async function convert(vid, k) {
    const form = {
        vid,
        k
    };
    const data = await got_1.default.post('https://www.y2mate.com/mates/convertV2/index', {
        headers: {
            ...constant_js_1.DEFAULT_HEADERS,
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            cookie: '_ga=GA1.1.1058493269.1720585210; _ga_PSRPB96YVC=GS1.1.1720585209.1.1.1720585486.0.0.0',
            origin: 'https://www.y2mate.com'
        },
        form
    }).json();
    const json = youtubedl_v1_js_1.ConvertResponseSchema.parse(data);
    return json.dlink;
}
exports.convert = convert;
