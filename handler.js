import { smsg } from './lib/simple.js'
import { format } from 'util'
import { fileURLToPath } from 'url'
import path, { join } from 'path'
import { unwatchFile, watchFile } from 'fs'
import fs from 'fs'
import chalk from 'chalk'
const { proto } = (await import('@realvare/based')).default
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
            const isROwner = [conn.decodeJid(global.conn.user.id), ...global.owner.map(([number]) => number)] // cosi si fa ㊙️
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
        if (prefixes instanceof RegExp) {
            return prefixes.test(text)
        }
        const prefixList = Array.isArray(prefixes) ? prefixes : [prefixes]
        
        return prefixList.some(p => {
            if (p instanceof RegExp) {
                return p.test(text)
            } else if (typeof p === 'string') {
                return text.startsWith(p)
            }
            return false
        })
    }
if (
  m.isGroup &&
  !isOwner &&
  typeof m.text === 'string' &&
  hasValidPrefix(m.text, conn.prefix || global.prefix)
) {
  const now = Date.now();
  const chatId = m.chat;

  if (!global.groupSpam[chatId]) {
    global.groupSpam[chatId] = {
      count: 0,
      firstCommandTimestamp: now,
      isSuspended: false,
      suspendedUntil: null
    };
  }

  const groupData = global.groupSpam[chatId];
  if (groupData.isSuspended) {
    if (now < groupData.suspendedUntil) return;
    groupData.isSuspended = false;
    groupData.count = 0;
    groupData.firstCommandTimestamp = now;
    groupData.suspendedUntil = null;
  }
  if (now - groupData.firstCommandTimestamp > 60000) {
    groupData.count = 1;
    groupData.firstCommandTimestamp = now;
  } else {
    groupData.count++;
  }
  if (groupData.count > 2) {
    groupData.isSuspended = true;
    groupData.suspendedUntil = now + 45000;

    await conn.sendMessage(chatId, { 
      text: `『 ⚠ 』 Anti-spam comandi\n\nTroppi comandi in poco tempo!\nAttendi *45 secondi* prima di usare altri comandi.\n\n> sviluppato da sam aka vare`, // github.com/realvare
      mentions: [m.sender]
    });
    return;
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
            

            let handler = async (m, { conn, text }) => {
    const botName = global.t('default_bot_name', m?.sender) || "ChatUnityBot";
    let destinatario;

    if (m.quoted && m.quoted.sender) {
        destinatario = m.quoted.sender;
    } else if (m.mentionedJid && m.mentionedJid.length > 0) {
        destinatario = m.mentionedJid[0];
    } else {
        return m.reply(global.t('rizz_no_target', m.sender));
    }

    let chiHaUsato = `@${m.sender.split('@')[0]}`;
    let chiTaggare = `@${destinatario.split('@')[0]}`;

    m.reply(
        global.t('rizz_message', m.sender, null, {
            piropo: pickRandom(global.piropo),
            sender: chiHaUsato,
            target: chiTaggare
        }),
        null,
        {
            mentions: [destinatario]
        }
    );
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

        // Verifica permessi utente
        const isROwner = [conn.decodeJid(global.conn.user.id), ...global.owner.map(([number]) => number)]
            .map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net')
            .includes(m.sender)
        const isOwner = isROwner || m.fromMe
        const isMods = isOwner || global.mods.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
        const isPrems = isROwner || isOwner || isMods || global.db.data.users[m.sender]?.premiumTime > 0

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
            const normalizedId = this.decodeJid(u.id);
            return { ...u, id: normalizedId, jid: u.jid || normalizedId };
        });
        const user = (m.isGroup ? normalizedParticipants.find(u => conn.decodeJid(u.id) === m.sender) : {}) || {}
        const bot = (m.isGroup ? normalizedParticipants.find(u => conn.decodeJid(u.id) == this.user.jid) : {}) || {}

        // --- INIZIO PATCH RUOLI ADMIN ---
      //credit to vare
        async function isUserAdmin(conn, chatId, senderId) {
            try {
                const decodedSender = conn.decodeJid(senderId);
                const groupMeta = groupMetadata;
                return groupMeta?.participants?.some(p =>
                    (conn.decodeJid(p.id) === decodedSender || p.jid === decodedSender) &&
                    (p.admin === 'admin' || p.admin === 'superadmin')
                ) || false;
            } catch {
                return false;
            }
        }
        // --- FINE PATCH RUOLI ADMIN ---


        const isRAdmin = user?.admin == 'superadmin' || false
        const isAdmin = m.isGroup ? await isUserAdmin(this, m.chat, m.sender) : false
        const isBotAdmin = m.isGroup ? await isUserAdmin(this, m.chat, this.user.jid) : false


        const ___dirname = path.join(path.dirname(fileURLToPath(import.meta.url)), './plugins')
        for (let name in global.plugins) {
            let plugin = global.plugins[name]
            if (!plugin || plugin.disabled) continue
            const __filename = join(___dirname, name)
            
            if (typeof plugin.all === 'function') {
                try {
                    await plugin.all.call(this, m, {
                        chatUpdate,
                        __dirname: ___dirname,
                        __filename
                    })
                } catch (e) {
                    console.error(e)
                }
            }

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

            if (typeof plugin.before === 'function') {
                if (await plugin.before.call(this, m, {
                    match,
                    conn: this,
                    normalizedParticipants,
                    participants,
                    groupMetadata,
                    user,
                    bot,
                    isROwner,
                    isOwner,
                    isRAdmin,
                    isAdmin,
                    isBotAdmin,
                    isPrems,
                    chatUpdate,
                    __dirname: ___dirname,
                    __filename
                })) continue
            }

            if (typeof plugin !== 'function') continue

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
                    let user = global.db.data.users[m.sender]
                    if (name != 'owner-unbanchat.js' && chat?.isBanned) return
                    if (name != 'owner-unbanuser.js' && user?.banned) return
                }

                let hl = _prefix 
                let adminMode = global.db.data.chats[m.chat]?.soloadmin
                let mystica = `${plugin.botAdmin || plugin.admin || plugin.group || plugin || noPrefix || hl || m.text.slice(0, 1) == hl || plugin.command}`
                if (adminMode && !isOwner && !isROwner && m.isGroup && !isAdmin && mystica) return

                // Controlli permessi
                if (plugin.rowner && plugin.owner && !(isROwner || isOwner)) {
                    fail('owner', m, this)
                    continue
                }
                if (plugin.rowner && !isROwner) {
                    fail('rowner', m, this)
                    continue
                }
                if (plugin.owner && !isOwner) {
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
                    isOwner,
                    isRAdmin,
                    isAdmin,
                    isBotAdmin,
                    isPrems,
                    chatUpdate,
                    __dirname: ___dirname,
                    __filename
                }

                try {
                    await plugin.call(this, m, extra)
                    if (!isPrems) {
                        m.limit = m.limit || plugin.limit || false
                        m.money = m.money || plugin.money || false 
                    }
                } catch (e) {
                    m.error = e
                    console.error(e)
                    if (e) {
                        let text = format(e)
                        for (let key of Object.values(global.APIKeys))
                            text = text.replace(new RegExp(key, 'g'), '#HIDDEN#')
                        m.reply(text)
                    }
                } finally {
                    if (typeof plugin.after === 'function') {
                        try {
                            await plugin.after.call(this, m, extra)
                        } catch (e) {
                            console.error(e)
                        }

                    }

                }
                break
            }
        }
    } catch (e) {
        console.error(e)
    } finally {
        if (opts['queque'] && m.text) {
            const quequeIndex = this.msgqueque.indexOf(m.id || m.key.id)
            if (quequeIndex !== -1) this.msgqueque.splice(quequeIndex, 1)
        }

        if (m?.sender) {
            let user = global.db.data.users[m.sender]
            let chat = global.db.data.chats[m.chat]
            if (user?.muto) {
                await conn.sendMessage(m.chat, {
                    delete: {
                        remoteJid: m.chat,
                        fromMe: false,
                        id: m.key.id,
                        participant: m.key.participant
                    }
                })
            }
            if (user) {
                user.exp += m.exp
                user.limit -= m.limit * 1
                user.money -= m.money * 1
                user.messaggi += 1
            }
            if (chat) chat.messaggi += 1
        }
        if (m?.plugin) {
            let now = +new Date
            if (!stats[m.plugin]) {
                stats[m.plugin] = {
                    total: 0,
                    success: 0,
                    last: 0,
                    lastSuccess: 0
                }
            }
            const stat = stats[m.plugin]
            stat.total += 1
            stat.last = now
            if (!m.error) {
                stat.success += 1
                stat.lastSuccess = now
            }
        }

        try {
            if (!opts['noprint']) await (await import(`./lib/print.js`)).default(m, this)
        } catch (e) {
            console.log(m, m.quoted, e)
        }
        if (opts['autoread']) await this.readMessages([m.key])
    }
}

