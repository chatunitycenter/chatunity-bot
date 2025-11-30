const handler = async (m, { conn, text, command, usedPrefix }) => {
    try {
        const target = getTargetUser(m, text);
        
        if (!target) {
            return m.reply(createUsageMessage(usedPrefix, command));
        }
        const groupMembers = m.isGroup ? (await conn.groupMetadata(m.chat)).participants.map(p => p.id) : [];
        if (m.isGroup && !groupMembers.includes(target)) {
             return m.reply(`『 ❌ 』 *L'utente con il numero ${target.split('@')[0]} non è un membro di questo gruppo.*`);
        }
        
        const reason = getReason(m, text, target);

        if (target === conn.user.jid) {
            return m.reply('『 ‼️ 』 *Perche vorresti warnare il bot negretto????*');
        }
        if (global.owner.some(owner => owner[0] === target.split('@')[0])) {
            return m.reply('🤨 A chi vuoi warnare scs???');
        }

        const user = getUserData(target);
        if (!user.warns) user.warns = {};
        if (typeof user.warns[m.chat] !== 'number') user.warns[m.chat] = 0;

        user.warns[m.chat] += 1;
        const remainingWarns = user.warns[m.chat];
        if (remainingWarns >= 3) {
            user.warns[m.chat] = 0;
            await handleRemoval(conn, m, target);
        } else {
            await handleWarnMessage(conn, m, target, remainingWarns, reason);
        }
    } catch (error) {
        console.error('Errore nell\'handler warn:', error);
        return m.reply(`${global.errore}`);
    }
};

function getTargetUser(m, text) {
    if (m.isGroup) {
        return m.mentionedJid?.[0] || 
               (m.quoted?.sender) || 
               (text?.trim() && parseUserFromText(text.trim()));
    }
    return m.chat;
}

function parseUserFromText(text) {
    const cleaned = text.replace(/@/g, '').replace(/\s+/g, '');
    return cleaned.includes('@') ? cleaned : `${cleaned}@s.whatsapp.net`;
}
function getReason(m, text, target) {
    const targetId = target.split('@')[0];
    const regex = new RegExp(`@?${targetId}`, 'g');
    const reason = text.replace(regex, '').trim();
    return reason || 'Non specificato ma meritato';
}

function getUserData(userId) {
    if (!global.db.data.users[userId]) {
        global.db.data.users[userId] = {
            warns: {}
        };
    }
    return global.db.data.users[userId];
}

function createUsageMessage(usedPrefix, command) {
    return `
    ㅤㅤ⋆｡˚『 ╭ \`WARN\` ╯ 』˚｡⋆\n╭
│  『 📋 』 _*METODI DISPONIBILI:*_
│•  *\`Menziona:\`* *${usedPrefix + command} @utente*
│•  *\`Rispondi:\`* *Quotando un msg*
│•  *\`Numero:\`* *${usedPrefix + command} 393514357738*
│
*╰⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*`;
}

async function handleWarnMessage(conn, m, target, remainingWarns, reason) {
    const username = target.split('@')[0];
    const groupMeta = await conn.groupMetadata(m.chat);
    const groupName = groupMeta.subject;

    const emoji = remainingWarns === 1 ? '⚠️' : '🔔';
    
    const message = `『 ${emoji} 』 @${username}\n- _*Hai ricevuto un avvertimento*_
- *\`Motivo:\`* *${reason}*
- *\`Avvertimenti: ${remainingWarns}/3\`*`;
    
    const fkontak = await createUserFkontak(conn, target);
    
    await m.reply(message, null, { 
        mentions: [target],
        quoted: fkontak
    });
}

async function handleRemoval(conn, m, target) {
    const username = target.split('@')[0];
    const message = `『 🫄🏿 』 \`io ti avevo avvertito, ora sei arrivato a tre e non puoi piu redimerti, ciao ciao negro\` @${username}`;
    
    const fkontak = await createUserFkontak(conn, target);

    await m.reply(message, null, { 
        mentions: [target],
        quoted: fkontak
    });
    
    await conn.groupParticipantsUpdate(m.chat, [target], 'remove');
}

async function createUserFkontak(conn, target) {
    try {
        let username = target.split('@')[0];
        
        try {
            const contact = await conn.onWhatsApp(target);
            if (contact[0]?.notify) {
                username = contact[0].notify;
            }
        } catch {}
        
        return {
            key: {
                participants: '0@s.whatsapp.net',
                remoteJid: 'status@broadcast',
                fromMe: false,
                id: 'Halo'
            },
            message: {
                contactMessage: {
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:${username}\nitem1.TEL;waid=${target.split('@')[0]}:${target.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
                }
            },
            participant: '0@s.whatsapp.net'
        };
    } catch (error) {
        return null;
    }
}


handler.command = ['avverti', 'warn', 'avvertimento'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;