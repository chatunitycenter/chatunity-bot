import type { ObservedArray } from '../../helpers.js';
import { YTNode } from '../../helpers.js';
import type { RawNode } from '../../index.js';
import Button from '../Button.js';
import ButtonView from '../ButtonView.js';
import SegmentedLikeDislikeButtonView from '../SegmentedLikeDislikeButtonView.js';
import MenuFlexibleItem from './MenuFlexibleItem.js';
import LikeButton from '../LikeButton.js';
import ToggleButton from '../ToggleButton.js';
import FlexibleActionsView from '../FlexibleActionsView.js';
export default class Menu extends YTNode {
    static type: string;
    items: ObservedArray<YTNode>;
    flexible_items: ObservedArray<MenuFlexibleItem>;
    top_level_buttons: ObservedArray<ToggleButton | LikeButton | Button | ButtonView | SegmentedLikeDislikeButtonView | FlexibleActionsView>;
    label?: string;
    constructor(data: RawNode);
    get contents(): ObservedArray<YTNode>;
}
