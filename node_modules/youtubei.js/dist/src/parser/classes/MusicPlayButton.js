import NavigationEndpoint from './NavigationEndpoint.js';
import { YTNode } from '../helpers.js';
class MusicPlayButton extends YTNode {
    constructor(data) {
        super();
        this.endpoint = new NavigationEndpoint(data.playNavigationEndpoint);
        this.play_icon_type = data.playIcon.iconType;
        this.pause_icon_type = data.pauseIcon.iconType;
        if (Reflect.has(data, 'accessibilityPlayData')) {
            this.play_label = data.accessibilityPlayData.accessibilityData?.label;
        }
        if (Reflect.has(data, 'accessibilityPauseData')) {
            this.pause_label = data.accessibilityPauseData.accessibilityData?.label;
        }
        this.icon_color = data.iconColor;
    }
}
MusicPlayButton.type = 'MusicPlayButton';
export default MusicPlayButton;
//# sourceMappingURL=MusicPlayButton.js.map