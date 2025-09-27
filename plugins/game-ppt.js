let cooldowns = {}

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let punti = 300
    let tempoAttesa = 2 * 60 * 1000 // 2 minuti
    let user = global.db.data.users[m.sender]
 
    if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tempoAttesa) {
        let tempoRimanente = secondiAHMS(Math.ceil((cooldowns[m.sender] + tempoAttesa - Date.now()) / 1000))
        return conn.reply(m.chat, `[ ✰ ] Hai già giocato di recente, aspetta *⏱ ${tempoRimanente}* per giocare di nuovo.`, m)
    }

    cooldowns[m.sender] = Date.now()

    if (!text) return conn.reply(m.chat, '[ ✰ ] Scegli un\'opzione ( *pietra/carta/forbici* ) per iniziare il gioco.\n\n`» Esempio:`\n' + `> *${usedPrefix + command}* pietra`, m)

    let opzioni = ['pietra', 'carta', 'forbici']
    let botChoice = opzioni[Math.floor(Math.random() * opzioni.length)]

    if (!opzioni.includes(text)) return conn.sendMessage(m.chat, { 
        text: '[ ✰ ] Scegli un\'opzione valida ( *pietra/carta/forbici* ) per iniziare il gioco.\n\n`» Esempio:`\n' + `> *${usedPrefix + command}* pietra`,
        contextInfo: {
            forwardingScore: 99,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363422724720651@newsletter',
                serverMessageId: '',
                newsletterName: 'ChatUnity'
            }
        }
    }, { quoted: m });

    let risultato = ''
    let puntiOttenuti = 0

    if (text === botChoice) {
        risultato = `[ ✿ ]︎ Pareggio!! Ricevi *100 💶 Unitycoins* come ricompensa`
        puntiOttenuti = 100
    } else if (
        (text === 'pietra' && botChoice === 'forbici') ||
        (text === 'forbici' && botChoice === 'carta') ||
        (text === 'carta' && botChoice === 'pietra')
    ) {
        risultato = `[ ✰ ]︎ HAI VINTO!! Hai guadagnato *300 💶 Unitycoins*`
        puntiOttenuti = punti
    } else {
        risultato = `[ ✿︎ ] HAI PERSO!! Hai perso *300 💶 Unitycoins*`
        puntiOttenuti = -punti
    }

    user.limit += puntiOttenuti
    await conn.sendMessage(m.chat, { 
        text: `${risultato}\n\nLa mia scelta: *${botChoice.toUpperCase()}*`,
        contextInfo: {
            forwardingScore: 99,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363422724720651@newsletter',
                serverMessageId: '',
                newsletterName: 'ChatUnity'
            }
        }
    }, { quoted: m });
}

handler.help = ['scf']
handler.tags = ['game']
handler.command = ['scf', 'sassocartaforbici']

function secondiAHMS(secondi) {
    return `${secondi % 60} secondi`
}

export default handler