export default function facebookdl(url: string): Promise<{
    thumbnail: string;
    video: {
        quality: string;
        download: () => Promise<string>;
    }[];
    audio: {
        quality: string;
        download: () => Promise<string>;
    }[];
    duration?: string | undefined;
}>;
export declare function convert(url: string, v_id: string, ftype: string, videoUrl: string, videoType: string, videoCodec: string, audioUrl: string, audioType: string, fquality: string, fname: string, exp: string, token: string): Promise<void>;
//# sourceMappingURL=facebook-v1.d.ts.map