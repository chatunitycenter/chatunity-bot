import fetch from 'node-fetch'

const chatHistory = new Map()

const formatHistory = (history) => {
  if (history.length === 0) return ''
  // Prende gli ultimi 5 scambi (utente + bot)
  const lastMessages = history.slice(-10) 
  return '\n\n💭 Cronologia recente:\n' + lastMessages.map(msg => `${msg.role}: ${msg.content}`).join('\n')
}

let handler = async (m, { text, usedPrefix, command }) => {
  if (!text) return m.reply(`Inserisci un testo.\n\n• Esempio:\n${usedPrefix + command} come va`)

  try {
    const basePrompt = `Il tuo nome è VareBot e sei stato creato da Sam. Usi la lingua italiana. Sii coinvolgente, simpatico, diretto, curioso e rispondi sempre in modo chiaro e utile. Se puoi, aggiungi un tocco di ironia e stimola la conversazione. Le tue risposte devono essere brevi e concise.`
    const chatId = m.chat
    
    if (!chatHistory.has(chatId)) {
      chatHistory.set(chatId, [])
    }
    
    let history = chatHistory.get(chatId)
    const historyText = formatHistory(history)
    
    await m.react('💬')
    
    const response = await getAIResponse(basePrompt + historyText, text)
    
    // Aggiorna la cronologia
    history.push({ role: 'user', content: text })
    history.push({ role: 'model', content: response })

    // Limita la cronologia per non superare i limiti di token
    if (history.length > 20) {
      history = history.slice(history.length - 20)
    }
    
    chatHistory.set(chatId, history)
    
    await m.reply(response)
    
  } catch (e) {
    console.error(e)
    await m.reply(global.errore || 'Si è verificato un errore, riprova più tardi.')
  }
}

async function getAIResponse(prompt, question) {
  const googleApiKey = global.APIKeys?.google
  if (!googleApiKey || googleApiKey === 'INSERISCI_LA_TUA_CHIAVE') {
    return "⚠️ Chiave API Google non configurata."
  }
  const models = [
    'gemini-2.5-flash',
  ]

  let lastError = null

  for (const model of models) {
    try {
      return await getGeminiResponse(googleApiKey, prompt, question, model)
    } catch (err) {
      lastError = err
      console.log(`Modello ${model} fallito:`, err.message)
      if (err.message.includes('403')) {
        break
      }
    }
  }
  
  if (lastError && lastError.message.includes('403')) {
    return "⚠️ API Google non abilitata. Controlla la configurazione nel Google Cloud Console."
  }

  throw new Error("⚠️ Al momento non riesco ad accedere ai servizi AI.")
}

async function getGeminiResponse(apiKey, prompt, question, model) {
  const fullPrompt = `${prompt}\n\nDomanda utente: ${question}`
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=AIzaSyDG70wvOfP2e-qEX78wT9RGZ4kAGe0Q2r0`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: fullPrompt
          }]
        }],
        generationConfig: {
          temperature: 0.8,
          topP: 0.9,
          topK: 40,
          maxOutputTokens: 1000
        }
      })
    }
  )

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Errore API Gemini (${model}): ${response.status} - ${errorText}`)
  }

  const data = await response.json()
  
  if (!data.candidates || data.candidates.length === 0) {
    throw new Error(`Nessuna risposta ricevuta da ${model}`)
  }

  const answer = data.candidates[0]?.content?.parts?.[0]?.text?.trim()

  if (!answer) {
    throw new Error(`Risposta vuota da ${model}`)
  }

  return answer
}

handler.command = ['gemini']
handler.help = ['gemini (testo)']
handler.tags = ['strumenti', 'ia', 'iatesto']
handler.register = true

export default handler