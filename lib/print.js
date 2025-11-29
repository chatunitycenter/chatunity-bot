import PhoneNumber from 'awesome-phonenumber'
import chalk from 'chalk'
import { watchFile } from 'fs'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const terminalImage = global.opts?.img ? require('terminal-image') : ''
const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g

export default async function (m, conn = { user: {} }) {
  if (!global.messageUpdateListenerSet) {
    conn.ev.on('messages.update', (updates) => {
      for (const update of updates) {
        if (update.update.message?.editedMessage) {
          const editedContent = update.update.message.editedMessage.message?.conversation ||
                                update.update.message.editedMessage.message?.extendedTextMessage?.text ||
                                update.update.message.editedMessage.message?.imageMessage?.caption ||
                                'Contenuto non disponibile'
          let oldContent = 'Contenuto originale non disponibile'
          try {
            const originalMsg = global.store?.getMessage(update.key);
            if (originalMsg) {
              oldContent = originalMsg.message?.conversation ||
                           originalMsg.message?.extendedTextMessage?.text ||
                           originalMsg.message?.imageMessage?.caption ||
                           'Contenuto originale non disponibile';
            }
          } catch (e) {}
          console.log('Messaggio editato:', oldContent, '->', editedContent);
        } else if (update.update.message === null) {
          console.log('Messaggio eliminato:', update.key.id);
        }
      }
    })
    global.messageUpdateListenerSet = true
  }

  if (!m || m.key?.fromMe) return

  try {
    const senderJid = conn.decodeJid(m.sender)
    const chatJid = conn.decodeJid(m.chat || '')
    const botJid = conn.decodeJid(conn.user?.jid)

    if (!chatJid) {
      console.warn('chatJid is undefined, skipping print');
      return;
    }

    const _name = await conn.getName(senderJid) || ''
    const sender = formatPhoneNumber(senderJid, _name)
    const chatName = await conn.getName(chatJid) || 'Chat Sconosciuta'
    const isGroup = chatJid.endsWith('@g.us') || false
    const isAdmin = isGroup ? await checkAdmin(conn, chatJid, senderJid) : false
    const isOwner = Array.isArray(global.owner)
      ? global.owner.map(([number]) => number).includes(senderJid.split('@')[0])
      : global.owner === senderJid.split('@')[0]
    const isPremium = global.prems?.includes(senderJid) || false
    const isBanned = global.DATABASE?.data?.users?.[senderJid]?.banned || false

    if (global.lastLogJid === senderJid && Date.now() - global.lastLogTime < 1000) return;
    global.lastLogJid = senderJid;
    global.lastLogTime = Date.now();

    const user = global.DATABASE?.data?.users?.[senderJid] || { exp: '?', limit: '?' }

    let img
    try {
      if (global.opts?.img && /sticker|image|video/gi.test(m.mtype))
        img = await terminalImage.buffer(await m.download())
    } catch (e) {
      if (!global.lastErrorTime || Date.now() - global.lastErrorTime > 5000) {
        console.error(chalk.red('Errore durante il download del media:'), e.message)
        global.lastErrorTime = Date.now();
      }
    }

    const ts = formatTimestamp(m.messageTimestamp)
    const messageAge = getMessageAge(m.messageTimestamp)
    const c = getColorScheme()
    const bordi = getBorders(c)

    const righe = [
      `${bordi.top}`,
      `${bordi.pipe} ${c.label('⏰ Ora:')} ${c.text(ts)}${messageAge ? c.secondary(' • ') + c.meta(messageAge) : ''}`,
      `${bordi.pipe} ${c.label('👤 Da:')} ${c.text(sender)} ${getUserStatus(isOwner, isAdmin, isPremium, isBanned, c)}`,
      `${bordi.pipe} ${c.label('💬 Chat:')} ${c.text(chatName)}${isGroup ? c.secondary(' (Gruppo)') : c.secondary(' (Privato)')}`,
    ]

    if (m.isCommand) righe.push(`${bordi.pipe} ${c.label('⚙️ Comando:')} ${c.text(getCommand(m.text))}`)
    if (user.exp !== '?') righe.push(`${bordi.pipe} ${c.label('⭐ EXP:')} ${c.text(user.exp)}${user.limit !== '?' ? c.secondary(' | ') + c.label('💰 ') + c.text(user.limit) : ''}`)

    if (m.quoted) {
      const quotedSenderJid = conn.decodeJid(m.quoted.sender)
      const qname = await conn.getName(quotedSenderJid) || 'Utente'
      righe.push(`${bordi.pipe} ${c.label('↪️ Risposta a:')} ${c.text(qname)}`)
    }

    if (m.forwarded) {
      righe.push(`${bordi.pipe} ${c.label('↗️ Inoltrato:')} ${c.text('Sì')}`)
    }

    if (m.broadcast) {
      righe.push(`${bordi.pipe} ${c.label('📢 Broadcast:')} ${c.text('Sì')}`)
    }

    righe.push(`${bordi.bottom}`)

    console.log('\n' + righe.join('\n'))
    if (img) console.log(img.trimEnd())

    const logText = await formatText(m, conn)
    if (logText?.trim()) console.log(logText)

    if (m.messageStubParameters && Array.isArray(m.messageStubParameters)) {
      const decoded = m.messageStubParameters.map(jid =>
        chalk.gray(formatPhoneNumber(conn.decodeJid(jid), ''))
      ).join(', ')
      if (decoded.trim()) console.log(decoded)
    }

    logMessageSpecifics(m, c)

    if (m.reactions && m.reactions.length > 0) {
      const reactions = m.reactions.map(r => `${r.text} (${r.count})`).join(', ')
      console.log(`${c.secondary('🎭 Reazioni:')} ${c.text(reactions)}`)
    }

    if (m.editedTimestamp) {
      const editTime = new Date(m.editedTimestamp * 1000).toLocaleTimeString('it-IT')
      console.log(`${c.secondary('✏️ Modificato:')} ${c.text(editTime)}`)
    }

  } catch (error) {
    if (!global.lastErrorTime || Date.now() - global.lastErrorTime > 5000) {
      console.error(chalk.red('Errore in print.js:'), error.message)
      global.lastErrorTime = Date.now();
    }
  }
}

