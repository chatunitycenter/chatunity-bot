import youtubedl from 'youtube-dl-exec';
import fs from 'fs';
import path from 'path';
import ytSearch from 'yt-search';

const videoInfoCache = new Map();
const CACHE_TTL = 15 * 60 * 1000;
const A = [
    '251',
    '140',
    '250',
    '249',
    '139',
    'bestaudio[ext=webm]/bestaudio[ext=m4a]/bestaudio',
    'best[height<=720][ext=mp4]/best[ext=mp4]'
];
const V = [
    '22',
    '136+140',
    '298+140',
    '135+140',
    '18',
    '134+140',
    'best[height<=1080][ext=mp4]/best[ext=mp4]/best[height<=720]'
];
const tmpDir = path.join(process.cwd(), 'temp');
if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir);
}

async function downloadWithYtDlExec(url, options) {
    const ytdlOptions = {
        noWarnings: true,
        noCheckCertificate: true,
        preferFreeFormats: false,
        socketTimeout: 30,
        retries: 5,
        forceIpv4: true,
        addHeader: ['referer:youtube.com', 'user-agent:googlebot'],
        concurrentFragments: 10,
        noPlaylist: true
    };
    
    if (options.format) ytdlOptions.format = options.format;
    if (options.output) ytdlOptions.output = options.output;
    if (options.extractAudio) {
        ytdlOptions.extractAudio = true;
        if (options.audioFormat) ytdlOptions.audioFormat = options.audioFormat;
        if (options.audioQuality) ytdlOptions.audioQuality = options.audioQuality;
        ytdlOptions.keepVideo = false;
    }
    if (options.maxFilesize) ytdlOptions.maxFilesize = options.maxFilesize;
    if (options.cookies) ytdlOptions.cookies = options.cookies;
    
    return await youtubedl(url, ytdlOptions);
}

async function getVideoInfoYtDlExec(url) {
    try {
        const info = await youtubedl(url, {
            dumpJson: true,
            noDownload: true,
            noWarnings: true
        });
        
        return {
            title: info.title || 'Video YouTube',
            uploader: info.uploader || info.channel || 'Sconosciuto',
            duration: info.duration_string || (info.duration ? new Date(info.duration * 1000).toISOString().substr(11, 8) : '?'),
            view_count: info.view_count,
            upload_date: info.upload_date,
            thumbnail: info.thumbnail,
            id: info.id,
            webpage_url: info.webpage_url || url
        };
    } catch (error) {
        const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1];
        return {
            title: 'Video YouTube',
            uploader: 'YouTube',
            duration: '?',
            view_count: null,
            upload_date: null,
            thumbnail: videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null,
            id: videoId,
            webpage_url: url
        };
    }
}

