import fs from 'fs/promises'
import path from 'path'

const dbPath = path.resolve('./xp-counter.json')
let cooldowns = {}

// Funzioni di gestione DB
async function readDB() {
  try {
    const data = await fs.readFile(dbPath, 'utf-8')
    return JSON.parse(data)
  } catch (e) {
    if (e.code === 'ENOENT') {
      await fs.writeFile(dbPath, '{}', 'utf-8')
      return {}
    } else throw e
  }
}

async function writeDB(db) {
  await fs.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf-8')
}

// Funzione per formattare i secondi in minuti:secondi
function secondiAMMS(secondi) {
  let minuti = Math.floor(secondi / 60)
  let secondiRimanenti = secondi % 60
  return `${minuti}m ${secondiRimanenti}s`
}

let handler = async (m, { conn }) => {
  const db = await readDB()
  if (!db[m.sender]) db[m.sender] = { exp: 0 }

  let user = db[m.sender]

  // Cooldown 5 minuti
  const tempoAttesa = 5 * 60 * 1000
  if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tempoAttesa) {
    let tempoRimanente = secondiAMMS(Math.ceil((cooldowns[m.sender] + tempoAttesa - Date.now()) / 1000))
    const nome = await conn.getName(m.sender)
    await conn.sendMessage(m.chat, { 
      text: `⏳ ${nome}, aspetta ancora ${tempoRimanente} prima di minare di nuovo.`,
      contextInfo: { forwardingScore: 99, isForwarded: true }
    }, { quoted: m })
    return
  }

  // Mining XP casuale
  const risultato = Math.floor(Math.random() * 5000)
  user.exp = Number(user.exp) + risultato

  const nome = await conn.getName(m.sender)
  await conn.sendMessage(m.chat, { 
    text: `⛏ *MINING COMPLETATO!*\n\nHai ottenuto *${risultato} XP*!\nNuovo totale: *${user.exp} XP*`,
    contextInfo: { forwardingScore: 99, isForwarded: true }
  }, { quoted: m })
  
  cooldowns[m.sender] = Date.now()
  
  // Salvataggio nel DB
  await writeDB(db)

  // Reazione opzionale
  await m.react('⛏')
}

handler.help = ['mina']
handler.tags = ['rpg']
handler.command = ['mina', 'miming', 'mine']
handler.register = true
export default handler
