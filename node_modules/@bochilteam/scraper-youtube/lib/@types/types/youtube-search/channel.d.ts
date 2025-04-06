import { z } from 'zod';
export declare const ChannelRendererSchema: z.ZodObject<{
    channelId: z.ZodString;
    title: z.ZodObject<{
        text: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        text?: string | undefined;
    }, {
        text?: string | undefined;
    }>;
    thumbnail: z.ZodObject<{
        thumbnails: z.ZodArray<z.ZodObject<{
            url: z.ZodString;
            width: z.ZodNumber;
            height: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            url: string;
            width: number;
            height: number;
        }, {
            url: string;
            width: number;
            height: number;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        thumbnails: {
            url: string;
            width: number;
            height: number;
        }[];
    }, {
        thumbnails: {
            url: string;
            width: number;
            height: number;
        }[];
    }>;
    descriptionSnippet: z.ZodObject<{
        runs: z.ZodArray<z.ZodObject<{
            text: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            text: string;
        }, {
            text: string;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        runs: {
            text: string;
        }[];
    }, {
        runs: {
            text: string;
        }[];
    }>;
    shortBylineText: z.ZodObject<{
        runs: z.ZodArray<z.ZodObject<{
            text: z.ZodString;
            navigationEndpoint: z.ZodObject<{
                commandMetadata: z.ZodObject<{
                    webCommandMetadata: z.ZodObject<{
                        url: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        url: string;
                    }, {
                        url: string;
                    }>;
                }, "strip", z.ZodTypeAny, {
                    webCommandMetadata: {
                        url: string;
                    };
                }, {
                    webCommandMetadata: {
                        url: string;
                    };
                }>;
                browseEndpoint: z.ZodObject<{
                    canonicalBaseUrl: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    canonicalBaseUrl: string;
                }, {
                    canonicalBaseUrl: string;
                }>;
            }, "strip", z.ZodTypeAny, {
                commandMetadata: {
                    webCommandMetadata: {
                        url: string;
                    };
                };
                browseEndpoint: {
                    canonicalBaseUrl: string;
                };
            }, {
                commandMetadata: {
                    webCommandMetadata: {
                        url: string;
                    };
                };
                browseEndpoint: {
                    canonicalBaseUrl: string;
                };
            }>;
        }, "strip", z.ZodTypeAny, {
            text: string;
            navigationEndpoint: {
                commandMetadata: {
                    webCommandMetadata: {
                        url: string;
                    };
                };
                browseEndpoint: {
                    canonicalBaseUrl: string;
                };
            };
        }, {
            text: string;
            navigationEndpoint: {
                commandMetadata: {
                    webCommandMetadata: {
                        url: string;
                    };
                };
                browseEndpoint: {
                    canonicalBaseUrl: string;
                };
            };
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        runs: {
            text: string;
            navigationEndpoint: {
                commandMetadata: {
                    webCommandMetadata: {
                        url: string;
                    };
                };
                browseEndpoint: {
                    canonicalBaseUrl: string;
                };
            };
        }[];
    }, {
        runs: {
            text: string;
            navigationEndpoint: {
                commandMetadata: {
                    webCommandMetadata: {
                        url: string;
                    };
                };
                browseEndpoint: {
                    canonicalBaseUrl: string;
                };
            };
        }[];
    }>;
    videoCountText: z.ZodObject<{
        accessibility: z.ZodObject<{
            accessibilityData: z.ZodObject<{
                label: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                label: string;
            }, {
                label: string;
            }>;
        }, "strip", z.ZodTypeAny, {
            accessibilityData: {
                label: string;
            };
        }, {
            accessibilityData: {
                label: string;
            };
        }>;
        simpleText: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        accessibility: {
            accessibilityData: {
                label: string;
            };
        };
        simpleText: string;
    }, {
        accessibility: {
            accessibilityData: {
                label: string;
            };
        };
        simpleText: string;
    }>;
    ownerBadges: z.ZodArray<z.ZodObject<{
        metadataBadgeRenderer: z.ZodObject<{
            style: z.ZodString;
            tooltip: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            style: string;
            tooltip: string;
        }, {
            style: string;
            tooltip: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        metadataBadgeRenderer: {
            style: string;
            tooltip: string;
        };
    }, {
        metadataBadgeRenderer: {
            style: string;
            tooltip: string;
        };
    }>, "many">;
    subscriberCountText: z.ZodObject<{
        simpleText: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        simpleText: string;
    }, {
        simpleText: string;
    }>;
    longBylineText: z.ZodObject<{
        runs: z.ZodArray<z.ZodObject<{
            text: z.ZodString;
            navigationEndpoint: z.ZodObject<{
                commandMetadata: z.ZodObject<{
                    webCommandMetadata: z.ZodObject<{
                        url: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        url: string;
                    }, {
                        url: string;
                    }>;
                }, "strip", z.ZodTypeAny, {
                    webCommandMetadata: {
                        url: string;
                    };
                }, {
                    webCommandMetadata: {
                        url: string;
                    };
                }>;
                browseEndpoint: z.ZodObject<{
                    canonicalBaseUrl: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    canonicalBaseUrl: string;
                }, {
                    canonicalBaseUrl: string;
                }>;
            }, "strip", z.ZodTypeAny, {
                commandMetadata: {
                    webCommandMetadata: {
                        url: string;
                    };
                };
                browseEndpoint: {
                    canonicalBaseUrl: string;
                };
            }, {
                commandMetadata: {
                    webCommandMetadata: {
                        url: string;
                    };
                };
                browseEndpoint: {
                    canonicalBaseUrl: string;
                };
            }>;
        }, "strip", z.ZodTypeAny, {
            text: string;
            navigationEndpoint: {
                commandMetadata: {
                    webCommandMetadata: {
                        url: string;
                    };
                };
                browseEndpoint: {
                    canonicalBaseUrl: string;
                };
            };
        }, {
            text: string;
            navigationEndpoint: {
                commandMetadata: {
                    webCommandMetadata: {
                        url: string;
                    };
                };
                browseEndpoint: {
                    canonicalBaseUrl: string;
                };
            };
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        runs: {
            text: string;
            navigationEndpoint: {
                commandMetadata: {
                    webCommandMetadata: {
                        url: string;
                    };
                };
                browseEndpoint: {
                    canonicalBaseUrl: string;
                };
            };
        }[];
    }, {
        runs: {
            text: string;
            navigationEndpoint: {
                commandMetadata: {
                    webCommandMetadata: {
                        url: string;
                    };
                };
                browseEndpoint: {
                    canonicalBaseUrl: string;
                };
            };
        }[];
    }>;
}, "strip", z.ZodTypeAny, {
    title: {
        text?: string | undefined;
    };
    thumbnail: {
        thumbnails: {
            url: string;
            width: number;
            height: number;
        }[];
    };
    longBylineText: {
        runs: {
            text: string;
            navigationEndpoint: {
                commandMetadata: {
                    webCommandMetadata: {
                        url: string;
                    };
                };
                browseEndpoint: {
                    canonicalBaseUrl: string;
                };
            };
        }[];
    };
    ownerBadges: {
        metadataBadgeRenderer: {
            style: string;
            tooltip: string;
        };
    }[];
    shortBylineText: {
        runs: {
            text: string;
            navigationEndpoint: {
                commandMetadata: {
                    webCommandMetadata: {
                        url: string;
                    };
                };
                browseEndpoint: {
                    canonicalBaseUrl: string;
                };
            };
        }[];
    };
    channelId: string;
    descriptionSnippet: {
        runs: {
            text: string;
        }[];
    };
    videoCountText: {
        accessibility: {
            accessibilityData: {
                label: string;
            };
        };
        simpleText: string;
    };
    subscriberCountText: {
        simpleText: string;
    };
}, {
    title: {
        text?: string | undefined;
    };
    thumbnail: {
        thumbnails: {
            url: string;
            width: number;
            height: number;
        }[];
    };
    longBylineText: {
        runs: {
            text: string;
            navigationEndpoint: {
                commandMetadata: {
                    webCommandMetadata: {
                        url: string;
                    };
                };
                browseEndpoint: {
                    canonicalBaseUrl: string;
                };
            };
        }[];
    };
    ownerBadges: {
        metadataBadgeRenderer: {
            style: string;
            tooltip: string;
        };
    }[];
    shortBylineText: {
        runs: {
            text: string;
            navigationEndpoint: {
                commandMetadata: {
                    webCommandMetadata: {
                        url: string;
                    };
                };
                browseEndpoint: {
                    canonicalBaseUrl: string;
                };
            };
        }[];
    };
    channelId: string;
    descriptionSnippet: {
        runs: {
            text: string;
        }[];
    };
    videoCountText: {
        accessibility: {
            accessibilityData: {
                label: string;
            };
        };
        simpleText: string;
    };
    subscriberCountText: {
        simpleText: string;
    };
}>;
//# sourceMappingURL=channel.d.ts.map