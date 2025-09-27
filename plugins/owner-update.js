import { execSync } from 'child_process'
let handler = async (m, { conn, text }) => {
await m.react('🕓')
if (conn.user.jid == conn.user.jid) {
let stdout = execSync('git pull' + (m.fromMe && text ? ' ' + text : ''))
await conn.reply(m.chat, stdout.toString(), m)
await m.react('✅')
}}
handler.help = ['aggiornabot']
handler.tags = ['owner']
handler.command = ['aggiorna', 'update', 'aggiornabot'] 
handler.rowner = true

export default handler