import { cpus as _cpus, totalmem, freemem, platform, hostname, version, release, arch } from 'os'
import speed from 'performance-now'
import { performance } from 'perf_hooks'
import { sizeFormatter } from 'human-readable'
import ws from 'ws'
import fs from 'fs'

let format = sizeFormatter({
    std: 'JEDEC',
    decimalPlaces: 2,
    keepTrailingZeroes: false,
    render: (literal, symbol) => `${literal} ${symbol}B`,
})

let handler = async (m, { conn, usedPrefix }) => {
   let uniqueUsers = new Map()

   if (Array.isArray(global.conns)) {
     global.conns.forEach((conn) => {
       if (conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED) {
         uniqueUsers.set(conn.user.jid, conn)
       }
     })
   }
   let users = [...uniqueUsers.values()]
   let totalUsers = users.length
   let totalreg = Object.keys(global.db.data.users).length
   let totalbots = Object.keys(global.db.data.settings).length
   let totalStats = Object.values(global.db.data.stats).reduce((total, stat) => total + stat.total, 0)
   const chats = Object.entries(conn.chats).filter(([id, data]) => id && data.isChats)
   let totalchats = Object.keys(global.db.data.chats).length
   let totalf = Object.values(global.plugins).filter(
    (v) => v.help && v.tags
  ).length
   const groupsIn = chats.filter(([id]) => id.endsWith('@g.us')) //groups.filter(v => !v.read_only)
   const used = process.memoryUsage()
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
   	let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
   let timestamp = speed()
   let latensi = speed() - timestamp

   let textbot = 'Usa il comnando .faq per visualizzare la nostra politica'; // Define textbot with a default value

   let txt = '`*⭒─ׄ─ׅ─ׄ─⭒ 𝐈𝐍𝐅𝐎-𝐁𝐎𝐓 ⭒─ׄ─ׅ─ׄ─⭒*`\n\n'
       txt += `╭── ︿︿︿︿︿ *⭒   ⭒   ⭒   ⭒   ⭒   ⭒*\n`
       txt += `┊ ‹‹ *Stato Di* :: *𝐂𝐡𝐚𝐭𝐔𝐧𝐢𝐭𝐲 ดาว⁩*\n`
       txt += `┊•*⁀➷ °⭒⭒⭒ *【 ✯ 𝐂𝐡𝐚𝐭𝐔𝐧𝐢𝐭𝐲-𝐁𝐨𝐭 ✰ 】*\n`
       txt += `╰─── ︶︶︶︶ ✰⃕  ⌇ *⭒ ⭒ ⭒*   ˚̩̥̩̥*̩̩͙✩\n`
       txt += `┊🪴 [ *Moneta* :: *Unitycoins 💶*\n`
       txt += `┊🍟 [ *Prefisso* :: *【  ${usedPrefix}  】*\n`
       txt += `┊✨ [ *Plugin* :: *${totalf}*\n`
       txt += `┊☁️ [ *Sub-Bot* :: *${totalUsers || '0'}*\n`
       txt += `┊🍟 [ *Piattaforma* :: *${platform()}*\n`
       txt += `┊🍁 [ *RAM* :: *${format(totalmem() - freemem())} / ${format(totalmem())}*\n`
       txt += `┊🌸 [ *RAM Libera* :: *${format(freemem())}*\n`
       txt += `┊🍄 [ *Velocità* :: *${latensi.toFixed(4)} ms*\n`
       txt += `┊💐 [ *Comandi Eseguiti* :: *${formatNumber(totalStats)}*\n`
       txt += `┊🌴 [ *Gruppi Registrati* :: *${formatNumber(totalchats)}*\n`
       txt += `╰─────────\n\n`
       txt += `> 🚩 ${textbot}`

let rcanal = {}; // Define rcanal with an appropriate value (e.g., an empty object or the required value)

let img = './media/chatunitybot.mp4'; // Ensure this file path is valid and points to an existing image

if (!fs.existsSync(img)) {
  img = null; // Fallback to null if the file does not exist
}

await conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, m, null, rcanal)
}
handler.help = ['info']
handler.tags = ['main']
handler.command = ['infobot']

export default handler

function formatNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function clockString(ms) {
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [d, ' G ', h, ' O ', m, ' M ', s, ' S'].map(v => v.toString().padStart(2, 0)).join('')
}