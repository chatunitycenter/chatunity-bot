/**
 * ============================================================================
 * MAIN.JS - ChatUnity WhatsApp Bot Entry Point
 * ============================================================================
 * 
 * This is the main entry point for the ChatUnity WhatsApp bot.
 * It handles:
 *   - WhatsApp connection and authentication
 *   - Session management and cleanup
 *   - Plugin loading and hot-reloading
 *   - Sub-bot connections for multiple accounts
 *   - Database initialization
 * 
 * @author ChatUnity Team
 * @version 8.0
 * ============================================================================
 */

// Enable TLS certificate verification for secure connections
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '1';

// ============================================================================
// MODULE IMPORTS
// ============================================================================

// Import global configuration (must be loaded first)
import './config.js';

// Node.js core modules
import { createRequire } from 'module';
import path, { join } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { platform } from 'process';
import fs, { readdirSync, statSync, unlinkSync, existsSync, mkdirSync, rmSync, watch } from 'fs';
import { tmpdir } from 'os';
import { format } from 'util';
import { spawn } from 'child_process';
import readline from 'readline';

// Third-party modules
import yargs from 'yargs';
import lodash from 'lodash';
import chalk from 'chalk';
import syntaxerror from 'syntax-error';
import pino from 'pino';
import { Low, JSONFile } from 'lowdb';
import NodeCache from 'node-cache';

// Custom modules
import { makeWASocket, protoType, serialize } from './lib/simple.js';


// ============================================================================
// DIRECTORY CONFIGURATION
// ============================================================================

/** Directory for storing WhatsApp session files */
const sessionFolder = path.join(process.cwd(), global.authFile || 'sessioni');

/** Directory for temporary files that are periodically cleaned */
const tempDir = join(process.cwd(), 'temp');
const tmpDir = join(process.cwd(), 'tmp');

// Ensure required directories exist
if (!existsSync(tempDir)) {
  mkdirSync(tempDir, { recursive: true });
}
if (!existsSync(tmpDir)) {
  mkdirSync(tmpDir, { recursive: true });
}


// ============================================================================
// SESSION CLEANUP FUNCTIONS
// ============================================================================

/**
 * Clears non-critical files from the session folder.
 * Preserves `creds.json` and files starting with `pre-key` to maintain session integrity.
 * This function is called periodically to prevent session file accumulation.
 * 
 * @param {string} dir - Directory path to clean (defaults to sessionFolder)
 */
function clearSessionFolderSelective(dir = sessionFolder) {
  // Create directory if it doesn't exist
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    return;
  }
  
  const entries = fs.readdirSync(dir);
  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    
    // Always preserve credentials file
    if (entry === 'creds.json') continue;
    
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      // Recursively clean subdirectories
      clearSessionFolderSelective(fullPath);
      fs.rmdirSync(fullPath);
    } else {
      // Preserve pre-key files, delete everything else
      if (!entry.startsWith('pre-key')) {
        try {
          fs.unlinkSync(fullPath);
        } catch {
          // Silently ignore deletion errors
        }
      }
    }
  }
  
  console.log(`Cartella sessioni pulita (file non critici rimossi): ${new Date().toLocaleTimeString()}`);
}

/**
 * Purges session files based on age and type.
 * Removes old pre-key files (older than 1 day) and non-essential session files.
 * 
 * @param {string} sessionDir - Path to the session directory
 * @param {boolean} cleanPreKeys - Whether to also clean old pre-key files
 */
function purgeSession(sessionDir, cleanPreKeys = false) {
  if (!existsSync(sessionDir)) return;
  
  const files = readdirSync(sessionDir);
  
  files.forEach(file => {
    // Never delete credentials
    if (file === 'creds.json') return;
    
    const filePath = path.join(sessionDir, file);
    const stats = statSync(filePath);
    
    // Calculate file age in days
    const fileAgeDays = (Date.now() - stats.mtimeMs) / (1000 * 60 * 60 * 24);
    
    if (file.startsWith('pre-key') && cleanPreKeys) {
      // Only delete old pre-key files when explicitly requested
      if (fileAgeDays > 1) {
        try {
          unlinkSync(filePath);
        } catch {
          // Silently ignore errors
        }
      }
    } else if (!file.startsWith('pre-key')) {
      // Remove all non-pre-key files
      try {
        if (stats.isDirectory()) {
          rmSync(filePath, { recursive: true, force: true });
        } else {
          unlinkSync(filePath);
        }
      } catch {
        // Silently ignore errors
      }
    }
  });
}


// ============================================================================
// SCHEDULED CLEANUP INTERVALS
// ============================================================================

/**
 * Session cleanup scheduler - runs every 30 minutes
 * Clears non-critical session files to prevent disk space issues
 */
setInterval(async () => {
  if (stopped === 'close' || !conn || !conn.user) return;
  clearSessionFolderSelective();
}, 30 * 60 * 1000);

/**
 * Session purge scheduler - runs every 20 minutes
 * Purges session files for main bot and all sub-bots
 */
setInterval(async () => {
  if (stopped === 'close' || !conn || !conn.user) return;
  
  // Purge main bot session
  purgeSession(`./sessioni`);
  
  // Purge all sub-bot sessions
  const subBotDir = `./${global.authFileJB}`;
  if (existsSync(subBotDir)) {
    const subBotFolders = readdirSync(subBotDir).filter(file => 
      statSync(join(subBotDir, file)).isDirectory()
    );
    subBotFolders.forEach(folder => purgeSession(join(subBotDir, folder)));
  }
}, 20 * 60 * 1000);

/**
 * Deep cleanup scheduler - runs every 3 hours
 * Performs aggressive cleanup including old pre-key files
 */
