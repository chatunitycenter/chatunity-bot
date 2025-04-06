import { YTNode } from '../helpers.js';
import NavigationEndpoint from './NavigationEndpoint.js';
import Text from './misc/Text.js';
import Thumbnail from './misc/Thumbnail.js';
class ReelItem extends YTNode {
    constructor(data) {
        super();
        this.id = data.videoId;
        this.title = new Text(data.headline);
        this.thumbnails = Thumbnail.fromResponse(data.thumbnail);
        this.views = new Text(data.viewCountText);
        this.endpoint = new NavigationEndpoint(data.navigationEndpoint);
        this.accessibility_label = data.accessibility.accessibilityData.label;
    }
}
ReelItem.type = 'ReelItem';
export default ReelItem;
//# sourceMappingURL=ReelItem.js.map