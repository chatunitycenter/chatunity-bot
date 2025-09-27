import fetch from "node-fetch";

let handler = async (m, { conn, args }) => {
    if (!args[0]) return m.reply("❌ *Inserisci un sito!*\n📌 _Esempio:_ *.checkscam www.sito.com*");

    let sito = args[0].replace(/https?:\/\//, "").replace("www.", "").split("/")[0];

    try {
        let response = await fetch(`https://transparencyreport.google.com/safe-browsing/search?url=${sito}`);
        let isScam = response.status !== 200;
        
        let msg = `🔍 *Dominio:* ${sito}\n${isScam ? "⚠️ *RISCHIO SCAM!* ❌" : "✅ *Sito Sicuro!*"}\n\n🔗 [Verifica su ScamAdviser](https://www.scamadviser.com/check-website/${sito})`;
        
        await conn.sendMessage(m.chat, { text: msg }, { quoted: m });
    } catch (err) {
        m.reply("❌ *Errore! Riprova più tardi.*");
    }
};

handler.command = ["checkscam"];
handler.category = "security";
handler.desc = "Controlla se un sito è scam 🔍";

export default handler;