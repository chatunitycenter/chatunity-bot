import fs from 'fs'; // non usato più per file locali, lasciato se serve altrove
import fetch from 'node-fetch';

// Elenco funzionalità gestite dal toggle
const features = [
  { key: 'antiLink',           label: 'AntiLink' },
  { key: 'antiLinkHard',       label: 'Antilinkhard' },
  { key: 'antimedia',          label: 'Antimedia' },
  { key: 'antispamcomandi',    label: 'AntispamComandi' },
  { key: 'welcome',            label: 'Benvenuto' },
  { key: 'autosticker',        label: 'Autosticker' },
  { key: 'antibot',            label: 'Antibot' },
  { key: 'detect',             label: 'Detect' },
  { key: 'risposte',           label: 'Risposte' },
  { key: 'gpt',                label: 'GPT' },
  { key: 'antispam',           label: 'Antispam' },
  { key: 'antiviewonce',       label: 'Antiviewonce' },
  { key: 'sologruppo',         label: 'SoloGruppo' },
  { key: 'soloprivato',        label: 'SoloPrivato' },
  { key: 'soloadmin',          label: 'soloadmin' },
  { key: 'isBanned',           label: 'BanGruppo' },
  { key: 'antiCall',           label: 'AntiCall' },
  { key: 'antiinsta',          label: 'Antiinsta' },
  { key: 'antiporno',          label: 'Antiporno' },
  { key: 'antitrava',          label: 'Antitrava' },
  { key: 'antivirus',          label: 'Antivirus' },
  { key: 'antivoip',           label: 'Antivoip' },
  { key: 'antiArab',           label: 'Antiarab' },
  { key: 'antisondaggi',       label: 'Antisondaggi' },
  { key: 'antitiktok',         label: 'AntiTikTok' },
  { key: 'chatbotPrivato',     label: 'ChatbotPrivato', ownerOnly: true },
];

// Helper: menu titolo e intestazioni
const MENU_HEADER =
  '╭〔 🔧 𝑴𝑬𝑵𝑼 𝑺𝑰𝑪𝑼𝑹𝑬𝑿 𝑩𝑶𝑻 🔧 〕┈⊷\n' +
  '┃◈╭─────────────·๏\n' +
  '┃◈┃• 𝐀𝐓𝐓𝐈𝐕𝐀/𝐃𝐈𝐒𝐀𝐁𝐈𝐋𝐈𝐓𝐀\n' +
  '┃◈┃\n' +
  '┃◈┃• ℹ 𝐂𝐎𝐌𝐄 𝐒𝐈 𝐔𝐒𝐀\n' +
  '┃◈┃• 🟢 attiva [funzione]\n' +
  '┃◈┃• 🔴 disabilita [funzione]\n' +
  '┃◈┃• 🔴 disattiva [funzione]\n' +
  '┃◈┃\n';

const MENU_FOOTER =
  '\n┃◈┃\n' +
  '┃◈┃•  𝐂𝐎𝐋𝐋𝐀𝐁: 𝐎𝐍𝐄 𝐏𝐈𝐄𝐂𝐄\n' +
  '┃◈┃• *𝐒𝐔𝐏𝐏𝐎𝐑𝐓𝐎:* (.supporto)\n' +
  '╰━━━━━━━━━━━━━┈·๏\n';

const STATUS_HEADER = '\n╭〔 🔧 𝑴𝑬𝑺𝑺𝑨𝑮𝑮𝑰𝑶 𝑺𝑻𝑨𝑻𝑶 〕┈⊷\n┃ Funzione ';
const STATUS_FOOTER = '\n┃◈┃\n┃◈└───────────┈⊷\n┃◈┃• *𝑽𝑬𝑹𝑺𝑰𝑶𝑵𝑬:* \n╰━━━━━━━━━━━━━┈·๏\n';

const BUTTON_TITLE = '📋 Lista Comandi';
const BUTTON_SECTION_TITLE = '🔧 Funzioni';
const BUTTON_TEXT = '⚙ Impostazioni ';
const ONLY_OWNER_MSG = '❌ Solo il proprietario può attivare/disattivare questa funzione.';
const ONLY_PRIVATE_CHATBOT_MSG = '❌ Puoi attivare/disattivare la funzione *ChatbotPrivato* solo in chat privata.';
const ONLY_CHATUNITY_BASE_MSG = 'Questo comando è disponibile solo con la base di ChatUnity.';