setInterval(async () => {
  if (stopped === 'close' || !conn || !conn.user) return;
  
  // Deep purge main bot session
  purgeSession(`./${global.authFile}`, true);
  
  // Deep purge all sub-bot sessions
  const subBotDir = `./${global.authFileJB}`;
  if (existsSync(subBotDir)) {
    const subBotFolders = readdirSync(subBotDir).filter(file => 
      statSync(join(subBotDir, file)).isDirectory()
    );
    subBotFolders.forEach(folder => purgeSession(join(subBotDir, folder), true));
  }
}, 3 * 60 * 60 * 1000);


// ============================================================================
// BAILEYS LIBRARY IMPORTS
// ============================================================================

const { 
  useMultiFileAuthState, 
  fetchLatestBaileysVersion, 
  makeCacheableSignalKeyStore, 
  Browsers, 
  jidNormalizedUser, 
  makeInMemoryStore, 
  DisconnectReason 
} = await import('@whiskeysockets/baileys');

const { chain } = lodash;

// Server port configuration with fallbacks
const PORT = process.env.PORT || process.env.SERVER_PORT || 3000;

// Initialize prototype extensions for WhatsApp message handling
protoType();
serialize();

// ============================================================================
// GLOBAL STATE FLAGS
// ============================================================================

/** Flag to prevent duplicate logo printing */
global.isLogoPrinted = false;

/** Flag to track if QR code has been generated */
global.qrGenerated = false;

/** Track which connection messages have been printed to avoid spam */
global.connectionMessagesPrinted = {};

// ============================================================================
// AUTHENTICATION METHOD CONFIGURATION
// ============================================================================

/** Use QR code authentication method */
let methodCodeQR = process.argv.includes("qr");

/** Use 8-character pairing code authentication */
let methodCode = process.argv.includes("code");

/** Use mobile-based authentication */
let MethodMobile = process.argv.includes("mobile");

/** Phone number for pairing code method */
let phoneNumber = global.botNumberCode;


// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Generates a random alphanumeric code for pairing.
 * Used when authenticating via 8-character pairing code method.
 * 
 * @param {number} length - Length of the code to generate (default: 8)
 * @returns {string} Random alphanumeric code
 */
function generateRandomCode(length = 8) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Redefines console methods to filter out specific log messages.
 * Used to suppress noisy or sensitive log output from the WhatsApp library.
 * 
 * @param {string} methodName - Console method to override (log, warn, error)
 * @param {string[]} filterStrings - Base64-encoded strings to filter out
 */
function redefineConsoleMethod(methodName, filterStrings) {
  const originalConsoleMethod = console[methodName];
  console[methodName] = function () {
    const message = arguments[0];
    // Check if message contains any filtered string (decoded from base64)
    if (typeof message === 'string' && filterStrings.some(filterString => message.includes(atob(filterString)))) {
      arguments[0] = "";
    }
    originalConsoleMethod.apply(console, arguments);
  };
}


// ============================================================================
// GLOBAL PATH UTILITIES
// ============================================================================

/**
 * Converts a URL to a file path.
 * Handles both file:// URLs and regular paths across platforms.
 * 
 * @param {string} pathURL - URL or path to convert
 * @param {boolean} rmPrefix - Whether to remove the file:// prefix
 * @returns {string} Converted file path
 */
global.__filename = function filename(pathURL = import.meta.url, rmPrefix = platform !== 'win32') {
  return rmPrefix 
    ? /file:\/\/\//.test(pathURL) ? fileURLToPath(pathURL) : pathURL 
    : pathToFileURL(pathURL).toString();
};

/**
 * Gets the directory name from a URL or path.
 * 
 * @param {string} pathURL - URL or path to get directory from
 * @returns {string} Directory path
 */
global.__dirname = function dirname(pathURL) {
  return path.dirname(global.__filename(pathURL, true));
};

/**
 * Creates a require function for ES modules compatibility.
 * Allows importing CommonJS modules in ES module context.
 * 
 * @param {string} dir - Base URL for require resolution
 * @returns {Function} Require function
 */
global.__require = function require(dir = import.meta.url) {
  return createRequire(dir);
};


// ============================================================================
// API AND DATABASE CONFIGURATION
// ============================================================================

/**
 * Constructs an API URL with query parameters and optional API key.
 * 
 * @param {string} name - API name (key in global.APIs) or base URL
 * @param {string} path - API endpoint path
 * @param {Object} query - Query parameters object
 * @param {string} apikeyqueryname - Parameter name for API key injection
 * @returns {string} Complete API URL
 */
global.API = (name, path = '/', query = {}, apikeyqueryname) => {
  const baseUrl = name in global.APIs ? global.APIs[name] : name;
  const queryString = query || apikeyqueryname 
    ? '?' + new URLSearchParams(Object.entries({ 
        ...query, 
        ...(apikeyqueryname ? { [apikeyqueryname]: global.APIKeys[baseUrl] } : {}) 
      })) 
    : '';
  return baseUrl + path + queryString;
};

/** Bot startup timestamp */
global.timestamp = { start: new Date };

// Current directory for module resolution
const __dirname = global.__dirname(import.meta.url);

// Parse command line arguments
global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse());

// Configure command prefix pattern (supports multiple special characters)
global.prefix = new RegExp('^[' + (opts['prefix'] || '*/!#$%+£¢€¥^°=¶∆×÷π√✓©®&.\\-.@').replace(/[|\\{}()[\]^$+*.\-\^]/g, '\\$&') + ']');

