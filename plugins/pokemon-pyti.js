let handler = async (m, { conn }) => {
  const user = m.sender;
  global.db.data.users[user] = global.db.data.users[user] || {};
  const data = global.db.data.users[user];

  data.pityCounter = data.pityCounter || 0;

  const rimanenti = Math.max(15 - data.pityCounter, 0);

  let messaggio = `📊 *Sistema Pity Darkness*\n\n`;
  messaggio += `🔁 Pacchetti aperti senza Darkness: *${data.pityCounter}*\n`;
  messaggio += `🎯 Prossimo Darkness garantito tra: *${rimanenti}* pacchetti\n`;

  if (data.pityCounter >= 15) {
    messaggio += `\n✨ Il prossimo pacchetto ha un Darkness *garantito*!`;
  }

  await conn.sendMessage(m.chat, { text: messaggio, mentions: [user] }, { quoted: m });
};

handler.help = ['pity'];
handler.tags = ['pokemon'];
handler.command = /^pity$/i;

export default handler;