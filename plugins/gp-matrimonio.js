const proposals = {};

let handler = async (m, { conn, participants, command, text, args, usedPrefix }) => {
    let users = global.db.data.users;
    let user = users[m.sender];

    switch (command) {
        case 'sposa':
            await handleSposa(m, user, users, text, usedPrefix, conn);
            break;
        case 'divorzia':
            handleDivorzia(m, user, users);
            break;
    }
};

const handleSposa = async (m, user, users, text, usedPrefix, conn) => {
    let mention = (m.mentionedJid && m.mentionedJid[0]) ? m.mentionedJid[0] : (m.quoted ? m.quoted.sender : null);
    if (!mention || typeof mention !== 'string' || !mention.endsWith('@s.whatsapp.net')) 
        throw `𝐓𝐚𝐠𝐠𝐚 𝐥𝐚 𝐩𝐞𝐫𝐬𝐨𝐧𝐚 𝐚 𝐜𝐮𝐢 𝐯𝐮𝐨𝐢 𝐢𝐧𝐯𝐢𝐚𝐫𝐞 𝐥𝐚 𝐩𝐫𝐨𝐩𝐨𝐬𝐭𝐚 𝐝𝐢 𝐦𝐚𝐭𝐫𝐢𝐦𝐨𝐧𝐢𝐨!\n𝐄𝐬𝐞𝐦𝐩𝐢𝐨: ${usedPrefix}sposa @tag`;

    if (mention === m.sender) throw '𝐍𝐨𝐧 𝐩𝐮𝐨𝐢 𝐬𝐩𝐨𝐬𝐚𝐫𝐭𝐢 𝐝𝐚 𝐬𝐨𝐥𝐨!';
    let destinatario = users[mention];
    if (!destinatario) throw '𝐏𝐞𝐫𝐬𝐨𝐧𝐚 𝐧𝐨𝐧 𝐩𝐫𝐞𝐬𝐞𝐧𝐭𝐞 𝐧𝐞𝐥 𝐬𝐢𝐬𝐭𝐞𝐦𝐚';
    if (user.sposato) {
        let testo = `𝐡𝐚𝐢 𝐠𝐢𝐚̀ 𝐮𝐧 𝐜𝐨𝐧𝐢𝐮𝐠𝐞...\n\n@${user.coniuge?.split('@')[0] || 'sconosciuto'} 𝐭𝐫𝐚𝐝𝐢𝐦𝐞𝐧𝐭𝐨!!! 😡😡😡`;
        m.reply(testo, null, { mentions: user.coniuge ? [user.coniuge] : [] });
        return;
    }
    if (destinatario.sposato) {
        let testo = `@${mention.split('@')[0]} è 𝐠𝐢à 𝐬𝐩𝐨𝐬𝐚𝐭𝐨/𝐚`;
        m.reply(testo, null, { mentions: [mention] });
        return;
    }
    if (proposals[m.sender] || proposals[mention]) throw `𝐔𝐧𝐚 𝐩𝐫𝐨𝐩𝐨𝐬𝐭𝐚 𝐝𝐢 𝐦𝐚𝐭𝐫𝐢𝐦𝐨𝐧𝐢𝐨 è 𝐠𝐢à 𝐢𝐧 𝐜𝐨𝐫𝐬𝐨. 𝐀𝐭𝐭𝐞𝐧𝐝𝐢 𝐥𝐚 𝐫𝐢𝐬𝐩𝐨𝐬𝐭𝐚 𝐨 𝐥'𝐚𝐧𝐧𝐮𝐥𝐥𝐚𝐦𝐞𝐧𝐭𝐨.`;

    proposals[mention] = { from: m.sender, timeout: null };
    proposals[m.sender] = { to: mention, timeout: null };

    let testo = `💍 𝐑𝐢𝐜𝐡𝐢𝐞𝐬𝐭𝐚 𝐝𝐢 𝐦𝐚𝐭𝐫𝐢𝐦𝐨𝐧𝐢𝐨 𝐢𝐧 𝐜𝐨𝐫𝐬𝐨...\n\n𝐕𝐮𝐨𝐢 𝐭𝐮 @${mention.split('@')[0]} 𝐩𝐫𝐞𝐧𝐝𝐞𝐫𝐞 𝐢𝐧 𝐬𝐩𝐨𝐬𝐨/𝐚 @${m.sender.split('@')[0]}?\n\n𝐒𝐜𝐞𝐠𝐥𝐢 𝐮𝐧𝐚 𝐨𝐩𝐳𝐢𝐨𝐧𝐞 sotto.\n> ⏳ 𝐇𝐚𝐢 𝟔𝟎 𝐬𝐞𝐜𝐨𝐧𝐝𝐢 𝐩𝐞𝐫 𝐫𝐢𝐬𝐩𝐨𝐧𝐝𝐞𝐫𝐞.`;

    await conn.sendMessage(m.chat, {
        text: testo,
        mentions: [mention, m.sender],
        buttons: [
            { buttonId: "Si", buttonText: { displayText: "💍 Si" }, type: 1 },
            { buttonId: "No", buttonText: { displayText: "❌ No" }, type: 1 }
        ],
        viewOnce: true,
        headerType: 4
    }, { quoted: m });

    let timeoutCallback = () => {
        if (proposals[mention]) {
            let annullamento = `𝐏𝐫𝐨𝐩𝐨𝐬𝐭𝐚 𝐝𝐢 𝐦𝐚𝐭𝐫𝐢𝐦𝐨𝐧𝐢𝐨 𝐚𝐧𝐧𝐮𝐥𝐥𝐚𝐭𝐚: @${m.sender.split('@')[0]} 𝐞 @${mention.split('@')[0]} 𝐧𝐨𝐧 𝐡𝐚𝐧𝐧𝐨 𝐫𝐢𝐬𝐩𝐨𝐬𝐭𝐨 𝐞𝐧𝐭𝐫𝐨 𝐢𝐥 𝐭𝐞𝐦𝐩𝐨 𝐥𝐢𝐦𝐢𝐭𝐞.`;
            conn.sendMessage(m.chat, { text: annullamento, mentions: [m.sender, mention] });
            delete proposals[mention];
            delete proposals[m.sender];
        }
    };

    proposals[mention].timeout = setTimeout(timeoutCallback, 60000); 
    proposals[m.sender].timeout = proposals[mention].timeout;
};

