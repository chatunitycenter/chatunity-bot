import googleTTS from 'node-gtts'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import fs from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
export async function textToSpeech(text, lang = 'it') {
    return new Promise((resolve, reject) => {
        try {
            const tts = new googleTTS(lang)
            const filePath = `${__dirname}/temp/${Date.now()}.mp3`
            const tempDir = `${__dirname}/temp`
            if (!fs.existsSync(tempDir)) {
                fs.mkdirSync(tempDir, { recursive: true })
            }
            tts.save(filePath, text, () => {
                const data = fs.readFileSync(filePath)
                fs.unlinkSync(filePath)
                resolve(data)
            })
        } catch (e) {
            reject(e)
        }
    })
}