import { z } from 'zod';
export const YoutubeDownloaderArgsSchema = z.object({
    0: z.string().url(),
    1: z.literal('id')
        .or(z.literal('en'))
        .or(z.literal('es'))
        .optional()
});
const YoutubedlDataSchema = z.object({
    quality: z.string(),
    type: z.string(),
    fileSizeH: z.string(),
    fileSize: z.number(),
    download: z.function(z.tuple([]), z.promise(z.string().url()))
});
export const YoutubedlSchema = z.object({
    id: z.string(),
    thumbnail: z.string(),
    title: z.string(),
    duration: z.number(),
    video: z.record(z.string(), YoutubedlDataSchema),
    audio: z.record(z.string(), YoutubedlDataSchema),
    other: z.record(z.string(), YoutubedlDataSchema)
});
