/**
 * Scrape from https://www.musixmatch.com
 */
export default function lyrics(query: string): Promise<{
    id: number;
    title: string;
    url: string;
    artist: string;
    album: string;
    albumCover: string;
    release: string;
    spotify: string;
    lyrics: {
        type: "header" | "lyric";
        text: string;
    }[];
}>;
//# sourceMappingURL=lyrics-v1.d.ts.map