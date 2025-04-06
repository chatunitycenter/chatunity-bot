"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const got_1 = __importDefault(require("got"));
const twitter_v1_js_1 = require("../types/twitter-v1.js");
const constant_js_1 = require("./constant.js");
const util_js_1 = require("./util.js");
async function twitterdl(url) {
    twitter_v1_js_1.TwitterDlArgsSchema.parse(arguments);
    const id = (url.match(/status\/(\d+)/) || url.match(/(\d+)/))[1];
    // a.prototype.loadTweet
    const token = (0, util_js_1.generateTokenId)(id);
    const data = await (0, got_1.default)(`https://api.redketchup.io/tweetAttachments-v6?id=${encodeURIComponent(token)}`, {
        headers: {
            ...constant_js_1.DEFAULT_HEADERS,
            origin: 'https://redketchup.io',
            referer: 'https://redketchup.io/',
        }
    }).json();
    const json = twitter_v1_js_1.TwitterDLResponseSchema.parse(data);
    const media = json.includes.media.find((media) => media.type === 'video');
    const result = media.variants.filter((variant) => variant.content_type !== 'application/x-mpegURL');
    return twitter_v1_js_1.TwitterDlSchema.parse(result);
}
exports.default = twitterdl;
