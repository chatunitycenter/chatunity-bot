let handler = async (m, { conn, command, text, usedPrefix }) => {
    let target = text ? text.replace(/[@]/g, '') + '@s.whatsapp.net' : (m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0]);
    if (!target) return conn.reply(m.chat, `🚨 *TAGGA QUALCUNO, DIO CANE!* 🚨\nEsempio: *${usedPrefix}${command} @tuoexmiglioreamico*`, m);

    let name = await conn.getName(target);
    let randomPercent = Math.floor(Math.random() * 100) + 1;

    // Frasi satiriche e spietate
    let frasiTaglienti = [
        `🧠 *Il suo QI? Stabile come il Bitcoin nel 2018.* 📉`,  
        `💡 *Se l'ignoranza fosse luce, sarebbe un faro.* 🌟`,  
        `🏆 *Campione olimpico di "Eh?" e "Come?"* 🥇`,  
        `🦉 *Saggezza zero, ma almeno è simpatico... no?* 🙃`,  
        `🌌 *La sua mente? Un vuoto cosmico.* 🚀`,  
        `📚 *Se la stupidità fosse un libro, sarebbe un'enciclopedia.* 📖`,  
        `🛠️ *Ha due neuroni e litigano per il terzo posto.* ⚡`,  
        `🎭 *Parla tanto ma dice sempre... nulla.* 🤡`
    ];

    let fraseRandom = frasiTaglienti[Math.floor(Math.random() * frasiTaglienti.length)];

    // Messaggio finale SPARA A ZERO
    let messaggioFinale = `
⚡ *📜 VERDETTO UFFICIALE DI "${command.toUpperCase()}" 📜* ⚡

🧑 *Soggetto Analizzato:* ${name}  
📉 *Livello di "${command}":* ${randomPercent}% ${randomPercent > 80 ? "☠️ *GRAVE PERICOLO SOCIALE* ☠️" : "🤏 *Quasi accettabile... quasi*"}  

${fraseRandom}  

${randomPercent > 90 ? 
    "🚨 *AVVERTENZA:* La sua presenza potrebbe causare perdita di cellule cerebrali. Usare con cautela." : 
    randomPercent < 20 ? 
    "🦸 *Miracolo! Riesce a respirare e pensare contemporaneamente!*" : 
    "💀 *Sopravviverai... forse.*"
}  

💥 *CONCLUSIONE:* ${randomPercent > 70 ? 
    "*La selezione naturale ha fallito.*" : 
    "*Potrebbe essere utile come esempio di cosa non fare.*"
}`.trim();

    await conn.sendMessage(m.chat, { 
        text: messaggioFinale,
        contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363422724720651@newsletter',
                newsletterName: '🔥 *SALA VERDETTI SPARATI* 🔥'
            }
        },
        mentions: [target]
    }, { quoted: m });
};

handler.help = ['down', 'ritardato', 'mongoloide', 'disabile', 'ritardata'].map(v => v + ' @tag | nome');
handler.tags = ['satira', 'game'];
handler.command = /^(down|ritardato|mongoloide|disabile|ritardata)$/i;

export default handler;