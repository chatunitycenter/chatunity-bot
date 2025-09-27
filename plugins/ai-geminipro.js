import fetch from 'node-fetch';
const API_KEYS = [
  "AIzaSyDgwJzvsyHXL-QepGP72t835XY2X57EWDA",
  "AIzaSyBm3KriW-iEwe2kR7KVg8WoOZVYoLqjis8"
];

async function queryGemini(prompt) {
  for (let i = 0; i < API_KEYS.length; i++) {
    const key = API_KEYS[i];
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000); 

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${key}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
          }),
          signal: controller.signal
        }
      );

      clearTimeout(timeout);

      const data = await response.json();
      console.log(`🌟 Risposta API chiave ${i + 1}:`, JSON.stringify(data, null, 2));

      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (reply) return reply; // ✅ se funziona, ritorna subito

    } catch (err) {
      console.warn(`❌ Chiave API ${i + 1} fallita, provo la prossima...`, err);
      continue; // prova la prossima chiave
    }
  }

  // Se tutte le chiavi falliscono
  return "Non ho ricevuto una risposta valida da nessuna chiave API.";
}

// Handler principale
var handler = async (m, { text, usedPrefix, command }) => {
  if (!text) {
    await m.reply("Che vuoi?");
    return;
  }

  try {
    conn.sendPresenceUpdate('composing', m.chat);

    const prompt = `sei gemini e questa è la mia richiesta "${text}"`;
    const geminiReply = await queryGemini(prompt);
    await m.reply(geminiReply);

  } catch (e) {
    await conn.reply(
      m.chat,
      `Si è verificato un errore inatteso. Riprova più tardi.\n\n#report ${usedPrefix + command}`,
      m
    );
    console.error("Errore nel comando " + usedPrefix + command + ":", e);
  }
};

// Comandi e descrizione
handler.command = ['geminipro'];
handler.help = ['bot <testo>', 'ia <testo>'];
handler.tags = ['tools'];
handler.premium = false;

export default handler;
