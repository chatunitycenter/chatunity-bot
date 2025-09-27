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

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

function formatNumber(num) {
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k'
  return num.toString()
}

// Lista di 15 frasi +18
const adultPhrases = [
  "Ah… finalmente… non ce la facevo più 😏",
  "Ecco fatto… che sollievo! 🔥",
  "Ho raggiunto il climax… che esplosione! 💥",
  "Non avevo idea che sarebbe stato così intenso… 😈",
  "Oh sì… proprio lì… 🔥",
  "Ancora non riesco a credere… è stato pazzesco! 😳",
  "Che sensazione incredibile… 😏",
  "Sono senza fiato… e soddisfatto 😵‍💫",
  "Wow… non avevo mai provato niente del genere! 🔥",
  "E adesso? Solo relax… e un sorriso 😏",
  "Che esperienza… da ricordare! 😈",
  "Ancora pulsazioni… non finisce mai! 💥",
  "Ahhhh… troppo intenso… 😳",
  "Non so se ripeterei subito… ma che goduria! 🔥",
  "Finalmente… tutto è andato al posto giusto 😏"
]

let handler = async (m, { conn }) => {
  const db = await readDB()
  if (!db[m.sender]) db[m.sender] = { exp: 0, times: 0 }

  let user = db[m.sender]
  const cooldownTime = 7 * 60 * 1000 // 7 minuti

  if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < cooldownTime) {
    await conn.sendMessage(m.chat, {
      text: `⏳ Aspetta ancora un po' prima di… ripetere 😉`,
      contextInfo: { forwardingScore: 99, isForwarded: true }
    }, { quoted: m })
    return
  }

  // Genera XP da 4000 a 9000
  const reward = Math.floor(Math.random() * (9000 - 4000 + 1)) + 4000
  user.exp += reward
  user.times++
  cooldowns[m.sender] = Date.now()

  const nome = await conn.getName(m.sender)
  const phrase = pickRandom(adultPhrases)
  const message = `"${phrase}"\n💫 XP guadagnati: *${formatNumber(reward)}*\nTotale XP: *${formatNumber(user.exp)}*`

  await conn.sendMessage(m.chat, {
    text: message,
    contextInfo: { forwardingScore: 99, isForwarded: true }
  }, { quoted: m })

  await writeDB(db)
}

handler.help = ['adulto']
handler.tags = ['18+']
handler.command = ['adulto', 'vieni', '18']
handler.register = true
export default handler
