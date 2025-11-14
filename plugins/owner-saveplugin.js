import fs from 'fs'
let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) throw `uhm.. che nome do al plugin?`
    if (!m.quoted.text) throw `Rispondi al msg!`

    let path = `plugins/${text}.js`
    await fs.writeFileSync(path, m.quoted.text)

    const thumbURL = 'https://telegra.ph/file/876cc3f192ec040e33aba.png'
    const thumbBuffer = Buffer.from(await (await fetch(thumbURL)).arrayBuffer())

    let prova = {
        "key": {
            "participants": "0@s.whatsapp.net",
            "fromMe": false,
            "id": "Halo"
        },
        "message": {
            "locationMessage": {
                name: '𝐏𝐥𝐮𝐠𝐢𝐧 𝐬𝐚𝐥𝐯𝐚𝐭𝐨 ✓',
                jpegThumbnail: thumbBuffer,
                vcard: `BEGIN:VCARD
VERSION:3.0
N:Sy;Bot;;;
FN:y
item1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}
item1.X-ABLabel:Ponsel
END:VCARD`
            }
        },
        "participant": "0@s.whatsapp.net"
    }

    conn.reply(m.chat, `${path}`, prova)
}

handler.help = ['saveplugin'].map(v => v + ' <nombre>')
handler.tags = ['owner']
handler.command = ["salvar", "saveplugin"]
handler.rowner = true

export default handler
