import { YTNode } from '../helpers.js';
import type { RawNode } from '../index.js';
export default class MusicInlineBadge extends YTNode {
    static type: string;
    icon_type: string;
    label: string;
    constructor(data: RawNode);
}
