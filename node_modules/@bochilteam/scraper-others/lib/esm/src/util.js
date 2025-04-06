import { createHmac } from 'crypto';
const SECRET = 'ad3917e2db125d8620804331bf74bde6';
export function generateMusixmatchHash(url) {
    const d = new Date();
    const year = d.getUTCFullYear().toString();
    const month = serializeDate(d.getUTCMonth() + 1);
    const date = serializeDate(d.getUTCDate());
    console.log({ year, month, date });
    const hmac = createHmac('sha256', SECRET);
    hmac.update(url + year + month + date);
    return hmac.digest('base64');
}
export function serializeDate(d) {
    const repetition = 2;
    return ("0".repeat(repetition) + d).slice(-repetition);
}
