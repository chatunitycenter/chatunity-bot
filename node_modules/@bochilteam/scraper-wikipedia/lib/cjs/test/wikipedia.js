"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const index_js_1 = require("../index.js");
(0, node_test_1.it)('Wikipedia', async () => {
    const data = await (0, index_js_1.wikipedia)('Minecraft', 'en');
    node_assert_1.default.ok(data.articles.length > 1);
});