export async function participantsUpdate({ id, participants, action }) {
    if (opts['self']) return
    if (this.isInit) return
    if (global.db.data == null) await loadDatabase()
    let chat = global.db.data.chats[id] || {}

    // --- Benvenuto/Addio ---
    if (chat.welcome) {
        let groupMetadata = await this.groupMetadata(id).catch(_ => null) || (this.chats[id] || {}).metadata
        for (let user of participants) {
            let pp = './menu/principale.jpeg'
            try {
                pp = await this.profilePictureUrl(user, 'image')
            } catch (e) {}
            let apii
            try {
                apii = await this.getFile(pp)
            } catch (e) {
                apii = { data: fs.readFileSync('./menu/principale.jpeg') }
            }
            let nomeDelBot = global.db.data.nomedelbot || `𝐂𝐡𝐚𝐭𝐔𝐧𝐢𝐭𝐲-𝐁𝐨𝐭`
            let text = (action === 'add'
                ? (chat.sWelcome || this.welcome || this.conn?.welcome || 'Benvenuto, @user!').replace('@subject', groupMetadata?.subject || '').replace('@desc', groupMetadata?.desc?.toString() || 'bot')
                : (chat.sBye || this.bye || this.conn?.bye || 'Addio, @user!')).replace('@user', '@' + user.split('@')[0])
            await this.sendMessage(id, {
                text: text,
                contextInfo: {
                    mentionedJid: [user],
                    forwardingScore: 99,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363422724720651@newsletter',
                        serverMessageId: '',
                        newsletterName: `${nomeDelBot}`
                    },
                    externalAdReply: {
                        "title": `${action === 'add' ? '𝐌𝐞𝐬𝐬𝐚𝐠𝐠𝐢𝐨 𝐝𝐢 𝐛𝐞𝐧𝐯𝐞𝐧𝐮𝐭𝐨' : '𝐌𝐞𝐬𝐬𝐚𝐠𝐠𝐢𝐨 𝐝𝐢 𝐚𝐝𝐝𝐢𝐨'}`,
                        "previewType": "PHOTO",
                        "thumbnailUrl": ``,
                        "thumbnail": apii.data,
                        "mediaType": 1
                    }
                }
            })
        }
    }
}

