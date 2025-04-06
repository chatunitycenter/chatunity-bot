"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.time2Number = exports.generateHash = exports.parseFileSize = void 0;
const crypto_1 = __importDefault(require("crypto"));
function parseFileSize(size) {
    const sized = parseFloat(size);
    return (isNaN(sized) ? 0 : sized) * (/GB/i.test(size)
        ? 1000000
        : /MB/i.test(size)
            ? 1000
            : /KB/i.test(size)
                ? 1
                : /bytes?/i.test(size)
                    ? 0.001
                    : /B/i.test(size)
                        ? 0.1
                        : 0);
}
exports.parseFileSize = parseFileSize;
const SUFFIX = 'f24c8c73d48b7686ed11a3bf97983f6f7eb6395f19268184aae742e93683c00c';
function generateHash(url) {
    const hash = crypto_1.default.createHash('sha256');
    const data = url + Date.now() + SUFFIX;
    hash.update(data);
    return hash.digest('hex');
}
exports.generateHash = generateHash;
function time2Number(time) {
    let [hours, minutes, seconds] = time.split(':').map(Number);
    if (!seconds) { // '00:07'
        [minutes, seconds] = [hours, minutes];
        hours = 0;
    }
    return hours * 3600
        + minutes * 60
        + seconds * 1;
}
exports.time2Number = time2Number;
