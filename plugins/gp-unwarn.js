import fetch from 'node-fetch';

const handler = async (m, { conn, text, command, usedPrefix }) => {
  try {
    const target = getTargetUser(m, text);
    
    if (!target) {
      const warnMessage = createUsageMessage(usedPrefix, command);
      return m.reply(warnMessage, m.chat, { mentions: conn.parseMention(warnMessage) });
    }
    
    const user = getUserData(target);
    const currentGroupWarns = user.warns?.[m.chat] || 0;
    if (target === conn.user.jid) {
      user.warns[m.chat] = Math.max(0, currentGroupWarns - 1);
      return m.reply('『 ‼️ 』 *Perche il bot dovrebbe avere warn inanzitutto????*');
    }

    if (currentGroupWarns === 0) {
      return m.reply('『 ‼️ 』 *L\'utente non ha avvertimenti da rimuovere in questo gruppo*');
    }
    user.warns[m.chat] = Math.max(0, currentGroupWarns - 1);
    const remainingWarns = user.warns[m.chat];
    
    if (remainingWarns === 0) {
      await handleCleanRecord(conn, m, target);
    } else {
      await handlePartialRemoval(conn, m, target, remainingWarns);
    }

  } catch (error) {
    console.error('Errore nell\'handler unwarn:', error);
    return m.reply(`${global.errore}`);
  }
};
function getTargetUser(m, text) {
  if (m.isGroup) {
    return m.mentionedJid?.[0] || 
           (m.quoted?.sender) || 
           (text?.trim() && parseUserFromText(text.trim()));
  }
  return m.chat;
}

function parseUserFromText(text) {
  const cleaned = text.replace('@', '');
  return cleaned.includes('@') ? cleaned : `${cleaned}@s.whatsapp.net`;
}

function getUserData(userId) {
  if (!global.db.data.users[userId]) {
    global.db.data.users[userId] = {
      warns: {}
    };
  }
  return global.db.data.users[userId];
}

function createUsageMessage(usedPrefix, command) {
  return `
  ㅤㅤ⋆｡˚『 ╭ \`UNWARN\` ╯ 』˚｡⋆\n╭
│   『 📋 』 _*METODI DISPONIBILI:*_
│•   *\`Menziona:\`* *${usedPrefix + command} @utente*
│•   *\`Rispondi:\`* *Quotando un msg*
│•   *\`Numero:\`* *${usedPrefix + command} 393514357738*
│
*╰⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*`;
}

async function createUserFkontak(conn, target) {
  try {
    let username = target.split('@')[0];
    
    try {
      const contact = await conn.onWhatsApp(target);
      if (contact[0]?.notify) {
        username = contact[0].notify;
      }
    } catch {}
    
    return {
      key: {
        participants: '0@s.whatsapp.net',
        remoteJid: 'status@broadcast',
        fromMe: false,
        id: 'Halo'
      },
      message: {
        contactMessage: {
          vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:${username}\nitem1.TEL;waid=${target.split('@')[0]}:${target.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
        }
      },
      participant: '0@s.whatsapp.net'
    };
  } catch (error) {
    return null;
  }
}

async function handleCleanRecord(conn, m, target) {
  const username = target.split('@')[0];
  const cleanMessage = `『 ✅ 』 @${username} *ti sono stati tolti tutti gli avvertimenti in questo gruppo, sei un uomo pulito ora...*`;
  const fkontak = await createUserFkontak(conn, target);
  await m.reply(cleanMessage, null, { 
    mentions: [target],
    quoted: fkontak
  });
  
  await sendCelebrationVideo(conn, m);
}
async function handlePartialRemoval(conn, m, target, remainingWarns) {
  const username = target.split('@')[0];
  const emoji = remainingWarns === 1 ? '⚠️' : '♻️';
  
  const message = `『 ${emoji} 』 @${username}\n- _*un avvertimento è stato rimosso*_
- *\`Avvertimenti: ${remainingWarns}/3\`*`;
  const fkontak = await createUserFkontak(conn, target);
  
  await m.reply(message, null, { 
    mentions: [target],
    quoted: fkontak
  });
}

async function sendCelebrationVideo(conn, m) {
  const oj = [
    'https://www.tiktok.com/@doubs.prodz87/video/7482131335046335786',
    'https://www.tiktok.com/@koso1872/video/7438736407448931616',
    'https://www.tiktok.com/@tizendio/video/7357451196514225441',
    'https://www.tiktok.com/@bl00dfiend/video/7356671258332859678',
    'https://www.tiktok.com/@bigjeditzzz/video/7356393958173461803',
    'https://www.tiktok.com/@_razorbanks_/video/7442853154888109358',
    'https://www.tiktok.com/@memeworldandfun17/video/7500905331409636630'
  ];
  
  const randomVideo = oj[Math.floor(Math.random() * oj.length)];
  
  try {
    const videoData = await downloadTikTokVideo(randomVideo);
    
    if (videoData.success && videoData.videoUrl) {
      await conn.sendMessage(m.chat, {
        video: { url: videoData.videoUrl },
        caption: 'come oj'
      }, { quoted: m });
    }
  } catch (error) {
  }
}

async function downloadTikTokVideo(url) {
  try {
    const apiUrl = `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}&hd=1`;
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      success: !!(data?.data?.play),
      videoUrl: data?.data?.play || null,
      title: data?.data?.title || ''
    };
  } catch (error) {
    return { success: false, videoUrl: null };
  }
}

handler.command = /^(unwarn|delwarn|togliwarn|togliavvertimento)$/i;
handler.tags = ['gruppo'];   
handler.help = ['unwarn @utente'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;