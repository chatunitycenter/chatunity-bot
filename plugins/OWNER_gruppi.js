const handler = async (m, { conn }) => {
    try {
        if (!global.db?.data?.chats) throw new Error("Database non disponibile");
        
        let txt = `𝐋𝐈𝐒𝐓𝐀 𝐃𝐄𝐈 𝐆𝐑𝐔𝐏𝐏𝐈 𝐃𝐈 ${nomebot}`;
        
        const groups = Object.entries(conn.chats)
            .filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats)
            .sort((a, b) => {
                const messagesA = global.db.data.chats[a[0]]?.messaggi || 0;
                const messagesB = global.db.data.chats[b[0]]?.messaggi || 0;
                return messagesB - messagesA;
            });

        if (!groups.length) return m.reply("Nessun gruppo attivo");

        txt += `\n\n➣ 𝐓𝐨𝐭𝐚𝐥𝐞 𝐆𝐫𝐮𝐩𝐩𝐢: ${groups.length}\n\n══════ ೋೋ══════\n`;

        for (let i = 0; i < groups.length; i++) {
            const [jid, chat] = groups[i];
            
            let metadata = {};
            try {
                metadata = conn.chats[jid]?.metadata || await conn.groupMetadata(jid) || {};
            } catch {}

            const participants = metadata.participants || [];
            const bot = participants.find(u => conn.decodeJid(u.id) === conn.user.jid) || {};
            const isAdmin = !!bot.admin;
            const total = participants.length;

            let name = 'Nome non disponibile';
            try { name = await conn.getName(jid); } catch {}

            const messages = global.db.data.chats[jid]?.messaggi || 0;

            let link = 'Non sono admin';
            if (isAdmin) {
                try {
                    const code = await conn.groupInviteCode(jid);
                    link = code ? `https://chat.whatsapp.com/${code}` : 'Errore';
                } catch {}
            }

            txt += `➣ 𝐆𝐑𝐔𝐏𝐏Ꮻ 𝐍𝐔𝐌𝚵𝐑Ꮻ: ${i + 1}\n`;
            txt += `➣ 𝐆𝐑𝐔𝐏𝐏Ꮻ: ${name}\n`;
            txt += `➣ 𝐏𝚲𝐑𝐓𝚵𝐂𝕀𝐏𝚲𝐍𝐓𝕐: ${total}\n`;
            txt += `➣ 𝐌𝚵𝐒𝐒𝚲𝐆𝐆𝕀: ${messages}\n`;
            txt += `➣ 𝚲𝐃𝐌𝕀𝐍: ${isAdmin ? '✓' : '☓'}\n`;
            txt += `➣ 𝕀𝐃: ${jid}\n`;
            txt += `➣ 𝐋𝕀𝐍𝐊: ${link}\n\n══════ ೋೋ══════\n`;
        }

        m.reply(txt.trim());

    } catch (err) {
        console.error('[ERRORE LISTGRUPPI]', err);
        m.reply("Errore durante il recupero della lista gruppi.");
    }
};

handler.command = /^(listgruppi)$/i;
handler.owner = true;

export default handler;