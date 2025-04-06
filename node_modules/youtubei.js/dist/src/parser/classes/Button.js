import Text from './misc/Text.js';
import NavigationEndpoint from './NavigationEndpoint.js';
import { YTNode } from '../helpers.js';
class Button extends YTNode {
    constructor(data) {
        super();
        if (Reflect.has(data, 'text'))
            this.text = new Text(data.text).toString();
        if (Reflect.has(data, 'accessibility') && Reflect.has(data.accessibility, 'label')) {
            this.label = data.accessibility.label;
        }
        else if (Reflect.has(data, 'accessibilityData') &&
            Reflect.has(data.accessibilityData, 'accessibilityData') &&
            Reflect.has(data.accessibilityData.accessibilityData, 'label')) {
            this.label = data.accessibilityData.accessibilityData.label;
        }
        if (Reflect.has(data, 'tooltip'))
            this.tooltip = data.tooltip;
        if (Reflect.has(data, 'style'))
            this.style = data.style;
        if (Reflect.has(data, 'size'))
            this.size = data.size;
        if (Reflect.has(data, 'icon') && Reflect.has(data.icon, 'iconType'))
            this.icon_type = data.icon.iconType;
        if (Reflect.has(data, 'isDisabled'))
            this.is_disabled = data.isDisabled;
        if (Reflect.has(data, 'targetId'))
            this.target_id = data.targetId;
        this.endpoint = new NavigationEndpoint(data.navigationEndpoint || data.serviceEndpoint || data.command);
    }
}
Button.type = 'Button';
export default Button;
//# sourceMappingURL=Button.js.map