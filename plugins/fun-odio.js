let handler = async (m, { conn, command, text }) => {
    let nomeDelBot = global.db.data.nomedelbot || `𝐂𝐡𝐚𝐭𝐔𝐧𝐢𝐭𝐲`
  
    let love = `──────────────\n𝐂𝐀𝐋𝐂𝐎𝐋𝐀𝐓𝐎𝐑𝐄 𝐃𝐈 𝐎𝐃𝐈𝐎 😡
  L'odio tra ${text} e te: ${Math.floor(Math.random() * 100)}%\n──────────────`.trim()
  
    await conn.sendMessage(m.chat, {
      text: love,
      contextInfo: {
        mentionedJid: conn.parseMention(love),
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363422724720651@newsletter',
          serverMessageId: '',
          newsletterName: `${nomeDelBot}`
        }
      }
    })
  }
  
  handler.command = /^(odio)$/i
  handler.tags = ['fun']
  handler.help = ['odio @tag']
  
  export default handler