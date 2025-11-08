import util from 'util'
import path from 'path'

let user = a => '@' + a.split('@')[0]

function handler(m, { groupMetadata, command, conn, participants }) {
  let ps = groupMetadata.participants.map(v => v.id)
  let a = ps.getRandom()
  let b = ps.getRandom()
  let c = ps.getRandom()
  let d = ps.getRandom()
  let e = ps.getRandom()
  let f = ps.getRandom()
  let g = ps.getRandom()
  let h = ps.getRandom()
  let i = ps.getRandom()
  let j = ps.getRandom()

  if (command == 'topgays') {
    let vn = './media/gay2.mp3'
    let top = `
⋆ ︵︵ ★ 🌈 TOP 10 LGBT 🌈 ★ ︵︵ ⋆

꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧
୧ 1️⃣ ${user(a)}
୧ 2️⃣ ${user(b)}
୧ 3️⃣ ${user(c)}
୧ 4️⃣ ${user(d)}
୧ 5️⃣ ${user(e)}
୧ 6️⃣ ${user(f)}
୧ 7️⃣ ${user(g)}
୧ 8️⃣ ${user(h)}
୧ 9️⃣ ${user(i)}
୧ 🔟 ${user(j)}
꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧

╰♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩
  > Classifica casuale
╰♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩
`
    m.reply(top, null, { mentions: [a, b, c, d, e, f, g, h, i, j]})
    conn.sendMessage(m.chat, { quoted: m })    
  }
    
  if (command == 'topnazi') {
    let vn = './media/otaku.mp3'
    let top = `
⋆ ︵︵ ★ ⚡ TOP 10 NAZI ⚡ ★ ︵︵ ⋆

꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧
୧ 1️⃣ ${user(a)}
୧ 2️⃣ ${user(b)}
୧ 3️⃣ ${user(c)}
୧ 4️⃣ ${user(d)}
୧ 5️⃣ ${user(e)}
୧ 6️⃣ ${user(f)}
୧ 7️⃣ ${user(g)}
୧ 8️⃣ ${user(h)}
୧ 9️⃣ ${user(i)}
୧ 🔟 ${user(j)}
꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧

╰♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩
  > Classifica casuale
╰♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩
`
    m.reply(top, null, { mentions: [a, b, c, d, e, f, g, h, i, j]})
    conn.sendMessage(m.chat, { quoted: m })        
  }
}

handler.help = handler.command = ['topgays','topnazi']
handler.tags = ['games']
handler.group = true

export default handler
