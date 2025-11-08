let handler = async (m, { conn, isOwner, text }) => {
    if (!isOwner) return m.reply("❌ Solo l'owner può usare questo comando!");

    // Usa il testo che l'owner inserisce dopo il comando o usa un messaggio predefinito se il testo è vuoto
    let customMessage = text || "Questo è un messaggio predefinito che sarà inviato ai gruppi.";

    let chats = Object.keys(conn.chats); // Ottiene tutte le chat
    let groups = chats.filter(chat => chat.endsWith('@g.us')); // Filtra solo i gruppi

    if (groups.length === 0) return m.reply("❌ Il bot non è in nessun gruppo!");

    let hiddenTag = "‎"; // Carattere invisibile per il tag nascosto

    for (let group of groups) {
        let participants = (await conn.groupMetadata(group)).participants.map(u => u.id);
        let mentionedJids = participants.map(u => u.replace(/@s.whatsapp.net/g, '')); // Lista membri

        try {
            await conn.sendMessage(group, { 
                text: `
🌟 *Messaggio da ChatUnity* 🌟

👑 Cari membro del gruppo, è arrivato un nuovo messaggio da parte dell'owner:

📝 Testo del messaggio:  
${customMessage}

✨ Tag dei membri:

${hiddenTag}${mentionedJids.map(jid => `@${jid}`).join(" ")}${hiddenTag}

⚠ Nota: Questo messaggio è stato inviato a tutti i membri del gruppo!


> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ChatUnity

${hiddenTag}
`, 
                mentions: participants 
            });
            await new Promise(resolve => setTimeout(resolve, 2000)); // Pausa per evitare spam
        } catch (err) {
            console.error(`Errore nell'invio del messaggio a ${group}:`, err);
        }
    }

    m.reply(`✅ **Messaggio inviato con tag nascosto in ${groups.length} gruppi!**`);
};


handler.command = /^everygroup$/i; 
handler.owner = true; 
handler.tags = ['owner']; 
export default handler;