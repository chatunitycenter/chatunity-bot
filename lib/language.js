import fs from 'fs'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Language system for ChatUnity Bot
class LanguageManager {
    constructor() {
        this.languages = {}
        this.defaultLanguage = 'it'
        this.userLanguages = new Map()
        this.groupLanguages = new Map()
        this.loadLanguages().catch(console.error)
    }

    // Load all language files
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
                        console.log(`Loaded language: ${langCode} from ${file}`)
                    } catch (error) {
                        console.error(`Error loading language ${langCode}:`, error)
                    }
                }
            }
        } catch (error) {
            console.error('Error loading languages:', error)
        }
    }

    // Set user language preference
    setUserLanguage(userId, language) {
        if (this.languages[language] || language === 'it' || language === 'en') {
            this.userLanguages.set(userId, language)
            return true
        }
        return false
    }

    // Set group language preference
    setGroupLanguage(groupId, language) {
        if (this.languages[language]) {
            this.groupLanguages.set(groupId, language)
            return true
        }
        return false
    }

    // Get user's preferred language
    getUserLanguage(userId, groupId = null) {
        // Priority: User preference > Group preference > Default
        if (this.userLanguages.has(userId)) {
            return this.userLanguages.get(userId)
        }
        
        if (groupId && this.groupLanguages.has(groupId)) {
            return this.groupLanguages.get(groupId)
        }
        
        return this.defaultLanguage
    }

    // Get translated text
    getText(key, userId, groupId = null, replacements = {}) {
        const language = this.getUserLanguage(userId, groupId)
        const langData = this.languages[language] || this.languages[this.defaultLanguage]
        
        // Handle case where language data is not loaded yet
        if (!langData) {
            console.warn(`Language data not loaded for ${language}, using fallback`)
            return this.getFallbackText(key, replacements)
        }
        
        let text = langData[key]
        
        // If key not found in current language, try default language
        if (!text && language !== this.defaultLanguage) {
            text = this.languages[this.defaultLanguage]?.[key]
        }
        
        // If still not found, use fallback
        if (!text) {
            return this.getFallbackText(key, replacements)
        }
        
        // Handle function-based translations
        if (typeof text === 'function') {
            text = text(replacements)
        }
        
        // Replace placeholders
        Object.keys(replacements).forEach(placeholder => {
            text = text.replace(new RegExp(`\\{${placeholder}\\}`, 'g'), replacements[placeholder])
        })
        
        return text
    }

    // Fallback text for when language data isn't loaded
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
        
        // Replace placeholders
        Object.keys(replacements).forEach(placeholder => {
            text = text.replace(new RegExp(`\\{${placeholder}\\}`, 'g'), replacements[placeholder])
        })
        
        return text
    }

    // Get available languages
    getAvailableLanguages() {
        return Object.keys(this.languages)
    }

    // Save language preferences to database
    saveToDatabase() {
        if (global.db && global.db.data) {
            if (!global.db.data.settings) global.db.data.settings = {}
            global.db.data.settings.userLanguages = Object.fromEntries(this.userLanguages)
            global.db.data.settings.groupLanguages = Object.fromEntries(this.groupLanguages)
        }
    }

    // Load language preferences from database
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

// Create global language manager instance
global.languageManager = new LanguageManager()

// Helper function for easy translation access
global.t = (key, userId, groupId = null, replacements = {}) => {
    return global.languageManager.getText(key, userId, groupId, replacements)
}

export default global.languageManager
