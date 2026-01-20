/*
 * Crediti:
 * - https://github.com/realvare/varebot
 * - https://github.com/realvare/based
*/

import path from 'path';
import { toAudio } from './converter.js';
import chalk from 'chalk';
import fetch from 'node-fetch';
import PhoneNumber from 'awesome-phonenumber';
import fs from 'fs';
import util from 'util';
import { fileTypeFromBuffer } from 'file-type';
import { format } from 'util';
import { fileURLToPath } from 'url';
import store from './store.js';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const {
  makeWASocket: _makeWASocket,  
  makeWALegacySocket,
  proto,
  downloadContentFromMessage,
  jidDecode,
  areJidsSameUser,
  generateWAMessage,
  generateForwardMessageContent,
  generateWAMessageFromContent,
  WAMessageStubType,
  extractMessageContent,
  WA_DEFAULT_EPHEMERAL,
  prepareWAMessageMedia,
  jidNormalizedUser
} = await import('@whiskeysockets/baileys');

/**
 * Funzione helper per normalizzare i JID
 * @param {string} jid - Il JID da normalizzare
 * @param {object} conn - La connessione socket
 * @returns {string|null} Il JID normalizzato o null
 */
function normalizeJid(jid, conn) {
  if (!jid) return null;
  const normalized = jidNormalizedUser(conn.decodeJid(jid));
  return normalized;
}

/**
 * Crea un socket zozzap con opzioni aggiuntive.
 * @param {object} connectionOptions - Opzioni di connessione
 * @param {object} [options={}] - Opzioni aggiuntive
 * @returns {object} Il socket WhatsApp configurato
 */
