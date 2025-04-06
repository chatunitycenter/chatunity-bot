"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const index_js_1 = require("../index.js");
(0, node_test_1.describe)('Texts', () => {
    (0, node_test_1.describe)('Aksara Jawa', () => {
        (0, node_test_1.it)('Latin to Aksara', () => {
            const result = (0, index_js_1.latinToAksara)('hallo rek');
            node_assert_1.default.strictEqual(result, 'ꦲꦭ꧀ꦭꦺꦴ​ꦫꦺꦏ꧀');
        });
        (0, node_test_1.it)('Aksara to Latin', () => {
            const result = (0, index_js_1.aksaraToLatin)('ꦲꦭ꧀ꦭꦺꦴ​ꦫꦺꦏ꧀', { HVokal: false });
            node_assert_1.default.strictEqual(result, 'hal​lo rek​');
        });
    });
    (0, node_test_1.describe)('Bucin', () => {
        (0, node_test_1.it)('Bucin', async () => {
            const result = await (0, index_js_1.bucin)();
            node_assert_1.default.ok(result);
        });
        (0, node_test_1.it)('Bucin JSON', () => {
            const result = index_js_1.bucinjson;
            node_assert_1.default.ok(Array.isArray(result));
            node_assert_1.default.ok(result.length >= 365);
        });
    });
    (0, node_test_1.describe)('Dare', () => {
        (0, node_test_1.it)('Dare', async () => {
            const result = await (0, index_js_1.dare)();
            node_assert_1.default.ok(result);
        });
        (0, node_test_1.it)('Dare JSON', () => {
            const result = index_js_1.darejson;
            node_assert_1.default.ok(Array.isArray(result));
            node_assert_1.default.ok(result.length >= 63);
        });
    });
    (0, node_test_1.describe)('Truth', () => {
        (0, node_test_1.it)('Truth', async () => {
            const result = await (0, index_js_1.truth)();
            node_assert_1.default.ok(result);
        });
        (0, node_test_1.it)('Truth JSON', () => {
            const result = index_js_1.truthjson;
            node_assert_1.default.ok(Array.isArray(result));
            node_assert_1.default.ok(result.length >= 61);
        });
    });
    (0, node_test_1.describe)('TextPro', () => {
        (0, node_test_1.it)('TextPro', async () => {
            const result = await (0, index_js_1.textpro)('neon', ['Hallo']);
            node_assert_1.default.ok(result);
        });
        (0, node_test_1.it)('TextPro List', async () => {
            const result = await index_js_1.textproList;
            node_assert_1.default.ok(Array.isArray(result));
            node_assert_1.default.ok(result.length > 1);
        });
    });
});
