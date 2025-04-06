import { JadwalSholat } from '../types/index.js';
export declare const listJadwalSholat: Promise<{
    value: string;
    kota: string;
}[]>;
/**
 * Scrape from https://www.jadwalsholat.org/
 */
export default function jadwalsholat(kota: string): Promise<JadwalSholat>;
//# sourceMappingURL=jadwalsholat.d.ts.map