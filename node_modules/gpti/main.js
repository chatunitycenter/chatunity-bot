"use strict";
/*
    Author: yandricr
    API: https://nexra.aryahcr.cc/
*/
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageai = exports.blackbox = exports.llama = exports.bing = exports.gpt = exports.nexra = void 0;
var axios_1 = require("axios");
/* types */
var sleep = function (n) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (res) {
                try {
                    setTimeout(function () {
                        return res("OK");
                    }, n);
                }
                catch (error) {
                    return res("OK");
                }
            })];
    });
}); };
var cred = {
    "x-nexra-user": null,
    "x-nexra-secret": null
};
var nexra = function (user, secret) {
    cred["x-nexra-secret"] = secret;
    cred["x-nexra-user"] = user;
};
exports.nexra = nexra;
function consult_(api, data) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (res, rej) { return __awaiter(_this, void 0, void 0, function () {
                    var request, id, response, data_, result, success_, error_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 6, , 7]);
                                return [4 /*yield*/, axios_1.default.post(api, data, {
                                        headers: __assign({ "Content-Type": "application/json" }, cred)
                                    })];
                            case 1:
                                request = _a.sent();
                                if (request.status != 200) {
                                    throw new Error("error");
                                }
                                id = request.data.id;
                                response = null;
                                data_ = true;
                                result = null;
                                success_ = false;
                                _a.label = 2;
                            case 2:
                                if (!data_) return [3 /*break*/, 5];
                                return [4 /*yield*/, sleep(1000)];
                            case 3:
                                _a.sent();
                                return [4 /*yield*/, axios_1.default.get('https://nexra.aryahcr.cc/api/chat/task/' + encodeURIComponent(id))];
                            case 4:
                                response = _a.sent();
                                response = response.data;
                                switch (response.status) {
                                    case "pending":
                                        data_ = true;
                                        break;
                                    case "error":
                                    case "completed":
                                        success_ = true;
                                        result = response;
                                    case "not_found":
                                    default:
                                        result = response;
                                        data_ = false;
                                        break;
                                }
                                return [3 /*break*/, 2];
                            case 5:
                                if (result === undefined || result === null) {
                                    throw new Error("error");
                                }
                                if (success_ === false) {
                                    return [2 /*return*/, rej(result)];
                                }
                                else {
                                    return [2 /*return*/, res(result)];
                                }
                                return [3 /*break*/, 7];
                            case 6:
                                error_1 = _a.sent();
                                try {
                                    if (error_1.response) {
                                        if (typeof error_1.response.data === "object") {
                                            return [2 /*return*/, rej(error_1.response.data)];
                                        }
                                        else {
                                            throw new Error("error");
                                        }
                                    }
                                    else if (error_1.request) {
                                        return [2 /*return*/, rej({
                                                "code": 404,
                                                "error": "NOT_FOUND",
                                                "message": "the service is currently unavailable"
                                            })];
                                    }
                                    else {
                                        return [2 /*return*/, rej({
                                                "code": 500,
                                                "error": "INTERNAL_SERVER_ERROR",
                                                "message": "general (unknown) error"
                                            })];
                                    }
                                }
                                catch (e) {
                                    return [2 /*return*/, rej({
                                            "code": 500,
                                            "error": "INTERNAL_SERVER_ERROR",
                                            "message": "general (unknown) error"
                                        })];
                                }
                                return [3 /*break*/, 7];
                            case 7: return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
}
function consult_img(data) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (res, rej) { return __awaiter(_this, void 0, void 0, function () {
                    var request, id, response, data_, result, success_, error_2;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 6, , 7]);
                                return [4 /*yield*/, axios_1.default.post("https://nexra.aryahcr.cc/api/image/complements", data, {
                                        headers: __assign({ "Content-Type": "application/json" }, cred)
                                    })];
                            case 1:
                                request = _a.sent();
                                if (request.status != 200) {
                                    throw new Error("error");
                                }
                                id = request.data.id;
                                response = null;
                                data_ = true;
                                result = null;
                                success_ = false;
                                _a.label = 2;
                            case 2:
                                if (!data_) return [3 /*break*/, 5];
                                return [4 /*yield*/, sleep(1000)];
                            case 3:
                                _a.sent();
                                return [4 /*yield*/, axios_1.default.get('https://nexra.aryahcr.cc/api/image/complements/' + encodeURIComponent(id))];
                            case 4:
                                response = _a.sent();
                                response = response.data;
                                switch (response.status) {
                                    case "pending":
                                        data_ = true;
                                        break;
                                    case "error":
                                    case "completed":
                                        success_ = true;
                                        result = response;
                                    case "not_found":
                                    default:
                                        result = response;
                                        data_ = false;
                                        break;
                                }
                                return [3 /*break*/, 2];
                            case 5:
                                if (result === undefined || result === null) {
                                    throw new Error("error");
                                }
                                if (success_ === false) {
                                    return [2 /*return*/, rej(result)];
                                }
                                else {
                                    return [2 /*return*/, res(result)];
                                }
                                return [3 /*break*/, 7];
                            case 6:
                                error_2 = _a.sent();
                                try {
                                    if (error_2.response) {
                                        if (typeof error_2.response.data === "object") {
                                            return [2 /*return*/, rej(error_2.response.data)];
                                        }
                                        else {
                                            throw new Error("error");
                                        }
                                    }
                                    else if (error_2.request) {
                                        return [2 /*return*/, rej({
                                                "code": 404,
                                                "error": "NOT_FOUND",
                                                "message": "the service is currently unavailable"
                                            })];
                                    }
                                    else {
                                        return [2 /*return*/, rej({
                                                "code": 500,
                                                "error": "INTERNAL_SERVER_ERROR",
                                                "message": "general (unknown) error"
                                            })];
                                    }
                                }
                                catch (e) {
                                    return [2 /*return*/, rej({
                                            "code": 500,
                                            "error": "INTERNAL_SERVER_ERROR",
                                            "message": "general (unknown) error"
                                        })];
                                }
                                return [3 /*break*/, 7];
                            case 7: return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
}
function consult_strm(api, data, process) {
    return __awaiter(this, void 0, void 0, function () {
        var response, chat_1, error_4, tmp_1, error_3, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1.default.post(api, __assign(__assign({}, data), { "stream": true }), {
                            headers: __assign({ "Content-Type": "application/json" }, cred),
                            responseType: "stream"
                        })];
                case 1:
                    response = _a.sent();
                    if (response.status === 200) {
                        chat_1 = null;
                        error_4 = false;
                        tmp_1 = null;
                        response.data.on("data", function (chunk) {
                            var chk = chunk.toString();
                            chk = chk.split("");
                            chk.forEach(function (data) {
                                var result = null;
                                var convert = "";
                                try {
                                    convert = JSON.parse(data);
                                    result = data;
                                    tmp_1 = null;
                                }
                                catch (e) {
                                    if (tmp_1 === null) {
                                        tmp_1 = data;
                                    }
                                    else {
                                        try {
                                            convert = JSON.parse(tmp_1);
                                            result = tmp_1;
                                            tmp_1 = null;
                                        }
                                        catch (e) {
                                            tmp_1 = tmp_1 + data;
                                            try {
                                                convert = JSON.parse(tmp_1);
                                                result = tmp_1;
                                                tmp_1 = null;
                                            }
                                            catch (e) {
                                                tmp_1 = tmp_1;
                                            }
                                        }
                                    }
                                }
                                if (result != null) {
                                    try {
                                        result = JSON.parse(result);
                                        if (chat_1 === null && result != null) {
                                            chat_1 = "";
                                        }
                                        if (result != undefined && result != null && result.code === undefined && result.status === undefined) {
                                            if (error_4 != true) {
                                                if (result != undefined && result != null && result.finish != undefined && result.finish != null && result.finish === true) {
                                                    chat_1 = result;
                                                }
                                                else {
                                                    chat_1 = result;
                                                    process(null, result);
                                                }
                                            }
                                        }
                                        else {
                                            error_4 = true;
                                            chat_1 = result;
                                        }
                                    }
                                    catch (e) {
                                        // continue
                                    }
                                }
                            });
                        });
                        response.data.on("end", function () {
                            if (chat_1 != null) {
                                if (error_4 != true) {
                                    return process(null, chat_1);
                                }
                                else {
                                    return process(chat_1, null);
                                }
                            }
                            else {
                                return process({
                                    "code": 500,
                                    "status": false,
                                    "error": "INTERNAL_SERVER_ERROR",
                                    "message": "general (unknown) error"
                                }, null);
                            }
                        });
                        response.data.on("error", function (err) {
                        });
                    }
                    else {
                        return [2 /*return*/, process({
                                "code": 500,
                                "status": false,
                                "error": "INTERNAL_SERVER_ERROR",
                                "message": "general (unknown) error"
                            }, null)];
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    try {
                        if (error_3.response) {
                            try {
                                err_1 = null;
                                error_3.response.data.on("data", function (chk) {
                                    if (err_1 != null) {
                                        err_1 += chk.toString();
                                    }
                                    else {
                                        err_1 = chk.toString();
                                    }
                                });
                                error_3.response.data.on("end", function () {
                                    try {
                                        err_1 = JSON.parse(err_1);
                                        return process(err_1, null);
                                    }
                                    catch (error) {
                                        return process({
                                            "code": 500,
                                            "status": false,
                                            "error": "INTERNAL_SERVER_ERROR",
                                            "message": "general (unknown) error"
                                        }, null);
                                    }
                                });
                                error_3.response.data.on("error", function () {
                                });
                            }
                            catch (error) {
                                return [2 /*return*/, process({
                                        "code": 500,
                                        "status": false,
                                        "error": "INTERNAL_SERVER_ERROR",
                                        "message": "general (unknown) error"
                                    }, null)];
                            }
                        }
                        else if (error_3.request) {
                            return [2 /*return*/, process({
                                    "code": 404,
                                    "error": "NOT_FOUND",
                                    "message": "the service is currently unavailable"
                                }, null)];
                        }
                        else {
                            return [2 /*return*/, process({
                                    "code": 500,
                                    "status": false,
                                    "error": "INTERNAL_SERVER_ERROR",
                                    "message": "general (unknown) error"
                                }, null)];
                        }
                    }
                    catch (error) {
                        return [2 /*return*/, process({
                                "code": 500,
                                "status": false,
                                "error": "INTERNAL_SERVER_ERROR",
                                "message": "general (unknown) error"
                            }, null)];
                    }
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
var gpt = /** @class */ (function () {
    function gpt() {
    }
    gpt.v1 = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var _c = _b.prompt, prompt = _c === void 0 ? "" : _c, _d = _b.messages, messages = _d === void 0 ? [] : _d, _e = _b.model, model = _e === void 0 ? "" : _e, _f = _b.markdown, markdown = _f === void 0 ? false : _f;
            return __generator(this, function (_g) {
                return [2 /*return*/, new Promise(function (res, rej) { return __awaiter(_this, void 0, void 0, function () {
                        var response, error_5;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, consult_("https://nexra.aryahcr.cc/api/chat/gpt", {
                                            messages: messages,
                                            prompt: prompt,
                                            model: model,
                                            markdown: markdown
                                        })];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, res(response)];
                                case 2:
                                    error_5 = _a.sent();
                                    if (typeof error_5 === "object") {
                                        return [2 /*return*/, rej(error_5)];
                                    }
                                    else {
                                        return [2 /*return*/, rej({
                                                "code": 500,
                                                "status": false,
                                                "error": "INTERNAL_SERVER_ERROR",
                                                "message": "general (unknown) error"
                                            })];
                                    }
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    gpt.v2 = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var stream_;
            var _this = this;
            var _c = _b.messages, messages = _c === void 0 ? [] : _c, _d = _b.markdown, markdown = _d === void 0 ? false : _d, _e = _b.stream, stream = _e === void 0 ? false : _e, _f = _b.results, results = _f === void 0 ? function () { } : _f;
            return __generator(this, function (_g) {
                stream_ = false;
                try {
                    if (stream === true) {
                        stream_ = true;
                    }
                    else {
                        throw new Error("error");
                    }
                }
                catch (error) {
                    stream_ = false;
                }
                if (stream_ === false) {
                    return [2 /*return*/, new Promise(function (res, rej) { return __awaiter(_this, void 0, void 0, function () {
                            var response, error_6;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, , 3]);
                                        return [4 /*yield*/, consult_("https://nexra.aryahcr.cc/api/chat/complements", {
                                                messages: messages,
                                                markdown: markdown,
                                                stream: false,
                                                model: "chatgpt"
                                            })];
                                    case 1:
                                        response = _a.sent();
                                        return [2 /*return*/, res(response)];
                                    case 2:
                                        error_6 = _a.sent();
                                        if (typeof error_6 === "object") {
                                            return [2 /*return*/, rej(error_6)];
                                        }
                                        else {
                                            return [2 /*return*/, rej({
                                                    "code": 500,
                                                    "status": false,
                                                    "error": "INTERNAL_SERVER_ERROR",
                                                    "message": "general (unknown) error"
                                                })];
                                        }
                                        return [3 /*break*/, 3];
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); })];
                }
                else {
                    consult_strm("https://nexra.aryahcr.cc/api/chat/complements", {
                        messages: messages,
                        markdown: markdown,
                        stream: false,
                        model: "chatgpt"
                    }, function (err, data) {
                        if ((data === null || data === void 0 ? void 0 : data.finish) === true) {
                            return results(err, data);
                        }
                        else {
                            results(err, data);
                        }
                    });
                }
                return [2 /*return*/];
            });
        });
    };
    gpt.v3 = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var stream_;
            var _this = this;
            var _c = _b.messages, messages = _c === void 0 ? [] : _c, _d = _b.markdown, markdown = _d === void 0 ? false : _d, _e = _b.stream, stream = _e === void 0 ? false : _e, _f = _b.results, results = _f === void 0 ? function () { } : _f;
            return __generator(this, function (_g) {
                stream_ = false;
                try {
                    if (stream === true) {
                        stream_ = true;
                    }
                    else {
                        throw new Error("error");
                    }
                }
                catch (error) {
                    stream_ = false;
                }
                if (stream_ === false) {
                    return [2 /*return*/, new Promise(function (res, rej) { return __awaiter(_this, void 0, void 0, function () {
                            var response, error_7;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, , 3]);
                                        return [4 /*yield*/, consult_("https://nexra.aryahcr.cc/api/chat/complements", {
                                                messages: messages,
                                                markdown: markdown,
                                                stream: false,
                                                model: "gpt-4o"
                                            })];
                                    case 1:
                                        response = _a.sent();
                                        return [2 /*return*/, res(response)];
                                    case 2:
                                        error_7 = _a.sent();
                                        if (typeof error_7 === "object") {
                                            return [2 /*return*/, rej(error_7)];
                                        }
                                        else {
                                            return [2 /*return*/, rej({
                                                    "code": 500,
                                                    "status": false,
                                                    "error": "INTERNAL_SERVER_ERROR",
                                                    "message": "general (unknown) error"
                                                })];
                                        }
                                        return [3 /*break*/, 3];
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); })];
                }
                else {
                    consult_strm("https://nexra.aryahcr.cc/api/chat/complements", {
                        messages: messages,
                        markdown: markdown,
                        model: "gpt-4o"
                    }, function (err, data) {
                        if ((data === null || data === void 0 ? void 0 : data.finish) === true) {
                            return results(err, data);
                        }
                        else {
                            results(err, data);
                        }
                    });
                }
                return [2 /*return*/];
            });
        });
    };
    gpt.web = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var _c = _b.prompt, prompt = _c === void 0 ? "" : _c, _d = _b.markdown, markdown = _d === void 0 ? false : _d;
            return __generator(this, function (_e) {
                return [2 /*return*/, new Promise(function (res, rej) { return __awaiter(_this, void 0, void 0, function () {
                        var response, error_8;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, consult_("https://nexra.aryahcr.cc/api/chat/gptweb", {
                                            prompt: prompt,
                                            markdown: markdown
                                        })];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, res(response)];
                                case 2:
                                    error_8 = _a.sent();
                                    if (typeof error_8 === "object") {
                                        return [2 /*return*/, rej(error_8)];
                                    }
                                    else {
                                        return [2 /*return*/, rej({
                                                "code": 500,
                                                "status": false,
                                                "error": "INTERNAL_SERVER_ERROR",
                                                "message": "general (unknown) error"
                                            })];
                                    }
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    return gpt;
}());
exports.gpt = gpt;
var bing = function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var stream_;
    var _c = _b.messages, messages = _c === void 0 ? [] : _c, _d = _b.markdown, markdown = _d === void 0 ? false : _d, _e = _b.stream, stream = _e === void 0 ? false : _e, _f = _b.conversation_style, conversation_style = _f === void 0 ? "Balanced" : _f, _g = _b.results, results = _g === void 0 ? function () { } : _g;
    return __generator(this, function (_h) {
        stream_ = false;
        try {
            if (stream === true) {
                stream_ = true;
            }
            else {
                throw new Error("error");
            }
        }
        catch (error) {
            stream_ = false;
        }
        if (stream_ === false) {
            return [2 /*return*/, new Promise(function (res, rej) { return __awaiter(void 0, void 0, void 0, function () {
                    var response, error_9;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, consult_("https://nexra.aryahcr.cc/api/chat/complements", {
                                        messages: messages,
                                        markdown: markdown,
                                        stream: false,
                                        conversation_style: conversation_style,
                                        model: "Bing"
                                    })];
                            case 1:
                                response = _a.sent();
                                return [2 /*return*/, res(response)];
                            case 2:
                                error_9 = _a.sent();
                                if (typeof error_9 === "object") {
                                    return [2 /*return*/, rej(error_9)];
                                }
                                else {
                                    return [2 /*return*/, rej({
                                            "code": 500,
                                            "status": false,
                                            "error": "INTERNAL_SERVER_ERROR",
                                            "message": "general (unknown) error"
                                        })];
                                }
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); })];
        }
        else {
            consult_strm("https://nexra.aryahcr.cc/api/chat/complements", {
                messages: messages,
                markdown: markdown,
                conversation_style: conversation_style,
                model: "Bing"
            }, function (err, data) {
                if ((data === null || data === void 0 ? void 0 : data.finish) === true) {
                    return results(err, data);
                }
                else {
                    results(err, data);
                }
            });
        }
        return [2 /*return*/];
    });
}); };
exports.bing = bing;
var llama = function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var stream_;
    var _c = _b.messages, messages = _c === void 0 ? [] : _c, _d = _b.markdown, markdown = _d === void 0 ? false : _d, _e = _b.stream, stream = _e === void 0 ? false : _e, _f = _b.results, results = _f === void 0 ? function () { } : _f;
    return __generator(this, function (_g) {
        stream_ = false;
        try {
            if (stream === true) {
                stream_ = true;
            }
            else {
                throw new Error("error");
            }
        }
        catch (error) {
            stream_ = false;
        }
        if (stream_ === false) {
            return [2 /*return*/, new Promise(function (res, rej) { return __awaiter(void 0, void 0, void 0, function () {
                    var response, error_10;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, consult_("https://nexra.aryahcr.cc/api/chat/complements", {
                                        messages: messages,
                                        markdown: markdown,
                                        stream: false,
                                        model: "llama-3.1"
                                    })];
                            case 1:
                                response = _a.sent();
                                return [2 /*return*/, res(response)];
                            case 2:
                                error_10 = _a.sent();
                                if (typeof error_10 === "object") {
                                    return [2 /*return*/, rej(error_10)];
                                }
                                else {
                                    return [2 /*return*/, rej({
                                            "code": 500,
                                            "status": false,
                                            "error": "INTERNAL_SERVER_ERROR",
                                            "message": "general (unknown) error"
                                        })];
                                }
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); })];
        }
        else {
            consult_strm("https://nexra.aryahcr.cc/api/chat/complements", {
                messages: messages,
                markdown: markdown,
                model: "llama-3.1"
            }, function (err, data) {
                if ((data === null || data === void 0 ? void 0 : data.finish) === true) {
                    return results(err, data);
                }
                else {
                    results(err, data);
                }
            });
        }
        return [2 /*return*/];
    });
}); };
exports.llama = llama;
var blackbox = function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var stream_;
    var _c = _b.messages, messages = _c === void 0 ? [] : _c, _d = _b.markdown, markdown = _d === void 0 ? false : _d, _e = _b.stream, stream = _e === void 0 ? false : _e, _f = _b.results, results = _f === void 0 ? function () { } : _f;
    return __generator(this, function (_g) {
        stream_ = false;
        try {
            if (stream === true) {
                stream_ = true;
            }
            else {
                throw new Error("error");
            }
        }
        catch (error) {
            stream_ = false;
        }
        if (stream_ === false) {
            return [2 /*return*/, new Promise(function (res, rej) { return __awaiter(void 0, void 0, void 0, function () {
                    var response, error_11;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, consult_("https://nexra.aryahcr.cc/api/chat/complements", {
                                        messages: messages,
                                        markdown: markdown,
                                        stream: false,
                                        model: "blackbox"
                                    })];
                            case 1:
                                response = _a.sent();
                                return [2 /*return*/, res(response)];
                            case 2:
                                error_11 = _a.sent();
                                if (typeof error_11 === "object") {
                                    return [2 /*return*/, rej(error_11)];
                                }
                                else {
                                    return [2 /*return*/, rej({
                                            "code": 500,
                                            "status": false,
                                            "error": "INTERNAL_SERVER_ERROR",
                                            "message": "general (unknown) error"
                                        })];
                                }
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); })];
        }
        else {
            consult_strm("https://nexra.aryahcr.cc/api/chat/complements", {
                messages: messages,
                markdown: markdown,
                model: "blackbox"
            }, function (err, data) {
                if ((data === null || data === void 0 ? void 0 : data.finish) === true) {
                    return results(err, data);
                }
                else {
                    results(err, data);
                }
            });
        }
        return [2 /*return*/];
    });
}); };
exports.blackbox = blackbox;
var imageai = function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var _c = _b.prompt, prompt = _c === void 0 ? "" : _c, _d = _b.model, model = _d === void 0 ? "" : _d, _e = _b.response, response = _e === void 0 ? "url" : _e, Object = _b.data;
    return __generator(this, function (_f) {
        return [2 /*return*/, new Promise(function (res, rej) { return __awaiter(void 0, void 0, void 0, function () {
                var response_, error_12;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, consult_img({
                                    prompt: prompt,
                                    model: model,
                                    response: response
                                })];
                        case 1:
                            response_ = _a.sent();
                            return [2 /*return*/, res(response_)];
                        case 2:
                            error_12 = _a.sent();
                            if (typeof error_12 === "object") {
                                return [2 /*return*/, rej(error_12)];
                            }
                            else {
                                return [2 /*return*/, rej({
                                        "code": 500,
                                        "status": false,
                                        "error": "INTERNAL_SERVER_ERROR",
                                        "message": "general (unknown) error"
                                    })];
                            }
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); })];
    });
}); };
exports.imageai = imageai;
exports.default = {
    nexra: nexra,
    gpt: gpt,
    bing: bing,
    llama: llama,
    blackbox: blackbox,
    imageai: imageai
};
