import type { RawNode } from '../../index.js';
import { type Run } from './Text.js';
import Thumbnail from './Thumbnail.js';
export default class EmojiRun implements Run {
    text: string;
    emoji: {
        emoji_id: string;
        shortcuts: string[];
        search_terms: string[];
        image: Thumbnail[];
        is_custom: boolean;
    };
    constructor(data: RawNode);
    toString(): string;
    toHTML(): string;
}
