import axios from 'axios';

// --- CONFIGURAZIONE API ---
// Usiamo un'API pubblica stabile per Spotify (Delirius API o simili)
const SEARCH_API = 'https://delirius-api-oficial.vercel.app/api/search/spotify?q=';
const DOWNLOAD_API = 'https://delirius-api-oficial.vercel.app/api/download/spotify?url=';

// --- FUNZIONE DI DOWNLOAD ---
async function spotifyDownload(url, m, conn, title) {
    // Messaggio di attesa
    const waitMsg = await conn.sendMessage(m.chat, { text: `🎧 Scarico da Spotify: *${title}*...` }, { quoted: m });

    try {
        // 1. Richiedi il link di download
        const { data } = await axios.get(`${DOWNLOAD_API}${url}`);
        
        // Verifica se l'API ha risposto correttamente
        if (!data || !data.status || !data.data || !data.data.url) {
            throw new Error("L'API non ha restituito un link valido.");
        }

        const downloadUrl = data.data.url; // Link diretto MP3
        const coverImage = data.data.image; // Copertina album
        const artist = data.data.artist;

        // 2. Invia l'audio
        await conn.sendMessage(m.chat, { 
            audio: { url: downloadUrl }, 
            mimetype: "audio/mpeg",
            fileName: `${title}.mp3`,
            contextInfo: {
                externalAdReply: {
                    title: title,
                    body: `Artista: ${artist}`,
                    thumbnailUrl: coverImage,
                    sourceUrl: url,
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        }, { quoted: m });

        // Cancella messaggio di attesa (opzionale, o invia conferma)
        await conn.sendMessage(m.chat, { text: `✅ *${title}* inviato!`, edit: waitMsg.key });

    } catch (e) {
        console.error(`[SpotifyDL] Errore: ${e.message}`);
        await conn.sendMessage(m.chat, { text: `❌ Errore nel download da Spotify.\nRiprova più tardi.`, edit: waitMsg.key });
    }
}

// --- HANDLER PRINCIPALE ---
const handler = async (m, { conn, text: rawText, usedPrefix }) => {
    try {
        // Parsing Input
        const btnId = m?.message?.listResponseMessage?.singleSelectReply?.selectedRowId || "";
        const text = m.text || btnId || rawText || "";
        
        const command = text.replace(usedPrefix, "").trim().split(/\s+/)[0].toLowerCase();
        
        // Permettiamo sia .play che .spotify
        if (!['play', 'spotify', 'song'].includes(command)) return;

        const argsString = text.replace(new RegExp(`^${usedPrefix}(play|spotify|song)\\s*`), "").trim();

        // --- CASO 1: DOWNLOAD DIRETTO (Dal click della lista) ---
        if (argsString.startsWith('sp_dl_')) {
            // Formato ID: sp_dl_URL_TITOLO
            const parts = argsString.substring('sp_dl_'.length).split('|||'); // Uso ||| come separatore sicuro
            const url = parts[0];
            const title = parts[1] || 'Canzone Spotify';

            await spotifyDownload(url, m, conn, title);
            return;
        }

        // --- CASO 2: RICERCA ---
        if (!argsString) {
            return m.reply(`💚 *Spotify Play*\nScrivi il titolo di una canzone.\n\nEsempio:\n*${usedPrefix}play* Blinding Lights`);
        }

        await m.reply(`🔍 Cerco "*${argsString}*" su Spotify...`);

        // Chiamata API Ricerca
        const { data } = await axios.get(`${SEARCH_API}${encodeURIComponent(argsString)}`);

        if (!data || !data.status || !data.data || data.data.length === 0) {
            return m.reply('❌ Nessun risultato trovato su Spotify.');
        }

        // Prendiamo i primi 8 risultati
        const results = data.data.slice(0, 8);

        const listRows = results.map((track, index) => ({
            title: `${index + 1}. ${track.title}`,
            description: `👤 ${track.artist} | ⏱ ${track.duration}`,
            // ID univoco per il download:
            rowId: `${usedPrefix}play sp_dl_${track.url}|||${track.title}`
        }));

        const infoMessage = `
💚 *RISULTATI SPOTIFY* 💚
━━━━━━━━━━━━━━━━━━━
Ho trovato *${results.length}* brani.
Scegli quale scaricare:
━━━━━━━━━━━━━━━━━━━
`;

        const listSections = [{
            title: "Top Risultati Spotify",
            rows: listRows
        }];

        // Invio List Message
        await conn.sendMessage(m.chat, {
            text: infoMessage.trim(),
            title: 'Spotify Player',
            buttonText: '🎵 Apri Lista',
            sections: listSections,
            listType: 1
        }, { quoted: m });

    } catch (error) {
        console.error("Errore Spotify Plugin:", error);
        m.reply("⚠ Errore nel plugin Spotify.");
    }
};

handler.command = ['play', 'spotify', 'song'];
handler.tags = ['media'];
handler.help = ['.play <titolo>'];

export default handler;