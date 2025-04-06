import { YTNode } from '../helpers.js';
import { Parser } from '../index.js';
class RichSection extends YTNode {
    constructor(data) {
        super();
        this.content = Parser.parseItem(data.content);
    }
}
RichSection.type = 'RichSection';
export default RichSection;
//# sourceMappingURL=RichSection.js.map