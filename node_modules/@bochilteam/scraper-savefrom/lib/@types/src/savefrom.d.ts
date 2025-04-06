export default function savefrom(url: string): Promise<{
    url: {
        type: string;
        url: string;
        name: string;
        ext: string;
    }[];
    thumb: string;
    meta: {
        title: string;
        source: string;
        duration?: string | undefined;
        tags?: string | undefined;
    };
    sd?: {
        url: string;
        format?: string | undefined;
    } | null | undefined;
    video_quality?: string[] | undefined;
    hosting?: string | undefined;
    hd?: {
        url: string;
        format?: string | undefined;
    } | null | undefined;
}[]>;
//# sourceMappingURL=savefrom.d.ts.map