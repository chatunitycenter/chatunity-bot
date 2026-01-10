import { smsg } from './lib/simple.js'
import { format } from 'util'
import { fileURLToPath } from 'url'
import path, { join } from 'path'
import { unwatchFile, watchFile } from 'fs'
import fs from 'fs'
import chalk from 'chalk'
const { proto } = (await import('@chatunity/baileys')).default

const isNumber = x => typeof x === 'number' && !isNaN(x)
const delay = ms => isNumber(ms) && new Promise(resolve => setTimeout(function () {
  clearTimeout(this)
  resolve()
}, ms))

global.ignoredUsersGlobal = global.ignoredUsersGlobal || new Set()
global.ignoredUsersGroup = global.ignoredUsersGroup || {}
global.groupSpam = global.groupSpam || {}

export async function handler(chatUpdate) {
  if (!global.db.data.stats) global.db.data.stats = {}
  const stats = global.db.data.stats

  this.msgqueque = this.msgqueque || []
  if (!chatUpdate) return
  this.pushMessage(chatUpdate.messages).catch(console.error)
  let m = chatUpdate.messages[chatUpdate.messages.length - 1]
  if (!m) return
  if (global.db.data == null) await global.loadDatabase()

  const isOwner = (() => {
    try {
      const isROwner = [conn.decodeJid(global.conn.user.id), ...global.owner.map(([number]) => number)]
        .filter(Boolean)
        .map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net')
        .includes(m.sender)
      return isROwner || m.fromMe
    } catch {
      return false
    }
  })()

  const hasValidPrefix = (text, prefixes) => {
    if (!text || typeof text !== 'string') return false
    if (prefixes instanceof RegExp) return prefixes.test(text)
    const prefixList = Array.isArray(prefixes) ? prefixes : [prefixes]
    return prefixList.some(p => {
      if (p instanceof RegExp) return p.test(text)
      if (typeof p === 'string') return text.startsWith(p)
      return false
    })
  }

  if (
    m.isGroup &&
    !isOwner &&
    typeof m.text === 'string' &&
    hasValidPrefix(m.text, conn.prefix || global.prefix)
  ) {
    const now = Date.now()
    const chatId = m.chat

    if (!global.groupSpam[chatId]) {
      global.groupSpam[chatId] = {
        count: 0,
        firstCommandTimestamp: now,
        isSuspended: false,
        suspendedUntil: null
      }
    }

    const groupData = global.groupSpam[chatId]
    if (groupData.isSuspended) {
      if (now < groupData.suspendedUntil) return
      groupData.isSuspended = false
      groupData.count = 0
      groupData.firstCommandTimestamp = now
      groupData.suspendedUntil = null
    }
    if (now - groupData.firstCommandTimestamp > 60000) {
      groupData.count = 1
      groupData.firstCommandTimestamp = now
    } else {
      groupData.count++
    }
    if (groupData.count > 2) {
      groupData.isSuspended = true
      groupData.suspendedUntil = now + 45000

      await conn.sendMessage(chatId, {
        text: `『 ⚠ 』 Anti-spam comandi\n\nTroppi comandi in poco tempo!\nAttendi *45 secondi* prima di usare altri comandi.\n\n> sviluppato da sam aka vare`,
        mentions: [m.sender]
      })
      return
    }
  }

  try {
    m = smsg(this, m) || m
    if (!m) return
    m.exp = 0
    m.limit = false

    try {
      let user = global.db.data.users[m.sender]
      if (typeof user !== 'object') global.db.data.users[m.sender] = {}

      if (user) {
        if (!isNumber(user.messaggi)) user.messaggi = 0
        if (!isNumber(user.blasphemy)) user.blasphemy = 0
        if (!isNumber(user.exp)) user.exp = 0
        if (!isNumber(user.money)) user.money = 0
        if (!isNumber(user.warn)) user.warn = 0
        if (!isNumber(user.joincount)) user.joincount = 2
        if (!('premium' in user)) user.premium = false
        if (!isNumber(user.premiumDate)) user.premiumDate = -1
        if (!('name' in user)) user.name = m.name
        if (!('muto' in user)) user.muto = false
      } else {
        global.db.data.users[m.sender] = {
          messaggi: 0,
          blasphemy: 0,
          exp: 0,
          money: 0,
          warn: 0,
          joincount: 2,
          limit: 15000,
          premium: false,
          premiumDate: -1,
          name: m.name,
          muto: false
        }
      }

      let chat = global.db.data.chats[m.chat]
      if (typeof chat !== 'object') global.db.data.chats[m.chat] = {}

      if (chat) {
        if (!('isBanned' in chat)) chat.isBanned = false
        if (!('detect' in chat)) chat.detect = true
        if (!('delete' in chat)) chat.delete = false
        if (!('antiLink' in chat)) chat.antiLink = true
        if (!('antiTraba' in chat)) chat.antiTraba = true
        if (!isNumber(chat.expired)) chat.expired = 0
        if (!isNumber(chat.messaggi)) chat.messaggi = 0
        if (!('name' in chat)) chat.name = this.getName(m.chat)
        if (!('antispamcomandi' in chat)) chat.antispamcomandi = true
        if (!('welcome' in chat)) chat.welcome = true
      } else {
        global.db.data.chats[m.chat] = {
          name: this.getName(m.chat),
          isBanned: false,
          detect: true,
          delete: false,
          antiLink: true,
          antiTraba: true,
          expired: 0,
          messaggi: 0,
          antispamcomandi: true,
          welcome: true
        }
      }

      let settings = global.db.data.settings[this.user.jid]
      if (typeof settings !== 'object') global.db.data.settings[this.user.jid] = {}

      if (settings) {
        if (!('self' in settings)) settings.self = false
        if (!('autoread' in settings)) settings.autoread = false
        if (!('restrict' in settings)) settings.restrict = true
      } else {
        global.db.data.settings[this.user.jid] = {
          self: false,
          autoread: false,
          restrict: true
        }
      }
    } catch (e) {
      console.error(e)
    }

    if (opts['nyimak']) return
    if (!m.fromMe && opts['self']) return
    if (opts['pconly'] && m.chat.endsWith('g.us')) return
    if (opts['gconly'] && !m.chat.endsWith('g.us')) return

    if (typeof m.text !== 'string') m.text = ''

    const isROwner = [conn.decodeJid(global.conn.user.id), ...global.owner.map(([number]) => number)]
      .map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net')
      .includes(m.sender)
    const isOwner2 = isROwner || m.fromMe
    const isMods = isOwner2 || global.mods.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
    const isPrems = isROwner || isOwner2 || isMods || global.db.data.users[m.sender]?.premiumTime > 0

    if (opts['queque'] && m.text && !(isMods || isPrems)) {
      let queque = this.msgqueque, time = 1000 * 5
      const previousID = queque[queque.length - 1]
      queque.push(m.id || m.key.id)
      setInterval(async function () {
        if (queque.indexOf(previousID) === -1) clearInterval(this)
        await delay(time)
      }, time)
    }

    if (m.isBaileys) return
    m.exp += Math.ceil(Math.random() * 10)

    let usedPrefix
    let _user = global.db.data?.users?.[m.sender]

    const groupMetadata = (m.isGroup ? ((conn.chats[m.chat] || {}).metadata || await this.groupMetadata(m.chat).catch(_ => null)) : {}) || {}
    const participants = (m.isGroup ? groupMetadata.participants : []) || []
    const normalizedParticipants = participants.map(u => {
      const normalizedId = this.decodeJid(u.id)
      return { ...u, id: normalizedId, jid: u.jid || normalizedId }
    })
    const user = (m.isGroup ? normalizedParticipants.find(u => conn.decodeJid(u.id) === m.sender) : {}) || {}
    const bot = (m.isGroup ? normalizedParticipants.find(u => conn.decodeJid(u.id) == this.user.jid) : {}) || {}

    async function isUserAdmin(conn, chatId, senderId) {
      try {
        const decodedSender = conn.decodeJid(senderId)
        const groupMeta = groupMetadata
        return groupMeta?.participants?.some(p =>
          (conn.decodeJid(p.id) === decodedSender || p.jid === decodedSender) &&
          (p.admin === 'admin' || p.admin === 'superadmin')
        ) || false
      } catch {
        return false
      }
    }

    const isRAdmin = user?.admin == 'superadmin' || false
    const isAdmin = m.isGroup ? await isUserAdmin(this, m.chat, m.sender) : false
    const isBotAdmin = m.isGroup ? await isUserAdmin(this, m.chat, this.user.jid) : false

    const ___dirname = path.join(path.dirname(fileURLToPath(import.meta.url)), './plugins')

    // === GESTIONE PLUGIN.ALL (BOTTONI, LISTE, INTERATTIVI) ===
    for (let name in global.plugins) {
      let plugin = global.plugins[name]
      if (!plugin || plugin.disabled) continue
      const __filename = join(___dirname, name)

      // Esegui la funzione 'all' se presente nel plugin
      if (typeof plugin.all === 'function') {
        try {
          await plugin.all.call(this, m, {
            chatUpdate,
            __dirname: ___dirname,
            __filename
          })
        } catch (e) {
          console.error(`Errore in plugin.all (${name}):`, e)
        }
      }

      // Salta plugin admin se restrict è disabilitato
      if (!opts['restrict'] && plugin.tags?.includes('admin')) continue

      // Esegui la funzione 'before' se presente
      if (typeof plugin.before === 'function') {
        try {
          const shouldContinue = await plugin.before.call(this, m, {
            conn: this,
            participants: normalizedParticipants,
            groupMetadata,
            user,
            bot,
            isROwner,
            isOwner: isOwner2,
            isRAdmin,
            isAdmin,
            isBotAdmin,
            isPrems,
            chatUpdate,
            __dirname: ___dirname,
            __filename
          })
          if (shouldContinue) continue
        } catch (e) {
          console.error(`Errore in plugin.before (${name}):`, e)
        }
      }
    }
    // === FINE GESTIONE PLUGIN.ALL ===

    // Gestione comandi normali
    for (let name in global.plugins) {
      let plugin = global.plugins[name]
      if (!plugin || plugin.disabled) continue
      const __filename = join(___dirname, name)

      if (!opts['restrict'] && plugin.tags?.includes('admin')) continue

      const str2Regex = str => str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
      let _prefix = plugin.customPrefix ? plugin.customPrefix : conn.prefix ? conn.prefix : global.prefix
      let match = (_prefix instanceof RegExp ?
        [[_prefix.exec(m.text), _prefix]] :
        Array.isArray(_prefix) ?
          _prefix.map(p => {
            let re = p instanceof RegExp ? p : new RegExp(str2Regex(p))
            return [re.exec(m.text), re]
          }) :
          typeof _prefix === 'string' ?
            [[new RegExp(str2Regex(_prefix)).exec(m.text), new RegExp(str2Regex(_prefix))]] :
            [[[], new RegExp]]
      ).find(p => p[1])

      if (typeof plugin !== 'function') continue
      if (!match) continue

      if ((usedPrefix = (match[0] || '')[0])) {
        let noPrefix = m.text.replace(usedPrefix, '')
        let [command, ...args] = noPrefix.trim().split` `.filter(v => v)
        args = args || []
        let _args = noPrefix.trim().split` `.slice(1)
        let text = _args.join` `
        command = (command || '').toLowerCase()
        let fail = plugin.fail || global.dfail
        let isAccept = plugin.command instanceof RegExp ?
          plugin.command.test(command) :
          Array.isArray(plugin.command) ?
            plugin.command.some(cmd => cmd instanceof RegExp ? cmd.test(command) : cmd === command) :
            typeof plugin.command === 'string' ?
              plugin.command === command :
              false

        if (!isAccept) continue

        m.plugin = name
        if ((m.chat in global.db.data.chats || m.sender in global.db.data.users)) {
          let chat = global.db.data.chats[m.chat]
          let userDb = global.db.data.users[m.sender]
          if (name != 'owner-unbanchat.js' && chat?.isBanned) return
          if (name != 'owner-unbanuser.js' && userDb?.banned) return
        }

        let chatDb = global.db.data.chats[m.chat]
        let adminMode = chatDb?.soloadmin
        let mystica = `${plugin.botAdmin || plugin.admin || plugin.group || plugin || noPrefix || _prefix || m.text.slice(0, 1) == _prefix || plugin.command}`
        if (adminMode && !isOwner2 && !isROwner && m.isGroup && !isAdmin && mystica) return

        if (plugin.rowner && plugin.owner && !(isROwner || isOwner2)) {
          fail('owner', m, this)
          continue
        }
        if (plugin.rowner && !isROwner) {
          fail('rowner', m, this)
          continue
        }
        if (plugin.owner && !isOwner2) {
          fail('owner', m, this)
          continue
        }
        if (plugin.mods && !isMods) {
          fail('mods', m, this)
          continue
        }
        if (plugin.premium && !isPrems) {
          fail('premium', m, this)
          continue
        }
        if (plugin.group && !m.isGroup) {
          fail('group', m, this)
          continue
        } else if (plugin.botAdmin && !isBotAdmin) {
          fail('botAdmin', m, this)
          continue
        } else if (plugin.admin && !isAdmin) {
          fail('admin', m, this)
          continue
        }
        if (plugin.private && m.isGroup) {
          fail('private', m, this)
          continue
        }
        if (plugin.register == true && _user?.registered == false) {
          fail('unreg', m, this)
          continue
        }

        m.isCommand = true
        let xp = 'exp' in plugin ? parseInt(plugin.exp) : 17
        if (xp > 2000) m.reply('Exp limit')
        else if (plugin.money && global.db.data.users[m.sender]?.money < plugin.money * 1) {
          fail('senzasoldi', m, this)
          continue
        }
        m.exp += xp

        if (!isPrems && plugin.limit && global.db.data.users[m.sender]?.limit < plugin.limit * 1) {
          continue
        }
        if (plugin.level > _user?.level) {
          this.reply(m.chat, `livello troppo basso`, m)
          continue
        }

        let extra = {
          match,
          usedPrefix,
          noPrefix,
          _args,
          args,
          command,
          text,
          conn: this,
          normalizedParticipants,
          participants,
          groupMetadata,
          user,
          bot,
          isROwner,
          isOwner: isOwner2,
          isRAdmin,
          isAdmin,
          isBotAdmin,
          isPrems,
          chatUpdate,
          __dirname: ___dirname,
          __filename
        }

