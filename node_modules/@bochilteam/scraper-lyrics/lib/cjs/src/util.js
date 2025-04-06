"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeDate = exports.generateMusixmatchHash = void 0;
const crypto_1 = require("crypto");
const SECRET = '96dea4bfb6afcbcc28c7f6080afe7435';
function generateMusixmatchHash(url) {
    const d = new Date();
    const year = d.getUTCFullYear().toString();
    const month = serializeDate(d.getUTCMonth() + 1);
    const date = serializeDate(d.getUTCDate());
    const hmac = (0, crypto_1.createHmac)('sha256', SECRET);
    hmac.update(url + year + month + date);
    return hmac.digest('base64');
}
exports.generateMusixmatchHash = generateMusixmatchHash;
function serializeDate(d) {
    const repetition = 2;
    return ("0".repeat(repetition) + d).slice(-repetition);
}
exports.serializeDate = serializeDate;
