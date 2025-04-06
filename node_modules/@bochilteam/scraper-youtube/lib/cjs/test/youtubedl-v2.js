"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../index.js");
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const got_1 = __importDefault(require("got"));
const YT_URL = 'https://youtu.be/iik25wqIuFo';
(0, node_test_1.describe)('Youtube Download V2', () => {
    let data;
    (0, node_test_1.it)('Getting metadata', async () => {
        data = await (0, index_js_1.youtubedlv2)(YT_URL);
    });
    let videoUrl;
    (0, node_test_1.it)('Getting video download link', async (t) => {
        if (!data)
            return t.skip('Test skipped -- error in getting metadata!');
        const keys = Object.keys(data.video);
        videoUrl = await data.video[keys[1]].download();
    });
    (0, node_test_1.it)('Download video', async (t) => {
        if (!videoUrl)
            return t.skip('Test skipped -- error getting the video download link!');
        const res = await (0, got_1.default)(videoUrl).buffer();
        node_assert_1.default.ok(res.byteLength > 0);
    });
    let audioUrl;
    (0, node_test_1.it)('Getting audio download link', async (t) => {
        if (!data)
            return t.skip('Test skipped -- error in getting metadata!');
        const keys = Object.keys(data.audio);
        audioUrl = await data.audio[keys[0]].download();
    });
    (0, node_test_1.it)('Download audio', async (t) => {
        if (!audioUrl)
            return t.skip('Test skipped -- error getting the audio download link!');
        const res = await (0, got_1.default)(audioUrl).buffer();
        node_assert_1.default.ok(res.byteLength > 0);
    });
});
