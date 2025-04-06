import { YTNode } from '../helpers.js';
import { type RawNode } from '../index.js';
export default class RichSection extends YTNode {
    static type: string;
    content: YTNode;
    constructor(data: RawNode);
}
