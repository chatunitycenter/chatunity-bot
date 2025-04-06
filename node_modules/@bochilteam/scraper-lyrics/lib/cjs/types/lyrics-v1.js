"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LyricsSchema = exports.LyricsMetadataResponseSchema = exports.LyricsMetadataTrackSchema = exports.LyricsMetadataBestMatchSchema = exports.LyricsArgsSchema = void 0;
const zod_1 = require("zod");
exports.LyricsArgsSchema = zod_1.z.object({
    0: zod_1.z.string()
});
exports.LyricsMetadataBestMatchSchema = zod_1.z.object({
    id: zod_1.z.number(),
    type: zod_1.z.string()
});
exports.LyricsMetadataTrackSchema = zod_1.z.object({
    track: zod_1.z.object({
        track_id: zod_1.z.number(),
        track_spotify_id: zod_1.z.string(),
        track_share_url: zod_1.z.string().url(),
        track_name: zod_1.z.string(),
        artist_name: zod_1.z.string(),
        album_name: zod_1.z.string(),
        first_release_date: zod_1.z.string().datetime(),
        album_coverart_100x100: zod_1.z.preprocess((str) => str || undefined, zod_1.z.string().url().optional()),
        album_coverart_350x350: zod_1.z.preprocess((str) => str || undefined, zod_1.z.string().url().optional()),
        album_coverart_500x500: zod_1.z.preprocess((str) => str || undefined, zod_1.z.string().url().optional()),
        album_coverart_800x800: zod_1.z.preprocess((str) => str || undefined, zod_1.z.string().url().optional())
    })
});
exports.LyricsMetadataResponseSchema = zod_1.z.object({
    message: zod_1.z.object({
        body: zod_1.z.object({
            macro_result_list: zod_1.z.object({
                best_match: exports.LyricsMetadataBestMatchSchema,
                track_list: zod_1.z.array(exports.LyricsMetadataTrackSchema)
            })
        })
    })
});
exports.LyricsSchema = zod_1.z.object({
    id: zod_1.z.number(),
    title: zod_1.z.string(),
    url: zod_1.z.string().url(),
    artist: zod_1.z.string(),
    album: zod_1.z.string(),
    albumCover: zod_1.z.string().url(),
    release: zod_1.z.string().datetime(),
    spotify: zod_1.z.string().url(),
    lyrics: zod_1.z.object({
        type: zod_1.z.literal('header').or(zod_1.z.literal('lyric')),
        text: zod_1.z.string()
    }).array()
});
