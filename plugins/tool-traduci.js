import translate from '@vitalets/google-translate-api'
import fetch from 'node-fetch'
let handler = async (m, { args, usedPrefix, command }) => {
    let msg = `uso del comando ${usedPrefix + command} (txt)`
    if (!args || !args[0]) return conn.sendMessage(m.chat, { 
        text: msg,
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

    let lang = args[0];
    let text = args.slice(1).join(' ');
    const defaultLang = 'it';
    if ((args[0] || '').length !== 2) {
        lang = defaultLang;
        text = args.join(' ');
    }
    if (!text && m.quoted && m.quoted.text) text = m.quoted.text;

    try {      
        let result = await translate(`${text}`, { to: lang, autoCorrect: true });
        await conn.sendMessage(m.chat, { 
            text: 'Traduzione: ' + result.text,
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
    } catch {
        try {    
            let lol = await fetch(`https://api.lolhuman.xyz/api/translate/auto/${lang}?apikey=${lolkeysapi}&text=${text}`);
            let loll = await lol.json();
            let result2 = loll.result.translated;
            await conn.sendMessage(m.chat, { 
                text: 'Traduzione ' + result2,
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
        } catch { 
            await conn.sendMessage(m.chat, { 
                text: 'errore',
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
        }
    }
};
handler.command = /^(translate|traduci|trad)$/i;
export default handler;
