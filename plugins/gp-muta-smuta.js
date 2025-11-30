let mutedUsers = new Map();
let spamWarnings = new Map();

function formatTimeLeft(timestamp) {
    if (!timestamp) return '*∞ Permanente*'
    const diff = timestamp - Date.now()
    if (diff <= 0) return '*✅ Scaduto*'
    const minutes = Math.ceil(diff / 60000)
    if (minutes === 0) return '< 1 min'
    return `*${minutes} min*`
}

async function getUserProfilePic(conn, userId) {
    try {
        const pp = await conn.profilePictureUrl(userId, 'image')
        return pp
    } catch {
        return 'https://i.ibb.co/BKHtdBNp/default-avatar-profile-icon-1280x1280.jpg'
    }
}

function getUserName(userId, participants) {
    const participant = participants.find(p => p.id === userId)
    return participant?.notify || participant?.name || userId.split('@')[0]
}

let handler = async (m, { conn, command, args, participants }) => {
    const isMute = command === 'muta'
    const isUnmute = command === 'smuta'
    const isList = command === 'listamutati'

    if (isList) {
        if (!mutedUsers.size) {
            return m.reply(`ㅤㅤ⋆｡˚『 ╭ \`LISTA MUTATI\` ╯ 』˚｡⋆\n╭\n│ 『 📭 』 \`stato:\` *Nessun utente mutato*\n*╰⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*`)
        }
        
        let text = `ㅤㅤ⋆｡˚『 ╭ \`LISTA MUTATI\` ╯ 』˚｡⋆\n╭\n`
        for (let [user, data] of mutedUsers.entries()) {
            let timeLeft = formatTimeLeft(data.timestamp)
            text += `│ 『 🔇 』 @${user.split('@')[0]} - ${timeLeft}\n`
            text += `│ 『 📝 』 \`motivo:\` *${data.reason}*\n`
        }
        text += `*╰⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*`
        return conn.sendMessage(m.chat, { 
            text, 
            mentions: [...mutedUsers.keys()],
            contextInfo: { ...global.fake }
        })
    }

    let users = m.mentionedJid?.length ? m.mentionedJid : (m.quoted ? [m.quoted.sender] : [])
    if (!users.length) {
        return m.reply(`ㅤㅤ⋆｡˚『 ╭ \`USO COMANDO\` ╯ 』˚｡⋆\n╭\n│ 『 ❌』 \`formato:\` *${command} @user [minuti] [motivo]*\n│ 『 💡 』 \`oppure:\` *rispondi a un messaggio*\n*╰⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*`)
    }

    if (m.mentionedJid?.length) {
        for (const user of m.mentionedJid) {
            let username = '@' + user.split('@')[0]
            args = args.filter(arg => arg !== username)
        }
    }

    users = users.filter(u => participants.some(p => p.id === u))
    if (!users.length) {
        return m.reply(`ㅤㅤ⋆｡˚『 ╭ \`ERRORE\` ╯ 』˚｡⋆\n╭\n│ 『 ❌ 』 \`stato:\` *Utente non valido o non nel gruppo*\n*╰⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*`)
    }
    
    let time = 0
    let reason = 'motivo non specificato ma meritato'

    if (args.length) {
        let timeArg = args[0].toLowerCase()
        let timeMatch = timeArg.match(/^(\d+)(s|sec|m|min)?$/)

        if (timeMatch) {
            let value = parseInt(timeMatch[1])
            let unit = timeMatch[2] || 'm'

            if (unit.startsWith('s')) {
                time = value * 1000
            } else {
                time = value * 60000
            }
            reason = args.slice(1).join(' ') || reason
        } else {
            reason = args.join(' ')
        }
    }

    let results = []

    for (let user of users) {
        let isOwner = global.owner.map(([n]) => n + '@s.whatsapp.net').includes(user)
        
        if (isOwner && isMute) {
            mutedUsers.set(m.sender, {
                timestamp: Date.now() + (2 * 60000),
                reason: 'Hai provato a mutare un owner 👀',
                lastNotification: 0
            })
            return m.reply(`ㅤㅤ⋆｡˚『 ╭ \`PUNIZIONE\` ╯ 』˚｡⋆\n╭\n│ 『 👊 』 \`errore:\` *Non puoi mutare un owner*\n│ 『 🔇 』 \`punizione:\` *Sei mutato per 2 minuti*\n*╰⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*`)
        }

        if (isOwner && isUnmute) {
            return m.reply(`ㅤㅤ⋆｡˚『 ╭ \`ERRORE\` ╯ 』˚｡⋆\n╭\n│ 『 ❌ 』 \`stato:\` *Un owner non può essere mutato*\n│ 『 💡 』 \`info:\` *Operazione non necessaria*\n*╰⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*`)
        }

        if (user === conn.user.jid) {
            return m.reply(`ㅤㅤ⋆｡˚『 ╭ \`ERRORE\` ╯ 』˚｡⋆\n╭\n│ 『 ❌ 』 \`azione:\` *Non puoi ${command}re il bot*\n*╰⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*`)
        }

        if (isMute) {
            mutedUsers.set(user, {
                timestamp: time ? Date.now() + time : 0,
                reason,
                lastNotification: 0
            })
        } else if (isUnmute) {
            if (!mutedUsers.has(user)) {
                return m.reply(`ㅤㅤ⋆｡˚『 ╭ \`INFO\` ╯ 』˚｡⋆\n╭\n│ 『 💡 』 \`stato:\` *@${user.split('@')[0]} non è mutato*\n*╰⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*`)
            }
            mutedUsers.delete(user)
        }

        results.push(`@${user.split('@')[0]}`)
    }

    const targetUser = users[0]
    const userName = getUserName(targetUser, participants)
    const userPp = await getUserProfilePic(conn, targetUser)

    let msg = `ㅤㅤ⋆｡˚『 ╭ \`AZIONE COMPLETATA\` ╯ 』˚｡⋆\n╭\n`
    msg += `│ 『 👤 』 \`utenti:\` *${results.join(', ')}*\n`
    msg += `│ 『 ⚡ 』 \`azione:\` *${isMute ? 'mutato' : 'smutato'}*\n`
    if (isMute) {
        msg += time ? `│ 『 ⏱️ 』 \`durata:\` *${time / 60000} minuti*\n` : `│ 『 ⏱️ 』 \`durata:\` *∞ Permanente*\n`
    }
    msg += `│ 『 📝 』 \`motivo:\` *${reason}*\n`
    msg += `*╰⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*`

    await conn.sendMessage(m.chat, {
        text: msg,
        mentions: users,
        contextInfo: {
            ...global.fake.contextInfo,
            externalAdReply: {
                ...global.fake.contextInfo,
                title: userName,
                body: `${targetUser.split('@')[0]} - ${isMute ? (time ? `mutato per ${time / 60000} min` : 'mutato permanentemente') : 'smutato'}`,
                thumbnailUrl: userPp,
                mediaType: 1,
                renderLargerThumbnail: false
            }
        }
    })
}

