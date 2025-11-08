import ws from 'ws'

async function handler(m, { conn: _envio, usedPrefix }) {
    const users = [...new Set([...global.conns.filter((conn) => conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED).map((conn) => conn)])]
    
    if (users.length === 0) {
        await m.reply('> ⓘ 𝐍𝐨𝐧 𝐜𝐢 𝐬𝐨𝐧𝐨 𝐚𝐥𝐭𝐫𝐢 𝐬𝐮𝐛-𝐛𝐨𝐭𝐬 𝐜𝐨𝐧𝐧𝐞𝐬𝐬𝐢 𝐚𝐥 𝐦𝐨𝐦𝐞𝐧𝐭𝐨.')
        return
    }
    
    function convertirMsADiasHorasMinutosSegundos(ms) {
        var segundos = Math.floor(ms / 1000)
        var minutos = Math.floor(segundos / 60)
        var ore = Math.floor(minuti / 60)
        var giorni = Math.floor(ore / 24)
    
        segundos %= 60
        minutos %= 60
        ore %= 24
    
        var risultato = ''
        if (giorni !== 0) {
            risultato += giorni + ' giorni, '
        }
        if (ore !== 0) {
            risultato += ore + ' ore, '
        }
        if (minuti !== 0) {
            risultato += minuti + ' minuti, '
        }
        if (secondi !== 0) {
            risultato += secondi + ' secondi'
        }
    
        return risultato
    }

    let _uptime = process.uptime() * 1000;
    let uptime = clockString(_uptime);
    let old = performance.now();
    let neww = performance.now();
    let speed = (neww - old).toFixed(4);
    
    let message = users.map((v, index) => `${index + 1} @${v.user.jid.replace(/[^0-9]/g, '')}\n💬 𝐍𝐨𝐦𝐞: ${v.user.name || '-'}\n🟢 𝐀𝐭𝐭𝐢𝐯𝐢𝐭𝐚': ${uptime}\n🚀 𝐕𝐞𝐥𝐨𝐜𝐢𝐭𝐚' : ${speed} 𝐬`).join('\n\n')
    const replyMessage = message.length === 0 ? '> ⓘ 𝐍𝐨𝐧 𝐜𝐢 𝐬𝐨𝐧𝐨 𝐚𝐥𝐭𝐫𝐢 𝐬𝐮𝐛-𝐛𝐨𝐭𝐬 𝐜𝐨𝐧𝐧𝐞𝐬𝐬𝐢 𝐚𝐥 𝐦𝐨𝐦𝐞𝐧𝐭𝐨.' : message
    const totalUsers = users.length
    const responseMessage = `${replyMessage.trim()}`.trim()

    await m.reply(`> ⓘ 𝐄𝐜𝐜𝐨 𝐥'𝐞𝐥𝐞𝐧𝐜𝐨 𝐝𝐞𝐢 𝐬𝐮𝐛-𝐛𝐨𝐭𝐬 𝐚𝐭𝐭𝐮𝐚𝐥𝐦𝐞𝐧𝐭𝐞 𝐚𝐭𝐭𝐢𝐯𝐢\n\n𝐂𝐨𝐥𝐥𝐞𝐠𝐚𝐭𝐢: ${totalUsers || '0'}`)
    await _envio.sendMessage(m.chat, { text: responseMessage, mentions: _envio.parseMention(responseMessage) }, { quoted: m })

}

handler.command = handler.help = ['listjadibot', 'bots', 'subsbots'];
handler.tags = ['jadibot']

export default handler

function clockString(ms) {
    let h = Math.floor(ms / 3600000);
    let m = Math.floor(ms / 60000) % 60;
    let s = Math.floor(ms / 1000) % 60;
    console.log({ ms, h, m, s });
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':');
}
