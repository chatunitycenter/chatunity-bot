// Definizione delle stringhe in italiano
const lenguajeIT = {
    smsNam2: () => "⚠️ Per favore inserisci il nuovo nome per il gruppo",
    smsNam1: () => "✅ Nome del gruppo modificato con successo!",
    smsNam3: () => "✅ Nome del gruppo modificato con successo!",
    smsConMenu: () => "🔙 Torna al Menu"
  }
  
  let handler = async (m, { conn, args, text }) => {
    const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || './media/chatunitybot.mp4'
    
    if (!text) return conn.reply(m.chat, lenguajeIT.smsNam2(), fkontak, m)
    
    try {
      let text = args.join` `
      if(args && args[0]) {
        await conn.groupUpdateSubject(m.chat, text)
      }
      
      await conn.reply(m.chat, lenguajeIT.smsNam1(), fkontak, m)
      // Alternativa con pulsante:
      // await conn.sendButton(
      //   m.chat, 
      //   'Nome modificato', 
      //   lenguajeIT.smsNam1(), 
      //   pp, 
      //   [[lenguajeIT.smsConMenu(), '/menu']], 
      //   fkontak, 
      //   m
      // )
      
    } catch (e) {
      console.error('Errore nel comando setname:', e)
      throw lenguajeIT.smsNam3()
    }
  }
  
  handler.command = /^(setname|setnome)$/i
  handler.group = true
  handler.admin = true
  handler.botAdmin = true
  export default handler