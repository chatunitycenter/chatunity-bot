let handler = async (m, { conn }) => {
    await conn.sendMessage(m.chat, { 
        text: `*┌────「 ‼𝐎𝐁𝐁𝐋𝐈𝐆𝐎‼ 」─*\n*“${pickRandom(global.bucin)}”*\n*└────「 © ChatUnity 」─*`,
        contextInfo: {
            forwardingScore: 99,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363422724720651@newsletter',
                serverMessageId: '',
                newsletterName: 'ChatUnity'
            }
        }
    }, { quoted: m });
};

handler.help = ['obbligo'];
handler.tags = ['fun'];
handler.command = /^obbligo/i;
export default handler;

function pickRandom(list) {
    return list[Math.floor(list.length * Math.random())];
}

global.bucin = ["Fatti un account OnlyFans falso con le foto di tuo cugino e condividi il link in classe/gruppo lavoro",
    "Scrivi a un contatto a caso 'Scusa per ieri notte, spero tu non abbia preso malattie' e bloccalo subito",
    "Manda un vocale a un amico fingendo orgasmi epici (tipo 'OH CAZZO SÌ, IL RISO SÌ!') e dici 'scusa, pocket dial'",
    "Pubblica una storia Instagram con scritto 'Cerco sugar daddy/mommy, accetto anche cripto' e tagga un parente",
    "Vai in un negozio e chiedi con serietà: 'Avete preservativi al gusto di Nutella? Per un amico.'",
    "Fingi di essere un fantasma e manda audio sussurrati al tuo ex con frasi tipo 'PERCHÉ MI HAI ABBANDONATO...'",
    "Scrivi nel gruppo famiglia 'Ragazzi, ho prenotato un tatuaggio sul culo, serve un testimone'",
    "Ordina una pizza con scritto sopra 'AIUTO SONO PRIGIONIERO DEL DOMINOS' e filma la consegna",
    "Fatti un video TikTok ballando in mutande con calzini bianchi da nonno e l'hashtag #SexyGrandpa",
    "Manda a tutti i tuoi contatti 'Ho sborrato nel tuo panino. Scusa. Non farlo più.' e poi 'SMS di prova, ignore'",
    "Vai in farmacia e chiedi 'Avete qualcosa per la sindrome da dipendenza dal cazzo?'",
    "Cambia il nome del WiFi di casa in 'FBI Surveillance Van #4587' e aspetta le reazioni dei vicini",
    "Fingi di essere un hacker e scrivi a un amico 'HO ACCESSO AL TUO PC. PAGAMI 10€ IN AMAZON O PUBBLICO I TUOI MEMES BRUTTI'",
    "Pubblica su Facebook un annuncio: 'Vendo acqua benedetta da OnlyFans, garantito 100% santa'",
    "Metti status WhatsApp: 'Single. Accetto anche parenti stretti. #NoJudgement'",
    "Fatti un selfie con la faccia nel water (pulito, spero) e mandalo a un amico con scritto 'NUOVO FIDANZATO/A'",
    "Scrivi al tuo capo 'Domani non vengo, devo accompagnare mia nonna a un rave'",
    "Entra in un McDonald's e urla 'CHI VUOLE FARMI DA ZUCCHINO? OFFRO MCNUGGETS'",
    "Manda un audio a un numero a caso dicendo 'PRONTO? SÌ, HO FINITO DI SCAVARE LA FOSSA. DOVE LO METTO IL CORPO?'",
    "Fatti un profilo Tinder con foto di Silvio Berlusconi e bio: 'Cerco âme sœur per bunga bunga'",
    "Vai in un negozio di animali e chiedi se hanno pitoni addestrati per 'altro oltre alla caccia'",
    "Fingi un attacco di possessione demoniaca al pronto soccorso, urlando 'LA MARGHERITA HA TROPPO ANANAS'",
    "Scrivi a tua madre 'Mamma, ho deciso: divento una escort per pensionati. Supporti la mia carriera?'",
    "Metti like a tutti i post del 2012 di una persona random e commenta 'RIP, sei sempre nei nostri cuori'",
    "Fai un live Twitch dove 'leggi' la Bibbia, ma ogni 2 minuti sussurri '...comunque tua madre è una troia'"
  
  ,
];

global.sfidaTroll = [
    "Fatti un account OnlyFans falso con le foto di tuo cugino e condividi il link in classe/gruppo lavoro",
    "Scrivi a un contatto a caso 'Scusa per ieri notte, spero tu non abbia preso malattie' e bloccalo subito",
    "Manda un vocale a un amico fingendo orgasmi epici (tipo 'OH CAZZO SÌ, IL RISO SÌ!') e dici 'scusa, pocket dial'",
    "Pubblica una storia Instagram con scritto 'Cerco sugar daddy/mommy, accetto anche cripto' e tagga un parente",
    "Vai in un negozio e chiedi con serietà: 'Avete preservativi al gusto di Nutella? Per un amico.'",
    "Fingi di essere un fantasma e manda audio sussurrati al tuo ex con frasi tipo 'PERCHÉ MI HAI ABBANDONATO...'",
    "Scrivi nel gruppo famiglia 'Ragazzi, ho prenotato un tatuaggio sul culo, serve un testimone'",
    "Ordina una pizza con scritto sopra 'AIUTO SONO PRIGIONIERO DEL DOMINOS' e filma la consegna",
    "Fatti un video TikTok ballando in mutande con calzini bianchi da nonno e l'hashtag #SexyGrandpa",
    "Manda a tutti i tuoi contatti 'Ho sborrato nel tuo panino. Scusa. Non farlo più.' e poi 'SMS di prova, ignore'",
    "Vai in farmacia e chiedi 'Avete qualcosa per la sindrome da dipendenza dal cazzo?'",
    "Cambia il nome del WiFi di casa in 'FBI Surveillance Van #4587' e aspetta le reazioni dei vicini",
    "Fingi di essere un hacker e scrivi a un amico 'HO ACCESSO AL TUO PC. PAGAMI 10€ IN AMAZON O PUBBLICO I TUOI MEMES BRUTTI'",
    "Pubblica su Facebook un annuncio: 'Vendo acqua benedetta da OnlyFans, garantito 100% santa'",
    "Metti status WhatsApp: 'Single. Accetto anche parenti stretti. #NoJudgement'",
    "Fatti un selfie con la faccia nel water (pulito, spero) e mandalo a un amico con scritto 'NUOVO FIDANZATO/A'",
    "Scrivi al tuo capo 'Domani non vengo, devo accompagnare mia nonna a un rave'",
    "Entra in un McDonald's e urla 'CHI VUOLE FARMI DA ZUCCHINO? OFFRO MCNUGGETS'",
    "Manda un audio a un numero a caso dicendo 'PRONTO? SÌ, HO FINITO DI SCAVARE LA FOSSA. DOVE LO METTO IL CORPO?'",
    "Fatti un profilo Tinder con foto di Silvio Berlusconi e bio: 'Cerco âme sœur per bunga bunga'",
    "Vai in un negozio di animali e chiedi se hanno pitoni addestrati per 'altro oltre alla caccia'",
    "Fingi un attacco di possessione demoniaca al pronto soccorso, urlando 'LA MARGHERITA HA TROPPO ANANAS'",
    "Scrivi a tua madre 'Mamma, ho deciso: divento una escort per pensionati. Supporti la mia carriera?'",
    "Metti like a tutti i post del 2012 di una persona random e commenta 'RIP, sei sempre nei nostri cuori'",
    "Fai un live Twitch dove 'leggi' la Bibbia, ma ogni 2 minuti sussurri '...comunque tua madre è una troia'"
  ]