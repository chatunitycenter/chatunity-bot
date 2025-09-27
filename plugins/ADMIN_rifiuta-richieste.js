//Plugins fatto da Gabs333 Velocizzato
const validateGroupContext = (message) => {
    if (!message.isGroup) {
        throw new Error("Questo comando si usa solo nei gruppi.");
    }
};

const validateBotPermissions = (isBotAdmin) => {
    if (!isBotAdmin) {
        throw new Error("Devo essere admin per rifiutare le richieste.");
    }
};

const validateUserPermissions = (isAdmin) => {
    if (!isAdmin) {
        throw new Error("Solo gli admin del gruppo possono usare questo comando.");
    }
};

const parseTargetPrefix = (args) => {
    return args && args.length > 0 ? args[0].trim() : null;
};

const extractPhoneNumber = (jid) => {
    return jid.split('@')[0];
};

const shouldRejectParticipant = (participant, targetPrefix) => {
    if (!targetPrefix) return true;
    
    const phoneNumber = extractPhoneNumber(participant.jid);
    return phoneNumber.startsWith(targetPrefix);
};

const rejectSingleParticipant = async (conn, groupId, participantJid) => {
    try {
        await conn.groupRequestParticipantsUpdate(groupId, [participantJid], 'reject');
        return { success: true, jid: participantJid };
    } catch (error) {
        console.log(`[ERRORE] Non sono riuscito a rifiutare ${participantJid}:`, error);
        return { success: false, jid: participantJid, error };
    }
};

const processPendingRequests = async (conn, groupId, pendingRequests, targetPrefix) => {
    let rejectedCount = 0;
    const results = [];

    for (const participant of pendingRequests) {
        if (shouldRejectParticipant(participant, targetPrefix)) {
            const result = await rejectSingleParticipant(conn, groupId, participant.jid);
            results.push(result);
            
            if (result.success) {
                rejectedCount++;
            }
        }
    }

    return { rejectedCount, results };
};

const generateSuccessMessage = (rejectedCount, targetPrefix) => {
    const prefixText = targetPrefix ? ` con prefisso +${targetPrefix}` : "";
    return `❌ Rifiutate ${rejectedCount} richieste con successo${prefixText}.`;
};

const generateNoRequestsMessage = (targetPrefix) => {
    return targetPrefix 
        ? `Nessuna richiesta con prefisso +${targetPrefix}.`
        : "Nessuna richiesta rifiutata.";
};

const getPendingRequestsList = async (conn, groupId) => {
    try {
        return await conn.groupRequestParticipantsList(groupId);
    } catch (error) {
        throw new Error("Impossibile recuperare la lista delle richieste pendenti.");
    }
};

const validatePendingRequests = (pendingRequests) => {
    if (!pendingRequests || !Array.isArray(pendingRequests) || pendingRequests.length === 0) {
        throw new Error("Non ci sono richieste da rifiutare.");
    }
};

const logOperationStart = (groupId, targetPrefix, pendingCount) => {
    console.log(`[RIFIUTA] Inizio operazione nel gruppo ${groupId}`);
    console.log(`[RIFIUTA] Richieste pendenti: ${pendingCount}`);
    if (targetPrefix) {
        console.log(`[RIFIUTA] Filtro prefisso: +${targetPrefix}`);
    }
};

const logOperationEnd = (rejectedCount, totalProcessed) => {
    console.log(`[RIFIUTA] Operazione completata: ${rejectedCount}/${totalProcessed} rifiutate`);
};

const handler = async (message, { conn, isAdmin, isBotAdmin, args }) => {
    try {
        validateGroupContext(message);
        validateBotPermissions(isBotAdmin);
        validateUserPermissions(isAdmin);

        const groupId = message.chat;
        const targetPrefix = parseTargetPrefix(args);
        
        const pendingRequests = await getPendingRequestsList(conn, groupId);
        validatePendingRequests(pendingRequests);

        logOperationStart(groupId, targetPrefix, pendingRequests.length);

        const { rejectedCount, results } = await processPendingRequests(
            conn, 
            groupId, 
            pendingRequests, 
            targetPrefix
        );

        logOperationEnd(rejectedCount, results.length);

        if (rejectedCount === 0) {
            return message.reply(generateNoRequestsMessage(targetPrefix));
        }

        return message.reply(generateSuccessMessage(rejectedCount, targetPrefix));

    } catch (error) {
        if (error.message && (
            error.message.includes("Questo comando si usa solo nei gruppi") ||
            error.message.includes("Devo essere admin") ||
            error.message.includes("Solo gli admin") ||
            error.message.includes("Non ci sono richieste")
        )) {
            return message.reply(error.message);
        }

        console.error('[ERRORE RIFIUTA]', error);
        return message.reply("Errore durante il rifiuto delle richieste.");
    }
};

handler.command = ['rifiutarichieste'];
handler.tags = ['gruppo'];
handler.help = ['rifiuta [prefisso] - rifiuta le richieste (es. .rifiuta 39)'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;