const PLACEHOLDER_THUMB = null; // eliminato uso di file locali
const PLACEHOLDER_VCARD = 'BEGIN:VCARD...'; // eliminato dettaglio file

let handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => {
  // Ricava info chat e stato locale
  const name = await conn.getName(m.sender);
  const chats = (global.db?.data?.chats || {});
  const chatData = chats[m.chat] || {};

  // Genera lista testuale con stato delle funzioni
  const listLines = features.map(f => {
    let current = false;

    if (f.key === 'chatbotPrivato') {
      current = (global.privateChatbot?.[m.sender]) || false;
    } else if (f.key === 'antivoip') {
      current = (global.db?.data?.chats?.[m.chat]?.antivoip) || false;
    } else {
      current = chatData[f.key];
    }

    const dot = current ? '🟢' : '🔴';
    const ownerTag = f.ownerOnly ? ' (Owner)' : '';
    return `┃◈┃ ${dot} *${f.label}*${ownerTag}`;
  }).join('\n');

  const menuText = (MENU_HEADER + listLines + STATUS_FOOTER).trim();

  // Se non viene passata una feature valida, mostra il menu cliccabile
  const featureArg = (args[0] || '').toLowerCase();
  const selected = features.find(f => f.label.toLowerCase() === featureArg);

  if (!featureArg || !selected) {
    // Menu interattivo senza dipendenze da file
    const section = {
      title: BUTTON_SECTION_TITLE,
      rows: features.map(f => ({
        title: f.label,
        description: `Attiva ${f.label}`,
        rowId: usedPrefix + 'attiva ' + f.label.toLowerCase()
      }))
    };

    const listMessage = {
      text: menuText,
      footer: 'Seleziona una funzione da attivare/disattivare',
      title: name,
      buttonText: BUTTON_TEXT,
      sections: [section]
    };

    await conn.sendMessage(m.chat, listMessage, { quoted: null }); // niente vcard/thumb locali
    return;
  }

  // Blocco ownerOnly
  if (selected.ownerOnly && !(isOwner || isROwner)) {
    await conn.reply(m.chat, ONLY_OWNER_MSG, m);
    return;
  }

  // Determina ON/OFF dal comando
  const isEnable = /attiva|enable|on|1|true/i.test(command.toLowerCase());
  const isDisable = /disabilita|disattiva|disable|off|0|false/i.test(command.toLowerCase());
  let setTo = isEnable && !isDisable;

  // Applica il toggle sulla destinazione corretta
  if (selected.key === 'antivoip') {
    chatData.antivoip = setTo;
  } else if (selected.key === 'chatbotPrivato') {
    // Solo in chat privata
    if (m.isGroup) {
      await conn.reply(m.chat, ONLY_PRIVATE_CHATBOT_MSG, m);
      return;
    }
    if (!global.privateChatbot) global.privateChatbot = {};
    global.privateChatbot[m.sender] = setTo;
  } else {
    // In chat
    chatData[selected.key] = setTo;
  }

  // Salva chatData nel db se non referenziato
  if (global.db?.data?.chats) {
    global.db.data.chats[m.chat] = chatData;
  }

  const stateIcon = (selected.key === 'chatbotPrivato'
    ? (global.privateChatbot?.[m.sender] ? '🟢' : '🔴')
    : (chatData[selected.key] ? '🟢' : '🔴'));

  const stateVerb = setTo ? '𝐚𝐭𝐭𝐢𝐯𝐚𝐭𝐚' : '𝐝𝐢𝐬𝐚𝐭𝐭𝐢𝐯𝐚𝐭𝐚';
  const statusMsg = (STATUS_HEADER + `*${selected.label}* ${stateVerb}\n╰━━━━━━━━━━━━━┈·๏\n`).trim();

  // Messaggio di conferma senza allegati locali
  await conn.reply(m.chat, statusMsg, m);
};

handler.help = ['attiva <feature>', 'disabilita <feature>', 'disattiva <feature>'];
handler.tags = ['Impostazioni Bot', 'owner'];
handler.command = /^(attiva|disabilita|disattiva|enable|disable)/i;
handler.group = true;
handler.ownerOnly = false;

export default handler;
