"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const index_js_1 = require("../index.js");
(0, node_test_1.describe)('Others', () => {
    (0, node_test_1.describe)('Jadwal TV', () => {
        (0, node_test_1.it)('Jadwal TV', async () => {
            const result = await (0, index_js_1.jadwalTV)('RCTI');
            node_assert_1.default.ok(result.result.length > 1);
        });
        (0, node_test_1.it)('Jadwal TV NOW', async () => {
            const result = await (0, index_js_1.jadwalTVNow)();
            Object.entries(result).forEach(([key, data]) => {
                node_assert_1.default.ok(data.length > 1);
            });
        });
        (0, node_test_1.it)('List Jadwal TV', async () => {
            const result = await index_js_1.listJadwalTV;
            node_assert_1.default.ok(result.length >= 123);
        });
    });
    (0, node_test_1.it)('KBBI', async () => {
        const data = await (0, index_js_1.kbbi)('halo');
        node_assert_1.default.ok(data);
    });
    (0, node_test_1.it)('ID Free Fire', async () => {
        const data = await (0, index_js_1.nameFreeFire)('821587717');
        node_assert_1.default.ok(data);
    });
    (0, node_test_1.describe)('Bioskop', () => {
        (0, node_test_1.it)('Bioskop now', async () => {
            const result = await (0, index_js_1.bioskopNow)();
            node_assert_1.default.ok(result.length > 1);
        });
        (0, node_test_1.it)('Bioskop', async () => {
            const result = await (0, index_js_1.bioskop)();
            node_assert_1.default.ok(result.length > 1);
        });
    });
    (0, node_test_1.describe)('Chord', function () {
        (0, node_test_1.it)('Chord', async () => {
            const result = await (0, index_js_1.chord)('Until i found you');
            node_assert_1.default.ok(result);
        });
    });
});
