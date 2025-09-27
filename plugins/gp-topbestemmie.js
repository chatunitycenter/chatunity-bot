//Plugin creato da Gab333 - Velocizzato
let handler = async (m, { conn }) => {
    if (!m.isGroup) return
    
    let participants = (await conn.groupMetadata(m.chat)).participants
    let groupUsers = participants
        .map(p => ({ id: p.id, bestemmie: global.db.data.users[p.id]?.blasphemy || 0 }))
        .filter(u => u.bestemmie > 0)
        .sort((a, b) => b.bestemmie - a.bestemmie)
        .slice(0, 10)
    
    let text = groupUsers.length ? 
        `🏆 Top 10 Bestemmiatori del Gruppo 🏆\n\n` + 
        groupUsers.map((user, i) => `${i + 1}. @${user.id.split('@')[0]} - ${user.bestemmie} bestemmie`).join('\n') :
        "😇 Nessuno ha bestemmiato in questo gruppo!"
    
    conn.sendMessage(m.chat, { text, mentions: groupUsers.map(u => u.id) }, { quoted: m })
}

handler.command = ['topbestemmie', 'bestemmietop']
handler.group = true
export default handler
