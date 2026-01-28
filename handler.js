/**
 * ============================================================================
 * HANDLER.JS - Message and Event Handler
 * ============================================================================
 * 
 * This is the core message handler for the ChatUnity bot.
 * It processes all incoming WhatsApp messages and events including:
 *   - Message parsing and command detection
 *   - User permission checks (owner, admin, premium)
 *   - Plugin execution and error handling
 *   - Group events (join, leave, promote, demote)
 *   - Anti-spam protection
 *   - User statistics tracking
 * 
 * @author ChatUnity Team
 * @version 1.0
 * ============================================================================
 */

// Module imports
import { smsg } from './lib/simple.js'
import { format } from 'util'
import { fileURLToPath } from 'url'
import path, { join } from 'path'
import { unwatchFile, watchFile } from 'fs'
import fs from 'fs'
import chalk from 'chalk'

// Import Baileys proto for message handling
const { proto } = (await import('@whiskeysockets/baileys')).default

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Checks if a value is a valid number (not NaN).
 * @param {*} x - Value to check
 * @returns {boolean} True if valid number
 */
const isNumber = x => typeof x === 'number' && !isNaN(x)

/**
 * Creates a promise that resolves after specified milliseconds.
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise|boolean} Promise that resolves after delay, or false if ms is invalid
 */
const delay = ms => isNumber(ms) && new Promise(resolve => setTimeout(function () {
  clearTimeout(this)
  resolve()
}, ms))

// ============================================================================
// GLOBAL STATE FOR ANTI-SPAM AND USER MANAGEMENT
// ============================================================================

/** Set of globally ignored users (won't receive any bot responses) */
global.ignoredUsersGlobal = global.ignoredUsersGlobal || new Set()

/** Object mapping group IDs to sets of ignored users within that group */
global.ignoredUsersGroup = global.ignoredUsersGroup || {}

/** Object tracking command spam per group for anti-spam protection */
global.groupSpam = global.groupSpam || {}

// ============================================================================
// MAIN MESSAGE HANDLER
// ============================================================================

/**
 * Main handler for incoming WhatsApp messages.
 * Processes messages, executes commands, and manages user/chat data.
 * 
 * @param {Object} chatUpdate - Baileys chat update object containing messages
 * @this {Object} WhatsApp connection instance
 */
