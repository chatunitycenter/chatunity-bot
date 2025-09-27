// Plugin Fatto da Gabs333 - Velocizzato 
import fetch from 'node-fetch';
import fs from 'fs';

function getMedal(position) {
    if (position === 1) return '🥇';
    if (position === 2) return '🥈';
    if (position === 3) return '🥉';
    return '🏅';
}

function createSorter(property, ascending = true) {
    if (property) {
        return (a, b) => ascending ? a[property] - b[property] : b[property] - a[property];
    }
    return (a, b) => ascending ? a - b : b - a;
}

async function getUserRole(conn, chatId, userId) {
    try {
        const groupData = await conn.groupMetadata(chatId);
        const participant = groupData.participants.find(p => p.id === userId);
        
        if (participant) {
            if (participant.admin === 'admin' || participant.admin === 'superadmin') {
                return 'Admin 👑';
            }
        }
        
        if (groupData.owner === userId) {
            return 'Founder ⚜';
        }
        
        return 'Membro 🤍';
    } catch {
        return 'Membro 🤍';
    }
}

function getUserLevel(messageCount) {
    const levels = [
        'Principiante I 😐',
        'Principiante II 😐', 
        'Recluta I 🙂',
        'Recluta II 🙂',
        'Avanzato I 🫡',
        'Avanzato II 🫡',
        'Pro I 😤',
        'Pro II 😤',
        'Bomber I 😎',
        'Bomber II 😎',
        'Master I 💪🏼',
        'Master II 💪🏼',
        'Élite I 🤩',
        'Élite II 🤩',
        'Mitico I 🔥',
        'Mitico II 🔥',
        'Campione I 🏆',
        'Campione II 🏆',
        'Eroe I 🎖',
        'Eroe II 🎖',
        'Leggenda I ⭐',
        'Leggenda II ⭐',
        'Dominatore I 🥶',
        'Dominatore II 🥶',
        'Stellare I 💫',
        'Stellare II 💫',
        'Cosmico I 🔮',
        'Cosmico II 🔮',
        'Titano I 😈',
        'Titano II 😈',
        'Fuori classe ❤‍🔥'
    ];
    
    const levelIndex = Math.floor(messageCount / 500);
    return levelIndex >= levels.length ? 'Fuori classe ❤‍🔥' : levels[levelIndex] || 'Principiante I 😐';
}

const handler = async (message, { conn, args, participants }) => {
    const requiredFiles = [
        './plugins/OWNER_file.js',
        './termini.jpeg', 
        './CODE_OF_CONDUCT.md',
        './bal.png'
    ];
    
    const missingFile = requiredFiles.find(file => !fs.existsSync(file));
    if (missingFile) {
        return await conn.sendMessage(message.chat, { 
            text: '❗ Per usare questo comando usa la base di chatunity' 
        }, { quoted: message });
    }

    if (!message.isGroup) {
        return await message.reply('Questo comando funziona solo nei gruppi!');
    }

    let userCount = 20;
    if (args[0]) {
        const parsedCount = parseInt(args[0]);
        if (!isNaN(parsedCount) && parsedCount >= 1 && parsedCount <= 100 && parsedCount % 5 === 0) {
            userCount = parsedCount;
        }
    }

    const userData = participants
        .filter(participant => participant.id !== conn.user.jid)
        .map(participant => {
            const userDb = global.db.data.users[participant.id] || {};
            return {
                jid: participant.id,
                messages: userDb.messaggi || 0,
                userData: userDb
            };
        });

    const sortedUsers = userData.sort(createSorter('messages', false));
    const topUsers = sortedUsers.slice(0, userCount);

    const userCards = await Promise.all(topUsers.map(async ({ jid, messages, userData }, index) => {
        const medal = getMedal(index + 1);
        
        let displayName;
        try {
            displayName = await conn.getName(jid);
        } catch {
            displayName = jid.split('@')[0];
        }

        const userRole = await getUserRole(conn, message.chat, jid);

        let profilePic;
        try {
            profilePic = await conn.profilePictureUrl(jid, 'image');
        } catch {
            profilePic = 'https://qu.ax/LoGxD.png';
        }

        const userLevel = getUserLevel(messages);

        let genderEmoji = '🚻';
        if (userData.genere === 'maschio') {
            genderEmoji = '🚹';
        } else if (userData.genere === 'femmina') {
            genderEmoji = '🚺';
        }

        const instagramInfo = userData.instagram 
            ? `🌐 instagram.com/${userData.instagram}` 
            : '🌐 Instagram: non impostato';

        const cardBody = [
            `📝 Messaggi: ${messages}`,
            `🟣 Ruolo: ${userRole}`,
            `🏅 Livello: ${userLevel}`,
            `🚻 Genere: ${genderEmoji}`,
            instagramInfo
        ].join('\n');

        return {
            image: { url: profilePic },
            title: `#${index + 1} ${displayName}`,
            body: cardBody,
            footer: `Top messaggi ${userCount} utenti`
        };
    }));

    await conn.sendMessage(message.chat, {
        title: `🏆 Top ${userCount} utenti per messaggi`,
        text: 'Guarda chi spacca di più nel gruppo! 🏅',
        footer: 'Usa .info @menzione per più informazioni di su ciascun utente',
        cards: userCards
    }, { quoted: message });
};

handler.command = ['topmessaggi'];
handler.group = true;
handler.admin = false;

export default handler;