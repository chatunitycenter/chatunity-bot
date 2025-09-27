let cooldowns = {}

// Definizione di rcanal (sostituisci "default_value" con il valore appropriato)
const rcanal = "default_value"; 

let handler = async (m, { conn, text, command, usedPrefix }) => {
  let users = global.db.data.users[m.sender];
  let tempoAttesa = 10;

  if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tempoAttesa * 1000) {
    let tempoRestante = secondiAHMS(Math.ceil((cooldowns[m.sender] + tempoAttesa * 1000 - Date.now()) / 1000));
    await conn.sendMessage(m.chat, { 
        text: `🚩 Hai già avviato una scommessa di recente, aspetta *⏱ ${tempoRestante}* per scommettere di nuovo`,
        contextInfo: {
            forwardingScore: 99,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363422724720651@newsletter',
                serverMessageId: '',
                newsletterName: 'ChatUnity'
            }
        }
    }, { quoted: m });
    return;
  }

  cooldowns[m.sender] = Date.now();

  if (!text) {
    await conn.sendMessage(m.chat, { 
        text: `🚩 Devi inserire una quantità di *💶 Unitycoins* e scommettere su un colore, per esempio: *${usedPrefix + command} 20 black o red*`,
        contextInfo: {
            forwardingScore: 99,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363422724720651@newsletter',
                serverMessageId: '',
                newsletterName: 'ChatUnity'
            }
        }
    }, { quoted: m });
    return;
  }

  let args = text.trim().split(" ");
  if (args.length !== 2) {
    await conn.sendMessage(m.chat, { 
        text: `🚩 Formato errato. Devi inserire una quantità di *💶 Unitycoins* e scommettere su un colore, per esempio: *${usedPrefix + command} 20 black*`,
        contextInfo: {
            forwardingScore: 99,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363422724720651@newsletter',
                serverMessageId: '',
                newsletterName: 'ChatUnity'
            }
        }
    }, { quoted: m });
    return;
  }

  let limit = parseInt(args[0]);
  let color = args[1].toLowerCase();

  if (isNaN(limit) || limit <= 0) {
    await conn.sendMessage(m.chat, { 
        text: `🚩 Per favore, inserisci una quantità valida per la scommessa.`,
        contextInfo: {
            forwardingScore: 99,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363422724720651@newsletter',
                serverMessageId: '',
                newsletterName: 'ChatUnity'
            }
        }
    }, { quoted: m });
    return;
  }

  if (limit > 50) {
    await conn.sendMessage(m.chat, { 
        text: "🚩 La quantità massima di scommessa è di 50 *💶 Unitycoins*.",
        contextInfo: {
            forwardingScore: 99,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363422724720651@newsletter',
                serverMessageId: '',
                newsletterName: 'ChatUnity'
            }
        }
    }, { quoted: m });
    return;
  }

  if (!(color === 'black' || color === 'red')) {
    await conn.sendMessage(m.chat, { 
        text: "🚩 Devi scommettere su un colore valido: *black* o *red*.",
        contextInfo: {
            forwardingScore: 99,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363422724720651@newsletter',
                serverMessageId: '',
                newsletterName: 'ChatUnity'
            }
        }
    }, { quoted: m });
    return;
  }

  if (limit > users.limit) {
    await conn.sendMessage(m.chat, { 
        text: "🚩 Non hai abbastanza *💶 Unitycoins* per effettuare questa scommessa.",
        contextInfo: {
            forwardingScore: 99,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363422724720651@newsletter',
                serverMessageId: '',
                newsletterName: 'ChatUnity'
            }
        }
    }, { quoted: m });
    return;
  }

  await conn.sendMessage(m.chat, { 
      text: `🚩 Hai scommesso ${limit} *💶 Unitycoins* sul colore ${color}. Aspetta *⏱ 10 secondi* per conoscere il risultato.`,
      contextInfo: {
          forwardingScore: 99,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
              newsletterJid: '120363422724720651@newsletter',
              serverMessageId: '',
              newsletterName: 'ChatUnity'
          }
      }
  }, { quoted: m });

  setTimeout(() => {
    let result = Math.random();
    let win = false;

    if (result < 0.5) {
      win = color === 'black';
    } else {
      win = color === 'red';
    }
    
    if (win) {
      users.limit += limit;
      conn.sendMessage(m.chat, { 
          text: `🚩 Hai vinto! Hai ottenuto ${limit} *💶 Unitycoins*. Totale: ${users.limit} *💶 Unitycoins*.`,
          contextInfo: {
              forwardingScore: 99,
              isForwarded: true,
              forwardedNewsletterMessageInfo: {
                  newsletterJid: '120363422724720651@newsletter',
                  serverMessageId: '',
                  newsletterName: 'ChatUnity'
              }
          }
      }, { quoted: m });
    } else {
      users.limit -= limit;
      conn.sendMessage(m.chat, { 
          text: `🚩 Hai perso. Sono state sottratte ${limit} *💶 Unitycoins*. Totale: ${users.limit} *💶 Unitycoins*.`,
          contextInfo: {
              forwardingScore: 99,
              isForwarded: true,
              forwardedNewsletterMessageInfo: {
                  newsletterJid: '120363422724720651@newsletter',
                  serverMessageId: '',
                  newsletterName: 'ChatUnity'
              }
          }
      }, { quoted: m });
    }
  }, 10000);
};

handler.tags = ['game'];
handler.help = ['ruleta *<quantità> <colore>*'];
handler.command = ['ruleta', 'roulette', 'rt'];
handler.register = true;
handler.group = true;
export default handler;

function secondiAHMS(secondi) {
  let secondiRestanti = secondi % 60;
  return `${secondiRestanti} secondi`;
}