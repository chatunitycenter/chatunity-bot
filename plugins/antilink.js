import fetch from 'node-fetch';
import FormData from 'form-data';
import { downloadContentFromMessage } from '@realvare/based';

const linkRegex = /chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})|whatsapp\.com\/channel\/([0-9A-Za-z]{20,24})/i;
const urlRegex = /(https?:\/\/[^\s]+)/g;

function extractTextAndUrlsFromMessage(message) {
    const extractedContent = { text: '', urls: [] };
    if (!message) return extractedContent;

    function findContentInObject(obj) {
        if (typeof obj === 'string') {
            extractedContent.text += ' ' + obj;
            const foundUrls = obj.match(urlRegex);
            if (foundUrls) extractedContent.urls.push(...foundUrls);
        } else if (typeof obj === 'object' && obj !== null) {
            for (const key in obj) {
                if (Object.hasOwn(obj, key)) findContentInObject(obj[key]);
            }
        }
    }

    findContentInObject(message);
    return {
        text: extractedContent.text.trim(),
        urls: [...new Set(extractedContent.urls)]
    };
}

async function getMediaBuffer(message) {
    try {
        const msg =
            message.message?.imageMessage ||
            message.message?.videoMessage ||
            message.message?.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage ||
            message.message?.extendedTextMessage?.contextInfo?.quotedMessage?.videoMessage;

        if (!msg) return null;

        const type = msg.mimetype?.startsWith('video') ? 'video' : 'image';
        const stream = await downloadContentFromMessage(msg, type);

        let buffer = Buffer.from([]);
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk]);
        }

        return buffer;
    } catch (e) {
        console.error('Errore nel download media:', e);
        return null;
    }
}

async function readQRCode(imageBuffer) {
    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);

        const formData = new FormData();
        formData.append('file', imageBuffer, 'image.jpg');

        const response = await fetch('https://api.qrserver.com/v1/read-qr-code/', {
            method: 'POST',
            body: formData,
            signal: controller.signal
        });

        clearTimeout(timeout);
        const data = await response.json();
        return data?.[0]?.symbol?.[0]?.data || null;
    } catch (e) {
        console.error('Errore lettura QR:', e);
        return null;
    }
}

// Funzione principale
export async function before(m, { conn, isAdmin, isBotAdmin }) {
    if (m.isBaileys && m.fromMe) return true;
    if (!m.isGroup) return false;

    const chat = global.db.data.chats[m.chat];
    const delet = m.key.participant;
    const bang = m.key.id;
    const user = `@${m.sender.split('@')[0]}`;
    const unv = {
        key: {
            participants: "0@s.whatsapp.net",
            remoteJid: "status@broadcast",
            fromMe: false,
            id: "Halo"
        },
        message: {
            contactMessage: {
                vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Cellulare\nEND:VCARD`
            }
        },
        participant: "0@s.whatsapp.net"
    };
    const bot = global.db.data.settings[this.user.jid] || {};

    const { text: messageText, urls: extractedUrls } = extractTextAndUrlsFromMessage(m.message || {});
    const grupoPrefix = `https://chat.whatsapp.com`;
    let containsGroupLink = !!linkRegex.exec(messageText) || extractedUrls.some(url => linkRegex.exec(url));

    let qrLinkDetected = false;
    if (!containsGroupLink) {
        const media = await getMediaBuffer(m);
        if (media) {
            const qrData = await readQRCode(media);
            const qrText = qrData?.replace(/[\s\u200b\u200c\u200d\uFEFF]+/g, '') ?? '';
            if (qrText && linkRegex.test(qrText)) {
                containsGroupLink = true;
                qrLinkDetected = true;
            }
        }
    }

    if (isAdmin && chat.antiLink && (messageText.includes(grupoPrefix) || containsGroupLink)) return;

    if (chat.antiLink && containsGroupLink && !isAdmin) {
        if (isBotAdmin) {
            const linkThisGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(m.chat)}`;
            if (messageText.includes(linkThisGroup) || extractedUrls.includes(linkThisGroup)) return true;
        }

        if (!isBotAdmin) {
            return m.reply('*𝐩𝐞𝐫 𝐪𝐮𝐞𝐬𝐭𝐚 𝐯𝐨𝐥𝐭𝐚 𝐭𝐢 𝐬𝐞𝐢 𝐬𝐚𝐥𝐯𝐚𝐭𝐨, 𝐧𝐨𝐧 𝐬𝐨𝐧𝐨 𝐚𝐝𝐦𝐢𝐧 𝐞 𝐧𝐨𝐧 𝐩𝐨𝐬𝐬𝐨 𝐟𝐚𝐫𝐞 𝐧𝐢𝐞𝐧𝐭𝐞*');
        }

        await conn.sendMessage(m.chat, {
            text: `*「 𝐀𝐍𝐓𝐈-𝐋𝐈𝐍𝐊 𝐀𝐓𝐓𝐈𝐕𝐀𝐓𝐎 」*\n\n${user}🤨 𝐇𝐚𝐢 𝐢𝐧𝐟𝐫𝐚𝐧𝐭𝐨 𝐥𝐞 𝐫𝐞𝐠𝐨𝐥𝐞 𝐝𝐞𝐥 𝐠𝐫𝐮𝐩𝐩𝐨${qrLinkDetected ? ', 𝐭𝐢 𝐩𝐚𝐫𝐞 𝐜𝐡𝐞 𝐧𝐨𝐧 𝐯𝐞𝐝𝐨 𝐢 𝐪𝐫?😂' : '.'}`,
            mentions: [m.sender]
        }, { quoted: unv, ephemeralExpiration: 24 * 60 * 100, disappearingMessagesInChat: 24 * 60 * 100 });

        await conn.sendMessage(m.chat, {
            delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet }
        });

        const responseb = await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
        if (responseb[0].status === "404") return;

        if (!bot.restrict) {
            return m.reply('*𝐂𝐎𝐍𝐓𝐀𝐓𝐓𝐀 𝐈𝐋 𝐏𝐑𝐎𝐏𝐑𝐈𝐄𝐓𝐀𝐑𝐈𝐎 𝐃𝐄𝐋 𝐁𝐎𝐓 𝐏𝐄𝐑 𝐀𝐓𝐓𝐈𝐕𝐀𝐑𝐄 𝐈𝐋 𝐑𝐄𝐒𝐓𝐑𝐈𝐂𝐓*');
        }
    }

    return true;
}
