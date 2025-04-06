import { YTNode } from '../helpers.js';
import type { RawNode } from '../index.js';
import NavigationEndpoint from './NavigationEndpoint.js';
export default class SortFilterSubMenu extends YTNode {
    static type: string;
    title?: string;
    icon_type?: string;
    label?: string;
    tooltip?: string;
    sub_menu_items?: {
        title: string;
        selected: boolean;
        continuation: string;
        endpoint: NavigationEndpoint;
        subtitle: string | null;
    }[];
    constructor(data: RawNode);
}
