const gratuito = 500
const premium = 1000
const cooldowns = {}

let handler = async (m, { conn, isPrems }) => {
  let user = global.db.data.users[m.sender]
  const tempoAttesa = 24 * 60 * 60 // 24 ore in secondi
  
  // Controllo cooldown
  if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tempoAttesa * 1000) {
    const tempoRimanente = formattaTempo(Math.ceil((cooldowns[m.sender] + tempoAttesa * 1000 - Date.now()) / 1000))
    let message = `🚩 𝐡𝐚𝐢 𝐠𝐢𝐚̀ 𝐫𝐢𝐭𝐢𝐫𝐚𝐭𝐨 𝐢 𝐭𝐮𝐨𝐢 𝐬𝐨𝐥𝐝𝐢 𝐝𝐢 𝐨𝐠𝐠𝐢.\n𝐩𝐮𝐨𝐢 𝐩𝐫𝐞𝐧𝐝𝐞𝐫𝐥𝐞 𝐬𝐨𝐥𝐨 1 𝐨𝐠𝐧𝐢 24𝐡.\n\n𝐩𝐫𝐨𝐬𝐬𝐢𝐦𝐚 𝐫𝐢𝐜𝐨𝐦𝐩𝐞𝐧𝐬𝐚 : +${isPrems ? premium : gratuito} 💶 𝐔𝐂\n 𝐭𝐫𝐚: ⏱ ${tempoRimanente}`;
    await conn.sendMessage(m.chat, { 
        text: message,
        contextInfo: {
            forwardingScore: 99,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363422724720651@newsletter',
                serverMessageId: '',
                newsletterName: 'ChatUnity'
            }
        }
    }, { quoted: m, detectLink: true });
    return;
  }

  // Assegna le Unitycoins al saldo (limit)
  user.limit += isPrems ? premium : gratuito
  let message = `🚩 𝐜𝐨𝐧𝐠𝐫𝐚𝐭𝐮𝐥𝐚𝐳𝐢𝐨𝐧𝐢 𝐝𝐨𝐰𝐧 🎉, 𝐡𝐚𝐢 𝐨𝐭𝐭𝐞𝐧𝐮𝐭𝐨 *+${isPrems ? premium : gratuito} 💶 𝐔𝐂!\n\n` +
                `𝐨𝐫𝐚 𝐡𝐚𝐢: *${user.limit} 💶 𝐔𝐂* 𝐧𝐞𝐥 𝐭𝐮𝐨 𝐬𝐚𝐥𝐝𝐨`;
  await conn.sendMessage(m.chat, { 
      text: message,
      contextInfo: {
          forwardingScore: 99,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
              newsletterJid: '120363422724720651@newsletter',
              serverMessageId: '',
              newsletterName: 'ChatUnity'
          }
      }
  }, { quoted: m, detectLink: true });

  // Imposta il cooldown
  cooldowns[m.sender] = Date.now()
  global.db.write() // Salva i dati
}

handler.help = ['daily']
handler.tags = ['rpg']
handler.command = [ 'giornaliero', 'claim']
handler.register = true

function formattaTempo(secondi) {
  const ore = Math.floor(secondi / 3600)
  const minuti = Math.floor((secondi % 3600) / 60)
  const secondiRimanenti = secondi % 60
  return `${ore} 𝐨𝐫𝐞, ${minuti} 𝐦𝐢𝐧𝐮𝐭𝐢 𝐞 ${secondiRimanenti} 𝐩𝐨𝐜𝐡𝐢 𝐬𝐞𝐜𝐨𝐧𝐝𝐢`
}

export default handler