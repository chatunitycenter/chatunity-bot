import { YTNode } from '../../helpers.js';
import Text from '../misc/Text.js';
import NavigationEndpoint from '../NavigationEndpoint.js';
class PivotBarItem extends YTNode {
    constructor(data) {
        super();
        this.pivot_identifier = data.pivotIdentifier;
        this.endpoint = new NavigationEndpoint(data.navigationEndpoint);
        this.title = new Text(data.title);
        if (Reflect.has(data, 'accessibility') && Reflect.has(data.accessibility, 'accessibilityData'))
            this.accessibility_label = data.accessibility.accessibilityData.label;
        if (Reflect.has(data, 'icon') && Reflect.has(data.icon, 'iconType'))
            this.icon_type = data.icon.iconType;
    }
}
PivotBarItem.type = 'PivotBarItem';
export default PivotBarItem;
//# sourceMappingURL=PivotBarItem.js.map