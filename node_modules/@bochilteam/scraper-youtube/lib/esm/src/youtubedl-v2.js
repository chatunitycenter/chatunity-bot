import got from 'got';
import { sizeFormatter } from 'human-readable';
import { YoutubeDownloaderArgsSchema, YoutubedlSchema, } from '../types/index.js';
import { DEFAULT_HEADERS } from './constant.js';
import { generateHash, time2Number } from './util.js';
import { YoutubedlV2ResponseSchema as YoutubedlResponseSchema } from '../types/youtubedl-v2.js';
const toFormat = sizeFormatter({
    std: 'JEDEC', // 'SI' (default) | 'IEC' | 'JEDEC'
    decimalPlaces: 2,
    keepTrailingZeroes: false,
    render: (literal, symbol) => `${literal} ${symbol}B`
});
export default async function youtubedlv2(url, server) {
    YoutubeDownloaderArgsSchema.parse(arguments);
    const form = {
        ts: Date.now(),
        url,
        _s: generateHash(url),
        _ts: 1720429578286,
        _tsc: 0
    };
    const data = await got.post('https://api.ssyoutube.com/api/convert', {
        headers: {
            ...DEFAULT_HEADERS,
            'origin': 'https://ssyoutube.com'
        },
        json: form
    }).json();
    const json = YoutubedlResponseSchema.parse(data);
    const video = {};
    const audio = {};
    const other = {};
    for (const item of json.url) {
        const type = item.ext; // 'mp4' 'mp3' 'webm'
        const quality = item.quality;
        const fileSize = item.filesize || item.contentLength || 0;
        const fileSizeH = toFormat(fileSize);
        (type === 'mp4' ? video : ['mp3', 'opus'].includes(type) ? audio : other)[quality.toLowerCase()] = {
            quality,
            type,
            fileSizeH,
            fileSize,
            download: async () => url
        };
    }
    const duration = time2Number(json.meta.duration);
    const res = {
        id: json.id,
        title: json.meta.title,
        thumbnail: `https://i.ytimg.com/vi/${json.id}/0.jpg`,
        duration,
        video,
        audio,
        other
    };
    return YoutubedlSchema.parse(res);
}
export async function convert(serverUrl, v_id, ftype, fquality, token, timeExpire) {
}
