import { z } from 'zod';
export declare const LyricsArgsSchema: z.ZodObject<{
    0: z.ZodString;
}, "strip", z.ZodTypeAny, {
    0: string;
}, {
    0: string;
}>;
export type LyricsArgs = z.infer<typeof LyricsArgsSchema>;
export declare const LyricsMetadataBestMatchSchema: z.ZodObject<{
    id: z.ZodNumber;
    type: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: string;
    id: number;
}, {
    type: string;
    id: number;
}>;
export declare const LyricsMetadataTrackSchema: z.ZodObject<{
    track: z.ZodObject<{
        track_id: z.ZodNumber;
        track_spotify_id: z.ZodString;
        track_share_url: z.ZodString;
        track_name: z.ZodString;
        artist_name: z.ZodString;
        album_name: z.ZodString;
        first_release_date: z.ZodString;
        album_coverart_100x100: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
        album_coverart_350x350: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
        album_coverart_500x500: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
        album_coverart_800x800: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    }, "strip", z.ZodTypeAny, {
        track_id: number;
        track_spotify_id: string;
        track_share_url: string;
        track_name: string;
        artist_name: string;
        album_name: string;
        first_release_date: string;
        album_coverart_100x100?: string | undefined;
        album_coverart_350x350?: string | undefined;
        album_coverart_500x500?: string | undefined;
        album_coverart_800x800?: string | undefined;
    }, {
        track_id: number;
        track_spotify_id: string;
        track_share_url: string;
        track_name: string;
        artist_name: string;
        album_name: string;
        first_release_date: string;
        album_coverart_100x100?: unknown;
        album_coverart_350x350?: unknown;
        album_coverart_500x500?: unknown;
        album_coverart_800x800?: unknown;
    }>;
}, "strip", z.ZodTypeAny, {
    track: {
        track_id: number;
        track_spotify_id: string;
        track_share_url: string;
        track_name: string;
        artist_name: string;
        album_name: string;
        first_release_date: string;
        album_coverart_100x100?: string | undefined;
        album_coverart_350x350?: string | undefined;
        album_coverart_500x500?: string | undefined;
        album_coverart_800x800?: string | undefined;
    };
}, {
    track: {
        track_id: number;
        track_spotify_id: string;
        track_share_url: string;
        track_name: string;
        artist_name: string;
        album_name: string;
        first_release_date: string;
        album_coverart_100x100?: unknown;
        album_coverart_350x350?: unknown;
        album_coverart_500x500?: unknown;
        album_coverart_800x800?: unknown;
    };
}>;
export declare const LyricsMetadataResponseSchema: z.ZodObject<{
    message: z.ZodObject<{
        body: z.ZodObject<{
            macro_result_list: z.ZodObject<{
                best_match: z.ZodObject<{
                    id: z.ZodNumber;
                    type: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    type: string;
                    id: number;
                }, {
                    type: string;
                    id: number;
                }>;
                track_list: z.ZodArray<z.ZodObject<{
                    track: z.ZodObject<{
                        track_id: z.ZodNumber;
                        track_spotify_id: z.ZodString;
                        track_share_url: z.ZodString;
                        track_name: z.ZodString;
                        artist_name: z.ZodString;
                        album_name: z.ZodString;
                        first_release_date: z.ZodString;
                        album_coverart_100x100: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
                        album_coverart_350x350: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
                        album_coverart_500x500: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
                        album_coverart_800x800: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
                    }, "strip", z.ZodTypeAny, {
                        track_id: number;
                        track_spotify_id: string;
                        track_share_url: string;
                        track_name: string;
                        artist_name: string;
                        album_name: string;
                        first_release_date: string;
                        album_coverart_100x100?: string | undefined;
                        album_coverart_350x350?: string | undefined;
                        album_coverart_500x500?: string | undefined;
                        album_coverart_800x800?: string | undefined;
                    }, {
                        track_id: number;
                        track_spotify_id: string;
                        track_share_url: string;
                        track_name: string;
                        artist_name: string;
                        album_name: string;
                        first_release_date: string;
                        album_coverart_100x100?: unknown;
                        album_coverart_350x350?: unknown;
                        album_coverart_500x500?: unknown;
                        album_coverart_800x800?: unknown;
                    }>;
                }, "strip", z.ZodTypeAny, {
                    track: {
                        track_id: number;
                        track_spotify_id: string;
                        track_share_url: string;
                        track_name: string;
                        artist_name: string;
                        album_name: string;
                        first_release_date: string;
                        album_coverart_100x100?: string | undefined;
                        album_coverart_350x350?: string | undefined;
                        album_coverart_500x500?: string | undefined;
                        album_coverart_800x800?: string | undefined;
                    };
                }, {
                    track: {
                        track_id: number;
                        track_spotify_id: string;
                        track_share_url: string;
                        track_name: string;
                        artist_name: string;
                        album_name: string;
                        first_release_date: string;
                        album_coverart_100x100?: unknown;
                        album_coverart_350x350?: unknown;
                        album_coverart_500x500?: unknown;
                        album_coverart_800x800?: unknown;
                    };
                }>, "many">;
            }, "strip", z.ZodTypeAny, {
                best_match: {
                    type: string;
                    id: number;
                };
                track_list: {
                    track: {
                        track_id: number;
                        track_spotify_id: string;
                        track_share_url: string;
                        track_name: string;
                        artist_name: string;
                        album_name: string;
                        first_release_date: string;
                        album_coverart_100x100?: string | undefined;
                        album_coverart_350x350?: string | undefined;
                        album_coverart_500x500?: string | undefined;
                        album_coverart_800x800?: string | undefined;
                    };
                }[];
            }, {
                best_match: {
                    type: string;
                    id: number;
                };
                track_list: {
                    track: {
                        track_id: number;
                        track_spotify_id: string;
                        track_share_url: string;
                        track_name: string;
                        artist_name: string;
                        album_name: string;
                        first_release_date: string;
                        album_coverart_100x100?: unknown;
                        album_coverart_350x350?: unknown;
                        album_coverart_500x500?: unknown;
                        album_coverart_800x800?: unknown;
                    };
                }[];
            }>;
        }, "strip", z.ZodTypeAny, {
            macro_result_list: {
                best_match: {
                    type: string;
                    id: number;
                };
                track_list: {
                    track: {
                        track_id: number;
                        track_spotify_id: string;
                        track_share_url: string;
                        track_name: string;
                        artist_name: string;
                        album_name: string;
                        first_release_date: string;
                        album_coverart_100x100?: string | undefined;
                        album_coverart_350x350?: string | undefined;
                        album_coverart_500x500?: string | undefined;
                        album_coverart_800x800?: string | undefined;
                    };
                }[];
            };
        }, {
            macro_result_list: {
                best_match: {
                    type: string;
                    id: number;
                };
                track_list: {
                    track: {
                        track_id: number;
                        track_spotify_id: string;
                        track_share_url: string;
                        track_name: string;
                        artist_name: string;
                        album_name: string;
                        first_release_date: string;
                        album_coverart_100x100?: unknown;
                        album_coverart_350x350?: unknown;
                        album_coverart_500x500?: unknown;
                        album_coverart_800x800?: unknown;
                    };
                }[];
            };
        }>;
    }, "strip", z.ZodTypeAny, {
        body: {
            macro_result_list: {
                best_match: {
                    type: string;
                    id: number;
                };
                track_list: {
                    track: {
                        track_id: number;
                        track_spotify_id: string;
                        track_share_url: string;
                        track_name: string;
                        artist_name: string;
                        album_name: string;
                        first_release_date: string;
                        album_coverart_100x100?: string | undefined;
                        album_coverart_350x350?: string | undefined;
                        album_coverart_500x500?: string | undefined;
                        album_coverart_800x800?: string | undefined;
                    };
                }[];
            };
        };
    }, {
        body: {
            macro_result_list: {
                best_match: {
                    type: string;
                    id: number;
                };
                track_list: {
                    track: {
                        track_id: number;
                        track_spotify_id: string;
                        track_share_url: string;
                        track_name: string;
                        artist_name: string;
                        album_name: string;
                        first_release_date: string;
                        album_coverart_100x100?: unknown;
                        album_coverart_350x350?: unknown;
                        album_coverart_500x500?: unknown;
                        album_coverart_800x800?: unknown;
                    };
                }[];
            };
        };
    }>;
}, "strip", z.ZodTypeAny, {
    message: {
        body: {
            macro_result_list: {
                best_match: {
                    type: string;
                    id: number;
                };
                track_list: {
                    track: {
                        track_id: number;
                        track_spotify_id: string;
                        track_share_url: string;
                        track_name: string;
                        artist_name: string;
                        album_name: string;
                        first_release_date: string;
                        album_coverart_100x100?: string | undefined;
                        album_coverart_350x350?: string | undefined;
                        album_coverart_500x500?: string | undefined;
                        album_coverart_800x800?: string | undefined;
                    };
                }[];
            };
        };
    };
}, {
    message: {
        body: {
            macro_result_list: {
                best_match: {
                    type: string;
                    id: number;
                };
                track_list: {
                    track: {
                        track_id: number;
                        track_spotify_id: string;
                        track_share_url: string;
                        track_name: string;
                        artist_name: string;
                        album_name: string;
                        first_release_date: string;
                        album_coverart_100x100?: unknown;
                        album_coverart_350x350?: unknown;
                        album_coverart_500x500?: unknown;
                        album_coverart_800x800?: unknown;
                    };
                }[];
            };
        };
    };
}>;
export declare const LyricsSchema: z.ZodObject<{
    id: z.ZodNumber;
    title: z.ZodString;
    url: z.ZodString;
    artist: z.ZodString;
    album: z.ZodString;
    albumCover: z.ZodString;
    release: z.ZodString;
    spotify: z.ZodString;
    lyrics: z.ZodArray<z.ZodObject<{
        type: z.ZodUnion<[z.ZodLiteral<"header">, z.ZodLiteral<"lyric">]>;
        text: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "header" | "lyric";
        text: string;
    }, {
        type: "header" | "lyric";
        text: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
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
}, {
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
export type LyricsMetadataResponse = z.infer<typeof LyricsMetadataResponseSchema>;
export type Lyrics = z.infer<typeof LyricsSchema>;
//# sourceMappingURL=lyrics-v1.d.ts.map