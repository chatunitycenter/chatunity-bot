const { proto, generateWAMessage, areJidsSameUser } = (await import('@chatunity/baileys')).default

export async function all(m, chatUpdate) {
  if (m.isBaileys) return
  if (!m.message) return
  
  if (!(m.message.buttonsResponseMessage || m.message.templateButtonReplyMessage || m.message.listResponseMessage || m.message.interactiveResponseMessage)) {
    return
  }
  
  let id
  if (m.message.buttonsResponseMessage) {
    id = m.message.buttonsResponseMessage.selectedButtonId
  } else if (m.message.templateButtonReplyMessage) {
    id = m.message.templateButtonReplyMessage.selectedId
  } else if (m.message.listResponseMessage) {
    id = m.message.listResponseMessage.singleSelectReply?.selectedRowId
  } else if (m.message.interactiveResponseMessage) {
    try {
      id = JSON.parse(m.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson).id
    } catch (e) {
      return
    }
  }
  
  if (!id) return
  
  console.log('🟢 Trasformazione bottone:', id)
  
  try {
    const fakeMsg = {
      key: {
        remoteJid: m.chat,
        fromMe: false,
        id: `FAKE-${Date.now()}`,
        participant: m.sender
      },
      message: {
        conversation: id,
        extendedTextMessage: {
          text: id
        }
      },
      messageTimestamp: Math.floor(Date.now() / 1000),
      pushName: m.pushName || m.name,
      participant: m.sender
    }
    
    console.log('🟢 Emissione evento per:', id)
    
    this.ev.emit('messages.upsert', {
      messages: [fakeMsg],
      type: 'notify'
    })
  } catch (error) {
    console.error('❌ Errore trasformazione bottone:', error)
  }
}