handler.before = async (m) => {
    if (!m.text) return;

    let user = proposals[m.sender];
    if (!user) return;

    clearTimeout(user.timeout);

    if (/^No|no$/i.test(m.text)) {
        let fromUser = proposals[m.sender].from || m.sender;
        delete proposals[fromUser];
        delete proposals[m.sender];
        return m.reply(`❌ 𝐏𝐫𝐨𝐩𝐨𝐬𝐭𝐚 𝐝𝐢 𝐦𝐚𝐭𝐫𝐢𝐦𝐨𝐧𝐢𝐨 𝐫𝐢𝐟𝐢𝐮𝐭𝐚𝐭𝐚.`, null, { mentions: [fromUser] });
    }

    if (/^Si|si$/i.test(m.text)) {
        let fromUser = proposals[m.sender].from;
        let toUser = m.sender;

        // Controlla che entrambi gli utenti esistano nel database
        let senderUser = global.db.data.users[fromUser];
        let receiverUser = global.db.data.users[toUser];
        if (!senderUser || !receiverUser) {
            delete proposals[fromUser];
            delete proposals[toUser];
            return m.reply('❌ Uno degli utenti non è più presente nel database.');
        }

        senderUser.sposato = true;
        senderUser.coniuge = toUser;
        senderUser.primoMatrimonio = true; 
        receiverUser.sposato = true;
        receiverUser.coniuge = fromUser;
        receiverUser.primoMatrimonio = true;

        let testo = `𝐃𝐢𝐜𝐡𝐢𝐚𝐫𝐨 𝐮𝐟𝐟𝐢𝐜𝐢𝐚𝐥𝐦𝐞𝐧𝐭𝐞 𝐬𝐩𝐨𝐬𝐚𝐭𝐢 @${m.sender.split('@')[0]} e  @${fromUser.split('@')[0]} 𝐟𝐢𝐧𝐜𝐡𝐞́ 𝐜𝐨𝐧𝐧𝐞𝐬𝐬𝐢𝐨𝐧𝐞 𝐧𝐨𝐧 𝐯𝐢 𝐬𝐞𝐩𝐚𝐫𝐢`;
        await m.reply(testo, null, { mentions: [m.sender, fromUser] });

        delete proposals[fromUser];
        delete proposals[toUser];
    }
};

const handleDivorzia = (m, user, users) => {
    if (!user.sposato) throw '𝐏𝐫𝐢𝐦𝐚 𝐬𝐩𝐨𝐬𝐚𝐭𝐢, 𝐬𝐨𝐥𝐨 𝐝𝐨𝐩𝐨 𝐩𝐨𝐭𝐫𝐚𝐢 𝐝𝐢𝐯𝐨𝐫𝐳𝐢𝐚𝐫𝐞';

    let ex = users[user.coniuge];
    if (!ex) throw 'Coniuge non trovato nel sistema';

    if (!Array.isArray(user.ex)) user.ex = [];
    if (!user.ex.includes(user.coniuge)) user.ex.push(user.coniuge);

    if (!Array.isArray(ex.ex)) ex.ex = [];
    if (!ex.ex.includes(m.sender)) ex.ex.push(m.sender);

    user.sposato = false;
    let exConiuge = user.coniuge; // Salva il coniuge prima di cancellarlo
    user.coniuge = '';
    ex.sposato = false;
    ex.coniuge = '';

    let testo = `𝐭𝐮 𝐞 @${exConiuge?.split('@')[0] || 'sconosciuto'} 𝐬𝐢𝐞𝐭𝐞 𝐨𝐫𝐚 𝐝𝐢𝐯𝐨𝐫𝐳𝐢𝐚𝐭𝐢.\n\n𝐭𝐚𝐧𝐭𝐨 𝐞𝐫𝐚𝐯𝐚𝐭𝐞 𝐮𝐧𝐚 𝐜𝐨𝐩𝐩𝐢𝐚 𝐨𝐫𝐫𝐢𝐛𝐢𝐥𝐞`;
    m.reply(testo, null, { mentions: exConiuge ? [exConiuge] : [] });
};

handler.group = true;
handler.command = ['sposa', 'divorzia'];
export default handler;