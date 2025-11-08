import axios from 'axios';

const newsCommand = async (m, { conn }) => {
  try {
    const apiKey = 'dcd720a6f1914e2d9dba9790c188c08c'; // Sostituisci con la tua API Key di NewsAPI
    const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`);
    const articles = response.data.articles.slice(0, 5); // Prendi i primi 5 articoli

    let newsMessage = '📰 *Ultime Notizie*:\n\n';
    articles.forEach((article, index) => {
      newsMessage += `${index + 1}. *${article.title}*\n${article.description || ''}\n\n`;
    });

    await conn.sendMessage(m.chat, { text: newsMessage });
  } catch (error) {
    console.error('Errore nel recupero delle notizie:', error);
    await conn.sendMessage(m.chat, { text: 'Spiacente, non sono riuscito a recuperare le notizie in questo momento.' });
  }
};

newsCommand.help = ['news'];
newsCommand.tags = ['info', 'news'];
newsCommand.command = /^news$/i;

export default newsCommand;
