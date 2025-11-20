import uploadFile from '../lib/uploadFile.js';
import uploadImage from '../lib/uploadImage.js';
import { Sticker, StickerTypes } from 'wa-sticker-formatter';

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
        
        // Converti in Buffer se necessario
        const imgBuffer = Buffer.isBuffer(img) ? img : Buffer.from(img);
        
        // Crea lo sticker usando wa-sticker-formatter
        const stickerObj = new Sticker(imgBuffer, {
          pack: packName,
          author: authorName,
          type: StickerTypes.FULL,
          quality: 50
        });
        
        stiker = await stickerObj.toBuffer();
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
            
            // Scarica l'immagine dall'URL
            const response = await fetch(out);
            const arrayBuffer = await response.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            
            const stickerObj = new Sticker(buffer, {
              pack: packName,
              author: authorName,
              type: StickerTypes.FULL,
              quality: 50
            });
            
            stiker = await stickerObj.toBuffer();
          }
        } catch (uploadError) {
          console.error('『 ❌ 』- Caricamento e creazione sticker falliti:', uploadError);
          stiker = false;
        }
      }
    } else if (args[0]) {
      if (isUrl(args[0])) {
        try {
          const packName = global.authsticker || '✧˚🩸 varebot 🕊️˚✧';
          const authorName = global.nomepack || '✧˚🩸 varebot 🕊️˚✧';
          
          // Scarica l'immagine dall'URL
          const response = await fetch(args[0]);
          const arrayBuffer = await response.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          
          const stickerObj = new Sticker(buffer, {
            pack: packName,
            author: authorName,
            type: StickerTypes.FULL,
            quality: 50
          });
          
          stiker = await stickerObj.toBuffer();
        } catch (urlError) {
          console.error('『 ❌ 』- Errore download URL:', urlError);
          return m.reply('『 🔗 』- `Errore nel download dell\'immagine dall\'URL. Verifica che il link sia valido.`');
        }
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
handler.register = true;

export default handler;

const isUrl = (text) => {
  return text.match(
    new RegExp(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/,
      'gi'
    )
  );
};
