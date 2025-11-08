import fs from 'fs'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

class LanguageManager {
    constructor() {
        this.languages = {}
        this.defaultLanguage = 'it'
        this.userLanguages = new Map()
        this.groupLanguages = new Map()
        this.loadLanguages().catch(console.error)
    }

   
    async loadLanguages() {
        const languageDir = path.join(__dirname, 'idiomas')
        
        try {
            const files = fs.readdirSync(languageDir)
            
            for (const file of files) {
                if (file.endsWith('.js')) {
                    const fileName = file.replace('.js', '')
                    // Map file names to language codes
                    const langCode = fileName === 'italiano' ? 'it' : fileName === 'english' ? 'en' : fileName
                    
                    try {
                        const filePath = path.join(languageDir, file)
                        const fileUrl = pathToFileURL(filePath).href
                        const langModule = await import(fileUrl)
                        this.languages[langCode] = langModule.default || langModule
                    } catch (error) {
                        console.error(`Error loading language ${langCode}:`, error)
                    }
                }
            }
        } catch (error) {
            console.error('Error loading languages:', error)
        }
    }

    setUserLanguage(userId, language) {
        if (this.languages[language] || language === 'it' || language === 'en') {
            this.userLanguages.set(userId, language)
            return true
        }
        return false
    }

    setGroupLanguage(groupId, language) {
        if (this.languages[language]) {
            this.groupLanguages.set(groupId, language)
            return true
        }
        return false
    }

    getUserLanguage(userId, groupId = null) {
        if (this.userLanguages.has(userId)) {
            return this.userLanguages.get(userId)
        }
        
        if (groupId && this.groupLanguages.has(groupId)) {
            return this.groupLanguages.get(groupId)
        }
        
        return this.defaultLanguage
    }


    getText(key, userId, groupId = null, replacements = {}) {
        const language = this.getUserLanguage(userId, groupId)
        const langData = this.languages[language] || this.languages[this.defaultLanguage]
        

        if (!langData) {
            console.warn(`Language data not loaded for ${language}, using fallback`)
            return this.getFallbackText(key, replacements)
        }
        
        let text = langData[key]
        

        if (!text && language !== this.defaultLanguage) {
            text = this.languages[this.defaultLanguage]?.[key]
        }
        
  
        if (!text) {
            return this.getFallbackText(key, replacements)
        }
        

        if (typeof text === 'function') {
            text = text(replacements)
        }
        
        
        Object.keys(replacements).forEach(placeholder => {
            text = text.replace(new RegExp(`\\{${placeholder}\\}`, 'g'), replacements[placeholder])
        })
        
        return text
    }

    getFallbackText(key, replacements = {}) {
        const fallbacks = {
            helpMenu: `📋 *Menu Aiuto ChatUnity Bot*\n\n🤖 *Comandi AI:*\n• {prefix}ia <testo> - ChatGPT\n• {prefix}img <testo> - Genera immagini\n\n👥 *Comandi Gruppo:*\n• {prefix}benvenuto - Gestisci messaggi benvenuto\n• {prefix}antilink - Attiva/disattiva antilink\n\n🌍 *Lingua:*\n• {prefix}lingua <it/en> - Cambia lingua\n\n📞 *Supporto:*\n• {prefix}support - Contatta il supporto`,
            smsWait: '⏳ Caricamento...',
            smsError: '❌ Si è verificato un errore',
            smsSuccess: '✅ Operazione completata con successo',
            invalidLanguage: '❌ Lingua non valida. Usa "it" per italiano o "en" per inglese.',
            languageChanged: '🌍 Lingua cambiata con successo!',
            languageHelp: '🌍 *Gestione Lingua*\n\n*Lingue disponibili:*\n• 🇮🇹 Italiano (it)\n• 🇺🇸 English (en)\n\n*Uso:*\n{prefix}lingua it - Imposta italiano\n{prefix}lingua en - Imposta inglese',
            currentLanguage: '🌍 Lingua attuale: Italiano 🇮🇹'
        }
        
        let text = fallbacks[key] || key
        
        Object.keys(replacements).forEach(placeholder => {
            text = text.replace(new RegExp(`\\{${placeholder}\\}`, 'g'), replacements[placeholder])
        })
        
        return text
    }

    getAvailableLanguages() {
        return Object.keys(this.languages)
    }

    saveToDatabase() {
        if (global.db && global.db.data) {
            if (!global.db.data.settings) global.db.data.settings = {}
            global.db.data.settings.userLanguages = Object.fromEntries(this.userLanguages)
            global.db.data.settings.groupLanguages = Object.fromEntries(this.groupLanguages)
        }
    }

    loadFromDatabase() {
        if (global.db && global.db.data && global.db.data.settings) {
            if (global.db.data.settings.userLanguages) {
                this.userLanguages = new Map(Object.entries(global.db.data.settings.userLanguages))
            }
            if (global.db.data.settings.groupLanguages) {
                this.groupLanguages = new Map(Object.entries(global.db.data.settings.groupLanguages))
            }
        }
    }
}

global.languageManager = new LanguageManager()

global.t = (key, userId, groupId = null, replacements = {}) => {
    return global.languageManager.getText(key, userId, groupId, replacements)
}

export default global.languageManager
