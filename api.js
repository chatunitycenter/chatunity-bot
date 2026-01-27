/**
 * ============================================================================
 * API.JS - External API Configuration and Utilities
 * ============================================================================
 * 
 * This file provides configuration for external API services used by the bot.
 * It includes:
 *   - OpenAI configuration
 *   - Third-party API keys
 *   - API endpoint mappings
 *   - Global utility exports
 * 
 * @author ChatUnity Team
 * @version 1.0
 * ============================================================================
 */

// Node.js and third-party imports
import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone' 

// ============================================================================
// OPENAI CONFIGURATION
// ============================================================================

/** OpenAI API key for GPT features */
global.openai_key = 'sk-0'

/** OpenAI organization ID */
global.openai_org_id = 'org-3'

// ============================================================================
// API KEY POOLS
// ============================================================================

/**
 * Multiple API keys are used for load balancing and fallback.
 * Keys are randomly selected at runtime to distribute API usage.
 */

/** ZenAPI service keys */
global.keysZens = ['LuOlangNgentot', 'c2459db922', '37CC845916', '6fb0eff124', 'hdiiofficial', 'fiktod', 'BF39D349845E', '675e34de8a', '0b917b905e6f']
global.keysxxx = keysZens[Math.floor(keysZens.length * Math.random())]

/** XTeam API service keys */
global.keysxteammm = ['29d4b59a4aa687ca', '5LTV57azwaid7dXfz5fzJu', 'cb15ed422c71a2fb', '5bd33b276d41d6b4', 'HIRO', 'kurrxd09', 'ebb6251cc00f9c63']
global.keysxteam = keysxteammm[Math.floor(keysxteammm.length * Math.random())]

/** NeoXR API service keys */
global.keysneoxrrr = ['5VC9rvNx', 'cfALv5']
global.keysneoxr = keysneoxrrr[Math.floor(keysneoxrrr.length * Math.random())]

/** LOL Human API keys */
global.lolkeysapi = ['BrunoSobrino']

/** Rose API keys */
global.itsrose = ['4b146102c4d500809da9d1ff']

// ============================================================================
// API ENDPOINTS REGISTRY
// ============================================================================

/**
 * Maps friendly service names to their base URLs.
 * Use with global.API() function to construct full API URLs.
 */
global.APIs = { 
  xteam: 'https://api.xteam.xyz',
  dzx: 'https://api.dhamzxploit.my.id',
  lol: 'https://api.lolhuman.xyz',
  violetics: 'https://violetics.pw',
  neoxr: 'https://api.neoxr.my.id',
  zenzapis: 'https://api.zahwazein.xyz',
  akuari: 'https://api.akuari.my.id',
  akuari2: 'https://apimu.my.id',
  fgmods: 'https://api-fgmods.ddns.net',
  botcahx: 'https://api.botcahx.biz.id',
  ibeng: 'https://api.ibeng.tech/docs',
  rose: 'https://api.itsrose.site',
  popcat: 'https://api.popcat.xyz',
  xcoders: 'https://api-xcoders.site'
}

/**
 * Maps API base URLs to their corresponding authentication keys.
 * Used automatically by global.API() when apikeyqueryname is provided.
 */
global.APIKeys = { 
  'https://api.xteam.xyz': `${keysxteam}`,
  'https://api.lolhuman.xyz': '85faf717d0545d14074659ad',
  'https://api.neoxr.my.id': `${keysneoxr}`,
  'https://violetics.pw': 'beta',
  'https://api.zahwazein.xyz': `${keysxxx}`,
  'https://api-fgmods.ddns.net': 'fg-dylux',
  'https://api.botcahx.biz.id': 'Admin',
  'https://api.ibeng.tech/docs': 'tamvan',
  'https://api.itsrose.site': 'Rs-Zeltoria',
  'https://api-xcoders.site': 'Frieren'
}

// ============================================================================
// GLOBAL UTILITY EXPORTS
// ============================================================================

/**
 * Export commonly used libraries globally for plugin access.
 * This allows plugins to use these without importing.
 */
global.cheerio = cheerio    // HTML parsing library
global.fs = fs              // File system operations
global.fetch = fetch        // HTTP client
global.axios = axios        // HTTP client with more features
global.moment = moment      // Date/time handling

// ============================================================================
// RPG EMOTICON SYSTEM
// ============================================================================

/**
 * RPG utility object with emoticon mapping functionality.
 * Used for displaying appropriate emojis in RPG game features.
 * 
 * @note The emotttt mapping object should be defined elsewhere in the codebase.
 *       If not defined, the emoticon function will return empty string.
 */
global.rpg = {
  /**
   * Finds the emoticon associated with a string.
   * Matches against known emoticon patterns.
   * 
   * @param {string} string - Text to find emoticon for
   * @returns {string} Matching emoticon or empty string
   */
  emoticon(string) {
    // Safety check: ensure emotttt exists before using
    if (typeof emotttt === 'undefined') return ''
    
    string = string.toLowerCase()
    
    // Match string against emoticon patterns
    let results = Object.keys(emotttt).map(v => [v, new RegExp(v, 'gi')]).filter(v => v[1].test(string))
    
    if (!results.length) return ''
    return emotttt[results[0][0]]
  }
}

// ============================================================================
// HOT-RELOAD WATCHER
// ============================================================================

// Watch this file for changes and auto-reload
let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'api.js'"))
  import(`${file}?update=${Date.now()}`)
})
