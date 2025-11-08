import fetch from 'node-fetch'

const rarityCosts = {
  'Comune': 100,
  'Non Comune': 1000,
  'Raro': 10000,
  'Leggendario': 100000
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function getEvolution(name) {
  try {
    const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name.toLowerCase()}`)
    if (!speciesRes.ok) return null
    const speciesData = await speciesRes.json()
    const evoChainUrl = speciesData.evolution_chain?.url
    if (!evoChainUrl) return null

    const evoRes = await fetch(evoChainUrl)
    if (!evoRes.ok) return null
    const evoData = await evoRes.json()

    function findNextEvolution(chain) {
      if (chain.species.name.toLowerCase() === name.toLowerCase()) {
        return chain.evolves_to?.[0]?.species?.name || null
      }
      for (const evo of chain.evolves_to) {
        const result = findNextEvolution(evo)
        if (result) return result
      }
      return null
    }

    const nextEvo = findNextEvolution(evoData.chain)
    return nextEvo
  } catch (err) {
    console.error('Errore durante il recupero dell\'evoluzione:', err)
    return null
  }
}

let handler = async (m, { conn, args }) => {
  const user = m.sender
  global.db.data.users[user] = global.db.data.users[user] || {}
  const data = global.db.data.users[user]

  data.mattecash = data.mattecash || 0
  data.pokemons = data.pokemons || []

  const name = args.join(' ')
  if (!name) return m.reply('📛 Specifica il nome del Pokémon da evolvere.\nEsempio: *.evolvi Charmander*')

  const baseCard = data.pokemons.find(p => p.name.toLowerCase() === name.toLowerCase())
  if (!baseCard) return m.reply(`❌ Non possiedi *${name}*`)

  const cost = rarityCosts[baseCard.rarity]
  if (data.mattecash < cost) {
    return m.reply(`⛔ Non hai abbastanza Mattecash!\n💰 Hai: *${data.mattecash}*\n💸 Richiesti: *${cost}*`)
  }

  const nextForm = await getEvolution(baseCard.name)
  if (!nextForm) return m.reply(`⛔ *${baseCard.name}* non può evolversi ulteriormente.`)

  data.mattecash -= cost

  await conn.sendMessage(m.chat, { text: `✨ *${baseCard.name}* sta evolvendo...`, mentions: [user] }, { quoted: m })
  await sleep(1000)
  await conn.sendMessage(m.chat, { text: '🔄 Evoluzione in corso...', mentions: [user] }, { quoted: m })
  await sleep(1000)
  await conn.sendMessage(m.chat, { text: `🎉 *${baseCard.name}* si è evoluto in *${nextForm}*!`, mentions: [user] }, { quoted: m })

  const index = data.pokemons.indexOf(baseCard)
  if (index > -1) {
    data.pokemons.splice(index, 1)
  }

  data.pokemons.push({
    name: nextForm,
    rarity: baseCard.rarity,
    type: baseCard.type
  })

  return m.reply(`✅ Evoluzione completata!\n💰 Mattecash rimasti: *${data.mattecash}*`)
}

handler.help = ['evolvi <nome>']
handler.tags = ['pokemon']
handler.command = /^evolvi$/i

export default handler