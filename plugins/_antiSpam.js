//Plugins fatto da Gabs333 Velocizzato
let userSpamCounters = {};
const STICKER_LIMIT = 6;
const PHOTO_VIDEO_LIMIT = 13;
const RESET_TIMEOUT = 5000;

export async function before(m, { isAdmin, isBotAdmin, conn }) {
    try {
        if (m.isBaileys && m.fromMe) return true;
        if (!m.isGroup) return false;

        const chat = global.db.data.chats[m.chat] || {};
        const bot = global.db.data.settings[this.user.jid] || {};
        const sender = m.sender;
        const currentTime = Date.now();

        if (!userSpamCounters[m.chat]) userSpamCounters[m.chat] = {};
        if (!userSpamCounters[m.chat][sender]) {
            userSpamCounters[m.chat][sender] = { 
                stickerCount: 0, 
                photoVideoCount: 0, 
                tagCount: 0, 
                messageIds: [], 
                lastMessageTime: 0, 
                timer: null 
            };
        }

        const counter = userSpamCounters[m.chat][sender];
        const isSticker = m.message?.stickerMessage;
        const isPhoto = m.message?.imageMessage || m.message?.videoMessage;
        const isTagAll = m.message?.extendedTextMessage?.text?.includes('@all') || 
                         m.message?.extendedTextMessage?.text?.includes('@everyone');

        if (isSticker || isPhoto || isTagAll) {
            if (isSticker) counter.stickerCount++;
            else if (isPhoto) counter.photoVideoCount++;
            else if (isTagAll) counter.tagCount++;

            counter.messageIds.push(m.key.id);
            counter.lastMessageTime = currentTime;

            if (counter.timer) clearTimeout(counter.timer);

            const isStickerSpam = counter.stickerCount >= STICKER_LIMIT;
            const isPhotoSpam = counter.photoVideoCount >= PHOTO_VIDEO_LIMIT;
            const isTagSpam = counter.tagCount > 0;

            if (isStickerSpam || isPhotoSpam || isTagSpam) {
                if (isBotAdmin && bot.restrict) {
                    await conn.groupSettingUpdate(m.chat, 'announcement');
                    
                    if (!isAdmin) {
                        await conn.groupParticipantsUpdate(m.chat, [sender], 'remove');
                    }

                    for (const messageId of counter.messageIds) {
                        await conn.sendMessage(m.chat, { 
                            delete: { 
                                remoteJid: m.chat, 
                                fromMe: false, 
                                id: messageId, 
                                participant: m.key.participant 
                            } 
                        });
                    }

                    await conn.groupSettingUpdate(m.chat, 'not_announcement');
                    await conn.sendMessage(m.chat, { text: '*antispam by Origin detected*' });
                    
                    delete userSpamCounters[m.chat][sender];
                }
            } else {
                counter.timer = setTimeout(() => {
                    delete userSpamCounters[m.chat][sender];
                }, RESET_TIMEOUT);
            }
        } else {
            if (currentTime - counter.lastMessageTime > RESET_TIMEOUT && 
                (counter.stickerCount > 0 || counter.photoVideoCount > 0 || counter.tagCount > 0)) {
                delete userSpamCounters[m.chat][sender];
            }
        }

        return true;

    } catch (error) {
        console.error('[ANTISPAM_ERROR]', error);
        return true;
    }
}