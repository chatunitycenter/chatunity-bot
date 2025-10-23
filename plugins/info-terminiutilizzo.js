import { performance } from 'perf_hooks';
import fetch from 'node-fetch'; // Assicurati di avere node-fetch installato

const handler = async (message, { conn, usedPrefix }) => {
    const userCount = Object.keys(global.db.data.users).length;
    const botName = global.db.data.nomedelbot || 'ChatUnity';

    const menuText = generateMenuText(usedPrefix, botName, userCount);

    const messageOptions = {
        contextInfo: {
            forwardingScore: 1,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363259442839354@newsletter',
                serverMessageId: '',
                newsletterName: `${botName}`
            },
        }
    };

    // Invia la foto con il menu
    const imagePath = './termini.jpeg';
    await conn.sendMessage(
        message.chat,
        { image: { url: imagePath }, caption: menuText, ...messageOptions },
        { quoted: message }
    );
};

async function fetchThumbnail(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const arrayBuffer = await response.arrayBuffer();
        return new Uint8Array(arrayBuffer);
    } catch (error) {
        console.error('Errore durante il fetch della thumbnail:', error);
        return 'default-thumbnail'; // Fallback thumbnail in caso di errore
    }
}

handler.help = ['FAQ'];
handler.tags = ['info'];
handler.command = /^(FAQ|termini)$/i;

export default handler;

function generateMenuText(prefix, botName, userCount) {
    return `
╭━━〔 *📜 TERMINI DI UTILIZZO & PRIVACY* 〕━━╮
┃
┃ *Tutte le informazioni qui non escludono il proprietario del bot e i Proprietari accreditati per l'uso di ${botName}.*
┃ _Non siamo responsabili dell'ignoranza che potresti avere riguardo a queste informazioni._
┃
┣━━━〔 🔒 *TERMINI DI PRIVACY* 〕━━━┫
┃ • Siamo consapevoli dell'uso costante che potresti fare del Bot e garantiamo che le informazioni come (immagini, video, link, posizione, audio, sticker, gif, contatti) che fornisci ai numeri ufficiali non saranno condivise con nessuno, né verranno utilizzate al di fuori dell'ambiente del Bot.
┃ • Ciò che fai con il Bot rimane a tuo carico, poiché nei numeri ufficiali la chat viene cancellata ogni 24 ore, in base ai messaggi temporanei di WhatsApp.
┃ • È possibile che nei numeri ufficiali il Bot non sia attivo 24/7, ma ciò non implica che non lo sia o che i proprietari non ufficiali possano farlo.
┃ • La chat anonima del comando *#start*, come suggerisce il nome, non mostrerà alcun dato degli utenti da parte di ${botName}. Ciò non implica che le persone che utilizzano questa funzione possano condividere i loro dati nei numeri ufficiali.
┃ • I dati che ${botName} ottiene dagli account ufficiali degli utenti, dai gruppi e dalle impostazioni degli stessi possono essere reinizializzati, modificati e/o rettificati per garantire che il Bot sia in condizioni ottimali per l'uso. (Gli utenti possono richiedere un risarcimento tramite Instagram o tramite il comando *#Reporte* con prove).
┃ • NON siamo responsabili se ci sono alterazioni di questo Bot da parte di numeri non ufficiali o se utilizzano un repository di GitHub che non corrisponde a quello ufficiale, o se implementano integrazioni di terze parti che compromettono gli utenti utilizzando versioni non ufficiali.
┃ • La funzione *Sub Bot* garantisce la sicurezza dei tuoi dati applicata agli account ufficiali.
┃
┣━━━〔 ⚠️ *TERMINI DI USO* 〕━━━┫
┃ • Le informazioni presenti in questo Bot e l'uso che ne fai implicano che tu conosca i Termini e le Condizioni, in modo che non ci siano problemi nell'uso delle funzioni del Bot.
┃ • Il Bot contiene materiale che può essere visibile solo a persone di età superiore ai 18 anni. NON siamo responsabili se non rispetti l'età minima per utilizzare il materiale per adulti.
┃ • Le immagini, i video e gli audio presenti in questo Bot sono di uso pubblico, ma si considera mancanza di rispetto effettuare modifiche al materiale esistente che riporta il nome del Bot o informazioni rilevanti.
┃ • Quando fai una richiesta per l'ingresso in un gruppo con un account ufficiale, è consigliabile che il gruppo non contenga temi di odio, virus, contenuti inappropriati, discriminazione o campagne senza fondamento.
┃ • Se ricevi una comunicazione ufficiale da un numero ufficiale, mantieni il rispetto. Allo stesso modo, se ricevi un messaggio senza aver usato un comando, mantieni il rispetto, poiché potrebbe trattarsi di una persona reale.
┃ • Gli account ufficiali di ${botName} non sono responsabili dell'uso che fai della funzione "Sub Bot".
┃
┣━━━〔 📌 *CONDIZIONI DI USO* 〕━━━┫
┃ • NON chiamare o effettuare videochiamate al Bot da numeri ufficiali, poiché ciò ostacola il funzionamento del Bot.
┃ • NON
_- Gli account ufficiali di chatunity-bot non sono responsabili dell'uso che fai della funzione "Sub Bot"._

*CONDIZIONI DI USO*
_- NON chiamare o effettuare videochiamate al Bot da numeri ufficiali, poiché ciò ostacola il funzionamento del Bot._

_- NON utilizzare il Bot da numeri ufficiali per compiere azioni ostili che potrebbero compromettere il funzionamento del Bot._

_- NON utilizzare ripetutamente il comando SPAM, poiché potrebbe causare un malfunzionamento del Bot. Inoltre, non inviare al Bot messaggi che potrebbero comprometterne il funzionamento._

_- Quando utilizzi determinati comandi che hanno l'obiettivo di causare disagio, inquietudine, fastidio o altri termini simili, verranno applicate le rispettive sanzioni o avvisi per preservare l'integrità degli utenti e il funzionamento di chatunity-bot._

*QUESTO È IL REPOSITORIO UFFICIALE*
https://github.com/chatunitycenter/chatunity-bot


*DONA ALLA CREATRICE SU QUESTO ACCOUNT UFFICIALE*
~ _Se apprezzi e valorizzi il lavoro che ho svolto, puoi aiutarmi con una donazione per continuare questo progetto._
*https://paypal.me/chatunity*

*~ Grazie per aver dedicato del tempo a informarti su chatunity-bot*
`.trim();
}
