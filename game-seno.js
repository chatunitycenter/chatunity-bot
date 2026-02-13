// Ranking temporaneo (si resetta al riavvio)
global.tetteRank = global.tetteRank || {};

let handler = async (m, { conn }) => {

  let user = m.mentionedJid?.[0] || m.quoted?.sender;
  if (!user) return m.reply("Devi menzionare qualcuno 😏");

  const numeri = [1,2,3,4,5,6,7,8,9];
  const lettere = ["A","B","C","D","E","F"];

  const numeroRandom = numeri[Math.floor(Math.random() * numeri.length)];
  const letteraRandom = lettere[Math.floor(Math.random() * lettere.length)];

  let misura = `${numeroRandom}${letteraRandom}`;

  // 💀 10% possibilità misura negativa
  if (Math.random() < 0.10) {
    misura = `-${numeroRandom}${letteraRandom}`;
  }

  // 🔥 Sistema rarità
  const roll = Math.random();
  let rarita = "COMMON";

  if (roll > 0.95) rarita = "MYTHIC 🔱";
  else if (roll > 0.85) rarita = "LEGENDARY 🔥";
  else if (roll > 0.65) rarita = "EPIC ⚡";
  else if (roll > 0.40) rarita = "RARE ⭐";

  const fortuna = Math.floor(Math.random() * 101);

  const frasi = [
    `oh @${user.split("@")[0]} ha una ${misura}`,
    `analisi completata 🧪 @${user.split("@")[0]} possiede una ${misura}`,
    `i calcoli parlano chiaro 📊 @${user.split("@")[0]} ha una ${misura}`,
    `attenzione gruppo ⚠️ @${user.split("@")[0]} ha una ${misura}`,
    `breaking news 📰 @${user.split("@")[0]} ha una ${misura}`
  ];

  const fraseRandom = frasi[Math.floor(Math.random() * frasi.length)];

  // 🏆 Ranking
  if (!global.tetteRank[user]) global.tetteRank[user] = 0;
  global.tetteRank[user] += 1;

  let testoFinale = `
${fraseRandom}

🎲 Rarità: ${rarita}
🍀 Fortuna: ${fortuna}%
🏆 Livello Caos: ${global.tetteRank[user]}
  `.trim();

  await conn.sendMessage(
    m.chat,
    {
      text: testoFinale,
      mentions: [user],
    },
    { quoted: m }
  );
};

handler.help = ['tette @tag'];
handler.tags = ['fun'];
handler.command = /^tette$/i;

module.exports = handler;
