"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const index_js_1 = require("../index.js");
const TIKTOK_URL = 'https://www.tiktok.com/@omagadsus/video/7025456384175017243?is_from_webapp=1&sender_device=pc&web_id6982004129280116226';
const FB_URL = 'https://fb.watch/9WktuN9j-z/';
// const IG_URL = 'https://instagram.com/stories/officialpersebaya/2787913152184277704?utm_source=ig_story_item_share&utm_medium=share_sheet'
const IG_URL = 'https://www.instagram.com/p/C9W-HXGJr0E/?igsh=MW52dXY0dndpMGh0eg==';
(0, node_test_1.describe)('SnapSave', async () => {
    (0, node_test_1.it)('Tiktok Downloader', async () => {
        const result = await (0, index_js_1.snapsave)(TIKTOK_URL);
    });
    (0, node_test_1.it)('Facebook Downloader', async () => {
        const result = await (0, index_js_1.snapsave)(FB_URL);
    });
    (0, node_test_1.it)('Instagram Downloader', async () => {
        const result = await (0, index_js_1.snapsave)(IG_URL);
    });
});
