import { YTNode } from '../../helpers.js';
import { type RawNode } from '../../index.js';
import Text from '../misc/Text.js';
import NavigationEndpoint from '../NavigationEndpoint.js';
export default class PivotBarItem extends YTNode {
    static type: string;
    pivot_identifier: string;
    endpoint: NavigationEndpoint;
    title: Text;
    accessibility_label?: string;
    icon_type?: string;
    constructor(data: RawNode);
}
