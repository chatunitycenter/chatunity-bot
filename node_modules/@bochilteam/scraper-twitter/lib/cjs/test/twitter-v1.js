"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const index_js_1 = require("../index.js");
const TWITTER_URL = 'https://twitter.com/jen_degen/status/1458167531869458440?s=20';
(0, node_test_1.describe)('Twitter Downloader', async () => {
    (0, node_test_1.it)('Getting Metadata', async () => {
        const result = await (0, index_js_1.twitter)(TWITTER_URL);
    });
});
