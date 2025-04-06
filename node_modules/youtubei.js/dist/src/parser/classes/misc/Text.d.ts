import type { RawNode } from '../../index.js';
import NavigationEndpoint from '../NavigationEndpoint.js';
import EmojiRun from './EmojiRun.js';
import TextRun from './TextRun.js';
export interface Run {
    text: string;
    toString(): string;
    toHTML(): string;
}
export declare function escape(text: string): string;
export default class Text {
    text?: string;
    runs?: (EmojiRun | TextRun)[];
    endpoint?: NavigationEndpoint;
    constructor(data: RawNode);
    static fromAttributed(data: AttributedText): Text;
    /**
     * Converts the text to HTML.
     * @returns The HTML.
     */
    toHTML(): string | undefined;
    /**
     * Checks if the text is empty.
     * @returns Whether the text is empty.
     */
    isEmpty(): boolean;
    /**
     * Converts the text to a string.
     * @returns The text.
     */
    toString(): string;
}
export interface AttributedText {
    content: string;
    styleRuns?: StyleRun[];
    commandRuns?: CommandRun[];
    attachmentRuns?: AttachmentRun[];
    decorationRuns?: ResponseRun[];
}
interface ResponseRun {
    startIndex: number;
    length: number;
}
interface StyleRun extends Partial<ResponseRun> {
    italic?: boolean;
    weightLabel?: string;
    strikethrough?: string;
    fontFamilyName?: string;
    styleRunExtensions?: {
        styleRunColorMapExtension?: {
            colorMap?: {
                key: string;
                value: number;
            }[];
        };
    };
}
interface CommandRun extends ResponseRun {
    onTap?: RawNode;
}
interface AttachmentRun extends ResponseRun {
    alignment?: string;
    element?: {
        type?: {
            imageType?: {
                image: RawNode;
                playbackState?: string;
            };
        };
        properties?: RawNode;
    };
}
export {};
