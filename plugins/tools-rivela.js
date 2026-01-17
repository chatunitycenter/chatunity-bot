import { downloadContentFromMessage } from '@whiskeysockets/baileys'

let handler = async (m, { conn }) => {
    try {
        if (!m.quoted) {
            throw '『 ⚠️ 』- `Rispondi a un contenuto visualizzabile una volta`'
        }
        if (!m.quoted?.viewOnce) {
            throw '『 ⚠️ 』- `Questo non è un contenuto visualizzabile una volta`'
        }

        const mtype = m.quoted.mtype
        let buffer
        const downloadFromStream = async (stream) => {
            let buffer = Buffer.from([])
            for await (const chunk of stream) {
                buffer = Buffer.concat([buffer, chunk])
            }
            return buffer
        }
        if (/videoMessage/.test(mtype)) {
            try {
                const stream = await downloadContentFromMessage(m.quoted.videoMessage, 'video')
                buffer = await downloadFromStream(stream)
            } catch (err) {
                console.warn('Fallback al metodo download() per video:', err.message)
                buffer = await m.quoted.download()
            }
        } else if (/imageMessage/.test(mtype)) {
            try {
                const stream = await downloadContentFromMessage(m.quoted.imageMessage, 'image')
                buffer = await downloadFromStream(stream)
            } catch (err) {
                console.warn('Fallback al metodo download() per immagine:', err.message)
                buffer = await m.quoted.download()
            }
        } else if (/audioMessage/.test(mtype)) {
            try {
                const stream = await downloadContentFromMessage(m.quoted.audioMessage, 'audio')
                buffer = await downloadFromStream(stream)
            } catch (err) {
                console.warn('Fallback al metodo download() per audio:', err.message)
                buffer = await m.quoted.download()
            }
        } else {
            throw '❌ Formato non supportato'
        }
        if (!buffer || buffer.length === 0) {
            throw '❌ Impossibile scaricare il contenuto'
        }

        const caption = m.quoted?.caption || ''
        if (/videoMessage/.test(mtype)) {
            await conn.sendFile(m.chat, buffer, 'video.mp4', caption, m)
        } else if (/imageMessage/.test(mtype)) {
            await conn.sendFile(m.chat, buffer, 'image.jpg', caption, m)
        } else if (/audioMessage/.test(mtype)) {
            await conn.sendFile(m.chat, buffer, 'audio.mp3', '', m, false, {
                mimetype: 'audio/mp4',
                ptt: m.quoted.ptt || false
            })
        }
        
    } catch (e) {
        console.error('Errore nel rivelare view once:', e)
        const errorMessage = typeof e === 'string' ? e : global.errore || '❌ Si è verificato un errore'
        await m.reply(errorMessage)
    }
}

handler.help = ['rivela']
handler.tags = ['strumenti']
handler.command = ['readviewonce', 'rivela', 'viewonce']
handler.group = true
handler.admin = true

export default handler