
import * as fs from 'fs'

export async function before(m, { conn, isAdmin, isBotAdmin, usedPrefix }) {
  if (m.isBaileys && m.fromMe)
       return !0
  if (!m.isGroup) return !1
  let chat = global.db.data.chats[m.chat]
  let bot = global.db.data.settings[this.user.jid] || {}
  let delet = m.key.participant
  let bang = m.key.id
  let name = await conn.getName(m.sender)
  let fakemek = {key: {participant: "0@s.whatsapp.net","remoteJid": "0@s.whatsapp.net"},"message": {"groupInviteMessage": {"groupJid": "51995386439-1616969743@g.us","inviteCode": "m","groupName": "P", "caption"'333 'jpegThumbnail': null}}}
   if (chat.antiTraba && m.text.length > 4000) { //Cantidad máxima de caracteres aceptados en un mensaje//
    if (isAdmin) return conn.sendMessage(m.chat, { text: `𝐇𝐄𝐘 @${m.sender.split("@")[0]} 𝐏𝐄𝐑 𝐂𝐀𝐒𝐎 𝐓𝐈 𝐃𝐈𝐕𝐄𝐑𝐓𝐈 𝐀 𝐌𝐀𝐍𝐃𝐀𝐑𝐄 𝐓𝐑𝐀𝐕𝐀 𝐐𝐔𝐈? 𝐂𝐇𝐄 𝐅𝐎𝐑𝐓𝐔𝐍𝐀 𝐏𝐄𝐑 𝐓𝐄 𝐂𝐇𝐄 𝐒𝐄𝐈 𝐀𝐃𝐌. -.-!`, mentions: [m.sender] }, { quoted: fakemek, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
    conn.sendMessage(m.chat, `*𝐓𝐑𝐀𝐕𝐀 𝐑𝐈𝐋𝐄𝐕𝐀𝐓𝐎*\n`, `${isBotAdmin ? '' : '𝐍𝐎𝐍 𝐒𝐎𝐍𝐎 𝐀𝐃𝐌𝐈𝐍 𝐄 𝐍𝐎𝐍 𝐏𝐎𝐒𝐒𝐎 𝐅𝐀𝐑𝐄 𝐍𝐈𝐄𝐍𝐓𝐄 :/'}`, m)
    //await conn.sendButton(m.chat, `*[ ! ] Se detecto un mensaje que contiene muchos caracteres [ ! ]*\n`, `${isBotAdmin ? '' : 'No soy administrador, no puedo hacer nada :/'}`, author, ['[ ᴅᴇsᴀᴄᴛɪᴠᴀ ᴀɴᴛɪᴛʀᴀʙᴀ ]', usedPrefix+'apagar antitraba'], fakemek )
        if (isBotAdmin) {
        conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet }})
        	setTimeout(() => { 
        	conn.sendMessage(m.chat, { text: `𝐂𝐎𝐆𝐋𝐈𝐎𝐍𝐄 𝐓𝐎𝐋𝐓𝐎 ✓\n\n• ${m.sender.split("@")[0]} 𝐇𝐀 𝐈𝐍𝐕𝐈𝐀𝐓𝐎 𝐔𝐍 𝐓𝐑𝐀𝐕𝐀\n• 𝐒𝐓𝐎 𝐄𝐒𝐒𝐄𝐑𝐄 𝐒𝐈 𝐂𝐇𝐈𝐀𝐌𝐀: ${name}`, mentions: [m.sender] }, { quoted: fakemek, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
        }, 0)
        setTimeout(() => { 
        	conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
            }, 1000)
        } else if (!bot.restrict) return m.reply(`${lenguajeGB['smsSoloOwner']()}`)
    }
    return !0
}

