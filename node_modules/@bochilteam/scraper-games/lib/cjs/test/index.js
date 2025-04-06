"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const index_js_1 = require("../index.js");
const index_js_2 = require("../types/index.js");
(0, node_test_1.describe)('Games', () => {
    (0, node_test_1.describe)('Asah Otak', () => {
        (0, node_test_1.it)('Asah Otak', async () => {
            const data = await (0, index_js_1.asahotak)();
            node_assert_1.default.ok(data);
        });
        (0, node_test_1.it)('Asah Otak JSON', () => {
            node_assert_1.default.ok(index_js_1.asahotakjson.length > 1);
            index_js_1.asahotakjson.map((value) => {
                const parsed = index_js_2.AsahOtakSchema.safeParse(value);
                node_assert_1.default.ok(parsed.success);
            });
        });
    });
    (0, node_test_1.describe)('Caklontong', () => {
        (0, node_test_1.it)('Caklontong', async () => {
            const data = await (0, index_js_1.caklontong)();
            node_assert_1.default.ok(data);
        });
        (0, node_test_1.it)('Caklontong JSON', () => {
            node_assert_1.default.ok(index_js_1.caklontongjson.length > 1);
            index_js_1.caklontongjson.map((value) => {
                const parsed = index_js_2.CakLontongSchema.safeParse(value);
                node_assert_1.default.ok(parsed.success);
            });
        });
    });
    (0, node_test_1.describe)('Family100', () => {
        (0, node_test_1.it)('Family100', async () => {
            const data = await (0, index_js_1.family100)();
            node_assert_1.default.ok(data);
        });
        (0, node_test_1.it)('Family100 JSON', () => {
            node_assert_1.default.ok(index_js_1.family100json.length > 1);
            index_js_1.family100json.map((value) => {
                const parsed = index_js_2.Family100Schema.safeParse(value);
                node_assert_1.default.ok(parsed.success);
            });
        });
    });
    (0, node_test_1.describe)('Siapakah Aku', () => {
        (0, node_test_1.it)('Siapakah Aku', async () => {
            const data = await (0, index_js_1.siapakahaku)();
            node_assert_1.default.ok(data);
        });
        (0, node_test_1.it)('Siapakah Aku JSON', () => {
            node_assert_1.default.ok(index_js_1.siapakahakujson.length > 1);
            index_js_1.siapakahakujson.map((value) => {
                const parsed = index_js_2.SiapakahAkuSchema.safeParse(value);
                node_assert_1.default.ok(parsed.success);
            });
        });
    });
    (0, node_test_1.describe)('Susun Kata', () => {
        (0, node_test_1.it)('Susun Kata', async () => {
            const data = await (0, index_js_1.susunkata)();
            node_assert_1.default.ok(data);
        });
        (0, node_test_1.it)('Susun Kata JSON', () => {
            node_assert_1.default.ok(index_js_1.susunkatajson.length > 1);
            index_js_1.susunkatajson.map((value) => {
                const parsed = index_js_2.SusunKataSchema.safeParse(value);
                node_assert_1.default.ok(parsed.success);
            });
        });
    });
    (0, node_test_1.describe)('Tebak Bendera', () => {
        (0, node_test_1.it)('Tebak Bendera', async () => {
            const data = await (0, index_js_1.tebakbendera)();
            node_assert_1.default.ok(data);
        });
        (0, node_test_1.it)('Tebak Bendera JSON', () => {
            node_assert_1.default.ok(index_js_1.tebakbenderajson.length > 1);
            index_js_1.tebakbenderajson.map((value) => {
                const parsed = index_js_2.TebakBenderaSchema.safeParse(value);
                node_assert_1.default.ok(parsed.success);
            });
        });
    });
    (0, node_test_1.describe)('Tebak Gambar', () => {
        (0, node_test_1.it)('Tebak Gambar', async () => {
            const data = await (0, index_js_1.tebakgambar)();
            node_assert_1.default.ok(data);
        });
        (0, node_test_1.it)('Tebak Gambar JSON', () => {
            node_assert_1.default.ok(index_js_1.tebakgambarjson.length > 1);
            index_js_1.tebakgambarjson.map((value) => {
                const parsed = index_js_2.TebakGambarSchema.safeParse(value);
                node_assert_1.default.ok(parsed.success);
            });
        });
    });
    (0, node_test_1.describe)('Tebak Kabupaten', () => {
        (0, node_test_1.it)('Tebak Kabupaten', async () => {
            const data = await (0, index_js_1.tebakkabupaten)();
            node_assert_1.default.ok(data);
        });
        (0, node_test_1.it)('Tebak Kabupaten JSON', () => {
            node_assert_1.default.ok(index_js_1.tebakkabupatenjson.length > 1);
            index_js_1.tebakkabupatenjson.map((value) => {
                const parsed = index_js_2.TebakKabupatenSchema.safeParse(value);
                node_assert_1.default.ok(parsed.success);
            });
        });
    });
    (0, node_test_1.describe)('Tebak Kata', () => {
        (0, node_test_1.it)('Tebak Kata', async () => {
            const data = await (0, index_js_1.tebakkata)();
            node_assert_1.default.ok(data);
        });
        (0, node_test_1.it)('Tebak Kata JSON', () => {
            node_assert_1.default.ok(index_js_1.tebakkatajson.length > 1);
            index_js_1.tebakkatajson.map((value) => {
                const parsed = index_js_2.TebakKataSchema.safeParse(value);
                node_assert_1.default.ok(parsed.success);
            });
        });
    });
    (0, node_test_1.describe)('Tebak Kimia', () => {
        (0, node_test_1.it)('Tebak Kimia', async () => {
            const data = await (0, index_js_1.tebakkimia)();
            node_assert_1.default.ok(data);
        });
        (0, node_test_1.it)('Tebak Kimia JSON', () => {
            node_assert_1.default.ok(index_js_1.tebakkimiajson.length > 1);
            index_js_1.tebakkimiajson.map((value) => {
                const parsed = index_js_2.TebakKimiaSchema.safeParse(value);
                node_assert_1.default.ok(parsed.success);
            });
        });
    });
    (0, node_test_1.describe)('Tebak Lirik', () => {
        (0, node_test_1.it)('Tebak Lirik', async () => {
            const data = await (0, index_js_1.tebaklirik)();
            node_assert_1.default.ok(data);
        });
        (0, node_test_1.it)('Tebak Lirik JSON', () => {
            node_assert_1.default.ok(index_js_1.tebaklirikjson.length > 1);
            index_js_1.tebaklirikjson.map((value) => {
                const parsed = index_js_2.TebakLirikSchema.safeParse(value);
                node_assert_1.default.ok(parsed.success);
            });
        });
    });
    (0, node_test_1.describe)('Tebak-tebakan', () => {
        (0, node_test_1.it)('Tebak-tebakan', async () => {
            const data = await (0, index_js_1.tebaktebakan)();
            node_assert_1.default.ok(data);
        });
        (0, node_test_1.it)('Tebak-tebakan JSON', () => {
            node_assert_1.default.ok(index_js_1.tebaktebakanjson.length > 0);
            index_js_1.tebaktebakanjson.forEach((value) => {
                const parsed = index_js_2.TebakTebakanSchema.safeParse(value);
                node_assert_1.default.ok(parsed.success);
            });
        });
    });
    (0, node_test_1.describe)('Teka-teki', () => {
        (0, node_test_1.it)('Teka-teki', async () => {
            const data = await (0, index_js_1.tekateki)();
            node_assert_1.default.ok(data);
        });
        (0, node_test_1.it)('Teka-teki JSON', () => {
            node_assert_1.default.ok(index_js_1.tekatekijson.length > 0);
            index_js_1.tekatekijson.forEach((value) => {
                const parsed = index_js_2.TekaTekiSchema.safeParse(value);
                node_assert_1.default.ok(parsed.success);
            });
        });
    });
});
