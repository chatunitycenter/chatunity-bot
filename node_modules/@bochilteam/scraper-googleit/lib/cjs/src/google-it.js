"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const got_1 = __importDefault(require("got"));
const cheerio_1 = __importDefault(require("cheerio"));
const google_it_js_1 = require("../types/google-it.js");
const constant_js_1 = require("./constant.js");
async function googleit(query, page = 0) {
    google_it_js_1.GoogleItArgsSchema.parse(arguments);
    const body = await (0, got_1.default)('https://www.google.com/search', {
        searchParams: {
            q: query,
            start: page * 10
        },
        headers: constant_js_1.DEFAULT_HEADERS
    }).text();
    const $ = cheerio_1.default.load(body);
    const title = $('div[data-attrid=title][role=heading]').text().trim();
    const type = $('div[data-attrid=subtitle][role=heading]').text().trim();
    const description = $('div.wDYxhc:not(.NFQFxe), div.wDYxhc.NFQFxe .V8fWH').map((_, el) => {
        const $el = $(el);
        $el.find('.SW5pqf').remove(); // Lainnya
        $el.find('h3').remove(); // Header
        const text = $el.text().trim();
        if (text)
            return text;
    }).toArray().filter(Boolean).join('\n');
    const related = $('.related-question-pair span.CSkcDe').map((_, el) => $(el).text().trim())
        .toArray().filter(Boolean);
    // const images = $('g-inner-card.xIfh4d > div > div > img').map((_, el) => {
    //     const $el = $(el)
    //     return $el.attr('src')
    // }).toArray().filter(Boolean)
    const articles = $('#kp-wp-tab-overview div.TzHB6b').map((_, el) => {
        const $el = $(el);
        const $header = $el.find('div.q0vns');
        const header = $header.find('span.VuuXrf').eq(0).text();
        const iconBase64 = $el.find('img.XNo5Ab').attr('src');
        const thumbnail = $el.find('.uhHOwf > img').attr('src');
        const url = $header.find('cite.qLRx3b').eq(0).text().trim();
        const title = $el.find('h3').eq(0).text().trim();
        const gif = $el.find('div.VYkpsb video').attr('src');
        const description = $el.find('div.VwiC3b').text().trim() || $el.find('div.fzUZNc').text().trim();
        const footer = $el.find('.ChPIuf').text().trim();
        if (!url)
            return false;
        return {
            url,
            header,
            thumbnail,
            iconBase64,
            title,
            gif,
            description,
            footer
        };
    }).toArray().filter(Boolean);
    const result = {
        title,
        type,
        description,
        related,
        articles
    };
    console.log(JSON.stringify(result, null, 4));
    return google_it_js_1.GoogleItSchema.parse(result);
}
exports.default = googleit;
