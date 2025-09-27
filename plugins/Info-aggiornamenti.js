import { performance } from 'perf_hooks';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const handler = async (message, { conn }) => {
    const newsText = `*RILASCIO V6.1*\n\n`
                  + `📅 *Data:* 18/08 \n`
                  + `🆕 *Aggiornamenti principali:*\n`
                  + `• Nuovo comando social\n`
                  + `• Ottimizzato i log su console\n`
                  + `• Ottimizzato aggiorna\n`
                  + `• nuova interfaccia dox\n`
                  + `• nuovi staffer: giusemd & anubi\n`
                  + `• *Cambio gestione security transato a DEATH:*\n`
                  + `  - Nuove funzionalità in security\n`
                  + `  - Ristrutturazione completa del progetto\n`
                  + `• Preparazione per V7.0 con nuove funzionalità\n\n`;

    await conn.sendMessage(
        message.chat,
        { text: newsText },
        { quoted: message }
    );
};

handler.help = ['novita'];
handler.tags = ['info'];
handler.command = /^(novita|aggiornamenti|novità)$/i;

export default handler;
