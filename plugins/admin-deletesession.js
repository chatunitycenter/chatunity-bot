import { existsSync, promises as fsPromises } from 'fs';
import path from 'path';

const handler = async (m, { conn, usedPrefix, command }) => {
  if (global.conn.user.jid !== conn.user.jid) {
    return conn.sendMessage(m.chat, {
      text: "*🚨 𝐔𝐭𝐢𝐥𝐢𝐳𝐳𝐚 𝐪𝐮𝐞𝐬𝐭𝐨 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐝𝐢𝐫𝐞𝐭𝐭𝐚𝐦𝐞𝐧𝐭𝐞 𝐧𝐞𝐥 𝐧𝐮𝐦𝐞𝐫𝐨 𝐝𝐞𝐥 𝐛𝐨𝐭.*"
    }, { quoted: m });
  }

  try {
    const sessionFolder = "./Sessioni/";

    if (!existsSync(sessionFolder)) {
      return await conn.sendMessage(m.chat, {
        text: "*❌ 𝐋𝐚 𝐜𝐚𝐫𝐭𝐞𝐥𝐥𝐚 𝐝𝐞𝐥𝐥𝐞 𝐬𝐞𝐬𝐬𝐢𝐨𝐧𝐢 𝐞̀ 𝐯𝐮𝐨𝐭𝐚 o 𝐧𝐨𝐧 𝐞𝐬𝐢𝐬𝐭𝐞.*"
      }, { quoted: m });
    }

    const sessionFiles = await fsPromises.readdir(sessionFolder);
    let deletedCount = 0;

    for (const file of sessionFiles) {
      if (file !== "creds.json") {
        await fsPromises.unlink(path.join(sessionFolder, file));
        deletedCount++;
      }
    }

    // testo dinamico
    const text = deletedCount === 0 
      ? '❗ 𝐍𝐢𝐞𝐧𝐭𝐞 𝐝𝐚 𝐞𝐥𝐢𝐦𝐢𝐧𝐚𝐫𝐞, 𝐫𝐢𝐩𝐫𝐨𝐯𝐚 𝐩𝐢𝐮̀ 𝐭𝐚𝐫𝐝𝐢‼️'
      : '🔥 𝐒𝐨𝐧𝐨 𝐬𝐭𝐚𝐭𝐢 𝐞𝐥𝐢𝐦𝐢𝐧𝐚𝐭𝐢 ' + deletedCount + ' 𝐚𝐫𝐜𝐡𝐢𝐯𝐢 𝐝𝐞𝐥𝐥𝐞 𝐬𝐞𝐬𝐬𝐢𝐨𝐧𝐢!';

    // invio messaggio con pulsante corretto
    await conn.sendMessage(m.chat, {
      text,
      footer: '𝐂𝐡𝐚𝐭 ✧ 𝐔𝐧𝐢𝐭𝐲',
      buttons: [
        {
          buttonId: '.ds',
          buttonText: { displayText: '🔄 𝐒𝐯𝐮𝐨𝐭𝐚 𝐃𝐢𝐧𝐮𝐨𝐯𝐨' },
          type: 1
        },
        {
          buttonId: '.ping',
          buttonText: { displayText: '🚀 𝐏𝐢𝐧𝐠' },
          type: 1
        }
      ],
      headerType: 1
    }, { quoted: m });

  } catch (error) {
    console.error(error);
    await conn.sendMessage(m.chat, { text: "❌ 𝐄𝐫𝐫𝐨𝐫𝐞 𝐝𝐢 𝐞𝐥𝐢𝐦𝐢𝐧𝐚𝐳𝐢𝐨𝐧𝐞!" }, { quoted: m });
  }
};

handler.help = ['del_reg_in_session_owner'];
handler.tags = ["owner"];
handler.command = /^(deletession|ds|diostronzo)$/i;
handler.admin = true;

export default handler;
