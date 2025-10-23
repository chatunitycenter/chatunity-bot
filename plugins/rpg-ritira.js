let handler = async (m, { args }) => {
    let user = global.db.data.users[m.sender];
    
    // Inizializza i valori se non esistono
    user.bank = Number(user.bank) || 0;
    user.limit = Number(user.limit) || 0;

    if (!args[0]) return conn.sendMessage(m.chat, { 
        text: '🚩 Inserisci la quantità di *💶 UnityCoins* che vuoi prelevare.',
        contextInfo: {
            forwardingScore: 99,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363259442839354@newsletter',
                serverMessageId: '',
                newsletterName: 'ChatUnity'
            }
        }
    }, { quoted: m });

    if (args[0].toLowerCase() === 'all') {
       let count = Math.floor(user.bank);
       if (count <= 0) return conn.sendMessage(m.chat, { 
           text: '🚩 Non hai *💶 UnityCoins* nel conto bancario.',
           contextInfo: {
               forwardingScore: 99,
               isForwarded: true,
               forwardedNewsletterMessageInfo: {
                   newsletterJid: '120363259442839354@newsletter',
                   serverMessageId: '',
                   newsletterName: 'ChatUnity'
               }
           }
       }, { quoted: m });
       user.bank -= count;
       user.limit += count;
       await conn.sendMessage(m.chat, { 
           text: `✅ Hai prelevato *${count} 💶 UnityCoins* dalla banca.`,
           contextInfo: {
               forwardingScore: 99,
               isForwarded: true,
               forwardedNewsletterMessageInfo: {
                   newsletterJid: '120363259442839354@newsletter',
                   serverMessageId: '',
                   newsletterName: 'ChatUnity'
               }
           }
       }, { quoted: m });
       return;
    }

    if (isNaN(args[0])) return conn.sendMessage(m.chat, { 
        text: '🚩 La quantità deve essere un numero valido.',
        contextInfo: {
            forwardingScore: 99,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363259442839354@newsletter',
                serverMessageId: '',
                newsletterName: 'ChatUnity'
            }
        }
    }, { quoted: m });

    let count = Math.floor(Number(args[0]));
    if (count < 1) return conn.sendMessage(m.chat, { 
        text: '🚩 Inserisci una quantità valida (almeno 1).',
        contextInfo: {
            forwardingScore: 99,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363259442839354@newsletter',
                serverMessageId: '',
                newsletterName: 'ChatUnity'
            }
        }
    }, { quoted: m });

    if (user.bank <= 0) return conn.sendMessage(m.chat, { 
        text: '🚩 Non hai *💶 UnityCoins* nel conto bancario.',
        contextInfo: {
            forwardingScore: 99,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363259442839354@newsletter',
                serverMessageId: '',
                newsletterName: 'ChatUnity'
            }
        }
    }, { quoted: m });

    if (user.bank < count) return conn.sendMessage(m.chat, { 
        text: `🚩 Hai solo *${user.bank} 💶 UnityCoins* disponibili nel conto.`,
        contextInfo: {
            forwardingScore: 99,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363259442839354@newsletter',
                serverMessageId: '',
                newsletterName: 'ChatUnity'
            }
        }
    }, { quoted: m });

    user.bank -= count;
    user.limit += count;
    await conn.sendMessage(m.chat, { 
        text: `✅ Hai prelevato *${count} 💶 UnityCoins* dalla banca e messi nel portafoglio.\n\nNuovo saldo bancario: ${user.bank} 💶`,
        contextInfo: {
            forwardingScore: 99,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363259442839354@newsletter',
                serverMessageId: '',
                newsletterName: 'ChatUnity'
            }
        }
    }, { quoted: m });
};

handler.help = ['ritira'];
handler.tags = ['rpg'];
handler.command = ['withdraw', 'retirar', 'ritira'];
handler.register = true;
export default handler;