import { z } from 'zod';
export declare const VideoRendererSchema: z.ZodObject<{
    videoId: z.ZodString;
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
    title: z.ZodObject<{
        runs: z.ZodArray<z.ZodObject<{
            text: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            text: string;
        }, {
            text: string;
        }>, "many">;
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
    }, "strip", z.ZodTypeAny, {
        runs: {
            text: string;
        }[];
        accessibility: {
            accessibilityData: {
                label: string;
            };
        };
    }, {
        runs: {
            text: string;
        }[];
        accessibility: {
            accessibilityData: {
                label: string;
            };
        };
    }>;
    longBylineText: z.ZodObject<{
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
    publishedTimeText: z.ZodOptional<z.ZodObject<{
        simpleText: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        simpleText: string;
    }, {
        simpleText: string;
    }>>;
    lengthText: z.ZodOptional<z.ZodObject<{
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
    }>>;
    viewCountText: z.ZodObject<{
        simpleText: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        simpleText?: string | undefined;
    }, {
        simpleText?: string | undefined;
    }>;
    ownerBadges: z.ZodOptional<z.ZodArray<z.ZodObject<{
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
    }>, "many">>;
    ownerText: z.ZodObject<{
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
    shortViewCountText: z.ZodObject<{
        accessibility: z.ZodOptional<z.ZodObject<{
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
        }>>;
        simpleText: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        accessibility?: {
            accessibilityData: {
                label: string;
            };
        } | undefined;
        simpleText?: string | undefined;
    }, {
        accessibility?: {
            accessibilityData: {
                label: string;
            };
        } | undefined;
        simpleText?: string | undefined;
    }>;
    channelThumbnailSupportedRenderers: z.ZodObject<{
        channelThumbnailWithLinkRenderer: z.ZodObject<{
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
        }, "strip", z.ZodTypeAny, {
            thumbnail: {
                thumbnails: {
                    url: string;
                    width: number;
                    height: number;
                }[];
            };
        }, {
            thumbnail: {
                thumbnails: {
                    url: string;
                    width: number;
                    height: number;
                }[];
            };
        }>;
    }, "strip", z.ZodTypeAny, {
        channelThumbnailWithLinkRenderer: {
            thumbnail: {
                thumbnails: {
                    url: string;
                    width: number;
                    height: number;
                }[];
            };
        };
    }, {
        channelThumbnailWithLinkRenderer: {
            thumbnail: {
                thumbnails: {
                    url: string;
                    width: number;
                    height: number;
                }[];
            };
        };
    }>;
    thumbnailOverlays: z.ZodArray<z.ZodObject<{
        thumbnailOverlayTimeStatusRenderer: z.ZodOptional<z.ZodObject<{
            text: z.ZodObject<{
                accessibility: z.ZodOptional<z.ZodObject<{
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
                }>>;
                simpleText: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                simpleText: string;
                accessibility?: {
                    accessibilityData: {
                        label: string;
                    };
                } | undefined;
            }, {
                simpleText: string;
                accessibility?: {
                    accessibilityData: {
                        label: string;
                    };
                } | undefined;
            }>;
            style: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            style: string;
            text: {
                simpleText: string;
                accessibility?: {
                    accessibilityData: {
                        label: string;
                    };
                } | undefined;
            };
        }, {
            style: string;
            text: {
                simpleText: string;
                accessibility?: {
                    accessibilityData: {
                        label: string;
                    };
                } | undefined;
            };
        }>>;
    }, "strip", z.ZodTypeAny, {
        thumbnailOverlayTimeStatusRenderer?: {
            style: string;
            text: {
                simpleText: string;
                accessibility?: {
                    accessibilityData: {
                        label: string;
                    };
                } | undefined;
            };
        } | undefined;
    }, {
        thumbnailOverlayTimeStatusRenderer?: {
            style: string;
            text: {
                simpleText: string;
                accessibility?: {
                    accessibilityData: {
                        label: string;
                    };
                } | undefined;
            };
        } | undefined;
    }>, "many">;
    richThumbnail: z.ZodOptional<z.ZodObject<{
        movingThumbnailRenderer: z.ZodObject<{
            movingThumbnailDetails: z.ZodObject<{
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
        }, "strip", z.ZodTypeAny, {
            movingThumbnailDetails: {
                thumbnails: {
                    url: string;
                    width: number;
                    height: number;
                }[];
            };
        }, {
            movingThumbnailDetails: {
                thumbnails: {
                    url: string;
                    width: number;
                    height: number;
                }[];
            };
        }>;
    }, "strip", z.ZodTypeAny, {
        movingThumbnailRenderer: {
            movingThumbnailDetails: {
                thumbnails: {
                    url: string;
                    width: number;
                    height: number;
                }[];
            };
        };
    }, {
        movingThumbnailRenderer: {
            movingThumbnailDetails: {
                thumbnails: {
                    url: string;
                    width: number;
                    height: number;
                }[];
            };
        };
    }>>;
    detailedMetadataSnippets: z.ZodOptional<z.ZodArray<z.ZodObject<{
        snippetText: z.ZodObject<{
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
    }, "strip", z.ZodTypeAny, {
        snippetText: {
            runs: {
                text: string;
            }[];
        };
    }, {
        snippetText: {
            runs: {
                text: string;
            }[];
        };
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    title: {
        runs: {
            text: string;
        }[];
        accessibility: {
            accessibilityData: {
                label: string;
            };
        };
    };
    thumbnail: {
        thumbnails: {
            url: string;
            width: number;
            height: number;
        }[];
    };
    videoId: string;
    longBylineText: {
        runs: {
            text: string;
        }[];
    };
    viewCountText: {
        simpleText?: string | undefined;
    };
    ownerText: {
        runs: {
            text: string;
        }[];
    };
    shortBylineText: {
        runs: {
            text: string;
        }[];
    };
    shortViewCountText: {
        accessibility?: {
            accessibilityData: {
                label: string;
            };
        } | undefined;
        simpleText?: string | undefined;
    };
    channelThumbnailSupportedRenderers: {
        channelThumbnailWithLinkRenderer: {
            thumbnail: {
                thumbnails: {
                    url: string;
                    width: number;
                    height: number;
                }[];
            };
        };
    };
    thumbnailOverlays: {
        thumbnailOverlayTimeStatusRenderer?: {
            style: string;
            text: {
                simpleText: string;
                accessibility?: {
                    accessibilityData: {
                        label: string;
                    };
                } | undefined;
            };
        } | undefined;
    }[];
    publishedTimeText?: {
        simpleText: string;
    } | undefined;
    lengthText?: {
        accessibility: {
            accessibilityData: {
                label: string;
            };
        };
        simpleText: string;
    } | undefined;
    ownerBadges?: {
        metadataBadgeRenderer: {
            style: string;
            tooltip: string;
        };
    }[] | undefined;
    richThumbnail?: {
        movingThumbnailRenderer: {
            movingThumbnailDetails: {
                thumbnails: {
                    url: string;
                    width: number;
                    height: number;
                }[];
            };
        };
    } | undefined;
    detailedMetadataSnippets?: {
        snippetText: {
            runs: {
                text: string;
            }[];
        };
    }[] | undefined;
}, {
    title: {
        runs: {
            text: string;
        }[];
        accessibility: {
            accessibilityData: {
                label: string;
            };
        };
    };
    thumbnail: {
        thumbnails: {
            url: string;
            width: number;
            height: number;
        }[];
    };
    videoId: string;
    longBylineText: {
        runs: {
            text: string;
        }[];
    };
    viewCountText: {
        simpleText?: string | undefined;
    };
    ownerText: {
        runs: {
            text: string;
        }[];
    };
    shortBylineText: {
        runs: {
            text: string;
        }[];
    };
    shortViewCountText: {
        accessibility?: {
            accessibilityData: {
                label: string;
            };
        } | undefined;
        simpleText?: string | undefined;
    };
    channelThumbnailSupportedRenderers: {
        channelThumbnailWithLinkRenderer: {
            thumbnail: {
                thumbnails: {
                    url: string;
                    width: number;
                    height: number;
                }[];
            };
        };
    };
    thumbnailOverlays: {
        thumbnailOverlayTimeStatusRenderer?: {
            style: string;
            text: {
                simpleText: string;
                accessibility?: {
                    accessibilityData: {
                        label: string;
                    };
                } | undefined;
            };
        } | undefined;
    }[];
    publishedTimeText?: {
        simpleText: string;
    } | undefined;
    lengthText?: {
        accessibility: {
            accessibilityData: {
                label: string;
            };
        };
        simpleText: string;
    } | undefined;
    ownerBadges?: {
        metadataBadgeRenderer: {
            style: string;
            tooltip: string;
        };
    }[] | undefined;
    richThumbnail?: {
        movingThumbnailRenderer: {
            movingThumbnailDetails: {
                thumbnails: {
                    url: string;
                    width: number;
                    height: number;
                }[];
            };
        };
    } | undefined;
    detailedMetadataSnippets?: {
        snippetText: {
            runs: {
                text: string;
            }[];
        };
    }[] | undefined;
}>;
export type VideoRenderer = z.infer<typeof VideoRendererSchema>;
//# sourceMappingURL=video.d.ts.map