let handler = async (m, { conn, args, groupMetadata }) => {
        let nomeDelBot = global.db.data.nomedelbot || `𝐂𝐡𝐚𝐭𝐔𝐧𝐢𝐭𝐲`
        let who
        if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
        else who = m.chat
        if (!who) return
        if (!(who in global.db.data.users)) return
        
        let warn = global.db.data.users[who].warn
        if (warn > 0) {
          global.db.data.users[who].warn -= 1
          
          const messageOptions = {
            text: `✅ 𝐀𝐯𝐯𝐞𝐫𝐭𝐢𝐦𝐞𝐧𝐭𝐨 𝐫𝐢𝐦𝐨𝐬𝐬𝐨\n𝐀𝐯𝐯𝐞𝐫𝐭𝐢𝐦𝐞𝐧𝐭𝐢 𝐫𝐢𝐦𝐚𝐧𝐞𝐧𝐭𝐢: ${warn - 1}`,
            contextInfo: {
              mentionedJid: [who],
              forwardingScore: 999,
              isForwarded: true,
              forwardedNewsletterMessageInfo: {
                newsletterJid: '120363422724720651@newsletter',
                serverMessageId: '',
                newsletterName: `${nomeDelBot}`
              }
            }
          }
      
          await conn.sendMessage(m.chat, messageOptions)
        } else if (warn == 0) {
          return
        }
      }
      
      handler.help = ['delwarn @user']
      handler.tags = ['group']
      handler.command = ['delwarn', 'unwarn'] 
      handler.group = true
      handler.admin = true
      handler.botAdmin = true
      
      export default handler