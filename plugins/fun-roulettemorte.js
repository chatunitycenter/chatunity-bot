import { delay } from '@whiskeysockets/baileys';

const salasRuleta = {};

const handler = async (m, { conn, usedPrefix, command }) => {
    const chatId = m.chat;
    const senderId = m.sender;

    if (salasRuleta[chatId]) 
        return conn.reply(m.chat, '✧ C\'è già una sala attiva in questo gruppo, attendi che finisca.', m);

    salasRuleta[chatId] = { giocatori: [senderId], stato: 'in_attesa' };

    await conn.sendMessage(m.chat, { 
        text: `✦ *Roulette della Morte* ✦\n\n@${senderId.split('@')[0]} ha avviato una sala di gioco.\n\n❀ Premi il bottone qui sotto per partecipare! (60 secondi)`,
        mentions: [senderId],
        buttons: [
            { buttonId: `${usedPrefix}${command} accetto`, buttonText: { displayText: "✅ Accetto la sfida" }, type: 1 },
            { buttonId: `${usedPrefix}${command} rifiuto`, buttonText: { displayText: "❌ Annulla" }, type: 1 }
        ]
    }, { quoted: m });

    await delay(60000);
    if (salasRuleta[chatId] && salasRuleta[chatId].stato === 'in_attesa') {
        delete salasRuleta[chatId];
        await conn.sendMessage(m.chat, { text: '✦ Nessuno ha accettato la sfida, la sala è stata chiusa.' });
    }
};

handler.command = ['roulettedelban'];
handler.botAdmin = true;

export default handler;

handler.before = async (m, { conn, usedPrefix, command, args }) => {
    const chatId = m.chat;
    const senderId = m.sender;
    const testo = (m.text || '').toLowerCase();

    if (!salasRuleta[chatId]) return;

    // Gestione tramite bottoni
    const arg = args && args[0] ? args[0].toLowerCase() : null;

    if (testo === 'accetto' || testo === 'accettare' || arg === 'accetto') {
        if (salasRuleta[chatId].giocatori.length >= 2) 
            return conn.reply(m.chat, '✧ Ci sono già due giocatori in questa sala.', m);

        if (senderId === salasRuleta[chatId].giocatori[0])
            return conn.reply(m.chat, '✧ Non puoi accettare la tua stessa sfida.', m);

        salasRuleta[chatId].giocatori.push(senderId);
        salasRuleta[chatId].stato = 'completa';

        await conn.sendMessage(m.chat, { 
            audio: { url: "https://qu.ax/iwAmy.mp3" }, 
            mimetype: "audio/mp4", 
            ptt: true 
        });

        await conn.sendMessage(m.chat, { 
            text: '✦ *Roulette della Morte* ✦\n\n❀ La sala è completa!\n\n> ✧ Selezionando il perdente...' 
        });

        const loadingMessages = [
            "《 █▒▒▒▒▒▒▒▒▒▒▒》10%\n- Calcolo probabilità...",
            "《 ████▒▒▒▒▒▒▒▒》30%\n- Il destino è segnato...",
            "《 ███████▒▒▒▒▒》50%\n- La sorte è decisa...",
            "《 ██████████▒▒》80%\n- Presto conosceremo il perdente!",
            "《 ████████████》100%\n- Risultato finale!"
        ];

        let { key } = await conn.sendMessage(m.chat, { text: "✧ Calcolo risultato in corso!" }, { quoted: m });

        for (let msg of loadingMessages) {
            await delay(3000);
            await conn.sendMessage(m.chat, { text: msg, edit: key }, { quoted: m });
        }

        const [giocatore1, giocatore2] = salasRuleta[chatId].giocatori;
        const perdente = Math.random() < 0.5 ? giocatore1 : giocatore2;

        await conn.sendMessage(m.chat, { 
            text: `✦ *Verdetto finale* ✦\n\n@${perdente.split('@')[0]} è stato il perdente.\n\n> ❀ Hai 60 secondi per le tue ultime parole...`, 
            mentions: [perdente] 
        });

        await delay(60000);        
        await conn.groupParticipantsUpdate(m.chat, [perdente], 'remove');
        await conn.sendMessage(m.chat, { 
            text: `❀ @${perdente.split('@')[0]} è stato eliminato. Fine del gioco.`, 
            mentions: [perdente] 
        });        
        delete salasRuleta[chatId];
    }

    if (testo === 'rifiuto' || arg === 'rifiuto') {
        if (senderId !== salasRuleta[chatId].giocatori[0]) return;
        delete salasRuleta[chatId];
        await conn.sendMessage(m.chat, { text: '✧ Il gioco è stato annullato dal creatore della sfida.' });
    }
};