//Plugin by Gabs333 Velocizzato

const handler = async (m, { conn, isAdmin, isBotAdmin, command }) => {
    try {
        if (command === 'antibestemmia') {
            if (!m.isGroup) throw new Error('Questo comando funziona solo nei gruppi!');
            if (!isAdmin) throw new Error('Solo gli admin possono usare questo comando!');
            
            global.db.data.chats[m.chat] = global.db.data.chats[m.chat] || {};
            global.db.data.chats[m.chat].antibestemmie = !global.db.data.chats[m.chat].antibestemmie;
            
            return m.reply(`Anti-bestemmie ${global.db.data.chats[m.chat].antibestemmie ? 'attivato' : 'disattivato'}!`);
        }
    } catch (e) {
        return m.reply(e.message);
    }
};

export async function before(m, { isAdmin, isBotAdmin, conn }) {
    try {
        if (m.isBaileys && m.fromMe) return true;
        if (!m.isGroup || !global.db.data.chats?.[m.chat]?.antibestemmie || isAdmin || !isBotAdmin || typeof m.text !== 'string') return;

        const sender = m.sender;
        const cacheKey = `bestemmia:${sender}:${m.text.toLowerCase().trim()}`;

        if (global.cache?.[cacheKey]) return;
        if (!/d[i1!][o0]|porc|madonn|crist|ges[uù]/i.test(m.text)) return;

        const response = await fetch(`https://deliriusapi-official.vercel.app/ia/gptweb?text=${encodeURIComponent(m.text)}&lang=it`);
        if (!response.ok) throw new Error(`API error: ${response.status}`);

        const data = await response.json();
        const isBestemmia = data.result?.includes("bestemmia");

        if (global.cache) global.cache[cacheKey] = isBestemmia;
        if (!isBestemmia) return;

        if (!global.db.data.users[sender]) {
            global.db.data.users[sender] = { warn: 0, lastWarn: 0 };
        }

        const user = global.db.data.users[sender];
        const now = Date.now();

        if (now - user.lastWarn > 86400000) user.warn = 0;

        user.warn++;
        user.lastWarn = now;

        await conn.sendMessage(m.chat, { delete: m.key });

        if (user.warn >= 3) {
            user.warn = 0;
            try {
                await conn.groupParticipantsUpdate(m.chat, [sender], 'remove');
                await conn.sendMessage(m.chat, { 
                    text: `⛔ *${m.pushName || 'Utente'} rimosso* per bestemmie ripetute (3 avvertimenti)`,
                    mentions: [sender]
                }, { quoted: m });
            } catch {
                await conn.sendMessage(m.chat, { 
                    text: `⚠️ Impossibile rimuovere l'utente per bestemmie. Controlla i permessi del bot.` 
                }, { quoted: m });
            }
        } else {
            const remaining = 3 - user.warn;
            await conn.sendMessage(m.chat, { 
                text: `⚠️ *Avvertimento ${user.warn}/3* a ${m.pushName || 'Utente'} per bestemmia!\n⚠️ *Mancano ${remaining} avvertimenti* prima del ban.`,
                mentions: [sender]
            }, { quoted: m });
        }

    } catch (error) {
        const localCheck = /d[i1!][o0][\s\W]?[^a-z]|porc[o0]|madonn|crist|ges[uù]/i.test(m.text);
        if (localCheck) {
            await conn.sendMessage(m.chat, { delete: m.key });
            await conn.sendMessage(m.chat, { 
                text: `⚠️ Messaggio eliminato per possibile contenuto inappropriato.` 
            }, { quoted: m });
        }
    }

    return true;
};

handler.before = before;
handler.command = ['antibestemmia'];
handler.tags = ['group'];
handler.help = ['antibestemmia (attiva/disattiva il filtro bestemmie)'];
handler.admin = true;
handler.group = true;

export default handler;