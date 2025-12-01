import MessageType from '@whiskeysockets/baileys'

let tassa = 0.02 // 2% di tassa sulle transazioni

let handler = async (m, { conn, text }) => {
  let who
  if (m.isGroup) who = m.mentionedJid[0] // Se in gruppo, prende l'utente menzionato
  else who = m.chat // Se in privato, usa l'utente corrente
  
  if (!who) throw '🚩 𝐝𝐞𝐯𝐢 𝐦𝐞𝐧𝐳𝐢𝐨𝐧𝐚𝐫𝐞 𝐮𝐧 𝐠𝐚𝐲 𝐜𝐨𝐧 @user*'
  
  let txt = text.replace('@' + who.split`@`[0], '').trim()
  if (!txt) throw '🚩 𝐢𝐧𝐬𝐞𝐫𝐢𝐫𝐞 𝐥𝐚 𝐪𝐮𝐚𝐧𝐭𝐢𝐭𝐚̀ 𝐝𝐢 💫 𝐗𝐏 𝐝𝐚 𝐭𝐫𝐚𝐬𝐟𝐞𝐫𝐢𝐫𝐞'
  if (isNaN(txt)) throw '🚩 𝐢𝐧𝐬𝐞𝐫𝐢𝐬𝐜𝐢 𝐬𝐨𝐥𝐨 𝐧𝐮𝐦𝐞𝐫𝐢 𝐜𝐨𝐠𝐥𝐢𝐨𝐧𝐞'
  
  let xp = parseInt(txt)
  let exp = xp
  let tassaImporto = Math.ceil(xp * tassa) // Calcola la tassa del 2%
  exp += tassaImporto
  
  if (exp < 1) throw '🚩 𝐢𝐥 𝐦𝐢𝐧𝐢𝐦𝐨 𝐝𝐚 𝐭𝐫𝐚𝐬𝐟𝐞𝐫𝐢𝐫𝐞 𝐞 1 💫 𝐗𝐏'
  
  let users = global.db.data.users
  if (exp > users[m.sender].exp) throw '🚩 𝐧𝐨𝐧 𝐡𝐚𝐢 𝐚𝐛𝐛𝐚𝐬𝐭𝐚𝐧𝐳𝐚 💫 𝐗𝐏 𝐝𝐨𝐰𝐧 𝐝𝐞𝐯𝐢 𝐚𝐯𝐞𝐫𝐞 𝐩𝐢𝐮 𝐞𝐬𝐩𝐞𝐫𝐢𝐞𝐧𝐳𝐚'
  
  // Esegui la transazione
  users[m.sender].exp -= exp
  users[who].exp += xp

  // Messaggio di conferma
  let confirmationMessage = `📊 *𝐫𝐞𝐬𝐨𝐜𝐨𝐧𝐭𝐨 𝐭𝐫𝐚𝐧𝐬𝐢𝐳𝐢𝐨𝐧𝐞 *\n\n` +
                            `▸ 𝐗𝐏 𝐭𝐫𝐚𝐬𝐟𝐞𝐫𝐢𝐭𝐢: *-${xp} 💫*\n` +
                            `▸ 𝐭𝐚𝐬𝐬𝐚 (2%): *-${tassaImporto} 💫*\n` +
                            `▸ 𝐭𝐨𝐭𝐚𝐥𝐞 𝐚𝐝𝐝𝐞𝐛𝐢𝐭𝐚𝐭𝐨: *-${exp} 💫*`;
  await conn.sendMessage(m.chat, { 
      text: confirmationMessage,
      contextInfo: {
          forwardingScore: 99,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
              newsletterJid: '120363259442839354@newsletter',
              serverMessageId: '',
              newsletterName: 'ChatUnity'
          }
      }
  }, { quoted: m });

  // Notifica al ricevente
  let recipientMessage = `📩 𝐡𝐚𝐢 𝐫𝐢𝐜𝐞𝐯𝐮𝐭𝐨 +${xp} 💫 𝐗𝐏!`;
  await conn.sendMessage(m.chat, { 
      text: recipientMessage,
      contextInfo: {
          forwardingScore: 99,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
              newsletterJid: '120363259442839354@newsletter',
              serverMessageId: '',
              newsletterName: 'ChatUnity'
          }
      }
  }, { quoted: m, mentions: [who] });
}

handler.help = ['darxp *@user <quantità>*']
handler.tags = ['rpg']
handler.command = ['daixp', 'daiexp', 'donaxp'] 
handler.register = true 

export default handler