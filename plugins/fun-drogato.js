let handler = async (m, { conn, command, text }) => {

    let width = Math.floor(Math.random() * 101);

    let finalPhrase = width >= 70 
        ? "🌿 Attenti che si pippa pure la farina" 
        : width >= 30 
        ? "🌿 Non sa pippare, aumenta le dosi!!" 
        : "🌿 Un'esempio da seguire, complimenti.";


    let message = `
『💬』 ══ •⊰✰⊱• ══ 『💬』

MOMENTO DEL DRUG TEST! 🌿 
━━━━━━━━━━━━━━
 ${text ? text : 'Tu'} ha un tasso alcolemico del ${width}%! 🌿
『💬』 ══ •⊰✰⊱• ══ 『💬』

${finalPhrase}
`.trim();

    const messageOptions = {
        contextInfo: {
            forwardingScore: 1,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363259442839354@newsletter',
                serverMessageId: '',
                newsletterName: `ChatUnity` 
            },
        }
    };

    m.reply(message, null, { mentions: conn.parseMention(message), ...messageOptions });
};

handler.command = /^(drogato)$/i;

export default handler;