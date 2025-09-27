import { generateWAMessageFromContent } from '@realvare/based'
import * as fs from 'fs'

let handler = async (m, { conn, text, participants }) => {
  try {
    let users = participants.map(u => conn.decodeJid(u.id))
    let q = m.quoted ? m.quoted : m
    let c = m.quoted ? await m.getQuotedObj() : m
    let tagger = m.sender ? '@' + (m.sender.split('@')[0]) : ''
    
    let tagText
    if (m.quoted && m.quoted.text) {
      tagText = `${m.quoted.text}\n\nTag by ${tagger}`
    } else if (text?.trim()) {
      tagText = `${text.trim()}\n\nTag by ${tagger}`
    } else {
      tagText = `Tag by ${tagger}`
    }

    if (q.mtype === 'stickerMessage') {
      let media = await q.download?.()
      if (!media) throw 'Sticker non scaricato'
      return await conn.sendMessage(m.chat, { sticker: media, mentions: users }, { quoted: m })
    }

    let msg = conn.cMod(
      m.chat,
      generateWAMessageFromContent(
        m.chat,
        {
          extendedTextMessage: {
            text: tagText,
            contextInfo: {
              mentionedJid: users
            }
          }
        },
        {}
      ),
      tagText,
      conn.user.jid
    )

    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })

  } catch {
    let users = participants.map(u => conn.decodeJid(u.id))
    let quoted = m.quoted ? m.quoted : m
    let mime = (quoted.msg || quoted).mimetype || ''
    let isMedia = /image|video|sticker|audio/.test(mime)
    let tagger = m.sender ? '@' + (m.sender.split('@')[0]) : ''

    let htextos
    if (m.quoted && m.quoted.text) {
      htextos = `${m.quoted.text}\n\nTag by ${tagger}`
    } else if (text?.trim()) {
      htextos = `${text.trim()}\n\nTag by ${tagger}`
    } else {
      htextos = `Tag by ${tagger}`
    }

    if (isMedia && quoted.mtype === 'imageMessage') {
      let mediax = await quoted.download?.()
      await conn.sendMessage(m.chat, { image: mediax, mentions: users, caption: htextos }, { quoted: m })
    } else if (isMedia && quoted.mtype === 'videoMessage') {
      let mediax = await quoted.download?.()
      await conn.sendMessage(m.chat, { video: mediax, mentions: users, mimetype: 'video/mp4', caption: htextos }, { quoted: m })
    } else if (isMedia && quoted.mtype === 'audioMessage') {
      let mediax = await quoted.download?.()
      await conn.sendMessage(m.chat, { audio: mediax, mentions: users, mimetype: 'audio/mp4', fileName: `Hidetag.mp3` }, { quoted: m })
    } else if (isMedia && quoted.mtype === 'stickerMessage') {
      let mediax = await quoted.download?.()
      await conn.sendMessage(m.chat, { sticker: mediax, mentions: users }, { quoted: m })
    } else {
      await conn.sendMessage(
        m.chat,
        {
          text: htextos,
          mentions: users
        },
        { quoted: m }
      )
    }
  }
}

handler.command = /^(hidetag|tag)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler