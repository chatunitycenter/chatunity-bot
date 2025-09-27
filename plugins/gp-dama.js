import { createCanvas } from 'canvas';

class DamaGame {
    constructor(playerId) {
        this.board = this.initializeBoard();
        this.currentPlayer = 'B'; // B: Bianco, N: Nero
        this.selectedPiece = null;
        this.validMoves = [];
        this.mustCapture = false;
        this.gameOver = false;
        this.winner = null;
        this.playerId = playerId;
        this.startTime = Date.now();
        this.id = null;
        this.timeoutId = null;
    }

    initializeBoard() {
        // Creazione della scacchiera 8x8
        const board = Array(8).fill().map(() => Array(8).fill(null));
        
        // Posizionamento delle pedine iniziali
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                // Le pedine si trovano solo sulle caselle scure
                if ((row + col) % 2 === 1) {
                    if (row < 3) {
                        board[row][col] = { type: 'pedina', color: 'N' };
                    } else if (row > 4) {
                        board[row][col] = { type: 'pedina', color: 'B' };
                    }
                }
            }
        }
        return board;
    }

    selectPiece(row, col) {
        if (this.gameOver) return { error: "La partita è già terminata!" };
        
        const piece = this.board[row][col];
        if (!piece || piece.color !== this.currentPlayer) {
            return { error: "Seleziona una tua pedina!" };
        }

        // Trova tutte le mosse possibili (con priorità alle catture)
        const allMoves = this.findValidMoves(row, col);
        
        // Se ci sono catture obbligatorie in altre posizioni, devi catturare
        if (this.mustCapture && !allMoves.some(move => move.captures.length > 0)) {
            return { error: "Devi effettuare una cattura se possibile!" };
        }

        this.selectedPiece = { row, col };
        this.validMoves = allMoves;
        
        return { success: true, moves: allMoves };
    }

    findValidMoves(row, col) {
        const piece = this.board[row][col];
        if (!piece) return [];
        
        const moves = [];
        const directions = [];
        
        // Determina le direzioni in base al tipo di pezzo e al colore
        if (piece.type === 'dama') {
            directions.push([-1, -1], [-1, 1], [1, -1], [1, 1]);
        } else {
            // Pedine normali muovono in avanti rispetto al loro colore
            if (piece.color === 'B') {
                directions.push([-1, -1], [-1, 1]);
            } else {
                directions.push([1, -1], [1, 1]);
            }
        }
        
        // Cerca mosse normali e catture
        for (const [dr, dc] of directions) {
            this.checkDirection(row, col, dr, dc, piece, moves, []);
        }
        
        // Se ci sono catture, restituisci solo quelle (le catture sono obbligatorie)
        const captures = moves.filter(move => move.captures.length > 0);
        if (captures.length > 0) {
            return captures;
        }
        
        return moves;
    }

    checkDirection(row, col, dr, dc, piece, moves, captures, isCaptureSequence = false) {
        const newRow = row + dr;
        const newCol = col + dc;
        
        // Controlla se siamo fuori dalla scacchiera
        if (newRow < 0 || newRow >= 8 || newCol < 0 || newCol >= 8) return;
        
        const targetCell = this.board[newRow][newCol];
        
        if (!targetCell) {
            // Casella vuota - mossa valida
            if (!isCaptureSequence || captures.length > 0) {
                moves.push({
                    row: newRow,
                    col: newCol,
                    captures: [...captures],
                    becomesDama: this.shouldBecomeDama(newRow, piece.color)
                });
            }
            
            // Per le pedine normali, solo un passo (a meno che non sia una sequenza di cattura)
            if (piece.type === 'pedina' && captures.length === 0) return;
            
            // Per le dama o durante una cattura, continua a controllare
            if (piece.type === 'dama' || isCaptureSequence) {
                this.checkDirection(newRow, newCol, dr, dc, piece, moves, captures, isCaptureSequence);
            }
        } else if (targetCell.color !== piece.color) {
            // C'è un pezzo avversario - controlla se possiamo catturarlo
            const jumpRow = newRow + dr;
            const jumpCol = newCol + dc;
            
            // Controlla se possiamo saltare oltre il pezzo avversario
            if (jumpRow >= 0 && jumpRow < 8 && jumpCol >= 0 && jumpCol < 8 && 
                !this.board[jumpRow][jumpCol]) {
                
                // Aggiungi questa cattura alla lista
                const newCaptures = [...captures, { row: newRow, col: newCol }];
                
                // Prosegui con la sequenza di cattura
                this.checkDirection(jumpRow, jumpCol, dr, dc, piece, moves, newCaptures, true);
                
                // Per le dama, controlla anche altre direzioni dopo la cattura
                if (piece.type === 'dama') {
                    const otherDirections = [
                        [-dr, -dc], [-dr, dc], [dr, -dc]
                    ].filter(([r, c]) => r !== dr || c !== dc);
                    
                    for (const [odr, odc] of otherDirections) {
                        this.checkDirection(jumpRow, jumpCol, odr, odc, piece, moves, newCaptures, true);
                    }
                }
            }
        }
    }

    shouldBecomeDama(row, color) {
        return (color === 'B' && row === 0) || (color === 'N' && row === 7);
    }

    movePiece(toRow, toCol) {
        if (this.gameOver) return { error: "La partita è già terminata!" };
        if (!this.selectedPiece) return { error: "Devi prima selezionare una pedina!" };
        
        const { row: fromRow, col: fromCol } = this.selectedPiece;
        const move = this.validMoves.find(m => m.row === toRow && m.col === toCol);
        
        if (!move) return { error: "Mossa non valida!" };
        
        // Esegui la mossa
        const piece = this.board[fromRow][fromCol];
        this.board[toRow][toCol] = piece;
        this.board[fromRow][fromCol] = null;
        
        // Rimuovi i pezzi catturati
        for (const capture of move.captures) {
            this.board[capture.row][capture.col] = null;
        }
        
        // Promuovi a dama se necessario
        if (move.becomesDama) {
            this.board[toRow][toCol] = { type: 'dama', color: piece.color };
        }
        
        // Controlla se il gioco è terminato
        this.checkGameOver();
        
        // Prepara per il prossimo turno
        const hadCapture = move.captures.length > 0;
        let mustContinueCapture = false;
        
        // Se c'è stata una cattura, controlla se possono essercene altre
        if (hadCapture) {
            const furtherCaptures = this.findValidMoves(toRow, toCol)
                .filter(m => m.captures.length > 0);
            
            if (furtherCaptures.length > 0) {
                mustContinueCapture = true;
                this.selectedPiece = { row: toRow, col: toCol };
                this.validMoves = furtherCaptures;
            }
        }
        
        if (!mustContinueCapture) {
            this.currentPlayer = this.currentPlayer === 'B' ? 'N' : 'B';
            this.selectedPiece = null;
            this.validMoves = [];
            
            // Controlla se il giocatore successivo deve catturare
            this.mustCapture = this.checkMustCapture();
        }
        
        return { 
            success: true, 
            hadCapture,
            mustContinueCapture,
            gameOver: this.gameOver,
            winner: this.winner
        };
    }

    checkMustCapture() {
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = this.board[row][col];
                if (piece && piece.color === this.currentPlayer) {
                    const moves = this.findValidMoves(row, col);
                    if (moves.some(move => move.captures.length > 0)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    checkGameOver() {
        // Controlla se un giocatore non ha più pedine
        let blackPieces = 0;
        let whitePieces = 0;
        let blackCanMove = false;
        let whiteCanMove = false;
        
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = this.board[row][col];
                if (piece) {
                    if (piece.color === 'B') {
                        whitePieces++;
                        if (!whiteCanMove) {
                            const moves = this.findValidMoves(row, col);
                            if (moves.length > 0) whiteCanMove = true;
                        }
                    } else {
                        blackPieces++;
                        if (!blackCanMove) {
                            const moves = this.findValidMoves(row, col);
                            if (moves.length > 0) blackCanMove = true;
                        }
                    }
                }
            }
        }
        
        if (whitePieces === 0 || !whiteCanMove) {
            this.gameOver = true;
            this.winner = 'N';
        } else if (blackPieces === 0 || !blackCanMove) {
            this.gameOver = true;
            this.winner = 'B';
        }
    }

    async generateBoardImage() {
        const cellSize = 70;
        const padding = 30;
        const boardSize = 8 * cellSize;
        const canvasWidth = boardSize + padding * 2;
        const canvasHeight = boardSize + padding * 2;
        
        const canvas = createCanvas(canvasWidth, canvasHeight);
        const ctx = canvas.getContext('2d');
        
        // Colori
        const colors = {
            light: '#F0D9B5',
            dark: '#B58863',
            highlight: 'rgba(155, 199, 0, 0.6)',
            selected: 'rgba(255, 215, 0, 0.6)',
            whitePiece: '#FFFFFF',
            blackPiece: '#000000',
            whiteDama: '#FFD700',
            blackDama: '#8B4513',
            border: '#000000',
            bg: '#2C2C2C'
        };
        
        // Sfondo
        ctx.fillStyle = colors.bg;
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        
        // Disegna la scacchiera
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const x = padding + col * cellSize;
                const y = padding + row * cellSize;
                
                // Casella
                ctx.fillStyle = (row + col) % 2 === 0 ? colors.light : colors.dark;
                ctx.fillRect(x, y, cellSize, cellSize);
                
                // Evidenzia le mosse valide
                if (this.selectedPiece && 
                    this.validMoves.some(move => move.row === row && move.col === col)) {
                    ctx.fillStyle = colors.highlight;
                    ctx.fillRect(x, y, cellSize, cellSize);
                }
                
                // Evidenzia il pezzo selezionato
                if (this.selectedPiece && 
                    this.selectedPiece.row === row && this.selectedPiece.col === col) {
                    ctx.fillStyle = colors.selected;
                    ctx.fillRect(x, y, cellSize, cellSize);
                }
                
                // Disegna i pezzi
                const piece = this.board[row][col];
                if (piece) {
                    const centerX = x + cellSize / 2;
                    const centerY = y + cellSize / 2;
                    const radius = cellSize * 0.4;
                    
                    // Pedina
                    ctx.fillStyle = piece.color === 'B' ? colors.whitePiece : colors.blackPiece;
                    ctx.beginPath();
                    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.strokeStyle = colors.border;
                    ctx.lineWidth = 2;
                    ctx.stroke();
                    
                    // Dama (cerchio interno)
                    if (piece.type === 'dama') {
                        const innerRadius = radius * 0.5;
                        ctx.fillStyle = piece.color === 'B' ? colors.whiteDama : colors.blackDama;
                        ctx.beginPath();
                        ctx.arc(centerX, centerY, innerRadius, 0, Math.PI * 2);
                        ctx.fill();
                        ctx.stroke();
                    }
                }
            }
        }
        
        // Aggiungi indici di riga e colonna
        ctx.font = 'bold 16px Arial';
        ctx.fillStyle = '#FFFFFF';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Lettere delle colonne (A-H)
        for (let col = 0; col < 8; col++) {
            const x = padding + col * cellSize + cellSize / 2;
            const yTop = padding - 10;
            const yBottom = padding + boardSize + 10;
            
            ctx.fillText(String.fromCharCode(65 + col), x, yTop);
            ctx.fillText(String.fromCharCode(65 + col), x, yBottom);
        }
        
        // Numeri delle righe (1-8)
        for (let row = 0; row < 8; row++) {
            const y = padding + row * cellSize + cellSize / 2;
            const xLeft = padding - 10;
            const xRight = padding + boardSize + 10;
            
            ctx.fillText((8 - row).toString(), xLeft, y);
            ctx.fillText((8 - row).toString(), xRight, y);
        }
        
        // Aggiungi informazioni di gioco
        ctx.font = 'bold 20px Arial';
        ctx.fillText(`Turno: ${this.currentPlayer === 'B' ? 'Bianco' : 'Nero'}`, 
                     canvasWidth / 2, 20);
        
        if (this.gameOver) {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            ctx.fillRect(canvasWidth / 4, canvasHeight / 3, canvasWidth / 2, canvasHeight / 3);
            
            ctx.fillStyle = '#FFFFFF';
            ctx.font = 'bold 30px Arial';
            ctx.fillText('GAME OVER', canvasWidth / 2, canvasHeight / 2 - 20);
            ctx.fillText(`Vincitore: ${this.winner === 'B' ? 'Bianco' : 'Nero'}`, 
                         canvasWidth / 2, canvasHeight / 2 + 20);
        }
        
        return canvas.toBuffer('image/png');
    }
}

