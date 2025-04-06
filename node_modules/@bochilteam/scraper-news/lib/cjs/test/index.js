"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const index_js_1 = require("../index.js");
(0, node_test_1.describe)('News', () => {
    (0, node_test_1.it)('CNBC Indonesia', async () => {
        const data = await (0, index_js_1.cnbcindonesia)();
        node_assert_1.default.ok(data);
    });
    (0, node_test_1.it)('Antara News', async () => {
        const data = await (0, index_js_1.antaranews)();
        node_assert_1.default.ok(data);
    });
    (0, node_test_1.it)('Kompas', async () => {
        const data = await (0, index_js_1.kompas)();
        node_assert_1.default.ok(data);
    });
    (0, node_test_1.it)('Suara.com', async () => {
        const data = await (0, index_js_1.suaracom)();
        node_assert_1.default.ok(data);
    });
    (0, node_test_1.it)('Liputan6', async () => {
        const data = await (0, index_js_1.liputan6)();
        node_assert_1.default.ok(data);
    });
    (0, node_test_1.it)('Merdeka', async () => {
        const data = await (0, index_js_1.merdeka)();
        node_assert_1.default.ok(data);
    });
});
