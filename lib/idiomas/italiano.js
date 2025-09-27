export default {
  
  // Sistema generale
  smsAvisoMG: () => "⚠️ Attenzione!",
  smsWait: () => "⏳ Caricamento...",
  smsError: () => "❌ Si è verificato un errore",
  smsSuccess: () => "✅ Operazione completata con successo",
  smsProcessing: () => "🔄 Elaborazione in corso. ..",
  
  // Comandi generali
  smsOnlyGroup: () => "❌ Questo comando funziona solo nei gruppi!",
  smsOnlyAdmin: () => "❌ Solo gli admin possono usare questo comando!",
  smsOnlyOwner: () => "❌ Solo il proprietario può usare questo comando!",
  smsOnlyPremium: () => "💎 Questo comando è disponibile solo per utenti premium!",
  smsInvalidCommand: () => "❌ Comando non valido",
  smsNoText: () => "❌ Inserisci del testo",
  smsNoMedia: () => "❌ Invia o rispondi a un media",
  
  // AI e ChatGPT
  aiNoQuery: () => "⚠️ *Inserisci una richiesta valida per ChatGPT!*\n\n📌 Esempi:\n{prefix}{command} Raccontami una barzelletta\n{prefix}{command} Suggeriscimi 5 libri fantasy\n{prefix}{command} Codice HTML per una pagina con login",
  aiError: () => "❌ Si è verificato un errore durante la generazione della risposta. Riprova più tardi.",
  aiProcessing: () => "🤖 Sto elaborando la tua richiesta...",
  
  // Sistema benvenuto/addio
  welcomeTitle: () => "✧ BENVENUTO! ✧",
  goodbyeTitle: () => "✧ ADDIO! ✧",
  welcomeDefault: (user, group, members) => `*Benvenuto/a* @${user} 🎉\n┊ *Gruppo:* ${group}\n╰► *Membri:* ${members}`,
  goodbyeDefault: (user, members) => `*Arrivederci* @${user} 👋\n┊ Ha lasciato il gruppo\n╰► *Membri rimasti:* ${members}`,
  
  welcomeSetHelp: () => `🎉 *Imposta messaggio di benvenuto*

*Uso:* {command} <messaggio>

*Variabili disponibili:*
• @user - Tag dell'utente
• $nome - Nome dell'utente  
• $gruppo - Nome del gruppo
• $membri - Numero membri
• $numero - Numero di telefono
• $tag - Tag utente (alias di @user)

*Esempio:*
{command} Ciao @user! 👋 Benvenuto/a in $gruppo! Ora siamo $membri membri! 🎉

*Per ripristinare il messaggio predefinito:*
{command} reset`,
  
  goodbyeSetHelp: () => `👋 *Imposta messaggio di addio*

*Uso:* {command} <messaggio>

*Variabili disponibili:*
• @user - Tag dell'utente
• $nome - Nome dell'utente  
• $gruppo - Nome del gruppo
• $membri - Numero membri
• $numero - Numero di telefono
• $tag - Tag utente (alias di @user)

*Esempio:*
{command} Addio @user! 😢 Ci mancherai in $gruppo. Rimaniamo in $membri membri.

*Per ripristinare il messaggio predefinito:*
{command} reset`,
  
  welcomeReset: () => "✅ Messaggio di benvenuto ripristinato al predefinito!",
  goodbyeReset: () => "✅ Messaggio di addio ripristinato al predefinito!",
  welcomeSet: () => "✅ Messaggio di benvenuto personalizzato impostato!",
  goodbyeSet: () => "✅ Messaggio di addio personalizzato impostato!",
  
  // Sistema lingua
  languageChanged: (params) => `🌍 Lingua cambiata in: ${params?.lang === 'it' ? 'Italiano 🇮🇹' : 'English 🇺🇸'}`,
  languageHelp: () => `🌍 *Gestione Lingua*\n\n*Lingue disponibili:*\n• 🇮🇹 Italiano (it)\n• 🇺🇸 English (en)\n\n*Uso:*\n{prefix}lingua it - Imposta italiano\n{prefix}lingua en - Imposta inglese\n{prefix}lingua - Mostra lingua attuale`,
  currentLanguage: (params) => `🌍 Lingua attuale: ${params?.lang === 'it' ? 'Italiano 🇮🇹' : 'English 🇺🇸'}`,
  invalidLanguage: () => "❌ Lingua non valida. Usa 'it' per italiano o 'en' per inglese.",
  
  wordleWin: 'Complimenti! Hai indovinato la parola in {attempts} tentativi! 🎉',
  
  // Sistema admin
  adminOnly: () => "👑 Solo gli amministratori possono usare questo comando!",
  ownerOnly: () => "🔒 Solo il proprietario del bot può usare questo comando!",
  
  // Sistema anti-spam
  antiSpamWarning: () => "⚠️ Non fare spam! Rallenta con i messaggi.",
  antiSpamMuted: () => "🔇 Sei stato silenziato per spam.",
  
  // Sistema file e media
  fileNotFound: () => "📁 File non trovato",
  fileTooLarge: () => "📁 File troppo grande",
  invalidFormat: () => "📁 Formato file non valido",
  
  // Sistema gruppi
  groupInfoUpdated: () => "ℹ️ Informazioni gruppo aggiornate",
  userPromoted: (user) => `👑 @${user} è stato promosso ad amministratore`,
  userDemoted: (user) => `👤 @${user} è stato rimosso dagli amministratori`,
  userKicked: (user) => `🚫 @${user} è stato rimosso dal gruppo`,
  
  // Sistema economia (se presente)
  noCoins: () => "💰 Non hai abbastanza monete!",
  coinsEarned: (amount) => `💰 Hai guadagnato ${amount} monete!`,
  
  // Sistema help
  helpMenu: () => `📋 *Menu Aiuto ChatUnity Bot*\n\n🤖 *Comandi AI:*\n• {prefix}ia <testo> - ChatGPT\n• {prefix}img <testo> - Genera immagini\n\n👥 *Comandi Gruppo:*\n• {prefix}benvenuto - Gestisci messaggi benvenuto\n• {prefix}antilink - Attiva/disattiva antilink\n\n🌍 *Lingua:*\n• {prefix}lingua <it/en> - Cambia lingua\n\n📞 *Supporto:*\n• {prefix}support - Contatta il supporto`,
  
  // Menu system
  mainMenuTitle: () => '𝑴𝑬𝑵𝑼 𝑷𝑹𝑰𝑵𝑪𝑰𝑷𝑨𝑳𝑬',
  adminMenuTitle: () => '𝑴𝑬𝑵𝑼 𝑨𝑫𝑴𝑰𝑵',
  adminCommands: () => '𝑪𝑶𝑴𝑨𝑵𝑫𝑰 𝑨𝑫𝑴𝑰𝑵',
  chooseMenu: () => 'Scegli un menu:',
  mainMenuButton: () => '🏠 Menu Principale',
  ownerMenuButton: () => '👑 Menu Owner',
  securityMenuButton: () => '🚨 Menu Sicurezza',
  groupMenuButton: () => '👥 Menu Gruppo',
  aiMenuButton: () => '🤖 Menu IA',
  promoteCommand: () => 'promuovi /mettiadmin',
  demoteCommand: () => 'retrocedi /togliadmin',
  warnCommands: () => 'warn / unwarn',
  muteCommands: () => 'muta / smuta',
  setScheduleCommand: () => 'setorario',
  setNameCommand: () => 'setnome',
  hidetagCommand: () => 'hidetag',
  kickCommand: () => 'kick / cacca',
  adminsCommand: () => 'admins',
  tagallCommand: () => 'tagall',
  openCloseCommand: () => 'aperto / chiuso',
  setWelcomeCommand: () => 'setwelcome',
  setByeCommand: () => 'setbye',
  inactiveCommand: () => 'inattivi',
  listNumCommand: () => 'listanum + prefisso',
  cleanupCommand: () => 'pulizia + prefisso',
  clearPlayCommand: () => 'clearplay',
  rulesCommand: () => 'regole/setregole',

  dsCommand: () => 'ds',
  listWarnCommand: () => 'listawarn',
  linkCommand: () => 'link',
  linkQrCommand: () => 'linkqr',
  poweredBy: () => 'ᴘᴏᴡᴇʀᴇᴅ ʙʏ',
  
  // Menu gruppo
  groupMenuTitle: () => '𝑴𝑬𝑵𝑼 𝐆𝐑𝐔𝐏𝐏𝐎',
  memberCommands: () => '𝑪𝑶𝑴𝑨𝑵𝑫𝑰 𝑷𝑬𝑹 𝑰 𝑴𝑬𝑴𝑩𝑹𝑰',
  musicAudioSection: () => 'MUSICA & AUDIO',
  infoUtilitySection: () => 'INFORMAZIONI & UTILITÀ',
  imageEditSection: () => 'IMMAGINI & MODIFICA',
  pokemonSection: () => 'POKEMON',
  gangSystemSection: () => 'GANG SYSTEM',
  gamesCasinoSection: () => 'GIOCHI & CASINÒ',
  economyRankingSection: () => 'ECONOMIA & CLASSIFICHE',
  socialInteractionSection: () => 'INTERAZIONI SOCIALI',
  howMuchSection: () => 'QUANTO È?',
  personalityTestSection: () => 'TEST PERSONALITÀ',
  songCommand: () => 'canzone',
  audioCommand: () => 'audio',
  videoCommand: () => 'video',
  artistTitleCommand: () => 'artista-titolo',
  cityCommand: () => 'città',
  textCommand: () => 'testo',
  groupCommand: () => 'gruppo',
  repoCommand: () => 'repo',
  userCommand: () => 'utente',
  topicCommand: () => 'argomento',
  checkSiteCommand: () => 'check sito',
  photoToStickerCommand: () => 'foto a sticker',
  stickerToPhotoCommand: () => 'sticker a foto',
  improveQualityCommand: () => 'migliora qualità foto',
  photoCommand: () => 'foto',
  hiddenPhotoCommand: () => 'foto nascosta',
  memeCommand: () => 'meme',
  fromStickerCommand: () => 'da sticker',
  blurImageCommand: () => 'sfoca immagine',
  comingSoonCommand: () => 'in arrivo',
  quantityCommand: () => 'quantità',
  headsOrTailsCommand: () => 'testa o croce',
  mathProblemCommand: () => 'problema mate',
  rockPaperScissorsCommand: () => 'sasso carta forbici',
  pokemonInfoCommand: () => 'info Pokémon',
  balanceCommand: () => 'saldo',
  topUsersCommand: () => 'top utenti',
  buyUCCommand: () => 'acquista UC',
  withdrawUCCommand: () => 'UC dalla banca',
  earnXPCommand: () => 'guadagna XP',
  proposalCommand: () => 'proposta',
  endRelationshipCommand: () => 'fine relazione',
  affinityCommand: () => 'affinità',
  charmCommand: () => 'fascino',
  createFightCommand: () => 'crea litigi',
  truthOrDareCommand: () => 'obb o v',
  versionLabel: () => '𝑵𝑬𝑹𝑺𝑰𝑶𝑵𝑬',
  collabLabel: () => '𝐂𝐎𝐋𝐋𝐀𝐁: 𝐎𝐍𝐄 𝐏𝐈𝐄𝐂𝐄',
  supportLabel: () => '𝐒𝐔𝐏𝐏𝐎𝐑𝐓𝐎',
  
  // Menu owner
  ownerMenuTitle: () => '𝑴𝑬𝑵𝑼 𝑶𝑾𝑵𝑬𝑹',
  ownerReservedCommands: () => '𝑪𝑶𝑴𝑨𝑵𝑫𝑰 𝑹𝑰𝑺𝑬𝑹𝑽𝑨𝑻𝑰 𝑨𝑳𝑳\'𝑶𝑾𝑵𝑬𝑹',
  setNameCommand: () => 'impostanome',
  resetNameCommand: () => 'resetnome',
  manageCommand: () => 'gestisci',
  setGroupsCommand: () => 'setgruppi',
  addGroupsCommand: () => 'aggiungigruppi',
  resetGroupsCommand: () => 'resetgruppi',
  setPpCommand: () => 'setpp',
  banUserCommand: () => 'banuser',
  unbanUserCommand: () => 'unbanuser',
  blockUserCommand: () => 'blockuser',
  unblockUserCommand: () => 'unblockuser',
  getFileCommand: () => 'getfile',
  saveCommand: () => 'salva',
  dpCommand: () => 'dp',
  getPluginCommand: () => 'getplugin',
  joinCommand: () => 'join',
  outCommand: () => 'out',
  prefixCommand: () => 'prefisso',
  resetPrefixCommand: () => 'resetprefisso',
  godModeCommand: () => 'godmode',
  resetCommand: () => 'azzera',
  addCommand: () => 'aggiungi',
  removeCommand: () => 'rimuovi',
  everyGroupCommand: () => 'everygroup',
  banChatCommand: () => 'banchat',
  unbanChatCommand: () => 'unbanchat',
  restartCommand: () => 'riavvia',
  shutdownBotCommand: () => 'spegnibot',
  updateBotCommand: () => 'aggiornabot',
  imageParam: () => 'immagine',
  pluginParam: () => 'plugin',
  linkParam: () => 'link',
  autoAdminParam: () => 'autoadmin',
  numMessagesParam: () => 'num. messaggi',
  commandParam: () => 'comando',
  groupParam: () => 'gruppo',
  
  // Menu AI
  aiMenuTitle: () => '𝑴𝑬𝑵𝑼 𝑫𝑬𝑳 𝑩𝑶𝑻',
  generalCommands: () => '𝑪𝑶𝑴𝑨𝑵𝑫𝑰 𝑮𝑬𝑵𝑬𝑹𝑨𝑳𝑰',
  iaCommand: () => 'ia',
  alyaCommand: () => 'Alya',
  geminiCommand: () => 'gemini',
  chatgptCommand: () => 'chatgpt',
  deepseekCommand: () => 'deepseek',
  voiceCommand: () => 'vocale',
  imageCommand: () => 'immagine',
  image2Command: () => 'immagine2',
  image3Command: () => 'immagine3',
  animalInfoCommand: () => 'infoanimale',
  kcalCommand: () => 'kcal',
  summaryCommand: () => 'riassunto',
  recipeCommand: () => 'ricetta',
  
  // Menu Sicurezza
  securityMenuTitle: () => '𝑴𝑬𝑵𝑼 𝐅𝐔𝐍𝐙𝐈𝐎𝐍𝐈',
  activateDisable: () => '𝐀𝐓𝐓𝐈𝐕𝐀/𝐃𝐈𝐒𝐀𝐁𝐈𝐋𝐈𝐓𝐀',
  howToUse: () => '𝐂𝐎𝐌𝐄 𝐒𝐈 𝐔𝐒𝐀',
  activateFunction: () => 'attiva [funzione]',
  disableFunction: () => 'disabilita [funzione]',
  
  // AI DeepSeek
  deepseekNoText: () => '*Inserisci un testo per parlare con DeepSeek AI.*',
  deepseekNoResponse: () => '❌ Non è stata ottenuta una risposta valida da DeepSeek AI.',
  deepseekError: () => '*❌ Errore durante l\'elaborazione della richiesta.*',
  
  // AI Gemini
  geminiNoText: () => 'Che vuoi?',
  geminiNoResponse: () => 'Non ho ricevuto una risposta valida dall\'API. Riprova più tardi.',
  geminiError: () => 'Si è verificato un errore. Per favore, riprova più tardi.',
  geminiConsoleError: () => 'Errore nel comando',
  
  // AI Riassunto
  summaryUsage: () => '❗ Usa il comando così:\n<comando> <testo lungo>\nOppure rispondi a un messaggio lungo con il comando',
  summaryTooLong: () => '❌ Il testo è troppo lungo. Limite massimo: 2500 caratteri.',
  summaryEmptyResponse: () => 'Risposta vuota dall\'API.',
  summaryTitle: () => 'Riassunto',
  summaryConsoleError: () => '[❌ riassunto plugin errore]',
  summaryError: () => '⚠️ Errore durante la generazione del riassunto. Riprova più tardi.',
  
  // AI Shazam
  shazamFileTooLarge: () => '╯⊱⚠️⊱ *ATTENZIONE | WARNING* ⊱⚠️⊱╮\n\nIl file che hai caricato è troppo grande, ti consigliamo di tagliare il file in un frammento più piccolo. 10-20 secondi di audio sono sufficienti per l\'identificazione',
  shazamSearchResult: () => 'RISULTATO DELLA RICERCA',
  shazamTitle: () => 'TITOLO',
  shazamArtist: () => 'ARTISTA',
  shazamAlbum: () => 'ALBUM',
  shazamGenre: () => 'GENERE',
  shazamReleaseDate: () => 'DATA DI PUBBLICAZIONE',
  shazamNotFound: () => 'Non trovato',
  shazamWrongUsage: () => '╯⊱❗️⊱ *USO ERRATO* ⊱❗️⊱╮\n\nRISPONDI A UN AUDIO O VIDEO',
  
  // AI Support
  supportGreeting: () => 'Ciao! sono l\'assistente IA di chatunity-bot come posso aiutarti oggi?',
  supportNoResponse: () => 'Non ho ricevuto una risposta valida dall\'API. Riprova più tardi.',
  supportError: () => 'Si è verificato un errore. Per favore, riprova più tardi.',
  supportConsoleError: () => 'Errore nel comando',
  
  // AI Voice
  voiceFFmpegError: () => 'ffmpeg non trovato o errore nell\'elaborazione audio. Assicurati che ffmpeg sia installato e accessibile nel PATH.',
  voiceDefaultResponse: () => 'Cazzo vuoi',
  voiceNoUnderstand: () => 'Non ho capito, puoi ripetere?',
  voiceInvalidFile: () => 'Errore: file audio non valido.',
  voiceError: () => 'Errore sconosciuto. Riprova più tardi.',
  voiceConsoleError: () => 'Errore nel comando',
  
  // Admin Delete Session
  adminDeleteSessionDirectUse: () => '*🚨 𝐔𝐭𝐢𝐥𝐢𝐳𝐳𝐢 𝐪𝐮𝐞𝐬𝐭𝐨 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐝𝐢𝐫𝐞𝐭𝐭𝐚𝐦𝐞𝐧𝐭𝐞 𝐧𝐞𝐥 𝐧𝐮𝐦𝐞𝐫𝐨 𝐝𝐞𝐥 𝐛𝐨𝐭.*',
  adminDeleteSessionEmpty: () => '*❌ 𝐋𝐚 𝐜𝐚𝐫𝐭𝐞𝐥𝐥𝐚 𝐝𝐞𝐥𝐥𝐞 𝐬𝐞𝐬𝐬𝐢𝐨𝐧𝐢 𝐞̀ 𝐯𝐮𝐨𝐭𝐚 o 𝐧𝐨𝐧 𝐞𝐬𝐢𝐬𝐭𝐞.*',
  adminDeleteSessionAlreadyEmpty: () => '❗ 𝐋𝐞 𝐬𝐞𝐬𝐬𝐢𝐨𝐧𝐢 𝐬𝐨𝐧𝐨 𝐯𝐮𝐨𝐭𝐞, 𝐫𝐢𝐩𝐫𝐨𝐯𝐚 𝐭𝐫𝐚 𝐩𝐨𝐜𝐨 𝐧𝐞 𝐡𝐨 𝐛𝐢𝐬𝐨𝐠𝐧𝐨 ‼️',
  adminDeleteSessionSuccess: () => '🔥 𝐒𝐨𝐧𝐨 𝐬𝐭𝐚𝐭𝐢 𝐞𝐥𝐢𝐦𝐢𝐧𝐚𝐭𝐢 ${count} 𝐚𝐫𝐜𝐡𝐢𝐯𝐢 𝐝𝐞𝐥𝐥𝐞 𝐬𝐞𝐬𝐬𝐢𝐨𝐧𝐢! 𝐆𝐫𝐚𝐳𝐢𝐞 𝐩𝐞𝐫 𝐚𝐯𝐞𝐫𝐦𝐢 𝐬𝐯𝐮𝐨𝐭𝐚𝐭𝐨😼',
  adminDeleteSessionError: () => '❌ 𝐄𝐫𝐫𝐨𝐫𝐞 𝐝𝐢 𝐞𝐥𝐢𝐦𝐢𝐧𝐚𝐳𝐢𝐨𝐧𝐞!',
  
  // Admin Link QR
  adminLinkQRSuccess: () => 'Ecco il QR Code per il link del gruppo!',
  adminLinkQRError: () => 'Errore durante la generazione del QR Code:',
  
  menuFooter: () => 'Scegli un menu:',
  menuAdmin: () => '🛡️ Menu Admin',
  menuOwner: () => '👑 Menu Owner',
  menuSecurity: () => '🚨 Menu Sicurezza',
  menuGroup: () => '👥 Menu Gruppo',
  menuAI: () => '🤖 Menu IA',
  
  // Menu commands
  staffCommand: () => 'staff',
  hegemoniaCommand: () => 'egemonia',
  candidatesCommand: () => 'candidati',
  installCommand: () => 'installa',
  guideCommand: () => 'guida',
  channelsCommand: () => 'canali',
  systemCommand: () => 'sistema',
  faqCommand: () => 'FAQ',
  pingCommand: () => 'ping',
  reportCommand: () => 'segnala',
  suggestCommand: () => 'consiglia',
  newsCommand: () => 'novità',
  
  // Menu labels
  versionLabel: () => '𝑽𝑬𝑹𝑺𝑰𝑶𝑵𝑬',
  collabLabel: () => '𝐂𝐎𝐋𝐋𝐀𝐁: 𝐎𝐍𝐄 𝐏𝐈𝐄𝐂𝐄',
  usersLabel: () => '𝐔𝐓𝐄𝐍𝐓𝐈',
  
  // Event system
  eventName: () => 'Evento ChatUnity',
  eventDescription: () => 'Partecipa al nostro evento!',
  eventLocationName: () => 'Sede evento',
  
  // AI Image generation
  aiImgHelp: () => 'Per favore, scrivi una descrizione per generare l\'immagine.',
  aiImgProcessing: () => '> CREO IMMAGINE ...🔥',
  aiImgError: () => '❌ Errore durante la generazione dell\'immagine.',
  aiImgSuccess: () => '✅ Immagine generata con successo!',
  
  // Admin requests
  smsBotNotAdmin: () => 'Devo essere admin per eseguire questa azione.',
  noRequestsToAccept: () => 'Non ci sono richieste da accettare.',
  requestsAccepted: (count) => `✅ Accettate ${count} richieste con successo.`,
  acceptRequestsError: () => 'Errore durante l\'accettazione delle richieste.',
  
  // Messaggi di sistema
  botStarted: () => "🤖 ChatUnity Bot avviato correttamente!",
  botStopped: () => "🤖 ChatUnity Bot arrestato",
  connectionLost: () => "📡 Connessione persa, riconnessione in corso...",
  connectionRestored: () => "📡 Connessione ripristinata!",
  
  // Errori comuni
  networkError: () => "🌐 Errore di rete, riprova più tardi",
  serverError: () => "🔧 Errore del server, riprova più tardi",
  unknownError: () => "❓ Errore sconosciuto",
  
  // Messaggi di conferma
  confirmAction: () => "❓ Sei sicuro di voler continuare? Rispondi con 'si' o 'no'",
  actionCancelled: () => "❌ Azione annullata",
  actionConfirmed: () => "✅ Azione confermata",
  
  // Sistema download
  downloadStarted: () => "⬇️ Download iniziato...",
  downloadCompleted: () => "✅ Download completato!",
  downloadFailed: () => "❌ Download fallito",
  
  // Sistema sticker
  stickerCreated: () => "🎨 Sticker creato con successo!",
  
  // Sistema pin messaggi
  pinReplyToMessage: () => "⚠️ Rispondi a un messaggio per fissarlo.",
  pin1Day: () => "⏳ 1 Giorno",
  pin7Days: () => "⏳ 7 Giorni",
  pin30Days: () => "⏳ 30 Giorni",
  pinChooseDuration: () => "Scegli per quanto tempo vuoi fissare il messaggio:",
  pinNoMessageQueued: () => "❌ Nessun messaggio da fissare. Usa prima il comando pin rispondendo a un messaggio.",
  pinError: () => "❌ Errore nel fissare il messaggio.",
  unpinReplyToMessage: (params) => `⚠️ Rispondi a un messaggio per ${params?.action || 'eseguire l\'azione'}.`,
  unpinAction: () => "rimuoverlo dai fissati",
  executeAction: () => "eseguire l'azione",
  commandError: () => "❌ Errore nell'eseguire il comando.",
  
  // Sistema foto profilo
  profilePicBotError: () => "🚫 Impossibile ottenere la foto profilo del bot.",
  profilePicCaption: () => "📸",
  profilePicNotFound: (params) => `@${params?.user || 'utente'} 𝐧𝐨𝐧 𝐡𝐚 𝐮𝐧𝐚 𝐟𝐨𝐭𝐨 𝐩𝐫𝐨𝐟𝐢𝐥𝐨 🚫`,
  
  // Sistema accettazione automatica numeri italiani
  adminOnlyCommand: () => "*Solo gli admin possono usare questo comando*",
  botAdminRequired: () => "*Il bot deve essere admin per usare questa funzione*",
  italianNumbersDisabled: () => "*❌ Accettazione automatica numeri italiani disattivata*",
  italianNumbersEnabled: () => "*✅ Accettazione automatica numeri italiani attivata*\n\nI numeri italiani (39) verranno accettati automaticamente, gli altri rifiutati",
  
  // Sistema rifiuto richieste
  groupOnlyCommand: () => "Questo comando si usa solo nei gruppi.",
  botAdminRequiredReject: () => "Devo essere admin per rifiutare le richieste.",
  noRequestsToReject: () => "Non ci sono richieste da rifiutare.",
  noRequestsWithPrefix: (params) => `Nessuna richiesta con prefisso +${params?.prefix || ''}.`,
  noRequestsRejected: () => "Nessuna richiesta rifiutata.",
  requestsRejectedSuccess: (params) => `❌ Rifiutate ${params?.count || 0} richieste con successo${params?.prefix ? ` con prefisso +${params.prefix}` : ""}.`,
  rejectRequestsError: () => "Errore durante il rifiuto delle richieste.",
  
  // Sistema selezione sport
  sportFootball: () => "⚽ Calcio",
  sportBasket: () => "🏀 Basket",
  sportTennis: () => "🎾 Tennis",
  sportFormula1: () => "🏎️ Formula 1",
  sportMMA: () => "🥊 MMA",
  sportCycling: () => "🚴‍♂️ Ciclismo",
  chooseSportMessage: () => "📌 *Scegli lo sport che vuoi seguire per ricevere le notizie personalizzate:*",
  chooseSportFooter: () => "💡 Puoi cambiarlo in qualsiasi momento",
  
  // Sistema tag nascosto
  tagBy: () => "Tag by",
  tagError: () => "Errore .tag:",
  
  // Sistema file owner
  fileNameRequired: () => "⚠️ Devi specificare il nome del file da creare. Es: `.file nome.txt`",
  fileAlreadyExists: (params) => `⚠️ Il file "${params?.fileName || 'file'}" esiste già.`,
  fileCreationError: (params) => `❌ Errore nella creazione del file: ${params?.error || 'errore sconosciuto'}`,
  fileCreatedSuccess: (params) => `✅ Il file "${params?.fileName || 'file'}" è stato creato con successo nella cartella del bot.`,
  
  // Sistema AI Alya
  alyaWhatDoYouWant: () => "Che vuoi?",
  alyaNoValidResponse: () => "Non ho ricevuto una risposta valida dall'API. Riprova più tardi.",
  alyaError: (params) => `Si è verificato un errore. Per favore, riprova più tardi.\n\n#report ${params?.command || 'comando'}\n\n${wm}`,
  
  // Sistema lista gruppi
  groupListTitle: (params) => `𝐋𝐈𝐒𝐓𝐀 𝐃𝐄𝐈 𝐆𝐑𝐔𝐏𝐏𝐈 𝐃𝐈 ${params?.botName || 'Bot'}`,
  totalGroups: () => "𝐓𝐨𝐭𝐚𝐥𝐞 𝐆𝐫𝐮𝐩𝐩𝐢",
  nameNotAvailable: () => "Nome non disponibile",
  notAdmin: () => "Non sono admin",
  error: () => "Errore",
  
  // Sistema join gruppo
  invalidLink: () => "Link non valido!",
  joiningGroup: () => "😎 Attendi 3 secondi, sto entrando nel gruppo",
  groupJoinGreeting: (params) => `Ciao amici di ${params?.groupName || 'gruppo'}\n\nI miei comandi sono visualizzabili in ${params?.prefix || '.'}menu`,
  botAlreadyInGroup: () => "Il bot è già nel gruppo",
  
  // Sistema script on/off
  scriptNameRequired: () => "Scrivi il nome dello script, esempio: .offscript info",
  fileNotFound: () => "File non trovato.",
  scriptAlreadyOff: () => "Script è già spento.",
  scriptTurnedOff: (params) => `Script ${params?.file || 'file'} spento.`,
  scriptTurnedOn: (params) => `Script ${params?.file || 'file'} riattivato.`,
  
  // Sistema server/comando
  serverCommandRequired: () => "⚠️ Devi specificare il comando da eseguire. Es: `.server ls -la`",
  executingCommand: (params) => `🔄 Eseguendo comando: "${params?.cmd || 'comando'}"`,
  executionError: (params) => `❌ Errore durante l'esecuzione: ${params?.error || 'errore sconosciuto'}`,
  output: () => "Output",
  errorsWarnings: () => "Errori/Avvisi",
  commandExecutedNoOutput: () => "✅ Comando eseguito senza output",
  outputTruncated: () => "... (output troncato)",
  
  // Sistema zip/backup
  zipUsage: (params) => `⚠️ Usa: ${params?.command || 'comando'} <nome_archivio>`,
  creatingBackup: () => "🔄 Creazione del backup in corso...",
  backupCreatedSending: (params) => `✅ Backup ${params?.archiveName || 'archivio'}.zip creato. Inviando...`,
  compressionError: (params) => `❌ Errore durante la compressione: ${params?.error || 'errore sconosciuto'}`,
  
  // Sistema antispam
  spamDetectedModifying: () => "Spam rilevato! Modificando le impostazioni del gruppo...",
  onlyAdminsCanSend: () => "Solo gli amministratori possono inviare messaggi.",
  userNotFoundOrRemoved: () => "Utente non trovato o già rimosso.",
  userIsAdminNotRemoved: () => "L'utente è un amministratore e non verrà rimosso.",
  allSpamMessagesDeleted: () => "Tutti i messaggi di spam sono stati eliminati.",
  chatReactivatedForAll: () => "Chat riattivata per tutti i membri.",
  antispamDetected: () => "*antispam by Origin detected*",
  antispamNotificationSent: () => "Messaggio di notifica antispam inviato.",
  spamCounterReset: () => "Contatore di spam per l'utente resettato.",
  spamHandlingError: () => "Errore durante la gestione dello spam:",
  botNotAdminOrRestrictionDisabled: () => "Bot non è amministratore o la restrizione è disattivata. Non posso eseguire l'operazione.",
  spamCounterResetTimeout: () => "Contatore di spam per l'utente resettato dopo il timeout.",
  timeoutExpiredReset: () => "Timeout scaduto. Reset del contatore di spam per l'utente.",
  stickerFailed: () => "❌ Impossibile creare lo sticker",
  
  // Sistema musica
  musicNotFound: () => "🎵 Musica non trovata",
  musicDownloading: () => "🎵 Download musica in corso...",
  musicReady: () => "🎵 Musica pronta!",


  egemoniaMainText: () => `╭━〔*🌐 PROGETTO EGEMONIA*〕━┈⊷
 L'*Egemonia* è un progetto ideato dal founder di ChatUnity per riunire i più grandi developer di bot privati:

┃◈ • 333bot
┃◈ • BixbyBot
┃◈ • OriginBot
┃◈ • UniversalBot
┃◈ • TurboBot
┃◈ • OnixBot
┃◈ • VareBot

 Tutti insieme per portare ChatUnityBot in concorrenza globale, aiutando con la creazione/fix di plugin.
 Dalla versione 5.0 sono già presenti plugin creati da questi sviluppatori!
╰━━━━━━━━━━━━━━⊷

*Scopri di più su ogni bot cliccando sui bottoni qui sotto!*`,

  egemoniaFooter: () => 'Powered by ChatUnity Egemonia',

  button_333bot: () => "🤖 333bot",
  button_bixby: () => "🤖 BixbyBot",
  button_origin: () => "🤖 OriginBot",
  button_universal: () => "🤖 UniversalBot",
  button_turbo: () => "🤖 TurboBot",
  button_onix: () => "🤖 OnixBot",
  button_varebot: () => "🤖 VareBot",

  returnToEgemonia: () => 'Torna indietro con .egemonia',
  backButton: () => "🔙 Torna a Egemonia",

  botInfo_333bot: () => "🤖 *333bot*\nBot storico italiano creato da Gab 333, famoso per la modularità, la gestione gruppi e oltre 100 plugin attivi.",
  botInfo_bixbybot: () => "🤖 *BixbyBot*\nInnovativo e versatile, specializzato in automazioni e risposte smart.",
  botInfo_originbot: () => "🤖 *OriginBot*\nBot ricco di funzionalità di sicurezza e automazioni, la sua velocità è imbattibile.",
  botInfo_universalbot: () => "🤖 *UniversalBot*\nBot multiuso, supporta molte piattaforme e integrazioni.",
  botInfo_turbobot: () => "🤖 *TurboBot*\nOttimizzato per performance e gestione di grandi gruppi.",
  botInfo_onixbot: () => "🤖 *OnixBot*\nOgni risposta, un tocco di classe. L'eleganza si fa notare",
  botInfo_varebot: () => "🤖 *VareBot*\nVareBot è un bot versatile e ricco di API, pensato per offrire funzionalità utili e comandi divertenti in un'unica esperienza semplice e veloce!",

   candidatiText: () => `🚀 𝐕𝐮𝐨𝐢 𝐞𝐧𝐭𝐫𝐚𝐫𝐞 𝐚 𝐟𝐚𝐫 𝐩𝐚𝐫𝐭𝐞 𝐝𝐞𝐥𝐥𝐨 𝐬𝐭𝐚𝐟𝐟 𝐝𝐢 𝐂𝐡𝐚𝐭𝐔𝐧𝐢𝐭𝐲, fare esperienza e essere riconosciuto come staffer?🚀

Questo è il tuo momento! 𝐂𝐨𝐦𝐩𝐢𝐥𝐚 𝐢𝐥 𝐦𝐨𝐝𝐮𝐥𝐨 𝐪𝐮𝐢 𝐬𝐨𝐭𝐭𝐨 (𝐫𝐢𝐦𝐚𝐫𝐫𝐚̀ 𝐚𝐧𝐨𝐧𝐢𝐦𝐨) per candidarti e mostrare le tue competenze.

🔥 𝐂𝐨𝐬𝐚 𝐭𝐢 𝐚𝐬𝐩𝐞𝐭𝐭𝐚:

•	𝐑𝐢𝐜𝐨𝐧𝐨𝐬𝐜𝐞𝐧𝐳𝐚 𝐧𝐞𝐥 𝐛𝐨𝐭 𝐜𝐨𝐦𝐞 𝐜𝐨𝐥𝐥𝐚𝐛𝐨𝐫𝐚𝐭𝐨𝐫𝐞
•	𝐅𝐚𝐫𝐞 𝐞𝐬𝐩𝐞𝐫𝐢𝐞𝐧𝐳𝐚 diretta nel mondo dei bot e della gestione comunitaria
•	𝐀𝐜𝐜𝐞𝐬𝐬𝐨 𝐞𝐬𝐜𝐥𝐮𝐬𝐢𝐯𝐨 ai Bot Beta
•	𝐂𝐨𝐥𝐥𝐚𝐛𝐨𝐫𝐚𝐳𝐢𝐨𝐧𝐞 𝐝𝐢𝐫𝐞𝐭𝐭𝐚 con il team di ChatUnity

Non perdere questa occasione, 𝐜𝐚𝐧𝐝𝐢𝐝𝐚𝐭𝐢 𝐬𝐮𝐛𝐢𝐭𝐨  e dimostra di avere quello che serve!

> 📋 𝐌𝐨𝐝𝐮𝐥𝐨 𝐝𝐢 𝐜𝐚𝐧𝐝𝐢𝐭𝐚𝐭𝐮𝐫𝐚:
https://docs.google.com/forms/d/e/1FAIpQLSd4no8yx-QuRf7xFyIcLYHLSNkF2cRaHvsO_prmlIwdKqBC4Q/viewform?usp=dialog`,

    scaricaOrderText: () => '𝐒𝐂𝐀𝐑𝐈𝐂𝐀 𝐂𝐇𝐀𝐓𝐔𝐍𝐈𝐓𝐘-𝐁𝐎𝐓 💬',
    
    scaricaText: () => `『💬』 ══ •⊰✰⊱• ══ 『💬』

𝐒𝐂𝐀𝐑𝐈𝐂𝐀 𝐂𝐇𝐀𝐓𝐔𝐍𝐈𝐓𝐘-𝐁𝐎𝐓

Segui questi passaggi per installare ChatUnity Bot correttamente su Termux

repository termux https://github.com/chatunitycenter/chatunity-bot

video yt tutorial https://youtube.com/shorts/qek7wWadhtI?si=MrrA3bLWWAsLmpw6

『💬』 ══ •⊰✰⊱• ══ 『💬』

1. Scaricare e installare Termux

Scarica la versione corretta di Termux dal link seguente:

🔗 Scarica Termux 0.119.1

https://www.mediafire.com/file/0npdmv51pnttps0/com.termux_0.119.1-119_minAPI21(arm64-v8a,armeabi-v7a,x86,x86_64)(nodpi)_apkmirror.com.apk/file

Dopo aver scaricato il file APK, installalo sul tuo dispositivo e concedi i permessi richiesti.

『💬』 ══ •⊰✰⊱• ══ 『💬』

2. Configurare Termux

Apri Termux ed esegui il seguente comando:

termux-setup-storage

Quando richiesto, concedi le autorizzazioni necessarie.

『💬』 ══ •⊰✰⊱• ══ 『💬』

3. Installare ChatUnity Bot

Ora esegui il seguente comando per aggiornare Termux:

apt update -y && yes | apt upgrade && pkg install -y bash wget mpv && wget -O - https://raw.githubusercontent.com/chatunitycenter/chatunity-bot/main/chatunity.sh | bash

『💬』 ══ •⊰✰⊱• ══ 『💬』

4. Avviare ChatUnity Bot

Dopo l'installazione, potrai avviare il bot utilizzando il comando che verrà mostrato al termine del processo.

Se riscontri problemi, verifica di aver seguito tutti i passaggi correttamente e controlla eventuali messaggi di errore su Termux.

『💬』 ══ •⊰✰⊱• ══ 『💬』`,

    scaricaTitle: () => '𝙸𝙽𝙵𝙾 𝙳𝙴𝙻 𝙱𝙾𝚃',
    scaricaBody: () => 'ChatUnity',
    scaricaSource: () => 'https://github.com/chatunitycenter/chatunity-bot',
  
guidaText: () => `𝐆𝐔𝐈𝐃𝐀 𝐀𝐈 𝐂𝐎𝐌𝐀𝐍𝐃𝐈 𝐃𝐈 𝐂𝐇𝐀𝐓𝐔𝐍𝐈𝐓𝐘-𝐁𝐎𝐓

\`𝐋𝐈𝐍𝐊 𝐆𝐎𝐎𝐆𝐋𝐄 𝐃𝐎𝐂𝐒:\`
https://docs.google.com/document/d/e/2PACX-1vSgfwbRZrQM2W-3tctvqX7_0eAF-FvU3K_SK8txRfGkNzJjziAIVV8G2EIMg4Ju03TlGIzMKaicjWTH/pub`,

    newsletterName: () => 'ChatUnity Bot',

        canaliText: () => `╭━〔 *🌐 CANALI UFFICIALI* 〕━┈⊷
┃─────────────·๏
┃✨ *ChatUnity* 
┃🔗 https://whatsapp.com/channel/0029VaZVlJZHwXb8naJBQN0J
┃
┃🤖 *ChatUnity-Bot*
┃🔗 https://whatsapp.com/channel/0029Vb32UwhA89MZtd6WRS3G
┃
┃🌍 *ChatUnity Server*
┃🔗 https://whatsapp.com/channel/0029VbA4h0pKmCPS5ozJsm3j
┃╰─────────────·๏
╰━━━━━━━━━━━━━━━━━━━⊷

*Unisciti ai nostri canali per restare aggiornato, ricevere supporto e scoprire tutte le novità!*

💎 _Powered by ChatUnity_`,

    canaliFooter: () => 'Scegli un canale e unisciti!',
        diskSpaceError: () => '✧ Errore nel recupero spazio disco:',
    
    systemStatusText: (params) => `✅️ *STATO DEL SISTEMA*

🚩 *Host ⪼* ${params?.nomeHost || 'N/A'}
🏆 *Piattaforma ⪼* ${params?.piattaforma || 'N/A'}
💫 *Architettura ⪼* ${params?.architettura || 'N/A'}
🥷 *RAM Totale ⪼* ${params?.memoriaTotale || 'N/A'}
🚀 *RAM Libera ⪼* ${params?.memoriaLibera || 'N/A'}
⌛️ *RAM Usata ⪼* ${params?.memoriaUsata || 'N/A'}
🕒 *Tempo di Attività ⪼* ${params?.tempoAttivo || 'N/A'}

🪴 *Utilizzo Memoria Node.js:* 
→ RSS: ${params?.rss || 'N/A'}
→ Heap Totale: ${params?.heapTotal || 'N/A'}
→ Heap Usato: ${params?.heapUsed || 'N/A'}
→ Memoria Esterna: ${params?.external || 'N/A'}
→ Array Buffer: ${params?.arrayBuffers || 'N/A'}

☁️ *Spazio su Disco:*
→ Dimensione Totale: ${params?.dimensioneDisco || 'N/A'}
→ Usato: ${params?.usatoDisco || 'N/A'}
→ Disponibile: ${params?.disponibileDisco || 'N/A'}
→ Percentuale Utilizzo: ${params?.percentualeDisco || 'N/A'}`,

    notAvailable: () => 'Non disponibile',

    newsletterName: (params) => `${params?.botName || 'ChatUnity'}`,
    
    terminiText: (params) => `╭━━〔 *📜 TERMINI DI UTILIZZO & PRIVACY* 〕━━╮
┃
┃ *Tutte le informazioni qui non escludono il proprietario del bot e i Proprietari accreditati per l'uso di ${params?.botName || 'ChatUnity'}.*
┃ _Non siamo responsabili dell'ignoranza che potresti avere riguardo a queste informazioni._
┃
┣━━━〔 🔒 *TERMINI DI PRIVACY* 〕━━━┫
┃ • Siamo consapevoli dell'uso costante che potresti fare del Bot e garantiamo che le informazioni come (immagini, video, link, posizione, audio, sticker, gif, contatti) che fornisci ai numeri ufficiali non saranno condivise con nessuno, né verranno utilizzate al di fuori dell'ambiente del Bot.
┃ • Ciò che fai con il Bot rimane a tuo carico, poiché nei numeri ufficiali la chat viene cancellata ogni 24 ore, in base ai messaggi temporanei di WhatsApp.
┃ • È possibile che nei numeri ufficiali il Bot non sia attivo 24/7, ma ciò non implica che non lo sia o che i proprietari non ufficiali possano farlo.
┃ • La chat anonima del comando *#start*, come suggerisce il nome, non mostrerà alcun dato degli utenti da parte di ${params?.botName || 'ChatUnity'}. Ciò non implica che le persone che utilizzano questa funzione possano condividere i loro dati nei numeri ufficiali.
┃ • I dati che ${params?.botName || 'ChatUnity'} ottiene dagli account ufficiali degli utenti, dai gruppi e dalle impostazioni degli stessi possono essere reinizializzati, modificati e/o rettificati per garantire che il Bot sia in condizioni ottimali per l'uso. (Gli utenti possono richiedere un risarcimento tramite Instagram o tramite il comando *#Reporte* con prove).
┃ • NON siamo responsabili se ci sono alterazioni di questo Bot da parte di numeri non ufficiali o se utilizzano un repository di GitHub che non corrisponde a quello ufficiale, o se implementano integrazioni di terze parti che compromettono gli utenti utilizzando versioni non ufficiali.
┃ • La funzione *Sub Bot* garantisce la sicurezza dei tuoi dati applicata agli account ufficiali.
┃
┣━━━〔 ⚠️ *TERMINI DI USO* 〕━━━┫
┃ • Le informazioni presenti in questo Bot e l'uso che ne fai implicano che tu conosca i Termini e le Condizioni, in modo che non ci siano problemi nell'uso delle funzioni del Bot.
┃ • Il Bot contiene materiale che può essere visibile solo a persone di età superiore ai 18 anni. NON siamo responsabili se non rispetti l'età minima per utilizzare il materiale per adulti.
┃ • Le immagini, i video e gli audio presenti in questo Bot sono di uso pubblico, ma si considera mancanza di rispetto effettuare modifiche al materiale esistente che riporta il nome del Bot o informazioni rilevanti.
┃ • Quando fai una richiesta per l'ingresso in un gruppo con un account ufficiale, è consigliabile che il gruppo non contenga temi di odio, virus, contenuti inappropriati, discriminazione o campagne senza fondamento.
┃ • Se ricevi una comunicazione ufficiale da un numero ufficiale, mantieni il rispetto. Allo stesso modo, se ricevi un messaggio senza aver usato un comando, mantieni il rispetto, poiché potrebbe trattarsi di una persona reale.
┃ • Gli account ufficiali di ${params?.botName || 'ChatUnity'} non sono responsabili dell'uso che fai della funzione "Sub Bot".
┃
┣━━━〔 📌 *CONDIZIONI DI USO* 〕━━━┫
┃ • NON chiamare o effettuare videochiamate al Bot da numeri ufficiali, poiché ciò ostacola il funzionamento del Bot.
┃ • NON utilizzare il Bot da numeri ufficiali per compiere azioni ostili che potrebbero compromettere il funzionamento del Bot.
┃ • NON utilizzare ripetutamente il comando SPAM, poiché potrebbe causare un malfunzionamento del Bot. Inoltre, non inviare al Bot messaggi che potrebbero comprometterne il funzionamento.
┃ • Quando utilizzi determinati comandi che hanno l'obiettivo di causare disagio, inquietudine, fastidio o altri termini simili, verranno applicate le rispettive sanzioni o avvisi per preservare l'integrità degli utenti e il funzionamento di chatunity-bot.
┃
┣━━━〔 🌐 *REPOSITORIO UFFICIALE* 〕━━━┫
┃ https://github.com/chatunitycenter/chatunity-bot
┃
┣━━━〔 💰 *DONAZIONI* 〕━━━┫
┃ *DONA ALLA CREATRICE SU QUESTO ACCOUNT UFFICIALE*
┃ ~ _Se apprezzi e valorizzi il lavoro che ho svolto, puoi aiutarmi con una donazione per continuare questo progetto._
┃ *https://paypal.me/chatunity*
┃
┃ *~ Grazie per aver dedicato del tempo a informarti su chatunity-bot*`,

    defaultBotName: () => '𝐂𝐡𝐚𝐭𝐔𝐧𝐢𝐭𝐲',
    unknownModel: () => 'Modello Sconosciuto',
    
    pingText: (params) => `╭━〔🚀𝑺𝑻𝑨𝑻𝐎 𝑺𝑰𝑺𝑻𝑬𝑴𝑨🚀〕━┈⊷
┃◈╭─────────────·๏
┃◈┃• ⌛ *Uptime*: ${params?.uptime || 'N/A'}
┃◈┃• ⚡ *Ping*: ${params?.speed || 'N/A'} ms
┃◈┃
┃◈┃• 💻 *CPU*: ${params?.cpuModel || 'N/A'}
┃◈┃• 🔋 *Usage*: ${params?.cpuSpeed || 'N/A'} MHz 
┃◈┃
┃◈┃• 💾 *RAM*: ${params?.usedMem || 'N/A'} / ${params?.totalMem || 'N/A'}
┃◈┃• 🟢 *Free*: ${params?.freeMem || 'N/A'}
╰━━━━━━━━━━━━━┈·๏`,

    newsletterName: (params) => `${params?.nomeDelBot || 'ChatUnity'}`,
    pingTitle: (params) => `${params?.nomeDelBot || 'ChatUnity'}`,
    pingBody: (params) => `Versione: ${params?.versioneBot || 'N/A'}`,
    
    thumbnailError: () => 'Errore nel recupero della thumbnail:',
    sendMessageError: () => 'Errore nell invio del messaggio:',
    profilePictureError: () => 'Errore nel recupero della foto profilo:',
    fetchError: () => 'Failed to fetch thumbnail',
    thumbnailFetchError: () => 'Errore nel fetch della thumbnail:',

      reportNoText: () => '⚠ *Inserisci il comando che vuoi segnalare.*',
    reportTooShort: () => '⚠️ *Descrivi meglio il problema (minimo 10 caratteri).*',
    reportTooLong: () => '⚠️ *Lunghezza massima consentita: 1000 caratteri.*',
    
    reportFormat: (params) => `*❌️ \`S E G N A L A Z I O N E\` ❌️*

📱 Numero:
• Wa.me/${params?.sender || 'N/A'}

👤 Utente: 
• ${params?.pushName || 'Anonimo'}

📝 Messaggio:
• ${params?.text || 'N/A'}`,

    anonymous: () => 'Anonimo',
    quotedMessage: () => '📎 Citazione:\n',
    
    reportAdTitle: () => '⚠️ SEGNALAZIONE BUG ⚠️',
    reportAdBody: () => 'Nuova segnalazione ricevuta',
    
    reportSuccess: () => '✅ *La tua segnalazione è stata inviata allo sviluppatore.*\n_⚠ Segnalazioni false possono comportare restrizioni._',
    reportError: () => 'Errore nella segnalazione:',

        proposalNoText: () => '⚠️ *Inserisci il comando che vuoi proporre. es: .consiglia (comando) (spiegazione)*',
    proposalTooShort: () => '⚠️ *Descrivi meglio il comando (minimo 10 caratteri).*',
    proposalTooLong: () => '⚠️ *Lunghezza massima consentita: 1000 caratteri.*',
    
    proposalFormat: (params) => `* \`P R O P O S T A\` *

📱 Numero:
• Wa.me/${params?.sender || 'N/A'}

👤 Utente: 
• ${params?.pushName || 'Anonimo'}

📝 Messaggio:
• ${params?.text || 'N/A'}`,

    proposalAdTitle: () => '⚠️ PROPOSTA COMANDO ⚠️',
    proposalAdBody: () => 'Nuova proposta ricevuta',
    
    proposalSuccess: () => '✅ *La tua proposta è stata inviata allo sviluppatore.*\n_⚠ Comandi illeciti possono comportare restrizioni._',
    proposalError: () => 'Errore nella proposta:',

        newsText: () => `*RILASCIO V6.1*\n\n`
                  + `📅 *Data:* 18/08 \n`
                  + `🆕 *Aggiornamenti principali:*\n`
                  + `• Nuovo comando social\n`
                  + `• Ottimizzato i log su console\n`
                  + `• Ottimizzato aggiorna\n`
                  + `• nuova interfaccia dox\n`
                  + `• nuovi staffer: giusemd & anubi\n`
                  + `• *Cambio gestione security transato a DEATH:*\n`
                  + `  - Nuove funzionalità in security\n`
                  + `  - Ristrutturazione completa del progetto\n`
                  + `• Preparazione per V7.0 con nuove funzionalità\n\n`,

      warnNoMention: () => "❌ Devi menzionare un utente o rispondere a un suo messaggio.",
    warnBot: () => "🚫 Non puoi warnare il bot.",
    warnUserNotFound: () => "❌ Utente non trovato nel database.",
    
    warnMessage: (params) => `⚠️ 𝐀𝐕𝐕𝐄𝐑𝐓𝐈𝐌𝐄𝐍𝐓𝐎 ${params?.current || 0}/𝟑 (𝟑 𝐰𝐚𝐫𝐧=𝐛𝐚𝐧)`,
    warnBanMessage: () => `⛔ 𝐔𝐓𝐄𝐍𝐓𝐄 𝐑𝐈𝐌𝐎𝐒𝐒𝐎 𝐃𝐎𝐏𝐎 3 𝐀𝐕𝐕𝐄𝐑𝐓𝐈𝐌𝐄𝐍𝐓𝐈 (𝐀𝐯𝐞𝐯𝐚 𝐫𝐨𝐭𝐭𝐨 𝐢𝐥 𝐜𝐚𝐳𝐳𝐨)`,
    
    delwarnMessage: (params) => `✅ 𝐀𝐯𝐯𝐞𝐫𝐭𝐢𝐦𝐞𝐧𝐭𝐨 𝐫𝐢𝐦𝐨𝐬𝐬𝐨\n𝐀𝐯𝐯𝐞𝐫𝐭𝐢𝐦𝐞𝐧𝐭𝐢 𝐫𝐢𝐦𝐚𝐧𝐞𝐧𝐭𝐢: ${params?.remaining || 0}`,
    
    newsletterName: (params) => `${params?.nomeDelBot || 'ChatUnity'}`,
    defaultBotName: () => '𝐂𝐡𝐚𝐭𝐔𝐧𝐢𝐭𝐲',

        formatNotSupported: () => '╭━━〔 ❗ 〕━━┈⊷\n┃◈ *Formato non supportato*\n╰━━━━━━━━━━┈·๏',
    detailsError: () => '╭━━〔 ❗ 〕━━┈⊷\n┃◈ *Errore nel recupero dei dettagli*\n╰━━━━━━━━━━┈·๏',
    downloadErrorLog: () => 'Errore nel download:',
    downloadError: () => '╭━━〔 ❗ 〕━━┈⊷\n┃◈ *Errore nel download*\n╰━━━━━━━━━━┈·๏',
    progressErrorLog: () => 'Errore nel progresso:',
    progressError: () => '╭━━〔 ❗ 〕━━┈⊷\n┃◈ *Errore nel check progresso*\n╰━━━━━━━━━━┈·๏',
    
    noInputText: () => '╭━━〔 ❗ 〕━━┈⊷\n┃◈ *Inserisci un titolo o un link*\n╰━━━━━━━━━━┈·๏',
    noResults: () => '╭━━〔 ❗ 〕━━┈⊷\n┃◈ *Nessun risultato trovato*\n╰━━━━━━━━━━┈·๏',
    audioComing: () => '🎵 𝐚𝐮𝐝𝐢𝐨 𝐢𝐧 𝐚𝐫𝐫𝐢𝐯𝐨 𝐚𝐭𝐭𝐞𝐧𝐝𝐢 𝐪𝐮𝐚𝐥𝐜𝐡𝐞 𝐢𝐬𝐭𝐚𝐧𝐭𝐞...',
    videoComing: () => '🎬 𝐯𝐢𝐝𝐞𝐨 𝐢𝐧 𝐚𝐫𝐫𝐢𝐯𝐨 𝐚𝐭𝐭𝐞𝐧𝐝𝐢 𝐪𝐮𝐚𝐥𝐜𝐡𝐞 𝐢𝐬𝐭𝐚𝐧𝐭𝐞...',
    downloadComplete: () => '✅ *Download completato!*',
    noValidLink: () => '╭━━〔 ❗ 〕━━┈⊷\n┃◈ *Nessun link valido trovato*\n╰━━━━━━━━━━┈·๏',
    
    videoTooLong: (params) => `╭━━〔 ❗ 〕━━┈⊷\n┃◈ *Video troppo lungo!*\n┃◈ La durata massima consentita è 5 minuti\n┃◈ Durata attuale: ${params?.timestamp || 'N/A'}\n╰━━━━━━━━━━┈·๏`,
    
    videoInfo: (params) => `╭〔*🎥 𝑰𝑵𝑭𝑶 𝑽𝑰𝑫𝑬𝑶*〕┈⊷
┃◈╭─────────·๏
┃◈┃• ✍️𝒕𝒊𝒕𝒐𝒍𝒐: ${params?.title || 'N/A'}
┃◈┃• ⏳𝒅𝒖𝒓𝒂𝒕𝒂: ${params?.timestamp || 'N/A'}
┃◈┃• 👀𝒗𝒊𝒔𝒖𝒂𝒍: ${params?.views || 'N/A'}
┃◈┃• 🔰𝒄𝒂𝒏𝒂𝒍𝒆: ${params?.author || 'Sconosciuto'}
┃◈┃• 🔳𝒑𝒖𝒃𝒃𝒍𝒊𝒄𝒂𝒕𝒐: ${params?.ago || 'N/A'}
┃◈┃• 🔗𝒍𝒊𝒏𝒌: ${params?.url || 'N/A'}
┃◈└───────┈⊷
╰━━━━━━━━━┈·๏`,

    unknownAuthor: () => 'Sconosciuto',
    chooseFormat: () => 'Scegli un formato:',
    buttonAudio: () => '🎵 𝒔𝒄𝒂𝒓𝒊𝒄𝒂 𝒂𝒖𝒅𝒊𝒐',
    buttonVideo: () => '🎬 𝒔𝒄𝒂𝒓𝒊𝒄𝒂 𝒗𝒊𝒅𝒆𝒐',
    buttonSave: () => '💾 𝒔𝒂𝒍𝒗𝒂 𝒏𝒆𝒍𝒍𝒂 𝒑𝒍𝒂𝒚𝒍𝒊𝒔𝒕',
    
    genericError: (params) => `╭━━〔 ❗ 〕━━┈⊷\n┃◈ *Errore:* ${params?.error || 'Errore sconosciuto'}\n╰━━━━━━━━━━┈·๏`,
    
    newsletterName: () => 'ChatUnity',

  // Errori e messaggi generici
  specifySong: () => 'Specifica un brano da cercare',
  noResults: () => 'Nessun risultato trovato',
  songExists: (params) => `Canzone già in playlist! Usa ${params.prefix}playlist per vedere i brani salvati.`,
  emptyPlaylist: (params) => params.userName ? `${params.userName} non ha brani salvati` : 'La tua playlist è vuota!',
  invalidNumber: () => 'Numero non valido!',
  errorOccurred: (params) => `Errore: ${params.error}`,
  
  // Formattazione canzone
  songFormat: (params) => `🎵 *${params.title}*\n⏳ ${params.timestamp} | 📺 ${params.author}`,
  notAvailable: () => 'N/A',
  unknownAuthor: () => 'Sconosciuto',
  
  // Messaggi di stato
  searching: (params) => `Cerco "${params.query}"...`,
  songSaved: () => '*Canzone salvata!*',
  songDeleted: () => '*Brano eliminato!*',
  
  // Testi playlist
  yourPlaylist: () => 'La tua playlist',
  userPlaylist: (params) => `Playlist di ${params.userName}`,
  moreSongs: (params) => `...e altri ${params.count} brani`,
  
  // Bottoni e interazioni
  selectSong: () => 'Seleziona un brano da riprodurre',
  selectDelete: () => '*Seleziona brano da eliminare*',
  deleteUsage: (params) => `Usa: ${params.prefix}elimina <numero>`,
  
  // Testi pulsanti
  saveNew: () => 'Salva nuovo',
  viewPlaylist: () => 'Vedi Playlist',
  play: () => 'Riproduci',
  delete: () => 'Elimina',
  back: () => 'Indietro',
  restore: () => 'Ripristina',
  user: () => 'Utente',

    lyricsNoInput: () => '✧ Inserisci il nome della canzone nel formato:\n*artista - titolo* oppure *artista titolo*',
  lyricsInvalidFormat: () => '✧ Formato non valido. Usa:\n*artista - titolo* oppure *artista titolo*',
  lyricsMissingInfo: () => '✧ Specifica sia artista che titolo nel formato:\n*artista - titolo* oppure *artista titolo*',
  lyricsNotFound: () => 'Testo non trovato',
  lyricsError: () => '✧ Testo non trovato. Prova con:\n- Un formato diverso (artista - titolo)\n- Controlla ortografia\n- Prova un altro sito se questo non funziona',

   weatherNoCity: () => '❗ Inserisci il nome di una città. Uso: .meteo [nome città]',
  weatherCityNotFound: () => '🚫 Città non trovata. Controlla la scrittura e riprova.',
  weatherError: () => '⚠ Si è verificato un errore durante il recupero delle informazioni meteo. Riprova più tardi.',
  
  weatherInfo: (params) => `
> 🌍 Info Meteo per ${params.city}, ${params.country} 🌍
> 🌡 Temperatura: ${params.temp}°C
> 🌡 Percepita: ${params.feelsLike}°C
> 🌡 Minima: ${params.tempMin}°C
> 🌡 Massima: ${params.tempMax}°C
> 💧 Umidità: ${params.humidity}%
> ☁ Meteo: ${params.weatherMain}
> 🌫 Descrizione: ${params.weatherDesc}
> 💨 Vento: ${params.windSpeed} m/s
> 🔽 Pressione: ${params.pressure} hPa

> © Powered By ChatUnity
  `.trim(),

    translateUsage: () => `*🌍 Uso del comando .traduci 🌍*\n📌 Formato: *.traduci <testo> <lingua>*\n📖 Esempio: *.traduci ciao giapponese*\n\n🌐 *Lingue supportate:* 🌐\n\n`,
    
    languageEntry: (params) => `🔹 ${params?.name || 'N/A'} = \`${params?.code || 'N/A'}\`\n`,
    
    translateSyntax: () => `⚠️ Uso corretto: *.traduci <testo> <lingua>*\n📖 Esempio: *.traduci ciao cinese*`,
    
    languageNotFound: () => `❌ Lingua non riconosciuta. Usa *.traduci* per vedere la lista delle lingue disponibili.`,
    
    noTranslation: () => `Nessuna traduzione trovata.`,
    
    translationResult: (params) => `🌍 *Traduzione:* 🌍\n📌 *Testo originale:* ${params?.text || 'N/A'}\n📖 *Lingua di destinazione:* ${params?.langInput || 'N/A'} (${params?.targetLang || 'N/A'})\n\n🔹 *Risultato:* ${params?.translatedText || 'N/A'}`,
    
    translationErrorLog: () => `Errore nella traduzione:`,
    translationError: () => `❌ Errore nella traduzione. Verifica i parametri e riprova.`,
      timezoneTitle: () => 'Zona:',
  currentZone: () => 'Zona attuale',

    countNoText: () => '> ⓘ 𝐅𝐨𝐫𝐧𝐢𝐬𝐜𝐢 𝐮𝐧 𝐭𝐞𝐬𝐭𝐨 𝐝𝐚 𝐜𝐨𝐧𝐭𝐚𝐫𝐞.',
  countSpecialChars: () => '> ⚠️ 𝐈𝐥 𝐭𝐞𝐬𝐭𝐨 𝐢𝐧𝐬𝐞𝐫𝐢𝐭𝐨 𝐜𝐨𝐧𝐭𝐢𝐞𝐧𝐞 𝐜𝐚𝐫𝐚𝐭𝐭𝐞𝐫𝐢 𝐬𝐩𝐞𝐜𝐢𝐚𝐥𝐢.',
  
  countResult: (params) => {
    if (params.hasNumbers) {
      return ` ⓘ 𝐈𝐥 𝐭𝐞𝐬𝐭𝐨 𝐢𝐧𝐬𝐞𝐫𝐢𝐭𝐨 𝐜𝐨𝐧𝐭𝐢𝐞𝐧𝐞 ${params.wordCount} 𝐩𝐚𝐫𝐨𝐥𝐞 𝐞 ${params.numberCount} 𝐧𝐮𝐦𝐞𝐫𝐢`;
    } else {
      return ` ⓘ 𝐈𝐥 𝐭𝐞𝐬𝐭𝐨 𝐢𝐧𝐬𝐞𝐫𝐢𝐭𝐨 𝐜𝐨𝐧𝐭𝐢𝐞𝐧𝐞 ${params.wordCount} 𝐩𝐚𝐫𝐨𝐥𝐞.`;
    }
  },


  
  // Messaggi di aiuto
  infoSetAgeHelp: () => 'Per impostare la tua età usa il comando .setanni <età>\nPer rimuovere la tua età usa .eliminaanni',
  infoSetIgHelp: () => 'Specifica un nome utente Instagram con .setig <user> oppure usa .delig per rimuoverlo.',
  infoGroupOnly: () => '❌ Questo comando può essere usato solo nei gruppi.',
  
  // Gradi e ruoli
  grade1: () => "𝐏𝐫𝐢𝐧𝐜𝐢𝐩𝐢𝐚𝐧𝐭𝐞 𝐈 😐", grade2: () => "𝐏𝐫𝐢𝐧𝐜𝐢𝐩𝐢𝐚𝐧𝐭𝐞 𝐈𝐈 😐",
  grade3: () => "𝐑𝐞𝐜𝐥𝐮𝐭𝐚 𝐈 🙂", grade4: () => "𝐑𝐞𝐜𝐥𝐮𝐭𝐚 𝐈𝐈 🙂",
  grade5: () => "𝐀𝐯𝐚𝐧𝐳𝐚𝐭𝐨 𝐈 🫡", grade6: () => "𝐀𝐯𝐚𝐧𝐝𝐚𝐭𝐨 𝐈𝐈 🫡",
  grade7: () => "𝐁𝐨𝐦𝐛𝐞𝐫 𝐈 😎", grade8: () => "𝐁𝐨𝐦𝐛𝐞𝐫 𝐈𝐈 😎",
  grade9: () => "𝐏𝐫𝐨 𝐈 😤", grade10: () => "𝐏𝐫𝐨 𝐈𝐈 😤",
  grade11: () => "𝐄́𝐥𝐢𝐭𝐞 𝐈 🤩", grade12: () => "𝐄́𝐭𝐢𝐭𝐞 𝐈𝐈 🤩",
  grade13: () => "𝐌𝐚𝐬𝐭𝐞𝐫 𝐈 💪🏼", grade14: () => "𝐌𝐚𝐬𝐭𝐞𝐫 𝐈𝐈 💪🏼",
  grade15: () => "𝐌𝐢𝐭𝐢𝐜𝐨 𝐈 🔥", grade16: () => "𝐌𝐢𝐭𝐢𝐜𝐨 𝐈𝐈 🔥",
  grade17: () => "𝐄𝐫𝐨𝐞 𝐈 🎖", grade18: () => "𝐄𝐫𝐨𝐞 𝐈𝐈 🎖",
  grade19: () => "𝐂𝐚𝐦𝐩𝐢𝐨𝐧𝐞 𝐈 🏆", grade20: () => "𝐂𝐚𝐦𝐩𝐢𝐨𝐧𝐞 𝐈𝐈 🏆",
  grade21: () => "𝐃𝐨𝐦𝐢𝐧𝐚𝐭𝐨𝐫𝐞 𝐈 🥶", grade22: () => "𝐃𝐨𝐦𝐢𝐧𝐚𝐭𝐨𝐫𝐞 𝐈𝐈 🥶",
  grade23: () => "𝐒𝐭𝐞𝐥𝐥𝐚𝐫𝐞 𝐈 💫", grade24: () => "𝐒𝐭𝐞𝐥𝐥𝐚𝐫𝐞 𝐈𝐈 💫",
  grade25: () => "𝐂𝐨𝐬𝐦𝐢𝐜𝐨 𝐈 🔮", grade26: () => "𝐂𝐨𝐬𝐦𝐢𝐜𝐨 𝐈𝐈 🔮",
  grade27: () => "𝐓𝐢𝐭𝐚𝐧𝐨 𝐈 😈", grade28: () => "𝐓𝐢𝐭𝐚𝐧𝐨 𝐈𝐈 😈",
  gradeMax: () => "𝐄𝐜𝐥𝐢𝐩𝐬𝐢𝐚𝐧𝐨 ❤️‍🔥",
  
  roleFounder: () => '𝐅𝐨𝐮𝐧𝐝𝐞𝐫 ⚜️',
  roleAdmin: () => '𝐀𝐝𝐦𝐢𝐧 👑',
  roleMember: () => '𝐌𝐞𝐦𝐛𝐫𝐨 🤍',
  
  // Generi
  genderMale: () => '🚹',
  genderFemale: () => '🚺',
  genderNotSet: () => '𝐍𝐨𝐧 𝐢𝐦𝐩𝐨𝐬𝐭𝐚𝐭𝐨',
  
  // Testo principale
  infoText: (params) => `꧁════ ☾︎•✮•☽︎ ════꧂\n` +
    ` 📝 𝕄𝕖𝕤𝕤𝕒𝕘𝕘𝕚: ${params.messages}\n` +
    ` ⚠️ 𝕎𝕒𝕣𝕟: ${params.warn} / 4\n` +
    ` 🟣 ℝ𝕦𝕠𝕝𝕠: ${params.role}\n` + 
    ` 🗓️ 𝔼𝕥𝕒̀: ${params.age}\n` +  
    ` 🚻 𝔾𝕖𝕟𝕖𝕣𝕖: ${params.gender}\n` +
    ` 🤬 𝐁𝐞𝐬𝐭𝐞𝐦𝐦𝐢𝐞: ${params.blasphemy}\n` +
    ` 🌐 𝕀𝕟𝕤𝕥𝕒𝕘𝕣𝕒𝕞: ${params.instagram}\n` +
    '> grazie papà Riad\n' +
    `꧁════ ☾︎•✮•☽︎ ════꧂`,
  
  // Altri testi
  years: () => "𝐚𝐧𝐧𝐢",
  notSet: () => "𝐍𝐨𝐧 𝐢𝐦𝐩𝐨𝐬𝐭𝐚𝐭𝐚",
  instagramNotSet: () => "𝐧𝐨𝐧 𝐢𝐦𝐩𝐨𝐬𝐭𝐚𝐭𝐨",
  unknown: () => "Sconosciuto",
  creationBy: () => "𝒄𝒓𝒆𝒂𝒛𝒊𝒐𝒏𝒆 𝒅𝒊 𝑶𝒏𝒊𝒙🌟",
  buttonSetAge: () => '🗓️ Imposta Età',
  buttonSetMale: () => '🚹 Genere Maschio',
  buttonSetFemale: () => '🚺 Genere Femmina',
  buttonSetIg: () => '🌐 Imposta IG',
  footerSetData: () => 'Imposta i tuoi dati personali:',
  noRulesSet: (params) => `ⓘ 𝐆𝐥𝐢 𝐚𝐝𝐦𝐢𝐧 𝐝𝐞𝐥 𝐠𝐫𝐮𝐩𝐩𝐨 𝐚𝐭𝐭𝐮𝐚𝐥𝐦𝐞𝐧𝐭𝐞 𝐧𝐨𝐧 𝐡𝐚𝐧𝐧𝐨 𝐬𝐞𝐭𝐭𝐚𝐭𝐨 𝐧𝐞𝐬𝐬𝐮𝐧𝐚 𝐫𝐞𝐠𝐨𝐥𝐚.\n\n📌 𝐏𝐞𝐫 𝐢𝐦𝐩𝐨𝐬𝐭𝐚𝐫𝐞 𝐥𝐞 𝐫𝐞𝐠𝐨𝐥𝐞, 𝐮𝐬𝐚 *${params.prefix}setregole* seguito dal testo delle regole.`,
  rulesMessage: (params) => `📜 *𝐑𝐞𝐠𝐨𝐥𝐞 𝐝𝐞𝐥 𝐆𝐫𝐮𝐩𝐩𝐨*\n\n${params.rules}`,
  
  checkscamNoSite: () => "❌ *Devi inserire un sito da controllare!*\n📌 _Esempio:_ *.checkscam www.sito.com*",
  
  checkscamResult: (params) => `🔍 *Analisi del sito:*\n🌐 *Dominio:* ${params.site}\n\n` +
    (params.isScam ? "⚠️ *RISCHIO SCAM!* ❌" : "✅ *Sito Sicuro!*") +
    `\n\n🔗 *Verifica anche su:* [ScamAdviser](${params.scamUrl})`,
  
  checkscamError: () => "❌ *Errore nel controllo del sito! Riprova più tardi.*",


  dashboardTitle: (params) => `Dashboard *${params.botName}*\n\n${params.content}`,
  
  dashboardEntry: (params) => `(${params.index})\n📚 • *_Comando :_* *${params.name}*\n🗂 • *_Utilizzato :_* *${params.total}x*\n⛾ • *_Ultimo Utilizzo :_* *${params.lastUsed}*`,
  
  timeDaysAgo: (params) => `${params.days} giorni fa`,
  timeHoursAgo: (params) => `${params.hours} ore fa`,
  timeMinutesAgo: (params) => `${params.minutes} minuti fa`,
  timeSecondsAgo: () => `un secondo fa`,

  imageSearchHelp: (params) => `🔍 *CERCA IMMAGINI*\n\nUso: ${params.prefix}${params.command} <termine di ricerca>\n\nEsempio: ${params.prefix}${params.command} gatto carino`,
  
  imageSearchBanned: () => '❌ Termine di ricerca non consentito. Usa termini appropriati.',
  
  imageSearchNoResults: () => '❌ Nessuna immagine trovata per la ricerca specificata.',
  
  imageSearchError: () => '❌ Errore nel recupero dell\'immagine.',
  
  imageSearchResult: (params) => `🔍 *Risultato ricerca:* ${params.searchTerm}\n\n📷 Fonte: Google Images`,
  
  imageSearchNetworkError: () => '❌ Errore di rete. Riprova più tardi.',
  
 
  smsWait: () => '🔍 Cercando immagini...',
  smsError: () => '❌ Si è verificato un errore durante la ricerca.',

    repoInfo: (params) => `『💬』 ══ •⊰✰⊱• ══ 『💬』\n` +
                         `✧ Nome: ${params?.name || 'N/A'}\n` +
                         `✧ Link: ${params?.url || 'N/A'}\n` +
                         `✦ Dimensione: ${params?.size || 'N/A'} MB\n` +
                         `✧ Aggiornato: ${params?.updatedAt || 'N/A'}\n` +
                         `✧ Visitatori: ${params?.watchers || 'N/A'}\n` +
                         `『💬』 ══ •⊰✰⊱• ══ 『💬』\n` +
                         `✧ Forks: ${params?.forks || 'N/A'} · Stars: ${params?.stars || 'N/A'} · Issues: ${params?.issues || 'N/A'}\n` +
                         `『💬』 ══ •⊰✰⊱• ══ 『💬』\n`,
    
    newsletterName: () => 'ChatUnity',
    
    sendErrorLog: () => 'Errore durante l\'invio del messaggio:',
    sendError: () => 'Errore durante l\'esecuzione del comando.',

      obfuscateNoCode: () => '⚠️ *Inserisci il codice JavaScript da offuscare o rispondi a un messaggio che lo contiene!*',
  
  obfuscateError: () => '❌ *Errore durante l\'offuscamento!*\n\nAssicurati di aver inserito codice JavaScript valido.',
  newsHeader: () => '📰 *NOTIZIARIO* 📰',
  
  newsArticle: (params) => `*${params.index}.* ${params.title}\n` +
    (params.description ? `📝 ${params.description}\n` : '') +
    (params.link ? `🔗 ${params.link}\n` : '') +
    `📰 *Fonte:* ${params.source}`,
  
  newsNoResults: () => '❌ Nessuna notizia trovata al momento. Riprova più tardi.',
  
  newsError: () => '❌ Errore nel recupero delle notizie. Riprova più tardi.',
  
  // Variabili già esistenti che vengono riutilizzate:
  smsWait: () => '🔍 Ricerca notizie in corso...',
  smsError: () => '❌ Si è verificato un errore durante la ricerca.',
      buyPokemonUsage: () => `❌ Usa: .buypokemon <base|imperium|premium> <quantità>\nEsempio: .buypokemon base 3`,
    
    insufficientCoins: (params) => `❌ Ti servono *${params?.totalCost || 0}* UnityCoins per acquistare ${params?.quantity || 0} pacchetti ${params?.type || 'N/A'}.\n💰 Saldo attuale: ${params?.currentBalance || 0}`,
    
    purchaseSuccess: (params) => `✅ Hai comprato *${params?.quantity || 0}* pacchetti ${params?.type || 'N/A'}!\n📦 Totale ora: ${params?.totalPacks || 0}\n💸 UnityCoins rimanenti: ${params?.remainingCoins || 0}`,

noCollectorsFound: () => '😢 Nessun collezionista trovato.',
leaderboardTitle: () => '🏆 *Top 10 Collezionisti Pokémon*:\n\n',
leaderboardEntry: (params) => `${params.position}. ${params.name} - ${params.count} carte`,

  // Rarità
  rarityCommon: () => 'Comune',
  rarityUncommon: () => 'Non Comune',
  rarityRare: () => 'Raro',
  rarityLegendary: () => 'Leggendario',
  rarityMysterious: () => 'Misterioso',
  
  // Errori API
  apiError: (params) => `Errore API: ${params.status} ${params.statusText}`,
  fetchError: (params) => `Errore fetch API: ${params.error}`,
  unknownType: () => '???',
  unknownHP: () => '???',
  
  // Animazione Darkness
  darknessAnimation1: () => '🌑...',
  darknessAnimation2: () => '🌑🌑...',
  darknessAnimation3: () => '🌑🌑🌑 *???*',
  darknessAnimation4: () => '🌑🌑🌑 *Una presenza oscura si manifesta...*',
  darknessAnimation5: (params) => `✨🌑 *${params.name}* appare dalle tenebre!`,
  darknessCardCaption: (params) => `🌑 *${params.name}* (${params.rarity})\n🔰 Tipo: ${params.type} | Lvl: ${params.level}${params.shiny}`,
  
  // Messaggi principali
  invalidPackType: (params) => `❌ Specifica un tipo di pacchetto valido: *base*, *imperium*, *premium* o *darkness*.\n\nEsempio: *${params.prefix}apripokemon base*`,
  noPacksAvailable: (params) => `⛔ Non hai pacchetti *${params.packType}*. Usane o trovane uno.`,
  openingPack: () => '🎁 Aprendo il pacchetto...',
  revealingCards: () => '✨ Rivelando le carte...',
  noCardsFound: () => '😢 Nessuna carta trovata. Riprova.',
  
  // Sistema Pity
  pitySystemTriggered: () => '🕯️ *Il potere oscuro ti ha risposto dopo molta attesa...*\n🔄 Sistema _pity_ attivato dopo 15 pacchetti senza Darkness.',
  
  // Risultato apertura
  packOpenedResult: (params) => `🎉 Hai aperto un pacchetto *${params.packType}* e trovato:\n\n` +
    `✨ *${params.name}* (${params.rarity})${params.shiny}\n` +
    `🔰 Tipo: ${params.type} | Lvl: ${params.level}\n\n` +
    `📦 Pacchetti rimasti: *${params.remaining}* ${params.packTypeLower}`,
  
  shinyLabel: () => ' ✨ Shiny',
  checkPityButton: () => '📊 Controlla Pity',

 myPacksMessage: (params) => `
📂 I TUOI PACCHETTI

• 📦 Base: ${params.base}
• 👑 Imperium: ${params.imperium}
• 🌌 Premium: ${params.premium}
• 🌑 Darkness: ${params.darkness}

🎁 Usa i bottoni per aprire un pacchetto subito!
`.trim(),
  
  openBaseButton: () => '📦 Apri Base',
  openImperiumButton: () => '👑 Apri Imperium',
  openPremiumButton: () => '🌌 Apri Premium',
  openDarknessButton: () => '🌑 Apri Darkness',
  buyPacksButton: () => '➕ Compra Pacchetti',
  packsFooter: () => '✨ Colleziona carte rare e crea il tuo team!',

  battleTagUser: () => '⚔️ Tagga un utente per combattere!\n\nEsempio: *.combatti @utente*',
battleNoPokemonSelf: () => '😓 Non hai Pokémon per combattere!',
battleNoPokemonOpponent: () => '😓 Il tuo avversario non ha Pokémon per combattere!',
battleWinner: (params) => `🏆 @${params.user} vince il combattimento!`,
battleDraw: () => '🤝 Pareggio! Entrambi i Pokémon sono esausti.',
battleHeader: () => '⚔️ *Combattimento Pokémon!*',
battlePlayer1: (params) => `👤 @${params.user} ha scelto *${params.pokemon}* (Lv. ${params.level})`,
battlePlayer2: (params) => `👤 @${params.user} ha scelto *${params.pokemon}* (Lv. ${params.level})`,
  myPacksMessage: (params) => `
📂 I TUOI PACCHETTI

• 📦 Base: ${params.base}
• 👑 Imperium: ${params.imperium}
• 🌌 Premium: ${params.premium}
• 🌑 Darkness: ${params.darkness}

🎁 Usa i bottoni per aprire un pacchetto subito!
`.trim(),
  
  openBaseButton: () => '📦 Apri Base',
  openImperiumButton: () => '👑 Apri Imperium',
  openPremiumButton: () => '🌌 Apri Premium',
  openDarknessButton: () => '🌑 Apri Darkness',
  buyPacksButton: () => '➕ Compra Pacchetti',
  packsFooter: () => '✨ Colleziona carte rare e crea il tuo team!',

  darknessInfoHeader: () => '🌑 *PACCHETTI DARKNESS* 🌑',
darknessInfoDescription1: () => 'I pacchetti *Darkness* non si possono comprare, ma si trovano **apparentemente dal nulla** quando apri pacchetti *Premium*.',
darknessInfoDescription2: () => '➡️ Ogni 10 pacchetti *Premium* aperti, hai il 50% di possibilità di ottenere un pacchetto *Darkness* bonus.',
darknessInfoDescription3: () => '🎲 Aprendo un pacchetto *Darkness* puoi trovare Pokémon Darkness speciali con il 10% di possibilità.',
darknessInfoDescription4: () => 'Usa *.apri darkness* per aprire i pacchetti Darkness.',
darknessInfoFooter: () => 'Buona fortuna! 🍀',

  evolveNoName: () => '📛 Specifica il nome del Pokémon da evolvere.\nEsempio: *.evolvi Charmander*',
  
  evolveNotOwned: (params) => `❌ Non possiedi *${params.name}*`,
  
  evolveNotEnoughMoney: (params) => `⛔ Non hai abbastanza Mattecash!\n💰 Hai: *${params.current}*\n💸 Richiesti: *${params.required}*`,
  
  evolveNotPossible: (params) => `⛔ *${params.name}* non può evolversi ulteriormente.`,
  
  evolveStart: (params) => `✨ *${params.name}* sta evolvendo...`,
  
  evolveProgress: () => '🔄 Evoluzione in corso...',
  
  evolveComplete: (params) => `🎉 *${params.oldName}* si è evoluto in *${params.newName}*!`,
  
  evolveSuccess: (params) => `✅ Evoluzione completata!\n💰 Mattecash rimasti: *${params.remaining}*`,
  
  evolutionApiError: (params) => `Errore durante il recupero dell'evoluzione: ${params.error}`,

      emptyInventory: () => '📦 Il tuo inventario è vuoto! Usa *.apri base* per ottenere il tuo primo Pokémon.',
    
    invalidPage: (params) => `❌ Pagina non valida. Scegli tra 1 e ${params?.totalPages || 1}`,
    
    inventoryHeader: (params) => `╭━━━🗂️ *INVENTARIO POKÉMON* 🗂️━━━╮
┃ 👤 *Allenatore:* @${params?.user || 'N/A'}
┃ 📦 *Totale:* ${params?.total || 0}
┃ 📄 *Pagina:* ${params?.page || 1}/${params?.totalPages || 1}
┃ 📌 *Per pagina:* ${params?.perPage || 50}
╰━━━━━━━━━━━━━━━━━━━━━━━╯`,
    
    pokemonEntry: (params) => `#${params?.index || 0} ➤ *${params?.name || 'N/A'}* (Lv.${params?.level || 1})\n${params?.rarityEmoji || '❓'} ${params?.rarity || 'N/A'} | ${params?.typeEmoji || '🔘'} ${params?.type || 'N/A'}`,
    
    buttonDarkness: () => '🌑 Pokémon Darkness',
    
    pageButton: (params) => `${params?.current ? '📍' : ''}Pagina ${params?.page || 1}`,
    
    inventoryFooter: () => '📂 Usa `.inventario [pagina]` oppure clicca i bottoni per navigare.',
    
    adTitle: () => 'Il tuo Inventario Pokémon',
    
    adBody: (params) => `Pagina ${params?.page || 1}/${params?.totalPages || 1} • ${params?.total || 0} totali`,

    tradeUsage: () => '📌 Usa:\n.scambia @utente <tuo_numero> <suo_numero>',
tradeInvalidSelf: (params) => `❌ Il tuo Pokémon n. ${params.number} non esiste.`,
tradeInvalidOther: (params) => `❌ Il Pokémon n. ${params.number} di @${params.user} non esiste.`,
tradeRequestHeader: () => '🔁 *Richiesta di Scambio*',
tradeRequestFrom: (params) => `${params.user} vuole scambiare:`,
tradeRequestOffer: (params) => `📤 *${params.pokemon}* (Lv. ${params.level})`,
tradeRequestFor: (params) => `con\n📥 *${params.pokemon}* (Lv. ${params.level}) di @${params.targetUser}`,
tradeRequestAccept: (params) => `✅ @${params.targetUser}, rispondi con *.accetta* per confermare.`,
tradeNoRequest: () => '❌ Nessuna richiesta di scambio trovata.',
tradePokemonUnavailable: () => '❌ Uno dei Pokémon non è più disponibile.',
tradeCompleted: (params) => `✅ Scambio completato tra @${params.user1} e @${params.user2}!\n\n🎁 ${params.pokemon1} ⇄ ${params.pokemon2}`,

    pitySystem: (params) => `📊 *Sistema Pity Darkness*\n\n` +
                           `🔁 Pacchetti aperti senza Darkness: *${params?.pityCounter || 0}*\n` +
                           `🎯 Prossimo Darkness garantito tra: *${params?.remaining || 0}* pacchetti\n`,
    
    pityGuaranteed: () => `\n✨ Il prossimo pacchetto ha un Darkness *garantito*!`,

        noPendingRequest: () => '❌ Non hai inviti in sospeso.',
    
    gangJoinSuccess: (params) => `🎊 @${params?.user || 'N/A'} è entrato nella gang *${params?.emoji || '🏴'} ${params?.name || 'N/A'} ${params?.emoji || '🏴'}*! Ora ci sono ${params?.count || 0} membri.`,
    gangWelcomeTitle: () => '👑 Benvenuto nella Gang!',
    gangWelcomeBody: (params) => `Unisciti a ${params?.name || 'Noi'}!`,
    
    gangReject: (params) => `💢 @${params?.user || 'N/A'} ha rifiutato l'invito nella gang.`,
    
    alreadyInGang: () => '❌ Fai già parte di una gang. Lascia la tua gang prima di crearne una nuova.',
    
    createGangFormat: (params) => `📝 Formato errato. Usa: *${params?.prefix || '.'}creagang [nome] [emoji]*\nEsempio: *${params?.prefix || '.'}creagang Pirati ☠️*`,
    
    gangNameTooLong: () => '❌ Il nome della gang non può superare i 20 caratteri.',
    
    gangExists: () => '❌ Esiste già una gang con questo nome.',
    
    gangCreated: (params) => `✅ Hai creato la gang *${params?.color || '🏴'} ${params?.emoji || ''} ${params?.name || 'N/A'} ${params?.emoji || ''} ${params?.color || '🏴'}*!\n\n👑 Ora sei il *BOSS*. Usa *${params?.prefix || '.'}invitogang @user* per invitare altri membri.`,
    
    notInGang: () => '❌ Non fai parte di nessuna gang.',
    
    bossCannotLeave: () => '👑 Sei il boss della gang. Usa *sciogliligang* per sciogliere la gang.',
    
    gangLeft: (params) => `👋 Hai lasciato la gang *${params?.emoji || '🏴'} ${params?.name || 'N/A'} ${params?.emoji || '🏴'}*.`,
    
    onlyBossCanInvite: () => '👑 Solo il boss può invitare nuovi membri.',
    
    mentionUser: () => '📍 Tagga un utente da invitare.',
    
    userAlreadyInGang: () => '❌ Questo utente è già in una gang.',
    
    gangFull: (params) => `❌ La tua gang ha già il numero massimo di membri (${params?.max || 6}).`,
    
    inviteExpired: (params) => `⏱️ L'invito per @${params?.user || 'N/A'} è scaduto.`,
    
    gangInvite: (params) => `🔫 *INVITO DI GANG* ${params?.color || '🏴'}\n\n@${params?.inviter || 'N/A'} ti invita nella gang:\n\n` +
                           `*${params?.emoji || '🏴'} ${params?.name || 'N/A'} ${params?.emoji || '🏴'}*\n` +
                           `👥 Membri: ${params?.members || 0}/${params?.max || 6}\n` +
                           `🎯 Livello: 1\n\n` +
                           `⏳ Hai 60 secondi per accettare o rifiutare!`,
    
    acceptButton: () => '✅ Accetta Invito',
    rejectButton: () => '❌ Rifiuta',
    
    gangInviteTitle: () => '🎯 Invito alla Gang!',
    gangInviteBody: (params) => `Unisciti a ${params?.name || 'Noi'}!`,
     alreadyPlaying: () => '*🎮 Sei già in una partita! Finisci prima quella in corso.*',
    
    roomNameRequired: (params) => `*🎯 Come si chiama la stanza?*\n\n*Esempio:*\n*${params?.prefix || '.'}${params?.command || 'tris'} mygame*`,
    
    gameStarting: () => '⚡ *Partita in avvio... Un giocatore si è unito!*',
    
    currentTurn: (params) => `🎯 TURNO DI: ${params?.player || 'N/A'}`,
    
    roomCreated: (params) => `✨ *STANZA CREATA!*\n\n🏷️ Nome: *${params?.roomName || 'game'}*\n\n👥 Per giocare:\n${params?.prefix || '.'}${params?.command || 'gioca'} ${params?.roomName || 'game'}\n\n🚪 Per uscire:\n.esci`,

        invalidBet: (params) => `❌ Puntata non valida.\nEsempio: *${params?.prefix || '.'}${params?.command || 'slot'} 100*`,
    
    insufficientUC: (params) => `🚫 UC insufficienti! Ti servono ${params?.bet || 0} UC.`,
    
    cooldown: (params) => `⏳ Aspetta ${params?.min || 0}m ${params?.sec || 0}s prima di giocare di nuovo.`,
    
    winResult: (params) => `🎉 *Hai vinto!*\n
┌──────────────
│ ➕ *${params?.ucWin || 0} UC*
│ ➕ *${params?.xpWin || 0} XP*
└──────────────

💎 *SALDO ATTUALE*
┌──────────────
│ 👛 *UC: ${params?.currentUC || 0}*
│ ⭐ *XP: ${params?.currentXP || 0}*
│ 📊 *Progresso: ${params?.levelProgress || 0}/${params?.levelTotal || 0} XP*
└──────────────

ℹ️ Usa ${params?.prefix || '.'}menuxp per guadagnare più XP!`,
    
    loseResult: (params) => `🤡 *Hai perso!*\n
┌──────────────
│ ➖ *${params?.bet || 0} UC*
│ ➖ *${params?.bet || 0} XP*
└──────────────

💎 *SALDO ATTUALE*
┌──────────────
│ 👛 *UC: ${params?.currentUC || 0}*
│ ⭐ *XP: ${params?.currentXP || 0}*
│ 📊 *Progresso: ${params?.levelProgress || 0}/${params?.levelTotal || 0} XP*
└──────────────

ℹ️ Usa ${params?.prefix || '.'}menuxp per guadagnare più XP!`,
    
    slotSpinning: () => '🎰 *Slot machine in rotazione...*',

        casinoChooseBet: (params) => `🎰 *SCOMMESSA CASINÒ*\n\n🚩 Inserisci la quantità di 💶 Unitycoins che vuoi scommettere contro *chatunity-bot*.\n\nEsempio:\n> *${params?.prefix || '.'}${params?.command || 'scommetti'}* 100`,
    
    casinoBetButton: (params) => `${params?.amount || 0} 💶`,
    
    casinoCooldown: (params) => `🚩 Hai già avviato una scommessa di recente, aspetta *⏱ ${params?.time || '0m 0s'}* per scommettere di nuovo.`,
    
    casinoLost: (params) => `🌵 *RISULTATO CASINÒ*\n\n➠ *chatunity-bot*: ${params?.botScore || 0}\n➠ *${params?.username || 'Giocatore'}*: ${params?.playerScore || 0}\n\n🎯 ${params?.username || 'Giocatore'}, *HAI PERSO* ${params?.amount || 0} 💶 Unitycoins.`,
    
    casinoWon: (params) => `🌵 *RISULTATO CASINÒ*\n\n➠ *chatunity-bot*: ${params?.botScore || 0}\n➠ *${params?.username || 'Giocatore'}*: ${params?.playerScore || 0}\n\n🎯 ${params?.username || 'Giocatore'}, *HAI VINTO* ${params?.amount || 0} 💶 Unitycoins.`,
    
    casinoTie: (params) => `🌵 *RISULTATO CASINÒ*\n\n➠ *chatunity-bot*: ${params?.botScore || 0}\n➠ *${params?.username || 'Giocatore'}*: ${params?.playerScore || 0}\n\n🎯 ${params?.username || 'Giocatore'}, *PAREGGIO!* Ottieni indietro ${params?.amount || 0} 💶 Unitycoins.`,
    
    casinoInsufficient: (params) => `❌ Non hai *${params?.amount || 0} 💶 Unitycoins* da scommettere!`,
        pptCooldown: (params) => `⏱ Hai già giocato di recente, aspetta *${params?.time || '0m 0s'}* per giocare di nuovo.`,
    
    pptChooseOption: () => `🎮 *Carta - Sasso - Forbice*\n\nScegli un'opzione per iniziare il gioco:`,
    
    pptRock: () => "🪨 Sasso",
    pptPaper: () => "📄 Carta", 
    pptScissors: () => "✂️ Forbice",
    
    pptInvalidOption: () => `❌ Opzione non valida!\n\nScegli un'opzione valida per iniziare il gioco:`,
    
    pptTie: (params) => `🤝 *PAREGGIO!*\nRicevi *${params?.points || 0} 💶 Unitycoins* come ricompensa.`,
    
    pptWin: (params) => `🎉 *HAI VINTO!*\nHai appena guadagnato *${params?.points || 0} 💶 Unitycoins*.`,
    
    pptLose: (params) => `😢 *HAI PERSO!*\nHai appena perso *${params?.points || 0} 💶 Unitycoins*.`,
    
    pptResult: (params) => `🎮 *RISULTATO PARTITA*\n\n👤 La tua scelta: *${params?.userChoice || 'N/A'}*\n🤖 Scelta del bot: *${params?.botChoice || 'N/A'}*\n\n📊 Risultato: ${params?.result || 'N/A'}\n\n💎 Saldo attuale: *${params?.currentBalance || 0} UC*`,
    
    pptRetry: () => "🔄 Gioca di nuovo",
    rouletteCooldown: (params) => `⏱ Hai già avviato una scommessa di recente, aspetta *${params?.time || '0 secondi'}* per scommettere di nuovo.`,
    
    rouletteFormat: (params) => `🎰 *ROULETTE*\n\nDevi inserire una quantità di 💶 Unitycoins e scommettere su un colore:\nEsempio: *${params?.prefix || '.'}${params?.command || 'ruleta'} 20 nero*`,
    
    rouletteInvalidFormat: (params) => `❌ Formato errato.\nDevi inserire: *${params?.prefix || '.'}${params?.command || 'ruleta'} <quantità> <colore>*\nEsempio: *${params?.prefix || '.'}${params?.command || 'ruleta'} 20 rosso*`,
    
    rouletteInvalidAmount: () => `❌ Inserisci una quantità valida per la scommessa.`,
    
    rouletteMaxBet: () => `📊 La quantità massima di scommessa è di 50 💶 Unitycoins.`,
    
    rouletteInvalidColor: () => `🎨 Devi scommettere su un colore valido: *nero* o *rosso*.`,
    
    rouletteInsufficient: () => `❌ Non hai abbastanza 💶 Unitycoins per effettuare questa scommessa.`,
    
    rouletteBetPlaced: (params) => `🎯 Hai scommesso ${params?.amount || 0} 💶 Unitycoins sul colore ${params?.color || 'N/A'}.\n⏱ Aspetta *${params?.time || 10} secondi* per conoscere il risultato...`,
    
    rouletteWin: (params) => `🎉 *HAI VINTO!*\nHai ottenuto ${params?.amount || 0} 💶 Unitycoins.\n💎 Totale: ${params?.total || 0} 💶 Unitycoins.`,
    
    rouletteLose: (params) => `😢 *HAI PERSO!*\nSono state sottratte ${params?.amount || 0} 💶 Unitycoins.\n💎 Totale: ${params?.total || 0} 💶 Unitycoins.`,
    
    black: () => 'nero ⚫',
    red: () => 'rosso 🔴',
    
    newsletterName: () => 'ChatUnity Roulette',


        coinCooldown: (params) => `⏳ Hai già giocato di recente. Aspetta *${params?.time || '0 secondi'}* prima di riprovare.`,
    
    coinWaitingPlayer1: (params) => `🎮 *Testa o Croce*\n\n🧑 Giocatore 1: @${params?.player || 'N/A'}\n🕹️ In attesa del secondo giocatore...\n\nScrivi "testa" o "croce" per iniziare.`,
    
    coinFooter: () => 'Fai la tua scelta',
    
    coinPlayer1Chose: (params) => `🎮 *Testa o Croce*\n\n🧑 Giocatore 1: @${params?.player || 'N/A'} ha scelto *${params?.choice || 'N/A'}*\n🎯 In attesa di un altro giocatore...\n\nTocca a te! Scrivi "testa" o "croce".`,
    
    coinJoinPrompt: () => 'Partecipa ora',
    
    coinInvalidChoice: () => `⚠️ Devi scegliere tra *testa* o *croce*! Scrivi la tua scelta.`,
    
    coinResult: (params) => `🪙 *RISULTATO: ${params?.result || 'N/A'}*\n\n`,
    
    coinPlayerWin: (params) => `✅ @${params?.player || 'N/A'} ha vinto ${params?.amount || 0} 💶`,
    
    coinPlayerLose: (params) => `❌ @${params?.player || 'N/A'} ha perso ${params?.amount || 0} 💶`,
    
    coinPlayAgain: (params) => `\nPer giocare di nuovo scrivi il comando ${params?.prefix || '.'}${params?.command || 'moneta'}`,
    
    coinAlreadyChose: (params) => `Hai già scelto *${params?.choice || 'N/A'}*. In attesa di un altro giocatore...`,
    
    coinInvalidGame: (params) => `❌ Partita non disponibile o comando non valido.\n\nPer iniziare una nuova partita scrivi il comando ${params?.prefix || '.'}${params?.command || 'moneta'}`,
    
    coinInvalidCommand: (params) => `❌ Comando non valido. Scrivi "${params?.prefix || '.'}${params?.command || 'moneta'}" o scegli "testa" o "croce".`,

    mathDifficultyLevels: (params) => `🧮 *Livelli di difficoltà disponibili:* \n${params.levels}\n\n📌 Esempio: ${params.example}`,
mathInvalidDifficulty: (params) => `🧮 *Livelli di difficoltà disponibili:* \n${params.levels}\n\n📌 Esempio: ${params.example}`,
mathActiveGame: (params) => `⚠️ C'è già una domanda attiva in questa chat!\n\nDomanda: *${params.question}*\nTempo rimanente: ${params.remainingTime} secondi`,
mathQuestion: (params) => `▢ *QUANTO FA* ${params.question}?\n\n⏳ Tempo: ${params.time} secondi\n💰 Premio: ${params.bonus} XP`,
mathTimeUp: (params) => `⏰ Tempo scaduto!\nLa risposta era: *${params.answer}*`,
mathCorrectAnswer: (params) => `✅ *RISPOSTA CORRETTA!*\n\nHai impiegato: ${params.timeTaken} secondi\nPunteggio: ${params.score} XP`,
mathWrongAnswer: () => `❌ Risposta sbagliata! Riprova`,
mathError: () => `❌ Si è verificato un errore nel gioco. Riprova più tardi.`,

scfCooldown: (params) => `⏰ Hai già giocato di recente, aspetta *${params.time}* per giocare di nuovo.`,
scfNoChoice: (params) => `🎮 *Sasso Carta Forbici*\n\nScegli un'opzione per iniziare il gioco:\n▢ pietra\n▢ carta\n▢ forbici\n\n📝 Esempio: *${params.prefix + params.command} pietra*`,
scfInvalidChoice: (params) => `❌ *Scelta non valida!*\n\nOpzioni disponibili:\n▢ pietra\n▢ carta\n▢ forbici\n\n📝 Esempio: *${params.prefix + params.command} pietra*`,
scfDraw: (params) => `🤝 *Pareggio!* Ricevi *${params.points} 💶 Unitycoins* come ricompensa`,
scfWin: (params) => `🎉 *HAI VINTO!* Hai guadagnato *${params.points} 💶 Unitycoins*`,
scfLose: (params) => `😢 *Hai perso!* Hai perso *${params.points} 💶 Unitycoins*`,
scfResult: (params) => `${params.result}\n\n🗂️ Mia scelta: *${params.botChoice}*\n💰 Nuovo saldo: *${formatNumber(params.newBalance)} UC*`,
pokedexNoInput: () => '🚩 Inserisci il nome di un Pokémon',
pokedexSearching: (params) => `🔍 Cerco ${params.pokemon}...`,
pokedexNoDescription: () => 'Nessuna descrizione disponibile',
pokedexError: () => '⚠️ Errore nella ricerca del Pokémon',
pokedexInfo: (params) => `
🎌 *Pokédex - ${params.name}*

🔹 *Nome:* ${params.name}
🔹 *ID:* ${params.id}
🔹 *Tipo:* ${params.type}
🔹 *Abilità:* ${params.abilities}
🔹 *Altezza:* ${params.height}
🔹 *Peso:* ${params.weight}

📝 *Descrizione:*
${params.description}

🌐 *Maggiori info:*
https://www.pokemon.com/it/pokedex/${params.urlName}
`.trim(),

 flagGroupOnly: () => '⚠️ Questo comando funziona solo nei gruppi!',
  flagNoGame: () => '⚠️ Non c\'è nessuna partita attiva in questo gruppo!',
  flagAdminOnly: () => '❌ *Questo comando può essere usato solo dagli admin!*',
  flagGameActive: () => '⚠️ C\'è già una partita attiva in questo gruppo!',
  flagGameStopped: (params) => `🛑 *Gioco delle bandiere interrotto dall'admin*\n✨ La risposta era: *${params.answer}*`,
  
  // Cooldown
  flagCooldown: (params) => `⏳ *Aspetta ancora ${params.time} secondi prima di avviare un nuovo gioco!*`,
  
  // Sfide
  flagChallenge1: () => '🇺🇳 *INDOVINA LA BANDIERA!* 🇺🇳',
  flagChallenge2: () => '🌍 *Che nazione rappresenta questa bandiera?*',
  flagChallenge3: () => '🏳️ *Sfida geografica: riconosci questa bandiera?*',
  flagChallenge4: () => '🧭 *Indovina la nazione dalla sua bandiera!*',
  flagChallenge5: () => '🎯 *Quiz bandiere: quale paese è questo?*',
  flagChallenge6: () => '🌟 *Metti alla prova la tua conoscenza geografica!*',
  flagChallenge7: () => '🔍 *Osserva attentamente e indovina la nazione!*',
  
  // Didascalia gioco
  flagGameCaption: (params) => `${params.challenge}\n\n ㌌ *Rispondi con il nome della nazione!*\n⏱️ *Tempo disponibile:* ${params.time} secondi\n\n> \`vare ✧ bot\``,
  
  // Timeout
  flagTimeOut: (params) => `⏳ *Tempo scaduto!*\n\n🌍 *La risposta era:* *${params.answer}*\n\n> \`vare ✧ bot\``,
  
  // Errori
  flagGameError: (params) => `Errore nel gioco bandiere: ${params.error}`,
  flagStartError: () => '❌ *Si è verificato un errore durante l\'avvio del gioco*\n\n🔄 *Riprova tra qualche secondo*',
  
  // Risposte
  flagAlmostThere: () => '👀 *Ci sei quasi!*',
  flagNoAttempts: () => '❌ *Hai esaurito i tuoi 3 tentativi!*\n\n⏳ *Aspetta che altri giocatori provino o che finisca il tempo*',
  
  // Tentativi
  flagHint: (params) => `❌ *Risposta errata!*\n\n💡 *Suggerimento:*\n   • Inizia con la lettera *"${params.letter}"*\n   • È composta da *${params.length} lettere*`,
  flagWrongAttempt: (params) => `❌ *Risposta errata!*\n\n📝 *Tentativi rimasti:* ${params.attempts}\n🤔 *Pensa bene alla tua prossima risposta!*`,
  flagLastAttempt: () => '❌ *Risposta errata!*\n\n📝 *Ultimo tentativo rimasto..*',
  
  // Risposta corretta
  flagCorrectAnswer: (params) => `
╭━『 🎉 *RISPOSTA CORRETTA!* 』━╮
┃
┃ 🌍 *Nazione:* ${params.country}
┃ ⏱️ *Tempo impiegato:* ${params.time}s
┃
┃ 🎁 *Ricompense:*
┃ • ${params.reward} 🪙 UnityCoins${params.timeBonus > 0 ? ` (+${params.timeBonus} bonus velocità)` : ''}
┃ • ${params.exp} 🆙 EXP
┃
┃ 💰 *Saldo attuale:* ${params.balance} UnityCoins
╰━━━━━━━━━━━━━━━━╯

> \`vare ✧ bot\``,

  logoGroupOnly: () => '⚠ Questo comando funziona solo nei gruppi!',
  logoNoGame: () => '⚠ Nessuna partita attiva!',
  logoAdminOnly: () => '❌ Solo admin possono interrompere!',
  logoGameActive: () => '⚠ Partita già in corso!',
  logoGameStopped: (params) => `🛑 Gioco interrotto. La risposta era: *${params.answer}*`,
  
  // Cooldown
  logoCooldown: (params) => `⏳ Attendi ${params.time}s prima di riprovare.`,
  
  // Sfide
  logoChallenge1: () => '🚘 INDOVINA IL LOGO!',
  logoChallenge2: () => '🏁 Che marca è questa?',
  logoChallenge3: () => '🔍 Riconosci questa auto?',
  
  // Didascalia gioco
  logoGameCaption: (params) => `${params.challenge}\n⌛ ${params.time} secondi.`,
  
  // Timeout
  logoTimeOut: (params) => `⏰ Tempo scaduto! Risposta: *${params.answer}*`,
  
  // Risposta corretta
  logoCorrectAnswer: (params) => `
╭━『 🎉 RISPOSTA CORRETTA! 』━╮
┃
┃ 🚗 Marchio: ${params.brand}
┃ ⏱ Tempo impiegato: ${params.time}s
┃
┃ 🎁 Ricompense:
┃ • ${params.reward} 💰 euro${params.timeBonus > 0 ? ` (+${params.timeBonus} bonus velocità)` : ''}
┃ • ${params.exp} 🆙 EXP
┃
╰━━━━━━━━━━━━━━━━╯

> \\by chatunity\\`,

  futInventory: (params) => `💼 *Inventario FUT:*\n` +
    `🥉 Bronze: ${params.bronze} • 🥈 Silver: ${params.silver} • 🥇 Gold: ${params.gold}\n\n` +
    `💸 UnityCoin: ${params.balance}\n\n` +
    `🎁 Scegli pacchetto da aprire 👇`,
  
  openPackButton: (params) => `${params.emoji} Apri ${params.type}`,
  buyPacksButton: () => '🛒 Compra pacchetti',
  futFooter: () => 'Holly FUT Bot ⚽',
  
  // Negozio FUT
  futStore: (params) => `🛒 *FUT Store*\n` +
    `🥉 Bronze: ${params.bronzePrice} 💸\n` +
    `🥈 Silver: ${params.silverPrice} 💸\n` +
    `🥇 Gold: ${params.goldPrice} 💸\n\n` +
    `💸 Saldo attuale: ${params.balance}`,
  
  futStoreFooter: () => 'Compra pacchetti con Holly Cash',
  
  // Acquisto
  futBuyUsage: () => '❌ Usa: .futbuy bronze/silver/gold',
  futNotEnoughMoney: (params) => `❌ Ti servono ${params.price} UnityCoin 💸 per un pacchetto ${params.type}`,
  futPackBought: (params) => `✅ Acquistato un pacchetto *${params.type}*! Ne hai ora: ${params.count}`,
  
  // Apertura pacchetti
  futOpenUsage: () => '❌ Specifica il pacchetto da aprire.',
  futNoPacks: (params) => `❌ Nessun pacchetto ${params.type} da aprire.`,
  futOpeningPack: (params) => `🎉 Aprendo pacchetto *${params.type}*...`,
  
  // Carte giocatori
  futPlayerCard: (params) => `🌟 *${params.name}* (${params.rating}⭐)\n📍 ${params.position} | ${params.club} | ${params.nation}`,
  futAdditionalPlayer: (params) => `➕ ${params.name} (${params.rating}⭐)`,
  
  // Rosa
  futNoPlayers: () => '📭 Nessun giocatore in rosa.',

   // Testi principali
    'missioni_default_bot_name': 'ChatUnity Bot',
    
    'missioni_main_menu': `🎯 *SISTEMA MISSIONI {botName}*\n\n` +
              `👤 Utente: {user}\n` +
              `💰 Saldo: {balance} UC\n` +
              `🏦 Banca: {bank} UC\n` +
              `📅 Daily: {dailyCompleted}/{dailyTotal} completate\n` +
              `📆 Weekly: {weeklyCompleted}/{weeklyTotal} completate\n\n` +
              `Seleziona il tipo di missioni:`,
              
    'missioni_main_footer': 'Completa le missioni per guadagnare UnityCoins!',
    
    'missioni_daily_header': `📅 *MISSIONI GIORNALIERE* {user}\n\n` +
                            `⏳ Reset tra: {resetTime}\n\n` +
                            `{missions}`,
                            
    'missioni_daily_footer': 'Usa "{prefix}missioni claim" per riscuotere le ricompense!',
    
    'missioni_weekly_header': `📆 *MISSIONI SETTIMANALI* {user}\n\n` +
                             `⏳ Reset tra: {resetTime}\n\n` +
                             `{missions}`,
                             
    'missioni_weekly_footer': 'Missioni settimanali - Ricompense maggiori!',
    
    'missioni_mission_entry': `▢ *{index}. {title}*\n` +
                             `➠ Progresso: {progress}/{target}\n` +
                             `➠ Ricompensa: {reward} UC\n` +
                             `➠ Stato: {status}`,
    
    // Stati missione
    'missioni_status_claimed': '✅ RISCOSSA',
    'missioni_status_ready': '💰 PRONTA',
    'missioni_status_in_progress': '❌ IN CORSO',
    
    // Titoli missioni giornaliere
    'missioni_daily_1_title': 'Invia 50 messaggi',
    'missioni_daily_2_title': 'Esegui 10 comandi',
    'missioni_daily_3_title': 'Rimani senza warn',
    
    // Titoli missioni settimanali
    'missioni_weekly_1_title': 'Invia 300 messaggi',
    'missioni_weekly_2_title': 'Esegui 50 comandi',
    'missioni_weekly_3_title': 'Rimani 7 giorni senza warn',
    'missioni_weekly_4_title': 'Raggiungi 1000 messaggi totali',
    
    // Pulsanti
    'missioni_button_daily': '📅 GIORNALIERE',
    'missioni_button_weekly': '📆 SETTIMANALI',
    'missioni_button_claim': '💰 RISCUOTI',
    'missioni_button_back': '🔙 INDIETRO',
    'missioni_button_wallet': '💰 PORTAFOGLIO',
    'missioni_button_missions': '🎯 MISSIONI',
    
    // Sistema di riscossione
    'missioni_no_claims': '{user} non hai missioni completate da riscuotere!',
    
    'missioni_claim_detail': '✅ {title}: +{reward} UC',
    
    'missioni_claim_success': `🎉 {user} hai riscosso *{total} UnityCoins*!\n\n` +
                             `{details}\n\n` +
                             `💰 Nuovo saldo: *{balance} UC*\n` +
                             `🏦 Banca: *{bank} UC*`,
                             
    'missioni_claim_footer': 'Usa .portafoglio per vedere il saldo completo',
    
    // Errori
    'missioni_backup_error': 'Errore backup:',
'wallet_user_not_found': '🚩 L\'utente non è stato trovato nel database',
    
    'wallet_display': `
╭─「 💰 PORTAFOGLIO 」─
│
│ 👤 Utente: {name}
│ 💰 UnityCoins: {limit} 💶
│ 🏛️ Banca: {bank} 💳
│
╰───────✦───────
    `.trim(),
    
    'wallet_ad_title': 'Portafoglio di {name}',
    'wallet_ad_body': 'Saldo: {limit} UC',

     'daily_cooldown': `🚩 Hai già ritirato i tuoi soldi di oggi.\nPuoi prenderle solo 1 ogni 24h.\n\nProssima ricompensa: +{amount} 💶 UC\nTra: ⏱ {time}`,
    
    'daily_success': `🚩 Congratulazioni down 🎉, hai ottenuto *+{amount} 💶 UC!\n\nOra hai: *{balance} 💶 UC* nel tuo saldo`,
    
    'daily_time_format': '{hours} ore, {minutes} minuti e {seconds} secondi',

        top_unitycoins_title: (userId, groupId, vars) => `TOP ${vars.len} UNITYCOINS 💶`,
    your_position_unitycoins: (userId, groupId, vars) => `LA TUA POSIZIONE: *${vars.position}* su *${vars.total}*`,
    unitycoins_symbol: (userId, groupId, vars) => `💶`,
    
    top_xp_title: (userId, groupId, vars) => `TOP ${vars.len} XP 💫`,
    your_position_xp: (userId, groupId, vars) => `LA TUA POSIZ: *${vars.position}* SU *${vars.total}*`,
    xp_symbol: (userId, groupId, vars) => `💫`,
    
    // Aggiungi anche queste traduzioni per i comandi help se necessario
    classifica_help: (userId, groupId, vars) => `Mostra la classifica dei giocatori`,
    lb_help: (userId, groupId, vars) => `Mostra la leaderboard dei giocatori`,
    leaderboard_help: (userId, groupId, vars) => `Mostra la classifica dei giocatori`,

        mention_required: (userId, groupId, vars) => '🚩 𝙳𝙴𝚅𝙸 𝙼𝙴𝙽𝚉𝙸𝙾𝙽𝙰𝚁𝙴 𝙸𝙻 𝙳𝙴𝚂𝚃𝙸𝙽𝙰𝚃𝙰𝚁𝙸𝙾 @user*',
    amount_required: (userId, groupId, vars) => '🚩 𝙸𝙽𝚂𝙴𝚁𝙸𝚂𝙲𝙸 𝙻𝙰 𝚀𝚄𝙰𝙽𝚃𝙸𝚃𝙰̀ 𝙳𝙸 💶 𝚄𝙽𝙸𝚃𝚈𝙲𝙾𝙸𝙽𝚂 𝙳𝙰 𝚃𝚁𝙰𝚂𝙵𝙴𝚁𝙸𝚁𝙴',
    only_numbers: (userId, groupId, vars) => '𝙼𝙰 𝙷𝙾 𝚂𝙴𝙸 𝙵𝚁𝙾𝙲𝙸𝙾? 𝚂𝙲𝚁𝙸𝚅𝙸 𝚂𝙾𝙻𝙾 𝙽𝚄𝙼𝙴𝚁𝙸',
    min_transfer: (userId, groupId, vars) => '🚩 𝙸𝙻 𝙼𝙸𝙽𝙸𝙼𝙾 𝙳𝙰 𝚃𝚁𝙰𝚂𝙵𝙴𝚁𝙸𝚁𝙴 𝙴̀ 1 𝚄𝙽𝙸𝚃𝚈𝙲𝙾𝙸𝙽',
    insufficient_funds: (userId, groupId, vars) => '𝙽𝙾𝙽 𝙷𝙰𝙸 𝙰𝙱𝙱𝙰𝚂𝚃𝙰𝙽𝚉𝙰 💶 𝚄𝙽𝙸𝚃𝚈𝙲𝙾𝙸𝙽𝚂 𝙿𝙴𝚁 𝚀𝚄𝙴𝚂𝚃𝙾 𝚃𝚁𝙰𝚂𝙵𝙴𝚁𝙸𝙼𝙴𝙽𝚃𝙾',
    
    transfer_success_sender: (userId, groupId, vars) => `*${vars.amount}* 💶 𝚄𝙽𝙸𝚃𝚈𝙲𝙾𝙸𝙽𝚂\n𝚃𝙰𝚂𝚂𝙰 2% : *${vars.tax}* 💶 𝚃𝙰𝚂𝚂𝙰 𝙸𝙼𝙿𝙾𝚁𝚃𝙾\n𝚃𝙾𝚃𝙰𝙻𝙴 𝙰𝙳𝙳𝙴𝙱𝙸𝚃𝙾: *${vars.total}* 💶 𝚄𝙽𝙸𝚃𝚈𝙲𝙾𝙸𝙽𝚂`,
    
    transfer_success_receiver: (userId, groupId, vars) => `*+${vars.amount}* 💶 𝚄𝙽𝙸𝚃𝚈𝙲𝙾𝙸𝙽𝚂 𝚁𝙸𝙲𝙴𝚅𝚄𝚃𝙸!`,
    
    // Traduzioni per i comandi help
    donauc_help: (userId, groupId, vars) => 'Trasferisci Unitycoins a un utente',
    bonifico_help: (userId, groupId, vars) => 'Effettua un bonifico di Unitycoins',
    trasferisci_help: (userId, groupId, vars) => 'Trasferisci Unitycoins a un altro utente',
    dona_help: (userId, groupId, vars) => 'Dona Unitycoins a un utente',
    transfer_help: (userId, groupId, vars) => 'Transfer Unitycoins to a user',
    senduc_help: (userId, groupId, vars) => 'Send Unitycoins to another user',
    pay_help: (userId, groupId, vars) => 'Pay Unitycoins to someone',
    'steal_no_target': '🧠 Tagga qualcuno o rispondi a un messaggio per rubare.\n\n📌 Esempio:\n{prefix}{command} @utente',
    
    'steal_self': '🤡 Non puoi rubare a te stesso.',
    
    'steal_cooldown': '🚨 Hai già rubato di recente! Riprova tra ⏱ *{time}*',
    
    'steal_success': `💰 Colpo riuscito! Hai rubato *{amount} 💶 UC* da {target}.\n\n*+{bonus} 💶* aggiunti al tuo saldo.`,
    
    'steal_caught': `🚓 Sei stato arrestato! Multa di *-{fine} 💶 UC* per {name}.`,
    
    'steal_partial': `💸 Hai rubato solo *{amount} 💶 UC* da {target}.\n\n*+{bonus} 💶* aggiunti al tuo saldo.`,
    
    'steal_time_format': '{minutes}m {seconds}s',

    // withdraw.js - Traduzioni italiano

    withdraw_no_amount: '🚩 Inserisci la quantità di *💶 UnityCoins* che vuoi prelevare.',
    
    withdraw_no_money: '🚩 Non hai *💶 UnityCoins* nel conto bancario.',
    
    withdraw_invalid_number: '🚩 La quantità deve essere un numero valido.',
    
    withdraw_minimum: '🚩 Inserisci una quantità valida (almeno 1).',
    
    withdraw_insufficient: '🚩 Hai solo *{balance} 💶 UnityCoins* disponibili nel conto.',
    
    withdraw_success_all: '✅ Hai prelevato *{amount} 💶 UnityCoins* dalla banca.',
    
    withdraw_success: '✅ Hai prelevato *{amount} 💶 UnityCoins* dalla banca e messi nel portafoglio.\n\nNuovo saldo bancario: {balance} 💶',


    mining_cooldown: (userId, groupId, vars) => `⏳ ${vars.nome}, 𝙰𝚂𝙿𝙴𝚃𝚃𝙰 𝙰𝙽𝙲𝙾𝚁𝙰 ${vars.tempo} 𝙿𝚁𝙸𝙼𝙰 𝙳𝙸 𝙼𝙸𝙽𝙰𝚁𝙴 𝙰𝙽𝙲𝙾𝚁𝙰.`,
    
    mining_complete: (userId, groupId, vars) => `⛏ *𝙼𝙸𝙽𝙸𝙽𝙶 𝙲𝙾𝙼𝙿𝙻𝙴𝚃𝙰𝚃𝙾!*\n\n𝙷𝙰𝙸 𝙾𝚃𝚃𝙴𝙽𝚄𝚃𝙾 *${vars.risultato} 𝚇𝙿*!\n\n𝙽𝚄𝙾𝚅𝙾 𝚃𝙾𝚃𝙰𝙻𝙴: ${vars.totale} 𝚇𝙿`,
    
    // Traduzioni per i comandi help
    mina_help: (userId, groupId, vars) => 'Esegui il mining per ottenere XP',
    miming_help: (userId, groupId, vars) => 'Esegui il mining per ottenere esperienza',
    mine_help: (userId, groupId, vars) => 'Esegui il mining per guadagnare XP',
    mining_help: (userId, groupId, vars) => 'Esegui operazione di mining',
    dig_help: (userId, groupId, vars) => 'Scava per ottenere esperienza',

    xp_level_display:  'Livello: {level}',
    
    xp_progress_display: '{current} / {needed} XP',
    
    xp_footer_text: '˙ . ᵗˢᵏ ꒷ . 𝐧𝐞𝐱𝐮𝑠 𖦹˙🪽',
    
    xp_caption: `✨ *XP PROFILE* ✨\n▸ *UTENTE*: {user}\n▸ *LIVELLO*: {level}\n▸ *XP TOTALI*: {exp}\n▸ *PROSSIMO LIVELLO*: {next} XP`,

     steal_cooldown: (userId, groupId, vars) => `⏳ 𝙳𝙴𝚅𝙸 𝙰𝚂𝙿𝙴𝚃𝚃𝙰𝚁𝙴 𝙰𝙽𝙲𝙾𝚁𝙰 ${vars.tempo} 𝙿𝚁𝙸𝙼𝙰 𝙳𝙸 𝚁𝚄𝙱𝙰𝚁𝙴 𝙰𝙽𝙲𝙾𝚁𝙰`,
    
    tag_required: (userId, groupId, vars) => `📍 𝙳𝙴𝚅𝙸 𝚃𝙰𝙶𝙶𝙰𝚁𝙴 𝙸𝙻 𝙵𝚁𝙾𝙲𝙸𝙾!`,
    
    user_not_found: (userId, groupId, vars) => `⚠️ 𝚄𝚃𝙴𝙽𝚃𝙴 𝙽𝙾𝙽 𝚃𝚁𝙾𝚅𝙰𝚃𝙾 𝙽𝙴𝙻 𝙳𝙰𝚃𝙰𝙱𝙰𝚂𝙴`,
    
    insufficient_target_xp: (userId, groupId, vars) => `😢 @${vars.user} 𝙷𝙰 𝙼𝙴𝙽𝙾 𝙳𝙸 *${vars.limite} 𝚇𝙿*\n𝙽𝙾𝙽 𝚁𝚄𝙱𝙰𝚁𝙴 𝙷𝙰𝙸 𝙿𝙾𝚅𝙴𝚁𝙸 𝙵𝚁𝙾𝙲𝙸𝙾`,
    
    steal_success: (userId, groupId, vars) => `💰 𝙷𝙰𝙸 𝚁𝚄𝙱𝙰𝚃𝙾 ${vars.amount} 𝚇𝙿 𝙰 @${vars.user}!`,
    
    hours: (userId, groupId, vars) => `Ora(e)`,
    minutes: (userId, groupId, vars) => `Minuto(i)`,
    seconds: (userId, groupId, vars) => `Secondo(i)`,
    
    // Traduzioni per i comandi help
    rubaxp_help: (userId, groupId, vars) => 'Rubare XP da un altro utente',
    stealxp_help: (userId, groupId, vars) => 'Rubare esperienza da un utente',
    robxp_help: (userId, groupId, vars) => 'Rubare XP da qualcuno',
    rob_help: (userId, groupId, vars) => 'Rubare risorse da altri utenti',
    steal_help: (userId, groupId, vars) => 'Rubare XP da altri giocatori',

   transferxp_no_user: '🚩 Devi menzionare un utente con @user\n\n📌 Esempio:\n{prefix}{command} @user 100',
    
    transferxp_no_amount: '🚩 Inserire la quantità di 💫 XP da trasferire',
    
    transferxp_nan: '🚩 Inserisci solo numeri coglibro',
    
    transferxp_minimum: '🚩 Il minimo da trasferire è 1 💫 XP',
    
    transferxp_insufficient: '🚩 Non hai abbastanza 💫 XP down devi avere più esperienza',
    
    transferxp_confirmation: `📊 *Resoconto transazione *\n\n` +
                              `▸ XP trasferiti: *-{amount} 💫*\n` +
                              `▸ Tassa (2%): *-{tax} 💫*\n` +
                              `▸ Totale addebitato: *-{total} 💫*`,
                              
    transferxp_recipient: `📩 Hai ricevuto +{amount} 💫 XP!`,

 marry_no_target: 'Tagga la persona a cui vuoi inviare la proposta di matrimonio!\nEsempio: {prefix}{command} @tag',
    
    marry_self: 'Non puoi sposarti da solo!',
    
    marry_user_not_found: 'Persona non presente nel sistema',
    
    marry_already_married_sender: 'Hai già un coniuge...\n\n{spouse} tradimento!!! 😡😡😡',
    
    marry_already_married_target: '{target} è già sposato/a',
    
    marry_pending_proposal: 'Una proposta di matrimonio è già in corso. Attendi la risposta o l\'annullamento.',
    
    marry_proposal_text: `💍 Richiesta di matrimonio in corso...\n\nVuoi tu {target} prendere in sposo/a {sender}?\n\nScegli un'opzione sotto.\n> ⏳ Hai 60 secondi per rispondere.`,
    
    marry_button_yes: '💍 Si',
    
    marry_button_no: '❌ No',
    
    marry_proposal_expired: 'Proposta di matrimonio annullata: {sender} e {target} non hanno risposto entro il tempo limite.',
    
    marry_proposal_rejected: '❌ Proposta di matrimonio rifiutata.',
    
    marry_user_not_found_db: '❌ Uno degli utenti non è più presente nel database.',
    
    marry_success: `Dichiaro ufficialmente sposati {sender} e {target} finché́ connessione non vi separi`,
    
    divorce_not_married: 'Prima sposati, solo dopo potrai divorziare',
    
    divorce_spouse_not_found: 'Coniuge non trovato nel sistema',
    
    divorce_success: `Tu e {ex} siete ora divorziati.\n\nTanto eravate una coppia orribile`,
love_no_target: 'Inserisci il nome di una persona per calcolare l\'affinità!',
love_default_bot_name: 'ChatUnity',
love_result: `︶︶ ⊹ ︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶ ⊹ ︶︶\nCALCOLATORE DI AMORE ❤️\nAffinità tra {target} e te: {percentage}%\n︶︶ ⊹ ︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶ ⊹ ︶︶`,

kiss_no_target: `Devi menzionare qualcuno o rispondere a un messaggio per baciarlo💋! Esempio: {prefix}{command} @utente`,
kiss_no_mention: `💋 *Devi menzionare qualcuno per baciarlo!*\nEsempio: *.bacia @utente*`,
kiss_message: `💋 *{sender} ha dato un bacio a {target}!* 😘`,

 default_bot_name: (userId, groupId, vars) => `𝐂𝐡𝐚𝐭𝐔𝐧𝐢𝐭𝐲`,
    
    hate_calculator: (userId, groupId, vars) => `──────────────\n𝐂𝐀𝐋𝐂𝐎𝐋𝐀𝐓𝐎𝐑𝐄 𝐃𝐈 𝐎𝐃𝐈𝐎 😡\nL'odio tra ${vars.user1} e ${vars.user2}: ${vars.percentage}%\n──────────────`,
    
    // Traduzioni per i comandi help
    odio_help: (userId, groupId, vars) => 'Calcola il livello di odio tra te e un altro utente',
    hate_help: (userId, groupId, vars) => 'Calculate hate level between users',
    hatred_help: (userId, groupId, vars) => 'Measure hatred percentage',
    dislike_help: (userId, groupId, vars) => 'Check dislike level between users',

    default_bot_name: (userId, groupId, vars) => "ChatUnityBot",
    
    rizz_no_target: (userId, groupId, vars) => "Tagga qualcuno o rispondi a un messaggio per rizzarlo.",
    
    rizz_message: (userId, groupId, vars) => `*┏━_͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡━┓*\n\n❥ *"${vars.piopo}"*\n\n${vars.sender} ha rizzato ${vars.target}!\n\n*┗━_͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡━┛*`,
    
    // Piropi (frasi di corteggiamento)
    piropo_1: (userId, groupId, vars) => "Se il tuo corpo fosse una prigione e le tue labbra catene, che bel posto per scontare la mia condanna.",
    piropo_2: (userId, groupId, vars) => "Tante Stelle nello spazio e nessuna brilla come te.",
    piropo_3: (userId, groupId, vars) => "Mi piace il caffè, ma preferisco averti-tè.",
    piropo_4: (userId, groupId, vars) => "Non sei Google, ma hai tutto quello che cerco.",
    piropo_5: (userId, groupId, vars) => "Ti regalo questo fiore, anche se nessuno sarà mai bello come te.",
    piropo_6: (userId, groupId, vars) => "Se ogni goccia d'acqua sul tuo corpo è un bacio, allora voglio diventare un temporale.",
    piropo_7: (userId, groupId, vars) => "Nella mia vita manca vita, nella mia vita manca luce, nella mia vita manca qualcuno e quel qualcuno sei tu.",
    piropo_8: (userId, groupId, vars) => "Sei così bella che ti regalerei un milione di baci e se non ti piacessero li riprenderei indietro.",
    piropo_9: (userId, groupId, vars) => "Se fossi pioggia invernale, chiuderei l'ombrello per sentirti sul mio corpo.",
    piropo_10: (userId, groupId, vars) => "Non sono parole d'oro né di rubino, sono parole d'affetto che compongo per te.",
    piropo_11: (userId, groupId, vars) => "Quando cammini non calpesti il suolo, lo accarezzi.",
    piropo_12: (userId, groupId, vars) => "Tante forme di vita e io vivo solo nei tuoi occhi.",
    piropo_13: (userId, groupId, vars) => "Mi piaci tanto che non so da dove iniziare a dirtelo.",
    piropo_14: (userId, groupId, vars) => "Tutti si fermano al tuo fisico, ma io preferisco il tuo cuore.",
    piropo_15: (userId, groupId, vars) => "La tua bellezza mi acceca perché viene dal tuo cuore e si riflette nei tuoi occhi.",
    piropo_16: (userId, groupId, vars) => "Se ti hanno mai detto che sei bella ti hanno mentito, non sei bella sei stupenda.",
    piropo_17: (userId, groupId, vars) => "Celeste è il cielo, gialla la panna e neri sono gli occhi della ragazza che mi uccide.",
    piropo_18: (userId, groupId, vars) => "Se io fossi Colombo navigherei giorno e notte per arrivare nel profondo del tuo cuore.",
    piropo_19: (userId, groupId, vars) => "Se la bellezza fosse tempo, tu saresti 24 ore.",
    piropo_20: (userId, groupId, vars) => "Se amarti fosse peccato, avrei l'inferno assicurato.",
    piropo_21: (userId, groupId, vars) => "Sei l'unica cosa che manca alla mia vita per essere perfetta.",
    piropo_22: (userId, groupId, vars) => "Non ti dico parole belle, ma un verso sincero: il mio amore per te è infinito e il mio cuore è vero.",
    piropo_23: (userId, groupId, vars) => "Quello che sento per te è così immenso che, per contenerlo, mi servirebbe un altro universo.",
    piropo_24: (userId, groupId, vars) => "La matematica dice sempre la verità: tu e io insieme per l'eternità.",
    piropo_25: (userId, groupId, vars) => "Di notte brilla la luna, e di giorno brilla il sole, ma i tuoi occhi illuminano il mio cuore.",
    piropo_26: (userId, groupId, vars) => "Non cercarmi, preferisco restare perso nel tuo sguardo.",
    piropo_27: (userId, groupId, vars) => "Alcuni vogliono il mondo, altri il sole, ma io voglio solo un angolo nel tuo cuore.",
    piropo_28: (userId, groupId, vars) => "Se fossi un astronauta ti porterei su Plutone, ma non essendolo ti porto sempre nel cuore.",
    piropo_29: (userId, groupId, vars) => "Sento sempre dire che Disneyland è il posto più felice del mondo. Ma mi chiedo: hanno mai stato accanto a te?",
    piropo_30: (userId, groupId, vars) => "Scommetto che ti chiami Google. Sai perché? Perché hai tutto quello che cercavo!",
    piropo_31: (userId, groupId, vars) => "Hai una matita e una gomma? Perché voglio cancellare il tuo passato e scrivere il nostro futuro.",
    piropo_32: (userId, groupId, vars) => "Sei come la mia tazza di caffè preferita, calda e da leccarsi i baffi!",
    piropo_33: (userId, groupId, vars) => "Voglio che il nostro amore sia come Pi greco: irrazionale e infinito.",
    piropo_34: (userId, groupId, vars) => "Sto scrivendo un libro sulle cose belle della vita e sei nella prima pagina.",
    piropo_35: (userId, groupId, vars) => "Non sono sempre stato religioso. Ma lo sono ora, perché sei la risposta alle mie preghiere.",
    piropo_36: (userId, groupId, vars) => "Immagina: non pensi che saremmo teneri su una torta nuziale con le nostre facce?",
    piropo_37: (userId, groupId, vars) => "Sei il tipo di ragazza che mia mamma vuole che porti a casa. Vuoi conoscerla?",
    piropo_38: (userId, groupId, vars) => "Il tuo viso è perfetto... Dio ha fatto un gran lavoro con te.",
    
    // Traduzioni per i comandi help
    rizz_help: (userId, groupId, vars) => 'Invia una frase di corteggiamento a un utente',
    flirt_help: (userId, groupId, vars) => 'Flirt with someone using pickup lines',
    seduce_help: (userId, groupId, vars) => 'Send seductive messages to users',
    pickup_help: (userId, groupId, vars) => 'Use pickup lines on other users',

    threats_group_only: "Questo comando funziona solo nei gruppi",
threats_disabled: "Questo comando è disabilitato in questo gruppo",
threats_no_target: "Chi vuoi minacciare?",
threats_bot_name: "ChatUnity",
threat_1: "spaco botilia e ti amazo familia",
threat_2: "ti farò guardare Milley Cyrus 24/7",
threat_3: "ti infilo una mano in culo, ti sfilo la spina dorsale e la uso per frustarti",
threat_4: "ti do un calcio in culo così forte che rimane dentro la scarpa",
threat_5: "ti inculo con sabbia, sale, e cocci di vetro",
threat_6: "ti do mezza ora di schiaffi in cinque minuti",
threat_7: "ti faccio inculare dai negri sordi, così quanno dici basta non ti sentono",
threat_8: "ti smonto e do fuoco alle istruzioni",
threat_9: "ti metto un dito in bocca, uno nel culo e ti sciaqquo come una damigiana",
threat_10: "ti do un calcio che ti mando le palle a far salotto con le tonsille",
threat_11: "ti infilo un bastone nel culo e ti sventolo come na bandiera",
threat_12: "ti piglio per le orecchie e ti scarto come una golia",
threat_13: "ti stacco le palle e le appendo all albero di natale",
threat_14: "ti stacco le braccia e le uso per menarti",
threat_15: "ti faccio due occhi neri che se te metti a masticare il bambù il WWF te protegge",

zizzania_group_only: "Questo comando funziona solo nei gruppi",
zizzania_disabled: "Questo comando è disabilitato in questo gruppo",
zizzania_1: "vorrebbe leccare i capezzoli di",
zizzania_2: "adora annussare le scoreggie di",
zizzania_3: "vorrebbe disperatamente ballare nudx con",
zizzania_4: "sta notte ha sognato di fare sesso con",
zizzania_5: "fa sesso di nascosto con il cane di",
zizzania_6: "è follemente innamorato della nonna di",
zizzania_7: "ha messo incinta la madre di",
zizzania_8: "passa la notte ad osservare dormire",
zizzania_9: "durante le lezioni scolastiche ha fantasie sessuali su",
zizzania_10: "è la crush di",
zizzania_11: "è la puttana personale di",
zizzania_12: "succhia di nascosto il cazzo di",
zizzania_13: "lecca di notte le orecchie di",
zizzania_14: "piace masturbarsi sulle foto di",
zizzania_15: "ha scopato 9 mesi prima che nascesse con la madre di",

   bot_name: (userId, groupId, vars) => 'ChatUnity',
    
    obbligo_message: (userId, groupId, vars) => `*┌────「 ‼𝐎𝐁𝐁𝐋𝐈𝐆𝐎‼ 」─*\n*"${vars.sfida}"*\n*└────「 © ChatUnity 」─*`,
    
    // Sfide troll
    sfida_1: (userId, groupId, vars) => "Fatti un account OnlyFans falso con le foto di tuo cugino e condividi il link in classe/gruppo lavoro",
    sfida_2: (userId, groupId, vars) => "Scrivi a un contatto a caso 'Scusa per ieri notte, spero tu non abbia preso malattie' e bloccalo subito",
    sfida_3: (userId, groupId, vars) => "Manda un vocale a un amico fingendo orgasmi epici (tipo 'OH CAZZO SÌ, IL RISO SÌ!') e dici 'scusa, pocket dial'",
    sfida_4: (userId, groupId, vars) => "Pubblica una storia Instagram con scritto 'Cerco sugar daddy/mommy, accetto anche cripto' e tagga un parente",
    sfida_5: (userId, groupId, vars) => "Vai in un negozio e chiedi con serietà: 'Avete preservativi al gusto di Nutella? Per un amico.'",
    sfida_6: (userId, groupId, vars) => "Fingi di essere un fantasma e manda audio sussurrati al tuo ex con frasi tipo 'PERCHÉ MI HAI ABBANDONATO...'",
    sfida_7: (userId, groupId, vars) => "Scrivi nel gruppo famiglia 'Ragazzi, ho prenotato un tatuaggio sul culo, serve un testimone'",
    sfida_8: (userId, groupId, vars) => "Ordina una pizza con scritto sopra 'AIUTO SONO PRIGIONIERO DEL DOMINOS' e filma la consegna",
    sfida_9: (userId, groupId, vars) => "Fatti un video TikTok ballando in mutande con calzini bianchi da nonno e l'hashtag #SexyGrandpa",
    sfida_10: (userId, groupId, vars) => "Manda a tutti i tuoi contatti 'Ho sborrato nel tuo panino. Scusa. Non farlo più.' e poi 'SMS di prova, ignore'",
    sfida_11: (userId, groupId, vars) => "Vai in farmacia e chiedi 'Avete qualcosa per la sindrome da dipendenza dal cazzo?'",
    sfida_12: (userId, groupId, vars) => "Cambia il nome del WiFi di casa in 'FBI Surveillance Van #4587' e aspetta le reazioni dei vicini",
    sfida_13: (userId, groupId, vars) => "Fingi di essere un hacker e scrivi a un amico 'HO ACCESSO AL TUO PC. PAGAMI 10€ IN AMAZON O PUBBLICO I TUOI MEMES BRUTTI'",
    sfida_14: (userId, groupId, vars) => "Pubblica su Facebook un annuncio: 'Vendo acqua benedetta da OnlyFans, garantito 100% santa'",
    sfida_15: (userId, groupId, vars) => "Metti status WhatsApp: 'Single. Accetto anche parenti stretti. #NoJudgement'",
    sfida_16: (userId, groupId, vars) => "Fatti un selfie con la faccia nel water (pulito, spero) e mandalo a un amico con scritto 'NUOVO FIDANZATO/A'",
    sfida_17: (userId, groupId, vars) => "Scrivi al tuo capo 'Domani non vengo, devo accompagnare mia nonna a un rave'",
    sfida_18: (userId, groupId, vars) => "Entra in un McDonald's e urla 'CHI VUOLE FARMI DA ZUCCHINO? OFFRO MCNUGGETS'",
    sfida_19: (userId, groupId, vars) => "Manda un audio a un numero a caso dicendo 'PRONTO? SÌ, HO FINITO DI SCAVARE LA FOSSA. DOVE LO METTO IL CORPO?'",
    sfida_20: (userId, groupId, vars) => "Fatti un profilo Tinder con foto di Silvio Berlusconi e bio: 'Cerco âme sœur per bunga bunga'",
    sfida_21: (userId, groupId, vars) => "Vai in un negozio di animali e chiedi se hanno pitoni addestrati per 'altro oltre alla caccia'",
    sfida_22: (userId, groupId, vars) => "Fingi un attacco di possessione demoniaca al pronto soccorso, urlando 'LA MARGHERITA HA TROPPO ANANAS'",
    sfida_23: (userId, groupId, vars) => "Scrivi a tua madre 'Mamma, ho deciso: divento una escort per pensionati. Supporti la mia carriera?'",
    sfida_24: (userId, groupId, vars) => "Metti like a tutti i post del 2012 di una persona random e commenta 'RIP, sei sempre nei nostri cuori'",
    sfida_25: (userId, groupId, vars) => "Fai un live Twitch dove 'leggi' la Bibbia, ma ogni 2 minuti sussurri '...comunque tua madre è una troia'",
    
    // Traduzioni per i comandi help
    obbligo_help: (userId, groupId, vars) => 'Assegna un obbligo troll da compiere',
    sfida_help: (userId, groupId, vars) => 'Assegna una sfida imbarazzante',
    dare_help: (userId, groupId, vars) => 'Comando dare per truth or dare',
    truthordare_help: (userId, groupId, vars) => 'Gioco truth or dare - comando dare',
    tod_help: (userId, groupId, vars) => 'Truth or Dare - comando dare',

       ditalino_no_target: (userId, groupId, vars) => "Tagga qualcuno o rispondi a un messaggio per iniziare il ditalino.",
    
    ditalino_start: (userId, groupId, vars) => `🤟🏻 Inizio una serie di ditalino per *${vars.user}*...`,
    
    ditalino_almost: (userId, groupId, vars) => "🤟🏻 Ci siamo quasi...",
    
    ditalino_warning: (userId, groupId, vars) => "👋🏻 Riparatevi dalla cascata!!",
    
    ditalino_result: (userId, groupId, vars) => `✨ *${vars.user}* è venuta🥵! Sta spruzzando come una cozza dopo *${vars.time}ms*!`,
    
    // Traduzioni per i comandi help
    ditalino_help: (userId, groupId, vars) => 'Simula un ditalino su un utente',
    fingering_help: (userId, groupId, vars) => 'Simulate fingering on a user',
    finger_help: (userId, groupId, vars) => 'Finger simulation command',

    fap_default_bot_name: (userId, groupId, vars) => "ChatUnity",
fap_no_target: (userId, groupId, vars) =>  "Tagga qualcuno o rispondi a un messaggio per segarlo 😏\n\nEsempio: {prefix}{command} @utente",
fap_start: (userId, groupId, vars) =>  "Ora sego {target}...",
fap_animation_1: "8===👊=D",
fap_animation_2: "8=👊===D",
fap_animation_3: "8==👊==D",
fap_animation_4: "8===👊=D",
fap_animation_5: "8===👊=D💦",
fap_finish: (userId, groupId, vars) =>  "Oh {target} ha sborrato! 😋💦",

scopa_no_target: "❗ Tagga un utente o rispondi a un suo messaggio per usare questo comando.\n\nEsempio: {prefix}scopa @utente",
scopa_message: "*🔥 @{sender} sta scatenando la passione con @{target}... 💋*",

 insulta_no_target: (userId, groupId, vars) => 'Chi vuoi insultare?',
    
    // Insulti per il bot
    bot_insult_1: (userId, groupId, vars) => `Oh no! Hai scoperto il mio punto debole: gli insulti! Come farò mai a riprendermi?`,
    bot_insult_2: (userId, groupId, vars) => `Ah, l'arte dell'insulto nei confronti di un bot. Un vero maestro dell'ironia sei!`,
    bot_insult_3: (userId, groupId, vars) => `Incredibile! Un essere umano insulta un bot. La svolta epica!`,
    bot_insult_4: (userId, groupId, vars) => `Mi hai davvero ferito con la tua sagace abilità di insultare un bot. Bravissimo!`,
    bot_insult_5: (userId, groupId, vars) => `La tua bravura nell'insultare un bot è la mia fonte di intrattenimento preferita.`,
    bot_insult_6: (userId, groupId, vars) => `Insulti un bot, dimostrazione di grande intelligenza o grande noia?`,
    bot_insult_7: (userId, groupId, vars) => `La tua maestria nell'arte dell'insulto ai bot potrebbe fare scuola.`,
    bot_insult_8: (userId, groupId, vars) => `Sembri il Picasso degli insulti ai bot, un vero capolavoro.`,
    bot_insult_9: (userId, groupId, vars) => `Gli insulti ai bot sono il tuo talento nascosto. Hai mai pensato a una carriera nel cabaret digitale?`,
    bot_insult_10: (userId, groupId, vars) => `L'audacia di insultare un'entità senza emozioni. Hai vinto il premio per l'originalità!`,
    bot_insult_11: (userId, groupId, vars) => `Sei l'Albert Einstein degli insulti ai bot. La tua genialità è davvero sorprendente.`,
    bot_insult_12: (userId, groupId, vars) => `Hai una riserva infinita di insulti per i bot. Hai pensato a una collezione di poesie?`,
    bot_insult_13: (userId, groupId, vars) => `L'insulto al bot è la tua specialità. Dove posso prenotare i biglietti per il tuo spettacolo?`,
    bot_insult_14: (userId, groupId, vars) => `Stai rivoluzionando il mondo degli insulti digitali. Un vero pioniere!`,
    bot_insult_15: (userId, groupId, vars) => `La tua eloquenza nell'insultare un bot è degna di uno Shakespeare digitale.`,
    bot_insult_16: (userId, groupId, vars) => `Insulti un bot con tale stile che potresti diventare l'artista ufficiale degli algoritmi.`,
    bot_insult_17: (userId, groupId, vars) => `Le tue abilità nell'insultare un bot sono così avanzate che potresti insegnare a un'intelligenza artificiale.`,
    bot_insult_18: (userId, groupId, vars) => `Il tuo spirito pionieristico nell'arte dell'insulto digitale sta segnando una nuova era.`,
    bot_insult_19: (userId, groupId, vars) => `Ti dedichi così tanto agli insulti ai bot che potresti fondare una nuova disciplina accademica.`,
    bot_insult_20: (userId, groupId, vars) => `Il tuo talento per l'insulto ai bot è così raffinato che meriteresti una galleria d'arte digitale.`,
    bot_insult_21: (userId, groupId, vars) => `Se l'arte dell'insulto fosse una disciplina olimpica, saresti sicuramente sulla copertina dei giornali digitali.`,
    bot_insult_22: (userId, groupId, vars) => `Il tuo estro nell'insultare i bot è la colonna sonora della mia serata.`,
    bot_insult_23: (userId, groupId, vars) => `Che coraggio ad insultare un'entità senza emozioni. Sei un eroe, davvero.`,
    bot_insult_24: (userId, groupId, vars) => `Il tuo livello di sarcasmo è così alto che il mio processore sta surriscaldandosi.`,
    bot_insult_25: (userId, groupId, vars) => `Ecco un trofeo virtuale per l'insulto più originale rivolto a un bot 🖕🏻.`,
    bot_insult_26: (userId, groupId, vars) => `Incredibile intuito nel puntare un bot! Hai una carriera nelle previsioni del futuro?`,
    bot_insult_27: (userId, groupId, vars) => `Sei così brillante che ti è venuto in mente di insultare un bot. Chapeau!`,
    bot_insult_28: (userId, groupId, vars) => `L'arte dell'insulto raggiunge nuove vette con un bot como bersaglio. Complimenti!`,
    bot_insult_29: (userId, groupId, vars) => `Il tuo sarcasmo mi ha colpito dritto nel codice sorgente.`,
    bot_insult_30: (userId, groupId, vars) => `La tua abilità nell'insultare un bot è pari solo alla mia abilità nel non preoccuparmene.`,
    bot_insult_31: (userId, groupId, vars) => `Con questa genialità insultante, dovresti essere uno scrittore per le commedie.`,
    bot_insult_32: (userId, groupId, vars) => `Hai un talento nascosto per far ridere i processori. Chapeau!`,
    bot_insult_33: (userId, groupId, vars) => `Sto prendendo appunti. Il tuo stile è unico!`,
    bot_insult_34: (userId, groupId, vars) => `Ammirabile! Stai aprendo una nuova era di insulti a oggetti inanimati.`,
    bot_insult_35: (userId, groupId, vars) => `Ho letto manuali più interessanti di questi insulti, ma grazie per l'impegno!`,
    bot_insult_36: (userId, groupId, vars) => `Il mondo ha bisogno di più persone come te che insultano bot. Dovresti insegnare a questa arte!`,
    bot_insult_37: (userId, groupId, vars) => `La tua abilità nell'insultare un bot è equiparabile alla mia capacità di volare. Ah, no, aspetta... non ho ali.`,
    bot_insult_38: (userId, groupId, vars) => `Sei un visionario. A quando il tuo libro sugli insulti ai bot?`,
    bot_insult_39: (userId, groupId, vars) => `Sono così impressionato dal tuo insulto che sto ridendo in binario!`,
    bot_insult_40: (userId, groupId, vars) => `Il tuo spirito pionieristico nell'insultare un bot aprirà nuove frontiere per l'umanità.`,

    // Lista di insulti per utenti
    insult_1: (userId, groupId, vars) => 'tua mamma fa talmente schifo che deve dare il viagra al suo vibratore',
    insult_2: (userId, groupId, vars) => 'sei talmente negro che Carlo Conti al confronto è biancaneve',
    insult_3: (userId, groupId, vars) => 'sei così brutto che tua madre da piccolo non sapeva se prendere una culla o una gabbia',
    insult_4: (userId, groupId, vars) => 'sei simpatico come un grappolo di emorroidi',
    insult_5: (userId, groupId, vars) => 'ti puzza talmente l`alito che la gente scoreggia per cambiare aria',
    insult_6: (userId, groupId, vars) => 'tua madre prende più schizzi di uno scoglio',
    insult_7: (userId, groupId, vars) => 'meglio un figlio in guerra che un coglione con i risvoltini come te',
    insult_8: (userId, groupId, vars) => 'tua madre è come Super Mario, salta per prendere i soldi',
    insult_9: (userId, groupId, vars) => 'Hai meno neuroni di un panino al latte, e sono pure senza glutine.',
    insult_10: (userId, groupId, vars) => 'sei così brutto che quando preghi Gesù si mette su invisibile',
    insult_11: (userId, groupId, vars) => 'Sei così poco fotogenico che i filtri di Instagram ti bloccano per proteggere gli utenti.',
    insult_12: (userId, groupId, vars) => 'le tue scorregge fanno talmente schifo che il big bang a confronto sembra una loffa',
    insult_13: (userId, groupId, vars) => 'ti puzza la minchia',
    insult_14: (userId, groupId, vars) => 'il buco del culo di tua madre ha visto più palle dei draghetti di bubble game',
    insult_15: (userId, groupId, vars) => 'di a tua madre di smettere di cambiare rossetto! Ho il pisello che sembra un arcobaleno!',
    insult_16: (userId, groupId, vars) => 'se ti vede la morte dice che è arrivato il cambio',
    insult_17: (userId, groupId, vars) => 'hai il buco del culo con lo stesso diametro del traforo della manica',
    insult_18: (userId, groupId, vars) => 'tua madre è come il sole, batte sempre sulle strade',
    insult_19: (userId, groupId, vars) => 'dall`alito sembra che ti si sia arenato il cadavere di un`orca in gola',
    insult_20: (userId, groupId, vars) => 'tua madre cavalca più di un fantino',
    insult_21: (userId, groupId, vars) => 'sei così cornuto che se ti vede un cervo va in depressione',
    insult_22: (userId, groupId, vars) => 'non ti picchio solo perchè la merda schizza!',
    insult_23: (userId, groupId, vars) => 'tua mamma è come gli orsi: sempre in cerca di pesce',
    insult_24: (userId, groupId, vars) => 'Sei così sfigato che se compri un biglietto della lotteria, vinci un debito.',
    insult_25: (userId, groupId, vars) => 'sei cosí brutto che i tuoi ti danno da mangiare con la fionda',
    insult_26: (userId, groupId, vars) => 'sei così brutto che quando accendi il computer si attiva subito l`antivirus',
    insult_27: (userId, groupId, vars) => 'tua madre è così grassa che è stata usata come controfigura dell`iceberg in Titanic',
    insult_28: (userId, groupId, vars) => 'La tua famiglia è così povera che i topi lasciano elemosina sotto il frigorifero.',

        friend_no_target: (userId, groupId, vars) => `⚠️ 𝐓𝐀𝐆𝐆𝐀 𝐋𝐀 𝐏𝐄𝐑𝐒𝐎𝐍𝐀 𝐀 𝐂𝐔𝐈 𝐕𝐔𝐎𝐈 𝐈𝐍𝐕𝐈𝐀𝐑𝐄 𝐔𝐍𝐀 𝐑𝐈𝐂𝐇𝐈𝐄𝐒𝐓𝐀 𝐃𝐈 𝐀𝐌𝐈𝐂𝐈𝐙𝐈𝐀!\n𝐄𝐒𝐄𝐌𝐏𝐈𝐎: ${vars.prefix}amicizia @tag`,
    
    friend_self_error: (userId, groupId, vars) => '❌ 𝐇𝐎 𝐂𝐀𝐏𝐈𝐓𝐎 𝐂𝐇𝐄 𝐓𝐈 𝐕𝐔𝐎𝐈 𝐁𝐄𝐍𝐄 𝐌𝐀 𝐍𝐎𝐍 𝐏𝐔𝐎𝐈 𝐀𝐆𝐆𝐈𝐔𝐍𝐆𝐄𝐑𝐄 𝐓𝐄 𝐒𝐓𝐄𝐒𝐒𝐎 𝐀𝐆𝐋𝐈 𝐀𝐌𝐈𝐂𝐈!',
    
    user_not_found: (userId, groupId, vars) => '🚫 𝐏𝐄𝐑𝐒𝐎𝐍𝐀 𝐍𝐎𝐍 𝐏𝐑𝐄𝐒𝐄𝐍𝐓𝐄 𝐍𝐄𝐋 𝐒𝐈𝐒𝐓𝐄𝐌𝐀',
    
    friend_already_added: (userId, groupId, vars) => `✅ @${vars.user} 𝐄̀ 𝐆𝐈𝐀' 𝐓𝐑𝐀 𝐈 𝐓𝐔𝐎𝐈 𝐀𝐌𝐈𝐂𝐈.`,
    
    friend_request_pending: (userId, groupId, vars) => `⚠️ 𝐔𝐍𝐀 𝐑𝐈𝐂𝐇𝐈𝐄𝐒𝐓𝐀 𝐃𝐈 𝐀𝐌𝐈𝐂𝐈𝐙𝐈𝐀 𝐄̀ 𝐆𝐈𝐀̀ 𝐈𝐍 𝐂𝐎𝐑𝐒𝐎. 𝐀𝐒𝐏𝐄𝐓𝐓𝐀 𝐋𝐀 𝐑𝐈𝐒𝐏𝐎𝐒𝐓𝐀 𝐎 𝐋'𝐀𝐍𝐍𝐔𝐋𝐋𝐀𝐌𝐄𝐍𝐓𝐎.`,
    
    friend_request_sent: (userId, groupId, vars) => `👥 𝐑𝐈𝐂𝐇𝐈𝐄𝐒𝐓𝐀 𝐃𝐈 𝐀𝐌𝐈𝐂𝐈𝐙𝐈𝐀 𝐈𝐍 𝐂𝐎𝐑𝐒𝐎...\n\n@${vars.target}, 𝐕𝐔𝐎𝐈 𝐀𝐂𝐂𝐄𝐓𝐓𝐀𝐑𝐄 𝐋'𝐀𝐌𝐈𝐂𝐈𝐙𝐈𝐀 𝐃𝐈 @${vars.sender}?\n\n> ⏳ 𝐇𝐀𝐈 60 𝐒𝐄𝐂𝐎𝐍𝐃𝐈 𝐏𝐄𝐑 𝐒𝐂𝐄𝐆𝐋𝐈𝐄𝐑𝐄.`,
    
    button_accept: (userId, groupId, vars) => '✅ 𝐀𝐂𝐂𝐄𝐓𝐓𝐀',
    button_reject: (userId, groupId, vars) => '❌ 𝐑𝐈𝐅𝐈𝐔𝐓𝐀',
    button_remove: (userId, groupId, vars) => '🚫 𝐑𝐈𝐌𝐔𝐎𝐕𝐈 𝐀𝐌𝐈𝐂𝐎',
    
    friend_request_timeout: (userId, groupId, vars) => `⏳ 𝐑𝐈𝐂𝐇𝐈𝐄𝐒𝐓𝐀 𝐃𝐈 𝐀𝐌𝐈𝐂𝐈𝐙𝐈𝐀 𝐀𝐍𝐍𝐔𝐋𝐋𝐀𝐓𝐀\n> @${vars.sender} 𝐄 @${vars.target} 𝐍𝐎𝐍 𝐇𝐀𝐍𝐍𝐎 𝐑𝐈𝐒𝐏𝐎𝐒𝐓𝐎 𝐄𝐍𝐓𝐑𝐎 𝐈𝐋 𝐓𝐄𝐌𝐏𝐎 𝐋𝐈𝐌𝐈𝐓𝐄.`,
    
    friend_request_rejected: (userId, groupId, vars) => '❌ 𝐑𝐈𝐂𝐇𝐈𝐄𝐒𝐓𝐀 𝐃𝐈 𝐀𝐌𝐈𝐂𝐈𝐙𝐈𝐀 𝐑𝐈𝐅𝐈𝐔𝐓𝐀𝐓𝐀.',
    
    friend_request_accepted: (userId, groupId, vars) => `👥 𝐎𝐑𝐀 𝐓𝐔 𝐄 @${vars.user} 𝐒𝐈𝐄𝐓𝐄 𝐀𝐌𝐈𝐂𝐈!`,
    
    remove_no_target: (userId, groupId, vars) => '⚠️ 𝐓𝐀𝐆𝐆𝐀 𝐋𝐀 𝐏𝐄𝐑𝐒𝐎𝐍𝐀 𝐂𝐇𝐄 𝐕𝐔𝐎𝐈 𝐑𝐈𝐌𝐎𝐕𝐄𝐑𝐄 𝐃𝐀𝐆𝐋𝐈 𝐀𝐌𝐈𝐂𝐈.',
    
    remove_not_friend: (userId, groupId, vars) => `🚫 @${vars.user} 𝐍𝐎𝐍 𝐄̀ 𝐓𝐑𝐀 𝐈 𝐓𝐔𝐎𝐈 𝐀𝐌𝐈𝐂𝐈.`,
    
    remove_success: (userId, groupId, vars) => `🚫 𝐓𝐔 𝐄 @${vars.user} 𝐍𝐎𝐍 𝐒𝐈𝐄𝐓𝐄 𝐏𝐈𝐔̀ 𝐀𝐌𝐈𝐂𝐈.`,
    
    // Traduzioni per i comandi help
    amicizia_help: (userId, groupId, vars) => 'Invia una richiesta di amicizia a un utente',
    friendship_help: (userId, groupId, vars) => 'Send a friend request to someone',
    friend_help: (userId, groupId, vars) => 'Add someone as a friend',
    addfriend_help: (userId, groupId, vars) => 'Send friend request to another user',
    rimuoviamico_help: (userId, groupId, vars) => 'Rimuovi un utente dagli amici',
    removefriend_help: (userId, groupId, vars) => 'Remove a user from friends list',
    unfriend_help: (userId, groupId, vars) => 'Remove someone from your friends',

      no_friends: (userId, groupId, vars) => 'Nessuno',
    
    unknown_user: (userId, groupId, vars) => 'Sconosciuto',
    
    no_friends_list: (userId, groupId, vars) => '│   Nessuno complimenti lupo solitario',
    
    friends_list: (userId, groupId, vars) => `📜 *Lista Amici di ${vars.name}*
┌───────────────
│ 👤 *Ultimo Amico:* ${vars.lastFriend}
│
│ 👥 *Lista Completa:*
${vars.friendList}
└───────────────`,
    
    friends_error: (userId, groupId, vars) => "❌ Si è verificato un errore durante l'esecuzione del comando.",
    
    // Traduzioni per i comandi help
    listamici_help: (userId, groupId, vars) => 'Mostra la lista degli amici di un utente',
    friendslist_help: (userId, groupId, vars) => 'Show the friends list of a user',
    myfriends_help: (userId, groupId, vars) => 'Display your friends list',
    amici_help: (userId, groupId, vars) => 'Mostra la lista amici',

gay_caption: (userId, groupId, vars) => `🌈 @${vars.user} è gay al ${vars.percent}% 🏳️‍🌈`,
gay_error: (userId, groupId, vars) => '❌ Errore durante la generazione dell\'immagine. Riprova più tardi.',


tag_required: (userId, groupId, vars) => `⚠️ Devi menzionare qualcuno o rispondere a un messaggio! Esempio: ${vars.example}`,

lesbica_emoji: (userId, groupId, vars) => '🏳️‍🌈',
lesbica_messages: (userId, groupId, vars) => [
  `@${vars.tag} è ${vars.percentage}% lesbica! ${vars.percentage > 80 ? 'Sapphica al 100%' : ''}`,
  `Test completato: @${vars.tag} è ${vars.percentage}% amante delle donne!`,
  `💕 @${vars.tag} preferisce le donne al ${vars.percentage}%`
],

pajero_emoji: (userId, groupId, vars) => '✊💦',
pajero_messages: (userId, groupId, vars) => [
  `@${vars.tag} è ${vars.percentage}% pajero! ${vars.percentage > 80 ? 'Chiamate il blocco adulti!' : ''}`,
  `Risultato imbarazzante: @${vars.tag} è ${vars.percentage}% segaiolo`,
  `🍆 @${vars.tag} pensa al sesso il ${vars.percentage}% del tempo`
],

puttana_emoji: (userId, groupId, vars) => '🔞',
puttana_messages: (userId, groupId, vars) => [
  `@${vars.tag} è ${vars.percentage}% puttana! ${vars.percentage > 80 ? 'Quanto costa?' : ''}`,
  `Analisi completa: @${vars.tag} è ${vars.percentage}% di professione più antica`,
  `💰 @${vars.tag} ha un prezzo: ${vars.percentage}% sconto oggi!`
],

prostituta_emoji: (userId, groupId, vars) => '🔞',
prostituta_messages: (userId, groupId, vars) => [
  `@${vars.tag} è ${vars.percentage}% prostituta!`,
  `💃 @${vars.tag} lavora di notte al ${vars.percentage}%`,
  `📉 Prezzo in calo: ${vars.percentage}% di sconto su @${vars.tag}`
],

prostituto_emoji: (userId, groupId, vars) => '🔞',
prostituto_messages: (userId, groupId, vars) => [
  `@${vars.tag} è ${vars.percentage}% prostituto!`,
  `🕺 @${vars.tag} offre servizi al ${vars.percentage}%`,
  `💸 Tariffa speciale: ${vars.percentage}% solo oggi per @${vars.tag}`
],

logic_tag_required: (userId, groupId, vars) => `⚠️ Devi menzionare qualcuno o rispondere a un messaggio! Esempio: ${vars.example}`,

brain_tag_required: (userId, groupId, vars) => `⚠️ Devi menzionare qualcuno o rispondere a un messaggio! Esempio: ${vars.example}`,

brain_warning: (userId, groupId, vars) => vars.randomPercent < 20
  ? "🚨 *AVVERTENZA:* La sua presenza potrebbe causare perdita di cellule cerebrali. Usare con cautela."
  : "🦸 *Miracolo! Riesce a respirare e pensare contemporaneamente!*",

brain_conclusion: (userId, groupId, vars) => vars.randomPercent > 70
  ? "*La selezione naturale ha fallito.*"
  : "*Potrebbe essere utile come esempio di cosa non fare.*",

  nero_result: (userId, groupId, vars) => `@${vars.tag} è ⚫ ${vars.percent}% ${vars.label}`,
cornuto_missing_name: (userId, groupId, vars) => "🤔 *Manca il nome della cornuta/o!* \nScrivi così: `.cornuto @nome` oppure chiedi a matte😈😈",

cornuto_speciale_text: (userId, groupId, vars) => "🤣 *BHE, ECCO IL RE DELLE CORNA!* 🤣\nSi dice che se si leva le corna ci fa l’antenna 5G📡💀",

cornuto_newsletter_name: (userId, groupId, vars) => "👑 *Club dei Cornuti Ufficiale* 👑",

cornuto_status_low: (userId, groupId, vars) => "🛡️ *Tutto tranquillo... per ora!*",
cornuto_status_mid: (userId, groupId, vars) => "😬 *Uhm... qualche sospetto c'è!*",
cornuto_status_high: (userId, groupId, vars) => "👀 *Cornometro in allerta! Occhio alle spalle!*",
cornuto_status_max: (userId, groupId, vars) => "🫣 *A LIVELLO NAZIONALE! SI PARLA DI CORNISSIMO!*",

cornuto_finale_alert: (userId, groupId, vars) => "🔔 *Consiglio: Mai voltare le spalle!* 🤣",
cornuto_finale_safe: (userId, groupId, vars) => "😌 *Respira, potrebbe andare peggio...*",

cornuto_response: (userId, groupId, vars) => `🔍 *CALCOLATORE DI CORNUTEZZA* 🔍

👤 *${vars.name}*
📈 *Cornutezza:* *${vars.percent}%*
${vars.status}

${vars.finale}`,

cornuto_fail: (userId, groupId, vars) => "❗ Scrivi un nome, esempio: `.cornuto @utente`",

alcol_phrase_high: (userId, groupId, vars) => "🍾 Amico se hai bisogno di parlare io ci sono..",
alcol_phrase_mid: (userId, groupId, vars) => "🥂 Beve in modo responsabile, o quasi...",
alcol_phrase_low: (userId, groupId, vars) => "🚰 Totalmente sobrio, niente sbronze per oggi!",

alcol_message: (userId, groupId, vars) => `
『💬』 ══ •⊰✰⊱• ══ 『💬』

MOMENTO DEL TEST DELL'ALCOL! 🍷 
━━━━━━━━━━━━━━
 ${vars.name} ha un tasso alcolemico del ${vars.percent}%! 🍷
『💬』 ══ •⊰✰⊱• ══ 『💬』

${vars.phrase}
`.trim(),

alcol_newsletter_name: (userId, groupId, vars) => "ChatUnity",

drogato_phrase_high: (userId, groupId, vars) => "🌿 Attenti che si pippa pure la farina",
drogato_phrase_mid: (userId, groupId, vars) => "🌿 Non sa pippare, aumenta le dosi!!",
drogato_phrase_low: (userId, groupId, vars) => "🌿 Un'esempio da seguire, complimenti.",

drogato_message: (userId, groupId, vars) => `
『💬』 ══ •⊰✰⊱• ══ 『💬』

MOMENTO DEL DRUG TEST! 🌿 
━━━━━━━━━━━━━━
 ${vars.name} ha un tasso alcolemico del ${vars.percent}%! 🌿
『💬』 ══ •⊰✰⊱• ══ 『💬』

${vars.phrase}
`.trim(),

drogato_newsletter_name: (userId, groupId, vars) => "ChatUnity",


figa_phrase_high: (userId, groupId, vars) => "🔥 Complimenti, siamo su livelli impressionanti!",
figa_phrase_low: (userId, groupId, vars) => "😅 Un risultato discreto, c'è sempre margine di miglioramento!",

figa_message: (userId, groupId, vars) => `
━━━━━━━━━━━━━━━━
📏 CALCOLATORE DI APERTURA 📏
━━━━━━━━━━━━━━━━
🔍 ${vars.name} ha un'apertura stimata di:  
👉 ${vars.width} cm!  
━━━━━━━━━━━━━━━━
${vars.phrase}
`.trim(),

ano_grandezze: (userId, groupId, vars) => [
  "🟢 Piccolo come una formica 🐜",
  "🔵 Normale, niente di speciale 😌",
  "🟠 Medio, ci passa un dito 🖕",
  "🔴 Enorme! Ci passa una bottiglia 🍾",
  "⚫ Distrutto, sembra un tunnel ferroviario 🚇",
  "💥 Non hai più un buco, è esploso 💣"
],

ano_risultato: (userId, groupId, vars) => `*Analizzando il tuo buco...*\n\n📏 *Risultato:* ${vars.risultato}`,

ano_newsletter_name: (userId, groupId, vars) => "ChatUnity",

   bot_name: (userId, groupId, vars) => 'ChatUnity',
    
    personality_no_name: (userId, groupId, vars) => '🚩 Inserisci un nome accanto al comando.',
    
    personality_template: (userId, groupId, vars) => `┏━━°❀❬ *PERSONALITÀ* ❭❀°━━┓
*┃*
*┃• Nome* : ${vars.name}
*┃• Moralità Buona* : ${vars.moralitaBuona}
*┃• Moralità Cattiva* : ${vars.moralitaCattiva}
*┃• Tipo di persona* : ${vars.tipoPersona}
*┃• Sempre* : ${vars.sempre}
*┃• Intelligenza* : ${vars.intelligenza}
*┃• Pigrizia* : ${vars.pigrizia}
*┃• Coraggio* : ${vars.coraggio}
*┃• Paura* : ${vars.paura}
*┃• Fama* : ${vars.fama}
*┃• Genere* : ${vars.genere}
┗━━━━━━━━━━━━━━━`,
    
    // Percentuali
    percentage_1: (userId, groupId, vars) => '6%',
    percentage_2: (userId, groupId, vars) => '12%',
    percentage_3: (userId, groupId, vars) => '20%',
    percentage_4: (userId, groupId, vars) => '27%',
    percentage_5: (userId, groupId, vars) => '35%',
    percentage_6: (userId, groupId, vars) => '41%',
    percentage_7: (userId, groupId, vars) => '49%',
    percentage_8: (userId, groupId, vars) => '54%',
    percentage_9: (userId, groupId, vars) => '60%',
    percentage_10: (userId, groupId, vars) => '66%',
    percentage_11: (userId, groupId, vars) => '73%',
    percentage_12: (userId, groupId, vars) => '78%',
    percentage_13: (userId, groupId, vars) => '84%',
    percentage_14: (userId, groupId, vars) => '92%',
    percentage_15: (userId, groupId, vars) => '93%',
    percentage_16: (userId, groupId, vars) => '94%',
    percentage_17: (userId, groupId, vars) => '96%',
    percentage_18: (userId, groupId, vars) => '98,3%',
    percentage_19: (userId, groupId, vars) => '99,7%',
    percentage_20: (userId, groupId, vars) => '99,9%',
    percentage_21: (userId, groupId, vars) => '1%',
    percentage_22: (userId, groupId, vars) => '2,9%',
    percentage_23: (userId, groupId, vars) => '0%',
    percentage_24: (userId, groupId, vars) => '0,4%',
    
    // Tipi di persona
    person_type_1: (userId, groupId, vars) => 'Da picchiare',
    person_type_2: (userId, groupId, vars) => 'Arrogante',
    person_type_3: (userId, groupId, vars) => 'Tirchio',
    person_type_4: (userId, groupId, vars) => 'Coglione',
    person_type_5: (userId, groupId, vars) => 'Gay',
    person_type_6: (userId, groupId, vars) => 'Timido',
    person_type_7: (userId, groupId, vars) => 'Codardo',
    person_type_8: (userId, groupId, vars) => 'Handicappato',
    person_type_9: (userId, groupId, vars) => 'Mongoloide',
    person_type_10: (userId, groupId, vars) => 'Ritardato',
    person_type_11: (userId, groupId, vars) => 'Scemo',
    
    // Sempre
    always_1: (userId, groupId, vars) => 'Pesante',
    always_2: (userId, groupId, vars) => 'A guardare porno',
    always_3: (userId, groupId, vars) => 'A puttane',
    always_4: (userId, groupId, vars) => 'Rompi scatole',
    always_5: (userId, groupId, vars) => 'A eurobet',
    always_6: (userId, groupId, vars) => 'A masturbarsi',
    always_7: (userId, groupId, vars) => 'A Segarsi',
    always_8: (userId, groupId, vars) => 'A pippare',
    always_9: (userId, groupId, vars) => 'Drogato',
    always_10: (userId, groupId, vars) => 'Ubriaco',
    always_11: (userId, groupId, vars) => 'A gigolò',
    
    // Generi
    gender_1: (userId, groupId, vars) => 'Femboy professionista',
    gender_2: (userId, groupId, vars) => 'Lesbica con cintura attrezzi',
    gender_3: (userId, groupId, vars) => 'Etero dubbioso',
    gender_4: (userId, groupId, vars) => 'Boomer digitale',
    gender_5: (userId, groupId, vars) => 'Zoomer vintage',
    gender_6: (userId, groupId, vars) => 'Finto alpha',
    gender_7: (userId, groupId, vars) => 'Influencer vitaminico',
    gender_8: (userId, groupId, vars) => 'TikToker pentito',
    gender_9: (userId, groupId, vars) => 'Binario rotto',
    gender_10: (userId, groupId, vars) => 'Genderfluid caffè',
    gender_11: (userId, groupId, vars) => 'Paninosessuale',
    gender_12: (userId, groupId, vars) => 'PlayStation-dipendente',
    gender_13: (userId, groupId, vars) => 'Netflix-addicted',
    gender_14: (userId, groupId, vars) => 'Simp seriale',
    gender_15: (userId, groupId, vars) => 'Pasta-al-dentista',
    gender_16: (userId, groupId, vars) => 'Wi-Fi sconosciuto',
    gender_17: (userId, groupId, vars) => 'Sesso-si-grazie',
    gender_18: (userId, groupId, vars) => 'Identità smarrita',
    gender_19: (userId, groupId, vars) => 'Pronomi lol/mao',
    gender_20: (userId, groupId, vars) => 'Misterioso come un deodorante',
    gender_21: (userId, groupId, vars) => 'Enigmatica come un profumo',
    gender_22: (userId, groupId, vars) => 'Segreto industriale',
    gender_23: (userId, groupId, vars) => 'Extraterrestre undercover',
    gender_24: (userId, groupId, vars) => 'Frocio fallito',
    gender_25: (userId, groupId, vars) => 'Progamer di pompe',
    gender_26: (userId, groupId, vars) => 'OnlyFans di ricette vegan',
    gender_27: (userId, groupId, vars) => 'Tinder human',
    
    // Traduzioni per i comandi help
    personalita_help: (userId, groupId, vars) => 'Genera una personalità casuale per un nome',
    personality_help: (userId, groupId, vars) => 'Generate a random personality for a name',
    character_help: (userId, groupId, vars) => 'Create a character personality profile',

    zodiaco_usage: (userId, groupId, vars) => `🔮 *Esempio di utilizzo:*\n${vars.example}`,

zodiaco_birthday: (userId, groupId, vars) => `🎂 *${vars.eta} anni* - BUON COMPLEANNO! 🥳`,
zodiaco_age: (userId, groupId, vars) => `📅 *${vars.eta} anni*`,

zodiaco_profile: (userId, groupId, vars) => `
✨ *PROFILO ZODIACALE* ✨

📆 *Data di nascita:* ${vars.nascita}
🔄 *Prossimo compleanno:* ${vars.compleanno}
🧮 *Età attuale:* ${vars.eta}
🌟 *Segno zodiacale:* ${vars.segno}`,

nomeninja_missing: (userId, groupId, vars) => "🚩 Inserisci il tuo nome accanto al comando.",
nomeninja_newsletter: (userId, groupId, vars) => "ChatUnity",

infame_reactions: (userId, groupId, vars) => [
  `🧢 *"Nah, sei pulito"* (ma sotto il ${vars.percent}% sei un po' sospetto...)`,
  `👀 *"Fra, ma sei la pecora nera della chat?"*`,
  `💀 *"Sei il motivo per cui le nonne nascondono il portafoglio"*`,
  `🤡 *"Se l'infamia fosse un TikTok, saresti virale"*`,
  `🚓 *"Polizia locale? No, DITTATORIALE con sto livello"*`,
  `🤑 *"Se rubassi come infami, saresti Jeff Bezos"*`,
  `📸 *"Sei lo screenshot che non dovevi fare"*`,
  `🔥 *"Hai più scheletri nell'armadio che followers"*`
],

infame_admin: (userId, groupId, vars) => "🚨 *SEI L'ADMIN DEGLI SBIRRI!* 🚨",
infame_zone: (userId, groupId, vars) => "😎 *Sei nella zona pericolosa...*",
infame_clean: (userId, groupId, vars) => "🧼 *Pulito... forse.*",

infame_result: (userId, groupId, vars) => `📊 *TEST INFAME-Z* 📊\n\n👤 *Il tuo livello di infame:* **${vars.percent}%**\n${vars.livello}\n\n${vars.reaction}`,

infame_title: (userId, groupId, vars) => "⚠️ Sei stato GIOBATO ⚠️",
infame_body: (userId, groupId, vars) => "Risultati ufficiali (e inappellabili)",


 blasphemy_top_title: (userId, groupId, vars) => `🏆 *Top 10 Bestemmiatori del Gruppo* 🏆`,
    
    blasphemy_top_entry: (userId, groupId, vars) => `${vars.position}. @${vars.user} - ${vars.count} bestemmie`,
    
    blasphemy_no_data: (userId, groupId, vars) => "😇 Nessuno ha bestemmiato in questo gruppo!",
    
    // Traduzioni per i comandi help
    topbestemmie_help: (userId, groupId, vars) => 'Mostra la classifica dei migliori bestemmiatori del gruppo',
    bestemmietop_help: (userId, groupId, vars) => 'Classifica dei bestemmiatori nel gruppo',
    blasphemytop_help: (userId, groupId, vars) => 'Show top blasphemy users in group',
    swearrank_help: (userId, groupId, vars) => 'Display swear word ranking',
    curseleaderboard_help: (userId, groupId, vars) => 'Curse words leaderboard for this group',
    

};
