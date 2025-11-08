let handler = async (m, { conn, text }) => {

    let user = m.mentionedJid?.[0] || m.quoted?.sender;

    if (!user) throw '❗ Tagga un utente o rispondi a un suo messaggio per usare questo comando.';

    let target = user.split('@')[0];
    let sender = m.sender.split('@')[0];


    let message = `*🔥 @${sender} sta scopando con @${target}... 💋*`;


    await conn.reply(m.chat, message, m, { mentions: [user, m.sender] });


    await conn.sendMessage(m.chat, {
        react: {
            text: '💦',
            key: m.key
        }
    });
};


handler.customPrefix = /^\.scopa$/i;
handler.command = new RegExp; 
export default handler;