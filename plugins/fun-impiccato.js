import { createCanvas } from 'canvas';

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 500;
const HANGMAN_WIDTH = 300;
const HANGMAN_HEIGHT = 300;

class HangmanGame {
    constructor(userId, userData) {
        this.userId = userId;
        this.userData = userData;
        this.words = this.getWordList();
        this.currentWord = '';
        this.guessedLetters = [];
        this.wrongLetters = [];
        this.maxAttempts = 6;
        this.attemptsLeft = 6;
        this.gameState = 'waiting'; // waiting, playing, won, lost
        this.betAmount = 0;
        this.prizeMultiplier = 0;
        this.startTime = Date.now();
    }

    getWordList() {
        return [
            'COMPUTER', 'TELEFONO', 'ALBERO', 'SOLE', 'LUNA', 'STELLA',
            'MARE', 'MONTAGNA', 'FIORE', 'ANIMALE', 'LIBRO', 'SCUOLA',
            'AMICO', 'FAMIGLIA', 'CITTA', 'PAESE', 'MACCHINA', 'BICICLETTA',
            'VIAGGIO', 'MUSICA', 'ARTE', 'SPORT', 'GIOCO', 'LAVORO',
            'CASA', 'CUCINA', 'CAMERA', 'GIARDINO', 'TEMPO', 'CIELO',
            'NUVOLA', 'PIOGGIA', 'NEVE', 'VENTO', 'FUOCO', 'ACQUA',
            'TERRA', 'ARIA', 'SOGGIORNO', 'BAGNO', 'LETTO', 'TAVOLO',
            'SEDIA', 'FINESTRA', 'PORTA', 'SPECCHIO', 'QUADRO', 'SCARPALE',
            'VESTITO', 'MAGLIA', 'PANTALONI', 'SCARPE', 'CAPPELLO', 'GUANTI',
            'SCIARPA', 'OROLOGIO', 'OCCHIALI', 'GIOIELLO', 'ANELLO', 'BRACCIALETTO',
            'COLLANA', 'ORECCHINI', 'BORSA', 'ZAINO', 'VALIGIA', 'CARTELLA',
            'PENNA', 'MATITA', 'QUADERNO', 'FOGLIO', 'LIBRO', 'RIVISTA',
            'GIORNALE', 'TELEVISIONE', 'RADIO', 'INTERNET', 'TELEFONO', 'TABLET',
            'APP', 'SOCIAL', 'EMAIL', 'MESSAGGIO', 'CHIAMATA', 'VIDEO',
            'FOTO', 'CAMERA', 'MICROFONO', 'CASSA', 'CUFFIE', 'TASTIERA',
            'MOUSE', 'MONITOR', 'STAMPANTE', 'SCANNER', 'ROUTER', 'CAVO'
        ];
    }

    startGame(betAmount) {
        if (this.gameState === 'playing') return { error: "⚠️ Partita già in corso!" };
        if (betAmount > this.userData.limit) return { error: "💰 Fondi insufficienti!" };

        this.betAmount = betAmount;
        this.userData.limit -= betAmount;
        this.currentWord = this.words[Math.floor(Math.random() * this.words.length)];
        this.guessedLetters = [];
        this.wrongLetters = [];
        this.attemptsLeft = this.maxAttempts;
        this.gameState = 'playing';
        this.prizeMultiplier = 0;

        return { 
            success: true, 
            wordLength: this.currentWord.length,
            attempts: this.attemptsLeft 
        };
    }

    guessLetter(letter) {
        if (this.gameState !== 'playing') return { error: "❌ Nessuna partita in corso!" };
        if (this.guessedLetters.includes(letter) || this.wrongLetters.includes(letter)) {
            return { error: "❌ Lettera già provata!" };
        }

        letter = letter.toUpperCase();
        
        if (this.currentWord.includes(letter)) {
            this.guessedLetters.push(letter);
            
            // Controlla se ha vinto
            const hasWon = this.currentWord.split('').every(char => 
                char === ' ' || this.guessedLetters.includes(char)
            );
            
            if (hasWon) {
                this.calculatePrize();
                this.gameState = 'won';
                return { 
                    success: true, 
                    correct: true, 
                    won: true,
                    prize: this.betAmount * this.prizeMultiplier
                };
            }
            
            return { success: true, correct: true };
        } else {
            this.wrongLetters.push(letter);
            this.attemptsLeft--;
            
            if (this.attemptsLeft === 0) {
                this.gameState = 'lost';
                return { 
                    success: true, 
                    correct: false, 
                    lost: true,
                    word: this.currentWord 
                };
            }
            
            return { success: true, correct: false, attemptsLeft: this.attemptsLeft };
        }
    }

