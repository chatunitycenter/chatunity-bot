"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoRendererSchema = void 0;
const zod_1 = require("zod");
const shared_js_1 = require("./shared.js");
const ThumbnailOverlaySchema = zod_1.z.object({
    thumbnailOverlayTimeStatusRenderer: zod_1.z.object({
        text: zod_1.z.object({
            accessibility: shared_js_1.AccessibilitySchema.optional(),
            simpleText: zod_1.z.string()
        }),
        style: zod_1.z.string()
    }).optional()
});
const DetailedMetadataSnippetSchema = zod_1.z.object({
    snippetText: zod_1.z.object({
        runs: zod_1.z.array(shared_js_1.CollapsedTextSchema)
    })
});
const TitleSchema = zod_1.z.object({
    runs: zod_1.z.array(shared_js_1.CollapsedTextSchema),
    accessibility: shared_js_1.AccessibilitySchema
});
const RichThumbnailSchema = zod_1.z.object({
    movingThumbnailRenderer: zod_1.z.object({
        movingThumbnailDetails: shared_js_1.CollapsedThumbnailClassSchema
    })
});
const ChannelThumbnailSupportedRenderersSchema = zod_1.z.object({
    channelThumbnailWithLinkRenderer: zod_1.z.object({
        thumbnail: shared_js_1.CollapsedThumbnailClassSchema
    })
});
exports.VideoRendererSchema = zod_1.z.object({
    videoId: zod_1.z.string(),
    thumbnail: shared_js_1.CollapsedThumbnailClassSchema,
    title: TitleSchema,
    longBylineText: shared_js_1.CollapsedRunsClassSchema,
    publishedTimeText: shared_js_1.CollapsedSimpleTextSchema.optional(),
    lengthText: shared_js_1.TextSchema.optional(),
    viewCountText: shared_js_1.CollapsedSimpleTextSchema.partial(),
    // navigationEndpoint:                 Endpoint;
    // badges?:                             Badge[],
    ownerBadges: zod_1.z.array(shared_js_1.OwnerBadgeSchema).optional(),
    ownerText: shared_js_1.CollapsedRunsClassSchema,
    shortBylineText: shared_js_1.CollapsedRunsClassSchema,
    // trackingParams:                     string;
    // showActionMenu:                     boolean;
    shortViewCountText: shared_js_1.TextSchema.partial(),
    // menu:                               VideoRendererMenu;
    channelThumbnailSupportedRenderers: ChannelThumbnailSupportedRenderersSchema,
    thumbnailOverlays: zod_1.z.array(ThumbnailOverlaySchema),
    richThumbnail: RichThumbnailSchema.optional(),
    detailedMetadataSnippets: zod_1.z.array(DetailedMetadataSnippetSchema).optional(),
});
