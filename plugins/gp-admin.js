const handler = async (m, { conn, participants, groupMetadata, args, isOwner, isAdmin }) => {//non dimenticarti di pregare
    const cooldownInMilliseconds = 18 * 60 * 60 * 1000;
    if (!isOwner && !isAdmin) {
        const lastUsed = handler.cooldowns.get(m.sender) || 0;
        const now = Date.now();
        if (now - lastUsed < cooldownInMilliseconds) {
            const timeLeft = cooldownInMilliseconds - (now - lastUsed);
            const hours = Math.floor(timeLeft / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            const timeString = `${hours > 0 ? `${hours} ore, ` : ''}${minutes > 0 ? `${minutes} minuti e ` : ''}${seconds} secondi`;
            await m.reply(`Un altro ancora? sei un po' sospetto uh 🤨`);
            return;
        }
        handler.cooldowns.set(m.sender, now);
    }
    const foto = await conn.profilePictureUrl(m.chat, 'image').catch((_) => null) || './media/menu/varebotcoc.jpg';
    const adminGruppo = participants.filter((p) => p.admin);
    const mentionList = adminGruppo.map(p => p.id);
    const messaggioUtente = args.join` `;
    const testo = `ㅤㅤ⋆｡˚『 🔔 ╭ \`ADMINS\` ╯ 』˚｡⋆\n\n${mentionList.map((jid, index) => `『 *${index + 1}.* 』@${jid.split('@')[0]}`).join('\n')}\n\n『 🍥 』 \`Messaggio:\` » ${messaggioUtente}\n\n> Questo comando può essere eseguito solo se hai qualche problema o è successo qualcosa, se lo usi con altre intenzioni verrai *rimosso* dal gruppo.`.trim();

    await conn.sendMessage(m.chat, {
        text: testo,
        contextInfo: {
            mentionedJid: mentionList,
            externalAdReply: {
                title: groupMetadata.subject,
                body: "『 🛎️ 』 invocando gli admin",
                thumbnailUrl: foto,
                mediaType: 1,
                renderLargerThumbnail: false
            }
        }
    }, { quoted: m });
};

// Inizializza la mappa per i cooldown
handler.cooldowns = new Map();

handler.help = ['admins <testo>'];
handler.tags = ['gruppo'];
handler.command = /^(admins|@admins|admin)$/i;
handler.group = true;

// Aggiungi la proprietà 'cooldown' al gestore
handler.cooldown = 18 * 60 * 60 * 1000; // 18 ore

export default handler;