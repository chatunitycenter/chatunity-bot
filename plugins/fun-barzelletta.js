const { generateWAMessageFromContent, proto } = (await import('@whiskeysockets/baileys')).default

var handler = async (m, { conn, text}) => {

const emoji2 = "😂"; // Emoji di default per le barzellette

conn.reply(m.chat, `${emoji2} Cerco una barzelletta, attendi un momento...`, m)

conn.reply(m.chat, `*┏━_͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡_͜͡━┓*\n\n❥ *"${pickRandom(global.barzelletta)}"*\n\n*┗━_͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡_͜͡━┛*`, m)

}
handler.help = ['barzelletta']
handler.tags = ['fun']
handler.command = ['barzelletta']
handler.fail = null
handler.exp = 0
handler.group = true;
handler.register = true

export default handler

let hasil = Math.floor(Math.random() * 5000)
function pickRandom(list) {
return list[Math.floor(list.length * Math.random())]
}

global.barzelletta = [
  "Qual è l’ultimo animale salito sull’arca di Noè? Il delfino.",
  "Come si dice fazzoletto in giapponese? Saka-moko.",
  "Come si dice sparo in arabo? Ahì-va-la-bala.",
  "Cosa dice un verme a un altro verme? Vado a fare un giro alla mela.",
  "Un gatto inizia ad abbaiare sul tetto di una casa. Un altro gatto, sorpreso, gli dice: Sei matto gatto, perché abbai invece di miagolare? Il gattino risponde: Non posso forse imparare un’altra lingua?",
  "Il dottore dice al paziente: respiri profondamente che la ausculto. Il paziente risponde: dottore, da chi mi deve nascondere se non devo niente a nessuno?",
  "Dopo un parto il padre chiede: Dottore, com’è andata? Il dottore: tutto bene, ma abbiamo dovuto mettere ossigeno al bambino. Il padre, sconvolto: ma noi volevamo chiamarlo Gabriele!",
  "Un pesce chiede a un altro pesce: cosa fa tua mamma? Questo risponde: Nuota, e la tua? Nuota anche lei.",
  "Qual è il colmo per Aladino? Avere un brutto genio.",
  "Il professore dice allo studente dopo aver corretto il compito: Il tuo lavoro mi ha commosso. Lo studente, sorpreso, chiede: E perché professore? Il professore: Perché mi ha fatto tanta pena.",
  "Il bambino dice alla mamma: Mamma, non voglio più giocare con Pierino. La mamma: Perché? Perché quando giochiamo con i mattoncini e gliene tiro uno in testa, si mette a piangere.",
  "La maestra chiede a Gianluca: Cosa faresti se stessi annegando in piscina? Gianluca risponde: Mi metterei a piangere tanto per sfogarmi.",
  "Mamma, mi vedo grassa, brutta e vecchia. Cosa ho? Mamma, hai proprio ragione.",
  "Come si dice capelli sporchi in cinese? Chin cham pu.",
  "C’era una volta un bambino così, ma così distratto che... vabbè, mi sono dimenticato la barzelletta!",
  "Un’amica chiede a un’altra: Come va la vita da sposata? Non mi posso lamentare, dice lei. Quindi va bene? No, non mi posso lamentare perché mio marito è qui vicino.",
  "Perché le foche guardano sempre in alto? Perché lì ci sono i fari!",
  "Cameriere, questa bistecca è molto nervosa. È normale, è la prima volta che la mangiano.",
  "Come si chiama il cugino di Bruce Lee? Broco Lee.",
  "Una mamma dice al figlio: Giacomino, mi ha detto un uccellino che ti droghi. Quella che si droga sei tu, che parli con gli uccellini."
]