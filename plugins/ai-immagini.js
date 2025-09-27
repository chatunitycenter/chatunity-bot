import axios from "axios";

var handler = async (m, { text, usedPrefix, command, conn }) => {
  if (!text) {
    await m.reply("Per favore, scrivi una descrizione per generare l'immagine.");
    return;
  }

  try {
    await conn.sendPresenceUpdate("composing", m.chat);
    await m.reply("> CREO IMMAGINE ...🔥");

    let apiUrl;
    switch (command) {
      case "fluxai":
      case "immagine":
      case "flux":
        apiUrl = `https://api.siputzx.my.id/api/ai/flux?prompt=${encodeURIComponent(text)}`;
        break;
      case "stablediffusion":
      case "sdiffusion":
      case "immagine2":
        apiUrl = `https://api.siputzx.my.id/api/ai/stable-diffusion?prompt=${encodeURIComponent(text)}`;
        break;
      case "stabilityai":
      case "stability":
      case "immagine3":
        apiUrl = `https://api.siputzx.my.id/api/ai/stabilityai?prompt=${encodeURIComponent(text)}`;
        break;
      default:
        return m.reply("Comando non riconosciuto.");
    }

    const response = await axios.get(apiUrl, { responseType: "arraybuffer" });
    if (!response || !response.data) {
      return m.reply("Errore: l'API non ha restituito un'immagine valida. Riprova più tardi.");
    }

    const imageBuffer = Buffer.from(response.data, "binary");

    await conn.sendMessage(m.chat, {
      image: imageBuffer,
      caption: `💸 *Immagine generata da chatunity IA developed by onix & origin* 🚀\n✨ Prompt: *${text}*`
    });
  } catch (error) {
    console.error("FluxAI Error:", error);
    await m.reply(`Si è verificato un errore: ${error.response?.data?.message || error.message || "Errore sconosciuto"}`);
  }
};

handler.command = [
  "fluxai", "flux", "immagine",
  "stablediffusion", "sdiffusion", "immagine2",
  "stabilityai", "stability", "immagine3"
];

export default handler;