function formatPhoneNumber(jid, name) {
  if (!jid) return 'Sconosciuto';
  let userPart = jid.split('@')[0];
  let cleanNumber = userPart.split(':')[0];
  try {
    const number = PhoneNumber('+' + cleanNumber).getNumber('international');
    return number + (name ? ` ~${name}` : '');
  } catch {
    return (cleanNumber || '') + (name ? ` ~${name}` : '');
  }
}

async function checkAdmin(conn, chatId, senderId) {
  try {
    const decodedSender = conn.decodeJid(senderId);
    const groupMeta = await conn.groupMetadata(chatId)
    return groupMeta?.participants?.some(p =>
      (conn.decodeJid(p.id) === decodedSender || p.jid === decodedSender) &&
      (p.admin === 'admin' || p.admin === 'superadmin')
    ) || false
  } catch {
    return false
  }
}

function formatTimestamp(timestamp) {
  const date = timestamp ? new Date(timestamp * 1000) : new Date()
  return date.toLocaleTimeString('it-IT', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

function getMessageAge(timestamp) {
  if (!timestamp) return ''
  const now = Date.now() / 1000
  const sec = now - timestamp
  if (sec < 60) return `${Math.floor(sec)}s fa`
  if (sec < 3600) return `${Math.floor(sec / 60)}m fa`
  if (sec < 86400) return `${Math.floor(sec / 3600)}h fa`
  return ''
}

function getColorScheme() {
  const violet = color => chalk.hex(color)
  return {
    label: violet('#6349d8ff').bold,
    text: violet('#ffffffff'),
    secondary: violet('#6944ceff'),
    meta: violet('#5f40ceff'),
    bright: violet('#7247e7ff'),
    bold: chalk.bold,
    italic: chalk.italic,
    white: chalk.whiteBright,
    gray: chalk.gray,
    cyan: chalk.cyanBright,
    magenta: chalk.magentaBright,
    blue: chalk.blueBright,
    green: chalk.greenBright,
    red: chalk.redBright,
    yellow: chalk.yellowBright,
    background: chalk.bgBlueBrightBright,
    info: violet('#F8F8FF'),
    warning: violet('#FFB6C1'),
    error: violet('#FF6347'),
    success: violet('#a298fbff')
  }
}

function getBorders(c) {
  return {
    top: `${c.secondary.bold('╭★────★────★')}『 ${c.success.bold('CHATUNITY-BOT')} 』${c.secondary.bold('★────★────★')}`,
    bottom: `${c.secondary.bold('╰★────★────★────★')}${c.secondary.bold('╝')}`,
    pipe: c.secondary.bold('|˚')
  }
}

function getUserStatus(isOwner, isAdmin, isPremium, isBanned, c) {
  let status = []
  if (isOwner) status.push(c.success('Owner'))
  if (isAdmin) status.push(c.warning('Admin'))
  if (isBanned) status.push(c.error('Bannato'))
  return status.length ? `(${status.join(' | ')})` : (c.text('User'))
}

function getCommand(text) {
  if (!text) return ''
  return text.split(' ')[0].slice(1)
}

function formatDuration(sec) {
  if (typeof sec !== 'number' || isNaN(sec) || sec < 0) return ''
  const hours = Math.floor(sec / 3600)
  const minutes = Math.floor((sec % 3600) / 60)
  const seconds = Math.floor(sec % 60)

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

function logMessageSpecifics(m, c) {
  const specifics = {
    documentMessage: () => {
      const fileName = m.msg?.fileName || 'Documento'
      const mimetype = m.msg?.mimetype || 'Sconosciuto'
      const pages = m.msg?.pageCount ? ` (${m.msg.pageCount} pagine)` : ''
      console.log(`${c.secondary('📄')} ${fileName}${pages} - ${mimetype}`)
    },
    contactMessage: () => {
      const name = m.msg?.displayName || 'Contatto'
      const vcard = m.msg?.vcard ? ' (contatto)' : ''
      console.log(`${c.secondary('👤')} ${name}${vcard}`)
    },
    contactsArrayMessage: () => {
      const count = m.msg?.contacts?.length || '?'
      console.log(`${c.secondary('👨‍👩‍👧‍👦 ')} ${count} contatti`)
    },
    audioMessage: () => {
      const duration = formatDuration(m.msg?.seconds)
      const type = m.msg?.ptt ? 'Messaggio vocale' : 'Audio'
      const waveform = m.msg?.waveform ? ' 🎵' : ''
      console.log(`${c.secondary('🎵 ')} ${type}${duration ? ' - ' + duration : ''}${waveform}`)
    },
    videoMessage: () => {
      const duration = formatDuration(m.msg?.seconds)
      const gif = m.msg?.gifPlayback ? ' (GIF)' : ''
      console.log(`${c.secondary('🎥')} Video${duration ? ' - ' + duration : ''}${gif}`)
    },
    imageMessage: () => {
      const width = m.msg?.width
      const height = m.msg?.height
      const dimensions = width && height ? ` (${width}x${height})` : ''
      console.log(`${c.secondary('🖼️')} Immagine${dimensions}`)
    },
    stickerMessage: () => {
      const animated = m.msg?.isAnimated ? ' (Animato)' : ''
      console.log(`${c.secondary('🌟')} Sticker${animated}`)
    },
    reactionMessage: () => {
      const reaction = m.msg?.text || '❤️'
      console.log(`${c.secondary('✧')} Reazione: ${reaction}`)
    },
    pollCreationMessage: () => {
      const question = m.msg?.name || 'Sondaggio'
      const options = m.msg?.options?.length || 0
      console.log(`${c.secondary('🗳️')} ${question} (${options} opzioni)`)
    },
    productMessage: () => {
      const title = m.msg?.product?.title || 'Prodotto'
      const price = m.msg?.product?.priceAmount1000 ? ` - ${m.msg.product.priceAmount1000 / 1000} ${m.msg.product.currency}` : ''
      console.log(`${c.secondary('🛍️')} ${title}${price}`)
    },
    locationMessage: () => {
      const lat = m.msg?.degreesLatitude
      const lng = m.msg?.degreesLongitude
      const name = m.msg?.name || 'Posizione'
      const coords = lat && lng ? ` (${lat.toFixed(4)}, ${lng.toFixed(4)})` : ''
      console.log(`${c.secondary('📍')} ${name}${coords}`)
    },
    liveLocationMessage: () => {
      const duration = m.msg?.contextInfo?.expiration ? formatDuration(m.msg.contextInfo.expiration) : ''
      console.log(`${c.secondary('📡')} Posizione in tempo reale${duration ? ' - ' + duration : ''}`)
    },
  }

  const handler = specifics[m.mtype]
  if (handler) {
    try {
      handler()
    } catch (e) {
      if (!global.lastSpecificError || Date.now() - global.lastSpecificError > 5000) {
        console.error(chalk.red('Errore nel log dei dettagli del messaggio:'), e.message)
        global.lastSpecificError = Date.now();
      }
    }
  }
}

async function formatText(m, conn) {
  if (!m.text && !m.caption) return ''

  let text = (m.text || m.caption || '').replace(/\u200e+/g, '')
  const mdRegex = /(?<=(?:^|[\s\n])\S?)(?:([*_~`])(.+?)\1|``````|`([^`]+)`)(?=\S?(?:[\s\n]|$))/g

  const mdFormat = (depth = 4) => (_, type, text, code, inlineCode) => {
    const types = { '_': 'italic', '*': 'bold', '~': 'strikethrough', '`': 'gray' }
    const val = text || code || inlineCode
    if (!types[type] || depth < 1) return val
    return chalk[types[type]](val.replace(mdRegex, mdFormat(depth - 1)))
  }

  if (text.length < 2048) {
    text = text.replace(urlRegex, url => chalk.cyanBright(url))
  }
  text = text.replace(mdRegex, mdFormat(4))
  if (m.mentionedJid) {
    for (const id of m.mentionedJid) {
      try {
        let mentionJid = conn.decodeJid(id);
        let originalNum = mentionJid.split('@')[0];
        let displayNum = originalNum.split(':')[0];
        let name = await conn.getName(mentionJid) || displayNum;

        if (m.isGroup) {
          const groupMeta = await conn.groupMetadata(m.chat);
          const participant = groupMeta.participants.find(p => {
            const pDecodedId = conn.decodeJid(p.id);
            return pDecodedId === mentionJid || (p.jid && conn.decodeJid(p.jid) === mentionJid);
          });
          if (participant && participant.jid) {
            const realJid = conn.decodeJid(participant.jid);
            displayNum = realJid.split('@')[0];
            name = await conn.getName(realJid) || displayNum;
          }
        }

        const replacement = chalk.blueBright('@' + displayNum + (name && name !== displayNum ? ' ~' + name : ''));
        text = text.replace('@' + originalNum, replacement);
      } catch (e) {
        if (!global.lastMentionError || Date.now() - global.lastMentionError > 5000) {
          console.error(chalk.red('Errore nel recupero del nome utente:'), e.message)
          global.lastMentionError = Date.now();
        }
      }
    }
  }

  text = text.replace(/#[\w\u0590-\u05ff]+/g, hashtag => chalk.cyanBright(hashtag))
  text = text.replace(/\+?[\d\s\-\(\)]{10,}/g, phone => chalk.magentaBright(phone))

  if (m.error) return chalk.red(text)
  if (m.isCommand) return chalk.bgBlueBright(text)
  if (m.quoted) return chalk.greenBright(text.trim() || '[Messaggio Vuoto]')
  return chalk.whiteBright(text.trim() || '[Messaggio Vuoto]')
}

watchFile(__filename, () => {
  console.log(chalk.bgHex('#3b0d95')(chalk.white.bold("File: 'lib/print.js' Aggiornato")))
})
