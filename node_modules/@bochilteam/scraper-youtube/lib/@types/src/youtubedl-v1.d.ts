import { YoutubeDownloaderArgs } from '../types/index.js';
export default function youtubedl(url: string, server?: YoutubeDownloaderArgs['1']): Promise<{
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
export declare function convert(vid: string, k: string): Promise<string>;
//# sourceMappingURL=youtubedl-v1.d.ts.map