global.damaGame = global.damaGame || {};

async function handleGameTimeout(conn, chat, gameId, playerId) {
    const currentGame = global.damaGame?.[chat];
    
    if (!currentGame || currentGame.id !== gameId) return;
    
    try {
        currentGame.gameOver = true;
        currentGame.winner = currentGame.currentPlayer === 'B' ? 'N' : 'B';
        
        let timeoutText = `ㅤ⋆｡˚『 ╭ \`TEMPO SCADUTO!\` ╯ 』˚｡⋆\n╭\n`;
        timeoutText += `│ 『 🎯 』 \`Vincitore:\` *${currentGame.winner === 'B' ? 'Bianco' : 'Nero'}*\n`;
        timeoutText += `│ 『 💡 』 _*Sii più veloce*_\n`;
        timeoutText += `*╰⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*`;
        
        const buttons = [{
            name: 'quick_reply',
            buttonParamsJson: JSON.stringify({ display_text: '♟️ Gioca Ancora!', id: `.dama` })
        }];

        await conn.sendMessage(chat, {
            text: timeoutText,
            footer: 'Dama Bot',
            interactiveButtons: buttons
        });
        
        delete global.damaGame[chat];
    } catch (error) {
        console.error('[DAMA] Errore durante la gestione del timeout:', error);
        delete global.damaGame[chat];
    }
}

