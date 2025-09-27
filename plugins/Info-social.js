import { performance } from 'perf_hooks';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const handler = async (message, { conn, usedPrefix, command }) => {
    const socialText = `*📱 SOCIAL CHATUNITY*\n\n`
                    + `🌍 *Instagram:*\n`
                    + `https://instagram.com/chatunity_\n\n`
                    + `📢 *TikTok:*\n`
                    + `https://www.tiktok.com/@chatunitycenter\n\n`
                    + `💬 *GitHub:*\n`
                    + `https://github.com/chatunitycenter\n\n`

    await conn.sendMessage(
        message.chat,
        { text: socialText },
        { quoted: message }
    );
};

handler.help = ['social'];
handler.tags = ['info'];
handler.command = /^(social|socials)$/i;

export default handler;
