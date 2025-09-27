let handler = async (m, { conn, command, text }) => {
    if (!text) return conn.sendMessage(m.chat, { 
        text: `🚩 Inserisci un nome accanto al comando.`,
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

    let personalita = `
┏━━°❀❬ *PERSONALITÀ* ❭❀°━━┓
*┃*
*┃• Nome* : ${text}
*┃• Moralità Buona* : ${pickRandom(['6%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98,3%','99,7%','99,9%','1%','2,9%','0%','0,4%'])}
*┃• Moralità Cattiva* : ${pickRandom(['6%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98,3%','99,7%','99,9%','1%','2,9%','0%','0,4%'])}
*┃• Tipo di persona* : ${pickRandom(['Da picchiare','Arrogante','Tirchio','Coglione','Gay','Timido','Codardo','Handicappato','Mongoloide','Ritardato', 'Scemo'])}
*┃• Sempre* : ${pickRandom(['Pesante','A guardare porno','A puttane','Rompi scatole','A eurobet','A masturbarsi','A Segarsi','A pippare','Drogato','Ubriaco','A gigolò'])}
*┃• Intelligenza* : ${pickRandom(['6%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98,3%','99,7%','99,9%','1%','2,9%','0%','0,4%'])}
*┃• Pigrizia* : ${pickRandom(['6%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98,3%','99,7%','99,9%','1%','2,9%','0%','0,4%'])}
*┃• Coraggio* : ${pickRandom(['6%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98,3%','99,7%','99,9%','1%','2,9%','0%','0,4%'])}
*┃• Paura* : ${pickRandom(['6%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98,3%','99,7%','99,9%','1%','2,9%','0%','0,4%'])}
*┃• Fama* : ${pickRandom(['6%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98,3%','99,7%','99,9%','1%','2,9%','0%','0,4%'])}
*┃• Genere* : ${pickRandom([ "Femboy professionista","Lesbica con cintura attrezzi","Etero dubbioso",
    "Boomer digitale","Zoomer vintage","Finto alpha","Influencer vitaminico",
    "TikToker pentito","Binario rotto","Genderfluid caffè","Paninosessuale","PlayStation-dipendente",
    "Netflix-addicted","Simp seriale","Pasta-al-dentista","Wi-Fi sconosciuto","Sesso-si-grazie","Identità smarrita",
    "Pronomi lol/mao","Misterioso come un deodorante","Enigmatica come un profumo",
    "Segreto industriale","Extraterrestre undercover","Frocio fallito",
    "Progamer di pompe","OnlyFans di ricette vegan","Tinder human"])}
┗━━━━━━━━━━━━━━━
`;

    await conn.sendMessage(m.chat, { 
        text: personalita,
        contextInfo: {
            forwardingScore: 99,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363422724720651@newsletter',
                serverMessageId: '',
                newsletterName: 'ChatUnity'
            }
        },
        mentions: conn.parseMention(personalita)
    }, { quoted: m });
};

handler.help = ['personalita *<nome>*', 'personalità *<nome>*'];
handler.tags = ['fun'];
handler.command = /^personalit(a|à)/i;

export default handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}