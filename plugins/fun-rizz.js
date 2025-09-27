let handler = async (m, { conn, text }) => {
    let destinatario

    if (m.quoted && m.quoted.sender) {
        destinatario = m.quoted.sender
    } 
    else if (m.mentionedJid && m.mentionedJid.length > 0) {
        destinatario = m.mentionedJid[0]
    } 
    else {
        return m.reply("Tagga qualcuno o rispondi a un messaggio per rizzarlo.")
    }

    m.reply("@" + destinatario.split('@')[0] + ' "' + pickRandom(global.rizz) + '"', null, { mentions: [destinatario]  })
}

handler.tags = ['fun']
handler.command = handler.help = ['rizz']

export default handler

function pickRandom(list) {
    return list[Math.floor(list.length * Math.random())]
}

global.rizz = [
    "se il tuo corpo fosse una prigione e le tue labbra catene, che bel posto per scontare la mia condanna.",
    "tante Stelle nello spazio e nessuna brilla come te.",
    "mi piace il caffè, ma preferisco averti-tè.",
    "non sei Google, ma hai tutto quello che cerco.",
    "ti regalo questo fiore, anche se nessuno sarà mai bello come te.",
    "se ogni goccia d'acqua sul tuo corpo è un bacio, allora voglio diventare un temporale.",
    "nella mia vita manca vita, nella mia vita manca luce, nella mia vita manca qualcuno e quel qualcuno sei tu.",
    "sei così bella che ti regalerei un milione di baci e se non ti piacessero li riprenderei indietro.",
    "se fossi pioggia invernale, chiuderei l'ombrello per sentirti sul mio corpo.",
    "non sono parole d'oro né di rubino, sono parole d'affetto che compongo per te.",
    "quando cammini non calpesti il suolo, lo accarezzi.",
    "tante forme di vita e io vivo solo nei tuoi occhi.",
    "mi piaci tanto che non so da dove iniziare a dirtelo.",
    "tutti si fermano al tuo fisico, ma io preferisco il tuo cuore.",
    "la tua bellezza mi acceca perché viene dal tuo cuore e si riflette nei tuoi occhi.",
    "se ti hanno mai detto che sei bella ti hanno mentito, non sei bella sei stupenda.",
    "celeste è il cielo, gialla la panna e neri sono gli occhi della ragazza che mi uccide.",
    "se io fossi Colombo navigherei giorno e notte per arrivare nel profondo del tuo cuore.",
    "se la bellezza fosse tempo, tu saresti 24 ore.",
    "se amarti fosse peccato, avrei l'inferno assicurato.",
    "sei l'unica cosa che manca alla mia vita per essere perfetta.",
    "non ti dico parole belle, ma un verso sincero: il mio amore per te è infinito e il mio cuore è vero.",
    "quello che sento per te è così immenso che, per contenerlo, mi servirebbe un altro universo.",
    "la matematica dice sempre la verità: tu e io insieme per l'eternità.",
    "di notte brilla la luna, e di giorno brilla il sole, ma i tuoi occhi illuminano il mio cuore.",
    "non cercarmi, preferisco restare perso nel tuo sguardo.",
    "alcuni vogliono il mondo, altri il sole, ma io voglio solo un angolo nel tuo cuore.",
    "se fossi un astronauta ti porterei su Plutone, ma non essendolo ti porto sempre nel cuore.",
    "sento sempre dire che Disneyland è il posto più felice del mondo. Ma mi chiedo: hanno mai stato accanto a te?",
    "scommetto che ti chiami Google. Sai perché? Perché hai tutto quello che cercavo!",
    "hai una matita e una gomma? Perché voglio cancellare il tuo passato e scrivere il nostro futuro.",
    "sei come la mia tazza di caffè preferita, calda e da leccarsi i baffi!",
    "voglio che il nostro amore sia come Pi greco: irrazionale e infinito.",
    "sto scrivendo un libro sulle cose belle della vita e sei nella prima pagina.",
    "non sono sempre stato religioso. Ma lo sono ora, perché sei la risposta alle mie preghiere.",
    "immagina: non pensi che saremmo teneri su una torta nuziale con le nostre facce?",
    "sei il tipo di ragazza che mia mamma vuole che porti a casa. Vuoi conoscerla?",
    "il tuo viso è perfetto... Dio ha fatto un gran lavoro con te."
];