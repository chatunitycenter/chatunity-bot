let richiestaInAttesa = {};

let handler = async (m, { conn, isAdmin, isBotAdmin, args, usedPrefix, command }) => {
  if (!m.isGroup) return;

  const groupId = m.chat;

  if (richiestaInAttesa[m.sender]) {
    const pending = await conn.groupRequestParticipantsList(groupId);
    const input = (m.text || '').trim();
    delete richiestaInAttesa[m.sender];

    if (/^\d+$/.test(input)) {
      const numero = parseInt(input);
      if (numero <= 0) return m.reply("❌ Numero non valido. Usa un numero > 0.");
      const daAccettare = pending.slice(0, numero);
      try {
        const jidList = daAccettare.map(p => p.jid);
        await conn.groupRequestParticipantsUpdate(groupId, jidList, 'approve');
        return m.reply(`✅ Accettate ${jidList.length} richieste.`);
      } catch {
        return m.reply("❌ Errore durante l'accettazione.");
      }
    }

    if (input === '39' || input === '+39') {

      const daAccettare = pending.filter(p => p.jid.startsWith('39') || p.jid.startsWith('+39'));
      if (!daAccettare.length) return m.reply("❌ Nessuna richiesta con prefisso +39 trovata.");
      try {
        const jidList = daAccettare.map(p => p.jid);
        await conn.groupRequestParticipantsUpdate(groupId, jidList, 'approve');
        return m.reply(`✅ Accettate ${jidList.length} richieste con prefisso +39.`);
      } catch {
        return m.reply("❌ Errore durante l'accettazione.");
      }
    }

    return m.reply("❌ Input non valido. Invia un numero o '39'.");
  }

  if (!isBotAdmin) return m.reply("❌ Devo essere admin per gestire richieste.");
  if (!isAdmin) return m.reply("❌ Solo admin del gruppo possono usare questo comando.");

  const pending = await conn.groupRequestParticipantsList(groupId);
  if (!pending.length) return m.reply("✅ Non ci sono richieste in sospeso.");

  if (!args[0]) {
    return conn.sendMessage(m.chat, {
      text: `📨 Richieste in sospeso: ${pending.length}\nSeleziona un'opzione:`,
      footer: 'Gestione richieste gruppo',
      buttons: [
        { buttonId: `${usedPrefix}${command} accetta`, buttonText: { displayText: "✅ Accetta tutte" }, type: 1 },
        { buttonId: `${usedPrefix}${command} rifiuta`, buttonText: { displayText: "❌ Rifiuta tutte" }, type: 1 },
        { buttonId: `${usedPrefix}${command} accetta39`, buttonText: { displayText: "🇮🇹 Accetta +39" }, type: 1 },
        { buttonId: `${usedPrefix}${command} gestisci`, buttonText: { displayText: "📥 Gestisci richieste" }, type: 1 }
      ],
      headerType: 1,
      viewOnce: true
    }, { quoted: m });
  }

  if (args[0] === 'accetta') {

    const numero = parseInt(args[1]);
    const daAccettare = isNaN(numero) || numero <= 0 ? pending : pending.slice(0, numero);
    try {
      const jidList = daAccettare.map(p => p.jid);
      await conn.groupRequestParticipantsUpdate(groupId, jidList, 'approve');
      return m.reply(`✅ Accettate ${jidList.length} richieste.`);
    } catch {
      return m.reply("❌ Errore durante l'accettazione.");
    }
  }

  if (args[0] === 'rifiuta') {
    try {
      const jidList = pending.map(p => p.jid);
      await conn.groupRequestParticipantsUpdate(groupId, jidList, 'reject');
      return m.reply(`❌ Rifiutate ${jidList.length} richieste.`);
    } catch {
      return m.reply("❌ Errore durante il rifiuto.");
    }
  }

  if (args[0] === 'accetta39') {
    const daAccettare = pending.filter(p => p.jid.startsWith('39') || p.jid.startsWith('+39'));
    if (!daAccettare.length) return m.reply("❌ Nessuna richiesta con prefisso +39 trovata.");
    try {
      const jidList = daAccettare.map(p => p.jid);
      await conn.groupRequestParticipantsUpdate(groupId, jidList, 'approve');
      return m.reply(`✅ Accettate ${jidList.length} richieste con prefisso +39.`);
    } catch {
      return m.reply("❌ Errore durante l'accettazione.");
    }
  }

  if (args[0] === 'gestisci') {
    return conn.sendMessage(m.chat, {
      text: `📥 Quante richieste vuoi accettare?\n\nScegli una quantità qui sotto oppure scrivi manualmente:\n\n*.${command} accetta <numero>*\nEsempio: *.${command} accetta 7*`,
      footer: 'Gestione personalizzata richieste',
      buttons: [
        { buttonId: `${usedPrefix}${command} accetta 10`, buttonText: { displayText: "10" }, type: 1 },
        { buttonId: `${usedPrefix}${command} accetta 20`, buttonText: { displayText: "20" }, type: 1 },
        { buttonId: `${usedPrefix}${command} accetta 50`, buttonText: { displayText: "50" }, type: 1 },
        { buttonId: `${usedPrefix}${command} accetta 100`, buttonText: { displayText: "100" }, type: 1 },
        { buttonId: `${usedPrefix}${command} accetta 200`, buttonText: { displayText: "200" }, type: 1 },
      ],
      headerType: 1,
      viewOnce: true
    }, { quoted: m });
  }
};

handler.command = ['richieste'];
handler.tags = ['gruppo'];
handler.help = ['richieste'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
handler.limit = false;

export default handler;
