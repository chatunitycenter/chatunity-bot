const handler = async (m, { conn, args }) => {
    const metadata = await conn.groupMetadata(m.chat)
    
    await conn.sendMessage(m.chat, {
  text: `Link del gruppo: *${metadata.subject}*`,
  footer: 'Clicca il bottone per copiare il link negli appunti',
  interactiveButtons: [
    { name: 'cta_copy', buttonParamsJson: JSON.stringify({ display_text: 'Copia', copy_code: 'https://chat.whatsapp.com/' + await conn.groupInviteCode(m.chat) }) }
  ],
}, { quoted: m })
}

handler.help = ['linkgroup']
handler.tags = ['group']
handler.command = /^link(gro?up)?$/i
handler.group = true
handler.botAdmin = true

export default handler