export async function handler(chatUpdate) {
  // Initialize stats tracking if not present
  if (!global.db.data.stats) global.db.data.stats = {}
  const stats = global.db.data.stats

  // Initialize message queue for rate limiting
  this.msgqueque = this.msgqueque || []
  
  // Validate chat update
  if (!chatUpdate) return
  
  // Store messages in the message store
  this.pushMessage(chatUpdate.messages).catch(console.error)
  
  // Get the latest message from the update
  let m = chatUpdate.messages[chatUpdate.messages.length - 1]
  if (!m) return
  
  // Ensure database is loaded
  if (global.db.data == null) await global.loadDatabase()

  // ============================================================================
  // OWNER CHECK
  // ============================================================================
  
  /**
   * Determines if the message sender is a bot owner.
   * Owners have unrestricted access to all commands.
   */
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

  // ============================================================================
  // PREFIX VALIDATION
  // ============================================================================
  
  /**
   * Checks if text starts with a valid command prefix.
   * Supports both RegExp and string/array prefix configurations.
   * 
   * @param {string} text - Message text to check
   * @param {RegExp|string|string[]} prefixes - Prefix pattern(s)
   * @returns {boolean} True if text has valid prefix
   */
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

  // ============================================================================
  // ANTI-SPAM PROTECTION FOR GROUPS
  // ============================================================================
  
  /**
   * Implements rate limiting for group commands.
   * Prevents users from spamming commands and overwhelming the bot.
   * - Allows max 2 commands per minute per group
   * - Suspends command processing for 45 seconds when exceeded
   */
  if (
    m.isGroup &&
    !isOwner &&
    typeof m.text === 'string' &&
    hasValidPrefix(m.text, conn.prefix || global.prefix)
  ) {
    const now = Date.now()
    const chatId = m.chat

    // Initialize spam tracking for this group
    if (!global.groupSpam[chatId]) {
      global.groupSpam[chatId] = {
        count: 0,
        firstCommandTimestamp: now,
        isSuspended: false,
        suspendedUntil: null
      }
    }

    const groupData = global.groupSpam[chatId]
    
    // Check if currently suspended
    if (groupData.isSuspended) {
      if (now < groupData.suspendedUntil) return  // Still suspended, ignore command
      
      // Suspension period over, reset counters
      groupData.isSuspended = false
      groupData.count = 0
      groupData.firstCommandTimestamp = now
      groupData.suspendedUntil = null
    }
    
    // Reset counter if more than 60 seconds since first command
    if (now - groupData.firstCommandTimestamp > 60000) {
      groupData.count = 1
      groupData.firstCommandTimestamp = now
    } else {
      groupData.count++
    }
    
    // Trigger suspension if too many commands
    if (groupData.count > 2) {
      groupData.isSuspended = true
      groupData.suspendedUntil = now + 45000  // 45 second cooldown

      await conn.sendMessage(chatId, {
        text: `『 ⚠ 』 Anti-spam comandi\n\nTroppi comandi in poco tempo!\nAttendi *45 secondi* prima di usare altri comandi.\n\n> sviluppato da sam aka vare`,
        mentions: [m.sender]
      })
      return
    }
  }

  // ============================================================================
  // MESSAGE SERIALIZATION AND INITIALIZATION
  // ============================================================================
  
  try {
    // Serialize message for easier handling
    m = smsg(this, m) || m
    if (!m) return
    
    // Initialize experience and limit tracking for this message
    m.exp = 0
    m.limit = false

    // ============================================================================
    // USER AND CHAT DATA INITIALIZATION
    // ============================================================================
    
    try {
      let user = global.db.data.users[m.sender]
      
      // Initialize user object if not exists
      if (typeof user !== 'object') global.db.data.users[m.sender] = {}

      // Ensure all user properties exist with default values
      if (user) {
        if (!isNumber(user.messaggi)) user.messaggi = 0        // Message count
        if (!isNumber(user.blasphemy)) user.blasphemy = 0      // Blasphemy counter
        if (!isNumber(user.exp)) user.exp = 0                  // Experience points
        if (!isNumber(user.money)) user.money = 0              // In-game currency
        if (!isNumber(user.warn)) user.warn = 0                // Warning count
        if (!isNumber(user.joincount)) user.joincount = 2      // Group join limit
        if (!('premium' in user)) user.premium = false         // Premium status
        if (!isNumber(user.premiumDate)) user.premiumDate = -1 // Premium expiry
        if (!('name' in user)) user.name = m.name              // Display name
        if (!('muto' in user)) user.muto = false               // Muted status
      } else {
        // Create new user with all default values
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

      // Initialize chat/group settings
      let chat = global.db.data.chats[m.chat]
      if (typeof chat !== 'object') global.db.data.chats[m.chat] = {}

      // Ensure all chat properties exist with default values
      if (chat) {
        if (!('isBanned' in chat)) chat.isBanned = false       // Chat ban status
        if (!('detect' in chat)) chat.detect = true            // Event detection
        if (!('delete' in chat)) chat.delete = false           // Auto-delete messages
        if (!('antiLink' in chat)) chat.antiLink = true        // Anti-link protection
        if (!('antiTraba' in chat)) chat.antiTraba = true      // Anti-crash protection
        if (!isNumber(chat.expired)) chat.expired = 0          // Expiry timestamp
        if (!isNumber(chat.messaggi)) chat.messaggi = 0        // Message count
        if (!('name' in chat)) chat.name = this.getName(m.chat)
        if (!('antispamcomandi' in chat)) chat.antispamcomandi = true
        if (!('welcome' in chat)) chat.welcome = true          // Welcome messages
      } else {
        // Create new chat with all default values
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

      // Initialize bot settings
      let settings = global.db.data.settings[this.user.jid]
      if (typeof settings !== 'object') global.db.data.settings[this.user.jid] = {}

      // Ensure all settings exist with default values
      if (settings) {
        if (!('self' in settings)) settings.self = false       // Self-mode (owner only)
        if (!('autoread' in settings)) settings.autoread = false // Auto-read messages
        if (!('restrict' in settings)) settings.restrict = true  // Restrict admin commands
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

    // ============================================================================
    // MESSAGE FILTERING OPTIONS
    // ============================================================================
    
    // Skip processing based on command-line options
    if (opts['nyimak']) return                             // Observer mode - no responses
    if (!m.fromMe && opts['self']) return                  // Self mode - only respond to own messages
    if (opts['pconly'] && m.chat.endsWith('g.us')) return  // PC only - ignore groups
    if (opts['gconly'] && !m.chat.endsWith('g.us')) return // Group only - ignore private chats

    // Ensure text property is a string
    if (typeof m.text !== 'string') m.text = ''

    // ============================================================================
    // PERMISSION LEVEL CHECKS
    // ============================================================================
    
    // Real owner check (configured in config.js)
    const isROwner = [conn.decodeJid(global.conn.user.id), ...global.owner.map(([number]) => number)]
      .map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net')
      .includes(m.sender)
    
    // Owner check (includes real owners and bot itself)
    const isOwner2 = isROwner || m.fromMe
    
    // Moderator check (owners + configured moderators)
    const isMods = isOwner2 || global.mods.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
    
    // Premium check (owners, mods, or users with active premium)
    const isPrems = isROwner || isOwner2 || isMods || global.db.data.users[m.sender]?.premiumTime > 0

    // ============================================================================
    // MESSAGE QUEUE FOR RATE LIMITING
    // ============================================================================
    
    // Add message to queue if queque option is enabled (for non-privileged users)
    if (opts['queque'] && m.text && !(isMods || isPrems)) {
      let queque = this.msgqueque, time = 1000 * 5
      const previousID = queque[queque.length - 1]
      queque.push(m.id || m.key.id)
      setInterval(async function () {
        if (queque.indexOf(previousID) === -1) clearInterval(this)
        await delay(time)
      }, time)
    }

    // Skip bot's own messages (from Baileys)
    if (m.isBaileys) return
    
    // Award random experience points for activity
    m.exp += Math.ceil(Math.random() * 10)

    // Track used prefix and get user data
    let usedPrefix
    let _user = global.db.data?.users?.[m.sender]

    // ============================================================================
    // GROUP METADATA AND PARTICIPANT INFO
    // ============================================================================
    
    // Fetch group metadata (cached when possible)
    const groupMetadata = (m.isGroup ? ((conn.chats[m.chat] || {}).metadata || await this.groupMetadata(m.chat).catch(_ => null)) : {}) || {}
    const participants = (m.isGroup ? groupMetadata.participants : []) || []
    
    // Normalize participant JIDs for consistent comparison
    const normalizedParticipants = participants.map(u => {
      const normalizedId = this.decodeJid(u.id)
      return { ...u, id: normalizedId, jid: u.jid || normalizedId }
    })
    
    // Get current user's and bot's participant info
    const user = (m.isGroup ? normalizedParticipants.find(u => conn.decodeJid(u.id) === m.sender) : {}) || {}
    const bot = (m.isGroup ? normalizedParticipants.find(u => conn.decodeJid(u.id) == this.user.jid) : {}) || {}

    /**
     * Checks if a user is an admin in the specified group.
     * 
     * @param {Object} conn - WhatsApp connection
     * @param {string} chatId - Group chat ID
     * @param {string} senderId - User's JID to check
     * @returns {Promise<boolean>} True if user is admin
     */
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

    // Check admin status for message sender and bot
    const isRAdmin = user?.admin == 'superadmin' || false  // Is super admin
    const isAdmin = m.isGroup ? await isUserAdmin(this, m.chat, m.sender) : false
    const isBotAdmin = m.isGroup ? await isUserAdmin(this, m.chat, this.user.jid) : false

    // Get plugins directory path
    const ___dirname = path.join(path.dirname(fileURLToPath(import.meta.url)), './plugins')

    // ============================================================================
    // PLUGIN EXECUTION - PHASE 1: ALL AND BEFORE HOOKS
    // ============================================================================
    
    /**
     * First pass through plugins to execute:
     * - 'all' functions: Run on every message (buttons, lists, interactive)
     * - 'before' functions: Pre-processing before command execution
     */
    for (let name in global.plugins) {
      let plugin = global.plugins[name]
      if (!plugin || plugin.disabled) continue
      const __filename = join(___dirname, name)

      // Execute 'all' function if present (runs on every message)
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

      // Skip admin plugins if restrict mode is disabled
      if (!opts['restrict'] && plugin.tags?.includes('admin')) continue

      // Execute 'before' function if present (pre-processing)
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
    // === END PLUGIN.ALL/BEFORE PHASE ===

    // ============================================================================
    // PLUGIN EXECUTION - PHASE 2: COMMAND HANDLING
    // ============================================================================
    
    /**
     * Second pass through plugins to match and execute commands.
     * Checks prefix, permissions, and executes the appropriate plugin.
     */
    for (let name in global.plugins) {
      let plugin = global.plugins[name]
      if (!plugin || plugin.disabled) continue
      const __filename = join(___dirname, name)

      // Skip admin plugins if restrict is disabled
      if (!opts['restrict'] && plugin.tags?.includes('admin')) continue

      /**
       * Escapes special regex characters in a string.
       * @param {string} str - String to escape
       * @returns {string} Escaped string
       */
      const str2Regex = str => str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
      
      // Determine which prefix to use (plugin-specific, connection, or global)
      let _prefix = plugin.customPrefix ? plugin.customPrefix : conn.prefix ? conn.prefix : global.prefix
      
      // Match prefix against message text
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

      // Skip non-function plugins and unmatched prefixes
      if (typeof plugin !== 'function') continue
      if (!match) continue

      // ============================================================================
      // COMMAND PARSING AND MATCHING
      // ============================================================================
      
      if ((usedPrefix = (match[0] || '')[0])) {
        // Remove prefix and parse command/arguments
        let noPrefix = m.text.replace(usedPrefix, '')
        let [command, ...args] = noPrefix.trim().split` `.filter(v => v)
        args = args || []
        let _args = noPrefix.trim().split` `.slice(1)
        let text = _args.join` `
        command = (command || '').toLowerCase()
        
        // Get fail handler (plugin-specific or global default)
        let fail = plugin.fail || global.dfail
        
        // Check if command matches plugin's command pattern
        let isAccept = plugin.command instanceof RegExp ?
          plugin.command.test(command) :
          Array.isArray(plugin.command) ?
            plugin.command.some(cmd => cmd instanceof RegExp ? cmd.test(command) : cmd === command) :
            typeof plugin.command === 'string' ?
              plugin.command === command :
              false

        if (!isAccept) continue

        // Store plugin name for statistics
        m.plugin = name
        
        // ============================================================================
        // BAN CHECKS
        // ============================================================================
        
        if ((m.chat in global.db.data.chats || m.sender in global.db.data.users)) {
          let chat = global.db.data.chats[m.chat]
          let userDb = global.db.data.users[m.sender]
          
          // Skip if chat is banned (unless unban command)
          if (name != 'owner-unbanchat.js' && chat?.isBanned) return
          
          // Skip if user is banned (unless unban command)
          if (name != 'owner-unbanuser.js' && userDb?.banned) return
        }

        // ============================================================================
        // ADMIN-ONLY MODE CHECK
        // ============================================================================
        
        let chatDb = global.db.data.chats[m.chat]
        let adminMode = chatDb?.soloadmin
        let mystica = `${plugin.botAdmin || plugin.admin || plugin.group || plugin || noPrefix || _prefix || m.text.slice(0, 1) == _prefix || plugin.command}`
        
        // In admin mode, non-admin users can't use commands
        if (adminMode && !isOwner2 && !isROwner && m.isGroup && !isAdmin && mystica) return

        // ============================================================================
        // PERMISSION CHECKS
        // ============================================================================
        
        // Check owner requirements
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
        
        // Check moderator requirement
        if (plugin.mods && !isMods) {
          fail('mods', m, this)
          continue
        }
        
        // Check premium requirement
        if (plugin.premium && !isPrems) {
          fail('premium', m, this)
          continue
        }
        
        // Check group requirement
        if (plugin.group && !m.isGroup) {
          fail('group', m, this)
          continue
        } 
        
        // Check bot admin requirement
        else if (plugin.botAdmin && !isBotAdmin) {
          fail('botAdmin', m, this)
          continue
        } 
        
        // Check user admin requirement
        else if (plugin.admin && !isAdmin) {
          fail('admin', m, this)
          continue
        }
        
        // Check private chat requirement
        if (plugin.private && m.isGroup) {
          fail('private', m, this)
          continue
        }
        
        // Check registration requirement
        if (plugin.register == true && _user?.registered == false) {
          fail('unreg', m, this)
          continue
        }

        // ============================================================================
        // EXPERIENCE AND RESOURCE CHECKS
        // ============================================================================
        
        // Mark message as a command
        m.isCommand = true
        
        // Calculate experience points to award
        let xp = 'exp' in plugin ? parseInt(plugin.exp) : 17
        if (xp > 2000) m.reply('Exp limit')
        
        // Check money requirement
        else if (plugin.money && global.db.data.users[m.sender]?.money < plugin.money * 1) {
          fail('senzasoldi', m, this)
          continue
        }
        m.exp += xp

        // Check limit requirement (for non-premium users)
        if (!isPrems && plugin.limit && global.db.data.users[m.sender]?.limit < plugin.limit * 1) {
          continue
        }
        
        // Check level requirement
        if (plugin.level > _user?.level) {
          this.reply(m.chat, `livello troppo basso`, m)
          continue
        }

        // ============================================================================
        // PLUGIN EXECUTION
        // ============================================================================
        
        // Prepare context object for plugin execution
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

        try {
          // Execute the plugin
          await plugin.call(this, m, extra)
          
          // Apply limit/money costs for non-premium users
          if (!isPrems) {
            m.limit = m.limit || plugin.limit || false
            m.money = m.money || plugin.money || false
          }
        } catch (e) {
          // Handle plugin execution errors
          m.error = e
          console.error(e)
          if (e) {
            // Format error message and hide API keys
            let textErr = format(e)
            for (let key of Object.values(global.APIKeys))
              textErr = textErr.replace(new RegExp(key, 'g'), '#HIDDEN#')
            m.reply(textErr)
          }
        } finally {
          // Execute 'after' hook if present
          if (typeof plugin.after === 'function') {
            try {
              await plugin.after.call(this, m, extra)
            } catch (e) {
              console.error(`Errore in plugin.after (${name}):`, e)
            }
          }
        }
        
        // Only execute first matching command
        break
      }
    }
  // ============================================================================
  // ERROR HANDLING AND CLEANUP
  // ============================================================================
  
} catch (e) {
    console.error(e)
  } finally {
    // Remove message from queue after processing
    if (opts['queque'] && m.text) {
      const quequeIndex = this.msgqueque.indexOf(m.id || m.key.id)
      if (quequeIndex !== -1) this.msgqueque.splice(quequeIndex, 1)
    }

    // ============================================================================
    // USER STATISTICS UPDATE
    // ============================================================================
    
    if (m?.sender) {
      let user = global.db.data.users[m.sender]
      let chat = global.db.data.chats[m.chat]
      
      // Delete messages from muted users
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
      
      // Update user statistics
      if (user) {
        user.exp += m.exp          // Add earned experience
        user.limit -= m.limit * 1   // Deduct used limit
        user.money -= m.money * 1   // Deduct spent money
        user.messaggi += 1          // Increment message count
      }
      
      // Update chat message count
      if (chat) chat.messaggi += 1
    }
    
    // ============================================================================
    // COMMAND STATISTICS TRACKING
    // ============================================================================
    
    if (m?.plugin) {
      let now = +new Date
      
      // Initialize stats for this plugin if not exists
      if (!stats[m.plugin]) {
        stats[m.plugin] = {
          total: 0,          // Total executions
          success: 0,        // Successful executions
          last: 0,           // Last execution timestamp
          lastSuccess: 0     // Last successful execution timestamp
        }
      }
      
      const stat = stats[m.plugin]
      stat.total += 1
      stat.last = now
      
      // Track successful executions (no errors)
      if (!m.error) {
        stat.success += 1
        stat.lastSuccess = now
      }
    }

    // ============================================================================
    // MESSAGE LOGGING AND AUTO-READ
    // ============================================================================
    
    try {
      // Print message to console (unless disabled)
      if (!opts['noprint']) await (await import(`./lib/print.js`)).default(m, this)
    } catch (e) {
      console.log(m, m.quoted, e)
    }
    
    // Auto-read messages if enabled
    if (opts['autoread']) await this.readMessages([m.key])
  }
}

// ============================================================================
// GROUP PARTICIPANTS UPDATE HANDLER
// ============================================================================

/**
 * Handles group participant changes (join, leave, promote, demote).
 * Sends welcome/goodbye messages based on group settings.
 * 
 * @param {Object} param0 - Event data
 * @param {string} param0.id - Group ID
 * @param {string[]} param0.participants - Array of affected participant JIDs
 * @param {string} param0.action - Action type: 'add', 'remove', 'promote', 'demote'
 * @this {Object} WhatsApp connection instance
 */
export async function participantsUpdate({ id, participants, action }) {
  // Skip in self mode or during initialization
  if (opts['self']) return
  if (this.isInit) return
  
  // Ensure database is loaded
  if (global.db.data == null) await loadDatabase()

  // Get chat settings
  let chat = global.db.data.chats[id] || {}
  let text = ''
  
  // Get bot display name and channel JID from settings
  let nomeDelBot = global.db.data.nomedelbot || `𝖛𝖊𝖝-𝖇𝖔𝖙`
  let jidCanale = global.db.data.jidcanale || ''

  switch (action) {
    case 'add':
    case 'remove':
      // Only send messages if welcome feature is enabled
      if (chat.welcome) {
        // Get group metadata for subject and description
        let groupMetadata = await this.groupMetadata(id) || (conn.chats[id] || {}).metadata
        
        for (let user of participants) {
          // Try to get user's profile picture
          let pp = './menu/principale.jpeg'  // Default fallback image
          try {
            pp = await this.profilePictureUrl(user, 'image')
          } catch (e) {
            // Use default if profile picture unavailable
          } finally {
            let apii = await this.getFile(pp)

            // Format message based on action type
            if (action === 'add') {
              text = (chat.sWelcome || this.welcome || conn.welcome || 'benvenuto, @user!')
                .replace('@subject', await this.getName(id))
                .replace('@desc', groupMetadata.desc?.toString() || 'bot')
                .replace('@user', '@' + user.split('@')[0])
            } else if (action === 'remove') {
              text = (chat.sBye || this.bye || conn.bye || 'bye bye, @user!')
                .replace('@user', '@' + user.split('@')[0])
            }

            // Send formatted welcome/goodbye message
            this.sendMessage(id, {
              text: text,
              contextInfo: {
                mentionedJid: [user],
                forwardingScore: 99,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                  newsletterJid: jidCanale,
                  serverMessageId: '',
                  newsletterName: `${nomeDelBot}`
                },
                externalAdReply: {
                  title: (
                    action === 'add'
                      ? '𝐌𝐞𝐬𝐬𝐚𝐠𝐠𝐢𝐨 𝐝𝐢 𝐛𝐞𝐧𝐯𝐞𝐧𝐮𝐭𝐨'
                      : '𝐌𝐞𝐬𝐬𝐚𝐠𝐠𝐢𝐨 𝐝𝐢 𝐚𝐝𝐝𝐢𝐨'
                  ),
                  body: ``,
                  previewType: 'PHOTO',
                  thumbnailUrl: ``,
                  thumbnail: apii.data,
                  mediaType: 1,
                  renderLargerThumbnail: false
                }
              }
            })
          }
        }
      }
      break
  }
}

// ============================================================================
// GROUP SETTINGS UPDATE HANDLER
// ============================================================================

/**
 * Handles group setting changes (icon, link revocation, etc.).
 * Sends notification messages to the group when settings change.
 * 
 * @param {Object[]} groupsUpdate - Array of group update objects
 * @this {Object} WhatsApp connection instance
 */
export async function groupsUpdate(groupsUpdate) {
  // Skip in self mode
  if (opts['self']) return
  
  for (const groupUpdate of groupsUpdate) {
    const id = groupUpdate.id
    if (!id) continue
    
    let chats = global.db.data.chats[id], text = ''
    
    // Handle group icon change
    if (groupUpdate.icon) {
      text = (chats.sIcon || this.sIcon || conn.sIcon || '`immagine modificata`')
        .replace('@icon', groupUpdate.icon)
    }
    
    // Handle group link revocation
    if (groupUpdate.revoke) {
      text = (chats.sRevoke || this.sRevoke || conn.sRevoke || '`link reimpostato, nuovo link:`\n@revoke')
        .replace('@revoke', groupUpdate.revoke)
    }
    
    // Send notification if there's a message to send
    if (!text) continue
    await this.sendMessage(id, { text, mentions: this.parseMention(text) })
  }
}

// ============================================================================
// INCOMING CALL HANDLER
// ============================================================================

/**
 * Handles incoming WhatsApp calls.
 * Implements anti-call feature that blocks callers if enabled.
 * 
 * @param {Object[]} callUpdate - Array of call event objects
 * @this {Object} WhatsApp connection instance
 */
export async function callUpdate(callUpdate) {
  // Check if anti-call is enabled in settings
  let isAnticall = global.db.data.settings[this.user.jid].antiCall
  if (!isAnticall) return
  
  for (let nk of callUpdate) {
    // Only handle private calls (not group calls)
    if (nk.isGroup == false) {
      // Only respond to incoming call offers
      if (nk.status == 'offer') {
        // Send warning message to caller
        let callmsg = await this.reply(nk.from, `ciao @${nk.from.split('@')[0]}, c'è anticall.`, false, { mentions: [nk.from] })
        
        // Send contact card with bot info
        let vcard = `BEGIN:VCARD\nVERSION:5.0\nN:;𝐂𝐡𝐚𝐭𝐔𝐧𝐢𝐭𝐲;;;\nFN:𝐂𝐡𝐚𝐭𝐔𝐧𝐢𝐭𝐲\nORG:𝐂𝐡𝐚𝐭𝐔𝐧𝐢𝐭𝐲\nTITLE:\nitem1.TEL;waid=393773842461:+39 3515533859\nitem1.X-ABLabel:𝐂𝐡𝐚𝐭𝐔𝐧𝐢𝐭𝐲\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:𝐂𝐡𝐚𝐭𝐔𝐧𝐢𝐭𝐲\nEND:VCARD`
        await this.sendMessage(nk.from, { contacts: { displayName: 'Unlimited', contacts: [{ vcard }] } }, { quoted: callmsg })
        
        // Block the caller
        await this.updateBlockStatus(nk.from, 'block')
      }
    }
  }
}

// ============================================================================
// MESSAGE DELETE HANDLER
// ============================================================================

/**
 * Handles message deletion events.
 * Can be used to implement anti-delete features.
 * 
 * @param {Object} message - Deleted message info
 * @this {Object} WhatsApp connection instance
 */
export async function deleteUpdate(message) {
  try {
    const { fromMe, id, participant } = message
    
    // Skip own message deletions
    if (fromMe) return
    
    // Try to load the deleted message from store
    let msg = this.serializeM(this.loadMessage(id))
    if (!msg) return
    
    // Additional anti-delete logic can be added here
  } catch (e) {
    console.error(e)
  }
}

// ============================================================================
// DEFAULT FAILURE MESSAGE HANDLER
// ============================================================================

/**
 * Default handler for permission/requirement failures.
 * Displays appropriate error messages when users lack required permissions.
 * 
 * @param {string} type - Failure type (owner, admin, premium, etc.)
 * @param {Object} m - Message object
 * @param {Object} conn - WhatsApp connection
 */
global.dfail = (type, m, conn) => {
  // Map failure types to Italian error messages
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
  
  // Send styled error message if type is recognized
  if (msg) return conn.sendMessage(m.chat, {
    text: ' ',
    contextInfo: {
      externalAdReply: {
        title: `${msg}`,
        body: ``,
        previewType: 'PHOTO',
        thumbnail: fs.readFileSync('./media/principale.jpeg'),
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m })
}

// ============================================================================
// HOT-RELOAD WATCHER
// ============================================================================

// Watch this file for changes and auto-reload
const file = global.__filename(import.meta.url, true)
watchFile(file, async () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'handler.js'"))
  if (global.reloadHandler) console.log(await global.reloadHandler())
})
