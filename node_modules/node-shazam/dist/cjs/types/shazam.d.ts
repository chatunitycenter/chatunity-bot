export interface ShazamRoot {
    matches: ShazamMatch[];
    location: {
        accuracy: number;
    };
    timestamp: number;
    timezone: string;
    track: ShazamTrack;
    tagid: string;
}
export interface ShazamMatch {
    id: string;
    offset: number;
    timeskew: number;
    frequencyskew: number;
}
export interface ShazamTrack {
    layout: string;
    type: string;
    key: string;
    title: string;
    subtitle: string;
    images: ShazamImages;
    share: ShazamShare;
    hub: ShazamHub;
    sections: ShazamSection[];
    url: string;
    artists: ShazamArtist[];
    isrc: string;
    genres: ShazamGenres;
    urlparams: ShazamUrlparams;
    myshazam: {
        apple: {
            actions: {
                name: string;
                type: string;
                uri: string;
            }[];
        };
    };
    highlightsurls: ShazamHighlightsurls;
    relatedtracksurl: string;
    albumadamid: string;
}
export interface ShazamImages {
    background: string;
    coverart: string;
    coverarthq: string;
    joecolor: string;
}
export interface ShazamShare {
    subject: string;
    text: string;
    href: string;
    image: string;
    twitter: string;
    html: string;
    avatar: string;
    snapchat: string;
}
export interface ShazamHub {
    type: string;
    image: string;
    actions: ShazamAction[];
    options: ShazamOption[];
    providers: ShazamProvider[];
    explicit: boolean;
    displayname: string;
}
export interface ShazamAction {
    name: string;
    type: string;
    id?: string;
    uri?: string;
}
export interface ShazamOption {
    caption: string;
    actions: {
        type: string;
        uri: string;
        name?: string;
    }[];
    beacondata: ShazamBeacondata;
    image: string;
    type: string;
    listcaption: string;
    overflowimage: string;
    colouroverflowimage: boolean;
    providername: string;
}
export interface ShazamBeacondata {
    type: string;
    providername: string;
}
export interface ShazamProvider {
    caption: string;
    images: {
        overflow: string;
        default: string;
    };
    actions: {
        name: string;
        type: string;
        uri: string;
    }[];
    type: string;
}
export interface ShazamSection {
    type: string;
    metapages?: ShazamMetapage[];
    tabname: string;
    metadata?: ShazamMetadata[];
    text?: string[];
    url?: string;
    footer?: string;
    beacondata?: {
        lyricsid: string;
        providername: string;
        commontrackid: string;
    };
    youtubeurl?: string;
}
export interface ShazamMetapage {
    image: string;
    caption: string;
}
export interface ShazamMetadata {
    title: string;
    text: string;
}
export interface ShazamArtist {
    id: string;
    adamid: string;
}
export interface ShazamGenres {
    primary: string;
}
export interface ShazamUrlparams {
    '{tracktitle}': string;
    '{trackartist}': string;
}
export interface ShazamHighlightsurls {
    artisthighlightsurl: string;
    trackhighlighturl: string;
}
