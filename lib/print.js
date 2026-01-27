/**
 * ============================================================================
 * PRINT.JS - Console Message Logger
 * ============================================================================
 * 
 * This module provides formatted console logging for incoming WhatsApp messages.
 * It displays:
 *   - Message metadata (sender, chat, timestamp)
 *   - Message type and size
 *   - Message content with mention resolution
 *   - Event stub parameters (for group events)
 * 
 * @author ChatUnity Team
 * @version 1.0
 * ============================================================================
 */

import { WAMessageStubType } from '@whiskeysockets/baileys'
import chalk from 'chalk'
import { watchFile } from 'fs'
import { fileURLToPath } from 'url'

// ============================================================================
// NAME CACHING SYSTEM
// ============================================================================

/** Cache for resolved contact/group names */
const nameCache = new Map()

/** Time-to-live for cached names (5 minutes) */
const CACHE_TTL = 300000

/**
 * Retrieves a cached name or fetches and caches a new one.
 * Uses a race condition with timeout to prevent blocking on slow lookups.
 * 
 * @param {Object} conn - WhatsApp connection instance
 * @param {string} jid - JID to get name for
 * @returns {Promise<string|null>} Resolved name or null
 */
async function getCachedName(conn, jid) {
  if (!jid) return null
  
  // Check cache first
  const cached = nameCache.get(jid)
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.name
  }
  
  try {
    // Race between name lookup and 100ms timeout
    const name = await Promise.race([
      conn.getName(jid),
      new Promise((resolve) => setTimeout(() => resolve(null), 100))
    ])
    
    // Cache the result
    nameCache.set(jid, { name, timestamp: Date.now() })
    return name
  } catch {
    return null
  }
}

// ============================================================================
// MAIN PRINT FUNCTION
// ============================================================================

/**
 * Prints formatted message information to the console.
 * Creates a visually appealing log entry with all relevant message details.
 * 
 * @param {Object} m - Serialized message object
 * @param {Object} conn - WhatsApp connection instance
 * @returns {Promise<void>}
 */
