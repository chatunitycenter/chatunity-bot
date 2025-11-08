import axios from 'axios';

// Sistema comando diretto (compatibile con handler.js)
let handler = async (m, { conn, args }) => {
    try {
        if (!args[0]) {
            return m.reply("Per favore inserisci del testo dopo il comando.\nEsempio: .aivoice ciao");
        }

        const inputText = args.join(' ');

        // Menu modelli voce
        const voiceModels = [
            { number: "1", name: "Hatsune Miku", model: "miku" },
            { number: "2", name: "Nahida (Esclusiva)", model: "nahida" },
            { number: "3", name: "Nami", model: "nami" },
            { number: "4", name: "Ana (Femminile)", model: "ana" },
            { number: "5", name: "Optimus Prime", model: "optimus_prime" },
            { number: "6", name: "Goku", model: "goku" },
            { number: "7", name: "Taylor Swift", model: "taylor_swift" },
            { number: "8", name: "Elon Musk", model: "elon_musk" },
            { number: "9", name: "Mickey Mouse", model: "mickey_mouse" },
            { number: "10", name: "Kendrick Lamar", model: "kendrick_lamar" },
            { number: "11", name: "Angela Adkinsh", model: "angela_adkinsh" },
            { number: "12", name: "Eminem", model: "eminem" }
        ];

        let menuText = "╭━━━〔 *CHATUNITY AI MODELLI VOCE* 〕━━━⊷\n";
        voiceModels.forEach(model => {
            menuText += `┃▸ ${model.number}. ${model.name}\n`;
        });
        menuText += "╰━━━⪼\n\n";
        menuText += `📌 *Rispondi con il numero per selezionare il modello voce per:*\n"${inputText}"`;

        const sentMsg = await conn.sendMessage(m.chat, {
            image: { url: "https://i.ibb.co/9mWwC5PP/Whats-App-Image-2025-07-06-at-23-32-06.jpg" },
            caption: menuText
        }, { quoted: m });

        const messageID = sentMsg.key.id;
        let handlerActive = true;

        const handlerTimeout = setTimeout(() => {
            handlerActive = false;
            conn.ev.off("messages.upsert", messageHandler);
            m.reply("⌛ Tempo scaduto per la selezione della voce. Riprova il comando.");
        }, 120000);

        const messageHandler = async (msgData) => {
            if (!handlerActive) return;
            const receivedMsg = msgData.messages[0];
            if (!receivedMsg || !receivedMsg.message) return;

            const receivedText = receivedMsg.message.conversation ||
                receivedMsg.message.extendedTextMessage?.text ||
                receivedMsg.message.buttonsResponseMessage?.selectedButtonId;
            const senderID = receivedMsg.key.remoteJid;
            const isReplyToBot = receivedMsg.message.extendedTextMessage?.contextInfo?.stanzaId === messageID;

            if (isReplyToBot && senderID === m.chat) {
                clearTimeout(handlerTimeout);
                conn.ev.off("messages.upsert", messageHandler);
                handlerActive = false;

                await conn.sendMessage(senderID, {
                    react: { text: '⬇️', key: receivedMsg.key }
                });

                const selectedNumber = receivedText.trim();
                const selectedModel = voiceModels.find(model => model.number === selectedNumber);

                if (!selectedModel) {
                    return m.reply("❌ Opzione non valida! Rispondi con un numero presente nel menu.");
                }

                try {
                    await conn.sendMessage(m.chat, {
                        text: `🔊 Generazione audio con la voce di ${selectedModel.name}...`
                    }, { quoted: receivedMsg });

                    const apiUrl = `https://api.agatz.xyz/api/voiceover?text=${encodeURIComponent(inputText)}&model=${selectedModel.model}`;
                    const response = await axios.get(apiUrl, {
                        timeout: 30000
                    });

                    const data = response.data;

                    if (data.status === 200) {
                        await conn.sendMessage(m.chat, {
                            audio: { url: data.data.oss_url },
                            mimetype: "audio/mpeg"
                        }, { quoted: receivedMsg });
                    } else {
                        m.reply("❌ Errore nella generazione dell'audio. Riprova.");
                    }
                } catch (error) {
                    console.error("Errore API:", error);
                    m.reply("❌ Errore durante l'elaborazione della richiesta. Riprova.");
                }
            }
        };

        conn.ev.on("messages.upsert", messageHandler);

    } catch (error) {
        console.error("Errore comando:", error);
        m.reply("❌ Si è verificato un errore. Riprova.");
    }
};

handler.help = ['aivoice <testo>'];
handler.tags = ['tools'];
handler.command = /^(aivoice|vai|voicex|voiceai)$/i;

export default handler;