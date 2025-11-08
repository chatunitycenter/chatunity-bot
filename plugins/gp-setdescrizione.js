const handler = async (m, { conn, args }) => {
    try {
      
      const pp = await conn.profilePictureUrl(m.chat, 'image').catch(() => './media/chatunitybot.mp4');
      
      // Unisci gli argomenti per creare la descrizione
      const description = args.join(' ').trim();
      
      if (!description) {
        return conn.reply(m.chat, 'Per favore, inserisci una descrizione valida.', m);
      }
  
      // Aggiorna la descrizione del gruppo
      await conn.groupUpdateDescription(m.chat, description);
      
      // Invia conferma
      await conn.reply(m.chat, '✅ *Descrizione del gruppo aggiornata con successo!*', m);
      
    } catch (error) {
      console.error('Errore nel cambiare la descrizione:', error);
      conn.reply(m.chat, '❌ *Si è verificato un errore durante l\'aggiornamento della descrizione.*', m);
    }
  }
  
  handler.help = ['setdesc <testo>'];
  handler.tags = ['group'];
  handler.command = /^setdesk|setdesc(rizione)?|descrip(ción|cion)$/i;
  handler.group = true;
  handler.admin = true;
  handler.botAdmin = true;
  
  export default handler;