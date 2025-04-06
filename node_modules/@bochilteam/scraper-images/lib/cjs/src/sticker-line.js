"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const got_1 = __importDefault(require("got"));
const index_js_1 = require("../types/index.js");
async function stickerLine(query) {
    const data = await (0, got_1.default)(`https://store.line.me/api/search/sticker?query=${query}&offset=0&limit=36&type=ALL&includeFacets=true`).json();
    return data.items.map(({ title, productUrl, id, description, payloadForProduct: { staticUrl, animationUrl, soundUrl }, authorId, authorName }) => {
        return index_js_1.StickerLineSchema.parse({
            id,
            title,
            description,
            url: encodeURI('https://store.line.me' + productUrl),
            sticker: staticUrl,
            stickerAnimated: animationUrl,
            stickerSound: soundUrl,
            authorId,
            authorName
        });
    });
}
exports.default = stickerLine;
