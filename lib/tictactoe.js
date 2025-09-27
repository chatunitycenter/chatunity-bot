import { createCanvas } from 'canvas';

class TicTacToe {
  constructor(playerX = 'x', playerO = 'o', conn = null) {
    this.playerX = playerX;
    this.playerO = playerO;
    this._currentTurn = false;
    this._x = 0;
    this._o = 0;
    this.turns = 0;
    this.conn = conn; // Aggiungi riferimento alla connessione
  }

  get board() {
    return this._x | this._o;
  }

  get currentTurn() {
    return this._currentTurn ? this.playerO : this.playerX;
  }

  get enemyTurn() {
    return this._currentTurn ? this.playerX : this.playerO;
  }

  static check(state) {
    for (const combo of [7, 56, 73, 84, 146, 273, 292, 448]) {
      if ((state & combo) === combo) {
        return !0;
      }
    }
    return !1;
  }

  static toBinary(x = 0, y = 0) {
    if (x < 0 || x > 2 || y < 0 || y > 2) throw new Error('invalid position');
    return 1 << x + (3 * y);
  }

  turn(player = 0, x = 0, y) {
    if (this.board === 511) return -3;
    let pos = 0;
    if (y == null) {
      if (x < 0 || x > 8) return -1;
      pos = 1 << x;
    } else {
      if (x < 0 || x > 2 || y < 0 || y > 2) return -1;
      pos = TicTacToe.toBinary(x, y);
    }
    if (this._currentTurn ^ player) return -2;
    if (this.board & pos) return 0;
    this[this._currentTurn ? '_o' : '_x'] |= pos;
    this._currentTurn = !this._currentTurn;
    this.turns++;
    
    // Invia l'immagine dopo ogni mossa
    this.sendGameImage();
    
    return 1;
  }

  static render(boardX = 0, boardO = 0) {
    const x = parseInt(boardX.toString(2), 4);
    const y = parseInt(boardO.toString(2), 4) * 2;
    return [...(x + y).toString(4).padStart(9, '0')].reverse().map((value, index) => value == 1 ? 'X' : value == 2 ? 'O' : ++index);
  }

  render() {
    return TicTacToe.render(this._x, this._o);
  }

  get winner() {
    const x = TicTacToe.check(this._x);
    const o = TicTacToe.check(this._o);
    return x ? this.playerX : o ? this.playerO : false;
  }

