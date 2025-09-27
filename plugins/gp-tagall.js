//Plugin creato da Gab333 - Velocizzato
let handler = async (m, { isOwner, isAdmin, conn, text, participants, args }) => {
    if (!(isAdmin || isOwner)) return
    
    let message = args.join` ` || 'Messaggio vuoto'
    let tagText = `🔔 MEMBRI DEL GRUPPO\n\nBOT: ${nomebot}\n${message}\n\n`
    
    for (let user of participants) {
        tagText += `✧ @${user.id.split('@')[0]}\n`
    }
    tagText += '\n══════ •⊰✦⊱• ══════'
    
    conn.sendMessage(m.chat, {
        text: tagText,
        mentions: participants.map(p => p.id)
    }, { quoted: m })
}

handler.command = /^(tagall|invocar|marcar|todos)$/i
handler.group = true
handler.admin = true
export default handler
