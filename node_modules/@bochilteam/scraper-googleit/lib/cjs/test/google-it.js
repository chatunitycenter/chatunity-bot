"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const index_js_1 = require("../index.js");
const QUERY = 'Minecraft';
(0, node_test_1.it)('Google It', async () => {
    const result = await (0, index_js_1.googleit)(QUERY);
    node_assert_1.default.ok(result.articles.length > 1);
});
