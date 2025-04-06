"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const index_js_1 = require("../index.js");
(0, node_test_1.describe)('Primbon', () => {
    (0, node_test_1.it)('Arti nama', async () => {
        const data = await (0, index_js_1.artinama)('Windah Basudara');
        node_assert_1.default.ok(data.length > 0);
    });
    (0, node_test_1.it)('Arti mimpi', async () => {
        const data = await (0, index_js_1.artimimpi)('Jalan');
        node_assert_1.default.ok(data.length > 0);
    });
    (0, node_test_1.it)('Nomor hoki', async () => {
        const data = await (0, index_js_1.nomorhoki)(6213353);
        node_assert_1.default.ok(data);
    });
    (0, node_test_1.it)('Zodiac', () => {
        const res = (0, index_js_1.getZodiac)(1, 1);
        node_assert_1.default.strictEqual(res, 'capricorn');
    });
});
