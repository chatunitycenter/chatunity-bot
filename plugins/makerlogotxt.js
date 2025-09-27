
let war = global.maxwarn
let handler = async (m, { conn, text, args, groupMetadata, usedPrefix, command }) => {      
        let who
        if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
        else who = m.chat
        if (!who) return
        if (!(who in global.db.data.users)) return
        let name = conn.getName(m.sender)
        let warn = global.db.data.users[who].warn
        if (warn < war) {
            global.db.data.users[who].warn += 1
        } else if (warn == war) {
            global.db.data.users[who].warn = 0
            m.reply(`⛔ 𝐨𝐫𝐚 𝐡𝐚𝐢 𝐫𝐨𝐭𝐭𝐨 𝐢𝐥 𝐜𝐚𝐳𝐳𝐨`)
            await time(1000)
            await conn.groupParticipantsUpdate(m.chat, [who], 'remove')
        }
}
handler.help = ['warn @user']
handler.tags = ['group']
handler.command = ['warn'] 
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler

const time = async (ms) => {
            return new Promise(resolve => setTimeout(resolve, ms));
        }