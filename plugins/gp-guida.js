let handler = async (m, { conn }) => {
  let guidaMessage = `
𝐆𝐔𝐈𝐃𝐀 𝐀𝐈 𝐂𝐎𝐌𝐀𝐍𝐃𝐈 𝐃𝐈 𝐂𝐇𝐀𝐓𝐔𝐍𝐈𝐓𝐘-𝐁𝐎𝐓

\`𝐋𝐈𝐍𝐊 𝐆𝐎𝐎𝐆𝐋𝐄 𝐃𝐎𝐂𝐒:\`
https://docs.google.com/document/d/e/2PACX-1vSgfwbRZrQM2W-3tctvqX7_0eAF-FvU3K_SK8txRfGkNzJjziAIVV8G2EIMg4Ju03TlGIzMKaicjWTH/pub
`.trim();

  let messageOptions = {
    contextInfo: {
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363422724720651@newsletter',
        serverMessageId: '',
        newsletterName: 'ChatUnity Bot'
      }
    }
  };

  conn.reply(m.chat, guidaMessage, m, messageOptions);
};

handler.help = ['guida'];
handler.tags = ['info'];
handler.command = /^(guida)$/i;

export default handler;