  // NUOVO METODO PER INVIARE IMMAGINE
  async sendGameImage() {
    if (!this.conn) return;

    const canvas = createCanvas(500, 600);
    const ctx = canvas.getContext('2d');
    const board = this.render();

    // SFONDO GRADIENTE
    const gradient = ctx.createLinearGradient(0, 0, 500, 600);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(1, '#16213e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 500, 600);

    // TITOLO CON EFFETTO NEON
    ctx.font = 'bold 30px Arial';
    ctx.textAlign = 'center';
    ctx.shadowColor = '#00ffff';
    ctx.shadowBlur = 20;
    ctx.fillStyle = '#ffffff';
    ctx.fillText('🎮 TRIS - TIC TAC TOE 🎮', 250, 50);
    ctx.shadowBlur = 0;

    // INFO GIOCATORI
    ctx.font = '18px Arial';
    ctx.fillStyle = '#00ff88';
    ctx.fillText(`❎ = ${this.playerX.split('@')[0]}`, 150, 90);
    ctx.fillStyle = '#ff6b6b';
    ctx.fillText(`⭕ = ${this.playerO.split('@')[0]}`, 350, 90);

    // GRIGLIA DI GIOCO
    const cellSize = 90;
    const startX = 110;
    const startY = 150;

    // Disegna griglia
    ctx.strokeStyle = '#4ecdc4';
    ctx.lineWidth = 4;
    ctx.shadowColor = '#4ecdc4';
    ctx.shadowBlur = 10;
    
    for (let i = 0; i <= 3; i++) {
      ctx.beginPath();
      ctx.moveTo(startX + i * cellSize, startY);
      ctx.lineTo(startX + i * cellSize, startY + 3 * cellSize);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(startX, startY + i * cellSize);
      ctx.lineTo(startX + 3 * cellSize, startY + i * cellSize);
      ctx.stroke();
    }
    ctx.shadowBlur = 0;

    // DISEGNA SIMBOLI CON EFFETTO NEON
    ctx.font = 'bold 50px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    for (let i = 0; i < 9; i++) {
      const row = Math.floor(i / 3);
      const col = i % 3;
      const x = startX + col * cellSize + cellSize / 2;
      const y = startY + row * cellSize + cellSize / 2;
      
      if (board[i] === 'X') {
        ctx.shadowColor = '#ff6b6b';
        ctx.shadowBlur = 15;
        ctx.fillStyle = '#ff4757';
        ctx.fillText('❎', x, y);
      } else if (board[i] === 'O') {
        ctx.shadowColor = '#00ff88';
        ctx.shadowBlur = 15;
        ctx.fillStyle = '#2ed573';
        ctx.fillText('⭕', x, y);
      } else {
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#a4b0be';
        ctx.font = 'bold 30px Arial';
        ctx.fillText((i + 1).toString(), x, y);
        ctx.font = 'bold 50px Arial';
      }
    }
    ctx.shadowBlur = 0;

    // TURNO CORRENTE CON EFFETTO NEON
    ctx.font = 'bold 20px Arial';
    ctx.shadowColor = '#ff9f43';
    ctx.shadowBlur = 10;
    ctx.fillStyle = '#ff9f43';
    ctx.fillText(`🎯 TURNO DI: ${this.currentTurn.split('@')[0]}`, 250, 500);

    // ISTRUZIONI
    ctx.fillStyle = '#dfe4ea';
    ctx.font = '16px Arial';
    ctx.fillText('⬆️ Usa i numeri 1-9 per giocare', 250, 540);

    // BORDO DECORATIVO
    ctx.strokeStyle = '#ff9f43';
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 10, 480, 580);

    // Converti in buffer e invia
    const buffer = canvas.toBuffer('image/png');
    
    try {
      // Invia a entrambi i giocatori
      await this.conn.sendMessage(this.playerX, { image: buffer });
      if (this.playerO && this.playerX !== this.playerO) {
        await this.conn.sendMessage(this.playerO, { image: buffer });
      }
    } catch (error) {
      console.error('Errore invio immagine:', error);
    }
  }

  // METODO PER INVIARE IMMAGINE DI FINE GIOCO
  async sendGameEndImage(winner = null) {
    if (!this.conn) return;

    const canvas = createCanvas(500, 400);
    const ctx = canvas.getContext('2d');

    // SFONDO
    const gradient = ctx.createLinearGradient(0, 0, 500, 400);
    gradient.addColorStop(0, '#2c3e50');
    gradient.addColorStop(1, '#34495e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 500, 400);

    // TITOLO
    ctx.font = 'bold 28px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff';
    
    if (winner) {
      ctx.fillText('🎉 PARTITA CONCLUSA! 🎉', 250, 50);
      ctx.font = 'bold 24px Arial';
      ctx.fillText(`🏆 VINCITORE: ${winner.split('@')[0]}`, 250, 100);
    } else {
      ctx.fillText('🤝 PAREGGIO!', 250, 50);
    }

    // Converti e invia
    const buffer = canvas.toBuffer('image/png');
    
    try {
      await this.conn.sendMessage(this.playerX, { image: buffer });
      if (this.playerO && this.playerX !== this.playerO) {
        await this.conn.sendMessage(this.playerO, { image: buffer });
      }
    } catch (error) {
      console.error('Errore invio immagine fine gioco:', error);
    }
  }
}

export default TicTacToe;