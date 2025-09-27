import { performance } from 'perf_hooks';
import fetch from 'node-fetch'; // Assicurati di avere node-fetch installato

const handler = async (message, { conn, usedPrefix }) => {
    const userCount = Object.keys(global.db.data.users).length;
    const botName = global.db.data.nomedelbot || 'ChatUnity';

    const menuText = generateMenuText(usedPrefix, botName, userCount);
    
    const messageOptions = {
        contextInfo: {
            forwardingScore: 1,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363422724720651@newsletter',
                serverMessageId: '',
                newsletterName: `${botName}`
            },
        }
    };

    // Invia la foto con il menu
    const imagePath = './termini.jpeg';
    await conn.sendMessage(message.chat, { image: { url: imagePath }, caption: menuText, ...messageOptions }, { quoted: message });
};

async function fetchThumbnail(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const arrayBuffer = await response.arrayBuffer();
        return new Uint8Array(arrayBuffer);
    } catch (error) {
        console.error('Errore durante il fetch della thumbnail:', error);
        return 'default-thumbnail'; // Fallback thumbnail in caso di errore
    }
}

handler.help = ['FAQ'];
handler.tags = ['info'];
handler.command = /^(candidati)$/i;

export default handler;

function generateMenuText(prefix, botName, userCount) {
    return `
🚀 𝐕𝐮𝐨𝐢 𝐞𝐧𝐭𝐫𝐚𝐫𝐞 𝐚 𝐟𝐚𝐫 𝐩𝐚𝐫𝐭𝐞 𝐝𝐞𝐥𝐥𝐨 𝐬𝐭𝐚𝐟𝐟 𝐝𝐢 𝐂𝐡𝐚𝐭𝐔𝐧𝐢𝐭𝐲, fare esperienza e essere riconosciuto come staffer?🚀

Questo è il tuo momento! 𝐂𝐨𝐦𝐩𝐢𝐥𝐚 𝐢𝐥 𝐦𝐨𝐝𝐮𝐥𝐨 𝐪𝐮𝐢 𝐬𝐨𝐭𝐭𝐨 (𝐫𝐢𝐦𝐚𝐫𝐫𝐚̀ 𝐚𝐧𝐨𝐧𝐢𝐦𝐨) per candidarti e mostrare le tue competenze.

🔥 𝐂𝐨𝐬𝐚 𝐭𝐢 𝐚𝐬𝐩𝐞𝐭𝐭𝐚:

•	𝐑𝐢𝐜𝐨𝐧𝐨𝐬𝐜𝐞𝐧𝐳𝐚 𝐧𝐞𝐥 𝐛𝐨𝐭 𝐜𝐨𝐦𝐞 𝐜𝐨𝐥𝐥𝐚𝐛𝐨𝐫𝐚𝐭𝐨𝐫𝐞
•	𝐅𝐚𝐫𝐞 𝐞𝐬𝐩𝐞𝐫𝐢𝐞𝐧𝐳𝐚 diretta nel mondo dei bot e della gestione comunitaria
•	𝐀𝐜𝐜𝐞𝐬𝐬𝐨 𝐞𝐬𝐜𝐥𝐮𝐬𝐢𝐯𝐨 ai Bot Beta
•	𝐂𝐨𝐥𝐥𝐚𝐛𝐨𝐫𝐚𝐳𝐢𝐨𝐧𝐞 𝐝𝐢𝐫𝐞𝐭𝐭𝐚 con il team di ChatUnity

Non perdere questa occasione, 𝐜𝐚𝐧𝐝𝐢𝐝𝐚𝐭𝐢 𝐬𝐮𝐛𝐢𝐭𝐨  e dimostra di avere quello che serve!

> 📋 𝐌𝐨𝐝𝐮𝐥𝐨 𝐝𝐢 𝐜𝐚𝐧𝐝𝐢𝐭𝐚𝐭𝐮𝐫𝐚:
https://docs.google.com/forms/d/e/1FAIpQLSd4no8yx-QuRf7xFyIcLYHLSNkF2cRaHvsO_prmlIwdKqBC4Q/viewform?usp=dialog
`.trim();
}
