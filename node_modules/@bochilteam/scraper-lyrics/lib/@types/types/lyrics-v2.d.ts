import { z } from 'zod';
export declare const LyricsV2SearchSectionSchema: z.ZodObject<{
    hits: z.ZodArray<z.ZodObject<{
        type: z.ZodString;
        result: z.ZodObject<{
            api_path: z.ZodString;
            url: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            url: string;
            api_path: string;
        }, {
            url: string;
            api_path: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        type: string;
        result: {
            url: string;
            api_path: string;
        };
    }, {
        type: string;
        result: {
            url: string;
            api_path: string;
        };
    }>, "many">;
    type: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: string;
    hits: {
        type: string;
        result: {
            url: string;
            api_path: string;
        };
    }[];
}, {
    type: string;
    hits: {
        type: string;
        result: {
            url: string;
            api_path: string;
        };
    }[];
}>;
export declare const LyricsV2SearchResponseSchema: z.ZodObject<{
    response: z.ZodObject<{
        sections: z.ZodArray<z.ZodObject<{
            hits: z.ZodArray<z.ZodObject<{
                type: z.ZodString;
                result: z.ZodObject<{
                    api_path: z.ZodString;
                    url: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    url: string;
                    api_path: string;
                }, {
                    url: string;
                    api_path: string;
                }>;
            }, "strip", z.ZodTypeAny, {
                type: string;
                result: {
                    url: string;
                    api_path: string;
                };
            }, {
                type: string;
                result: {
                    url: string;
                    api_path: string;
                };
            }>, "many">;
            type: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: string;
            hits: {
                type: string;
                result: {
                    url: string;
                    api_path: string;
                };
            }[];
        }, {
            type: string;
            hits: {
                type: string;
                result: {
                    url: string;
                    api_path: string;
                };
            }[];
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        sections: {
            type: string;
            hits: {
                type: string;
                result: {
                    url: string;
                    api_path: string;
                };
            }[];
        }[];
    }, {
        sections: {
            type: string;
            hits: {
                type: string;
                result: {
                    url: string;
                    api_path: string;
                };
            }[];
        }[];
    }>;
}, "strip", z.ZodTypeAny, {
    response: {
        sections: {
            type: string;
            hits: {
                type: string;
                result: {
                    url: string;
                    api_path: string;
                };
            }[];
        }[];
    };
}, {
    response: {
        sections: {
            type: string;
            hits: {
                type: string;
                result: {
                    url: string;
                    api_path: string;
                };
            }[];
        }[];
    };
}>;
export declare const LyricsV2MetadataSongSchema: z.ZodObject<{
    id: z.ZodNumber;
    artist_names: z.ZodString;
    full_title: z.ZodString;
    description_preview: z.ZodString;
    apple_music_player_url: z.ZodString;
    soundcloud_url: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    spotify_uuid: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    youtube_url: z.ZodString;
    release_date_components: z.ZodObject<{
        day: z.ZodNumber;
        month: z.ZodNumber;
        year: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        day: number;
        month: number;
        year: number;
    }, {
        day: number;
        month: number;
        year: number;
    }>;
    header_image_thumbnail_url: z.ZodString;
    header_image_url: z.ZodString;
    album: z.ZodObject<{
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
    }, {
        name: string;
    }>;
}, "strip", z.ZodTypeAny, {
    id: number;
    album: {
        name: string;
    };
    artist_names: string;
    full_title: string;
    description_preview: string;
    apple_music_player_url: string;
    youtube_url: string;
    release_date_components: {
        day: number;
        month: number;
        year: number;
    };
    header_image_thumbnail_url: string;
    header_image_url: string;
    soundcloud_url?: string | null | undefined;
    spotify_uuid?: string | null | undefined;
}, {
    id: number;
    album: {
        name: string;
    };
    artist_names: string;
    full_title: string;
    description_preview: string;
    apple_music_player_url: string;
    youtube_url: string;
    release_date_components: {
        day: number;
        month: number;
        year: number;
    };
    header_image_thumbnail_url: string;
    header_image_url: string;
    soundcloud_url?: string | null | undefined;
    spotify_uuid?: string | null | undefined;
}>;
export declare const LyricsV2MetadataResponseSchema: z.ZodObject<{
    response: z.ZodObject<{
        song: z.ZodObject<{
            id: z.ZodNumber;
            artist_names: z.ZodString;
            full_title: z.ZodString;
            description_preview: z.ZodString;
            apple_music_player_url: z.ZodString;
            soundcloud_url: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            spotify_uuid: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            youtube_url: z.ZodString;
            release_date_components: z.ZodObject<{
                day: z.ZodNumber;
                month: z.ZodNumber;
                year: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                day: number;
                month: number;
                year: number;
            }, {
                day: number;
                month: number;
                year: number;
            }>;
            header_image_thumbnail_url: z.ZodString;
            header_image_url: z.ZodString;
            album: z.ZodObject<{
                name: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                name: string;
            }, {
                name: string;
            }>;
        }, "strip", z.ZodTypeAny, {
            id: number;
            album: {
                name: string;
            };
            artist_names: string;
            full_title: string;
            description_preview: string;
            apple_music_player_url: string;
            youtube_url: string;
            release_date_components: {
                day: number;
                month: number;
                year: number;
            };
            header_image_thumbnail_url: string;
            header_image_url: string;
            soundcloud_url?: string | null | undefined;
            spotify_uuid?: string | null | undefined;
        }, {
            id: number;
            album: {
                name: string;
            };
            artist_names: string;
            full_title: string;
            description_preview: string;
            apple_music_player_url: string;
            youtube_url: string;
            release_date_components: {
                day: number;
                month: number;
                year: number;
            };
            header_image_thumbnail_url: string;
            header_image_url: string;
            soundcloud_url?: string | null | undefined;
            spotify_uuid?: string | null | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        song: {
            id: number;
            album: {
                name: string;
            };
            artist_names: string;
            full_title: string;
            description_preview: string;
            apple_music_player_url: string;
            youtube_url: string;
            release_date_components: {
                day: number;
                month: number;
                year: number;
            };
            header_image_thumbnail_url: string;
            header_image_url: string;
            soundcloud_url?: string | null | undefined;
            spotify_uuid?: string | null | undefined;
        };
    }, {
        song: {
            id: number;
            album: {
                name: string;
            };
            artist_names: string;
            full_title: string;
            description_preview: string;
            apple_music_player_url: string;
            youtube_url: string;
            release_date_components: {
                day: number;
                month: number;
                year: number;
            };
            header_image_thumbnail_url: string;
            header_image_url: string;
            soundcloud_url?: string | null | undefined;
            spotify_uuid?: string | null | undefined;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    response: {
        song: {
            id: number;
            album: {
                name: string;
            };
            artist_names: string;
            full_title: string;
            description_preview: string;
            apple_music_player_url: string;
            youtube_url: string;
            release_date_components: {
                day: number;
                month: number;
                year: number;
            };
            header_image_thumbnail_url: string;
            header_image_url: string;
            soundcloud_url?: string | null | undefined;
            spotify_uuid?: string | null | undefined;
        };
    };
}, {
    response: {
        song: {
            id: number;
            album: {
                name: string;
            };
            artist_names: string;
            full_title: string;
            description_preview: string;
            apple_music_player_url: string;
            youtube_url: string;
            release_date_components: {
                day: number;
                month: number;
                year: number;
            };
            header_image_thumbnail_url: string;
            header_image_url: string;
            soundcloud_url?: string | null | undefined;
            spotify_uuid?: string | null | undefined;
        };
    };
}>;
export declare const LyricsV2Schema: z.ZodObject<{
    id: z.ZodNumber;
    title: z.ZodString;
    url: z.ZodString;
    artist: z.ZodString;
    album: z.ZodString;
    albumCover: z.ZodString;
    release: z.ZodString;
    spotify: z.ZodOptional<z.ZodString>;
    youtube: z.ZodOptional<z.ZodString>;
    soundcloud: z.ZodOptional<z.ZodString>;
    appleMusicPlayer: z.ZodOptional<z.ZodString>;
    lyrics: z.ZodArray<z.ZodObject<{
        type: z.ZodUnion<[z.ZodLiteral<"header">, z.ZodLiteral<"lyric">]>;
        url: z.ZodOptional<z.ZodString>;
        text: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "header" | "lyric";
        text: string;
        url?: string | undefined;
    }, {
        type: "header" | "lyric";
        text: string;
        url?: string | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
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
}, {
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