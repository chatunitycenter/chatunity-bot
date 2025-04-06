"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelRendererSchema = void 0;
const zod_1 = require("zod");
const shared_js_1 = require("./shared.js");
const BylineTextRunSchema = zod_1.z.object({
    text: zod_1.z.string(),
    navigationEndpoint: zod_1.z.object({
        commandMetadata: zod_1.z.object({
            webCommandMetadata: zod_1.z.object({
                url: zod_1.z.string()
            })
        }),
        browseEndpoint: zod_1.z.object({
            canonicalBaseUrl: zod_1.z.string()
        })
    })
});
const BylineTextSchema = zod_1.z.object({
    runs: zod_1.z.array(BylineTextRunSchema)
});
exports.ChannelRendererSchema = zod_1.z.object({
    channelId: zod_1.z.string(),
    title: shared_js_1.CollapsedTextSchema.partial(),
    // navigationEndpoint:  RunNavigationEndpoint;
    thumbnail: shared_js_1.CollapsedThumbnailClassSchema,
    descriptionSnippet: shared_js_1.CollapsedRunsClassSchema,
    shortBylineText: BylineTextSchema,
    videoCountText: shared_js_1.TextSchema,
    // subscriptionButton:  SubscriptionButton;
    ownerBadges: zod_1.z.array(shared_js_1.OwnerBadgeSchema),
    subscriberCountText: shared_js_1.CollapsedSimpleTextSchema,
    // subscribeButton:     SubscribeButton;
    // trackingParams:      string;
    longBylineText: BylineTextSchema,
});
