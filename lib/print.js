import { WAMessageStubType } from '@chatunity/baileys'
import chalk from 'chalk'
import { watchFile } from 'fs'
import { fileURLToPath } from 'url'

const nameCache = new Map()
const CACHE_TTL = 300000

async function getCachedName(conn, jid) {
  if (!jid) return null
  
  const cached = nameCache.get(jid)
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.name
  }
  
  try {
    const name = await Promise.race([
      conn.getName(jid),
      new Promise((resolve) => setTimeout(() => resolve(null), 100))
    ])
    nameCache.set(jid, { name, timestamp: Date.now() })
    return name
  } catch {
    return null
  }
}

export default async function (m, conn = { user: {} }) {
  try {
    let sender = m.sender
    
    if (m.key?.participant) {
      sender = m.key.participant
    }
    
    if (/@lid/.test(sender) && m.key?.senderPn) {
      sender = m.key.senderPn
    }
    
    const [senderName, chatName] = await Promise.all([
      getCachedName(conn, sender),
      getCachedName(conn, m.chat)
    ])
    
    let displaySender = '+' + sender.replace('@s.whatsapp.net', '').replace('@lid', '') + (senderName ? ' ~ ' + senderName : '')
    
    let filesize = (m.msg?.fileLength?.low || m.msg?.fileLength || m.text?.length || 0)
    
    let me = '+' + (conn.user?.jid || '').replace('@s.whatsapp.net', '')
    const userName = conn.user.name || conn.user.verifiedName || "Sconosciuto"
    
    if (sender === conn.user?.jid) return
    
    console.log(`${chalk.hex('#FE0041').bold('╭★────★────★────★────★')}
${chalk.hex('#FE0041').bold('│')} ${chalk.redBright('Bot:')} ${chalk.greenBright(me)} ~ ${chalk.magentaBright(userName)} ${global.conn?.user?.jid === conn.user?.jid ? chalk.cyanBright('(Principale)') : chalk.cyanBright('(Sub-Bot)')}
${chalk.hex('#FE0041').bold('│')} ${chalk.yellowBright('Data:')} ${chalk.blueBright(new Date(m.messageTimestamp ? 1000 * (m.messageTimestamp.low || m.messageTimestamp) : Date.now()).toLocaleDateString("it-IT", { day: 'numeric', month: 'long', year: 'numeric' }))}
${chalk.hex('#FE0041').bold('│')} ${chalk.greenBright('Tipo evento:')} ${chalk.redBright(m.messageStubType ? WAMessageStubType[m.messageStubType] : 'Nessuno')}
${chalk.hex('#FE0041').bold('│')} ${chalk.magentaBright('Dimensione:')} ${chalk.yellowBright((filesize / 1024).toFixed(1) + ' KB')}
${chalk.hex('#FE0041').bold('│')} ${chalk.blueBright('Da:')} ${chalk.redBright(displaySender)}
${chalk.hex('#FE0041').bold('│')} ${chalk.cyanBright(`Chat:`)} ${chalk.greenBright(chatName || m.chat)} ${m.isGroup ? chalk.gray('(Gruppo)') : chalk.gray('(Privato)')}
${chalk.hex('#FE0041').bold('│')} ${chalk.magentaBright('Tipo:')} ${chalk.yellowBright(m.mtype?.replace(/message$/i, '').replace('audio', m.msg?.ptt ? 'PTT' : 'audio') || 'Sconosciuto')}
${chalk.hex('#FE0041').bold('╰★────★────★────★────★')}`)

    if (typeof m.text === 'string' && m.text) {
      console.log(m.error != null ? chalk.red(m.text) : m.isCommand ? chalk.yellow(m.text) : chalk.white(m.text))
    }
    
    if (m.messageStubParameters?.length > 0) {
      const decoded = await Promise.all(m.messageStubParameters.map(async jid => {
        let resolvedJid = jid
        
        if (/@lid/.test(jid)) {
          try {
            const pn = await conn.getPNForLID?.(jid)
            if (pn) resolvedJid = pn
          } catch {}
        } else if (conn.decodeJid) {
          resolvedJid = conn.decodeJid(jid)
        }
        
        const name = await getCachedName(conn, resolvedJid)
        return chalk.gray('+' + resolvedJid.replace('@s.whatsapp.net', '').replace('@lid', '') + (name ? ' ~ ' + name : ''))
      }))
      
      console.log(decoded.join(', '))
    }
    
    if (/document/i.test(m.mtype)) console.log(`📄 ${m.msg.fileName || m.msg.displayName || 'Documento'}`)
    else if (/contact/i.test(m.mtype)) console.log(`📇 ${m.msg.displayName || 'Contatto'}`)
    else if (/audio/i.test(m.mtype)) {
      const duration = m.msg.seconds || 0
      console.log(`${m.msg.ptt ? '🎤 (PTT' : '🎵 ('}AUDIO) ${Math.floor(duration / 60).toString().padStart(2, 0)}:${(duration % 60).toString().padStart(2, 0)}`)
    }
    
    console.log()
  } catch (e) {
    
  }
}

const __filename = fileURLToPath(import.meta.url)
watchFile(__filename, () => {
  console.log(chalk.redBright("Aggiornamento 'lib/print.js'"))
})
