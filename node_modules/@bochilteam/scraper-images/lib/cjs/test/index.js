"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const index_js_1 = require("../index.js");
(0, node_test_1.describe)('Images', () => {
    (0, node_test_1.it)('Google Image', async function () {
        const data = await (0, index_js_1.googleImage)('Minecraft');
        node_assert_1.default.ok(data);
    });
    (0, node_test_1.it)('Pinterest', async () => {
        const data = await (0, index_js_1.pinterest)('Minecraft');
        node_assert_1.default.ok(data);
    });
    (0, node_test_1.it)('Wallpaper', async () => {
        const data = await (0, index_js_1.wallpaper)('Minecraft');
        node_assert_1.default.ok(data);
    });
    (0, node_test_1.it)('sticker Telegram', async () => {
        const data = await (0, index_js_1.stickerTelegram)('Minecraft');
        node_assert_1.default.ok(data);
    });
    (0, node_test_1.it)('Sticker Line', async () => {
        const data = await (0, index_js_1.stickerLine)('Anime');
        node_assert_1.default.ok(data);
    });
});
