"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../index.js");
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const QUERY = 'Minecraft';
(0, node_test_1.describe)('Youtube Search', async () => {
    const results = await (0, index_js_1.youtubeSearch)(QUERY);
    node_assert_1.default.ok(results.video.length > 0);
    node_assert_1.default.ok(results.channel.length > 0);
});
