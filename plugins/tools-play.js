import fetch from "node-fetch";
import yts from 'yt-search';
import axios from "axios";

const formatAudio = ['mp3', 'm4a', 'webm', 'acc', 'flac', 'opus', 'ogg', 'wav'];
const formatVideo = ['360', '480', '720', '1080'];
const MAX_DURATION = 600; // 5 minuti in secondi

const ddownr = {
  download: async (url, format) => {
    if (!formatAudio.includes(format) && !formatVideo.includes(format)) {
      throw new Error('╭━━〔 ❗ 〕━━┈⊷\n┃◈ *Formato non supportato*\n╰━━━━━━━━━━┈·๏');
    }

    try {
      const { data } = await axios.get(`https://p.oceansaver.in/ajax/download.php?format=${format}&url=${encodeURIComponent(url)}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`, {
        headers: { 'User-Agent': 'Mozilla/5.0' }
      });

      if (data?.success) {
        return {
          id: data.id,
          image: data.info.image,
          title: data.title,
          downloadUrl: await ddownr.cekProgress(data.id)
        };
      } else {
        throw new Error('╭━━〔 ❗ 〕━━┈⊷\n┃◈ *Errore nel recupero dei dettagli*\n╰━━━━━━━━━━┈·๏');
      }
    } catch (error) {
      console.error('Errore:', error.message);
      throw new Error('╭━━〔 ❗ 〕━━┈⊷\n┃◈ *Errore nel download*\n╰━━━━━━━━━━┈·๏');
    }
  },

  cekProgress: async (id) => {
    try {
      while (true) {
        const { data } = await axios.get(`https://p.oceansaver.in/ajax/progress.php?id=${id}`, {
          headers: { 'User-Agent': 'Mozilla/5.0' }
        });

        if (data?.success && data.progress === 1000) {
          return data.download_url;
        }
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    } catch (error) {
      console.error('Errore:', error.message);
      throw new Error('╭━━〔 ❗ 〕━━┈⊷\n┃◈ *Errore nel check progresso*\n╰━━━━━━━━━━┈·๏');
    }
  }
};

const handler = async (m, { conn, text, usedPrefix, command, args }) => {
  try {
    if (!text.trim()) {
      await conn.sendMessage(m.chat, { 
        text: `╭━━〔 ❗ 〕━━┈⊷\n┃◈ *Inserisci un titolo o un link*\n╰━━━━━━━━━━┈·๏`,
        contextInfo: {
          forwardingScore: 99,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363259442839354@newsletter',
            serverMessageId: '',
            newsletterName: 'ChatUnity'
          }
        }
      }, { quoted: m });
      return;
    }

    // Gestione bottoni: playaudio/playvideo
    if (command === 'playaudio' || command === 'playvideo') {
      const search = await yts(text);
      if (!search.all.length) {
        await conn.sendMessage(m.chat, { 
          text: '╭━━〔 ❗ 〕━━┈⊷\n┃◈ *Nessun risultato trovato*\n╰━━━━━━━━━━┈·๏',
          contextInfo: {
            forwardingScore: 99,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: '120363259442839354@newsletter',
              serverMessageId: '',
              newsletterName: 'ChatUnity'
            }
          }
        }, { quoted: m });
        return;
      }
      const videoInfo = search.all[0];
      const { url, title, thumbnail } = videoInfo;
      const thumb = (await conn.getFile(thumbnail))?.data;

      if (command === 'playaudio') {
        await conn.sendMessage(m.chat, { text: '🎵 𝐚𝐮𝐝𝐢𝐨 𝐢𝐧 𝐚𝐫𝐫𝐢𝐯𝐨 𝐚𝐭𝐭𝐞𝐧𝐝𝐢 𝐪𝐮𝐚𝐥𝐜𝐡𝐞 𝐢𝐬𝐭𝐚𝐧𝐭𝐞...' }, { quoted: m });
        const api = await ddownr.download(url, 'mp3');
        await conn.sendMessage(m.chat, { 
          audio: { url: api.downloadUrl }, 
          mimetype: "audio/mpeg",
          contextInfo: {
            forwardingScore: 99,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: '120363259442839354@newsletter',
              serverMessageId: '',
              newsletterName: 'ChatUnity'
            }
          }
        }, { quoted: m });
      } else {
        await conn.sendMessage(m.chat, { text: '🎬 𝐯𝐢𝐝𝐞𝐨 𝐢𝐧 𝐚𝐫𝐫𝐢𝐯𝐨 𝐚𝐭𝐭𝐞𝐧𝐝𝐢 𝐪𝐮𝐚𝐥𝐜𝐡𝐞 𝐢𝐬𝐭𝐚𝐧𝐭𝐞...' }, { quoted: m });
        let sources = [
          `https://api.siputzx.my.id/api/d/ytmp4?url=${url}`,
          `https://api.zenkey.my.id/api/download/ytmp4?apikey=zenkey&url=${url}`,
          `https://axeel.my.id/api/download/video?url=${encodeURIComponent(url)}`,
          `https://delirius-apiofc.vercel.app/download/ytmp4?url=${url}`
        ];
        const results = await Promise.allSettled(sources.map(src => fetch(src).then(res => res.json())));
        for (const result of results) {
          if (result.status === "fulfilled") {
            const { data, result: resResult, downloads } = result.value;
            const downloadUrl = data?.dl || resResult?.download?.url || downloads?.url || data?.download?.url;
            if (downloadUrl) {
              return await conn.sendMessage(m.chat, {
                video: { url: downloadUrl },
                fileName: `${title}.mp4`,
                mimetype: 'video/mp4',
                caption: '✅ *Download completato!*',
                thumbnail: thumb,
                contextInfo: {
                  forwardingScore: 99,
                  isForwarded: true,
                  forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363259442839354@newsletter',
                    serverMessageId: '',
                    newsletterName: 'ChatUnity'
                  }
                }
              }, { quoted: m });
            }
          }
        }
        await conn.sendMessage(m.chat, { 
          text: '╭━━〔 ❗ 〕━━┈⊷\n┃◈ *Nessun link valido trovato*\n╰━━━━━━━━━━┈·๏',
          contextInfo: {
            forwardingScore: 99,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: '120363259442839354@newsletter',
              serverMessageId: '',
              newsletterName: 'ChatUnity'
            }
          }
        }, { quoted: m });
      }
      return;
    }

    // Solo .play mostra i bottoni, non scarica nulla
    if (command === 'play') {
      const search = await yts(text);
      if (!search.all.length) {
        await conn.sendMessage(m.chat, { 
          text: '╭━━〔 ❗ 〕━━┈⊷\n┃◈ *Nessun risultato trovato*\n╰━━━━━━━━━━┈·๏',
          contextInfo: {
            forwardingScore: 99,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: '120363259442839354@newsletter',
              serverMessageId: '',
              newsletterName: 'ChatUnity'
            }
          }
        }, { quoted: m });
        return;
      }

      const videoInfo = search.all[0];
      const durationInSeconds = videoInfo.seconds;
      if (durationInSeconds > MAX_DURATION) {
        return await conn.sendMessage(m.chat, { 
          text: `╭━━〔 ❗ 〕━━┈⊷\n┃◈ *Video troppo lungo!*\n┃◈ La durata massima consentita è 5 minuti\n┃◈ Durata attuale: ${videoInfo.timestamp}\n╰━━━━━━━━━━┈·๏`,
          contextInfo: {
            forwardingScore: 99,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: '120363259442839354@newsletter',
              serverMessageId: '',
              newsletterName: 'ChatUnity'
            }
          }
        }, { quoted: m });
      }

      const { title, thumbnail, timestamp, views, ago, url, author } = videoInfo;
      const formattedViews = new Intl.NumberFormat().format(views);
      const infoMessage = `
╭〔*🎥 𝑰𝑵𝑭𝑶 𝑽𝑰𝑫𝑬𝑶*〕┈⊷
┃◈╭─────────·๏
┃◈┃• ✍️𝒕𝒊𝒕𝒐𝒍𝒐: ${title}
┃◈┃• ⏳𝒅𝒖𝒓𝒂𝒕𝒂: ${timestamp}
┃◈┃• 👀𝒗𝒊𝒔𝒖𝒂𝒍: ${formattedViews}
┃◈┃• 🔰𝒄𝒂𝒏𝒂𝒍𝒆: ${author?.name ||"Sconosciuto"}
┃◈┃• 🔳𝒑𝒖𝒃𝒃𝒍𝒊𝒄𝒂𝒕𝒐: ${ago}
┃◈┃• 🔗𝒍𝒊𝒏𝒌: ${url}
┃◈└───────┈⊷
╰━━━━━━━━━┈·๏`;

      const thumb = (await conn.getFile(thumbnail))?.data;

      await conn.sendMessage(m.chat, {
        text: infoMessage,
        footer: 'Scegli un formato:',
        buttons: [
          { buttonId: `${usedPrefix}playaudio ${title}`, buttonText: { displayText: "🎵 𝒔𝒄𝒂𝒓𝒊𝒄𝒂 𝒂𝒖𝒅𝒊𝒐" }, type: 1 },
          { buttonId: `${usedPrefix}playvideo ${title}`, buttonText: { displayText: "🎬 𝒔𝒄𝒂𝒓𝒊𝒄𝒂 𝒗𝒊𝒅𝒆𝒐" }, type: 1 },
          { buttonId: `${usedPrefix}salva ${title}`, buttonText: { displayText: "💾 𝒔𝒂𝒍𝒗𝒂 𝒏𝒆𝒍𝒍𝒂 𝒑𝒍𝒂𝒚𝒍𝒊𝒔𝒕" }, type: 1 }
        ],
        viewOnce: true,
        headerType: 4,
        contextInfo: {
          forwardingScore: 99,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363259442839354@newsletter',
            serverMessageId: '',
            newsletterName: 'chatunity'
          },
          externalAdReply: {
            mediaType: 1,
            previewType: 0,
            mediaUrl: url,
            sourceUrl: url,
            thumbnail: thumb,
          }
        }
      }, { quoted: m });
      return;
    }

    // ...rimuovi invio automatico audio/video da qui...
  } catch (error) {
    await conn.sendMessage(m.chat, { 
      text: error.message.startsWith('╭━━') ? error.message : `╭━━〔 ❗ 〕━━┈⊷\n┃◈ *Errore:* ${error.message}\n╰━━━━━━━━━━┈·๏`,
      contextInfo: {
        forwardingScore: 99,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363259442839354@newsletter',
          serverMessageId: '',
          newsletterName: 'chatunity'
        }
      }
    }, { quoted: m });
  }
};

handler.command = handler.help = ['play', 'playaudio', 'playvideo', 'ytmp4', 'play2'];
handler.tags = ['downloader'];

export default handler;

