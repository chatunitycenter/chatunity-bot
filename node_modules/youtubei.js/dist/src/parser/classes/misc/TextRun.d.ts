import NavigationEndpoint from '../NavigationEndpoint.js';
import { type Run } from './Text.js';
import type { RawNode } from '../../index.js';
export default class TextRun implements Run {
    text: string;
    endpoint?: NavigationEndpoint;
    bold: boolean;
    italics: boolean;
    strikethrough: boolean;
    deemphasize: boolean;
    attachment: any;
    constructor(data: RawNode);
    toString(): string;
    toHTML(): string;
}
