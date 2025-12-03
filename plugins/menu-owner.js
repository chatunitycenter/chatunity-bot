import { performance } from 'perf_hooks'
import fetch from 'node-fetch'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'
import '../lib/language.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const handler = async (message, { conn, usedPrefix, command }) => {
  const userId = message.sender
  const groupId = message.isGroup ? message.chat : null

  const menuText = generateMenuText(usedPrefix, userId, groupId)
  const imagePath = path.join(__dirname, '../media/owner.jpeg')

  await conn.sendMessage(
    message.chat,
    {
      image: { url: imagePath },
      caption: menuText,
      footer: global.t('chooseMenu', userId, groupId) || 'Scegli un menu:',
      buttons: [
        { buttonId: `${usedPrefix}menu`, buttonText: { displayText: global.t('mainMenuButton', userId, groupId) || '🏠 Menu Principale' }, type: 1 },
        { buttonId: `${usedPrefix}menuadmin`, buttonText: { displayText: global.t('adminMenuButton', userId, groupId) || '🛡️ Menu Admin' }, type: 1 },
        { buttonId: `${usedPrefix}menusicurezza`, buttonText: { displayText: global.t('securityMenuButton', userId, groupId) || '🚨 Menu Sicurezza' }, type: 1 },
        { buttonId: `${usedPrefix}menugruppo`, buttonText: { displayText: global.t('groupMenuButton', userId, groupId) || '👥 Menu Gruppo' }, type: 1 },
        { buttonId: `${usedPrefix}menuia`, buttonText: { displayText: global.t('aiMenuButton', userId, groupId) || '🤖 Menu IA' }, type: 1 }
      ],
      viewOnce: true,
      headerType: 4
    }
  )
}

handler.help = ['menuowner']
handler.tags = ['menu']
handler.command = /^(menuowner)$/i

export default handler

function generateMenuText(prefix, userId, groupId) {
  const vs = global.vs || '8.0'
  const collab = global.collab || 'ChatUnity x 333'

  const menuTitle = global.t('ownerMenuTitle', userId, groupId) || '𝑴𝑬𝑵𝑼 𝑶𝑾𝑵𝑬𝑹'
  const versionText = global.t('versionLabel', userId, groupId) || '𝑽𝑬𝑹𝑺𝑰𝑶𝑵𝑬'
  const collabText = global.t('collabLabel', userId, groupId) || '𝐂𝐎𝐋𝐋𝐀𝐁: 𝐎𝐍𝐄 𝐏𝐈𝐄𝐂𝐄'
  const supportText = global.t('supportLabel', userId, groupId) || '𝐒𝐔𝐏𝐏𝐎𝐑𝐓𝐎'

  const commandList = `
• ⚙️ *${prefix}${global.t('setNameCommand', userId, groupId) || 'impostanome'}*
• ⚙️ *${prefix}${global.t('resetNameCommand', userId, groupId) || 'resetnome'}*
• ⚙️ *${prefix}${global.t('manageCommand', userId, groupId) || 'gestisci'}* @
• ⚙️ *${prefix}${global.t('setGroupsCommand', userId, groupId) || 'setgruppi'}*
• ⚙️ *${prefix}${global.t('addGroupsCommand', userId, groupId) || 'aggiungigruppi'}* @
• ⚙️ *${prefix}${global.t('resetGroupsCommand', userId, groupId) || 'resetgruppi'}* @
• ⚙️ *${prefix}${global.t('setPpCommand', userId, groupId) || 'setpp'}* (${global.t('imageParam', userId, groupId) || 'immagine'})
• ⚙️ *${prefix}${global.t('banUserCommand', userId, groupId) || 'banuser'}* @
• ⚙️ *${prefix}${global.t('unbanUserCommand', userId, groupId) || 'unbanuser'}* @
• ⚙️ *${prefix}${global.t('blockUserCommand', userId, groupId) || 'blockuser'}* @
• ⚙️ *${prefix}${global.t('unblockUserCommand', userId, groupId) || 'unblockuser'}* @
• ⚙️ *${prefix}${global.t('cleanupCommand', userId, groupId) || 'pulizia'}* (+)
• ⚙️ *${prefix}${global.t('getFileCommand', userId, groupId) || 'getfile'}*
• ⚙️ *${prefix}${global.t('saveCommand', userId, groupId) || 'salva'}* (${global.t('pluginParam', userId, groupId) || 'plugin'})
• ⚙️ *${prefix}${global.t('dpCommand', userId, groupId) || 'dp'}* (${global.t('pluginParam', userId, groupId) || 'plugin'})
• ⚙️ *${prefix}${global.t('getPluginCommand', userId, groupId) || 'getplugin'}*
• ⚙️ *${prefix}${global.t('joinCommand', userId, groupId) || 'join'}* + ${global.t('linkParam', userId, groupId) || 'link'}
• ⚙️ *${prefix}${global.t('outCommand', userId, groupId) || 'out'}*
• ⚙️ *${prefix}${global.t('prefixCommand', userId, groupId) || 'prefisso'}* (?)
• ⚙️ *${prefix}${global.t('resetPrefixCommand', userId, groupId) || 'resetprefisso'}*
• ⚙️ *${prefix}${global.t('godModeCommand', userId, groupId) || 'godmode'}* {${global.t('autoAdminParam', userId, groupId) || 'autoadmin'}}
• ⚙️ *${prefix}${global.t('resetCommand', userId, groupId) || 'azzera'}* @
• ⚙️ *${prefix}${global.t('addCommand', userId, groupId) || 'aggiungi'}* (${global.t('numMessagesParam', userId, groupId) || 'num. messaggi'}) @
• ⚙️ *${prefix}${global.t('removeCommand', userId, groupId) || 'rimuovi'}* (${global.t('numMessagesParam', userId, groupId) || 'num. messaggi'}) @
• ⚙️ *${prefix}${global.t('everyGroupCommand', userId, groupId) || 'everygroup'}* (${global.t('commandParam', userId, groupId) || 'comando'})
• ⚙️ *${prefix}${global.t('banChatCommand', userId, groupId) || 'banchat'}* (${global.t('groupParam', userId, groupId) || 'gruppo'})
• ⚙️ *${prefix}${global.t('unbanChatCommand', userId, groupId) || 'unbanchat'}* (${global.t('groupParam', userId, groupId) || 'gruppo'})
• ⚙️ *${prefix}${global.t('restartCommand', userId, groupId) || 'riavvia'}*
• ⚙️ *${prefix}${global.t('shutdownBotCommand', userId, groupId) || 'spegnibot'}*
• ⚙️ *${prefix}${global.t('updateBotCommand', userId, groupId) || 'aggiornabot'}*
  `.trim()

  return `
⋆ ︵︵ ★ ${menuTitle} ★ ︵︵ ⋆

*${global.t('ownerReservedCommands', userId, groupId) || '𝑪𝑶𝑴𝑨𝑵𝑫𝑰 𝑹𝑰𝑺𝑬𝑹𝑻𝑨𝑻𝑰 𝑨𝑳𝑳’𝑶𝑾𝑵𝑬𝑹'}*

꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧
${commandList.split('\n').map(line => `୧ ${line.trim()}`).join('\n')}
꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧

╰♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩
  ୧・*${versionText}:* ${vs}
  ୧・𝐂𝐎𝐋𝐋𝐀𝐁: ${collab}
  ୧・*${supportText}:* (.supporto)
╰♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩
`.trim()
}
