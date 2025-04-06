"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const got_1 = __importDefault(require("got"));
const index_js_1 = require("../index.js");
const TIKTOK_URL = 'https://www.tiktok.com/@omagadsus/video/7025456384175017243?is_from_webapp=1&sender_device=pc&web_id6982004129280116226';
(0, node_test_1.describe)('Tiktok Downloader', async () => {
    let result;
    (0, node_test_1.it)('Getting Metadata', async () => {
        result = await (0, index_js_1.tiktokdl)(TIKTOK_URL);
        node_assert_1.default.strictEqual(result.nickname, 'OMAGAD😱');
        node_assert_1.default.strictEqual(result.username, '@omagadsus');
    });
    (0, node_test_1.it)('Video Watermark Downloader', async () => {
        const buffer = await (0, got_1.default)(result.video.withWatermark).buffer();
        node_assert_1.default.ok(buffer.byteLength > 0);
    });
    (0, node_test_1.it)('Video No Watermark Downloader', async () => {
        const buffer = await (0, got_1.default)(result.video.noWatermark).buffer();
        node_assert_1.default.ok(buffer.byteLength > 0);
    });
    (0, node_test_1.it)('Audio Downloader', async () => {
        const buffer = await (0, got_1.default)(result.audio).buffer();
        node_assert_1.default.ok(buffer.byteLength > 0);
    });
});
