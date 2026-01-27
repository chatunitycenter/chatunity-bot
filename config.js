/**
 * ============================================================================
 * CONFIG.JS - Bot Configuration and Settings
 * ============================================================================
 * 
 * This file contains the main configuration for the ChatUnity bot including:
 *   - Bot identity (name, version, watermark)
 *   - Owner and moderator definitions
 *   - API keys and endpoints
 *   - Visual customization settings
 * 
 * @author ChatUnity Team
 * @version 1.0
 * ============================================================================
 */

// Node.js core modules
import { watchFile, unwatchFile } from 'fs';
import chalk from 'chalk';
import fs from 'fs';
import { fileURLToPath } from 'url';

// ============================================================================
// BOT IDENTITY CONFIGURATION
// ============================================================================

/** Bot phone number (leave empty for auto-detection) */
global.botnumber = '';

/** Confirmation code for authentication */
global.confirmCode = '';

/** Display name for the bot */
global.nomebot = '𝐁𝐋𝐃-𝐁𝐋𝐎𝐎𝐃';

/** Sticker pack name */
global.packname = '𝐁𝐋𝐃-𝐁𝐋𝐎𝐎𝐃';

/** Sticker author name */
global.author = '𝐌𝐝';

/** Bot version */
global.vs = '1.0';

/** Collaborator tag */
global.collab = 'Demon Slayer';

/** Watermark (defaults to bot name) */
global.wm = global.nomebot;

/** Loading message shown during command processing */
global.wait = 'ⓘ 𝐂𝐚𝐫𝐢𝐜𝐚𝐦𝐞𝐧𝐭𝐨 ...';

// ============================================================================
// USER PERMISSION CONFIGURATION
// ============================================================================

/**
 * Owner list - Users with full bot control
 * Format: [phoneNumber, displayName, isMainOwner]
 */
global.owner = [
  ['212780803311', 'Blood', true],
  ['19782772696', 'Bot', true],
  ['xxxxxxxxxx'],
  ['xxxxxxxxxx'],
  ['xxxxxxxxxx'],
  ['xxxxxxxxxx']
];

/** Moderators - Users with elevated permissions */
global.mods = ['xxxxxxxxxx'];

/** Premium users - Users with premium feature access */
global.prems = ['xxxxxxxxxx', 'xxxxxxxxxx'];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Picks a random element from an array.
 * Used for API key rotation to distribute load.
 * 
 * @param {Array} arr - Array to pick from
 * @returns {*} Random element from array
 */
const pickRandom = arr => arr[Math.floor(Math.random() * arr.length)];

// ============================================================================
// API KEY POOLS
// ============================================================================

/** ZenAPI keys pool */
global.keysZens = ['c2459db922', '37CC845916', '6fb0eff124'];

/** XTeam API keys pool */
global.keysxteammm = ['29d4b59a4aa687ca', '5LTV57azwaid7dXfz5fzJu', 'cb15ed422c71a2fb', '5bd33b276d41d6b4', 'HIRO', 'kurrxd09', 'ebb6251cc00f9c63'];

/** NeoXR API keys pool */
global.keysneoxrrr = ['5VC9rvNx', 'cfALv5'];

/** LOL Human API keys pool */
global.lolkeysapi = ['BrunoSobrino'];

// Select random key from each pool for load balancing
global.keysxxx = pickRandom(global.keysZens);
global.keysxteam = pickRandom(global.keysxteammm);
global.keysneoxr = pickRandom(global.keysneoxrrr);

// ============================================================================
// API ENDPOINTS CONFIGURATION
// ============================================================================

/** API base URLs mapped by service name */
global.APIs = {
  xteam: 'https://api.xteam.xyz',
  nrtm: 'https://fg-nrtm-nhie.onrender.com',
  bg: 'http://bochil.ddns.net',
  fgmods: 'https://api-fgmods.ddns.net',
  dzx: 'https://api.dhamzxploit.my.id',
  lol: 'https://api.lolhuman.xyz',
  violetics: 'https://violetics.pw',
  neoxr: 'https://api.neoxr.my.id',
  zenzapis: 'https://zenzapis.xyz',
  akuari: 'https://api.akuari.my.id',
  akuari2: 'https://apimu.my.id'
};

/** API keys mapped by base URL */
global.APIKeys = {
  'https://api.xteam.xyz': global.keysxteam,
  'https://api.lolhuman.xyz': '85faf717d0545d14074659ad',
  'https://api.neoxr.my.id': global.keysneoxr,
  'https://violetics.pw': 'beta',
};

// ============================================================================
// GAME AND FEATURE SETTINGS
// ============================================================================

/** Experience points multiplier for leveling system */
global.multiplier = 69;

/** Maximum warnings before user is banned */
global.maxwarn = '4';

// ============================================================================
// FLAMING TEXT LOGO TEMPLATES
// ============================================================================

/** URLs for generating styled text logos via FlamingText API */
global.flaaa = [
  'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=water-logo&fontsize=100&scaleWidth=800&scaleHeight=500&fillTextColor=%23000&shadowGlowColor=%23000&backgroundColor=%23000&text=',
  'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=crafts-logo&fontsize=90&scaleWidth=800&scaleHeight=500&text=',
  'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=amped-logo&scaleWidth=800&scaleHeight=500&text=',
  'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&fontsize=100&fillTextType=1&fillTextPattern=Warning!&scaleWidth=800&scaleHeight=500&text=',
  'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&fontsize=100&fillTextType=1&fillTextPattern=Warning!&fillColor1Color=%23f2aa4c&fillOutlineColor=%23f2aa4c&backgroundColor=%23101820&scaleWidth=800&scaleHeight=500&text='
];

// ============================================================================
// HOT-RELOAD WATCHER
// ============================================================================

// Watch this file for changes and auto-reload
const file = fileURLToPath(import.meta.url);
watchFile(file, () => {
  unwatchFile(file);
  console.log(chalk.redBright("🔄 Config aggiornato: 'config.js'"));
  import(`${file}?update=${Date.now()}`);
});
