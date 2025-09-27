process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '1';
import './config.js';
import './api.js';
import { createRequire } from 'module';
import path, { join } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { platform } from 'process';
import * as ws from 'ws';
import * as fs from 'fs';
import { readdirSync, statSync, unlinkSync, existsSync, readFileSync, watch } from 'fs';
import yargs from 'yargs';
import { spawn } from 'child_process';
import lodash from 'lodash';
import chalk from 'chalk';
import syntaxerror from 'syntax-error';
import { tmpdir } from 'os';
import { format } from 'util';
import pino from 'pino';
import Pino from 'pino';
import { Boom } from '@hapi/boom';
import { makeWASocket, protoType, serialize } from './lib/simple.js';
import { Low, JSONFile } from 'lowdb';
import { mongoDB, mongoDBV2 } from './lib/mongoDB.js';
import store from './lib/store.js';
import readline from 'readline';
import NodeCache from 'node-cache'; // import ESM corretto
const { CONNECTING } = ws;
const { chain } = lodash;

const based = await import('@realvare/based');
const { proto } = (based.default || based);
const {
  DisconnectReason,
  useMultiFileAuthState,
  MessageRetryMap,
  fetchLatestBaileysVersion,
  makeCacheableSignalKeyStore,
  jidNormalizedUser,
  PHONENUMBER_MCC: PHONENUMBER_MCC_RAW
} = await import('@realvare/based');

// fallback sicuro per PHONENUMBER_MCC
const PHONENUMBER_MCC = PHONENUMBER_MCC_RAW ?? {};

// helper E.164: 6–15 cifre, no +, prima cifra 1–9
const isE164Digits = (s) => /^[1-9]\d{5,14}$/.test(s); // richiesto da Baileys per pairing
// prefissi paese fallback se PHONENUMBER_MCC mancante
const CC_PREFIXES = [
  '1','7','20','27','30','31','32','33','34','36','39','40','41','43','44','45','46','47','48','49',
  '52','54','55','56','57','58','60','61','62','63','64','65','66','81','82','84','86','90','91','92','93','94','95','98'
];
const hasKnownCC = (num) => Object.keys(PHONENUMBER_MCC).length
  ? Object.keys(PHONENUMBER_MCC).some(v => num.startsWith(v))
  : CC_PREFIXES.some(v => num.startsWith(v));

const PORT = process.env.PORT || process.env.SERVER_PORT || 3000;

protoType();
serialize();

const sessionFolder = './Sessioni/';

async function autoClearSessions() {
  try {
    if (!existsSync(sessionFolder)) return;
    const sessionFiles = readdirSync(sessionFolder);
    for (const file of sessionFiles) {
      if (file !== 'creds.json') {
        unlinkSync(path.join(sessionFolder, file));
      }
    }
  } catch {}
}
setInterval(autoClearSessions, 120000);

global.__filename = function filename(pathURL = import.meta.url, rmPrefix = platform !== 'win32') {
  return rmPrefix ? /file:\/\/\//.test(pathURL) ? fileURLToPath(pathURL) : pathURL : pathToFileURL(pathURL).toString();
};
global.__dirname = function dirname(pathURL) {
  return path.dirname(global.__filename(pathURL, true));
};
global.__require = function require(dir = import.meta.url) {
  return createRequire(dir);
};

global.API = (name, apiPath = '/', query = {}, apikeyqueryname) =>
  (name in global.APIs ? global.APIs[name] : name) + apiPath +
  (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({
    ...query,
    ...(apikeyqueryname ? { [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name] } : {})
  })) : '');

global.timestamp = { start: new Date };
global.videoList = [];
global.videoListXXX = [];

const __dirname = global.__dirname(import.meta.url);

global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse());
global.prefix = new RegExp('^[' + (opts['prefix'] || '*/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-.@').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']');

