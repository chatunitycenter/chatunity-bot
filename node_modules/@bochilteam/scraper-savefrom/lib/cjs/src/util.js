"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateHash = void 0;
const crypto_1 = __importDefault(require("crypto"));
const hashed = "b7944d7a59c9cb654228624880e7de59a53842c2d912b449fdf11febcf81cb21";
function generateHash(url) {
    const data = url + Date.now() + hashed;
    const hash = crypto_1.default.createHash('sha256');
    hash.update(data);
    return hash.digest('hex');
}
exports.generateHash = generateHash;
