// antinuke: passive monitor. Uses global.groupAdminWhitelist (chatId -> Set of JIDs)
const plugin = {
  all: async function (m, { conn }) {
    try {
      if (!m.isGroup) return;
      // check enabled in chat settings
      const chatSettings = (global.db?.data?.chats?.[m.chat]) || {};
      const antinukeEnabled = ('antinuke' in chatSettings) ? !!chatSettings.antinuke : true;
      if (!antinukeEnabled) return;

      if (![28, 29, 30, 32, 33].includes(m.messageStubType)) return;
      const metadata = await conn.groupMetadata(m.chat).catch(() => null);
      if (!metadata) return;

      const founder = metadata.owner;
      const chatId = m.chat;
      const target = m.messageStubParameters?.[0];
      const actor = conn.decodeJid(m.participant || m.key?.participant);
      if (!actor) return;

      const participants = metadata.participants || [];
      const normalizedParticipants = participants.map(u => {
        const normalizedId = conn.decodeJid(u.id);
        return { ...u, id: normalizedId, jid: u.jid || normalizedId };
      });

      // unified whitelist object (chatId => Set)
      if (!global.groupAdminWhitelist) global.groupAdminWhitelist = {};
      if (!global.groupAdminWhitelist[chatId]) global.groupAdminWhitelist[chatId] = new Set();

      const botNumber = conn.decodeJid(conn.user.jid);
      const groupWhitelist = Array.from(global.groupAdminWhitelist[chatId] || []);
      const autorizzati = new Set([botNumber, conn.decodeJid(founder), ...groupWhitelist]);

      if (autorizzati.has(actor)) return;

      const currentAdmins = normalizedParticipants.filter(p => p.admin).map(p => p.id);
      const sospetti = new Set([
        ...currentAdmins.filter(id => !autorizzati.has(id)),
        actor,
        ...(target ? [conn.decodeJid(target)] : []),
      ]);

      const toDemote = [...sospetti].filter(id => !autorizzati.has(id));
      if (toDemote.length) {
        await conn.groupParticipantsUpdate(chatId, toDemote, "demote").catch(() => null);
        await conn.groupSettingUpdate(chatId, "announcement").catch(() => null);
        await conn.sendMessage(chatId, {
          text: `> 🚨 𝐀𝐋𝐋𝐀𝐑𝐌𝐄 𝐒𝐕𝐓 🚨\n\n@${actor.split("@")[0]} ha tentato di modificare privilegi o rimuovere utenti non autorizzato.\n\n🔒 Sicurezza attivata 🔒`,
          mentions: [actor, ...(target ? [conn.decodeJid(target)] : [])].map(j => j + "@s.whatsapp.net"),
        }).catch(() => null);
      }
    } catch (e) {
      console.error(e);
    }
  },
  // metadata used by loader
  tags: ['admin'],
  group: true
}

export default plugin;