let handler = async (m, { conn, command, text, usedprefix }) => {
    const prefix = usedprefix || '.';
    
    if (!text) {
        const helpMessage = `
*╭─ׄ✦☾⋆⁺₊✧ chatunity ✧₊⁺⋆☽✦─ׅ⭒*
*├* 『 ⁉️ 』 _Comandi disponibili:_
*├* *├* \`${prefix}play\` _<nome/url>_
*├* ↳ 『 🎵 』- *Scarica audio veloce*
*├*
*├* \`${prefix}playaudio\` _<nome/url>_
*├* ↳ 『 🎶 』- *Scarica solo l'audio*
*├*
*├* \`${prefix}playvideo\`  _<nome/url>_
*├* ↳ 『 🎥 』- *Scarica video*
*├*
*├* 『 🍥 』- \`Esempi:\`
*├* _${prefix}play Charge me Future_
*├* _${prefix}playaudio https://youtu.be/gLNpPiUpJ4w_
*╰⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*
> \`vare ✧ bot\``;
        await conn.reply(m.chat, helpMessage.trim(), m);
        return;
    }

    await conn.sendPresenceUpdate(command === 'play' ? 'composing' : 'recording', m.chat);
    const isSearchQuery = !text.startsWith('http');

    try {
        if (!isSearchQuery) {
            await downloadMedia(m, conn, command, text, prefix, null, isSearchQuery);
            return;
        }

        const searchKey = `search_${text.toLowerCase()}`;
        let searchResults = null;

        if (videoInfoCache.has(searchKey) && (Date.now() - videoInfoCache.get(searchKey).timestamp < CACHE_TTL)) {
            searchResults = videoInfoCache.get(searchKey).data;
        } else {
            const search = await ytSearch(text);
            if (!search.videos.length) throw '❌ *Nessun risultato trovato!*';
            searchResults = search.videos.slice(0, 5);
            videoInfoCache.set(searchKey, { data: searchResults, timestamp: Date.now() });
        }
        
        if (command === 'playaudio' || command === 'playvideo') {
            const firstVideo = searchResults[0];
            let videoInfo = null;
            
            try {
                videoInfo = await getVideoInfoYtDlExec(firstVideo.url);
                if (videoInfo.id) {
                    videoInfoCache.set(`info_${videoInfo.id}`, { data: videoInfo, timestamp: Date.now() });
                }
            } catch (error) {
                videoInfo = {
                    title: firstVideo.title || 'Video YouTube',
                    uploader: firstVideo.author?.name || 'Sconosciuto',
                    duration: firstVideo.duration?.timestamp || firstVideo.duration || '?',
                    view_count: firstVideo.views,
                    upload_date: null,
                    thumbnail: firstVideo.thumbnail || `https://img.youtube.com/vi/${firstVideo.videoId}/maxresdefault.jpg`,
                    id: firstVideo.videoId,
                    webpage_url: firstVideo.url
                };
            }

            if (videoInfo) {
                const title = videoInfo.title.replace(/[<>:"/\\|?*]/g, '_').substring(0, 40);
                const author = videoInfo.uploader.substring(0, 25);
                const views = videoInfo.view_count ? parseInt(videoInfo.view_count).toLocaleString() : '?';
                const duration = videoInfo.duration;
                
                let uploadDate = '?';
                if (videoInfo.upload_date) {
                    const dateStr = videoInfo.upload_date;
                    uploadDate = `${dateStr.substring(6, 8)}/${dateStr.substring(4, 6)}/${dateStr.substring(0, 4)}`;
                }

                const thumbnailUrl = videoInfo.thumbnail || `https://img.youtube.com/vi/${videoInfo.id}/maxresdefault.jpg`;

                const captionMessage = `
*╭─ׄ✦☾⋆⁺₊✧ 𝓿𝓪𝓻𝓮𝓫𝓸𝓽 ✧₊⁺⋆☽✦─ׅ⭒*
*├* \`\`\`${title}\`\`\`
*├* 👤 \`Autore:\` *${author}*
*├* 👁️ \`Views:\` *${views}*
*├* ⏱️ \`Durata:\` *${duration}*
*├* 📅 \`Upload:\` *${uploadDate}*
*╰⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*
> \`Download in corso...\``;
                await conn.sendMessage(m.chat, { 
                    image: { url: thumbnailUrl }, 
                    caption: captionMessage.trim(),
                    footer: '> \`vare ✧ bot\`',
                    contextInfo: global.fake?.contextInfo
                }, { quoted: m });
            }
            await downloadMedia(m, conn, command, firstVideo.url, prefix, videoInfo, isSearchQuery);
            return;
        }
        const cardsPromises = searchResults.map(async (video, index) => {
            const duration = video.duration?.timestamp || video.duration || '?';
            const views = video.views?.toLocaleString() || '?';
            const author = video.author?.name || 'Sconosciuto';
            const thumbnailUrl = video.thumbnail || `https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`;
            const shortTitle = video.title.substring(0, 55) + (video.title.length > 55 ? '...' : '');

            return {
                image: { url: thumbnailUrl },
                title: `${index + 1}. ${shortTitle}`,
                body: `『 👤 』 *${author}*\n『 ⏱️ 』 *${duration}* ✬ 『 👁️ 』 *${views}*`,
                footer: `Risultato ${index + 1} di ${searchResults.length}`,
                buttons: [
                    {
                        name: 'cta_url',
                        buttonParamsJson: JSON.stringify({
                            display_text: '📲 Apri su YouTube',
                            url: video.url
                        })
                    },
                    {
                        name: 'cta_copy',
                        buttonParamsJson: JSON.stringify({
                            display_text: '📎 Copia link',
                            copy_code: video.url
                        })
                    }
                ]
            };
        });

        const cards = await Promise.all(cardsPromises);

        await conn.sendMessage(
            m.chat,
            {
                text: `『 🔍 』 *Risultati trovati per:*\n- ↳ *\`${text}\`*`,
                footer: 'vare ✧ bot',
                cards: cards
            },
            { quoted: m }
        );

        const interactiveButtons = searchResults.map((video, index) => {
            const shortTitle = video.title.substring(0, 20) + (video.title.length > 20 ? '...' : '');
            return [shortTitle, `${prefix}playaudio ${video.url}`];
        });

        await conn.sendButton(
            m.chat,
            `『 🎵 』 *Scegli per scaricare l'audio:*`,
            '',
            '',
            interactiveButtons,
            [],
            [],
            [],
            m,
        );

    } catch (e) {
        await conn.reply(m.chat, typeof e === 'string' ? e : '❌ *Errore durante la ricerca!*', m);
    } finally {
        await conn.sendPresenceUpdate('paused', m.chat);
    }
};

async function downloadMedia(m, conn, command, url, prefix, preloadedVideoInfo = null, isSearchQuery = false) {
    try {
        let videoInfo = preloadedVideoInfo || await getVideoInfoYtDlExec(url);
        if (videoInfo && videoInfo.id) {
            videoInfoCache.set(`info_${videoInfo.id}`, { data: videoInfo, timestamp: Date.now() });
        }

        const cookiesPath = path.join(process.cwd(), 'cookies.txt');
        const downloadOptions = {
            maxFilesize: '100M',
            ...(fs.existsSync(cookiesPath) && { cookies: cookiesPath })
        };

        const tmpFile = path.join(tmpDir, `${command}_${Date.now()}.${(command === 'playvideo') ? 'mp4' : 'mp3'}`);
        downloadOptions.output = tmpFile;
        
        if (command === 'play' || command === 'playaudio') {
            downloadOptions.extractAudio = true;
            downloadOptions.audioFormat = 'mp3';
            downloadOptions.audioQuality = '1';
        }

        const formats = (command === 'playvideo') ? V : A;
        let downloaded = false;
        let lastError = null;
        const downloadAttempts = formats.slice(0, 3).map(async (format, index) => {
            const attemptOptions = { ...downloadOptions, format };
            
            if (command === 'play' || command === 'playaudio') {
                attemptOptions.extractAudio = true;
                attemptOptions.audioFormat = 'mp3';
                attemptOptions.audioQuality = '0';
            } else {
                delete attemptOptions.extractAudio;
                delete attemptOptions.audioFormat;
                delete attemptOptions.audioQuality;
            }
            
            try {
                await downloadWithYtDlExec(url, attemptOptions);
                return { success: true, format, index };
            } catch (error) {
                return { success: false, error, format, index };
            }
        });

        try {
            const results = await Promise.allSettled(downloadAttempts);
            const successResult = results.find(result => 
                result.status === 'fulfilled' && result.value.success
            );
            
            if (successResult) {
                downloaded = true;
            } else {
                for (let i = 3; i < formats.length; i++) {
                    const format = formats[i];
                    try {
                        const fallbackOptions = { ...downloadOptions, format };
                        
                        if (command === 'play' || command === 'playaudio') {
                            fallbackOptions.extractAudio = true;
                            fallbackOptions.audioFormat = 'mp3';
                            fallbackOptions.audioQuality = '0';
                        } else {
                            delete fallbackOptions.extractAudio;
                            delete fallbackOptions.audioFormat;
                            delete fallbackOptions.audioQuality;
                        }
                        
                        await downloadWithYtDlExec(url, fallbackOptions);
                        downloaded = true;
                        break;
                    } catch (err) {
                        lastError = err;
                    }
                }
            }
        } catch (error) {
            lastError = error;
        }

        if (!downloaded) {
            throw new Error(`Download fallito dopo tutti i tentativi. Ultimo errore: ${lastError?.message || 'Sconosciuto'}`);
        }
        const buffer = await fs.promises.readFile(tmpFile);
        await fs.promises.unlink(tmpFile).catch(() => {});
        
        if (command === 'playvideo') {
            const fileName = videoInfo ? `${videoInfo.title.replace(/[<>:"/\\|?*]/g, '_').substring(0, 40)}.mp4` : 'video.mp4';
            const videoButtons = [
                {
                    name: 'quick_reply',
                    buttonParamsJson: JSON.stringify({
                        display_text: '🎵 Scarica audio',
                        id: `${prefix}playaudio ${url}`
                    })
                }
            ];

            await conn.sendMessage(m.chat, {
                video: buffer,
                mimetype: 'video/mp4',
                fileName: fileName,
                caption: `> \`vare ✧ bot\``,
                footer: '',
                interactiveButtons: videoButtons,
                contextInfo: {...global.fake?.contextInfo}
            }, { quoted: m });
        } else {
            const fileName = videoInfo ? `${videoInfo.title.replace(/[<>:"/\\|?*]/g, '_').substring(0, 40)}.mp3` : 'audio.mp3';
            await conn.sendMessage(m.chat, {
                audio: buffer,
                mimetype: 'audio/mpeg',
                fileName: fileName,
                ptt: false,
                contextInfo: {
                    ...global.fake?.contextInfo,
                    externalAdReply: {
                        ...global.fake?.contextInfo?.externalAdReply,
                        title: videoInfo ? videoInfo.title : 'Audio',
                        body: '⋆⭑˚₊ 𝓥𝓪𝓻𝓮𝓫𝓸𝓽 ₊˚⭑⋆',
                        thumbnailUrl: videoInfo ? videoInfo.thumbnail : 'https://img.youtube.com/vi/default/maxresdefault.jpg',
                        sourceUrl: null,
                        mediaType: 2,
                        renderLargerThumbnail: false
                    }
                }
            }, { quoted: m });
        }
    } catch (e) {
        const errorMessage = e.message?.includes('Sign in') ? `${global.errore}` :
            e.message?.includes('unavailable') ? '『 ❌ 』- \`Video non disponibile\`' :
            e.message?.includes('private') ? '『 🔒 』- \`Video privato\`' :
            e.message?.includes('age') ? '『 🔞 』- \`Video con restrizioni di età\`' :
            e.message?.includes('maxFilesize') ? '『 📁 』- \`File troppo grande (max 100MB)\`' :
            e.message?.includes('Timeout') || e.message?.includes('timeout') ? '『 ⏱️ 』- \`Timeout - riprova\`' : 
            e.message?.includes('formats') ? '『 📺 』- \`Formato non supportato - riprova\`' :
            e.message?.includes('network') ? '『 🌐 』- \`Errore di rete - riprova\`' :
            '『 ❌ 』- \`Download fallito - riprova con URL diverso\`';
        await conn.reply(m.chat, errorMessage, m);
    }
}

setInterval(() => {
    const now = Date.now();
    for (const [key, value] of videoInfoCache.entries()) {
        if (now - value.timestamp > CACHE_TTL) videoInfoCache.delete(key);
    }
}, 3 * 60 * 1000);

handler.help = ['play', 'playaudio', 'playvideo', 'ytmp4', 'play2'];
handler.tags = ['downloader'];
handler.command = ['play', 'playaudio', 'playvideo', 'ytmp4', 'play2'];
handler.register = true;

export default handler;
