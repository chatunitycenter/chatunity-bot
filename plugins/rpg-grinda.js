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

// Lista di frasi di grind
const grindPhrases = [
  () => `Ho grindato per ${Math.floor(Math.random()*12)+1} ore su Fortnite e ho finito il pass!`,
  () => `Finalmente dopo ${Math.floor(Math.random()*6)+1} ore sono arrivato a ${Math.floor(Math.random()*31101)+13900} coppe!`,
  () => `Grinding su LoL per ${Math.floor(Math.random()*8)+1} ore, ho raggiunto il rank ${['Bronze','Silver','Gold','Platinum','Diamond','Master','Challenger'][Math.floor(Math.random()*7)]}!`,
  () => `Ho raccolto tutti i loot in ${Math.floor(Math.random()*6)+1} ore su GTA Online.`,
  () => `Dopo ${Math.floor(Math.random()*12)+1} ore di farm in WoW, ho ottenuto ${Math.floor(Math.random()*5000)+1000} oro!`,
  () => `Ho passato ${Math.floor(Math.random()*5)+1} ore a grindare crafting in Minecraft.`,
  () => `Finalmente raggiunto livello ${Math.floor(Math.random()*100)+1} su Diablo!`,
  () => `Grinding in Rocket League per ${Math.floor(Math.random()*6)+1} ore, ho preso il rank ${['Bronze','Silver','Gold','Platinum','Diamond','Champion','Grand Champion'][Math.floor(Math.random()*7)]}.`,
  () => `Dopo ${Math.floor(Math.random()*8)+1} ore su Apex Legends, ho sbloccato ${Math.floor(Math.random()*20)+1} leggende nuove.`,
  () => `Ho fatto missioni in GTA V per ${Math.floor(Math.random()*10)+1} ore e ho guadagnato $${Math.floor(Math.random()*100000)+5000}!`,
  () => `Farmando in Valorant per ${Math.floor(Math.random()*5)+1} ore, ho salito di ${Math.floor(Math.random()*10)+1} rank.`,
  () => `Ho grindato in Elden Ring per ${Math.floor(Math.random()*6)+1} ore e ottenuto ${Math.floor(Math.random()*10)+1} armi leggendarie.`,
  () => `Dopo ${Math.floor(Math.random()*7)+1} ore su Genshin Impact, ho ottenuto ${Math.floor(Math.random()*10)+1} personaggi 5★.`,
  () => `Ho passato ${Math.floor(Math.random()*5)+1} ore in Among Us senza morire nemmeno una volta!`,
  () => `Dopo ${Math.floor(Math.random()*6)+1} ore di farming su Clash Royale, ho raccolto ${Math.floor(Math.random()*100)+20} carte epiche.`,
  () => `Ho grindato su Pokémon GO per ${Math.floor(Math.random()*8)+1} ore e catturato ${Math.floor(Math.random()*50)+10} Pokémon rari.`,
  () => `Dopo ${Math.floor(Math.random()*10)+1} ore di farming in Runescape, ho guadagnato ${Math.floor(Math.random()*500000)+100000} monete.`,
  () => `Ho grindato in Counter Strike per ${Math.floor(Math.random()*6)+1} ore e sbloccato skin per ${Math.floor(Math.random()*20)+5} armi.`,
  () => `Grinding su Animal Crossing per ${Math.floor(Math.random()*5)+1} ore, ho raccolto ${Math.floor(Math.random()*100)+50} frutti rari.`,
  () => `Dopo ${Math.floor(Math.random()*7)+1} ore in The Sims, ho raggiunto la carriera di livello massimo!`,
  () => `Ho grindato su Destiny 2 per ${Math.floor(Math.random()*8)+1} ore e ottenuto ${Math.floor(Math.random()*10)+1} pezzi leggendari.`,
  () => `Dopo ${Math.floor(Math.random()*6)+1} ore di farming in Terraria, ho creato il miglior equipaggiamento possibile.`,
  () => `Ho grindato per ${Math.floor(Math.random()*5)+1} ore in Skyrim e completato tutte le missioni secondarie.`,
  () => `Dopo ${Math.floor(Math.random()*4)+1} ore in Fall Guys, ho vinto ${Math.floor(Math.random()*10)+1} crown.`,
  () => `Ho grindato in Apex Legends per ${Math.floor(Math.random()*7)+1} ore e ottenuto ${Math.floor(Math.random()*50)+10} badge.`,
  () => `Dopo ${Math.floor(Math.random()*5)+1} ore in Valorant, ho migliorato tutte le mie abilità.`,
  () => `Grinding in Fortnite Creative per ${Math.floor(Math.random()*6)+1} ore, ho completato tutte le mappe custom.`,
  () => `Ho grindato su Diablo 4 per ${Math.floor(Math.random()*8)+1} ore e ottenuto set completo di armi leggendarie.`,
  () => `Dopo ${Math.floor(Math.random()*7)+1} ore su League of Legends, ho sbloccato ${Math.floor(Math.random()*5)+1} campioni.`,
  () => `Ho grindato su GTA Online per ${Math.floor(Math.random()*6)+1} ore e completato tutte le missioni giornaliere.`,
  () => `Dopo ${Math.floor(Math.random()*5)+1} ore su Rocket League, ho ottenuto il rank più alto in tutti i tornei.`,
  () => `Ho grindato in Minecraft per ${Math.floor(Math.random()*6)+1} ore e costruito una città gigante.`,
  () => `Dopo ${Math.floor(Math.random()*4)+1} ore su Fortnite, ho ottenuto tutti gli oggetti cosmetici del battle pass.`,
  () => `Ho grindato in Call of Duty per ${Math.floor(Math.random()*5)+1} ore e sbloccato tutte le armi leggendarie.`,
  () => `Dopo ${Math.floor(Math.random()*6)+1} ore su WoW, ho completato tutte le dungeon e raid.`,
  () => `Ho grindato in Genshin Impact per ${Math.floor(Math.random()*8)+1} ore e ottenuto tutti i personaggi desiderati.`,
  () => `Dopo ${Math.floor(Math.random()*5)+1} ore in Valorant, ho completato tutte le missioni stagionali.`,
  () => `Ho grindato in Skyrim per ${Math.floor(Math.random()*7)+1} ore e raggiunto il massimo livello di abilità in tutte le skill.`,
  () => `Dopo ${Math.floor(Math.random()*6)+1} ore su Among Us, ho scoperto tutti i trucchi segreti!`,
  () => `Ho grindato in Destiny 2 per ${Math.floor(Math.random()*5)+1} ore e completato tutte le attività settimanali.`,
  () => `Dopo ${Math.floor(Math.random()*8)+1} ore su Fall Guys, ho vinto tutti i livelli della stagione.`,
  () => `Ho grindato in Rocket League per ${Math.floor(Math.random()*7)+1} ore e ottenuto tutte le skin dei veicoli.`,
  () => `Dopo ${Math.floor(Math.random()*6)+1} ore in Fortnite, ho raggiunto il massimo livello di battaglia.`,
  () => `Ho grindato su GTA V Online per ${Math.floor(Math.random()*8)+1} ore e ottenuto tutte le auto leggendarie.`,
  () => `Dopo ${Math.floor(Math.random()*5)+1} ore su Diablo 4, ho potenziato tutte le armi e armature.`,
  () => `Ho grindato in LoL per ${Math.floor(Math.random()*6)+1} ore e ottenuto tutti i frammenti campione.`,
  () => `Dopo ${Math.floor(Math.random()*4)+1} ore su Minecraft, ho completato tutte le achievements.`,
  () => `Ho grindato su Valorant per ${Math.floor(Math.random()*6)+1} ore e ottenuto tutti i trofei stagionali.`,
  () => `Dopo ${Math.floor(Math.random()*5)+1} ore in WoW, ho completato tutte le missioni giornaliere e settimanali.`,
  () => `Ho grindato su Fortnite per ${Math.floor(Math.random()*7)+1} ore e ottenuto tutte le skin epiche.`,
  () => `Dopo ${Math.floor(Math.random()*6)+1} ore su Rocket League, ho completato tutte le sfide della stagione.`
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
      text: `⏳ ${nome}, aspetta ancora *${remainingTime}* prima di grindare di nuovo.`,
      contextInfo: { forwardingScore: 99, isForwarded: true }
    }, { quoted: m })
    return
  }

  const reward = Math.floor(Math.random() * 5000)
  user.exp += reward
  cooldowns[m.sender] = Date.now()

  const nome = await conn.getName(m.sender)
  const phrase = pickRandom(grindPhrases)()
  const message = `"${phrase}"\nXP guadagnati: *${formatNumber(reward)} XP*\nTotale XP: *${formatNumber(user.exp)}* 💫`

  await conn.sendMessage(m.chat, {
    text: message,
    contextInfo: { forwardingScore: 99, isForwarded: true }
  }, { quoted: m })

  await writeDB(db)
}

handler.help = ['grinda']
handler.tags = ['rpg']
handler.command = ['grinda', 'grind', 'g']
handler.register = true
export default handler
