//infomsg di Onix, di Riad
//la perfezione.


import { createHash } from 'crypto';
import PhoneNumber from 'awesome-phonenumber';

const handler = async (m, { conn }) => {
  try {
    if (m?.buttonId === '.setanni') {
      return conn.sendMessage(m.chat, { text: 'Per impostare la tua età usa il comando .setanni <età>\nPer rimuovere la tua età usa .eliminaanni' }, { quoted: m });
    }

    if (m?.buttonId === '.setig') {
      return conn.sendMessage(m.chat, { text: 'Specifica un nome utente Instagram con .setig <user> oppure usa .delig per rimuoverlo.' }, { quoted: m });
    }

    if (!m.isGroup) {
      return conn.sendMessage(m.chat, { text: "❌ Questo comando può essere usato solo nei gruppi." }, { quoted: m });
    }

    const mention = m.mentionedJid?.[0] || (m.quoted ? m.quoted.sender : m.sender);
    const who = mention || m.sender;

    if (!global.db.data.users[who]) {
      global.db.data.users[who] = { 
        money: 0, warn: 0, warnlink: 0, 
        muto: false, banned: false, 
        messaggi: 0, blasphemy: 0, 
        blasphemyCounted: 0,
        command: 0, vittorieSlot: 0, 
        categoria: null, instagram: null, 
        eta: null, genere: null
      };
    }

    const user = global.db.data.users[who];

    const gradi = [
      "𝐏𝐫𝐢𝐧𝐜𝐢𝐩𝐢𝐚𝐧𝐭𝐞 𝐈 😐", "𝐏𝐫𝐢𝐧𝐜𝐢𝐩𝐢𝐚𝐧𝐭𝐞 𝐈𝐈 😐",
      "𝐑𝐞𝐜𝐥𝐮𝐭𝐚 𝐈 🙂", "𝐑𝐞𝐜𝐥𝐮𝐭𝐚 𝐈𝐈 🙂",
      "𝐀𝐯𝐚𝐧𝐳𝐚𝐭𝐨 𝐈 🫡", "𝐀𝐯𝐚𝐧𝐝𝐚𝐭𝐨 𝐈𝐈 🫡",
      "𝐁𝐨𝐦𝐛𝐞𝐫 𝐈 😎", "𝐁𝐨𝐦𝐛𝐞𝐫 𝐈𝐈 😎",
      "𝐏𝐫𝐨 𝐈 😤", "𝐏𝐫𝐨 𝐈𝐈 😤",
      "𝐄́𝐥𝐢𝐭𝐞 𝐈 🤩", "𝐄́𝐭𝐢𝐭𝐞 𝐈𝐈 🤩",
      "𝐌𝐚𝐬𝐭𝐞𝐫 𝐈 💪🏼", "𝐌𝐚𝐬𝐭𝐞𝐫 𝐈𝐈 💪🏼",
      "𝐌𝐢𝐭𝐢𝐜𝐨 𝐈 🔥", "𝐌𝐢𝐭𝐢𝐜𝐨 𝐈𝐈 🔥",
      "𝐄𝐫𝐨𝐞 𝐈 🎖", "𝐄𝐫𝐨𝐞 𝐈𝐈 🎖",
      "𝐂𝐚𝐦𝐩𝐢𝐨𝐧𝐞 𝐈 🏆", "𝐂𝐚𝐦𝐩𝐢𝐨𝐧𝐞 𝐈𝐈 🏆",
      "𝐃𝐨𝐦𝐢𝐧𝐚𝐭𝐨𝐫𝐞 𝐈 🥶", "𝐃𝐨𝐦𝐢𝐧𝐚𝐭𝐨𝐫𝐞 𝐈𝐈 🥶",
      "𝐒𝐭𝐞𝐥𝐥𝐚𝐫𝐞 𝐈 💫", "𝐒𝐭𝐞𝐥𝐥𝐚𝐫𝐞 𝐈𝐈 💫",
      "𝐂𝐨𝐬𝐦𝐢𝐜𝐨 𝐈 🔮", "𝐂𝐨𝐬𝐦𝐢𝐜𝐨 𝐈𝐈 🔮",
      "𝐓𝐢𝐭𝐚𝐧𝐨 𝐈 😈", "𝐓𝐢𝐭𝐚𝐧𝐨 𝐈𝐈 😈",
      "𝐋𝐞𝐠𝐠𝐞𝐧𝐝𝐚 𝐈 ⭐️", "𝐋𝐞𝐠𝐠𝐞𝐧𝐝𝐚 𝐈𝐈 ⭐️",
    ];

    const livello = Math.floor(user.messaggi / 1000);
    const grado = livello >= 30 ? "𝐄𝐜𝐥𝐢𝐩𝐬𝐢𝐚𝐧𝐨 ❤️‍🔥" : (gradi[livello] || "-");

    const groupMetadata = await conn.groupMetadata(m.chat);
    const participants = groupMetadata.participants;
    const groupOwner = groupMetadata.owner;

    const participant = participants.find(p => p.id === who);
    const isAdmin = participant && (participant.admin === 'admin' || participant.admin === 'superadmin');
    const isFounder = who === groupOwner;

    const ruolo = isFounder ? '𝐅𝐨𝐮𝐧𝐝𝐞𝐫 ⚜️' : isAdmin ? '𝐀𝐝𝐦𝐢𝐧 👑' : '𝐌𝐞𝐦𝐛𝐫𝐨 🤍';

    const emojiGenere = user.genere === "maschio" ? "🚹" : user.genere === "femmina" ? "🚺" : "𝐍𝐨𝐧 𝐢𝐦𝐩𝐨𝐬𝐭𝐚𝐭𝐨";

    let pic;
    try {
      const res = await fetch(pic);
      const arrayBuffer = await res.arrayBuffer();
      pic = Buffer.from(arrayBuffer);
    } catch (error) {
      const res = await fetch('https://qu.ax/LoGxD.png');
      const arrayBuffer = await res.arrayBuffer();
      pic = Buffer.from(arrayBuffer);
    }

    conn.sendMessage(m.chat, {
      text: `
⋆ ︵︵ ★ 𝐈𝐍𝐅𝐎 𝐔𝐓𝐄𝐍𝐓𝐄 ★ ︵︵ ⋆

꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧
୧ 📝 *Messaggi:* ${user.messaggi || 0}
୧ ⚠️ *Warn:* ${user.warn || 0} / 4
୧ 🟣 *Ruolo:* ${ruolo}
୧ 🗓️ *Età:* ${user.eta ? user.eta + " anni" : "Non impostata"}
୧ 🚻 *Genere:* ${emojiGenere}
୧ 🤬 *Bestemmie:* ${user.blasphemy || 0}
${user.instagram ? `୧ 🌐 instagram.com/${user.instagram}` : '୧ 🌐 *Instagram:* Non impostato'}
꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧
`,
      contextInfo: {
        mentionedJid: [who],
        externalAdReply: {
          title: `${user.name || 'Sconosciuto'}`,
          body: `𝒄𝒓𝒆𝒂𝒛𝒊𝒐𝒏𝒆 𝒅𝒊 𝑶𝒏𝒊𝒙🌟`,
          thumbnail: pic,
        }
      },
      buttons: [
        { buttonId: '.setanni', buttonText: { displayText: '🗓️ Imposta Età' }, type: 1 },
        { buttonId: '.setgenere maschio', buttonText: { displayText: '🚹 Genere Maschio' }, type: 1 },
        { buttonId: '.setgenere femmina', buttonText: { displayText: '🚺 Genere Femmina' }, type: 1 },
        { buttonId: '.setig', buttonText: { displayText: '🌐 Imposta IG' }, type: 1 }
      ],
      footer: 'Imposta i tuoi dati personali:',
      viewOnce: true,
      headerType: 4
    }, { quoted: m });

  } catch (error) {
    console.error(error);
  }
};

handler.command = /^(info)$/i;
export default handler;
