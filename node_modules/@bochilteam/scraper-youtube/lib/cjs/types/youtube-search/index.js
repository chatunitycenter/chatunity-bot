"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YoutubeSearchSchema = exports.YoutubeSearchChannelSchema = exports.YoutubeSearchVideoSchema = exports.YoutubeSearchArgsSchema = exports.YoutubeSearchResponseSchema = void 0;
const zod_1 = require("zod");
const video_js_1 = require("./video.js");
const channel_js_1 = require("./channel.js");
const ItemSectionRendererContentSchema = zod_1.z.object({
    // searchPyvRenderer: SearchPyvRendererSchema.optional(),
    videoRenderer: video_js_1.VideoRendererSchema.optional(),
    // reelShelfRenderer: ReelShelfRendererSchema.optional(),
    // shelfRenderer: ShelfRendererSchema.optional(),
    // radioRenderer: RadioRendererSchema.optional(),
    // horizontalCardListRenderer: ContentHorizontalCardListRendererSchema.optional(),
    channelRenderer: channel_js_1.ChannelRendererSchema.optional()
});
const SectionListRendererContentSchema = zod_1.z.object({
    itemSectionRenderer: zod_1.z.object({
        contents: zod_1.z.array(ItemSectionRendererContentSchema)
    }).optional()
});
const TwoColumnSearchResultsRendererSchema = zod_1.z.object({
    primaryContents: zod_1.z.object({
        sectionListRenderer: zod_1.z.object({
            contents: zod_1.z.array(SectionListRendererContentSchema),
        })
    })
});
exports.YoutubeSearchResponseSchema = zod_1.z.object({
    contents: zod_1.z.object({
        twoColumnSearchResultsRenderer: TwoColumnSearchResultsRendererSchema
    })
});
exports.YoutubeSearchArgsSchema = zod_1.z.object({
    0: zod_1.z.string()
});
exports.YoutubeSearchVideoSchema = zod_1.z.object({
    videoId: zod_1.z.string(),
    url: zod_1.z.string().url(),
    title: zod_1.z.string(),
    thumbnail: zod_1.z.string().url(),
    description: zod_1.z.string(),
    movingThumbnail: zod_1.z.string().url(),
    channelName: zod_1.z.string(),
    channelAvatar: zod_1.z.string().url(),
    isChannelVerified: zod_1.z.boolean(),
    publishedTime: zod_1.z.string(),
    viewH: zod_1.z.string(),
    view: zod_1.z.number().int(),
    durationH: zod_1.z.string(),
    duration: zod_1.z.number().int(),
});
exports.YoutubeSearchChannelSchema = zod_1.z.object({
    channelId: zod_1.z.string(),
    url: zod_1.z.string().url(),
    channelName: zod_1.z.string(),
    username: zod_1.z.string(),
    avatar: zod_1.z.string().url(),
    isChannelVerified: zod_1.z.boolean(),
    subscriberH: zod_1.z.string(),
    description: zod_1.z.string(),
});
exports.YoutubeSearchSchema = zod_1.z.object({
    video: zod_1.z.array(exports.YoutubeSearchVideoSchema),
    channel: zod_1.z.array(exports.YoutubeSearchChannelSchema)
});
