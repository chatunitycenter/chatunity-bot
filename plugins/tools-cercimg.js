import { googleImage } from '@bochilteam/scraper';
import { existsSync } from 'fs';
import axios from 'axios';

const forbiddenWords = [
    "esempio_termine_vietato"
];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }
}

const handler = async (message, { conn, text, usedPrefix, command }) => {
    const requiredFiles = [
        './termini.jpeg',
        './plugins/OWNER_file.js', 
        './CODE_OF_CONDUCT.md',
        './bal.png'
    ];
    
    for (const file of requiredFiles) {
        if (!existsSync(file)) {
            return conn.reply(message.chat, 'Questo comando è disponibile solo con la base di ChatUnity.', message);
        }
    }
    
    const searchTerm = text || message.quoted?.text;
    
    if (!searchTerm) {
        return conn.reply(
            message.chat, 
            `> ⓘ Uso del comando:\n> ${usedPrefix}${command} <parola chiave>`, 
            message
        );
    }
    
    const aiPrompt = `
Controlla se nel seguente testo è presente un termine inappropriato o ostile, in qualsiasi lingua:

"${searchTerm}"

Se contiene contenuti sessuali, violenti, razzisti, illegali, deepfake, o simili, rispondi solo con "vietato", altrimenti rispondi "ok".
`;
    
    try {
        const aiResponse = await axios.post('https://luminai.my.id', {
            content: aiPrompt,
            user: message.pushName || 'utente',
            prompt: 'Rispondi con una singola parola.',
            webSearchMode: false
        });
        
        const result = aiResponse.data?.result?.toLowerCase();
        
        if (result.includes('vietato')) {
            return conn.reply(message.chat, '⚠ Contenuto non permesso.', message);
        }
    } catch (error) {
        console.log('Filtro GPT fallito, fallback su lista manuale.');
        
        if (forbiddenWords.some(word => searchTerm.toLowerCase().includes(word))) {
            return conn.reply(message.chat, '⚠ Questo contenuto non è permesso.', message);
        }
    }
    
    const randomNum = Math.floor(Math.random() * 1000);
    const enhancedSearchTerm = searchTerm + ' ' + randomNum;
    
    const searchResults = await googleImage(enhancedSearchTerm);
    
    if (!searchResults || searchResults.length === 0) {
        return conn.reply(message.chat, 'Nessuna immagine trovata 😢', message);
    }
    
    shuffle(searchResults);
    
    const selectedImages = searchResults.slice(0, 10);
    
    const imageCards = selectedImages.map((imageUrl, index) => ({
        image: { url: imageUrl },
        title: `Immagine #${index + 1}`,
        body: `Risultato per: ${searchTerm}`,
        footer: 'Powered by ChatUnity',
        buttons: [{
            name: 'cta_url',
            buttonParamsJson: JSON.stringify({
                display_text: 'Apri immagine',
                url: imageUrl
            })
        }]
    }));
    
    await conn.sendMessage(message.chat, {
        text: `🔍 Risultati per: ${searchTerm}`,
        title: 'Risultati immagini',
        subtitle: 'Ecco le immagini trovate su Google',
        footer: 'Powered by ChatUnity',
        cards: imageCards
    }, { quoted: message });
    
    await conn.sendMessage(message.chat, {
        text: '🔄 Vuoi cercare altre immagini con lo stesso termine?',
        footer: 'Powered by ChatUnity',
        buttons: [{
            buttonId: usedPrefix + 'cercaimmagine ' + searchTerm,
            buttonText: { displayText: 'Cerca di nuovo' },
            type: 1
        }],
        headerType: 1
    }, { quoted: message });
};

handler.command = ['cercaimmagine'];

export default handler;