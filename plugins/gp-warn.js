let handler = async (m, { conn, text, args, groupMetadata, usedPrefix, command }) => {
  let war = 2 // <-- numero di warning prima del ban

  let who
  if (m.isGroup) {
    who = m.mentionedJid?.[0] || m.quoted?.sender
  } else {
    who = m.chat
  }

  if (!who) return m.reply("❌ Devi menzionare un utente o rispondere a un suo messaggio.")

  // 🔒 BLOCCA AVVERTIMENTI AL BOT
  if (who === conn.user.jid) {
    return m.reply("🚫 Non puoi warnare il bot.")
  }

  if (!(who in global.db.data.users)) {
    return m.reply("❌ Utente non trovato nel database.")
  }

  let user = global.db.data.users[who]
  let warn = user.warn || 0
  let nomeDelBot = global.db.data.nomedelbot || `𝐂𝐡𝐚𝐭𝐔𝐧𝐢𝐭𝐲`

  const messageOptions = {
    contextInfo: {
      mentionedJid: [who],
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363422724720651@newsletter',
        serverMessageId: '',
        newsletterName: `${nomeDelBot}`
      }
    }
  }

  if (warn < war) {
    user.warn += 1
    await conn.sendMessage(m.chat, {
      text: `⚠️ 𝐀𝐕𝐕𝐄𝐑𝐓𝐈𝐌𝐄𝐍𝐓𝐎 ${user.warn}/𝟑 (𝟑 𝐰𝐚𝐫𝐧=𝐛𝐚𝐧)`,
      ...messageOptions
    })
  } else if (warn >= war) {
    user.warn = 0
    await conn.sendMessage(m.chat, {
      text: `⛔ 𝐔𝐓𝐄𝐍𝐓𝐄 𝐑𝐈𝐌𝐎𝐒𝐒𝐎 𝐃𝐎𝐏𝐎 3 𝐀𝐕𝐕𝐄𝐑𝐓𝐈𝐌𝐄𝐍𝐓𝐈 (𝐀𝐯𝐞𝐯𝐚 𝐫𝐨𝐭𝐭𝐨 𝐢𝐥 𝐜𝐚𝐳𝐳𝐨)`,
      ...messageOptions
    })
    await sleep(1000)
    await conn.groupParticipantsUpdate(m.chat, [who], 'remove')
  }
}

handler.help = ['warn @user']
handler.tags = ['group']
handler.command = /^(ammonisci|avvertimento|warn|warning)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler

// Funzione di attesa
const sleep = async (ms) => new Promise(resolve => setTimeout(resolve, ms))