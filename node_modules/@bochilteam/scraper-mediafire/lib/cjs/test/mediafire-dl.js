"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const got_1 = __importDefault(require("got"));
const index_js_1 = require("../index.js");
const MEDIAFIRE_URL = 'https://www.mediafire.com/file/laehkb9142vkuh3/MediaFire_-_Getting_Started.pdf/file';
(0, node_test_1.describe)('Mediafire Downloader', async (t) => {
    let metadata;
    (0, node_test_1.it)('Getting Metadata', async () => {
        metadata = await (0, index_js_1.mediafiredl)(MEDIAFIRE_URL);
        node_assert_1.default.strictEqual(metadata.filename, 'MediaFire - Getting Started.pdf');
        node_assert_1.default.strictEqual(metadata.filetype, 'PDF');
        node_assert_1.default.strictEqual(metadata.filesizeH, '372.37KB');
        node_assert_1.default.strictEqual(metadata.aploud, '2017-01-07 12:16:54');
    });
    (0, node_test_1.it)('Download Content', async (t) => {
        if (!metadata)
            return t.skip('Test skipped -- error in getting metadata!');
        const buffer = await (0, got_1.default)(metadata.url).buffer();
        node_assert_1.default.ok(buffer.byteLength >= metadata.filesize);
    });
});