global.db = new Low(/https?:\/\//.test(opts['db'] || '') ? new cloudDBAdapter(opts['db']) : new JSONFile(`${opts._[0] ? opts._[0] + '_' : ''}database.json`));
global.DATABASE = global.db;
global.loadDatabase = async function loadDatabase() {
  if (global.db.READ) {
    return new Promise((resolve) => setInterval(async function () {
      if (!global.db.READ) {
        clearInterval(this);
        resolve(global.db.data == null ? global.loadDatabase() : global.db.data);
      }
    }, 1000));
  }
  if (global.db.data !== null) return;
  global.db.READ = true;
  await global.db.read().catch(console.error);
  global.db.READ = null;
  global.db.data = {
    users: {},
    chats: {},
    stats: {},
    msgs: {},
    sticker: {},
    settings: {},
    ...(global.db.data || {}),
  };
  global.db.chain = chain(global.db.data);
};
loadDatabase();

global.chatgpt = new Low(new JSONFile(path.join(__dirname, '/db/chatgpt.json')));
global.loadChatgptDB = async function loadChatgptDB() {
  if (global.chatgpt.READ) {
    return new Promise((resolve) =>
      setInterval(async function () {
        if (!global.chatgpt.READ) {
          clearInterval(this);
          resolve(global.chatgpt.data === null ? global.loadChatgptDB() : global.chatgpt.data);
        }
      }, 1000));
  }
  if (global.chatgpt.data !== null) return;
  global.chatgpt.READ = true;
  await global.chatgpt.read().catch(console.error);
  global.chatgpt.READ = null;
  global.chatgpt.data = {
    users: {},
    ...(global.chatgpt.data || {}),
  };
  global.chatgpt.chain = lodash.chain(global.chatgpt.data);
};
loadChatgptDB();

global.authFile = `Sessioni`;
const { state, saveCreds } = await useMultiFileAuthState(global.authFile);
const msgRetryCounterMap = (MessageRetryMap) => {};
const msgRetryCounterCache = new NodeCache(); // import e istanza corretti [ESM]
const { version } = await fetchLatestBaileysVersion();
let phoneNumber = global.botnumber;

const methodCodeQR = process.argv.includes("qr");
const methodCode = !!phoneNumber || process.argv.includes("code");
const MethodMobile = process.argv.includes("mobile");

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const question = (texto) => new Promise((resolver) => rl.question(texto, resolver));
let opcion;
if (methodCodeQR) {
  opcion = '1';
}
if (!methodCodeQR && !methodCode && !fs.existsSync(`./${authFile}/creds.json`)) {
  do {
    let lineM = '⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》';
    opcion = await question(`╭${lineM}
┊ ${chalk.blueBright('╭┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅')}
┊ ${chalk.blueBright('┊')} ${chalk.blue.bgBlue.bold.cyan('METODO DI COLLEGAMENTO')}
┊ ${chalk.blueBright('╰┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅')}
┊ ${chalk.blueBright('╭┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅')}
┊ ${chalk.italic.magenta('Scrivi solo il numero(1 o 2)')}
┊ ${chalk.blueBright('┊')} ${chalk.italic.magenta('per connetterti')}
┊ ${chalk.blueBright('╰┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅')}
┊ ${chalk.blueBright('╭┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅')}
┊ ${chalk.blueBright('┊')} ${chalk.green.bgMagenta.bold.yellow('COME CONNETTERSI?')}
┊ ${chalk.blueBright('┊')} ${chalk.bold.redBright(`⇢  Opzione 1:`)} ${chalk.greenBright('Codice qr')}
┊ ${chalk.blueBright('┊')} ${chalk.bold.redBright(`⇢  Opzione 2:`)} ${chalk.greenBright('Codice 8 caratteri')}
┊ ${chalk.blueBright('╰┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅')}
╰${lineM}\n${chalk.bold.magentaBright('---> ')}`);
    if (!/^[1-2]$/.test(opcion)) {
      console.log(chalk.bold.redBright('Opzione non valida. Inserisci solo 1 o 2.'));
    }
  } while (opcion !== '1' && opcion !== '2' || fs.existsSync(`./${authFile}/creds.json`));
}

console.info = () => {};
const connectionOptions = {
  logger: pino({ level: 'silent' }),
  printQRInTerminal: opcion == '1' ? true : methodCodeQR ? true : false,
  mobile: MethodMobile,
  browser: opcion == '1' ? ['𝐂𝐡𝐚𝐭𝐔𝐧𝐢𝐭𝐲 (lavoro)', 'Edge', '20.0.04'] : methodCodeQR ? ['𝐂𝐡𝐚𝐭𝐔𝐧𝐢𝐭𝐲 (lavoro)', 'Edge', '20.0.04'] : ["Mac OS", "Safari", "20.0.04"],
  auth: {
    creds: state.creds,
    keys: makeCacheableSignalKeyStore(state.keys, Pino({ level: "fatal" }).child({ level: "fatal" })),
  },
  markOnlineOnConnect: true,
  generateHighQualityLinkPreview: true,
  syncFullHistory: true,
  defaultQueryTimeoutMs: 60000,
  getMessage: async (clave) => {
    let jid = jidNormalizedUser(clave.remoteJid);
    let msg = await store.loadMessage(jid, clave.id);
    return msg?.message || "";
  },
  msgRetryCounterCache, // ora esiste
  msgRetryCounterMap,
  decodeJid: (jid) => {
    if (!jid) return jid;
    let decoded = jid;
    if (/:\d+@/gi.test(jid)) decoded = jidNormalizedUser(jid);
    if (typeof decoded === 'object' && decoded.user && decoded.server) decoded = `${decoded.user}@${decoded.server}`;
    if (decoded.endsWith('@lid')) decoded = decoded.replace('@lid', '@s.whatsapp.net');
    return decoded;
  },
  version,
};

global.conn = makeWASocket(connectionOptions);

if (!fs.existsSync(`./${authFile}/creds.json`)) {
  if (opcion === '2' || methodCode) {
    opcion = '2';
    if (!conn.authState.creds.registered) {
      if (MethodMobile) throw new Error(`Impossibile utilizzare un codice di accoppiamento con l'API mobile`);
      let numeroTelefono;
      if (!!phoneNumber) {
        numeroTelefono = phoneNumber.replace(/\D+/g, '');
        if (!(isE164Digits(numeroTelefono) && hasKnownCC(numeroTelefono))) {
          console.log(chalk.bgBlack(chalk.bold.redBright(`Inserisci il numero WhatsApp in formato E.164 senza +\nEsempio: +39 333 333 3333 -> 393333333333\n`)));
          process.exit(0);
        }
      } else {
        while (true) {
          numeroTelefono = await question(chalk.bgBlack(chalk.bold.yellowBright(`Inserisci il numero WhatsApp\nEsempio: +39 333 333 3333\n`)));
          numeroTelefono = numeroTelefono.replace(/\D+/g, '');
          if (isE164Digits(numeroTelefono) && hasKnownCC(numeroTelefono)) break;
          console.log(chalk.bgBlack(chalk.bold.redBright(`Inserisci il numero WhatsApp in formato E.164 senza +\nEsempio: +39 333 333 3333 -> 393333333333\n`)));
        }
        rl.close();
      }
      setTimeout(async () => {
        let codigo = await conn.requestPairingCode(numeroTelefono); // E.164 senza +
        codigo = codigo?.match(/.{1,4}/g)?.join("-") || codigo;
        console.log(chalk.yellowBright('Collega il bot...'));
        console.log(chalk.black(chalk.bgCyanBright(`INSERISCI QUESTO CODICE:`)), chalk.black(chalk.bgGreenBright(codigo)));
      }, 3000);
    }
  }
}

conn.isInit = false;
conn.well = false;
conn.logger.info(`Caricamento ...\n`);

if (!opts['test']) {
  if (global.db) {
    setInterval(async () => {
      if (global.db.data) await global.db.write();
    }, 10000);
  }
}

if (opts['server']) (await import('./server.js')).default(global.conn, PORT);

function clearTmp() {
  const tmp = [join(__dirname, './tmp')];
  const filename = [];
  tmp.forEach((dirname) => readdirSync(dirname).forEach((file) => filename.push(join(dirname, file))));
  return filename.map((file) => {
    const stats = statSync(file);
    if (stats.isFile() && (Date.now() - stats.mtimeMs >= 1000 * 60 * 3)) return unlinkSync(file);
    return false;
  });
}

function purgeSession() {
  let directorio = readdirSync("./Sessioni");
  let filesFolderPreKeys = directorio.filter(file => file.startsWith('pre-key-'));
  filesFolderPreKeys.forEach(files => unlinkSync(`./Sessioni/${files}`));
}

function purgeSessionSB() {
  try {
    let listaDirectorios = readdirSync('./jadibts/');
    listaDirectorios.forEach(directorio => {
      if (statSync(`./jadibts/${directorio}`).isDirectory()) {
        let DSBPreKeys = readdirSync(`./jadibts/${directorio}`).filter(fileInDir => fileInDir.startsWith('pre-key-'));
        DSBPreKeys.forEach(fileInDir => unlinkSync(`./jadibts/${directorio}/${fileInDir}`));
      }
    });
  } catch (err) {
    console.log(chalk.bold.red(`⚠️ Qualcosa è andato storto durante l'eliminazione, file non eliminati`));
  }
}

function purgeOldFiles() {
  const directories = ['./Sessioni/', './jadibts/'];
  const oneHourAgo = Date.now() - (60 * 60 * 1000);
  directories.forEach(dir => {
    readdirSync(dir, (err, files) => {
      if (err) throw err;
      files.forEach(file => {
        const filePath = path.join(dir, file);
        fs.stat(filePath, (err2, stats) => {
          if (err2) throw err2;
          if (stats.isFile() && stats.mtimeMs < oneHourAgo && file !== 'creds.json') {
            unlinkSync(filePath);
            console.log(chalk.bold.green(`Archivo ${file} borrado con éxito`));
          } else {
            console.log(chalk.bold.red(`Archivo ${file} no borrado`));
          }
        });
      });
    });
  });
}

async function connectionUpdate(update) {
  const { connection, lastDisconnect, isNewLogin, qr } = update;
  global.stopped = connection;
  if (isNewLogin) conn.isInit = true;

  const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode;
  if (code && code !== DisconnectReason.loggedOut && conn?.ws.socket == null) {
    await global.reloadHandler(true).catch(console.error);
    global.timestamp.connect = new Date;
  }
  if (global.db.data == null) loadDatabase();
  if (qr != 0 && qr != undefined || methodCodeQR) {
    if (opcion == '1' || methodCodeQR) {
      console.log(chalk.yellow('Scansiona questo codice QR, scade tra 60 secondi.'));
    }
  }
  if (connection == 'open') {
    try {
      await conn.groupAcceptInvite('FjPBDj4sUgFLJfZiLwtTvk');
    } catch (error) {
      console.error('Error accepting group invite:', error.message);
      if (error.data === 401) {
        console.error('Authorization error: Please check your credentials or session.');
      } else {
        console.error('Unexpected error:', error);
      }
    }
    console.log(chalk.green('\nChatUnity-Bot connesso ✅️ \n'));
  }
  let reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
  if (reason == 405) {
    await fs.unlinkSync("./Sessioni/" + "creds.json");
    console.log(chalk.bold.redBright(`[ ⚠️ ] Connessione sostituita, riavvio in corso...\nSe appare un errore, ricomincia con: npm start`));
    process.send?.('reset');
  }
  if (connection === 'close') {
    if (reason === DisconnectReason.badSession) {
      conn.logger.error(`[ ⚠️ ] Sessione errata, elimina la cartella ${global.authFile} ed esegui nuovamente la scansione.`);
    } else if (reason === DisconnectReason.connectionClosed) {
      conn.logger.warn(`[ ⚠️ ] Connessione chiusa, riconnessione in corso...`);
      await global.reloadHandler(true).catch(console.error);
    } else if (reason === DisconnectReason.connectionLost) {
      conn.logger.warn(`[ ⚠️ ] Connessione persa al server, riconnessione in corso...`);
      await global.reloadHandler(true).catch(console.error);
    } else if (reason === DisconnectReason.connectionReplaced) {
      conn.logger.error(`[ ⚠️ ] Connessione sostituita, è stata aperta un'altra nuova sessione. Disconnettersi dalla sessione corrente.`);
    } else if (reason === DisconnectReason.loggedOut) {
      conn.logger.error(`[ ⚠️ ] Connessione chiusa, elimina la cartella ${global.authFile} ed esegui nuovamente la scansione.`);
    } else if (reason === DisconnectReason.restartRequired) {
      conn.logger.info(`[ ⚠️ ] Riavvio richiesto, riavviare il server in caso di problemi.`);
      await global.reloadHandler(true).catch(console.error);
    } else if (reason === DisconnectReason.timedOut) {
      conn.logger.warn(`[ ⚠️ ] Connessione scaduta, riconnessione in corso...`);
      await global.reloadHandler(true).catch(console.error);
    } else {
      conn.logger.warn(`[ ⚠️ ] Motivo disconnessione sconosciuto. Verifica eventuale ban. ${reason || ''}: ${connection || ''}`);
      await global.reloadHandler(true).catch(console.error);
    }
  }
}
process.on('uncaughtException', console.error);

// Rate-limit messaggi
const maxConcurrentMessages = 1;
let runningMessages = 0;
const messageQueue = [];
async function rateLimitedMessageHandler(m) {
  return new Promise((resolve) => {
    messageQueue.push({ m, resolve });
    processNextMessage();
  });
}
function processNextMessage() {
  if (runningMessages >= maxConcurrentMessages || messageQueue.length === 0) return;
  runningMessages++;
  const { m, resolve } = messageQueue.shift();
  (async () => {
    try {
      await handler.handler.call(global.conn, m);
    } catch (error) {
      console.error('Error in message handler:', error);
    }
    setTimeout(() => {
      runningMessages--;
      processNextMessage();
    }, 500);
    resolve();
  })();
}

let isInit = true;
let handler = await import('./handler.js');
global.reloadHandler = async function (restatConn) {
  try {
    const Handler = await import(`./handler.js?update=${Date.now()}`).catch(console.error);
    if (Object.keys(Handler || {}).length) handler = Handler;
  } catch (e) {
    console.error(e);
  }
  if (restatConn) {
    const oldChats = global.conn.chats;
    try {
      global.conn.ws.close();
    } catch {}
    conn.ev.removeAllListeners();
    global.conn = makeWASocket(connectionOptions, { chats: oldChats });
    isInit = true;
  }
  if (!isInit) {
    conn.ev.off('messages.upsert', conn.handler);
    conn.ev.off('group-participants.update', conn.participantsUpdate);
    conn.ev.off('groups.update', conn.groupsUpdate);
    conn.ev.off('message.delete', conn.onDelete);
    conn.ev.off('call', conn.onCall);
    conn.ev.off('connection.update', conn.connectionUpdate);
    conn.ev.off('creds.update', conn.credsUpdate);
  }

  conn.welcome = '@user benvenuto/a in @subject';
  conn.bye = '@user ha abbandonato il gruppo';
  conn.sIcon = 'immagine gruppo modificata';
  conn.sRevoke = 'link reimpostato, nuovo link: @revoke';

  conn.handler = rateLimitedMessageHandler;
  conn.participantsUpdate = handler.participantsUpdate.bind(global.conn);
  conn.groupsUpdate = handler.groupsUpdate.bind(global.conn);
  conn.onDelete = handler.deleteUpdate.bind(global.conn);
  conn.onCall = handler.callUpdate.bind(global.conn);
  conn.connectionUpdate = connectionUpdate.bind(global.conn);
  conn.credsUpdate = saveCreds.bind(global.conn, true);

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

const pluginFolder = global.__dirname(join(__dirname, './plugins/index'));
const pluginFilter = (filename) => /\.js$/.test(filename);
global.plugins = {};
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
filesInit().then((_) => Object.keys(global.plugins)).catch(console.error);

global.reload = async (_ev, filename) => {
  if (pluginFilter(filename)) {
    const dir = global.__filename(join(pluginFolder, filename), true);
    if (filename in global.plugins) {
      if (existsSync(dir)) conn.logger.info(` updated plugin - '${filename}'`);
      else {
        conn.logger.warn(`deleted plugin - '${filename}'`);
        return delete global.plugins[filename];
      }
    } else conn.logger.info(`new plugin - '${filename}'`);
    const err = syntaxerror(readFileSync(dir), filename, {
      sourceType: 'module',
      allowAwaitOutsideFunction: true,
    });
    if (err) conn.logger.error(`syntax error while loading '${filename}'\n${format(err)}`);
    else {
      try {
        const module = (await import(`${global.__filename(dir)}?update=${Date.now()}`));
        global.plugins[filename] = module.default || module;
      } catch (e) {
        conn.logger.error(`error require plugin '${filename}\n${format(e)}'`);
      } finally {
        global.plugins = Object.fromEntries(Object.entries(global.plugins).sort(([a], [b]) => a.localeCompare(b)));
      }
    }
  }
};
Object.freeze(global.reload);
watch(pluginFolder, global.reload);
await global.reloadHandler();

async function _quickTest() {
  const test = await Promise.all([
    spawn('ffmpeg'),
    spawn('ffprobe'),
    spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', ' -filter_complex', 'color', '-frames:v', '1', '-f', 'webp', '-']),
    spawn('convert'),
    spawn('magick'),
    spawn('gm'),
    spawn('find', ['--version']),
  ].map((p) => {
    return Promise.race([
      new Promise((resolve) => { p.on('close', (code) => { resolve(code !== 127); }); }),
      new Promise((resolve) => { p.on('error', (_) => resolve(false)); })
    ]);
  }));
  const [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find] = test;
  const s = global.support = { ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find };
  Object.freeze(global.support);
}
setInterval(async () => {
  if (stopped === 'close' || !conn || !conn.user) return;
  const a = await clearTmp();
  console.log(chalk.cyanBright(`\n╭─────────────────···\n│ AUTOCLEARTMP\n│ ⓘ Archivi eliminati con successo. ✅\n╰─────────────···`));
}, 180000);
setInterval(async () => {
  if (stopped === 'close' || !conn || !conn.user) return;
  await purgeSession();
  console.log(chalk.cyanBright(`\n╭─────────────────···\n│ AUTO ELIMINAZIONE SESSIONI\n│ ⓘ Archivi eliminati con successo. ✅\n╰─────────────···`));
}, 1000 * 60 * 60);
setInterval(async () => {
  if (stopped === 'close' || !conn || !conn.user) return;
  await purgeSessionSB();
  console.log(chalk.cyanBright(`\n╭─────────────────···\n│ AUTO ELIMINAZIONE SUB-BOTS\n│ ⓘ Archivi eliminati con successo. ✅\n╰─────────────···`));
}, 1000 * 60 * 60);
setInterval(async () => {
  if (stopped === 'close' || !conn || !conn.user) return;
  await purgeOldFiles();
  console.log(chalk.cyanBright(`\n╭─────────────────\n│ AUTO ELIMINAZIONE OLDFILES\n│ ⓘ Archivi eliminati con successo. ✅\n╰─────────────···`));
}, 1000 * 60 * 60);
_quickTest().catch(console.error);
