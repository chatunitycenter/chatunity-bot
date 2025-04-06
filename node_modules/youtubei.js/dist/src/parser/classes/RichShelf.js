import { YTNode } from '../helpers.js';
import { Parser } from '../index.js';
import NavigationEndpoint from './NavigationEndpoint.js';
import Text from './misc/Text.js';
class RichShelf extends YTNode {
    constructor(data) {
        super();
        this.title = new Text(data.title);
        this.contents = Parser.parseArray(data.contents);
        if (Reflect.has(data, 'endpoint')) {
            this.endpoint = new NavigationEndpoint(data.endpoint);
        }
        if (Reflect.has(data, 'subtitle')) {
            this.subtitle = new Text(data.subtitle);
        }
    }
}
RichShelf.type = 'RichShelf';
export default RichShelf;
//# sourceMappingURL=RichShelf.js.map