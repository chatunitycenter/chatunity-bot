import got from 'got';
import vm from 'vm';
import { DEFAULT_HEADERS } from './constant.js';
import { generateHash } from './util.js';
import { SavefromArgsSchema, SavefromSchema } from '../types/savefrom.js';
export default async function savefrom(url) {
    var _a, _b;
    SavefromArgsSchema.parse(arguments);
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
        _s: generateHash(url),
        _x: 1
    };
    const data = await got.post('https://worker.savefrom.net/savefrom.php', {
        headers: {
            ...DEFAULT_HEADERS,
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
    vm.createContext(context);
    new vm.Script(`decodeURIComponent=_decodeURIComponent;${data}`).runInContext(context);
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
    return SavefromSchema.parse(json);
}
