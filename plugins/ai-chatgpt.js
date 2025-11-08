import axios from 'axios'

let handler = m => m
handler.all = async function (m, {conn}) {
    let user = global.db.data.users[m.sender]
    let chat = global.db.data.chats[m.chat]
    m.isBot = m.id.startsWith('BAE5') && m.id.length === 16 || 
              m.id.startsWith('3EB0') && m.id.length === 12 || 
              m.id.startsWith('3EB0') && (m.id.length === 20 || m.id.length === 22) || 
              m.id.startsWith('B24E') && m.id.length === 20;
    
    if (m.isBot) return
    let prefixRegex = new RegExp('^[' + (opts['prefix'] || '‎z/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.,\\-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']')
    if (prefixRegex.test(m.text)) return true;
    if (m.isBot) {
        return true
    }

    if (m.mtype === 'buttonsResponseMessage' || m.mtype === 'templateButtonReplyMessage' || m.mtype === 'listResponseMessage') {
        return true;
    }

    if (m.message && (
        m.message.buttonsResponseMessage ||
        m.message.templateButtonReplyMessage ||
        m.message.listResponseMessage ||
        m.message.interactiveResponseMessage
    )) {
        return true;
    }

    if ((m.mentionedJid.includes(this.user.jid) || (m.quoted && m.quoted.sender === this.user.jid)) && !chat.isBanned) {
        if (m.text.includes('SASSO') || m.text.includes('CARTA') || m.text.includes('FORBICI')) return true
        async function geminiFlash(query, context = '') {
            try {
                const apiKey = global.APIKeys.google;
                if (!apiKey) {
                    throw new Error('API Key Google non configurata');
                }
                
                const systemPrompt = `Sei varebot, un assistente WhatsApp intelligente e amichevole, creato da sam.
Regole fondamentali per le tue risposte:
1. Mantieni le risposte brevi e concise (max 3-4 frasi)
2. Adatta il tono in base al contesto:
   - Formale per domande serie
   - Leggero per conversazioni casual
   - Ironico solo quando appropriato
3. Dai priorità alle informazioni utili
4. Usa un linguaggio semplice e diretto
5. Rispondi sempre in italiano
${context ? `\n\nContesto del messaggio quotato: ${context}` : ''}`;

                const fullQuery = `${systemPrompt}\n\nUtente: ${query}`;
                
                const response = await axios.post(
                    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`,
                    {
                        contents: [{
                            parts: [{
                                text: fullQuery
                            }]
                        }],
                        generationConfig: {
                            temperature: 0.7,
                            topK: 40,
                            topP: 0.95,
                            maxOutputTokens: 512,
                            candidateCount: 1
                        },
                        safetySettings: [
                            {
                                category: "HARM_CATEGORY_HARASSMENT",
                                threshold: "BLOCK_MEDIUM_AND_ABOVE"
                            },
                            {
                                category: "HARM_CATEGORY_HATE_SPEECH",
                                threshold: "BLOCK_MEDIUM_AND_ABOVE"
                            },
                            {
                                category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                                threshold: "BLOCK_MEDIUM_AND_ABOVE"
                            },
                            {
                                category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                                threshold: "BLOCK_MEDIUM_AND_ABOVE"
                            }
                        ]
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        timeout: 30000 // 30 secondi timeout
                    }
                );
                
                if (response.data && response.data.candidates && response.data.candidates.length > 0) {
                    const candidate = response.data.candidates[0];
                    if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
                        return candidate.content.parts[0].text.trim();
                    }
                }
                
                return null;
            } catch (error) {
                return null;
            }
        }
        
        // API AI alternativa: fallback con una API più semplice
        async function fallbackAI(query, context = '') {
            try {
                const response = await axios.post('https://api.deepai.org/api/text-generator', 
                    `text=${encodeURIComponent(`Come varebot, rispondi in italiano in modo conciso: ${context ? context + '\n\n' : ''}${query}`)}`, 
                    {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        timeout: 15000
                    }
                );
                
                return response.data.output || null;
            } catch (error) {
                return null;
            }
        }
        function getQuotedContext(quoted) {
            if (!quoted) return '';
            
            let context = '';
            if (quoted.text) {
                context = `Messaggio quotato: "${quoted.text}"`;
            } else if (quoted.caption) {
                context = `Didascalia quotata: "${quoted.caption}"`;
            } else if (quoted.mediaType) {
                context = `Tipo di media quotato: ${quoted.mediaType}`;
            }
            
            return context;
        }
        
        if (chat.autoresponder) {
            if (m.fromMe) return
            if (!user.registered) return
            await this.sendPresenceUpdate('composing', m.chat)
            let query = m.text
            let username = m.pushName
            let quotedContext = getQuotedContext(m.quoted)
            let result = null;
            result = await geminiFlash(query, quotedContext);
            if (!result || result.trim().length === 0) {
                result = await fallbackAI(query, quotedContext);
            }
            if (!result || result.trim().length === 0) {
                result = "Scusa, al momento non riesco a rispondere. Riprova tra poco!";
            }
            if (result.length > 3000) {
                result = result.substring(0, 3000) + '...';
            }
            
            await this.reply(m.chat, result, m);
        }
    }
    
    return true;
}

export default handler