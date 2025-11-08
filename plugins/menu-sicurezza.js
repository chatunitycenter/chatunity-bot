import 'os';
import 'util';
import 'human-readable';
import '@realvare/based';
import 'fs';
import 'perf_hooks';
import path from 'path';
import { fileURLToPath } from 'url';
import '../lib/language.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let handler = async (m, { conn, usedPrefix, command }) => {
    const userId = m.sender;
    const groupId = m.isGroup ? m.chat : null;
    const chat = global.db.data.chats[m.chat] || {};

    const menuText = generateMenuText(chat, userId, groupId);
    const imagePath = path.join(__dirname, '../media/sicurezza.jpeg');

    await conn.sendMessage(m.chat, {
        image: { url: imagePath },
        caption: menuText,
        footer: global.t('chooseMenu', userId, groupId) || 'Scegli un menu:',
        buttons: [
            { buttonId: `${usedPrefix}menu`, buttonText: { displayText: global.t('mainMenuButton', userId, groupId) || "🏠 Menu Principale" }, type: 1 },
            { buttonId: `${usedPrefix}attiva antinuke`, buttonText: { displayText: '🟢 Attiva AntiNuke' }, type: 1 },
            { buttonId: `${usedPrefix}disabilita antinuke`, buttonText: { displayText: '🔴 Disattiva AntiNuke' }, type: 1 },
            { buttonId: `${usedPrefix}conclave status`, buttonText: { displayText: '🔎 Stato Conclave' }, type: 1 },
            { buttonId: `${usedPrefix}conclave now`, buttonText: { displayText: '⚠️ Esegui Conclave' }, type: 1 }
        ],
        viewOnce: true,
        headerType: 4
    });
};

handler.help = ["menusicurezza"];
handler.tags = ["menu"];
handler.command = /^(menusicurezza)$/i;

export default handler;

function generateMenuText(chat, userId, groupId) {
    const vs = global.vs || '8.0';
    const menuTitle = global.t('securityMenuTitle', userId, groupId) || '𝑴𝑬𝑵𝑼 𝐅𝐔𝐍𝐙𝐈𝐎𝐍𝐈';
    const versionText = global.t('versionLabel', userId, groupId) || '𝑽𝑬𝑹𝑺𝑰𝑶𝑵𝑬';
    const collabText = global.t('collabLabel', userId, groupId) || '𝐂𝐎𝐋𝐋𝐀𝐁: 𝐎𝐍𝐄 𝐏𝐈𝐄𝐂𝐄';
    const supportText = global.t('supportLabel', userId, groupId) || '𝐒𝐔𝐏𝐏𝐎𝐑𝐓𝐎';

    const functions = {
        Antilink: !!chat?.antiLink,
        Antilinkhard: !!chat?.antiLinkHard,
        Antispam: !!chat?.antispam,
        Antitrava: !!chat?.antitrava,
        Benvenuto: !!chat?.welcome,
        Detect: !!chat?.detect,
        AntiNuke: !!chat?.antinuke,
        Conclave: !!chat?.conclave,
        Antibestemmie: !!chat?.antibestemmie,
        GPT: !!chat?.gpt,
        JadiBot: !!chat?.jadibot,
        SoloGruppo: !!chat?.sologruppo,
        SoloPrivato: !!chat?.soloprivato,
        soloadmin: !!chat?.soloadmin,
        BanGruppo: !!chat?.isBanned,
        Antiporno: !!chat?.antiporno,
        AntiCall: !!chat?.antiCall,
        Antivirus: !!chat?.antivirus,
        Antibot: !!chat?.antibot,
        Antivoip: !!chat?.antivoip,
        Antimedia: !!chat?.antimedia,
        Antisondaggi: !!chat?.antisondaggi,
        AntiTikTok: !!chat?.antitiktok
    };

    const howToUse = `
*ℹ ${global.t('howToUse', userId, groupId) || '𝐂𝐎𝐌𝐄 𝐒𝐈 𝐔𝐒𝐀'}*
*🟢 ${global.t('activateFunction', userId, groupId) || 'attiva [funzione]'}*
*🔴 ${global.t('disableFunction', userId, groupId) || 'disabilita [funzione]'}*
    `.trim();

    const statusList = Object.entries(functions)
        .map(([name, state]) => `${state ? '🟢' : '🔴'} - *${name}*`)
        .join('\n');

    return `
⋆ ︵︵ ★ ${menuTitle} ★ ︵︵ ⋆

${howToUse}

꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧
${statusList.split('\n').map(line => `୧ ${line}`).join('\n')}
꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧

╰♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩
  ୧・*${versionText}:* ${vs}
  ୧・𝐂𝐎𝐋𝐋𝐀𝐁: ${collabText}
  ୧・*${supportText}:* (.supporto)
╰♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩
`.trim();
}
