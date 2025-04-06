export default function tiktokdl(url: string): Promise<{
    nickname: string;
    username: string;
    avatar: string;
    description: string;
    thumbnail: string;
    played: string;
    commented: string;
    saved: string;
    shared: string;
    song: string;
    video: {
        noWatermark: string;
        withWatermark: string;
    };
    audio: string;
}>;
//# sourceMappingURL=tiktok-v1.d.ts.map