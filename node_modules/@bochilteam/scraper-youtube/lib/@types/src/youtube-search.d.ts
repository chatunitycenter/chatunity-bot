export default function youtubeSearch(query: string): Promise<{
    video: {
        title: string;
        thumbnail: string;
        duration: number;
        url: string;
        videoId: string;
        description: string;
        movingThumbnail: string;
        channelName: string;
        channelAvatar: string;
        isChannelVerified: boolean;
        publishedTime: string;
        viewH: string;
        view: number;
        durationH: string;
    }[];
    channel: {
        url: string;
        username: string;
        channelId: string;
        description: string;
        channelName: string;
        isChannelVerified: boolean;
        avatar: string;
        subscriberH: string;
    }[];
}>;
//# sourceMappingURL=youtube-search.d.ts.map