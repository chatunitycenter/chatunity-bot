import { z } from 'zod';
export declare const KodePosArgsSchema: z.ZodObject<{
    0: z.ZodString;
}, "strip", z.ZodTypeAny, {
    0: string;
}, {
    0: string;
}>;
export declare const KodePosSchema: z.ZodArray<z.ZodObject<{
    kodepos: z.ZodString;
    desa: z.ZodString;
    kecamatan: z.ZodString;
    kota: z.ZodString;
    provinsi: z.ZodString;
}, "strip", z.ZodTypeAny, {
    kodepos: string;
    desa: string;
    kecamatan: string;
    kota: string;
    provinsi: string;
}, {
    kodepos: string;
    desa: string;
    kecamatan: string;
    kota: string;
    provinsi: string;
}>, "many">;
export type KodePos = z.infer<typeof KodePosSchema>;
//# sourceMappingURL=kodepos.d.ts.map