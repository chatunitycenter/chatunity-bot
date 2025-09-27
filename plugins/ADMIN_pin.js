// Plugins fatto da Gab333 - Velocizzato
const pinQueue = new Map();

let handler = async (m, { conn, command, usedPrefix }) => {
    if (command === 'pin') {
        if (!m.quoted) return m.reply(`⚠️ Rispondi a un messaggio per fissarlo.`);

        
        pinQueue.set(m.chat, m.quoted);

        const buttons = [
            { buttonId: `${usedPrefix}pin1d`, buttonText: { displayText: '⏳ 1 Giorno' }, type: 1 },
            { buttonId: `${usedPrefix}pin7d`, buttonText: { displayText: '⏳ 7 Giorni' }, type: 1 },
            { buttonId: `${usedPrefix}pin30d`, buttonText: { displayText: '⏳ 30 Giorni' }, type: 1 },
        ];

        await conn.sendMessage(m.chat, {
            text: 'Scegli per quanto tempo vuoi fissare il messaggio:',
            buttons,
            headerType: 1
        });
        return;
    }

    if (['pin1d', 'pin7d', 'pin30d'].includes(command)) {
     
        const quoted = pinQueue.get(m.chat);
        if (!quoted) return m.reply('❌ Nessun messaggio da fissare. Usa prima il comando pin rispondendo a un messaggio.');

        const messageKey = {
            remoteJid: m.chat,
            fromMe: quoted.fromMe,
            id: quoted.id,
            participant: quoted.sender
        };


        let durationMs = 0;
        if (command === 'pin1d') durationMs = 1 * 24 * 60 * 60 * 1000;
        else if (command === 'pin7d') durationMs = 7 * 24 * 60 * 60 * 1000;
        else if (command === 'pin30d') durationMs = 30 * 24 * 60 * 60 * 1000;

        try {
            await conn.sendMessage(m.chat, { pin: { key: messageKey, type: 1 } });

           
            

            m.react('✅️');


            pinQueue.delete(m.chat);
        } catch (e) {
            console.error(e);
            m.reply('❌ Errore nel fissare il messaggio.');
        }
        return;
    }


    if (['unpin', 'destacar', 'desmarcar'].includes(command)) {
        if (!m.quoted) return m.reply(`⚠️ Rispondi a un messaggio per ${command === 'unpin' ? 'rimuoverlo dai fissati' : 'eseguire l\'azione'}.`);

        const messageKey = {
            remoteJid: m.chat,
            fromMe: m.quoted.fromMe,
            id: m.quoted.id,
            participant: m.quoted.sender
        };

        try {
            switch (command) {
                case 'unpin':
                    await conn.sendMessage(m.chat, { pin: { key: messageKey, type: 2 } });
                    break;
                case 'destacar':
                    await conn.sendMessage(m.chat, { keep: { key: messageKey, type: 1 } });
                    break;
                case 'desmarcar':
                    await conn.sendMessage(m.chat, { keep: { key: messageKey, type: 2 } });
                    break;
            }
            m.react('✅️');
        } catch (err) {
            console.error('[ERRORE]', err);
            m.reply('❌ Errore nell\'eseguire il comando.');
        }
        return;
    }
};

handler.help = ['pin'];
handler.tags = ['gruppo'];
handler.command = ['pin', 'unpin', 'destacar', 'desmarcar', 'pin1d', 'pin7d', 'pin30d'];
handler.admin = true;
handler.group = true;
handler.botAdmin = true;

export default handler;