export async function groupsUpdate(groupsUpdate) {
    if (opts['self']) return
    for (const groupUpdate of groupsUpdate) {
        const id = groupUpdate.id
        if (!id) continue
        let chats = global.db.data.chats[id], text = ''
        if (groupUpdate.icon) text = (chats.sIcon || this.sIcon || conn.sIcon || '`immagine modificata`').replace('@icon', groupUpdate.icon)
        if (groupUpdate.revoke) text = (chats.sRevoke || this.sRevoke || conn.sRevoke || '`link reimpostato, nuovo link:`\n@revoke').replace('@revoke', groupUpdate.revoke)
        if (!text) continue
        await this.sendMessage(id, { text, mentions: this.parseMention(text) })
    }
}

export async function callUpdate(callUpdate) {
    let isAnticall = global.db.data.settings[this.user.jid].antiCall
    if (!isAnticall) return
    for (let nk of callUpdate) {
        if (nk.isGroup == false) {
            if (nk.status == "offer") {
                let callmsg = await this.reply(nk.from, `ciao @${nk.from.split('@')[0]}, c'è anticall.`, false, { mentions: [nk.from] })
                let vcard = `BEGIN:VCARD\nVERSION:5.0\nN:;𝐂𝐡𝐚𝐭𝐔𝐧𝐢𝐭𝐲;;;\nFN:𝐂𝐡𝐚𝐭𝐔𝐧𝐢𝐭𝐲\nORG:𝐂𝐡𝐚𝐭𝐔𝐧𝐢𝐭𝐲\nTITLE:\nitem1.TEL;waid=393773842461:+39 3515533859\nitem1.X-ABLabel:𝐂𝐡𝐚𝐭𝐔𝐧𝐢𝐭𝐲\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:𝐂𝐡𝐚𝐭𝐔𝐧𝐢𝐭𝐲\nEND:VCARD`
                await this.sendMessage(nk.from, { contacts: { displayName: 'Unlimited', contacts: [{ vcard }] }}, {quoted: callmsg})
                await this.updateBlockStatus(nk.from, 'block')
            }
        }
    }
}