export function makeWASocket(connectionOptions, options = {}) {
  const conn = (global.opts['legacy'] ? makeWALegacySocket : _makeWASocket)(connectionOptions);
  const sock = Object.defineProperties(conn, {
    chats: {
      value: { ...(options.chats || {}) },
      writable: true,
    },
    decodeJid: {
      value(jid) {
        if (!jid || typeof jid !== 'string') return (!nullish(jid) && jid) || null;
        return jid.decodeJid();
      },
    },
    logger: {
      get() {
        return {
          info(...args) {
            console.log(
                chalk.bold.bgRgb(51, 204, 51)('INFO '),
                `[${chalk.rgb(255, 255, 255)(new Date().toUTCString())}]:`,
                chalk.cyan(format(...args)),
            );
          },
          error(...args) {
            console.log(
                chalk.bold.bgRgb(247, 38, 33)('ERROR '),
                `[${chalk.rgb(255, 255, 255)(new Date().toUTCString())}]:`,
                chalk.rgb(255, 38, 0)(format(...args)),
            );
          },
          warn(...args) {
            console.log(
                chalk.bold.bgRgb(255, 153, 0)('WARNING '),
                `[${chalk.rgb(255, 255, 255)(new Date().toUTCString())}]:`,
                chalk.redBright(format(...args)),
            );
          },
          trace(...args) {
            console.log(
                chalk.grey('TRACE '),
                `[${chalk.rgb(255, 255, 255)(new Date().toUTCString())}]:`,
                chalk.white(format(...args)),
            );
          },
          debug(...args) {
            console.log(
                chalk.bold.bgRgb(66, 167, 245)('DEBUG '),
                `[${chalk.rgb(255, 255, 255)(new Date().toUTCString())}]:`,
                chalk.white(format(...args)),
            );
          },
        };
      },
      enumerable: true,
    },
    sendNyanCat: {
      async value(jid, text = '', buffer, title, body, url, quoted, options) {
        if (buffer) {
          try {
            (type = await conn.getFile(buffer), buffer = type.data);
          } catch {
            buffer = buffer;
          }
        }
         const prep = generateWAMessageFromContent(jid, {extendedTextMessage: {text: text, contextInfo: {externalAdReply: {title: title, body: body, thumbnail: buffer, sourceUrl: url}, mentionedJid: await conn.parseMention(text)}}}, {quoted: quoted});
        return conn.relayMessage(jid, prep.message, {messageId: prep.key.id});
      },
    },
    sendPayment: {
      async value(jid, amount, text, quoted, options) {
        conn.relayMessage(jid, {
          requestPaymentMessage: {
            currencyCodeIso4217: 'PEN',
            amount1000: amount,
            requestFrom: null,
            noteMessage: {
              extendedTextMessage: {
                text: text,
                contextInfo: {
                  externalAdReply: {
                    showAdAttribution: true,
                  }, mentionedJid: conn.parseMention(text)}}}}}, {});
      },
    },
    getFile: {
      /**
       * Ottiene il buffer hehe
       * @param {fs.PathLike} PATH
       * @param {Boolean} saveToFile
       */
      async value(PATH, saveToFile = false) {
        let res; let filename;
        const data = Buffer.isBuffer(PATH) ? PATH
  : PATH instanceof ArrayBuffer ? Buffer.from(PATH)
  : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,`[1], 'base64')
  : /^https?:\/\//.test(PATH) ? Buffer.from(await (res = await fetch(PATH)).arrayBuffer())
  : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH))
  : typeof PATH === 'string' ? Buffer.from(PATH)
  : Buffer.alloc(0);

        if (!Buffer.isBuffer(data)) throw new TypeError('Result is not a buffer');
        const type = await fileTypeFromBuffer(data) || {
          mime: 'application/octet-stream',
          ext: '.bin',
        };
        if (data && saveToFile && !filename) (filename = path.join(__dirname, '../tmp/' + new Date * 1 + '.' + type.ext), await fs.promises.writeFile(filename, data));
        return {
          res,
          filename,
          ...type,
          data,
          deleteFile() {
            return filename && fs.promises.unlink(filename);
          },
        };
      },
      enumerable: true,
    },
    waitEvent: {
      /**
       * Attende un evento
       * @param {String} eventName
       * @param {Boolean} is
       * @param {Number} maxTries
       */
      value(eventName, is = () => true, maxTries = 25) { // Non so perché esiste?
        return new Promise((resolve, reject) => {
          let tries = 0;
          const on = (...args) => {
            if (++tries > maxTries) reject('Max tries reached');
            else if (is()) {
              conn.ev.off(eventName, on);
              resolve(...args);
            }
          };
          conn.ev.on(eventName, on);
        });
      },
    },
    relayWAMessage: {
      async value(pesanfull) {
        if (pesanfull.message.audioMessage) {
          await conn.sendPresenceUpdate('recording', pesanfull.key.remoteJid);
        } else {
          await conn.sendPresenceUpdate('composing', pesanfull.key.remoteJid);
        }
        const mekirim = await conn.relayMessage(pesanfull.key.remoteJid, pesanfull.message, {messageId: pesanfull.key.id});
        conn.ev.emit('messages.upsert', {messages: [pesanfull], type: 'append'});
        return mekirim;
      },
    },
    sendFile: {
      /**
       * Invia un media/file con specificatore di tipo automatico
       * @param {String} jid
       * @param {String|Buffer} path
       * @param {String} filename
       * @param {String} caption
       * @param {import('@whiskeysockets/baileys').proto.WebMessageInfo} quoted
       * @param {Boolean} ptt
       * @param {Object} options
       */
      async value(jid, path, filename = '', caption = '', quoted, ptt = false, options = {}) {
        const type = await conn.getFile(path, true);
        let {res, data: file, filename: pathFile} = type;
        if (res && res.status !== 200 || file.length <= 65536) {
          try {
            throw {json: JSON.parse(file.toString())};
          } catch (e) {
            if (e.json) throw e.json;
          }
        }
        const opt = {};
        if (quoted) opt.quoted = quoted;
        if (!type) options.asDocument = true;
        let mtype = ''; let mimetype = options.mimetype || type.mime; let convert;
        if (/webp/.test(type.mime) || (/image/.test(type.mime) && options.asSticker)) mtype = 'sticker';
        else if (/image/.test(type.mime) || (/webp/.test(type.mime) && options.asImage)) mtype = 'image';
        else if (/video/.test(type.mime)) mtype = 'video';
        else if (/audio/.test(type.mime)) {
          (
            convert = await toAudio(file, type.ext),
            file = convert.data,
            pathFile = convert.filename,
            mtype = 'audio',
            mimetype = options.mimetype || 'audio/mpeg; codecs=opus'
          );
        } else mtype = 'document';
        if (options.asDocument) mtype = 'document';
        delete options.asSticker;
        delete options.asLocation;
        delete options.asVideo;
        delete options.asDocument;
        delete options.asImage;

        const message = {
          ...options,
          caption,
          ptt,
          [mtype]: {url: pathFile},
          mimetype,
          fileName: filename || pathFile.split('/').pop(),
        };
        let m;
        try {
          m = await conn.sendMessage(jid, message, {...opt, ...options});
        } catch (e) {
          console.error(e);
          m = null;
        } finally {
          if (!m) m = await conn.sendMessage(jid, {...message, [mtype]: file}, {...opt, ...options});
          file = null; // Rilascio della memoria
          return m;
        }
      },
      enumerable: true,
    },
    sendContact: {
      /**
       * Invia un contatto
       * @param {String} jid
       * @param {String[][]|String[]} data
       * @param {import('@whiskeysockets/baileys').proto.WebMessageInfo} quoted
       * @param {Object} options
       */
      async value(jid, data, quoted, options) {
        if (!Array.isArray(data[0]) && typeof data[0] === 'string') data = [data];
        const contacts = [];
        for (let [number, name] of data) {
          number = number.replace(/[^0-9]/g, '');
          const njid = number + '@s.whatsapp.net';
          const biz = await conn.getBusinessProfile(njid).catch((_) => null) || {};
          const vcard = `
BEGIN:VCARD
VERSION:3.0
N:;${name.replace(/\n/g, '\\n')};;;
FN:${name.replace(/\n/g, '\\n')}
TEL;type=CELL;type=VOICE;waid=${number}:${PhoneNumber('+' + number).getNumber('international')}${biz.description ? `
X-WA-BIZ-NAME:${(conn.chats[njid]?.vname || conn.getName(njid) || name).replace(/\n/, '\\n')}
X-WA-BIZ-DESCRIPTION:${biz.description.replace(/\n/g, '\\n')}
`.trim() : ''}
END:VCARD
        `.trim();
          contacts.push({vcard, displayName: name});
        }
        return await conn.sendMessage(jid, {
          ...options,
          contacts: {
            ...options,
            displayName: (contacts.length >= 2 ? `${contacts.length} kontak` : contacts[0].displayName) || null,
            contacts,
          },
        }, {quoted, ...options});
      },
      enumerable: true,
    },
reply: {
            /**
             * Rispondi a un messaggio
             * @param {String} jid
             * @param {String|Buffer} text
             * @param {import('@adiwajshing/baileys').proto.WebMessageInfo} quoted
             * @param {Object} options
             */
            value(jid, text = '', quoted, options) {

                return Buffer.isBuffer(text) ? conn.sendFile(jid, text, 'file', '', quoted, false, options) : conn.sendMessage(jid, { ...options, text }, { quoted, ...options })
            }
        },
                 //   sendButton: {
            /**
             * Invia un pulsante
             * @param {String} jid
             * @param {String} text
             * @param {String} footer
             * @param {Buffer} buffer
             * @param {String[] | String[][]} buttons
             * @param {import('@whiskeysockets/baileys').proto.WebMessageInfo} quoted
             * @param {Object} options
             */
 /*           async value(jid, text = '', footer = '', buffer, buttons, quoted, options) {
                let type
                if (Array.isArray(buffer)) (options = quoted, quoted = buttons, buttons = buffer, buffer = null)
                else if (buffer) try { (type = await conn.getFile(buffer), buffer = type.data) } catch { buffer = null }
                if (!Array.isArray(buttons[0]) && typeof buttons[0] === 'string') buttons = [buttons]
                if (!options) options = {}
                let message = {
                    ...options,
                    [buffer ? 'caption' : 'text']: text || '',
                    footer,
                    buttons: buttons.map(btn => ({
                        buttonId: !nullish(btn[1]) && btn[1] || !nullish(btn[0]) && btn[0] || '',
                        buttonText: {
                            displayText: !nullish(btn[0]) && btn[0] || !nullish(btn[1]) && btn[1] || ''
                        }
                    })),
                    ...(buffer ?
                        options.asLocation && /image/.test(type.mime) ? {
                            location: {
                                ...options,
                                jpegThumbnail: buffer
                            }
                        } : {
                            [/video/.test(type.mime) ? 'video' : /image/.test(type.mime) ? 'image' : 'document']: buffer
                        } : {})
                }

                return await conn.sendMessage(jid, message, {
                    quoted,
                    upload: conn.waUploadToServer,
                    ...options
                })
            },
            enumerable: true
        },
        */        

        //-- new
sendButton: {
    async value(jid, text = '', footer = '', buffer, buttons, copy, urls, list, quoted, options) {
        let img, video


        if (/^https?:\/\//i.test(buffer)) {
            try {
                // Ottieni il tipo MIME dall'URL
                const response = await fetch(buffer)
                const contentType = response.headers.get('content-type')
                if (/^image\//i.test(contentType)) {
                    img = await prepareWAMessageMedia({ image: { url: buffer } }, { upload: conn.waUploadToServer })
                } else if (/^video\//i.test(contentType)) {
                    video = await prepareWAMessageMedia({ video: { url: buffer } }, { upload: conn.waUploadToServer })
                } else {
                    console.error("Tipo MIME non compatibile:", contentType)
                }
            } catch (error) {
                console.error("Errore nell'ottenere il tipo MIME:", error)
            }
        } else {

            try {
                const type = await conn.getFile(buffer)
               if (/^image\//i.test(type.mime)) {
                    img = await prepareWAMessageMedia({ image: type.data }, { upload: conn.waUploadToServer })
                } else if (/^video\//i.test(type.mime)) {
                    video = await prepareWAMessageMedia({ video: type.data }, { upload: conn.waUploadToServer })
                }
            } catch (error) {
                console.error("Errore nell'ottenere il tipo di file:", error);
            }
        }

const dynamicButtons = []

// Pulsanti di tipo quick_reply
if (buttons && Array.isArray(buttons)) {
    dynamicButtons.push(...buttons.map(btn => ({
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
            display_text: btn[0],
            id: btn[1]
        })
    })));
}

// Pulsanti di copia
if (copy && Array.isArray(copy)) {
    dynamicButtons.push(...copy.map(copyBtn => ({
        name: 'cta_copy',
        buttonParamsJson: JSON.stringify({
            display_text: copyBtn[0] || 'Copy', 
            copy_code: copyBtn[1] 
        })
    })));
}

// Pulsanti di URL
if (urls && Array.isArray(urls)) {
    urls.forEach(url => {
        dynamicButtons.push({
            name: 'cta_url',
            buttonParamsJson: JSON.stringify({
                display_text: url[0],
                url: url[1],
                merchant_url: url[1]
            })
        });
    });
}

// Pulsanti di lista
if (list && Array.isArray(list)) {
            list.forEach(lister => {
                dynamicButtons.push({
                    name: 'single_select',
                    buttonParamsJson: JSON.stringify({
                        title: lister[0], 
                        sections: lister[1]
                    })
                })
            })
        }
        const interactiveMessage = {
            body: { text: text },
            footer: { text: footer },
            header: {
                hasMediaAttachment: false,
                imageMessage: img ? img.imageMessage : null,
                videoMessage: video ? video.videoMessage : null
            },
            nativeFlowMessage: {
                buttons: dynamicButtons,
                messageParamsJson: ''
            }
        }


        let msgL = generateWAMessageFromContent(jid, {
            viewOnceMessage: {
                message: {
                    interactiveMessage } } }, { userJid: conn.user.jid, quoted })

       conn.relayMessage(jid, msgL.message, { messageId: msgL.key.id, ...options })

    }
},

sendAlbumMessage: {
    async value(jid, medias, caption = "", quoted = null) {
        let img, video;

        const album = generateWAMessageFromContent(jid, {
            albumMessage: {
                expectedImageCount: medias.filter(media => media.type === "image").length,
                expectedVideoCount: medias.filter(media => media.type === "video").length,
                ...(quoted ? {
                    contextInfo: {
                        remoteJid: quoted.key.remoteJid,
                        fromMe: quoted.key.fromMe,
                        stanzaId: quoted.key.id,
                        participant: quoted.key.participant || quoted.key.remoteJid,
                        quotedMessage: quoted.message
                    }
                } : {})
            }
        }, { quoted: quoted });

        await conn.relayMessage(album.key.remoteJid, album.message, {
            messageId: album.key.id
        });

        for (const media of medias) {
            const { type, data } = media;

            if (/^https?:\/\//i.test(data.url)) {
                try {
                    const response = await fetch(data.url);
                    const contentType = response.headers.get('content-type');

                    if (/^image\//i.test(contentType)) {
                        img = await prepareWAMessageMedia({ image: { url: data.url } }, { upload: conn.waUploadToServer });
                    } else if (/^video\//i.test(contentType)) {
                        video = await prepareWAMessageMedia({ video: { url: data.url } }, { upload: conn.waUploadToServer });
                    }
                } catch (error) {
                    console.error("Errore nell'ottenere il tipo MIME:", error);
                }
            }

            const mediaMessage = await generateWAMessage(album.key.remoteJid, {
                [type]: data,
                ...(media === medias[0] ? { caption } : {})
            }, {
                upload: conn.waUploadToServer
            });

            mediaMessage.message.messageContextInfo = {
                messageAssociation: {
                    associationType: 1,
                    parentMessageKey: album.key
                }
            };

            await conn.relayMessage(mediaMessage.key.remoteJid, mediaMessage.message, {
                messageId: mediaMessage.key.id
            });
        }

        return album;
    }
},

/**
 * Invia nativeFlowMessage
 */
    sendNCarousel: {
      async value(jid, text = '', footer = '', buffer, buttons, copy, urls, list, quoted, options) {
        let img, video;
        if (buffer) {
          if (/^https?:\/\//i.test(buffer)) {
            try {
              const response = await fetch(buffer);
              const contentType = response.headers.get('content-type');
              if (/^image\//i.test(contentType)) {
                img = await prepareWAMessageMedia({
                  image: {
                    url: buffer
                  }
                }, {
                  upload: conn.waUploadToServer,
                  ...options
                });
              } else if (/^video\//i.test(contentType)) {
                video = await prepareWAMessageMedia({
                  video: {
                    url: buffer
                  }
                }, {
                  upload: conn.waUploadToServer,
                  ...options
                });
              } else {
                console.error("Tipo MIME non compatibile:", contentType);
              }
            } catch (error) {
              console.error("Errore nell'ottenere il tipo MIME:", error);
            }
          } else {
            try {
              const type = await conn.getFile(buffer);
              if (/^image\//i.test(type.mime)) {
                img = await prepareWAMessageMedia({
                  image: (/^https?:\/\//i.test(buffer)) ? {
                    url: buffer
                  } : (type && type?.data)
                }, {
                  upload: conn.waUploadToServer,
                  ...options
                });
              } else if (/^video\//i.test(type.mime)) {
                video = await prepareWAMessageMedia({
                  video: (/^https?:\/\//i.test(buffer)) ? {
                    url: buffer
                  } : (type && type?.data)
                }, {
                  upload: conn.waUploadToServer,
                  ...options
                });
              }
            } catch (error) {
              console.error("Errore nell'ottenere il tipo di file:", error);
            }
          }
        }
        const dynamicButtons = buttons.map(btn => ({
          name: 'quick_reply',
          buttonParamsJson: JSON.stringify({
            display_text: btn[0],
            id: btn[1]
          }),
        }));
        dynamicButtons.push(
          (copy && (typeof copy === 'string' || typeof copy === 'number')) ? {
            name: 'cta_copy',
            buttonParamsJson: JSON.stringify({
              display_text: 'Copy',
              copy_code: copy
            })
          } : null)

        urls?.forEach(url => {
          dynamicButtons.push({
            name: 'cta_url',
            buttonParamsJson: JSON.stringify({
              display_text: url[0],
              url: url[1],
              merchant_url: url[1]
            })
          });
        });
        list?.forEach(lister => {
          dynamicButtons.push({
            name: 'single_select',
            buttonParamsJson: JSON.stringify({
              title: lister[0],
              sections: lister[1]
            })
          });
        })
        const interactiveMessage = {
          body: {
            text: text || ''
          },
          footer: {
            text: footer || wm
          },
          header: {
            hasMediaAttachment: img?.imageMessage || video?.videoMessage ? true : false,
            imageMessage: img?.imageMessage || null,
            videoMessage: video?.videoMessage || null
          },
          nativeFlowMessage: {
            buttons: dynamicButtons.filter(Boolean),
            messageParamsJson: ''
          },
          ...Object.assign({
            mentions: typeof text === 'string' ? conn.parseMention(text || '@0') : [],
            contextInfo: {
              mentionedJid: typeof text === 'string' ? conn.parseMention(text || '@0') : [],
            }
          }, {
            ...(options || {}),
            ...(conn.temareply?.contextInfo && {
              contextInfo: {
                ...(options?.contextInfo || {}),
                ...conn.temareply?.contextInfo,
                externalAdReply: {
                  ...(options?.contextInfo?.externalAdReply || {}),
                  ...conn.temareply?.contextInfo?.externalAdReply,
                },
              },
            })
          })
        };
        const messageContent = proto.Message.fromObject({
          viewOnceMessage: {
            message: {
              messageContextInfo: {
                deviceListMetadata: {},
                deviceListMetadataVersion: 2
              },
              interactiveMessage
            }
          }
        });
        const msgs = await generateWAMessageFromContent(jid, messageContent, {
          userJid: conn.user.jid,
          quoted: quoted,
          upload: conn.waUploadToServer,
          ephemeralExpiration: WA_DEFAULT_EPHEMERAL
        });
        await conn.relayMessage(jid, msgs.message, {
          messageId: msgs.key.id
        });
      }
    }, 

/**
 * Invia carouselMessage
 */
    sendCarousel: {
  async value(jid, text = '', footer = '', messages, quoted, options = {}) {
    try {
      if (messages.length > 1) {
        const cards = await Promise.all(messages.map(async ([text = '', footer = '', buffer, buttons, copy, urls, list]) => {
          let img, video;

          if (/^https?:\/\//i.test(buffer)) {
            try {
              const response = await fetch(buffer);
              const contentType = response.headers.get('content-type');
              if (/^image\//i.test(contentType)) {
                img = await prepareWAMessageMedia({ image: { url: buffer } }, { upload: conn.waUploadToServer, ...options });
              } else if (/^video\//i.test(contentType)) {
                video = await prepareWAMessageMedia({ video: { url: buffer } }, { upload: conn.waUploadToServer, ...options });
              } else {
                console.error("Tipo MIME non compatibile:", contentType);
              }
            } catch (error) {
              console.error("Errore nell'ottenere il tipo MIME:", error);
            }
          } else {
            try {
              const type = await conn.getFile(buffer);
              if (/^image\//i.test(type.mime)) {
                img = await prepareWAMessageMedia({ image: type.data }, { upload: conn.waUploadToServer, ...options });
              } else if (/^video\//i.test(type.mime)) {
                video = await prepareWAMessageMedia({ video: type.data }, { upload: conn.waUploadToServer, ...options });
              }
            } catch (error) {
              console.error("Errore nell'ottenere il tipo di file:", error);
            }
          }

          const dynamicButtons = [];
          if (buttons && Array.isArray(buttons)) {
            buttons.forEach(btn => {
              dynamicButtons.push({
                name: 'quick_reply',
                buttonParamsJson: JSON.stringify({
                  display_text: btn[0],
                  id: btn[1]
                })
              });
            });
          }

          if (copy && Array.isArray(copy)) {
            copy.forEach(copyBtn => {
              dynamicButtons.push({
                name: 'cta_copy',
                buttonParamsJson: JSON.stringify({
                  display_text: copyBtn[0] || 'Copy',
                  copy_code: copyBtn[1]
                })
              });
            });
          }

          if (urls && Array.isArray(urls)) {
            urls.forEach(url => {
              dynamicButtons.push({
                name: 'cta_url',
                buttonParamsJson: JSON.stringify({
                  display_text: url[0],
                  url: url[1],
                  merchant_url: url[1]
                })
              });
            });
          }

          if (list && Array.isArray(list)) {
            list.forEach(lister => {
              dynamicButtons.push({
                name: 'single_select',
                buttonParamsJson: JSON.stringify({
                  title: lister[0],
                  sections: lister[1]
                })
              });
            });
          }

          return {
            body: proto.Message.InteractiveMessage.Body.fromObject({
              text: text || ''
            }),
            footer: proto.Message.InteractiveMessage.Footer.fromObject({
              text: footer || null
            }),
            header: proto.Message.InteractiveMessage.Header.fromObject({
              title: text || null,
              subtitle: text || null,
              hasMediaAttachment: img?.imageMessage || video?.videoMessage ? true : false,
              imageMessage: img?.imageMessage || null,
              videoMessage: video?.videoMessage || null
            }),
            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
              buttons: dynamicButtons.filter(Boolean),
              messageParamsJson: ''
            })
          };
        }));

        const interactiveMessage = proto.Message.InteractiveMessage.create({
          body: proto.Message.InteractiveMessage.Body.fromObject({
            text: text || ''
          }),
          footer: proto.Message.InteractiveMessage.Footer.fromObject({
            text: footer || ''
          }),
          header: proto.Message.InteractiveMessage.Header.fromObject({
            title: text || '',
            subtitle: text || '',
            hasMediaAttachment: false
          }),
          carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
            cards: cards
          })
        });

        const messageContent = proto.Message.fromObject({
          viewOnceMessage: {
            message: {
              messageContextInfo: {
                deviceListMetadata: {},
                deviceListMetadataVersion: 2
              },
              interactiveMessage
            }
          }
        });

        const msgs = await generateWAMessageFromContent(jid, messageContent, {
          userJid: conn.user.jid,
          quoted: quoted,
          upload: conn.waUploadToServer,
          ephemeralExpiration: WA_DEFAULT_EPHEMERAL
        });

        await conn.relayMessage(jid, msgs.message, { messageId: msgs.key.id });
      } else {
        await conn.sendNCarousel(jid, ...messages[0], quoted, options);
      }
    } catch (error) {
      console.error("Errore in sendCarousel:", error);
      throw error;
    }
  }
},

sendButton2: {
    async value(jid, text = '', footer = '', buffer, buttons, copy, urls, quoted, options) {
        let img, video


        if (/^https?:\/\//i.test(buffer)) {
            try {
                // Ottieni il tipo MIME dall'URL
                const response = await fetch(buffer)
                const contentType = response.headers.get('content-type')
                if (/^image\//i.test(contentType)) {
                    img = await prepareWAMessageMedia({ image: { url: buffer } }, { upload: conn.waUploadToServer })
                } else if (/^video\//i.test(contentType)) {
                    video = await prepareWAMessageMedia({ video: { url: buffer } }, { upload: conn.waUploadToServer })
                } else {
                    console.error("Tipo MIME non compatibile:", contentType)
                }
            } catch (error) {
                console.error("Errore nell'ottenere il tipo MIME:", error)
            }
        } else {

            try {
                const type = await conn.getFile(buffer)
               if (/^image\//i.test(type.mime)) {
                    img = await prepareWAMessageMedia({ image: type.data }, { upload: conn.waUploadToServer })
                } else if (/^video\//i.test(type.mime)) {
                    video = await prepareWAMessageMedia({ video: type.data }, { upload: conn.waUploadToServer })
                }
            } catch (error) {
                console.error("Errore nell'ottenere il tipo di file:", error);
            }
        }

        const dynamicButtons = buttons.map(btn => ({
            name: 'quick_reply',
            buttonParamsJson: JSON.stringify({
                display_text: btn[0],
                id: btn[1]
            }),
        }));


        if (copy && (typeof copy === 'string' || typeof copy === 'number')) {
            // Aggiungi pulsante di copia
            dynamicButtons.push({
                name: 'cta_copy',
                buttonParamsJson: JSON.stringify({
                    display_text: 'Copy',
                    copy_code: copy
                })
            });
        }

        // Aggiungi pulsanti di URL
        if (urls && Array.isArray(urls)) {
            urls.forEach(url => {
                dynamicButtons.push({
                    name: 'cta_url',
                    buttonParamsJson: JSON.stringify({
                        display_text: url[0],
                        url: url[1],
                        merchant_url: url[1]
                    })
                })
            })
        }


        const interactiveMessage = {
            body: { text: text },
            footer: { text: footer },
            header: {
                hasMediaAttachment: false,
                imageMessage: img ? img.imageMessage : null,
                videoMessage: video ? video.videoMessage : null
            },
            nativeFlowMessage: {
                buttons: dynamicButtons,
                messageParamsJson: ''
            }
        }


        let msgL = generateWAMessageFromContent(jid, {
            viewOnceMessage: {
                message: {
                    interactiveMessage } } }, { userJid: conn.user.jid, quoted })

       conn.relayMessage(jid, msgL.message, { messageId: msgL.key.id, ...options })

    }
}, 

        //---

sendList: {
    async value(jid, title, text, buttonText, buffer, listSections, quoted, options = {}) {
      let img, video

        if (/^https?:\/\//i.test(buffer)) {
            try {
                // Ottieni il tipo MIME dall'URL
                const response = await fetch(buffer)
                const contentType = response.headers.get('content-type')
                if (/^image\//i.test(contentType)) {
                    img = await prepareWAMessageMedia({ image: { url: buffer } }, { upload: conn.waUploadToServer })
                } else if (/^video\//i.test(contentType)) {
                    video = await prepareWAMessageMedia({ video: { url: buffer } }, { upload: conn.waUploadToServer })
                } else {
                    console.error("Tipo MIME non compatibile:", contentType)
                }
            } catch (error) {
                console.error("Errore nell'ottenere il tipo MIME:", error)
            }
        } else {

            try {
                const type = await conn.getFile(buffer)
               if (/^image\//i.test(type.mime)) {
                    img = await prepareWAMessageMedia({ image: type.data }, { upload: conn.waUploadToServer })
                } else if (/^video\//i.test(type.mime)) {
                    video = await prepareWAMessageMedia({ video: type.data }, { upload: conn.waUploadToServer })
                }
            } catch (error) {
                console.error("Errore nell'ottenere il tipo di file:", error);
            }
        }

  const sections = [...listSections]

        const message = {
            interactiveMessage: {
                header: {title: title, 
                hasMediaAttachment: false,
                imageMessage: img ? img.imageMessage : null,
                videoMessage: video ? video.videoMessage : null 
                   } ,
                body: {text: text}, 
                nativeFlowMessage: {
                    buttons: [
                        {
                            name: 'single_select',
                            buttonParamsJson: JSON.stringify({
                                title: buttonText,
                                sections
                            })
                        }
                    ],
                    messageParamsJson: ''
                }
            }
        };

        let msgL = generateWAMessageFromContent(jid, {
            viewOnceMessage: {
                message} }, { userJid: conn.user.jid, quoted })

        //await conn.relayMessage(jid, { viewOnceMessage: { message } }, {});
        conn.relayMessage(jid, msgL.message, { messageId: msgL.key.id, ...options })

    }
},

    sendPoll: {
      async value(jid, name = '', optiPoll, options) {
        if (!Array.isArray(optiPoll[0]) && typeof optiPoll[0] === 'string') optiPoll = [optiPoll];
        if (!options) options = {};
        const pollMessage = {
          name: name,
          options: optiPoll.map((btn) => ({
            optionName: !nullish(btn[0]) && btn[0] || '',
          })),
          selectableOptionsCount: 1,
        };
        return conn.relayMessage(jid, {pollCreationMessage: pollMessage}, {...options});
      },
    },
    sendHydrated: {
      /**
       * 
       * @param {String} jid
       * @param {String} text
       * @param {String} footer
       * @param {fs.PathLike} buffer
       * @param {String|string[]} url
       * @param {String|string[]} urlText
       * @param {String|string[]} call
       * @param {String|string[]} callText
       * @param {String[][]} buttons
       * @param {import('@whiskeysockets/baileys').proto.WebMessageInfo} quoted
       * @param {Object} options
       */
      async value(jid, text = '', footer = '', buffer, url, urlText, call, callText, buttons, quoted, options) {
        let type;
        if (buffer) {
          try {
            (type = await conn.getFile(buffer), buffer = type.data);
          } catch {
            buffer = buffer;
          }
        }
        if (buffer && !Buffer.isBuffer(buffer) && (typeof buffer === 'string' || Array.isArray(buffer))) (options = quoted, quoted = buttons, buttons = callText, callText = call, call = urlText, urlText = url, url = buffer, buffer = null);
        if (!options) options = {};
        const templateButtons = [];
        if (url || urlText) {
          if (!Array.isArray(url)) url = [url];
          if (!Array.isArray(urlText)) urlText = [urlText];
          templateButtons.push(...(
            url.map((v, i) => [v, urlText[i]])
                .map(([url, urlText], i) => ({
                  index: templateButtons.length + i + 1,
                  urlButton: {
                    displayText: !nullish(urlText) && urlText || !nullish(url) && url || '',
                    url: !nullish(url) && url || !nullish(urlText) && urlText || '',
                  },
                })) || []
          ));
        }
        if (call || callText) {
          if (!Array.isArray(call)) call = [call];
          if (!Array.isArray(callText)) callText = [callText];
          templateButtons.push(...(
            call.map((v, i) => [v, callText[i]])
                .map(([call, callText], i) => ({
                  index: templateButtons.length + i + 1,
                  callButton: {
                    displayText: !nullish(callText) && callText || !nullish(call) && call || '',
                    phoneNumber: !nullish(call) && call || !nullish(callText) && callText || '',
                  },
                })) || []
          ));
        }
        if (buttons.length) {
          if (!Array.isArray(buttons[0])) buttons = [buttons];
          templateButtons.push(...(
            buttons.map(([text, id], index) => ({
              index: templateButtons.length + index + 1,
              quickReplyButton: {
                displayText: !nullish(text) && text || !nullish(id) && id || '',
                id: !nullish(id) && id || !nullish(text) && text || '',
              },
            })) || []
          ));
        }
        const message = {
          ...options,
          [buffer ? 'caption' : 'text']: text || '',
          footer,
          templateButtons,
          ...(buffer ?
                        options.asLocation && /image/.test(type.mime) ? {
                          location: {
                            ...options,
                            jpegThumbnail: buffer,
                          },
                        } : {
                          [/video/.test(type.mime) ? 'video' : /image/.test(type.mime) ? 'image' : 'document']: buffer,
                        } : {}),
        };
        return await conn.sendMessage(jid, message, {
          quoted,
          upload: conn.waUploadToServer,
          ...options,
        });
      },
      enumerable: true,
    },
    sendHydrated2: {
      /**
       * 
       * @param {String} jid
       * @param {String} text
       * @param {String} footer
       * @param {fs.PathLike} buffer
       * @param {String|string[]} url
       * @param {String|string[]} urlText
       * @param {String|string[]} call
       * @param {String|string[]} callText
       * @param {String[][]} buttons
       * @param {import('@whiskeysockets/baileys').proto.WebMessageInfo} quoted
       * @param {Object} options
       */
      async value(jid, text = '', footer = '', buffer, url, urlText, url2, urlText2, buttons, quoted, options) {
        let type;
        if (buffer) {
          try {
            (type = await conn.getFile(buffer), buffer = type.data);
          } catch {
            buffer = buffer;
          }
        }
        if (buffer && !Buffer.isBuffer(buffer) && (typeof buffer === 'string' || Array.isArray(buffer))) (options = quoted, quoted = buttons, buttons = callText, callText = call, call = urlText, urlText = url, url = buffer, buffer = null);
        if (!options) options = {};
        const templateButtons = [];
        if (url || urlText) {
          if (!Array.isArray(url)) url = [url];
          if (!Array.isArray(urlText)) urlText = [urlText];
          templateButtons.push(...(
            url.map((v, i) => [v, urlText[i]])
                .map(([url, urlText], i) => ({
                  index: templateButtons.length + i + 1,
                  urlButton: {
                    displayText: !nullish(urlText) && urlText || !nullish(url) && url || '',
                    url: !nullish(url) && url || !nullish(urlText) && urlText || '',
                  },
                })) || []
          ));
        }
        if (url2 || urlText2) {
          if (!Array.isArray(url2)) url2 = [url2];
          if (!Array.isArray(urlText2)) urlText2 = [urlText2];
          templateButtons.push(...(
            url2.map((v, i) => [v, urlText2[i]])
                .map(([url2, urlText2], i) => ({
                  index: templateButtons.length + i + 1,
                  urlButton: {
                    displayText: !nullish(urlText2) && urlText2 || !nullish(url2) && url2 || '',
                    url: !nullish(url2) && url2 || !nullish(urlText2) && urlText2 || '',
                  },
                })) || []
          ));
        }
        if (buttons.length) {
          if (!Array.isArray(buttons[0])) buttons = [buttons];
          templateButtons.push(...(
            buttons.map(([text, id], index) => ({
              index: templateButtons.length + index + 1,
              quickReplyButton: {
                displayText: !nullish(text) && text || !nullish(id) && id || '',
                id: !nullish(id) && id || !nullish(text) && text || '',
              },
            })) || []
          ));
        }
        const message = {
          ...options,
          [buffer ? 'caption' : 'text']: text || '',
          footer,
          templateButtons,
          ...(buffer ?
                        options.asLocation && /image/.test(type.mime) ? {
                          location: {
                            ...options,
                            jpegThumbnail: buffer,
                          },
                        } : {
                          [/video/.test(type.mime) ? 'video' : /image/.test(type.mime) ? 'image' : 'document']: buffer,
                        } : {}),
        };
        return await conn.sendMessage(jid, message, {
          quoted,
          upload: conn.waUploadToServer,
          ...options,