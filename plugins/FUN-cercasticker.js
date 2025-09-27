import axios from 'axios';
import { sticker } from '../lib/sticker.js';

const handler = async (m, { conn, usedPrefix, command, text }) => {
    if (!text) return conn.sendMessage(m.chat, { 
        text: `*_< CERCA ${command.includes('sticker') ? 'STICKER' : 'IMMAGINI'} />_*\n\n[ ❗️ ] Inserisci un testo per cercare ${command.includes('sticker') ? 'sticker' : 'immagini'}\nEsempio: ${usedPrefix + command} Bambina cinese` 
    }, { quoted: m });

    try {
        await conn.sendMessage(m.chat, { 
            text: `*_< CERCA ${command.includes('sticker') ? 'STICKER' : 'IMMAGINI'} />_*\n\n🔍 Cercando immagini per: "${text}"\n⏳ Attendere...` 
        }, { quoted: m });

        let { data } = await axios.get(`https://api.stellarwa.xyz/search/pinterest?query=${text}&apikey=Darken`);
        let images = data.data;

        if (!images || images.length === 0) {
            return conn.sendMessage(m.chat, { 
                text: `*_< CERCA ${command.includes('sticker') ? 'STICKER' : 'IMMAGINI'} />_*\n\n❌ Nessuna immagine trovata per: "${text}"` 
            }, { quoted: m });
        }

        let selectedImages = images.slice(0, 3);

        if (command.includes('sticker')) {
            await conn.sendMessage(m.chat, { 
                text: `*_< CERCA STICKER />_*\n\n✅ Trovate ${selectedImages.length} immagini\n🎨 Creando sticker...` 
            }, { quoted: m });

            for (let i = 0; i < selectedImages.length; i++) {
                try {
                    let image = selectedImages[i];
                    let imageResponse = await axios.get(image.mini || image.hd, {
                        responseType: 'arraybuffer'
                    });
                    let stickerBuffer = await sticker(imageResponse.data, false, global.packname, global.author);
                    await conn.sendMessage(m.chat, { 
                        sticker: stickerBuffer 
                    }, { quoted: m });
                    await new Promise(resolve => setTimeout(resolve, 1000));
                } catch (stickerError) {
                    console.error(`Errore creazione sticker ${i + 1}:`, stickerError);
                    continue;
                }
            }

            await conn.sendMessage(m.chat, { 
                text: `*_< CERCA STICKER />_*\n\n🎉 Sticker creati e inviati con successo!\n📊 Risultati: ${selectedImages.length}/3` 
            }, { quoted: m });
        } else {
            let allMedia = [];
            
            try {
                let { data: videoData } = await axios.get(`https://api.stellarwa.xyz/search/youtube?query=${text}&apikey=Darken`);
                if (videoData && videoData.data) {
                    let videos = videoData.data.slice(0, 2);
                    allMedia = allMedia.concat(videos.map(v => ({ type: 'video', url: v.url, title: v.title })));
                }
            } catch (videoError) {
                console.error('Errore ricerca video:', videoError);
            }

            allMedia = allMedia.concat(selectedImages.slice(0, 3 - allMedia.length).map(img => ({ 
                type: 'image', 
                url: img.hd || img.mini 
            })));

            await conn.sendMessage(m.chat, { 
                text: `*_< CERCA MEDIA />_*\n\n✅ Trovati ${allMedia.length} risultati\n🎨 Creando sticker...` 
            }, { quoted: m });

            for (let i = 0; i < allMedia.length; i++) {
                try {
                    let media = allMedia[i];
                    let mediaResponse = await axios.get(media.url, {
                        responseType: 'arraybuffer'
                    });
                    let stickerBuffer = await sticker(mediaResponse.data, false, global.packname, global.author);
                    await conn.sendMessage(m.chat, { 
                        sticker: stickerBuffer 
                    }, { quoted: m });
                    await new Promise(resolve => setTimeout(resolve, 1000));
                } catch (mediaError) {
                    console.error(`Errore creazione sticker ${i + 1}:`, mediaError);
                    continue;
                }
            }

            await conn.sendMessage(m.chat, { 
                text: `*_< CERCA MEDIA />_*\n\n🎉 Sticker creati e inviati con successo!\n📊 Risultati: ${allMedia.length}/3` 
            }, { quoted: m });
        }

    } catch (error) {
        console.error('Errore ricerca:', error);
        conn.sendMessage(m.chat, { 
            text: `*_< CERCA ${command.includes('sticker') ? 'STICKER' : 'IMMAGINI'} />_*\n\n[❗] È VERIFICATO UN ERRORE DURANTE LA RICERCA\n\n💡 Riprova con un termine diverso` 
        }, { quoted: m });
    }
};

handler.help = ['cercasticker', 'ricerca'];
handler.tags = ['sticker', 'search'];
handler.command = ['cercasticker', 'searchsticker', 'stickersearch', 'ricerca', 'search'];

export default handler;