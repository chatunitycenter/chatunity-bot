
const MIN_MEMBERS = 30;

const handler = async (m, { conn, args }) => {
    try {
        if (m.isGroup) throw new Error('❌ Questo comando funziona solo in privato.');
        if (!args[0]) throw new Error('📩 Usa così:\n\n.join <link gruppo>');

        const invite = args[0];
        const match = invite.match(/https:\/\/chat\.whatsapp\.com\/([a-zA-Z0-9]+)/);
        
        if (!match) throw new Error('❌ Inserisci un link valido di un gruppo WhatsApp.');

        const code = match[1];
        const res = await conn.groupGetInviteInfo(code);
        
        if (!res) throw new Error('❌ Link non valido o scaduto.');

        const nome = res.subject || "Gruppo sconosciuto";
        const membri = res.size || 0;

        if (membri < MIN_MEMBERS) {
            throw new Error(`❌ Il gruppo *${nome}* ha solo ${membri} membri (minimo richiesto: ${MIN_MEMBERS}).`);
        }

        await conn.groupAcceptInvite(code);

        const responseText = res.joinApprovalRequired 
            ? `📩 Richiesta inviata al gruppo *${nome}* (${membri} membri).`
            : `✅ Il bot è entrato nel gruppo *${nome}* (${membri} membri).`;

        return m.reply(responseText);

    } catch (e) {
        if (e.message && (e.message.includes('❌') || e.message.includes('📩'))) {
            return m.reply(e.message);
        }
        
        console.error('[JOIN_ERROR]', e);
        return m.reply(`⚠️ Errore durante il join: ${e.message || e}`);
    }
};

handler.command = /^entra$/i;
handler.help = ['join <link gruppo>'];
handler.tags = ['group'];

export default handler;