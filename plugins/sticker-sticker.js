import { sticker } from '../lib/sticker.js';
import uploadFile from '../lib/uploadFile.js';
import uploadImage from '../lib/uploadImage.js';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let stiker = false;

  try {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || q.mediaType || '';
    
    if (/webp|image|video/g.test(mime)) {
      if (/video/g.test(mime) && (q.msg || q).seconds > 10) {
        return m.reply('『 ⏰ 』- `Il video deve durare meno di 10 secondi per creare uno sticker.`');
      }
      
      let img = await q.download?.();
      if (!img) return conn.reply(m.chat, '『 📸 』- `Per favore, invia un\'immagine, video o GIF per creare uno sticker.`', m);
      
      try {
        const packName = global.authsticker || '✧˚🩸 varebot 🕊️˚✧';
        const authorName = global.nomepack || '✧˚🩸 varebot 🕊️˚✧';
        if (!global.support) {
          global.support = {
            ffmpeg: true,
            ffprobe: true,
            ffmpegWebp: true,
            convert: true,
            magick: false,
            gm: false,
            find: false
          };
        }
        stiker = await sticker(img, false, packName, authorName);
      } catch (e) {
        console.error('『 ❌ 』- Creazione sticker diretta fallita:', e);
        try {
          let out;
          if (/image/g.test(mime)) {
            out = await uploadImage(img);
          } else if (/video/g.test(mime)) {
            out = await uploadFile(img);
          } else {
            out = await uploadImage(img);
          }
          
          if (typeof out === 'string') {
            const packName = global.authsticker || '✧˚🩸 varebot 🕊️˚✧';
            const authorName = global.nomepack || '✧˚🩸 varebot 🕊️˚✧';
            stiker = await sticker(false, out, packName, authorName);
          }
        } catch (uploadError) {
          console.error('『 ❌ 』- Caricamento e creazione sticker falliti:', uploadError);
          stiker = false;
        }
      }
    } else if (args[0]) {
      if (isUrl(args[0])) {
        const packName = global.authsticker || '✧˚🩸 varebot 🕊️˚✧';
        const authorName = global.nomepack || '✧˚🩸 varebot 🕊️˚✧';
        if (!global.support) {
          global.support = {
            ffmpeg: true,
            ffprobe: true,
            ffmpegWebp: true,
            convert: true,
            magick: false,
            gm: false,
            find: false
          };
        }
        
        stiker = await sticker(false, args[0], packName, authorName);
      } else {
        return m.reply('『 🔗 』- `L\'URL fornito non è valido. Assicurati che sia un link diretto a un\'immagine.`');
      }
    }
  } catch (e) {
    console.error('『 ❌ 』- Errore nel gestore:', e);
    stiker = false;
  }
  if (stiker && stiker !== true) {
    await conn.sendFile(
      m.chat,
      stiker,
      'sticker.webp',
      '『 ✅ 』- `Sticker creato con successo!`',
      m,
      true,
      { quoted: m }
    );
  } else {
    return conn.reply(
      m.chat,
      '『 📱 』- `Rispondi a un\'immagine, video o GIF per creare uno sticker, oppure invia un URL di un\'immagine.`',
      m,
    );
  }
};

handler.help = ['s', 'sticker', 'stiker'];
handler.tags = ['sticker', 'strumenti'];
handler.command = ['s', 'sticker', 'stiker'];
handler.register = true
export default handler;

const isUrl = (text) => {
  return text.match(
    new RegExp(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/,
      'gi'
    )
  );
};