"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const got_1 = __importDefault(require("got"));
const cheerio_1 = __importDefault(require("cheerio"));
const util_js_1 = require("./util.js");
const index_js_1 = require("../types/index.js");
const lyrics_v1_js_1 = require("../types/lyrics-v1.js");
const constant_js_1 = require("./constant.js");
/**
 * Scrape from https://www.musixmatch.com
 */
async function lyrics(query) {
    index_js_1.LyricsArgsSchema.parse(arguments);
    const baseUrl = `https://www.musixmatch.com/ws/1.1/macro.search?app_id=mxm-com-v1.0&format=json&part=track_artist%2Cartist_image&q=${encodeURIComponent(query).replace(/%20/, '+')}&page_size=20&track_fields_set=community_track_search&artist_fields_set=community_artist_search`;
    const hash = (0, util_js_1.generateMusixmatchHash)(baseUrl);
    const data = await (0, got_1.default)(`${baseUrl}&signature=${encodeURIComponent(hash)}&signature_protocol=sha256`, {
        headers: {
            ...constant_js_1.DEFAULT_HEADERS,
            accept: 'application/json',
            referer: 'https://www.musixmatch.com/search',
            cookie: '_gcl_au=1.1.85206978.1720616187; _ga=GA1.1.1878424828.1720616188; OptanonConsent=isGpcEnabled=0&datestamp=Thu+Jul+11+2024+09%3A45%3A32+GMT%2B0700+(Western+Indonesia+Time)&version=202402.1.0&browserGpcFlag=0&isIABGlobal=false&hosts=&consentId=380df0d7-977b-41ad-ac81-c550cdc8a59c&interactionCount=1&isAnonUser=1&landingPath=NotLandingPage&groups=C0001%3A1%2CC0002%3A0%2CC0003%3A0%2CC0004%3A0&AwaitingReconsent=false; _ga_71BQKD81W0=GS1.1.1720668421.3.0.1720668421.0.0.0; _ga_FPN5W0WTG8=GS1.1.1720668422.3.0.1720668422.0.0.0'
        }
    }).json();
    const json = lyrics_v1_js_1.LyricsMetadataResponseSchema.parse(data);
    const trackList = json.message.body.macro_result_list.track_list;
    if (!trackList.length)
        throw new Error(`Can't get lyrics '${query}'!`);
    const { track_share_url, track_spotify_id, track_id, track_name, artist_name, album_name, first_release_date, album_coverart_100x100, album_coverart_350x350, album_coverart_500x500, album_coverart_800x800, } = trackList[0].track;
    const html = await (0, got_1.default)(track_share_url, {
        headers: {
            ...constant_js_1.DEFAULT_HEADERS,
            cookie: '_gcl_au=1.1.85206978.1720616187; _ga=GA1.1.1878424828.1720616188; OptanonConsent=isGpcEnabled=0&datestamp=Thu+Jul+11+2024+09%3A45%3A32+GMT%2B0700+(Western+Indonesia+Time)&version=202402.1.0&browserGpcFlag=0&isIABGlobal=false&hosts=&consentId=380df0d7-977b-41ad-ac81-c550cdc8a59c&interactionCount=1&isAnonUser=1&landingPath=NotLandingPage&groups=C0001%3A1%2CC0002%3A0%2CC0003%3A0%2CC0004%3A0&AwaitingReconsent=false; _ga_71BQKD81W0=GS1.1.1720668421.3.0.1720668421.0.0.0; _ga_FPN5W0WTG8=GS1.1.1720668422.3.0.1720668422.0.0.0'
        }
    }).text();
    const $ = cheerio_1.default.load(html);
    const lyrics = $('div.css-175oi2r.r-13awgt0.r-eqz5dr.r-1v1z2uz > div.css-175oi2r.r-zd98yo > div.css-175oi2r').filter('.r-k200y, .r-18u37iz').map(function () {
        const $el = $(this);
        const header = $el.find('div > h3').text();
        const lyric = $el.find('div').text();
        return {
            type: header ? 'header' : 'lyric',
            text: header || lyric
        };
    }).toArray();
    const result = {
        id: track_id,
        title: track_name,
        url: track_share_url,
        artist: artist_name,
        album: album_name,
        albumCover: album_coverart_800x800 || album_coverart_500x500 || album_coverart_350x350 || album_coverart_100x100,
        release: first_release_date,
        spotify: `https://open.spotify.com/track/${track_spotify_id}`,
        lyrics
    };
    return lyrics_v1_js_1.LyricsSchema.parse(result);
}
exports.default = lyrics;