async function startGame(conn, m, usedPrefix) {
    const chat = m.chat;

    if (global.damaGame?.[chat]) {
        return conn.reply(m.chat, '『 ⚠️ 』 \`C\'è già una partita di dama attiva!\`', m);
    }

    const cooldownKey = `dama_${chat}`;
    global.cooldowns = global.cooldowns || {};
    const lastGame = global.cooldowns[cooldownKey] || 0;
    const now = Date.now();
    const cooldownTime = 5000;

    if (now - lastGame < cooldownTime) {
        const remainingTime = Math.ceil((cooldownTime - (now - lastGame)) / 1000);
        return conn.reply(m.chat, `『 ⏳ 』 *Aspetta ancora ${remainingTime} secondi prima di avviare un nuovo gioco!*`, m);
    }
    
    try {
        const newGame = new DamaGame(m.sender);
        const boardImage = await newGame.generateBoardImage();

        let startCaption = `ㅤ⋆｡˚『 ╭ \`DAMA ITALIANA\` ╯ 』˚｡⋆\n╭\n`;
        startCaption += `│ 『 🎯 』 \`Turno:\` *${newGame.currentPlayer === 'B' ? 'Bianco' : 'Nero'}*\n`;
        startCaption += `│ 『 ⚡ 』 \`Seleziona una pedina con .select A2\`\n`;
        startCaption += `│ 『 ⏱️ 』 \`2 minuti\` di tempo \`per mossa\`\n`;
        startCaption += `*╰⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*`;

        let msg = await conn.sendMessage(chat, { 
            image: boardImage, 
            caption: startCaption,
            footer: 'Dama Bot'
        }, { quoted: m });

        global.damaGame[chat] = newGame;
        global.damaGame[chat].id = msg.key.id;
        global.cooldowns[cooldownKey] = now;

        const timeoutId = setTimeout(() => {
            handleGameTimeout(conn, chat, msg.key.id, m.sender);
        }, 120000); // 2 minuti

        global.damaGame[chat].timeoutId = timeoutId;

    } catch (error) {
        console.error('Errore nell\'avvio del gioco Dama:', error);
        await conn.reply(m.chat, `Si è verificato un errore durante l'avvio del gioco.`, m);
    }
}