// Initialize database with lowdb (supports both local JSON and cloud storage)
global.db = new Low(/https?:\/\//.test(opts['db'] || '') ? new cloudDBAdapter(opts['db']) : new JSONFile('database.json'));
global.DATABASE = global.db;

/**
 * Loads the database and ensures it has required structure.
 * Handles concurrent read prevention and initializes default data structures.
 * 
 * @returns {Promise<Object>} Database data object
 */
global.loadDatabase = async function loadDatabase() {
  // Prevent concurrent database reads
  if (global.db.READ) {
    return new Promise((resolve) => setInterval(async function () {
      if (!global.db.READ) {
        clearInterval(this);
        resolve(global.db.data == null ? global.loadDatabase() : global.db.data);
      }
    }, 1 * 1000));
  }
  
  // Skip if data already loaded
  if (global.db.data !== null) return;
  
  // Mark as reading to prevent concurrent access
  global.db.READ = true;
  await global.db.read().catch(console.error);
  global.db.READ = null;
  
  // Initialize default data structure
  global.db.data = {
    users: {},      // User profiles and stats
    chats: {},      // Chat/group settings
    stats: {},      // Command usage statistics
    msgs: {},       // Message store
    sticker: {},    // Sticker metadata
    settings: {},   // Bot settings
    ...(global.db.data || {}),
  };
  
  // Enable lodash chain for data manipulation
  global.db.chain = chain(global.db.data);
};

// Load database on startup
loadDatabase();


// ============================================================================
// CONNECTION ARRAY INITIALIZATION
// ============================================================================

// Initialize connections array if not already present
if (global.conns instanceof Array) {
  console.log('Connessioni già inizializzate...');
} else {
  global.conns = [];
}

// ============================================================================
// AUTHENTICATION FILE PATHS
// ============================================================================

/** Path to credentials file */
global.creds = 'creds.json';

/** Main bot session directory */
global.authFile = 'sessioni';

/** Sub-bot sessions directory */
global.authFileJB = 'chatunity-sub';

// ============================================================================
// AUTHENTICATION STATE SETUP
// ============================================================================

// Initialize multi-file authentication state
const { state, saveCreds } = await useMultiFileAuthState(global.authFile);

// Message retry counter (unused but required by Baileys)
const msgRetryCounterMap = (MessageRetryMap) => { };

// Cache for message retry counts
const msgRetryCounterCache = new NodeCache();

// Fetch latest Baileys version for compatibility
const { version } = await fetchLatestBaileysVersion();

// Setup readline interface for user input
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true,
});


/**
 * Prompts the user with a question and returns their response.
 * Clears the line before and after input for clean display.
 * 
 * @param {string} t - Question text to display
 * @returns {Promise<string>} User's trimmed response
 */
const question = (t) => {
  rl.clearLine(rl.input, 0);
  return new Promise((resolver) => {
    rl.question(t, (r) => {
      rl.clearLine(rl.input, 0);
      resolver(r.trim());
    });
  });
};

// ============================================================================
// AUTHENTICATION METHOD SELECTION
// ============================================================================

let opzione;

// Only prompt for connection method if no credentials exist
if (!methodCodeQR && !methodCode && !fs.existsSync(`./${authFile}/creds.json`)) {
  do {
    const menu = `╭★────★────★────★────★────★
│      ꒰ ¡METODO DI COLLEGAMENTO! ꒱
│
│  👾  Opzione 1: Codice QR
│  ☁️  Opzione 2: Codice 8 caratteri
│
╰★────★────★────★────★
               ꒷꒦ ✦ ChatUnity ✦ ꒷꒦
╰♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩﹐
`;
    opzione = await question(menu + '\nInserisci la tua scelta ---> ');
    if (!/^[1-2]$/.test(opzione)) {
      console.log('Opzione non valida, inserisci 1 o 2');
    }
  } while ((opzione !== '1' && opzione !== '2') || fs.existsSync(`./${authFile}/creds.json`));
}


// ============================================================================
// CONSOLE OUTPUT FILTERING
// ============================================================================

// Base64-encoded strings to filter from console output
// These represent noisy/sensitive messages from the WhatsApp library
const filterStrings = [
  "Q2xvc2luZyBzdGFsZSBvcGVu",      // "Closing stale open"
  "Q2xvc2luZyBvcGVuIHNlc3Npb24=",  // "Closing open session"
  "RmFpbGVkIHRvIGRlY3J5cHQ=",      // "Failed to decrypt"
  "U2Vzc2lvbiBlcnJvcg==",          // "Session error"
  "RXJyb3I6IEJhZCBNQUM=",          // "Error: Bad MAC"
  "RGVjcnlwdGVkIG1lc3NhZ2U="       // "Decrypted message"
];

// Suppress info and debug logs
console.info = () => { };
console.debug = () => { };

// Apply message filtering to log, warn, and error
['log', 'warn', 'error'].forEach(methodName => redefineConsoleMethod(methodName, filterStrings));

// ============================================================================
// CACHING CONFIGURATION
// ============================================================================

/**
 * Group metadata cache to reduce API calls.
 * TTL: 5 minutes, cleanup every 60 seconds, max 500 entries
 */
const groupMetadataCache = new NodeCache({ stdTTL: 300, checkperiod: 60, maxKeys: 500 });
global.groupCache = groupMetadataCache;

// ============================================================================
// LOGGING CONFIGURATION
// ============================================================================

/**
 * Pino logger with silent level and sensitive data redaction.
 * Censors credentials, auth tokens, media URLs, and secrets.
 */
const logger = pino({
  level: 'silent',
  redact: {
    paths: [
      'creds.*',
      'auth.*',
      'account.*',
      'media.*.directPath',
      'media.*.url',
      'node.content[*].enc',
      'password',
      'token',
      '*.secret'
    ],
    censor: '***'
  },
  timestamp: () => `,"time":"${new Date().toJSON()}"`
});

// ============================================================================
// JID AND MESSAGE STORE
// ============================================================================

