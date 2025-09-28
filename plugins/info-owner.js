//Plugin fatto da Gabs & 333 Staff
let handler = async (m, { conn }) => {
    const createVCard = (name, number, role) => {
        return `BEGIN:VCARD
VERSION:3.0
FN:${name}
ORG:ChatUnity;
TEL;type=CELL;type=VOICE;waid=${number}:+${number}
X-ABLabel:${role}
END:VCARD`.replace(/\n/g, '\r\n');
    };

    await conn.sendMessage(m.chat, { 
        contacts: { 
            displayName: 'Creatore', 
            contacts: [
                { vcard: createVCard('Creatore', '393509368693', 'Founder') }
            ]
        }
    }, { quoted: m });
};

handler.help = ['creatore'];
handler.tags = ['info'];
handler.command = ['owner', ]; // ✅ Qui la correzione
export default handler;