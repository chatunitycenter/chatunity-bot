import { z } from 'zod';
declare const ItemSectionRendererContentSchema: z.ZodObject<{
    videoRenderer: z.ZodOptional<z.ZodObject<{
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
    }>>;
    channelRenderer: z.ZodOptional<z.ZodObject<{
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
    }>>;
}, "strip", z.ZodTypeAny, {
    videoRenderer?: {
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
    } | undefined;
    channelRenderer?: {
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
    } | undefined;
}, {
    videoRenderer?: {
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
    } | undefined;
    channelRenderer?: {
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
    } | undefined;
}>;
export type ItemSectionRendererContent = z.infer<typeof ItemSectionRendererContentSchema>;
export declare const YoutubeSearchResponseSchema: z.ZodObject<{
    contents: z.ZodObject<{
        twoColumnSearchResultsRenderer: z.ZodObject<{
            primaryContents: z.ZodObject<{
                sectionListRenderer: z.ZodObject<{
                    contents: z.ZodArray<z.ZodObject<{
                        itemSectionRenderer: z.ZodOptional<z.ZodObject<{
                            contents: z.ZodArray<z.ZodObject<{
                                videoRenderer: z.ZodOptional<z.ZodObject<{
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
                                }>>;
                                channelRenderer: z.ZodOptional<z.ZodObject<{
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
                                }>>;
                            }, "strip", z.ZodTypeAny, {
                                videoRenderer?: {
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
                                } | undefined;
                                channelRenderer?: {
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
                                } | undefined;
                            }, {
                                videoRenderer?: {
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
                                } | undefined;
                                channelRenderer?: {
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
                                } | undefined;
                            }>, "many">;
                        }, "strip", z.ZodTypeAny, {
                            contents: {
                                videoRenderer?: {
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
                                } | undefined;
                                channelRenderer?: {
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
                                } | undefined;
                            }[];
                        }, {
                            contents: {
                                videoRenderer?: {
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
                                } | undefined;
                                channelRenderer?: {
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
                                } | undefined;
                            }[];
                        }>>;
                    }, "strip", z.ZodTypeAny, {
                        itemSectionRenderer?: {
                            contents: {
                                videoRenderer?: {
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
                                } | undefined;
                                channelRenderer?: {
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
                                } | undefined;
                            }[];
                        } | undefined;
                    }, {
                        itemSectionRenderer?: {
                            contents: {
                                videoRenderer?: {
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
                                } | undefined;
                                channelRenderer?: {
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
                                } | undefined;
                            }[];
                        } | undefined;
                    }>, "many">;
                }, "strip", z.ZodTypeAny, {
                    contents: {
                        itemSectionRenderer?: {
                            contents: {
                                videoRenderer?: {
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
                                } | undefined;
                                channelRenderer?: {
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
                                } | undefined;
                            }[];
                        } | undefined;
                    }[];
                }, {
                    contents: {
                        itemSectionRenderer?: {
                            contents: {
                                videoRenderer?: {
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
                                } | undefined;
                                channelRenderer?: {
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
                                } | undefined;
                            }[];
                        } | undefined;
                    }[];
                }>;
            }, "strip", z.ZodTypeAny, {
                sectionListRenderer: {
                    contents: {
                        itemSectionRenderer?: {
                            contents: {
                                videoRenderer?: {
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
                                } | undefined;
                                channelRenderer?: {
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
                                } | undefined;
                            }[];
                        } | undefined;
                    }[];
                };
            }, {
                sectionListRenderer: {
                    contents: {
                        itemSectionRenderer?: {
                            contents: {
                                videoRenderer?: {
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
                                } | undefined;
                                channelRenderer?: {
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
                                } | undefined;
                            }[];
                        } | undefined;
                    }[];
                };
            }>;
        }, "strip", z.ZodTypeAny, {
            primaryContents: {
                sectionListRenderer: {
                    contents: {
                        itemSectionRenderer?: {
                            contents: {
                                videoRenderer?: {
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
                                } | undefined;
                                channelRenderer?: {
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
                                } | undefined;
                            }[];
                        } | undefined;
                    }[];
                };
            };
        }, {
            primaryContents: {
                sectionListRenderer: {
                    contents: {
                        itemSectionRenderer?: {
                            contents: {
                                videoRenderer?: {
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
                                } | undefined;
                                channelRenderer?: {
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
                                } | undefined;
                            }[];
                        } | undefined;
                    }[];
                };
            };
        }>;
    }, "strip", z.ZodTypeAny, {
        twoColumnSearchResultsRenderer: {
            primaryContents: {
                sectionListRenderer: {
                    contents: {
                        itemSectionRenderer?: {
                            contents: {
                                videoRenderer?: {
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
                                } | undefined;
                                channelRenderer?: {
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
                                } | undefined;
                            }[];
                        } | undefined;
                    }[];
                };
            };
        };
    }, {
        twoColumnSearchResultsRenderer: {
            primaryContents: {
                sectionListRenderer: {
                    contents: {
                        itemSectionRenderer?: {
                            contents: {
                                videoRenderer?: {
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
                                } | undefined;
                                channelRenderer?: {
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
                                } | undefined;
                            }[];
                        } | undefined;
                    }[];
                };
            };
        };
    }>;
}, "strip", z.ZodTypeAny, {
    contents: {
        twoColumnSearchResultsRenderer: {
            primaryContents: {
                sectionListRenderer: {
                    contents: {
                        itemSectionRenderer?: {
                            contents: {
                                videoRenderer?: {
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
                                } | undefined;
                                channelRenderer?: {
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
                                } | undefined;
                            }[];
                        } | undefined;
                    }[];
                };
            };
        };
    };
}, {
    contents: {
        twoColumnSearchResultsRenderer: {
            primaryContents: {
                sectionListRenderer: {
                    contents: {
                        itemSectionRenderer?: {
                            contents: {
                                videoRenderer?: {
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
                                } | undefined;
                                channelRenderer?: {
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
                                } | undefined;
                            }[];
                        } | undefined;
                    }[];
                };
            };
        };
    };
}>;
export declare const YoutubeSearchArgsSchema: z.ZodObject<{
    0: z.ZodString;
}, "strip", z.ZodTypeAny, {
    0: string;
}, {
    0: string;
}>;
export declare const YoutubeSearchVideoSchema: z.ZodObject<{
    videoId: z.ZodString;
    url: z.ZodString;
    title: z.ZodString;
    thumbnail: z.ZodString;
    description: z.ZodString;
    movingThumbnail: z.ZodString;
    channelName: z.ZodString;
    channelAvatar: z.ZodString;
    isChannelVerified: z.ZodBoolean;
    publishedTime: z.ZodString;
    viewH: z.ZodString;
    view: z.ZodNumber;
    durationH: z.ZodString;
    duration: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    title: string;
    thumbnail: string;
    duration: number;
    url: string;
    videoId: string;
    description: string;
    movingThumbnail: string;
    channelName: string;
    channelAvatar: string;
    isChannelVerified: boolean;
    publishedTime: string;
    viewH: string;
    view: number;
    durationH: string;
}, {
    title: string;
    thumbnail: string;
    duration: number;
    url: string;
    videoId: string;
    description: string;
    movingThumbnail: string;
    channelName: string;
    channelAvatar: string;
    isChannelVerified: boolean;
    publishedTime: string;
    viewH: string;
    view: number;
    durationH: string;
}>;
export type YoutubeSearchVideo = z.infer<typeof YoutubeSearchVideoSchema>;
export declare const YoutubeSearchChannelSchema: z.ZodObject<{
    channelId: z.ZodString;
    url: z.ZodString;
    channelName: z.ZodString;
    username: z.ZodString;
    avatar: z.ZodString;
    isChannelVerified: z.ZodBoolean;
    subscriberH: z.ZodString;
    description: z.ZodString;
}, "strip", z.ZodTypeAny, {
    url: string;
    username: string;
    channelId: string;
    description: string;
    channelName: string;
    isChannelVerified: boolean;
    avatar: string;
    subscriberH: string;
}, {
    url: string;
    username: string;
    channelId: string;
    description: string;
    channelName: string;
    isChannelVerified: boolean;
    avatar: string;
    subscriberH: string;
}>;
export type YoutubeSearchChannel = z.infer<typeof YoutubeSearchChannelSchema>;
export declare const YoutubeSearchSchema: z.ZodObject<{
    video: z.ZodArray<z.ZodObject<{
        videoId: z.ZodString;
        url: z.ZodString;
        title: z.ZodString;
        thumbnail: z.ZodString;
        description: z.ZodString;
        movingThumbnail: z.ZodString;
        channelName: z.ZodString;
        channelAvatar: z.ZodString;
        isChannelVerified: z.ZodBoolean;
        publishedTime: z.ZodString;
        viewH: z.ZodString;
        view: z.ZodNumber;
        durationH: z.ZodString;
        duration: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        title: string;
        thumbnail: string;
        duration: number;
        url: string;
        videoId: string;
        description: string;
        movingThumbnail: string;
        channelName: string;
        channelAvatar: string;
        isChannelVerified: boolean;
        publishedTime: string;
        viewH: string;
        view: number;
        durationH: string;
    }, {
        title: string;
        thumbnail: string;
        duration: number;
        url: string;
        videoId: string;
        description: string;
        movingThumbnail: string;
        channelName: string;
        channelAvatar: string;
        isChannelVerified: boolean;
        publishedTime: string;
        viewH: string;
        view: number;
        durationH: string;
    }>, "many">;
    channel: z.ZodArray<z.ZodObject<{
        channelId: z.ZodString;
        url: z.ZodString;
        channelName: z.ZodString;
        username: z.ZodString;
        avatar: z.ZodString;
        isChannelVerified: z.ZodBoolean;
        subscriberH: z.ZodString;
        description: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        url: string;
        username: string;
        channelId: string;
        description: string;
        channelName: string;
        isChannelVerified: boolean;
        avatar: string;
        subscriberH: string;
    }, {
        url: string;
        username: string;
        channelId: string;
        description: string;
        channelName: string;
        isChannelVerified: boolean;
        avatar: string;
        subscriberH: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    video: {
        title: string;
        thumbnail: string;
        duration: number;
        url: string;
        videoId: string;
        description: string;
        movingThumbnail: string;
        channelName: string;
        channelAvatar: string;
        isChannelVerified: boolean;
        publishedTime: string;
        viewH: string;
        view: number;
        durationH: string;
    }[];
    channel: {
        url: string;
        username: string;
        channelId: string;
        description: string;
        channelName: string;
        isChannelVerified: boolean;
        avatar: string;
        subscriberH: string;
    }[];
}, {
    video: {
        title: string;
        thumbnail: string;
        duration: number;
        url: string;
        videoId: string;
        description: string;
        movingThumbnail: string;
        channelName: string;
        channelAvatar: string;
        isChannelVerified: boolean;
        publishedTime: string;
        viewH: string;
        view: number;
        durationH: string;
    }[];
    channel: {
        url: string;
        username: string;
        channelId: string;
        description: string;
        channelName: string;
        isChannelVerified: boolean;
        avatar: string;
        subscriberH: string;
    }[];
}>;
export type YoutubeSearch = z.infer<typeof YoutubeSearchSchema>;
export {};
//# sourceMappingURL=index.d.ts.map