/**
 * JID (WhatsApp ID) cache for fast lookups.
 * TTL: 10 minutes, no cloning for performance, max 1000 entries
 */
global.jidCache = new NodeCache({ stdTTL: 600, useClones: false, maxKeys: 1000 });

/** In-memory message store for message retrieval */
global.store = makeInMemoryStore({ logger });


// ============================================================================
// WHATSAPP CONNECTION OPTIONS
// ============================================================================

/**
 * WhatsApp socket connection configuration.
 * Includes authentication, caching, message handling, and timeouts.
 */
const connectionOptions = {
  logger: logger,
  
  // Print QR code in terminal if using QR method
  printQRInTerminal: opzione === '1' || methodCodeQR,
  
  // Mobile authentication flag
  mobile: MethodMobile,
  
  // Authentication state with cacheable signal keys
  auth: {
    creds: state.creds,
    keys: makeCacheableSignalKeyStore(state.keys, logger),
  },
  
  // Browser identification based on auth method
  browser: opzione === '1' ? Browsers.windows('Chrome') : methodCodeQR ? Browsers.windows('Chrome') : Browsers.macOS('Safari'),
  
  // Baileys version for compatibility
  version: version,
  
  // Don't mark as online on connect (stealth mode)
  markOnlineOnConnect: false,
  
  // Enable high-quality link previews
  generateHighQualityLinkPreview: true,
  
  // Disable full history sync for performance
  syncFullHistory: false,
  
  // Link preview thumbnail dimensions
  linkPreviewImageThumbnailWidth: 192,
  
  /**
   * Retrieves a message from the store for retry/quote operations.
   * @param {Object} key - Message key with remoteJid and id
   * @returns {Promise<Object|undefined>} Message content or undefined
   */
  getMessage: async (key) => {
    try {
      const jid = global.conn.decodeJid(key.remoteJid);
      const msg = await global.store.loadMessage(jid, key.id);
      return msg?.message || undefined;
    } catch (error) {
      return undefined;
    }
  },
  
  // Timeout configurations (in milliseconds)
  defaultQueryTimeoutMs: 60000,   // 60 seconds for queries
  connectTimeoutMs: 60000,         // 60 seconds for initial connection
  keepAliveIntervalMs: 30000,      // 30 seconds keep-alive ping
  
  // Event emission settings
  emitOwnEvents: true,             // Emit events for own messages
  fireInitQueries: true,           // Fire initial queries on connect
  
  // Transaction retry settings
  transactionOpts: {
    maxCommitRetries: 10,
    delayBetweenTriesMs: 3000
  },
  
  /**
   * Retrieves cached group metadata or fetches fresh data.
   * Uses NodeCache for performance optimization.
   * 
   * @param {string} jid - Group JID
   * @returns {Promise<Object>} Group metadata
   */
  cachedGroupMetadata: async (jid) => {
    const cached = global.groupCache.get(jid);
    if (cached) return cached;
    
    try {
      const metadata = await global.conn.groupMetadata(global.conn.decodeJid(jid));
      global.groupCache.set(jid, metadata);
      return metadata;
    } catch (err) {
      return {};
    }
  },
  
  /**
   * Decodes and normalizes a WhatsApp JID.
   * Handles LID (linked device ID) conversion and caching.
   * 
   * @param {string} jid - JID to decode
   * @returns {string|null} Normalized JID
   */
  decodeJid: (jid) => {
    if (!jid) return jid;
    
    // Check cache first
    const cached = global.jidCache.get(jid);
    if (cached) return cached;

    let decoded = jid;
    
    // Normalize JIDs with port numbers
    if (/:\d+@/gi.test(jid)) {
      decoded = jidNormalizedUser(jid);
    }
    
    // Convert object format to string
    if (typeof decoded === 'object' && decoded.user && decoded.server) {
      decoded = `${decoded.user}@${decoded.server}`;
    }
    
    // Convert LID format to standard format
    if (typeof decoded === 'string' && decoded.endsWith('@lid')) {
      decoded = decoded.replace('@lid', '@s.whatsapp.net');
    }

    // Cache and return
    global.jidCache.set(jid, decoded);
    return decoded;
  },
  
  // Message retry handling
  msgRetryCounterCache,
  msgRetryCounterMap,
  retryRequestDelayMs: 250,
  maxMsgRetryCount: 3,
  
  // Don't ignore any JIDs
  shouldIgnoreJid: jid => false,
  
  /**
   * Patches interactive messages (buttons, lists) for compatibility.
   * Wraps them in viewOnceMessage format to work around restrictions.
   * 
   * @param {Object} message - Message to patch
   * @returns {Object} Patched message
   */
  patchMessageBeforeSending: (message) => {
    const requiresPatch = !!(
      message.buttonsMessage ||
      message.templateMessage ||
      message.listMessage
    );
    
    if (requiresPatch) {
      message = {
        viewOnceMessage: {
          message: {
            messageContextInfo: {
              deviceListMetadata: {},
              deviceListMetadataVersion: 2
            },
            ...message
          }
        }
      };
    }
    
    return message;
  }
};


// ============================================================================
// WHATSAPP SOCKET INITIALIZATION
// ============================================================================

// Create main WhatsApp socket connection
global.conn = makeWASocket(connectionOptions);

// Bind message store to connection events
global.store.bind(global.conn.ev);

// ============================================================================
// PAIRING CODE AUTHENTICATION
// ============================================================================

