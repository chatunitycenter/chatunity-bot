let handler = async (m, { conn, isAdmin, isBotAdmin }) => {
  if (!m.isGroup || !isBotAdmin || !isAdmin) return
  try {
    const pending = await conn.groupRequestParticipantsList(m.chat)
    if (!pending.length) return m.reply("Nessuna richiesta da accettare.")
    let count = 0
    for (let p of pending) {
      try {
        await conn.groupRequestParticipantsUpdate(m.chat, [p.jid], 'approve')
        count++
      } catch {}
    }
    m.reply(`✅ Accettate ${count} richieste.`)
  } catch {
    m.reply('Errore.')
  }
}
handler.command = ['accettarichieste']
handler.group = true
handler.admin = true
handler.botAdmin = true
export default handler
