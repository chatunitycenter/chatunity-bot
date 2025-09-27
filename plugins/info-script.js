import moment from 'moment-timezone';
import fetch from 'node-fetch';

let handler = async (m, { conn, args }) => {
  let response = await fetch('https://api.github.com/repos/chatunitycenter/chatunity-bot');
  let repoData = await response.json();

  let messageText = `『💬』 ══ •⊰✰⊱• ══ 『💬』\n`;
  messageText += `✧ Nome: ${repoData.name}\n`;
  messageText += `✧ Link: ${repoData.html_url}\n`;
  messageText += `✦ Dimensione: ${(repoData.size / 1024).toFixed(2)} MB\n`;
  messageText += `✧ Aggiornato: ${moment(repoData.updated_at).format('DD/MM/YY - HH:mm:ss')}\n`;
  messageText += `✧ Visitatori: ${repoData.watchers_count}\n`;
  messageText += `『💬』 ══ •⊰✰⊱• ══ 『💬』\n`;
  messageText += `✧ Forks: ${repoData.forks_count} · Stars: ${repoData.stargazers_count} · Issues: ${repoData.open_issues_count}\n`;
  messageText += `『💬』 ══ •⊰✰⊱• ══ 『💬』\n`;

  const messageOptions = {
    mentions: [], // Puoi aggiungere menzioni se necessario
    contextInfo: {
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363422724720651@newsletter',
        serverMessageId: '',
        newsletterName: 'ChatUnity'
      }
    }
  };

  try {
    await conn.sendMessage(m.chat, { text: messageText, ...messageOptions });
  } catch (error) {
    console.error('Errore durante l\'invio del messaggio:', error);
    m.reply('Errore durante l\'esecuzione del comando.');
  }
};

handler.help = ['info'];
handler.tags = ['info'];
handler.command = /^script$/i;

export default handler;