// Handle pairing code authentication if no credentials exist
if (!fs.existsSync(`./${authFile}/creds.json`)) {
  if (opzione === '2' || methodCode) {
    opzione = '2';
    
    if (!conn.authState.creds.registered) {
      let addNumber;
      
      if (phoneNumber) {
        // Use pre-configured phone number
        addNumber = phoneNumber.replace(/[^0-9]/g, '');
      } else {
        // Prompt for phone number
        phoneNumber = await question(chalk.bgBlack(chalk.bold.bgMagentaBright(`Inserisci il numero di WhatsApp.\n${chalk.bold.yellowBright("Esempio: +393471234567")}\n${chalk.bold.magenta('PS: è normale che appare il qrcode incollate comunque il numero')}`)));
        addNumber = phoneNumber.replace(/\D/g, '');
        if (!phoneNumber.startsWith('+')) phoneNumber = `+${phoneNumber}`;
        rl.close();
      }
      
      // Request pairing code after 3 second delay
      setTimeout(async () => {
        const randomCode = generateRandomCode();
        let codeBot = await conn.requestPairingCode(addNumber, randomCode);
        
        // Format code with dashes for readability
        codeBot = codeBot?.match(/.{1,4}/g)?.join("-") || codeBot;
        codeBot = codeBot.toUpperCase();
        
        console.log(chalk.bold.white(chalk.bgBlueBright('꒰🩸꒱ ◦•≫ CODICE DI COLLEGAMENTO:')), chalk.bold.white(chalk.white(codeBot)));
      }, 3000);
    }
  }
}

// ============================================================================
// CONNECTION STATE FLAGS
// ============================================================================

/** Flag indicating if connection is initialized */
conn.isInit = false;

/** Flag indicating if bot is ready */
conn.well = false;

// ============================================================================
// CHANNEL SUBSCRIPTION
// ============================================================================

/**
 * Subscribes the bot to the main ChatUnity channel.
 * Called on successful connection.
 */
async function chatunityedition() {
  try {
    const mainChannelId = global.IdCanale?.[0] || '120363259442839354@newsletter';
    await global.conn.newsletterFollow(mainChannelId);
  } catch (error) {
    // Silently ignore subscription errors
  }
}


// ============================================================================
// DATABASE PERSISTENCE AND AUTO-CLEANUP
// ============================================================================

// Periodic database write and temp file cleanup (every 30 seconds)
if (!opts['test']) {
  if (global.db) setInterval(async () => {
    // Save database to disk
    if (global.db.data) await global.db.write();
    
    // Auto-cleanup temp directories if feature is enabled
    if (opts['autocleartmp'] && (global.support || {}).find) {
      const tmp = [tmpdir(), 'tmp', "chatunity-sub"];
      tmp.forEach(filename => spawn('find', [filename, '-amin', '2', '-type', 'f', '-delete']));
    }
  }, 30 * 1000);
}

// Start HTTP server if server option is enabled
if (opts['server']) (await import('./server.js')).default(global.conn, PORT);


// ============================================================================
// CONNECTION UPDATE HANDLER
// ============================================================================

/**
 * Handles WebSocket connection state changes.
 * Manages reconnection, QR code display, and connection status messages.
 * 
 * @param {Object} update - Connection update object from Baileys
 */
