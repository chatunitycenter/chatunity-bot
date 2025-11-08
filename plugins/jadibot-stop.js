import { readdirSync, rmdirSync, existsSync, promises as fs } from 'fs';
import path from 'path';

const handler = async (m, { conn, usedPrefix }) => {
  if (global.conn.user.jid !== conn.user.jid) {
    return conn.sendMessage(m.chat, {text: `ⓘ 𝐔𝐭𝐢𝐥𝐢𝐳𝐳𝐚 𝐪𝐮𝐞𝐬𝐭𝐨 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐝𝐢𝐫𝐞𝐭𝐭𝐚𝐦𝐞𝐧𝐭𝐞 𝐧𝐞𝐥 𝐧𝐮𝐦𝐞𝐫𝐨 𝐩𝐫𝐢𝐧𝐜𝐢𝐩𝐚𝐥𝐞 𝐝𝐞𝐥 𝐁𝐨𝐭.`}, {quoted: m});
  }
  await conn.sendMessage(m.chat, {text: 'ⓘ 𝐄𝐥𝐢𝐦𝐢𝐧𝐚𝐳𝐢𝐨𝐧𝐞 𝐝𝐞𝐢 𝐬𝐮𝐛-𝐛𝐨𝐭𝐬 𝐢𝐧 𝐜𝐨𝐫𝐬𝐨...'}, {quoted: m});
  const sessionPath = './jadibts/';
  try {
    if (!existsSync(sessionPath)) {
      return await conn.sendMessage(m.chat, {text: `ⓘ 𝐋𝐚 𝐜𝐚𝐫𝐭𝐞𝐥𝐥𝐚 𝐣𝐚𝐝𝐢𝐛𝐭𝐬 𝐧𝐨𝐧 𝐞𝐬𝐢𝐬𝐭𝐞 𝐨 𝐞' 𝐯𝐮𝐨𝐭𝐚.`}, {quoted: m});
    }
    const files = await fs.readdir(sessionPath);
    let dirsDeleted = 0;
    for (const file of files) {
      if (file !== 'creds.json') {
        await fs.rmdir(path.join(sessionPath, file), { recursive: true }); 
        dirsDeleted++;
      }
    }
    if (dirsDeleted === 0) {
      await conn.sendMessage(m.chat, {text: `ⓘ 𝐍𝐨𝐧 𝐜𝐢 𝐬𝐨𝐧𝐨 𝐬𝐮𝐛-𝐛𝐨𝐭𝐬 ‼️`}, {quoted: m});
    } else {
      await conn.sendMessage(m.chat, {text: `ⓘ 𝐒𝐨𝐧𝐨 𝐬𝐭𝐚𝐭𝐢 𝐞𝐥𝐢𝐦𝐢𝐧𝐚𝐭𝐢 𝐭𝐮𝐭𝐭𝐢 𝐢 𝐬𝐮𝐛-𝐛𝐨𝐭𝐬, 𝐫𝐢𝐚𝐯𝐯𝐢𝐚 𝐢𝐥 𝐛𝐨𝐭 𝐩𝐞𝐫 𝐫𝐞𝐧𝐝𝐞𝐫𝐞 𝐞𝐟𝐟𝐞𝐭𝐭𝐢𝐯𝐞 𝐥𝐞 𝐦𝐨𝐝𝐢𝐟𝐢𝐜𝐡𝐞`}, {quoted: m});
    }
  } catch (err) {
    console.error('Errore', err);
    await conn.sendMessage(m.chat, {text: 'Errore'}, {quoted: m});
  }
};

handler.help = ['del_reg_in_session_owner'];
handler.tags = ['owner'];
handler.command = /^(stop|sdbots)$/i;
handler.rowner = true;

export default handler;
