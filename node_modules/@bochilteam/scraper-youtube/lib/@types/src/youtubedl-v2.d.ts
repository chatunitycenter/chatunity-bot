import { YoutubeDownloaderArgs } from '../types/index.js';
export default function youtubedlv2(url: string, server?: YoutubeDownloaderArgs['1']): Promise<{
    other: Record<string, {
        type: string;
        quality: string;
        fileSizeH: string;
        fileSize: number;
        download: () => Promise<string>;
    }>;
    title: string;
    id: string;
    thumbnail: string;
    duration: number;
    video: Record<string, {
        type: string;
        quality: string;
        fileSizeH: string;
        fileSize: number;
        download: () => Promise<string>;
    }>;
    audio: Record<string, {
        type: string;
        quality: string;
        fileSizeH: string;
        fileSize: number;
        download: () => Promise<string>;
    }>;
}>;
export declare function convert(serverUrl: string, v_id: string, ftype: string, fquality: string, token: string, timeExpire: string): Promise<void>;
//# sourceMappingURL=youtubedl-v2.d.ts.map