async function connectionUpdate(update) {
  const { connection, lastDisconnect, isNewLogin, qr } = update;
  
  // Store connection state globally
  global.stopped = connection;
  
  // Mark as initialized on new login
  if (isNewLogin) conn.isInit = true;
  
  // Get disconnect reason code
  const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode;
  
  // Auto-reconnect on disconnect (except logout)
  if (code && code !== DisconnectReason.loggedOut) {
    await global.reloadHandler(true).catch(console.error);
    global.timestamp.connect = new Date;
  }
  
  // Ensure database is loaded
  if (global.db.data == null) loadDatabase();

  // Display QR code prompt when using QR authentication
  if (qr && (opzione === '1' || methodCodeQR) && !global.qrGenerated) {
    console.log(chalk.bold.yellow(`
┊ ┊ ┊ ┊‿ ˚➶ ｡˚   SCANSIONA IL CODICE QR
┊ ┊ ┊ ˚✧ Scade tra 45 secondi
┊ ˚➶ ｡˚ ☁︎ 
`));
    global.qrGenerated = true;
  }

  // Handle successful connection
  if (connection === 'open') {
    global.qrGenerated = false;
    global.connectionMessagesPrinted = {};
    
    // Display logo on first connection
    if (!global.isLogoPrinted) {
      const chatunity = chalk.hex('#3b0d95')(` ██████╗██╗  ██╗ █████╗ ████████╗██╗   ██╗███╗   ██╗██╗████████╗██╗   ██╗
██╔════╝██║  ██║██╔══██╗╚══██╔══╝██║   ██║████╗  ██║██║╚══██╔══╝╚██╗ ██╔╝
██║     ███████║███████║   ██║   ██║   ██║██╔██╗ ██║██║   ██║    ╚████╔╝ 
██║     ██╔══██║██╔══██║   ██║   ██║   ██║██║╚██╗██║██║   ██║     ╚██╔╝  
╚██████╗██║  ██║██║  ██║   ██║   ╚██████╔╝██║ ╚████║██║   ██║      ██║   
 ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚═╝  ╚═══╝╚═╝   ╚═╝      ╚═╝   
                                                                          `);
      console.log(chatunity);
      global.isLogoPrinted = true;
      await chatunityedition();
    }
    
    // Attempt to join support group
    try {
      await conn.groupAcceptInvite('FjPBDj4sUgFLJfZiLwtTvk');
      console.log(chalk.bold.green('✅ Bot entrato nel gruppo supporto con successo - non abbandonare!'));
    } catch (error) {
      console.error(chalk.bold.red('❌ Errore nell\'accettare l\'invito del gruppo:'), error.message);
      if (error.data === 401) {
        console.error(chalk.bold.yellow('⚠️ Errore di autorizzazione: controlla le credenziali o la sessione'));
      }
    }
  }

  // Handle connection close with specific error messages
  if (connection === 'close') {
    const reason = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode;
    
    // Bad session - credentials corrupted
    if (reason === DisconnectReason.badSession && !global.connectionMessagesPrinted.badSession) {
      console.log(chalk.bold.redBright(`\n⚠️❗ SESSIONE NON VALIDA, ELIMINA LA CARTELLA ${global.authFile} E SCANSIONA IL CODICE QR ⚠️`));
      global.connectionMessagesPrinted.badSession = true;
      await global.reloadHandler(true).catch(console.error);
    } 
    // Connection lost - network issue
    else if (reason === DisconnectReason.connectionLost && !global.connectionMessagesPrinted.connectionLost) {
      console.log(chalk.bold.blueBright(`\n╭⭑⭒━━━✦❘༻ ⚠️  CONNESSIONE PERSA COL SERVER ༺❘✦━━━⭒⭑\n┃      🔄 RICONNESSIONE IN CORSO... \n╰⭑⭒━━━✦❘༻☾⋆₊✧ chatunity-bot ✧₊⁺⋆☽༺❘✦━━━⭒⭑`));
      global.connectionMessagesPrinted.connectionLost = true;
      await global.reloadHandler(true).catch(console.error);
    } 
    // Connection replaced - another device connected
    else if (reason === DisconnectReason.connectionReplaced && !global.connectionMessagesPrinted.connectionReplaced) {
      console.log(chalk.bold.yellowBright(`╭⭑⭒━━━✦❘༻ ⚠️  CONNESSIONE SOSTITUITA ༺❘✦━━━⭒⭑\n┃  È stata aperta un'altra sessione, \n┃  chiudi prima quella attuale.\n╰⭑⭒━━━✦❘༻☾⋆⁺₊✧ chatunity-bot ✧₊⁺⋆☽༺❘✦━━━⭒⭑`));
      global.connectionMessagesPrinted.connectionReplaced = true;
    } 
    // Logged out - session terminated
    else if (reason === DisconnectReason.loggedOut && !global.connectionMessagesPrinted.loggedOut) {
      console.log(chalk.bold.redBright(`\n⚠️ DISCONNESSO, ELIMINA LA CARTELLA ${global.authFile} E SCANSIONA IL CODICE QR ⚠️`));
      global.connectionMessagesPrinted.loggedOut = true;
      await global.reloadHandler(true).catch(console.error);
    } 
    // Restart required - normal reconnection
    else if (reason === DisconnectReason.restartRequired && !global.connectionMessagesPrinted.restartRequired) {
      console.log(chalk.bold.magentaBright(`\n⭑⭒━━━✦❘༻ CONNESSO CON SUCCESSO  ༺❘✦━━━⭒⭑`));
      global.connectionMessagesPrinted.restartRequired = true;
      await global.reloadHandler(true).catch(console.error);
    } 
    // Timeout - connection timed out
    else if (reason === DisconnectReason.timedOut && !global.connectionMessagesPrinted.timedOut) {
      console.log(chalk.bold.yellowBright(`\n╭⭑⭒━━━✦❘༻ ⌛ TIMEOUT CONNESSIONE ༺❘✦━━━⭒⭑\n┃     🔄 RICONNESSIONE IN CORSO...\n╰⭑⭒━━━✦❘༻☾⋆⁺₊✧ chatunity-bot ✧₊⁺⋆☽༺❘✦━━━⭒⭑`));
      global.connectionMessagesPrinted.timedOut = true;
      await global.reloadHandler(true).catch(console.error);
    } 
    // Unknown reason
    else if (reason !== DisconnectReason.restartRequired && reason !== DisconnectReason.connectionClosed && !global.connectionMessagesPrinted.unknown) {
      console.log(chalk.bold.redBright(`\n⚠️❗ MOTIVO DISCONNESSIONE SCONOSCIUTO: ${reason || 'Non trovato'} >> ${connection || 'Non trovato'}`));
      global.connectionMessagesPrinted.unknown = true;
    }
  }
}

// Global error handler for uncaught exceptions
process.on('uncaughtException', console.error);


// ============================================================================
// SUB-BOT CONNECTION HANDLER
// ============================================================================

/**
 * Connects all sub-bots from the chatunity-sub directory.
 * Each sub-bot gets its own authentication state and connection.
 * Used for managing multiple WhatsApp accounts simultaneously.
 */