let handler = async (m, { conn, command, usedPrefix, text }) => {
    if (command === 'skipdama') {
        const game = global.damaGame?.[m.chat];
        if (!game) return conn.reply(m.chat, '⚠️ Non c\'è nessuna partita di dama attiva in questo gruppo!', m);

        const groupMeta = await conn.groupMetadata(m.chat).catch(() => null);
        const participant = groupMeta?.participants.find(p => p.id === m.sender);
        const isAdmin = participant?.admin === 'admin' || participant?.admin === 'superadmin';

        if (!isAdmin && m.sender !== game.playerId && !m.fromMe) {
            return conn.reply(m.chat, '❌ *Questo comando può essere usato solo dagli admin o da chi ha iniziato la partita!*', m);
        }

        clearTimeout(game.timeoutId);
        const boardImage = await game.generateBoardImage();
        
        let skipCaption = `ㅤ⋆｡˚『 ╭ \`PARTITA INTERROTTA\` ╯ 』˚｡⋆\n╭\n`;
        skipCaption += `│ 『 🎯 』 \`Partita interrotta\`\n`;
        skipCaption += `*╰⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*`;

        const buttons = [{
            name: 'quick_reply',
            buttonParamsJson: JSON.stringify({ display_text: '♟️ Gioca Ancora!', id: `.dama` })
        }];

        await conn.sendMessage(m.chat, {
            image: boardImage,
            caption: skipCaption,
            footer: 'Dama Bot',
            interactiveButtons: buttons
        }, { quoted: m });
        delete global.damaGame[m.chat];
        return;
    }

    if (command === 'dama') {
        await startGame(conn, m, usedPrefix);
    }

    if (command === 'select' && global.damaGame?.[m.chat]) {
        const game = global.damaGame[m.chat];
        
        // Converti la notazione scacchistica (es. A2) in coordinate (riga, colonna)
        const notation = text.trim().toUpperCase();
        if (!/^[A-H][1-8]$/.test(notation)) {
            return conn.reply(m.chat, '❌ *Notazione non valida! Usa formato come A2, B3, etc.*', m);
        }
        
        const col = notation.charCodeAt(0) - 65;
        const row = 8 - parseInt(notation[1]);
        
        const result = game.selectPiece(row, col);
        if (result.error) {
            return conn.reply(m.chat, result.error, m);
        }
        
        const boardImage = await game.generateBoardImage();
        let caption = `ㅤ⋆｡˚『 ╭ \`PEDINA SELEZIONATA\` ╯ 』˚｡⋆\n╭\n`;
        caption += `│ 『 🎯 』 \`Posizione:\` *${notation}*\n`;
        caption += `│ 『 ⚡ 』 \`Mosse disponibili:\` *${result.moves.length}*\n`;
        caption += `│ 『 💡 』 \`Usa .move [posizione] per muovere\`\n`;
        caption += `*╰⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*`;
        
        await conn.sendMessage(m.chat, {
            image: boardImage,
            caption: caption,
            footer: 'Dama Bot'
        }, { quoted: m });
    }

    if (command === 'move' && global.damaGame?.[m.chat]) {
        const game = global.damaGame[m.chat];
        
        if (!game.selectedPiece) {
            return conn.reply(m.chat, '❌ *Devi prima selezionare una pedina con .select!*', m);
        }
        
        const notation = text.trim().toUpperCase();
        if (!/^[A-H][1-8]$/.test(notation)) {
            return conn.reply(m.chat, '❌ *Notazione non valida! Usa formato come A2, B3, etc.*', m);
        }
        
        const col = notation.charCodeAt(0) - 65;
        const row = 8 - parseInt(notation[1]);
        
        const result = game.movePiece(row, col);
        if (result.error) {
            return conn.reply(m.chat, result.error, m);
        }
        
        clearTimeout(game.timeoutId);
        const boardImage = await game.generateBoardImage();
        
        let caption = `ㅤ⋆｡˚『 ╭ \`MOSSA EFFETTUATA\` ╯ 』˚｡⋆\n╭\n`;
        caption += `│ 『 🎯 』 \`A:\` *${notation}*\n`;
        if (result.hadCapture) {
            caption += `│ 『 ⚔️ 』 \`Cattura effettuata!\`\n`;
        }
        
        if (result.mustContinueCapture) {
            caption += `│ 『 ⚡ 』 \`Devi continuare a catturare!\`\n`;
        } else if (!result.gameOver) {
            caption += `│ 『 🔄 』 \`Turno:\` *${game.currentPlayer === 'B' ? 'Bianco' : 'Nero'}*\n`;
        }
        
        if (result.gameOver) {
            caption += `│ 『 🏆 』 \`Vincitore:\` *${result.winner === 'B' ? 'Bianco' : 'Nero'}*\n`;
        }
        
        caption += `*╰⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*`;
        
        const buttons = [{
            name: 'quick_reply',
            buttonParamsJson: JSON.stringify({ display_text: '♟️ Nuova Partita', id: `.dama` })
        }];
        
        let msg = await conn.sendMessage(m.chat, {
            image: boardImage,
            caption: caption,
            footer: 'Dama Bot',
            interactiveButtons: result.gameOver ? buttons : undefined
        }, { quoted: m });
        
        if (!result.gameOver) {
            game.id = msg.key.id;
            const newTimeoutId = setTimeout(() => {
                handleGameTimeout(conn, m.chat, msg.key.id, game.playerId);
            }, 120000);
            game.timeoutId = newTimeoutId;
        } else {
            delete global.damaGame[m.chat];
        }
    }
};

handler.before = async (m, { conn, usedPrefix }) => {
    // Non necessario per la dama in quanto usiamo comandi specifici
};

setInterval(() => {
    const now = Date.now();
    for (const [chat, game] of Object.entries(global.damaGame || {})) {
        if (now - game.startTime > 1800000) { // 30 minuti di inattività
            console.log(`[DAMA CLEANUP] Rimuovendo gioco inattivo nella chat ${chat}`);
            clearTimeout(game.timeoutId);
            delete global.damaGame[chat];
        }
    }
}, 60000);

handler.help = ['dama', 'select [posizione]', 'move [posizione]', 'skipdama'];
handler.tags = ['giochi'];
handler.command = /^(dama|select|move|skipdama)$/i;
handler.group = true;
handler.register = true;

export default handler;
