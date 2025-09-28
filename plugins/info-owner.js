function handler(m) {
  const contactInfo = {
    key: { participants: "0@s.whatsapp.net", fromMe: false, id: "Halo" },
    message: {
      extendedTextMessage: {
        text: "𝐎𝐰𝐧𝐞𝐫 𝐂𝐡𝐚𝐭𝐔𝐧𝐢𝐭𝐲",
        vcard:
          "BEGIN:VCARD\nVERSION:3.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\nitem1.TEL;waid=19709001746:+1 (970) 900-1746\nitem1.X-ABLabel:Unlimited\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:Unlimited\nEND:VCARD"
      }
    },
    participant: "0@s.whatsapp.net"
  };
  const contacts = global.main.filter(([jid, number]) => jid && number);
  this.sendContact(
    m.chat,
    contacts.map(([jid, number]) => [jid, number]),
    contactInfo
  );
}

handler.help = ["owner"];
handler.tags = ["main"];
handler.command = ["owner", "creador", "dueño", "fgowner"];

export default handler;
