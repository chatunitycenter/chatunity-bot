let handler = async (m, { conn, command, text }) => {
    // Genera un livello casuale di alcol nel sangue
    let width = Math.floor(Math.random() * 101);

    // Determina il messaggio in base al livello
    let finalPhrase = width >= 70 
        ? "🍾 Amico se hai bisogno di parlare io ci sono.." 
        : width >= 30 
        ? "🥂 Beve in modo responsabile, o quasi..." 
        : "🚰 Totalmente sobrio, niente sbronze per oggi!";

    // Creazione del messaggio
    let message = `
『💬』 ══ •⊰✰⊱• ══ 『💬』

MOMENTO DEL TEST DELL'ALCOL! 🍷 
━━━━━━━━━━━━━━
 ${text ? text : 'Tu'} ha un tasso alcolemico del ${width}%! 🍷
『💬』 ══ •⊰✰⊱• ══ 『💬』

${finalPhrase}
`.trim();

    const messageOptions = {
        contextInfo: {
            forwardingScore: 1,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363422724720651@newsletter',
                serverMessageId: '',
                newsletterName: `ChatUnity` // Utilizzo della variabile botName
            },
        }
    };

    // Invia il messaggio con le menzioni e le opzioni
    m.reply(message, null, { mentions: conn.parseMention(message), ...messageOptions });
};

handler.command = /^(alcolizzato|alcol)$/i;

export default handler;