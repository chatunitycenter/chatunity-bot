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

// Funzioni di utilità
function formatNumber(num) {
  if (num >= 1000 && num < 1000000) return (num / 1000).toFixed(1) + 'k'
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
  return num.toString()
}

function formatTime(seconds) {
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60
  return `${minutes} minuti e ${remainingSeconds} secondi`
}

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

// Lista lavori
const jobs = [
  "Hai lavorato in una fabbrica di biscotti e guadagni",
  "Lavori per un'azienda militare privata e ottieni",
  "Organizzi una degustazione di vini e ricevi",
  "Pulendo un camino trovi",
  "Sviluppi videogiochi e guadagni",
  "Hai fatto gli straordinari in ufficio per",
  "Lavori come wedding planner e guadagni",
  "Qualcuno ha messo in scena uno spettacolo teatrale. Per averlo guardato ricevi",
  "Hai comprato e venduto articoli guadagnando",
  "Lavori nel ristorante della nonna come chef e guadagni",
  "Hai lavorato 10 minuti in una pizzeria. Hai guadagnato",
  "Scrivi i biglietti dei biscotti della fortuna e guadagni",
  "Vendi oggetti inutili dal tuo borsello e guadagni",
  "Lavori tutto il giorno in azienda per",
  "Disegni un logo per un'azienda e guadagni",
  "Hai lavorato in una tipografia guadagnando",
  "Potando siepi guadagni",
  "Fai il doppiatore per SpongeBob e guadagni",
  "Coltivando l'orto ottieni",
  "Costruisci castelli di sabbia e guadagni",
  "Fai l'artista di strada e guadagni",
  "Fai volontariato e ricevi",
  "Ripari un carro armato in Afghanistan e la squadra ti paga",
  "Lavori come ambientalista e guadagni",
  "Lavori a Disneyland travestito da panda guadagnando",
  "Ripari videogiochi arcade e ricevi",
  "Fai lavoretti in città e guadagni",
  "Rimuovi della muffa tossica e guadagni",
  "Risolvi un caso di colera e il governo ti premia con",
  "Lavori come zoologo guadagnando",
  "Vendi panini al pesce e ottieni",
  "Ripari slot machine e ricevi"
]

let handler = async (m, { conn }) => {
  const db = await readDB()
  if (!db[m.sender]) db[m.sender] = { exp: 0 }

  let user = db[m.sender]
  const cooldownTime = 5 * 60 * 1000 // 5 minuti

  if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < cooldownTime) {
    let remainingTime = formatTime(Math.ceil((cooldowns[m.sender] + cooldownTime - Date.now()) / 1000))
    const nome = await conn.getName(m.sender)
    await conn.sendMessage(m.chat, {
      text: `⏳ ${nome}, aspetta ancora *${remainingTime}* prima di lavorare di nuovo.`,
      contextInfo: { forwardingScore: 99, isForwarded: true }
    }, { quoted: m })
    return
  }

  const reward = Math.floor(Math.random() * 5000)
  user.exp += reward
  cooldowns[m.sender] = Date.now()

  const nome = await conn.getName(m.sender)
  const jobMessage = `${pickRandom(jobs)} *${formatNumber(reward)} XP* 💫\nNuovo totale: *${user.exp} XP*`

  await conn.sendMessage(m.chat, {
    text: `💼 ${nome}, ${jobMessage}`,
    contextInfo: { forwardingScore: 99, isForwarded: true }
  }, { quoted: m })

  await writeDB(db)
}

handler.help = ['lavora']
handler.tags = ['rpg']
handler.command = ['lavora', 'lavoro', 'w']
handler.register = true
export default handler
