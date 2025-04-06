import { YTNode, type ObservedArray } from '../helpers.js';
import { type RawNode } from '../index.js';
import NavigationEndpoint from './NavigationEndpoint.js';
import Text from './misc/Text.js';
export default class RichShelf extends YTNode {
    static type: string;
    title: Text;
    contents: ObservedArray<YTNode>;
    endpoint?: NavigationEndpoint;
    subtitle?: Text;
    constructor(data: RawNode);
}
