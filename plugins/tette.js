let handler = async (m, { conn }) => {
  // Controlla menzione o messaggio quotato
  let user = m.mentionedJid && m.mentionedJid[0]
    ? m.mentionedJid[0]
    : m.quoted
    ? m.quoted.sender
    : null;

  if (!user) {
    return m.reply("Devi menzionare qualcuno 😏");
  }

  // Numeri possibili
  const numeri = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  // Lettere possibili
  const lettere = ["A", "B", "C", "D", "E", "F"];

  // Random
  const numeroRandom = numeri[Math.floor(Math.random() * numeri.length)];
  const letteraRandom = lettere[Math.floor(Math.random() * lettere.length)];

  const misura = `${numeroRandom}${letteraRandom}`;

  let testo = `oh @${user.split("@")[0]} ha una ${misura}`;

  await conn.sendMessage(
    m.chat,
    {
      text: testo,
      mentions: [user],
    },
    { quoted: m }
  );
};

handler.command = ["tette"]; // <-- comando in fondo

module.exports = handler;
