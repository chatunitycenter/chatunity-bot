import { YTNode } from '../helpers.js';
import NavigationEndpoint from './NavigationEndpoint.js';
class SortFilterSubMenu extends YTNode {
    constructor(data) {
        super();
        if (Reflect.has(data, 'title')) {
            this.title = data.title;
        }
        if (Reflect.has(data, 'icon')) {
            this.icon_type = data.icon.iconType;
        }
        if (Reflect.has(data, 'accessibility')) {
            this.label = data.accessibility.accessibilityData.label;
        }
        if (Reflect.has(data, 'tooltip')) {
            this.tooltip = data.tooltip;
        }
        if (Reflect.has(data, 'subMenuItems')) {
            this.sub_menu_items = data.subMenuItems.map((item) => ({
                title: item.title,
                selected: item.selected,
                continuation: item.continuation?.reloadContinuationData?.continuation,
                endpoint: new NavigationEndpoint(item.serviceEndpoint || item.navigationEndpoint),
                subtitle: item.subtitle || null
            }));
        }
    }
}
SortFilterSubMenu.type = 'SortFilterSubMenu';
export default SortFilterSubMenu;
//# sourceMappingURL=SortFilterSubMenu.js.map