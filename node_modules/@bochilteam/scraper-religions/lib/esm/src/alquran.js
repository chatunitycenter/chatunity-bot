import got from 'got';
import { AlQuranSchema } from '../types/index.js';
/**
 * Inspiration from https://github.com/rzkytmgr/quran-api
 */
export async function alquran() {
    const data = await got('https://github.com/rzkytmgr/quran-api/raw/deprecated/data/quran.json').json();
    return data.map(item => AlQuranSchema.parse(item));
}