export default async function (m, conn = { user: {} }) {
  try {
    let sender = m.sender
    
    // Get participant if available (for group messages)
    if (m.key?.participant) {
      sender = m.key.participant
    }
    
    // Decode/normalize sender JID
    let resolvedSender = conn.decodeJid ? conn.decodeJid(sender) : sender
    
    // Handle LID (Linked ID) format - use phone number if available
    if (/@lid/.test(resolvedSender) && m.key?.senderPn) {
      resolvedSender = m.key.senderPn
    }
    
    // Fetch sender and chat names concurrently
    const [senderName, chatName] = await Promise.all([
      getCachedName(conn, resolvedSender),
      getCachedName(conn, m.chat)
    ])
    
    // Format sender display string
    let displaySender = '+' + resolvedSender.replace('@s.whatsapp.net', '').replace('@lid', '') + (senderName ? ' ~ ' + senderName : '')
    
    // Calculate message size
    let filesize = (m.msg?.fileLength?.low || m.msg?.fileLength || m.text?.length || 0)
    
    // Get bot's display info
    let me = '+' + (conn.user?.jid || '').replace('@s.whatsapp.net', '')
    const userName = conn.user.name || conn.user.verifiedName || "Sconosciuto"
    
    // Skip logging own messages
    if (resolvedSender === conn.user?.jid) return
    
    // ============================================================================
    // FORMATTED CONSOLE OUTPUT
    // ============================================================================
    
    // Print main message info box
    console.log(`${chalk.hex('#FE0041').bold('╭★────★────★────★────★')}
${chalk.hex('#FE0041').bold('│')} ${chalk.redBright('Bot:')} ${chalk.greenBright(me)} ~ ${chalk.magentaBright(userName)} ${global.conn?.user?.jid === conn.user?.jid ? chalk.cyanBright('(Principale)') : chalk.cyanBright('(Sub-Bot)')}
${chalk.hex('#FE0041').bold('│')} ${chalk.yellowBright('Data:')} ${chalk.blueBright(new Date(m.messageTimestamp ? 1000 * (m.messageTimestamp.low || m.messageTimestamp) : Date.now()).toLocaleDateString("it-IT", { day: 'numeric', month: 'long', year: 'numeric' }))}
${chalk.hex('#FE0041').bold('│')} ${chalk.greenBright('Tipo evento:')} ${chalk.redBright(m.messageStubType ? WAMessageStubType[m.messageStubType] : 'Nessuno')}
${chalk.hex('#FE0041').bold('│')} ${chalk.magentaBright('Dimensione:')} ${chalk.yellowBright((filesize / 1024).toFixed(1) + ' KB')}
${chalk.hex('#FE0041').bold('│')} ${chalk.blueBright('Da:')} ${chalk.redBright(displaySender)}
${chalk.hex('#FE0041').bold('│')} ${chalk.cyanBright(`Chat:`)} ${chalk.greenBright(chatName || m.chat)} ${m.isGroup ? chalk.gray('(Gruppo)') : chalk.gray('(Privato)')}
${chalk.hex('#FE0041').bold('│')} ${chalk.magentaBright('Tipo:')} ${chalk.yellowBright(m.mtype?.replace(/message$/i, '').replace('audio', m.msg?.ptt ? 'PTT' : 'audio') || 'Sconosciuto')}
${chalk.hex('#FE0041').bold('╰★────★────★────★────★')}`)

    // ============================================================================
    // MESSAGE TEXT WITH MENTION RESOLUTION
    // ============================================================================
    
    if (typeof m.text === 'string' && m.text) {
      let displayText = m.text
      
      // Resolve @mentions to display names
      if (m.mentionedJid && Array.isArray(m.mentionedJid) && m.mentionedJid.length > 0) {
        for (const id of m.mentionedJid) {
          try {
            let mentionJid = conn.decodeJid ? conn.decodeJid(id) : id
            let originalNum = mentionJid.split('@')[0]
            let displayNum = originalNum.split(':')[0]
            let name = await getCachedName(conn, mentionJid) || displayNum

            // Handle LID mentions in groups - try to find real phone number
            if (m.isGroup && /@lid/.test(mentionJid)) {
              try {
                const groupMeta = await conn.groupMetadata(m.chat)
                const participant = groupMeta.participants.find(p => {
                  const pDecodedId = conn.decodeJid ? conn.decodeJid(p.id) : p.id
                  return pDecodedId === mentionJid || (p.jid && (conn.decodeJid ? conn.decodeJid(p.jid) : p.jid) === mentionJid)
                })
                
                if (participant && participant.jid) {
                  const realJid = conn.decodeJid ? conn.decodeJid(participant.jid) : participant.jid
                  displayNum = realJid.split('@')[0].split(':')[0]
                  name = await getCachedName(conn, realJid) || displayNum
                }
              } catch (e) {
                // Ignore group metadata errors
              }
            }

            // Replace @number with @number ~name format
            const replacement = '@' + displayNum + (name && name !== displayNum ? ' ~' + name : '')
            displayText = displayText.replace('@' + originalNum, replacement)
          } catch (e) {
            // Ignore individual mention resolution errors
          }
        }
      }
      
      // Print message text with color based on type
      // Red for errors, yellow for commands, white for regular messages
      console.log(m.error != null ? chalk.red(displayText) : m.isCommand ? chalk.yellow(displayText) : chalk.white(displayText))
    }
    
    // ============================================================================
    // EVENT STUB PARAMETERS (GROUP EVENTS)
    // ============================================================================
    
    // Print stub parameters (e.g., participants in join/leave events)
    if (m.messageStubParameters?.length > 0) {
      const decoded = await Promise.all(m.messageStubParameters.map(async jid => {
        let resolvedJid = conn.decodeJid ? conn.decodeJid(jid) : jid
        
        // Try to resolve LID to phone number
        if (/@lid/.test(resolvedJid)) {
          try {
            const pn = await conn.getPNForLID?.(jid)
            if (pn) resolvedJid = pn
          } catch {}
        }
        
        const name = await getCachedName(conn, resolvedJid)
        return chalk.gray('+' + resolvedJid.replace('@s.whatsapp.net', '').replace('@lid', '') + (name ? ' ~ ' + name : ''))
      }))
      
      console.log(decoded.join(', '))
    }
    
    // ============================================================================
    // SPECIAL MESSAGE TYPE INDICATORS
    // ============================================================================
    
    // Document messages
    if (/document/i.test(m.mtype)) console.log(`📄 ${m.msg.fileName || m.msg.displayName || 'Documento'}`)
    
    // Contact messages
    else if (/contact/i.test(m.mtype)) console.log(`📇 ${m.msg.displayName || 'Contatto'}`)
    
    // Audio messages (voice notes and audio files)
    else if (/audio/i.test(m.mtype)) {
      const duration = m.msg.seconds || 0
      console.log(`${m.msg.ptt ? '🎤 (PTT' : '🎵 ('}AUDIO) ${Math.floor(duration / 60).toString().padStart(2, 0)}:${(duration % 60).toString().padStart(2, 0)}`)
    }
    
    // Print empty line for spacing
    console.log()
  } catch (e) {
    // Silently ignore print errors to prevent log spam
  }
}

// ============================================================================
// HOT-RELOAD WATCHER
// ============================================================================

const __filename = fileURLToPath(import.meta.url)
watchFile(__filename, () => {
  console.log(chalk.redBright("Aggiornamento 'lib/print.js'"))
})