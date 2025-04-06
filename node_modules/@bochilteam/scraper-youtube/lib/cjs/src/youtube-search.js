"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const got_1 = __importDefault(require("got"));
const constant_js_1 = require("./constant.js");
const index_js_1 = require("../types/youtube-search/index.js");
const util_js_1 = require("./util.js");
async function youtubeSearch(query) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7;
    index_js_1.YoutubeSearchArgsSchema.parse(arguments);
    const html = await (0, got_1.default)('https://www.youtube.com/results', {
        headers: {
            ...constant_js_1.DEFAULT_HEADERS
        },
        searchParams: {
            // Append ?search_query=query
            search_query: query
        }
    }).text();
    const script = (_a = /var ytInitialData = {(.*?)};/.exec(html)) === null || _a === void 0 ? void 0 : _a[1];
    if (!script) {
        throw new Error(`Can't find script data (ytInitialData)!`);
    }
    const json = JSON.parse('{' + script + '}');
    const parsed = index_js_1.YoutubeSearchResponseSchema.parse(json);
    const contents = parsed.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0].itemSectionRenderer.contents;
    const video = [];
    const channel = [];
    for (const content of contents) {
        const tag = Object.keys(content)[0];
        if (tag === 'videoRenderer') {
            const data = content[tag];
            const videoId = data.videoId;
            const url = encodeURI('https://www.youtube.com/watch?v=' + videoId);
            const title = data.title.runs.pop().text;
            const thumbnail = data.thumbnail.thumbnails.pop().url;
            const description = ((_b = data.detailedMetadataSnippets) === null || _b === void 0 ? void 0 : _b.pop().snippetText.runs.map(({ text }) => text).join('')) || '';
            const movingThumbnail = (_d = (_c = data.richThumbnail) === null || _c === void 0 ? void 0 : _c.movingThumbnailRenderer.movingThumbnailDetails.thumbnails.pop().url) !== null && _d !== void 0 ? _d : thumbnail;
            const channelName = (_f = (_e = data.longBylineText.runs[0].text) !== null && _e !== void 0 ? _e : data.longBylineText.runs[0].text) !== null && _f !== void 0 ? _f : data.shortBylineText.runs[0].text;
            const channelAvatar = data.channelThumbnailSupportedRenderers.channelThumbnailWithLinkRenderer.thumbnail.thumbnails.pop().url;
            const isChannelVerified = (_h = (_g = data.ownerBadges) === null || _g === void 0 ? void 0 : _g.some((badge) => {
                return badge.metadataBadgeRenderer.style === 'BADGE_STYLE_TYPE_VERIFIED';
            })) !== null && _h !== void 0 ? _h : false;
            const publishedTime = (_k = (_j = data.publishedTimeText) === null || _j === void 0 ? void 0 : _j.simpleText) !== null && _k !== void 0 ? _k : 'unknown';
            const viewH = (_p = (_m = (_l = data.viewCountText.simpleText) !== null && _l !== void 0 ? _l : data.shortViewCountText.simpleText) !== null && _m !== void 0 ? _m : (_o = data.shortViewCountText.accessibility) === null || _o === void 0 ? void 0 : _o.accessibilityData.label) !== null && _p !== void 0 ? _p : '0 views';
            const view = parseInt((_r = (_q = data.viewCountText.simpleText) === null || _q === void 0 ? void 0 : _q.replace(',', '')) !== null && _r !== void 0 ? _r : '0');
            const thumbnailOverlayTimeStatusRenderer = (_s = data.thumbnailOverlays.find((thumbnail) => {
                const key = Object.keys(thumbnail)[0];
                return key === 'thumbnailOverlayTimeStatusRenderer';
            })) === null || _s === void 0 ? void 0 : _s.thumbnailOverlayTimeStatusRenderer;
            const durationH = (_u = (_t = data.lengthText) === null || _t === void 0 ? void 0 : _t.accessibility.accessibilityData.label) !== null && _u !== void 0 ? _u : (_v = thumbnailOverlayTimeStatusRenderer === null || thumbnailOverlayTimeStatusRenderer === void 0 ? void 0 : thumbnailOverlayTimeStatusRenderer.text.accessibility) === null || _v === void 0 ? void 0 : _v.accessibilityData.label;
            const durationTime = (_w = thumbnailOverlayTimeStatusRenderer === null || thumbnailOverlayTimeStatusRenderer === void 0 ? void 0 : thumbnailOverlayTimeStatusRenderer.text.simpleText) !== null && _w !== void 0 ? _w : '00:00';
            const isShort = durationTime === 'SHORTS';
            const duration = (0, util_js_1.time2Number)(isShort ? '00:60' : durationTime);
            video.push({
                videoId,
                url,
                title,
                thumbnail,
                description,
                movingThumbnail,
                channelName,
                channelAvatar,
                isChannelVerified,
                publishedTime,
                viewH,
                view,
                durationH,
                duration,
            });
        }
        if (tag === 'channelRenderer') {
            const data = content[tag];
            const channelId = data.channelId;
            const username = ((_4 = (_2 = (_0 = (_y = (_x = data.longBylineText.runs.pop()) === null || _x === void 0 ? void 0 : _x.navigationEndpoint.browseEndpoint.canonicalBaseUrl) !== null && _y !== void 0 ? _y : (_z = data.longBylineText.runs.pop()) === null || _z === void 0 ? void 0 : _z.navigationEndpoint.commandMetadata.webCommandMetadata.url) !== null && _0 !== void 0 ? _0 : (_1 = data.shortBylineText.runs.pop()) === null || _1 === void 0 ? void 0 : _1.navigationEndpoint.browseEndpoint.canonicalBaseUrl) !== null && _2 !== void 0 ? _2 : (_3 = data.shortBylineText.runs.pop()) === null || _3 === void 0 ? void 0 : _3.navigationEndpoint.commandMetadata.webCommandMetadata.url) !== null && _4 !== void 0 ? _4 : data.subscriberCountText.simpleText).replace(/^\//, '');
            const channelName = (_5 = data.title.text) !== null && _5 !== void 0 ? _5 : username;
            const url = encodeURI('https://www.youtube.com/' + username);
            const avatarUrl = data.thumbnail.thumbnails.pop().url;
            const avatar = encodeURI('https:' + avatarUrl);
            const isChannelVerified = (_7 = (_6 = data.ownerBadges) === null || _6 === void 0 ? void 0 : _6.some((badge) => {
                return badge.metadataBadgeRenderer.style === 'BADGE_STYLE_TYPE_VERIFIED';
            })) !== null && _7 !== void 0 ? _7 : false;
            const subscriberH = data.videoCountText.simpleText;
            // const subscriber = 
            const description = data.descriptionSnippet.runs.map(({ text }) => text).join('');
            channel.push({
                channelId,
                url,
                channelName,
                username,
                avatar,
                isChannelVerified,
                subscriberH,
                // TODO: Add subscriber wich is number of subscriber
                description
            });
        }
    }
    return index_js_1.YoutubeSearchSchema.parse({
        video,
        channel
    });
}
exports.default = youtubeSearch;
