import { Parser } from '../../index.js';
import { YTNode } from '../../helpers.js';
class MultiPageMenuNotificationSection extends YTNode {
    constructor(data) {
        super();
        this.items = Parser.parseArray(data.items);
    }
    // XXX: Alias for consistency.
    get contents() {
        return this.items;
    }
}
MultiPageMenuNotificationSection.type = 'MultiPageMenuNotificationSection';
export default MultiPageMenuNotificationSection;
//# sourceMappingURL=MultiPageMenuNotificationSection.js.map