let handler = async (m, { conn, command }) => {
    let isOpen = command === 'aperto'
    await conn.groupSettingUpdate(m.chat, isOpen ? 'not_announcement' : 'announcement')
    await conn.sendMessage(m.chat, {
        text: isOpen ? '𝐂𝐡𝐚𝐭 𝐚𝐩𝐞𝐫𝐭𝐚 𝐩𝐞𝐫 𝐭𝐮𝐭𝐭𝐢' : '𝐂𝐡𝐚𝐭 𝐩𝐞𝐫 𝐬𝐨𝐥𝐢 𝐚𝐝𝐦𝐢𝐧',
        contextInfo: {
            forwardingScore: 99,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363422724720651@newsletter',
                serverMessageId: '',
                newsletterName: global.db.data.nomedelbot || `𝐂𝐡𝐚𝐭𝐔𝐧𝐢𝐭𝐲`
            }
        }
    }, { quoted: m })
}

handler.help = ['aperto', 'chiuso']
handler.tags = ['group']
handler.command = /^(aperto|chiuso)$/i
handler.admin = true
handler.botAdmin = true

export default handler