handler.before = async (m, { conn, isCommand }) => {
    if (!m.sender || m.sender === conn.user.jid) return
    
    if (!mutedUsers.has(m.sender)) return

    const data = mutedUsers.get(m.sender)
    
    if (data.timestamp && Date.now() > data.timestamp) {
        mutedUsers.delete(m.sender)
        const userName = getUserName(m.sender, await conn.groupMetadata(m.chat).then(gm => gm.participants))
        const userPp = await getUserProfilePic(conn, m.sender)
        
        await conn.sendMessage(m.chat, {
            text: `ㅤㅤ⋆｡˚『 ╭ \`MUTE SCADUTO\` ╯ 』˚｡⋆\n╭\n│ 『 ✅ 』 \`utente:\` *@${m.sender.split('@')[0]}*\n│ 『 🔓 』 \`stato:\` *smutato automaticamente*\n*╰⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*`,
            mentions: [m.sender],
            contextInfo: {
                ...global.fake,
                externalAdReply: {
                    title: userName,
                    body: 'Mute scaduto - Utente libero',
                    thumbnailUrl: userPp,
                    mediaType: 1,
                    renderLargerThumbnail: false
                }
            }
        })
        return
    }

    await new Promise(resolve => setTimeout(resolve, 1000))

    try {
        await conn.sendMessage(m.chat, { delete: m.key })
    } catch (e) {
        console.error('Errore cancellazione messaggio mutato:', e)
    }

    const now = Date.now()
    const userWarnings = spamWarnings.get(m.sender) || { count: 0, lastMessage: 0, warned: false }
    
    // Conta come spam se manda messaggi a meno di 2 secondi di distanza
    if (now - userWarnings.lastMessage < 2000) {
        userWarnings.count++
    } else {
        userWarnings.count = 1
    }
    
    userWarnings.lastMessage = now
    spamWarnings.set(m.sender, userWarnings)
    
    // Primo avvertimento dopo 3 messaggi in poco tempo
    if (userWarnings.count >= 3 && !userWarnings.warned) {
        const userName = getUserName(m.sender, await conn.groupMetadata(m.chat).then(gm => gm.participants))
        const userPp = await getUserProfilePic(conn, m.sender)
        
        await conn.sendMessage(m.chat, {
            text: `ㅤㅤ⋆｡˚『 ╭ \`AVVERTIMENTO\` ╯ 』˚｡⋆\n╭\n│ 『 ⚠️ 』 \`utente:\` *@${m.sender.split('@')[0]}*\n│ 『 🚫 』 \`problema:\` *Spam mentre mutato*\n│ 『 ⚡ 』 \`rischio:\` *Rimozione dal gruppo*\n│ 『 📊 』 \`messaggi:\` *${userWarnings.count}/7*\n*╰⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*`,
            mentions: [m.sender],
            contextInfo: {
                ...global.fake,
                externalAdReply: {
                    title: userName,
                    body: `Avvertimento spam - ${userWarnings.count}/7 messaggi`,
                    thumbnailUrl: userPp,
                    mediaType: 1,
                    renderLargerThumbnail: false
                }
            }
        })
        
        userWarnings.warned = true
        spamWarnings.set(m.sender, userWarnings)
    }
    
    // Rimozione dopo 7 messaggi di spam
    if (userWarnings.count >= 7) {
        const userName = getUserName(m.sender, await conn.groupMetadata(m.chat).then(gm => gm.participants))
        const userPp = await getUserProfilePic(conn, m.sender)
        
        try {
            await conn.sendMessage(m.chat, {
                text: `ㅤㅤ⋆｡˚『 ╭ \`UTENTE RIMOSSO\` ╯ 』˚｡⋆\n╭\n│ 『 🚫 』 \`utente:\` *@${m.sender.split('@')[0]}*\n│ 『 ⚡ 』 \`motivo:\` *Spam eccessivo mentre mutato*\n│ 『 📊 』 \`messaggi:\` *${userWarnings.count} in poco tempo*\n*╰⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*`,
                mentions: [m.sender],
                contextInfo: {
                    ...global.fake,
                    externalAdReply: {
                        title: userName,
                        body: 'Rimosso per spam eccessivo',
                        thumbnailUrl: userPp,
                        mediaType: 1,
                        renderLargerThumbnail: false
                    }
                }
            })
            
            await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
            spamWarnings.delete(m.sender)
            mutedUsers.delete(m.sender)
        } catch (e) {
            console.error('Errore rimozione utente:', e)
            // Se non riesce a rimuovere, estende il mute
            const currentData = mutedUsers.get(m.sender)
            mutedUsers.set(m.sender, {
                ...currentData,
                timestamp: Date.now() + (60 * 60000), // 1 ora di mute aggiuntivo
                reason: currentData.reason + ' + spam eccessivo'
            })
        }
    }

    // Invia notifica solo al primo messaggio o ogni 5 minuti
    const shouldNotify = !data.lastNotification || (now - data.lastNotification) > 300000 // 5 minuti
    
    if (shouldNotify) {
        const userName = getUserName(m.sender, await conn.groupMetadata(m.chat).then(gm => gm.participants))
        const userPp = await getUserProfilePic(conn, m.sender)
        let remaining = formatTimeLeft(data.timestamp)
        
        try {
            await conn.sendMessage(m.chat, {
                text: `ㅤㅤ⋆｡˚『 ╭ \`SEI MUTATO\` ╯ 』˚｡⋆\n╭\n│ 『 🚫 』 \`utente:\` *@${m.sender.split('@')[0]}*\n│ 『 🔇 』 \`stato:\` *Non puoi parlare o usare comandi*\n│ 『 📝 』 \`motivo:\` *${data.reason}*\n│ 『 ⏱️ 』 \`tempo:\` *${remaining}*\n*╰⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*`,
                mentions: [m.sender],
                contextInfo: {
                    ...global.fake,
                    externalAdReply: {
                        title: userName,
                        body: `Utente mutato - ${remaining}`,
                        thumbnailUrl: userPp,
                        mediaType: 1,
                        renderLargerThumbnail: false
                    }
                }
            })
            data.lastNotification = now
            mutedUsers.set(m.sender, data)
        } catch (e) {
            console.error('Errore invio notifica mute:', e)
        }
    }

    return false
}

setInterval(() => {
    const now = Date.now()
    for (let [user, data] of mutedUsers.entries()) {
        if (data.timestamp && now > data.timestamp) {
            mutedUsers.delete(user)
        }
    }
    
    for (let [user, warnings] of spamWarnings.entries()) {
        if (now - warnings.lastMessage > 300000) {
            spamWarnings.delete(user)
        }
    }
}, 60000)

handler.help = ['muta', 'smuta', 'listamutati']
handler.tags = ['gruppo']
handler.command = /^(muta|smuta|listamutati)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler