import Thumbnail from './misc/Thumbnail.js';
import NavigationEndpoint from './NavigationEndpoint.js';
import { YTNode } from '../helpers.js';
import type { RawNode } from '../index.js';
export default class ChannelThumbnailWithLink extends YTNode {
    static type: string;
    thumbnails: Thumbnail[];
    endpoint: NavigationEndpoint;
    label?: string;
    constructor(data: RawNode);
}
