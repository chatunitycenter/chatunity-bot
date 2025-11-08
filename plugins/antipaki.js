

let handler = m => m
handler.before = async function (m, {conn, isAdmin, isBotAdmin, isOwner, isROwner}) {
    if (!m.isGroup) return !1
    let chat = global.db.data.chats[m.chat]
    let bot = global.db.data.settings[conn.user.jid] || {}
    
    if (isBotAdmin && chat.antipaki && !isAdmin && !isOwner && !isROwner && bot.restrict) {
        if (m.sender.startsWith('92')) {
            let responseb = await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
            if (responseb[0].status === "404") return
        }
    }
}
export default handler;