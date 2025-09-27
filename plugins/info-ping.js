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
  let versioneBot = '5.2' // Specifica la versione del bot
  let old = performance.now()
  let neww = performance.now()
  let speed = (neww - old).toFixed(2) // Limita la velocità a 2 decimali
  let uptime = process.uptime() * 1000

  // CPU info
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
  let networkSpeed = 'N/A'

  let caption = `╭━〔🚀𝑺𝑻𝑨𝑻𝐎 𝑺𝑰𝑺𝑻𝑬𝑴𝑨🚀〕━┈⊷
┃◈╭─────────────·๏
┃◈┃• ⌛ *Uptime*: ${clockString(uptime)}
┃◈┃• ⚡ *Ping*: ${speed} ms
┃◈┃
┃◈┃• 💻 *CPU*: ${cpuModel}
┃◈┃• 🔋 *Usage*: ${cpuSpeed} MHz 
┃◈┃
┃◈┃• 💾 *RAM*: ${format(totalmem() - freemem())} / ${format(totalmem())}
┃◈┃• 🟢 *Free*: ${format(freemem())}
╰━━━━━━━━━━━━━┈·๏

`

  const profilePictureUrl = await fetchProfilePictureUrl(conn, m.sender)

  let messageOptions = {
    contextInfo: {
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363422724720651@newsletter',
        serverMessageId: '',
        newsletterName: `${nomeDelBot}`
      }
    }
  }

  if (profilePictureUrl !== 'default-profile-picture-url') {
    try {
      messageOptions.contextInfo.externalAdReply = {
        title: nomeDelBot,
        body: `Versione: 6.0`,
        mediaType: 1,
        renderLargerThumbnail: false,
        previewType: 'thumbnail',
        thumbnail: await fetchThumbnail('https://i.ibb.co/9mWwC5PP/Whats-App-Image-2025-07-06-at-23-32-06.jpg'),
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
    return 'default-profile-picture-url' // Fallback URL in case of error
  }
}

async function fetchThumbnail(url) {
  try {
    const response = await fetch(url)
    if (!response.ok) throw new Error(`Failed to fetch thumbnail: ${response.statusText}`)
    const buffer = await response.buffer()
    return buffer
  } catch (error) {
    console.error('Error fetching thumbnail:', error)
    return 'default-thumbnail' // Fallback thumbnail in case of error
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
