"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const got_1 = __importDefault(require("got"));
const index_js_1 = require("../index.js");
const FB_URL = 'https://fb.watch/9WktuN9j-z/';
(0, node_test_1.describe)('Facebook Downloader', async () => {
    let result;
    (0, node_test_1.it)('Getting Metadata', async () => {
        result = await (0, index_js_1.facebookdl)(FB_URL);
    });
    (0, node_test_1.it)('Download a Video', async () => {
        const video = result.video[0];
        console.debug('Download video with quality: ', video.quality);
        const url = await video.download();
        const buffer = await (0, got_1.default)(url).buffer();
        node_assert_1.default.ok(buffer.byteLength > 1);
    });
});
