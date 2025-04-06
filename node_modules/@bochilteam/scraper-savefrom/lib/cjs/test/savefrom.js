"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../index.js");
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const YT_URL = 'https://youtu.be/iik25wqIuFo';
const IG_URL = 'https://www.instagram.com/p/CaHpoweBjmx';
const TIKTOK_URL = 'https://www.tiktok.com/@omagadsus/video/7025456384175017243';
const FB_URL = 'https://fb.watch/9WktuN9j-z/';
// X_URL ?
const TWITTER_URL = 'https://twitter.com/jen_degen/status/1458167531869458440';
(0, node_test_1.describe)('Savefrom', async (t) => {
    (0, node_test_1.it)('Download Youtube', async () => {
        const data = await (0, index_js_1.savefrom)(YT_URL);
        node_assert_1.default.ok(data.length > 0);
    });
    // await t.test('Download Instagram', async () => {
    //     const data = await savefrom(IG_URL)
    //     assert.strictEqual(data.length > 0, true)
    // })
    // await t.test('Download Tiktok', async () => {
    //     const data = await savefrom(TIKTOK_URL)
    //     assert.strictEqual(data.length > 0, true)
    // })
    // await t.test('Download Facebook', async () => {
    //     const data = await savefrom(FB_URL)
    //     assert.strictEqual(data.length > 0, true)
    // })
    // await t.test('Download Twitter (X)', async () => {
    //     const data = await savefrom(TWITTER_URL)
    //     assert.strictEqual(data.length > 0, true)
    // })
});
