let cooldowns = {}

let handler = async (m, { conn, args, usedPrefix, command }) => {
    let user = global.db.data.users[m.sender]
    let bet = args[0] ? parseInt(args[0]) : 20
    
    if (isNaN(bet) || bet <= 0) {
        return conn.reply(m.chat, '❌ Puntata non valida.\nEsempio: *' + usedPrefix + command + ' 100*', m)
    }

    if ((user.limit || 0) < bet) {
        return conn.reply(m.chat, '🚫 UC insufficienti! Ti servono ' + bet + ' UC.', m)
    }

    if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < 300000) {
        let timeLeft = cooldowns[m.sender] + 300000 - Date.now()
        let min = Math.floor(timeLeft / 60000)
        let sec = Math.floor((timeLeft % 60000) / 1000)
        return conn.reply(m.chat, '⏳ Aspetta ' + min + 'm ' + sec + 's prima di giocare di nuovo.', m)
    }

    let win = Math.random() < 0.5
    let resultMsg, gifFile

    // Calcola informazioni livello e XP
    user.exp = Number(user.exp) || 0
    user.level = Number(user.level) || 1
    let { min: minXP, xp: levelXP, max: maxXP } = xpRange(user.level, global.multiplier || 1)
    let currentLevelXP = user.exp - minXP

    if (win) {
        user.limit = (user.limit || 0) + 800
        user.exp = (user.exp || 0) + 100
        resultMsg = '🎉 *Hai vinto!*\n'
        resultMsg += '┌──────────────\n'
        resultMsg += '│ ➕ *800 UC*\n'
        resultMsg += '│ ➕ *100 XP*\n'
        resultMsg += '└──────────────\n'
        gifFile = './icone/perdita.gif'  // Cambiato in GIF
    } else {
        user.limit = (user.limit || 0) - bet
        user.exp = Math.max(0, (user.exp || 0) - bet)
        resultMsg = '🤡 *Hai perso!*\n'
        resultMsg += '┌──────────────\n'
        resultMsg += '│ ➖ *' + bet + ' UC*\n'
        resultMsg += '│ ➖ *' + bet + ' XP*\n'
        resultMsg += '└──────────────\n'
        gifFile = './icone/vincita.gif'  // Cambiato in GIF
    }

    // Aggiungi informazioni saldo attuale
    resultMsg += '\n💎 *SALDO ATTUALE*\n'
    resultMsg += '┌──────────────\n'
    resultMsg += '│ 👛 *UC: ' + (user.limit || 0) + '*\n'
    resultMsg += '│ ⭐ *XP: ' + (user.exp || 0) + '*\n'
    resultMsg += '│ 📊 *Progresso: ' + currentLevelXP + '/' + levelXP + ' XP*\n'
    resultMsg += '└──────────────\n'
    resultMsg += '\nℹ️ Usa ' + usedPrefix + 'menuxp per guadagnare più XP!'

    // Invia la GIF invece del video
    await conn.sendMessage(m.chat, { 
        video: { url: gifFile }, 
        gifPlayback: true 
    }, { quoted: m })

    cooldowns[m.sender] = Date.now()
    
    // Aspetta 3 secondi e manda il risultato
    await new Promise(resolve => setTimeout(resolve, 3000))
    await conn.reply(m.chat, resultMsg, m)
}

handler.help = ['slot <puntata>']
handler.tags = ['game']
handler.command = ['slot']

export default handler

// Funzione xpRange dal tuo codice di esempio
function xpRange(level, multiplier = 1) {
    if(level < 0) level = 0
    let min = level === 0 ? 0 : Math.pow(level, 2) * 20
    let max = Math.pow(level + 1, 2) * 20
    let xp = Math.floor((max - min) * multiplier)
    return { min, xp, max }
}


