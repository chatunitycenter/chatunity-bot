import { z } from 'zod';
export declare const MediafiredlArgsSchema: z.ZodObject<{
    0: z.ZodString;
}, "strip", z.ZodTypeAny, {
    0: string;
}, {
    0: string;
}>;
export declare const MediafiredlSchema: z.ZodObject<{
    url: z.ZodString;
    url2: z.ZodString;
    filename: z.ZodString;
    filetype: z.ZodString;
    ext: z.ZodString;
    aploud: z.ZodString;
    filesizeH: z.ZodString;
    filesize: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    url: string;
    url2: string;
    filename: string;
    filetype: string;
    ext: string;
    aploud: string;
    filesizeH: string;
    filesize: number;
}, {
    url: string;
    url2: string;
    filename: string;
    filetype: string;
    ext: string;
    aploud: string;
    filesizeH: string;
    filesize: number;
}>;
export type Mediafiredl = z.infer<typeof MediafiredlSchema>;
//# sourceMappingURL=mediafire-dl.d.ts.map