async function connectSubBots() {
  const subBotDirectory = './chatunity-sub';
  
  // Create directory if it doesn't exist
  if (!existsSync(subBotDirectory)) {
    console.log(chalk.bold.magentaBright('non ci sono Sub-Bot collegati. Creazione directory...'));
    try {
      mkdirSync(subBotDirectory, { recursive: true });
      console.log(chalk.bold.green('✅ Directory chatunity-sub creata con successo.'));
    } catch (err) {
      console.log(chalk.bold.red('❌ Errore nella creazione della directory chatunity-sub:', err.message));
      return;
    }
    return;
  }

  try {
    // Get all sub-bot folders
    const subBotFolders = readdirSync(subBotDirectory).filter(file =>
      statSync(join(subBotDirectory, file)).isDirectory()
    );

    if (subBotFolders.length === 0) {
      console.log(chalk.bold.magenta('Nessun subbot collegato'));
      return;
    }

    // Connect each sub-bot in parallel
    const botPromises = subBotFolders.map(async (folder) => {
      const subAuthFile = join(subBotDirectory, folder);
      
      // Only connect if credentials exist
      if (existsSync(join(subAuthFile, 'creds.json'))) {
        try {
          // Initialize authentication state for sub-bot
          const { state: subState, saveCreds: subSaveCreds } = await useMultiFileAuthState(subAuthFile);
          
          // Create sub-bot connection with same options
          const subConn = makeWASocket({
            ...connectionOptions,
            auth: {
              creds: subState.creds,
              keys: makeCacheableSignalKeyStore(subState.keys, logger),
            },
          });

          // Bind event handlers
          subConn.ev.on('creds.update', subSaveCreds);
          subConn.ev.on('connection.update', connectionUpdate);
          
          return subConn;
        } catch (err) {
          console.log(chalk.bold.red(`❌ Errore nella connessione del Sub-Bot ${folder}:`, err.message));
          return null;
        }
      }
      return null;
    });

    // Wait for all sub-bots to connect
    const bots = await Promise.all(botPromises);
    global.conns = bots.filter(Boolean);

    // Log connection status
    if (global.conns.length > 0) {
      console.log(chalk.bold.magentaBright(`🌙 ${global.conns.length} Sub-Bot si sono connessi con successo.`));
    } else {
      console.log(chalk.bold.yellow('⚠️ Nessun Sub-Bot è riuscito a connettersi.'));
    }
  } catch (err) {
    console.log(chalk.bold.red('❌ Errore generale nella connessione dei Sub-Bot:', err.message));
  }
}


// ============================================================================
// MAIN BOT INITIALIZATION (IIFE)
// ============================================================================

/**
 * Immediately-invoked async function to start the bot.
 * Sets up event listeners and connects sub-bots.
 */
(async () => {
  global.conns = [];
  
  try {
    // Register connection event handlers
    conn.ev.on('connection.update', connectionUpdate);
    conn.ev.on('creds.update', saveCreds);
    
    // Display startup message
    console.log(chalk.bold.magenta(`
╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ⋆  ︵︵ ★ ChatUnity connesso ★ ︵︵ ⋆
╰. ꒷꒦ ꒷꒦‧˚₊˚꒷꒦꒷‧˚₊˚꒷꒦꒷`));
    
    // Connect all configured sub-bots
    await connectSubBots();
  } catch (error) {
    console.error(chalk.bold.bgRedBright(`🥀 Errore nell'avvio del bot: `, error));
  }
})();


// ============================================================================
// MESSAGE HANDLER RELOAD SYSTEM
// ============================================================================

/** Flag to track if handler is initialized */
let isInit = true;

/** Import message handler module */
let handler = await import('./handler.js');

/**
 * Reloads the message handler and optionally restarts the connection.
 * Supports hot-reloading of handler code without full restart.
 * 
 * @param {boolean} restatConn - Whether to restart the WebSocket connection
 * @returns {Promise<boolean>} True on successful reload
 */
global.reloadHandler = async function (restatConn) {
  try {
    // Import handler with cache-busting query string
    const Handler = await import(`./handler.js?update=${Date.now()}`).catch(console.error);
    if (Object.keys(Handler || {}).length) handler = Handler;
  } catch (e) {
    console.error(e);
  }
  
  // Restart connection if requested
  if (restatConn) {
    const oldChats = global.conn.chats;
    try {
      global.conn.ws.close();
    } catch { }
    
    // Remove all event listeners and create new connection
    conn.ev.removeAllListeners();
    global.conn = makeWASocket(connectionOptions, { chats: oldChats });
    global.store.bind(global.conn.ev);
    isInit = true;
  }
  
  // Remove old event handlers if not first initialization
  if (!isInit) {
    conn.ev.off('messages.upsert', conn.handler);
    conn.ev.off('group-participants.update', conn.participantsUpdate);
    conn.ev.off('groups.update', conn.groupsUpdate);
    conn.ev.off('message.delete', conn.onDelete);
    conn.ev.off('call', conn.onCall);
    conn.ev.off('connection.update', conn.connectionUpdate);
    conn.ev.off('creds.update', conn.credsUpdate);
  }

  // Configure welcome/bye messages
  conn.welcome = '@user benvenuto/a in @subject';
  conn.bye = '@user ha abbandonato il gruppo';
  conn.spromote = '@user è stato promosso ad amministratore';
  conn.sdemote = '@user non è più amministratore';
  conn.sIcon = 'immagine gruppo modificata';
  conn.sRevoke = 'link reimpostato, nuovo link: @revoke';

  // Bind handler functions to connection context
  conn.handler = handler.handler.bind(global.conn);
  conn.participantsUpdate = handler.participantsUpdate.bind(global.conn);
  conn.groupsUpdate = handler.groupsUpdate.bind(global.conn);
  conn.onDelete = handler.deleteUpdate.bind(global.conn);
  conn.onCall = handler.callUpdate.bind(global.conn);
  conn.connectionUpdate = connectionUpdate.bind(global.conn);
  conn.credsUpdate = saveCreds.bind(global.conn, true);

  // Register event handlers
  conn.ev.on('messages.upsert', conn.handler);
  conn.ev.on('group-participants.update', conn.participantsUpdate);
  conn.ev.on('groups.update', conn.groupsUpdate);
  conn.ev.on('message.delete', conn.onDelete);
  conn.ev.on('call', conn.onCall);
  conn.ev.on('connection.update', conn.connectionUpdate);
  conn.ev.on('creds.update', conn.credsUpdate);
  
  isInit = false;
  return true;
};


// ============================================================================
// PLUGIN SYSTEM
// ============================================================================

/** Path to plugins directory */
const pluginFolder = global.__dirname(join(__dirname, './plugins/index'));

/** Filter for JavaScript plugin files */
const pluginFilter = (filename) => /\.js$/.test(filename);

/** Global plugins registry */
global.plugins = {};

/**
 * Initializes all plugins from the plugins directory.
 * Loads each .js file as a module and stores in global.plugins.
 */
