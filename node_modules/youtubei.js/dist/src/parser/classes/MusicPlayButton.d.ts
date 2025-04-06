import NavigationEndpoint from './NavigationEndpoint.js';
import { YTNode } from '../helpers.js';
import type { RawNode } from '../index.js';
export default class MusicPlayButton extends YTNode {
    static type: string;
    endpoint: NavigationEndpoint;
    play_icon_type: string;
    pause_icon_type: string;
    play_label?: string;
    pause_label?: string;
    icon_color: string;
    constructor(data: RawNode);
}
