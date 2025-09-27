import fetch from 'node-fetch';

const API_KEY = '9746da2c-ac5f-487c-b4ae-fc55d1cd58b3';
const rarities = { 
  base: ['Common', 'Common', 'Uncommon'], 
  imperium: ['Common', 'Uncommon', 'Rare'], 
  premium: ['Rare', 'Rare', 'Rare Holo'],
  darkness: ['Rare Holo', 'Rare Holo', 'Rare Holo']
};

const convertRarity = r => ({ Common: 'Comune', Uncommon: 'Non Comune', Rare: 'Raro', 'Rare Holo': 'Leggendario' }[r] || r);

async function getCard(rarity) {
  try {
    const res = await fetch(`https://api.pokemontcg.io/v2/cards?q=rarity:"${encodeURIComponent(rarity)}"&pageSize=50`, { 
      headers: { 'X-Api-Key': API_KEY } 
    });
    
    if (!res.ok) throw new Error(`API Error: ${res.status}`);
    
    const json = await res.json();
    const cards = json.data || [];
    if (!cards.length) return null;
    
    const card = cards[Math.floor(Math.random() * cards.length)];
    return {
      name: card.name,
      type: card.types?.join('/') || '???',
      rarity: convertRarity(rarity),
      image: card.images?.large || card.images?.small || null,
      hp: card.hp || '???',
      shiny: Math.random() < 0.05,
      level: Math.floor(Math.random() * 100) + 1
    };
  } catch (err) {
    console.error(`API Error: ${err}`);
    return null;
  }
}

const delay = ms => new Promise(r => setTimeout(r, ms));

async function darknessAnim(conn, m, pokemon, user) {
  const frames = ['🌑...', '🌑🌑...', '🌑🌑🌑 *???*', '🌑🌑🌑 *Una presenza oscura si manifesta...*', `✨🌑 *${pokemon.name.toUpperCase()}* appare dalle tenebre!`];
  for (let frame of frames) {
    await conn.sendMessage(m.chat, { text: frame, mentions: [user] }, { quoted: m });
    await delay(800);
  }
  await conn.sendMessage(m.chat, {
    image: { url: pokemon.image },
    caption: `🌑 *${pokemon.name}* (${pokemon.rarity})\n🔰 Tipo: ${pokemon.type} | Lvl: ${pokemon.level}${pokemon.shiny ? ' ✨ Shiny' : ''}`,
    mentions: [user]
  }, { quoted: m });
}

let handler = async (m, { conn, args }) => {
  const user = m.sender;
  global.db.data.users[user] = global.db.data.users[user] || {};
  const data = global.db.data.users[user];
  data.packInventory = data.packInventory || { base: 0, imperium: 0, premium: 0, darkness: 0 };
  data.pokemons = data.pokemons || [];

  const packType = args[0]?.toLowerCase();
  if (!['base', 'imperium', 'premium', 'darkness'].includes(packType)) {
    return m.reply(`❌ Specifica: *base*, *imperium*, *premium* o *darkness*.\n\nEsempio: *.apripokemon base*`);
  }

  if ((data.packInventory[packType] || 0) <= 0) {
    return m.reply(`⛔ Non hai pacchetti *${packType.toUpperCase()}*.`);
  }

  data.packInventory[packType]--;

  await conn.sendMessage(m.chat, { text: '🎁 Aprendo il pacchetto...', mentions: [user] }, { quoted: m });
  await delay(1200);
  await conn.sendMessage(m.chat, { text: '✨ Rivelando le carte...', mentions: [user] }, { quoted: m });
  await delay(1200);

  const cards = (await Promise.all(rarities[packType].map(r => getCard(r)))).filter(Boolean);

  if (packType === 'darkness' && cards.length > 0) {
    const darkCard = cards[0];
    darkCard.rarity = 'Misterioso';
    await darknessAnim(conn, m, darkCard, user);
    data.pokemons.push(darkCard);
    return;
  }

  data.pityCounter = data.pityCounter || 0;
  const foundDarkness = Math.random() < 0.10 || data.pityCounter >= 15;

  if (foundDarkness && packType !== 'darkness') {
    const darkness = await getCard('Rare Holo');
    if (darkness) {
      darkness.rarity = 'Misterioso';
      data.packInventory.darkness = (data.packInventory.darkness || 0) + 1;
      await darknessAnim(conn, m, darkness, user);
      data.pokemons.push(darkness);
      data.pityCounter = 0;
      return;
    }
  } else {
    data.pityCounter++;
  }

  if ((packType === 'imperium' || packType === 'premium') && Math.random() < 0.1) {
    const bonus = await getCard('Rare Holo');
    if (bonus) cards.push(bonus);
  }

  cards.forEach(card => data.pokemons.push(card));

  if (!cards.length) return m.reply(`😢 Nessuna carta trovata.`);

  const rarityRank = { 'Comune': 1, 'Non Comune': 2, 'Raro': 3, 'Leggendario': 4, 'Misterioso': 5 };
  const best = cards.sort((a, b) => (rarityRank[b.rarity] || 0) - (rarityRank[a.rarity] || 0))[0];

  const msg = `🎉 Hai aperto un pacchetto *${packType.toUpperCase()}*:\n\n✨ *${best.name}* (${best.rarity})${best.shiny ? ' ✨ Shiny' : ''}\n🔰 Tipo: ${best.type} | Lvl: ${best.level}\n\n📦 Pacchetti rimasti: *${data.packInventory[packType]}* ${packType}`;

  await conn.sendMessage(m.chat, {
    ...(best.image ? { image: { url: best.image }, caption: msg } : { text: msg }),
    mentions: [user]
  }, { quoted: m });
};

handler.help = ['apri <base|imperium|premium|darkness>'];
handler.tags = ['pokemon'];
handler.command = /^apripokemon$/i;

export default handler;