    calculatePrize() {
        const lettersGuessed = this.guessedLetters.length;
        const totalLetters = new Set(this.currentWord.replace(/ /g, '')).size;
        const accuracy = lettersGuessed / totalLetters;
        
        // Moltiplicatore basato sulla precisione e tentativi rimasti
        this.prizeMultiplier = 2 + (accuracy * 3) + (this.attemptsLeft * 0.5);
        this.userData.limit += this.betAmount * this.prizeMultiplier;
    }

    getDisplayWord() {
        return this.currentWord.split('').map(char => 
            char === ' ' ? '   ' : (this.guessedLetters.includes(char) ? char : '_')
        ).join(' ');
    }

    async generateHangmanImage() {
        const canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
        const ctx = canvas.getContext('2d');

        // Sfondo
        const gradient = ctx.createLinearGradient(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        gradient.addColorStop(0, '#2c3e50');
        gradient.addColorStop(1, '#34495e');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        // Titolo
        ctx.fillStyle = '#ecf0f1';
        ctx.font = 'bold 28px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('🎯 IMPICCATO', CANVAS_WIDTH / 2, 40);

        // Disegna la forca
        this.drawGallows(ctx);

        // Disegna l'impiccato in base agli errori
        this.drawHangman(ctx);

        // Parola da indovinare
        const displayWord = this.getDisplayWord();
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 24px Arial';
        ctx.fillText(displayWord, CANVAS_WIDTH / 2, CANVAS_HEIGHT - 120);

        // Lettere sbagliate
        if (this.wrongLetters.length > 0) {
            ctx.fillStyle = '#e74c3c';
            ctx.font = '18px Arial';
            ctx.fillText(`Lettere sbagliate: ${this.wrongLetters.join(', ')}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT - 90);
        }

        // Tentativi rimasti
        ctx.fillStyle = this.attemptsLeft <= 2 ? '#e74c3c' : '#f39c12';
        ctx.font = 'bold 20px Arial';
        ctx.fillText(`Tentativi: ${this.attemptsLeft}/${this.maxAttempts}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT - 60);

        // Info gioco
        ctx.fillStyle = '#bdc3c7';
        ctx.font = '14px Arial';
        ctx.fillText(`💶 Puntata: ${this.formatNumber(this.betAmount)} UC`, CANVAS_WIDTH / 2, CANVAS_HEIGHT - 30);

        if (this.gameState === 'won') {
            ctx.fillStyle = '#27ae60';
            ctx.font = 'bold 18px Arial';
            ctx.fillText(`🎉 VINTO: ${this.formatNumber(this.betAmount * this.prizeMultiplier)} UC!`, CANVAS_WIDTH / 2, CANVAS_HEIGHT - 150);
        } else if (this.gameState === 'lost') {
            ctx.fillStyle = '#e74c3c';
            ctx.font = 'bold 18px Arial';
            ctx.fillText(`💀 Parola: ${this.currentWord}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT - 150);
        }

        return canvas.toBuffer('image/png');
    }

    drawGallows(ctx) {
        const centerX = CANVAS_WIDTH / 2;
        const gallowsTop = 80;
        const gallowsLeft = centerX - 100;
        const gallowsRight = centerX + 100;
        const gallowsBottom = 300;

        ctx.strokeStyle = '#8B4513';
        ctx.lineWidth = 8;
        ctx.lineCap = 'round';

        // Base
        ctx.beginPath();
        ctx.moveTo(gallowsLeft, gallowsBottom);
        ctx.lineTo(gallowsRight, gallowsBottom);
        ctx.stroke();

        // Palo verticale
        ctx.beginPath();
        ctx.moveTo(centerX, gallowsBottom);
        ctx.lineTo(centerX, gallowsTop);
        ctx.stroke();

        // Trave orizzontale
        ctx.beginPath();
        ctx.moveTo(centerX, gallowsTop);
        ctx.lineTo(centerX + 80, gallowsTop);
        ctx.stroke();

        // Corda
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(centerX + 80, gallowsTop);
        ctx.lineTo(centerX + 80, gallowsTop + 40);
        ctx.stroke();
    }

    drawHangman(ctx) {
        const headX = CANVAS_WIDTH / 2 + 80;
        const headY = 120;
        const errors = this.maxAttempts - this.attemptsLeft;

        ctx.strokeStyle = '#ecf0f1';
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';

        if (errors >= 1) {
            // Testa
            ctx.beginPath();
            ctx.arc(headX, headY, 20, 0, Math.PI * 2);
            ctx.stroke();
        }

        if (errors >= 2) {
            // Corpo
            ctx.beginPath();
            ctx.moveTo(headX, headY + 20);
            ctx.lineTo(headX, headY + 80);
            ctx.stroke();
        }

        if (errors >= 3) {
            // Braccio sinistro
            ctx.beginPath();
            ctx.moveTo(headX, headY + 40);
            ctx.lineTo(headX - 30, headY + 20);
            ctx.stroke();
        }

        if (errors >= 4) {
            // Braccio destro
            ctx.beginPath();
            ctx.moveTo(headX, headY + 40);
            ctx.lineTo(headX + 30, headY + 20);
            ctx.stroke();
        }

        if (errors >= 5) {
            // Gamba sinistra
            ctx.beginPath();
            ctx.moveTo(headX, headY + 80);
            ctx.lineTo(headX - 25, headY + 120);
            ctx.stroke();
        }

        if (errors >= 6) {
            // Gamba destra
            ctx.beginPath();
            ctx.moveTo(headX, headY + 80);
            ctx.lineTo(headX + 25, headY + 120);
            ctx.stroke();

            // Faccia triste
            ctx.beginPath();
            ctx.arc(headX - 8, headY - 5, 3, 0, Math.PI * 2); // Occhio sinistro
            ctx.arc(headX + 8, headY - 5, 3, 0, Math.PI * 2); // Occhio destro
            ctx.stroke();
            
            ctx.beginPath();
            ctx.arc(headX, headY + 5, 8, 0.2 * Math.PI, 0.8 * Math.PI); // Bocca triste
            ctx.stroke();
        }
    }

    formatNumber(num) {
        return new Intl.NumberFormat('it-IT').format(num);
    }
}

global.hangmanGames = global.hangmanGames || {};
let cooldowns = {};

let handler = async (m, { conn, usedPrefix, text }) => {
    const chat = m.chat;
    const userId = m.sender;
    const user = global.db.data.users[userId];

    if (!user) return conn.reply(m.chat, '❌ Utente non trovato nel database!', m);

    // Gestione comandi
    const args = text.trim().split(' ');
    const command = args[0]?.toUpperCase();

    if (!global.hangmanGames[userId]) {
        global.hangmanGames[userId] = new HangmanGame(userId, user);
    }

    const game = global.hangmanGames[userId];

    if (command === 'START' || command === 'INIZIA') {
        const betAmount = parseInt(args[1]) || 100;
        
        if (cooldowns[userId] && Date.now() - cooldowns[userId] < 5000) {
            const remaining = Math.ceil((cooldowns[userId] + 5000 - Date.now()) / 1000);
            return conn.reply(m.chat, `⏰ Aspetta ${remaining} secondi prima di iniziare una nuova partita!`, m);
        }

        const result = game.startGame(betAmount);
        if (result.error) return conn.reply(m.chat, result.error, m);

        cooldowns[userId] = Date.now();

        const image = await game.generateHangmanImage();
        const caption = `🎯 *IMPICCATO - PARTITA INIZIATA!*\n\n` +
                       `📏 Parola da ${result.wordLength} lettere\n` +
                       `💶 Puntata: ${game.formatNumber(betAmount)} UC\n` +
                       `❤️ Tentativi: ${result.attempts}\n\n` +
                       `💡 Inviami una lettera per indovinare!\n` +
                       `⚡ Esempio: ${usedPrefix}hangman A`;

        await conn.sendMessage(chat, {
            image: image,
            caption: caption,
            footer: 'Impiccato 🎯'
        }, { quoted: m });

    } else if (/^[A-Z]$/i.test(command)) {
        // Indovina una lettera
        if (game.gameState !== 'playing') {
            return conn.reply(m.chat, '❌ Nessuna partita in corso! Usa .hangman start', m);
        }

        const result = game.guessLetter(command);
        if (result.error) return conn.reply(m.chat, result.error, m);

        const image = await game.generateHangmanImage();
        let caption = `🎯 *IMPICCATO*\n\n`;

        if (result.won) {
            caption += `🎉 *HAI VINTO!*\n` +
                      `💰 Vincita: ${game.formatNumber(result.prize)} UC\n` +
                      `✨ Moltiplicatore: x${game.prizeMultiplier.toFixed(1)}\n` +
                      `🏆 Parola: ${game.currentWord}`;
        } else if (result.lost) {
            caption += `💀 *HAI PERSO!*\n` +
                      `📝 Parola: ${result.word}\n` +
                      `😔 Ritenta!`;
        } else {
            caption += `📝 ${game.getDisplayWord()}\n` +
                      `❤️ Tentativi: ${game.attemptsLeft}/${game.maxAttempts}\n` +
                      `❌ Errori: ${game.wrongLetters.join(', ') || 'Nessuno'}\n\n` +
                      `💡 ${result.correct ? '✅ Lettera corretta!' : '❌ Lettera sbagliata!'}`;
        }

        caption += `\n💶 Puntata: ${game.formatNumber(game.betAmount)} UC`;

        const buttons = [
            { buttonId: `${usedPrefix}hangman start 100`, buttonText: { displayText: "🎯 Nuova Partita" }, type: 1 }
        ];

        await conn.sendMessage(chat, {
            image: image,
            caption: caption,
            footer: 'Impiccato 🎯',
            buttons: game.gameState !== 'playing' ? buttons : undefined
        }, { quoted: m });

    } else if (command === 'SVELA' || command === 'RIVELA') {
        if (game.gameState !== 'playing') {
            return conn.reply(m.chat, '❌ Nessuna partita in corso!', m);
        }

        game.gameState = 'lost';
        const image = await game.generateHangmanImage();
        
        const caption = `🎯 *IMPICCATO - PARTITA CONCLUSA*\n\n` +
                       `💀 Hai abbandonato!\n` +
                       `📝 La parola era: ${game.currentWord}\n` +
                       `💶 Puntata persa: ${game.formatNumber(game.betAmount)} UC`;

        const buttons = [
            { buttonId: `${usedPrefix}hangman start 100`, buttonText: { displayText: "🎯 Nuova Partita" }, type: 1 }
        ];

        await conn.sendMessage(chat, {
            image: image,
            caption: caption,
            footer: 'Impiccato 🎯',
            buttons: buttons
        }, { quoted: m });

    } else {
        // Help
        const helpText = `🎯 *IMPICCATO - COMANDI*\n\n` +
                        `🔄 ${usedPrefix}hangman start [puntata] - Inizia nuova partita\n` +
                        `🔤 ${usedPrefix}hangman [lettera] - Indovina una lettera\n` +
                        `🏳️ ${usedPrefix}hangman svela - Abbandona la partita\n\n` +
                        `💡 Esempi:\n` +
                        `${usedPrefix}hangman start 500\n` +
                        `${usedPrefix}hangman A\n` +
                        `${usedPrefix}hangman svela`;

        await conn.sendMessage(chat, {
            text: helpText,
            footer: 'Impiccato 🎯'
        }, { quoted: m });
    }
};

handler.help = ['hangman [start/lettera/svela]'];
handler.tags = ['games'];
handler.command = /^hangman$/i;
handler.group = true;
handler.register = true;

export default handler;
