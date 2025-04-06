"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const got_1 = __importDefault(require("got"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const index_js_1 = require("../index.js");
const SFILEMOBI_URL = 'https://sfile.mobi/3PxKBxHAasM';
(0, node_test_1.describe)('Sfilemmobi Downloader', async (t) => {
    let metadata;
    (0, node_test_1.it)('Getting Metadata', async () => {
        metadata = await (0, index_js_1.sfilemobi)(SFILEMOBI_URL);
    });
    (0, node_test_1.it)('Download Content', async (t) => {
        if (!metadata)
            return t.skip('Test skipped -- error in getting metadata!');
        const buffer = await (0, got_1.default)(metadata.url).buffer();
        node_assert_1.default.ok(buffer.byteLength > 0);
    });
});
