"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const index_js_1 = require("../index.js");
(0, node_test_1.describe)('Religions', () => {
    (0, node_test_1.describe)('Asmaul Husna', () => {
        (0, node_test_1.it)('AsmaulHusna', async () => {
            const data = await (0, index_js_1.asmaulhusna)(6);
            node_assert_1.default.strictEqual(data.latin, 'Al Muhaimin');
            node_assert_1.default.strictEqual(data.arabic, 'الْمُهَيْمِنُ');
            node_assert_1.default.strictEqual(data.translation_id, 'Yang Memiliki Mutlak sifat Pemelihara');
            node_assert_1.default.strictEqual(data.translation_en, 'The Guardian, the Preserver');
        });
        (0, node_test_1.it)('AsmaulHusna JSON', () => {
            const data = index_js_1.asmaulhusnajson;
            node_assert_1.default.ok(data.length === 99);
        });
    });
    (0, node_test_1.describe)('Al quran', () => {
        (0, node_test_1.it)('Alquran', async () => {
            const data = await (0, index_js_1.alquran)();
            node_assert_1.default.ok(data.length === 114);
        });
    });
    (0, node_test_1.describe)('Jadwal Sholat', () => {
        (0, node_test_1.it)('jadwalSholat', async () => {
            const data = await (0, index_js_1.jadwalsholat)('Semarang');
            node_assert_1.default.strictEqual(data.location, '6°58\' LS 110°29\' BT');
            node_assert_1.default.strictEqual(data.direction, '294.48 °');
            node_assert_1.default.strictEqual(data.distance, '8323.049 km');
            node_assert_1.default.ok(data.schedules.length > 27);
        });
        (0, node_test_1.it)('List jadwal sholat', async () => {
            const data = await index_js_1.listJadwalSholat;
            node_assert_1.default.ok(data.length >= 316);
        });
    });
});
