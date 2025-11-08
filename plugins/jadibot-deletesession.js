import { readdirSync, statSync, unlinkSync, existsSync, readFileSync, watch, rmSync, promises as fs} from "fs"
import path, { join } from 'path'

let handler  = async (m, { conn: parentw, usedPrefix, command}, args) => {

let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let uniqid = `${who.split`@`[0]}`
let userS = `${conn.getName(who)}`

try {
await fs.rmdir(`./jadibts/` + uniqid, { recursive: true, force: true })
await parentw.sendMessage(m.chat, { text: 'ⓘ 𝐒𝐞𝐬𝐬𝐢𝐨𝐧𝐞 𝐒𝐮𝐛𝐁𝐨𝐭 𝐞𝐥𝐢𝐦𝐢𝐧𝐚𝐭𝐚 𝐜𝐨𝐧 𝐬𝐮𝐜𝐜𝐞𝐬𝐬𝐨.' }, { quoted: m })
} catch(err) {
if (err.code === 'ENOENT' && err.path === `./jadibts/${uniqid}`) {
await parentw.sendMessage(m.chat, { text: "ⓘ 𝐍𝐨𝐧 𝐡𝐚𝐢 𝐬𝐞𝐬𝐬𝐢𝐨𝐧𝐢 𝐒𝐮𝐛𝐁𝐨𝐭 𝐜𝐨𝐥𝐥𝐞𝐠𝐚𝐭𝐞." }, { quoted: m })
} else {
await m.reply('ⓘ 𝐒𝐢 𝐞̀ 𝐯𝐞𝐫𝐢𝐟𝐢𝐜𝐚𝐭𝐨 𝐮𝐧 𝐞𝐫𝐫𝐨𝐫𝐞')
}}}
handler.command = ['deletebot', 'delsession', 'delessione', 'delsessión', 'delsesion', 'delsesión', 'deletesession', 'deletesesion', 'deletesesión', 'deletesessión', 'eliminarsession']
handler.private = true

export default handler