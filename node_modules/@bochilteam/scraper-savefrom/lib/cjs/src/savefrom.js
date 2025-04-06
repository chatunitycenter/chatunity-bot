"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const got_1 = __importDefault(require("got"));
const vm_1 = __importDefault(require("vm"));
const constant_js_1 = require("./constant.js");
const util_js_1 = require("./util.js");
const savefrom_js_1 = require("../types/savefrom.js");
async function savefrom(url) {
    var _a, _b;
    savefrom_js_1.SavefromArgsSchema.parse(arguments);
    const form = {
        sf_url: url,
        sf_submit: '',
        new: '2',
        lang: 'en',
        app: '',
        country: 'en',
        os: 'Windows',
        browser: 'Chrome',
        channel: 'main',
        'sf-nomad': '1',
        url,
        ts: Date.now(),
        _ts: 1720433117117,
        _tsc: 0,
        _s: (0, util_js_1.generateHash)(url),
        _x: 1
    };
    const data = await got_1.default.post('https://worker.savefrom.net/savefrom.php', {
        headers: {
            ...constant_js_1.DEFAULT_HEADERS,
            'content-type': 'application/x-www-form-urlencoded',
            origin: 'https://en.savefrom.net',
            referer: 'https://en.savefrom.net/'
        },
        form
    }).text();
    const context = {
        results: null,
        parent: {
            document: {
                location: {}
            }
        },
        frameElement: {},
        atob: (base64) => Buffer.from(base64, 'base64').toString(),
        _decodeURIComponent: (uri) => {
            const decoded = decodeURIComponent(uri);
            if (/showResult/.test(decoded)) {
                context.results = decoded;
                return "true";
            }
            return decoded;
        }
    };
    vm_1.default.createContext(context);
    new vm_1.default.Script(`decodeURIComponent=_decodeURIComponent;${data}`).runInContext(context);
    const executed = ((_a = context.results.split('window.parent.sf.videoResult.show(')) === null || _a === void 0 ? void 0 : _a[1])
        || ((_b = context.results.split('window.parent.sf.videoResult.showRows(')) === null || _b === void 0 ? void 0 : _b[1]);
    if (!executed) {
        // console.error(executed, data)
        throw new Error('Cannot find result from evaluation!');
    }
    let json = null;
    try {
        if (context.results.includes('showRows')) {
            const splits = executed.split('],"');
            const lastIndex = splits.findIndex(v => v.includes('window.parent.sf.enableElement'));
            json = JSON.parse(splits.slice(0, lastIndex).join('],"') + ']');
        }
        else {
            json = [JSON.parse(executed.split(');')[0])];
        }
    }
    catch (e) {
        // console.error(e, executed)
        throw new Error('Cannot parse json results data from evaluation!');
    }
    return savefrom_js_1.SavefromSchema.parse(json);
}
exports.default = savefrom;
