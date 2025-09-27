let handler = async (m, { conn, usedPrefix }) => {
    let who = m.mentionedJid[0] || m.quoted?.sender || m.sender;

    if (!(who in global.db.data.users)) {
        return m.reply(`*L'utente non è presente nel database.*`);
    }

    let user = global.db.data.users[who];
    
    // Inizializzazione sicura
    user.bank = Number(user.bank) || 0;

    let message = `${who === m.sender 
        ? `💰 𝐡𝐚𝐢 *${user.bank} 💶 𝐮𝐧𝐢𝐭𝐲𝐜𝐨𝐢𝐧* 𝐢𝐧 𝐛𝐚𝐧𝐜𝐚🏛️.` 
        : `💰 𝐢𝐥 𝐛𝐫𝐨 @${who.split('@')[0]} 𝐚
   𝐡𝐚 *${user.bank} 💶 𝐮𝐧𝐢𝐭𝐲𝐜𝐨𝐢𝐧* 𝐢𝐧 𝐛𝐚𝐧𝐜𝐚🏛️.`}`;

    // Invia l'immagine cubank.jpg
    await conn.sendMessage(m.chat, {
        image: { url: 'icone/cubank.jpg' },
        caption: message,
        contextInfo: {
            forwardingScore: 99,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363422724720651@newsletter',
                serverMessageId: '',
                newsletterName: 'ChatUnity'
            }
        }
    }, { quoted: m });
};

handler.help = ['bank'];
handler.tags = ['rpg'];
handler.command = ['bank', 'banca'];
handler.register = true;
export default handler;