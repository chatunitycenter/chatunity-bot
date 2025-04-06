"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LyricsV2Schema = exports.LyricsV2MetadataResponseSchema = exports.LyricsV2MetadataSongSchema = exports.LyricsV2SearchResponseSchema = exports.LyricsV2SearchSectionSchema = void 0;
const zod_1 = require("zod");
exports.LyricsV2SearchSectionSchema = zod_1.z.object({
    hits: zod_1.z.object({
        type: zod_1.z.string(),
        result: zod_1.z.object({
            api_path: zod_1.z.string(),
            url: zod_1.z.string().url()
        })
    }).array(),
    type: zod_1.z.string()
});
exports.LyricsV2SearchResponseSchema = zod_1.z.object({
    response: zod_1.z.object({
        sections: exports.LyricsV2SearchSectionSchema.array()
    })
});
exports.LyricsV2MetadataSongSchema = zod_1.z.object({
    id: zod_1.z.number(),
    artist_names: zod_1.z.string(),
    full_title: zod_1.z.string(),
    description_preview: zod_1.z.string(),
    apple_music_player_url: zod_1.z.string().url(),
    soundcloud_url: zod_1.z.string().url().nullish(),
    spotify_uuid: zod_1.z.string().nullish(),
    youtube_url: zod_1.z.string().url(),
    release_date_components: zod_1.z.object({
        day: zod_1.z.number(),
        month: zod_1.z.number(),
        year: zod_1.z.number()
    }),
    header_image_thumbnail_url: zod_1.z.string().url(),
    header_image_url: zod_1.z.string().url(),
    album: zod_1.z.object({
        name: zod_1.z.string()
    })
});
exports.LyricsV2MetadataResponseSchema = zod_1.z.object({
    response: zod_1.z.object({
        song: exports.LyricsV2MetadataSongSchema
    })
});
exports.LyricsV2Schema = zod_1.z.object({
    id: zod_1.z.number(),
    title: zod_1.z.string(),
    url: zod_1.z.string().url(),
    artist: zod_1.z.string(),
    album: zod_1.z.string(),
    albumCover: zod_1.z.string().url(),
    release: zod_1.z.string().datetime(),
    spotify: zod_1.z.string().url().optional(),
    youtube: zod_1.z.string().url().optional(),
    soundcloud: zod_1.z.string().url().optional(),
    appleMusicPlayer: zod_1.z.string().url().optional(),
    lyrics: zod_1.z.object({
        type: zod_1.z.literal('header').or(zod_1.z.literal('lyric')),
        url: zod_1.z.string().url().optional(),
        text: zod_1.z.string()
    }).array()
});