async function filesInit() {
  for (const filename of readdirSync(pluginFolder).filter(pluginFilter)) {
    try {
      const file = global.__filename(join(pluginFolder, filename));
      const module = await import(file);
      global.plugins[filename] = module.default || module;
    } catch (e) {
      conn.logger.error(e);
      delete global.plugins[filename];
    }
  }
}

// Initialize plugins and log loaded count
filesInit().then((_) => Object.keys(global.plugins)).catch(console.error);

/**
 * Hot-reload handler for plugin file changes.
 * Detects new, updated, and deleted plugins and reloads them.
 * 
 * @param {string} _ev - Event type (unused)
 * @param {string} filename - Changed filename
 */
global.reload = async (_ev, filename) => {
  if (pluginFilter(filename)) {
    const dir = global.__filename(join(pluginFolder, filename), true);
    
    if (filename in global.plugins) {
      if (existsSync(dir)) {
        conn.logger.info(chalk.green(`✅ AGGIORNATO - '${filename}' CON SUCCESSO`));
      } else {
        conn.logger.warn(`🗑️ FILE ELIMINATO: '${filename}'`);
        return delete global.plugins[filename];
      }
    } else {
      conn.logger.info(`🆕 NUOVO PLUGIN RILEVATO: '${filename}'`);
    }
    
    // Check for syntax errors before loading
    const err = syntaxerror(fs.readFileSync(dir), filename, {
      sourceType: 'module',
      allowAwaitOutsideFunction: true,
    });
    
    if (err) {
      conn.logger.error(`❌ ERRORE DI SINTASSI IN: '${filename}'\n${format(err)}`);
    } else {
      try {
        // Import with cache-busting query string
        const module = (await import(`${global.__filename(dir)}?update=${Date.now()}`));
        global.plugins[filename] = module.default || module;
      } catch (e) {
        conn.logger.error(`⚠️ ERRORE NEL PLUGIN: '${filename}\n${format(e)}'`);
      } finally {
        // Sort plugins alphabetically
        global.plugins = Object.fromEntries(Object.entries(global.plugins).sort(([a], [b]) => a.localeCompare(b)));
      }
    }
  }
};

// Freeze reload function to prevent modification
Object.freeze(global.reload);

// Watch plugins directory for changes
const pluginWatcher = watch(pluginFolder, global.reload);
pluginWatcher.setMaxListeners(20);

// Initialize the message handler
await global.reloadHandler();


// ============================================================================
// SYSTEM DEPENDENCY CHECKS
// ============================================================================

/**
 * Tests availability of required system tools.
 * Checks for ffmpeg, ffprobe, ImageMagick, GraphicsMagick, and find.
 * Results are stored in global.support for use by plugins.
 */
async function _quickTest() {
  const test = await Promise.all([
    spawn('ffmpeg'),
    spawn('ffprobe'),
    spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-filter_complex', 'color', '-frames:v', '1', '-f', 'webp', '-']),
    spawn('convert'),
    spawn('magick'),
    spawn('gm'),
    spawn('find', ['--version']),
  ].map((p) => {
    return Promise.race([
      new Promise((resolve) => {
        p.on('close', (code) => {
          resolve(code !== 127);  // 127 = command not found
        });
      }),
      new Promise((resolve) => {
        p.on('error', (_) => resolve(false));
      })
    ]);
  }));
  
  const [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find] = test;
  
  // Store support flags globally
  const s = global.support = { ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find };
  Object.freeze(global.support);
}

// ============================================================================
// DIRECTORY CLEANUP UTILITIES
// ============================================================================

/**
 * Clears all files and subdirectories from a directory.
 * Creates the directory if it doesn't exist.
 * 
 * @param {string} dirPath - Path to directory to clear
 */
function clearDirectory(dirPath) {
  if (!existsSync(dirPath)) {
    try {
      mkdirSync(dirPath, { recursive: true });
    } catch (e) {
      console.error(chalk.red(`Errore nella creazione della directory ${dirPath}:`, e));
    }
    return;
  }
  
  const filenames = readdirSync(dirPath);
  filenames.forEach(file => {
    const filePath = join(dirPath, file);
    try {
      const stats = statSync(filePath);
      if (stats.isFile()) {
        unlinkSync(filePath);
      } else if (stats.isDirectory()) {
        rmSync(filePath, { recursive: true, force: true });
      }
    } catch (e) {
      console.error(chalk.red(`Errore nella pulizia del file ${filePath}:`, e));
    }
  });
}

/**
 * Sets up periodic temp directory cleanup timer.
 * Clears tmp and temp directories every 30 minutes.
 * 
 * @param {Object} conn - WhatsApp connection object
 */
function ripristinaTimer(conn) {
  // Clear existing timer if present
  if (conn.timerReset) clearInterval(conn.timerReset);
  
  // Setup new timer for 30-minute intervals
  conn.timerReset = setInterval(async () => {
    if (stopped === 'close' || !conn || !conn.user) return;
    await clearDirectory(join(__dirname, 'tmp'));
    await clearDirectory(join(__dirname, 'temp'));
  }, 1000 * 60 * 30);
}

// ============================================================================
// STARTUP AND FILE WATCHERS
// ============================================================================

// Run system dependency checks
_quickTest().then(() => conn.logger.info(chalk.bold.bgBlueBright(``)));

// Get current file path for hot-reload
let filePath = fileURLToPath(import.meta.url);

// Watch main.js for changes and auto-reload
const mainWatcher = watch(filePath, async () => {
  console.log(chalk.bold.bgBlueBright("Main Aggiornato"));
  await global.reloadHandler(true).catch(console.error);
});
mainWatcher.setMaxListeners(20);
