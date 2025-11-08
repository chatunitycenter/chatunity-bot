import { cpus as _cpus, totalmem, freemem } from 'os'
import { performance } from 'perf_hooks'
import { sizeFormatter } from 'human-readable'

let format = sizeFormatter({
  std: 'JEDEC',
  decimalPlaces: 2,
  keepTrailingZeroes: false,
  render: (literal, symbol) => `${literal} ${symbol}B`,
})

let handler = async (m, { conn, usedPrefix, command }) => {
  let nomeDelBot = global.db.data.nomedelbot || `𝐂𝐡𝐚𝐭𝐔𝐧𝐢𝐭𝐲`
  let versioneBot = `${vs}`
  let old = performance.now()
  let neww = performance.now()
  let speed = (neww - old).toFixed(2)
  let uptime = process.uptime() * 1000

  const cpus = _cpus().map(cpu => {
    cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)
    return cpu
  })

  const cpu = cpus.reduce((last, cpu, _, { length }) => {
    last.total += cpu.total
    last.speed += cpu.speed / length
    last.times.user += cpu.times.user
    last.times.nice += cpu.times.nice
    last.times.sys += cpu.times.sys
    last.times.idle += cpu.times.idle
    last.times.irq += cpu.times.irq
    return last
  }, {
    speed: 0,
    total: 0,
    times: {
      user: 0,
      nice: 0,
      sys: 0,
      idle: 0,
      irq: 0
    }
  })

  let cpuModel = cpus[0]?.model || 'Unknown Model'
  let cpuSpeed = cpu.speed.toFixed(2)

  let caption = `⋆ ★ 🚀 𝑺𝑻𝑨𝑻𝑶 𝑺𝑰𝑺𝑻𝑬𝑴𝑨 🚀 ★ ⋆
╭♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩
୧ ⌛ *Uptime:* ${clockString(uptime)}
୧ ⚡ *Ping:* ${speed} ms
  💻 *CPU:* ${cpuModel}
  🔋 *Usage:* ${cpuSpeed} MHz
  💾 *RAM:* ${format(totalmem() - freemem())} / ${format(totalmem())}
  🟢 *Free:* ${format(freemem())}
╰♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩
`

  const profilePictureUrl = await fetchProfilePictureUrl(conn, m.sender)

  let messageOptions = {
    contextInfo: {
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363259442839354@newsletter',
        serverMessageId: '',
        newsletterName: `${nomeDelBot}`
      }
    }
  }

  if (profilePictureUrl !== 'default-profile-picture-url') {
    try {
      messageOptions.contextInfo.externalAdReply = {
        title: nomeDelBot,
        body: `Versione: ${versioneBot}`,
        mediaType: 1,
        renderLargerThumbnail: false,
        previewType: 'thumbnail',
        thumbnail: await fetchThumbnail('https://i.ibb.co/k22STymH/Immagine-Whats-App-2025-10-23-ore-19-58-44-580b7b7d.jpg-App-2025-10-23-ore-19-58-44-580b7b7d'),
      }
    } catch (error) {
      console.error('Error fetching thumbnail:', error)
    } 
  }

  try {
    await conn.sendMessage(m.chat, {
      text: caption,
      ...messageOptions
    })
  } catch (error) {
    console.error('Error sending message:', error)
  }
}

async function fetchProfilePictureUrl(conn, sender) {
  try {
    return await conn.profilePictureUrl(sender)
  } catch (error) {
    console.error('Error fetching profile picture URL:', error)
    return 'default-profile-picture-url'
  }
}

async function fetchThumbnail(url) {
  if (!url) return null;
  try {
      return await global.fetchThumbnail(url);
  } catch {
      return null;
  }
}

handler.help = ['ping', 'speed']
handler.tags = ['info', 'tools']
handler.command = /^(ping)$/i

export default handler

function clockString(ms) {
  let d = Math.floor(ms / 86400000)
  let h = Math.floor(ms / 3600000) % 24
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  return [d, h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}