// Plugins Di Gabs333 - Velocizzato
let handler = async (m, { conn }) => {
    let who = m.mentionedJid?.[0] || m.quoted?.sender || m.sender;
    if (who === conn.user.jid) return m.reply('🚫 Impossibile ottenere la foto profilo del bot.');
    try {
        let pic = await conn.profilePictureUrl(who, 'image');
        conn.sendMessage(m.chat, { image: { url: pic }, caption: '📸' }, { quoted: m, mentions: [who] });
    } catch {
        m.reply(`@${who.split('@')[0]} non ha una foto profilo 🚫`, null, { mentions: [who] });
    }
};
handler.command = /^(pic)$/i;
handler.group = true;
handler.admin = true;
export default handler;                         
