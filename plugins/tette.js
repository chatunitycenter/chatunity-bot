let handler = async (m, { conn }) => {
  let user = m.mentionedJid && m.mentionedJid[0]
    ? m.mentionedJid[0]
    : m.quoted
    ? m.quoted.sender
    : null;

  if (!user) {
    return m.reply("Devi menzionare qualcuno 😏");
  }

  const numeri = [1,2,3,4,5,6,7,8,9];
  const lettere = ["A","B","C","D","E","F"];

  const numeroRandom = numeri[Math.floor(Math.random() * numeri.length)];
  const letteraRandom = lettere[Math.floor(Math.random() * lettere.length)];
  const misura = `${numeroRandom}${letteraRandom}`;

  const fortuna = Math.floor(Math.random() * 101); // 0-100%

  const frasi = [
    `oh @${user.split("@")[0]} ha una ${misura} 😳`,
    `attenzione ⚠️ @${user.split("@")[0]} possiede una ${misura}`,
    `le statistiche parlano chiaro 📊 @${user.split("@")[0]} ha una ${misura}`,
    `gli esperti confermano 🧪 @${user.split("@")[0]} ha una ${misura}`,
    `breaking news 📰 @${user.split("@")[0]} ha una ${misura}`
  ];

  const fraseRandom = frasi[Math.floor(Math.random() * frasi.length)];

  let testoFinale = `${fraseRandom}\n🍀 Fortuna: ${fortuna}%`;

  await conn.sendMessage(
    m.chat,
    {
      text: testoFinale,
      mentions: [user],
    },
    { quoted: m }
  );
};

handler.command = ["tette"]; // comando in fondo

module.exports = handler;
