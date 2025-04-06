import { type ObservedArray, YTNode } from '../../helpers.js';
import type { RawNode } from '../../index.js';
export default class MultiPageMenuNotificationSection extends YTNode {
    static type: string;
    items: ObservedArray<YTNode>;
    constructor(data: RawNode);
    get contents(): ObservedArray<YTNode>;
}
