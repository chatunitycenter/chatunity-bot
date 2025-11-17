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
            displayName: '👥 ChatUnity Staff', 
            contacts: [
                { vcard: createVCard('Creatore', '393773842461', 'Founder') },
                { vcard: createVCard('co-founder', '393509368693', 'co-founder') },
                { vcard: createVCard('Finanziatore', '393803482529', 'Financer') },
                { vcard: createVCard('SMM & MODDER', '393929139611', 'SMM & MODDER') },
                { vcard: createVCard('Developer 1', '66621409462', 'Developer') },
                { vcard: createVCard('Developer 2', '393512884684', 'Developer') },
                { vcard: createVCard('Developer 3', '393472425001', 'Developer') },
                { vcard: createVCard('Developer 4', '393534409026', 'Developer') }
            ]
        }
    }, { quoted: m });
};

handler.help = ['staff'];
handler.tags = ['info'];
handler.command = ['staff', 'team'];

export default handler;
