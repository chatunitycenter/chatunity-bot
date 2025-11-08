import { promises as fs } from 'fs';

let handler = async (m, { conn, command, text, usedPrefix }) => {
    let target = text ? text.replace(/[@]/g, '') + '@s.whatsapp.net' : (m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0]);
    if (!target) return conn.reply(m.chat, `🚨 *TAGGA QUALCUNO, GENIO!* 🚨\nEsempio: *${usedPrefix}${command} @nome*`, m);

    let name = await conn.getName(target);
    let randomPercent = Math.floor(Math.random() * 101);

    let frasi = [
        "È la prova che la natura a volte fa 'copia e incolla' sbagliato.",
        "Il suo albero genealogico è un cerchio perfetto.",
        "Se l'intelligenza fosse benzina, non gli basterebbe per il motorino di una formica.",
        "È la versione umana di un CAPTCHA fallito.",
        "Quando Dio ha distribuito i cervelli, lui era in bagno.",
        "Ha così tanta segatura in testa che potrebbe costruire un mobile IKEA.",
        "È l'equivalente umano di un modem 56k che prova a scaricare un film in 4K.",
        "Se i suoi pensieri fossero soldi, sarebbe al verde.",
        "Da qualche parte c'è un villaggio a cui manca il suo scemo. L'abbiamo trovato.",
        "Ha il QI di un tostapane, ma è meno utile."
    ];

    let fraseRandom = frasi[Math.floor(Math.random() * frasi.length)];

    let conclusione;
    if (randomPercent > 90) {
        conclusione = "🔴 CASO DISPERATO. Si consiglia l'eutanasia sociale.";
    } else if (randomPercent > 70) {
        conclusione = "🟠 PERICOLO PUBBLICO. Non lasciatelo procreare.";
    } else if (randomPercent > 40) {
        conclusione = "🟡 MEDIOCRE. Utile solo come cattivo esempio.";
    } else {
        conclusione = "🟢 MIRACOLO. Forse c'è speranza... o forse il test è rotto.";
    }

    let messaggio = `
*⚡️ VERDETTO FINALE ⚡️*

*Soggetto:* ${name}
*Livello di "${command.toUpperCase()}":* ${randomPercent}%

*Diagnosi:* ${fraseRandom}

*Prognosi:* ${conclusione}
    `.trim();

    await conn.sendMessage(m.chat, { 
        text: messaggio,
        contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363259442839354@newsletter',
                newsletterName: '🔥 ISTITUTO NAZIONALE IDIOZIA 🔥'
            }
        },
        mentions: [target]
    }, { quoted: m });
};

handler.help = ['down', 'ritardato', 'mongoloide', 'disabile', 'ritardata'].map(v => v + ' [@tag]');
handler.tags = ['satira', 'game'];
handler.command = /^(down|ritardato|mongoloide|disabile|ritardata)$/i;

export default handler;
