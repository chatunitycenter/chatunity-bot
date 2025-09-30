import fetch from 'node-fetch';
import fs from 'fs';

// Funzione per decodificare i JID
function decodeJid(jid = '') {
  // Normalizza formati classici dei JID di WhatsApp
  return jid.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
}

const mutaImage = 'https://telegra.ph/file/f8324d9798fa2ed2317bc.png';
const smutaImage = 'https://telegra.ph/file/aea704d0b242b8c41bf15.png';
const vcardUnlimited =
  'BEGIN:VCARD\nVERSION:5.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\nitem1.TEL;waid=19709001746:+1 (970) 900-1746\nitem1.X-ABLabel:Unlimited\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:Unlimited\nEND:VCARD';

const handler = async (_m, { conn, command, text, isAdmin }) => {
  if (command === 'muta') {
    if (!isAdmin)
      throw '𝐒𝐨𝐥𝐨 un amministratore può eseguire questo comando 👑';

    // Ottieni le informazioni del gruppo
    const groupMetadata = await conn.groupMetadata(_m.chat);
    const botJid = conn.user?.jid || '';
    const botOwnerJid = conn.user?.owner || '';

    // Decodifica il JID della persona da mutare
    let targetJid =
      _m.mentionedJid?.[0] ||
      (_m.quoted ? _m.quoted.sender : text) ||
      decodeJid(text);

    if (targetJid === decodeJid(botJid))
      throw 'ⓘ Non puoi mutare il bot';
    if (targetJid === decodeJid(botOwnerJid))
      throw 'ⓘ Il creatore del gruppo non può essere mutato';

    // Stato utente in database
    let user = global.db.data.users[targetJid];

    // Costruzione del messaggio di risposta
    const msg = {
      key: {
        participants: '0@s.whatsapp.net',
        fromMe: false,
        id: '6485072XXbmrN'
      },
      message: {
        locationMessage: {
          name: '𝐔𝐭𝐞𝐧𝐭𝐞 mutato/a',
          jpegThumbnail: await (await fetch(mutaImage)).buffer(),
          vcard: vcardUnlimited
        }
      },
      participant: '0@s.whatsapp.net'
    };

    // Se non è stato taggato nessuno, richiesta di tag
    if (!targetJid && !_m.quoted)
      return conn.reply(_m.chat, '𝐓𝐚𝐠𝐠𝐚 la persona da mutare 👤', _m);

    // Se l'utente è già mutato
    if (user && user.muto === true)
      throw '𝐐𝐮𝐞𝐬𝐭𝐨 utente è già stato mutato/a 🔇';

    // Esegui la muta e aggiorna stato in database
    conn.reply(_m.chat, '𝐈 suoi messaggi non verranno eliminati', msg, null, {
      mentions: [targetJid]
    });
    global.db.data.users[targetJid] = { ...(user || {}), muto: true };
  }

  // ----- smuta -----
  if (command === 'smuta') {
    if (!isAdmin)
      throw '𝐒𝐨𝐥𝐨 un amministratore può eseguire questo comando 👑';

    let targetJid =
      _m.mentionedJid?.[0] ||
      (_m.quoted ? _m.quoted.sender : text) ||
      decodeJid(text);

    if (targetJid === decodeJid(conn.user?.jid || ''))
      throw 'ⓘ Non puoi smutare il bot';
    if (!targetJid && !_m.quoted)
      return conn.reply(_m.chat, '𝐓𝐚𝐠𝐠𝐚 la persona da smutare 👤', _m);

    let user = global.db.data.users[targetJid];

    // Costruzione messaggio risposta
    const msg = {
      key: {
        participants: '0@s.whatsapp.net',
        fromMe: false,
        id: '6485072XXbmrN'
      },
      message: {
        locationMessage: {
          name: '𝐔𝐭𝐞𝐧𝐭𝐞 smutato/a',
          jpegThumbnail: await (await fetch(smutaImage)).buffer(),
          vcard: vcardUnlimited
        }
      },
      participant: '0@s.whatsapp.net'
    };

    // Smuta l'utente
    global.db.data.users[targetJid] = { ...(user || {}), muto: false };
    conn.reply(_m.chat, '𝐈 suoi messaggi verranno eliminati', msg, null, {
      mentions: [targetJid]
    });
  }
};

// Opzioni handler, regex, owner ecc.
handler.command = /^(muta|smuta)$/i;
handler.admin = true;
handler.group = true;
handler.owner = true;

export default handler;
