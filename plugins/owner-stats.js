let handler = async (m, { conn }) => {
  const queueStats = await import('../../lib/queue.js').then(mod => {
    return {
      messages: {
        pending: mod.messageQueue.pending,
        size: mod.messageQueue.size
      },
      commands: {
        pending: mod.commandQueue.pending,
        size: mod.commandQueue.size
      },
      media: {
        pending: mod.mediaQueue.pending,
        size: mod.mediaQueue.size
      }
    }
  })
  
  const cacheStats = {
    groupMeta: global.groupMetaCache.size,
    jid: global.jidCache.getStats(),
    processedMsg: global.processedMessages.size
  }
  
  const txt = `*📊 PERFORMANCE STATS*

*Code Messaggi:*
- Pending: ${queueStats.messages.pending}
- In coda: ${queueStats.messages.size}

*Code Comandi:*
- Pending: ${queueStats.commands.pending}
- In coda: ${queueStats.commands.size}

*Code Media:*
- Pending: ${queueStats.media.pending}
- In coda: ${queueStats.media.size}

*Cache:*
- Gruppi: ${cacheStats.groupMeta} cached
- JID: ${cacheStats.jid.keys} cached
- Msg processati: ${cacheStats.processedMsg}
`
  
  m.reply(txt)
}

handler.command = /^(stats|performance)$/i
handler.owner = true

export default handler
