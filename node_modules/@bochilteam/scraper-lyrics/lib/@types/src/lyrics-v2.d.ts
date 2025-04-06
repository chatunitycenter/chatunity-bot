/**
 * Scrape from https://genius.com
 */
export default function lyricsv2(query: string): Promise<{
    id: number;
    title: string;
    url: string;
    artist: string;
    album: string;
    albumCover: string;
    release: string;
    lyrics: {
        type: "header" | "lyric";
        text: string;
        url?: string | undefined;
    }[];
    spotify?: string | undefined;
    youtube?: string | undefined;
    soundcloud?: string | undefined;
    appleMusicPlayer?: string | undefined;
}>;
//# sourceMappingURL=lyrics-v2.d.ts.map