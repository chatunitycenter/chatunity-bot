"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const index_js_1 = require("../index.js");
const node_assert_1 = __importDefault(require("node:assert"));
(0, node_test_1.it)('KodePos', async () => {
    const result = await (0, index_js_1.kodepos)('Samboja');
    node_assert_1.default.ok(result.length > 1);
});
