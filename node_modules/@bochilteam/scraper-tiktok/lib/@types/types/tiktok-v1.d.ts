import { z } from 'zod';
export declare const TiktokDlArgsSchema: z.ZodObject<{
    0: z.ZodString;
}, "strip", z.ZodTypeAny, {
    0: string;
}, {
    0: string;
}>;
export declare const TiktokDlSchema: z.ZodObject<{
    nickname: z.ZodString;
    username: z.ZodString;
    avatar: z.ZodString;
    description: z.ZodString;
    thumbnail: z.ZodString;
    played: z.ZodString;
    commented: z.ZodString;
    saved: z.ZodString;
    shared: z.ZodString;
    song: z.ZodString;
    video: z.ZodObject<{
        noWatermark: z.ZodString;
        withWatermark: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        noWatermark: string;
        withWatermark: string;
    }, {
        noWatermark: string;
        withWatermark: string;
    }>;
    audio: z.ZodString;
}, "strip", z.ZodTypeAny, {
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
}, {
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
export type TiktokDl = z.infer<typeof TiktokDlSchema>;
//# sourceMappingURL=tiktok-v1.d.ts.map