"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lyricsv2 = exports.lyrics = void 0;
var lyrics_v1_js_1 = require("./src/lyrics-v1.js");
Object.defineProperty(exports, "lyrics", { enumerable: true, get: function () { return __importDefault(lyrics_v1_js_1).default; } });
var lyrics_v2_js_1 = require("./src/lyrics-v2.js");
Object.defineProperty(exports, "lyricsv2", { enumerable: true, get: function () { return __importDefault(lyrics_v2_js_1).default; } });
