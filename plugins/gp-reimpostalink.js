
let handler = async(m, { conn }) => {
    let nomeDelBot = global.db.data.nomedelbot || `𝐂𝐡𝐚𝐭𝐔𝐧𝐢𝐭𝐲`
    let revoke = await conn.groupRevokeInvite(m.chat)
    
    await conn.sendMessage(m.chat, {
      text: `🔹️ *link reimpostato*\n♾ • ID: ${'https://chat.whatsapp.com/' + revoke}`,
      contextInfo: {
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
  
  handler.command = ['reimposta', 'revoke']
  handler.botAdmin = true
  handler.admin = true
  handler.group = true
  
  export default handler