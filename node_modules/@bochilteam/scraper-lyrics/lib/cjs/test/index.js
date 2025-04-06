"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const index_js_1 = require("../index.js");
const QUERY = 'Bohemian Rhapsody';
// const QUERY = 'Risalah Hati Dewa19' 
(0, node_test_1.describe)('Lyrics', () => {
    (0, node_test_1.it)('Lyrics V1', async () => {
        const result = await (0, index_js_1.lyrics)(QUERY);
        node_assert_1.default.strictEqual(result.title, 'Bohemian Rhapsody');
        node_assert_1.default.strictEqual(result.artist, 'Queen');
        node_assert_1.default.strictEqual(result.album, 'Stone Cold Classics');
        node_assert_1.default.ok(result.lyrics.length > 10);
    });
    (0, node_test_1.it)('Lyrics V2', async () => {
        const result = await (0, index_js_1.lyricsv2)(QUERY);
        // assert.strictEqual(result.title, 'Bohemian Rhapsody by Queen')
        node_assert_1.default.strictEqual(result.artist, 'Queen');
        node_assert_1.default.strictEqual(result.album, 'A Night at the Opera');
        node_assert_1.default.ok(result.lyrics.length > 10);
    });
});
