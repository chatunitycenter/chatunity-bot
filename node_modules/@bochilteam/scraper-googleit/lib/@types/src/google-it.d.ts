export default function googleit(query: string, page?: number): Promise<{
    related: string[];
    articles: {
        title: string;
        description: string;
        header: string;
        url: string;
        iconBase64?: string | undefined;
        thumbnail?: string | undefined;
        gif?: string | undefined;
        footer?: string | undefined;
    }[];
    title?: string | undefined;
    type?: string | undefined;
    description?: string | undefined;
}>;
//# sourceMappingURL=google-it.d.ts.map