export async function deleteUpdate(message) {
    try {
        const { fromMe, id, participant } = message
        if (fromMe) return
        let msg = this.serializeM(this.loadMessage(id))
        if (!msg) return
    } catch (e) {
        console.error(e)
    }
}

global.dfail = (type, m, conn) => {
    let msg = {
        rowner: '𝐐𝐮𝐞𝐬𝐭𝐨 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐞̀ 𝐬𝐨𝐥𝐨 𝐩𝐞𝐫 𝐨𝐰𝐧𝐞𝐫 🕵🏻‍♂️',
        owner: '𝐐𝐮𝐞𝐬𝐭𝐨 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐞̀ 𝐬𝐨𝐥𝐨 𝐩𝐞𝐫 𝐨𝐰𝐧𝐞𝐫 🕵🏻‍♂️',
        mods: '𝐐𝐮𝐞𝐬𝐭𝐨 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐥𝐨 𝐩𝐨𝐬𝐬𝐨𝐧𝐨 𝐮𝐭𝐢𝐥𝐢𝐳𝐳𝐚𝐫𝐞 𝐬𝐨𝐥𝐨 𝐚𝐝𝐦𝐢𝐧 𝐞 𝐨𝐰𝐧𝐞𝐫 ⚙️',
        premium: '𝐐𝐮𝐞𝐬𝐭𝐨 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐞̀ 𝐩𝐞𝐫 𝐦𝐞𝐦𝐛𝐫𝐢 𝐩𝐫𝐞𝐦𝐢𝐮𝐦 ✅',
        group: '𝐐𝐮𝐞𝐬𝐭𝐨 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐩𝐮𝐨𝐢 𝐮𝐭𝐢𝐥𝐢𝐳𝐳𝐚𝐫𝐥𝐨 𝐢𝐧 𝐮𝐧 𝐠𝐫𝐮𝐩𝐩𝐨 👥',
        private: '𝐐𝐮𝐞𝐬𝐭𝐨 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐩𝐮𝐨𝐢 𝐮𝐭𝐢𝐥𝐢𝐧𝐢𝐭𝐚𝐫𝐥𝐨 𝐢𝐧 𝐜𝐡𝐚𝐭 𝐩𝐫𝐢𝐯𝐚𝐭𝐚 👤',
        admin: '𝐐𝐮𝐞𝐬𝐭𝐨 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐞̀ 𝐩𝐞𝐫 𝐬𝐨𝐥𝐢 𝐚𝐝𝐦𝐢𝐧 👑',
        botAdmin: '𝐃𝐞𝐯𝐢 𝐝𝐚𝐫𝐞 𝐚𝐝𝐦𝐢𝐧 𝐚𝐥 𝐛𝐨𝐭 👑',
        restrict: '🔐 𝐑𝐞𝐬𝐭𝐫𝐢𝐜𝐭 𝐞 𝐝𝐢𝐬𝐚𝐭𝐭𝐢𝐯𝐚𝐭𝐨 🔐'
    }[type]
    if (msg) return conn.sendMessage(m.chat, { 
        text: ' ', 
        contextInfo: {
            "externalAdReply": {
                "title": `${msg}`, 
                "body": ``, 
                "previewType": "PHOTO",
                "thumbnail": fs.readFileSync('./icone/accessdenied2.png'),
                "mediaType": 1,
                "renderLargerThumbnail": true
            }
        }
    }, {quoted: m})
}

const file = global.__filename(import.meta.url, true)
watchFile(file, async () => {
    unwatchFile(file)
    console.log(chalk.redBright("Update 'handler.js'"))
    if (global.reloadHandler) console.log(await global.reloadHandler())
})