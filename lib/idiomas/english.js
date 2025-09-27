export default {

  // Sistema generale
  smsAvisoMG: () => "⚠️Attention !",
  smsWait: () => "⏳ Loading...",
  smsError: () => "❌ An error occurred",
  smsSuccess: () => "✅ Operation completed successfully",
  smsProcessing: () => "🔄 Processing in progress....",

  // Comandi generali
  smsOnlyGroup: () => "❌ This command only works in groups!",
  smsOnlyAdmin: () => "❌ Only admins can use this command!",
  smsOnlyOwner: () => "❌ Only the owner can use this command!",
  smsOnlyPremium: () => "💎 This command is only available for premium users!",
  smsInvalidCommand: () => "❌ Invalid command",
  smsNoText: () => "❌ Enter some text",
  smsNoMedia: () => "❌ Send or reply to a media",

  // AI e ChatGPT
  aiNoQuery: () => "⚠️ *Enter a valid request for ChatGPT!*\n\n📌 Examples:\n{prefix}{command} Tell me a joke\n{prefix}{command} Suggest 5 fantasy books\n{prefix}{command} HTML code for a login page",
  aiError: () => "❌ An error occurred while generating the response. Please try again later..",
  aiProcessing: () => "🤖 I'm processing your request...",

  // Sistema benvenuto/addio
  welcomeTitle: () => "✧ WELCOME! ✧",
  goodbyeTitle: () => "✧ BYE! ✧",
  welcomeDefault: (user, group, members) => `*Welcome* @${user} 🎉\n┊ *Group:* ${group}\n╰► *Members:* ${members}`,
  goodbyeDefault: (user, members) => `*Goodbye* @${user} 👋\n┊ Left the group\n╰► *Remaining members:* ${members}`,

  welcomeSetHelp: () => `🎉 *set welcome message*

*Usage:* {command} <message> *Available variables:* • @user - User tag • $name - User name • $group - Group name • $members - Number of members • $number - Phone number • $tag - User tag (alias of @user) *Example:* {command} Hi @user! 👋 Welcome to $group! We're now $members! 🎉 *To restore the default message:* {command} reset`,

  goodbyeSetHelp: () => `👋 *Set farewell message* *Usage:* {command} <message> *Available variables:* • @user - User tag • $name - User name • $group - Group name • $members - Number of members • $number - Phone number • $tag - User tag (alias of @user) *Example:* {command} Goodbye @user! 😢 We'll miss you in $group. We'll stay in $members. *To restore the default message:* {command} reset`,

  welcomeReset: () => "✅ Welcome message reset to default!",
  goodbyeReset: () => "✅ Goodbye message reset to default!",
  welcomeSet: () => "✅ Custom welcome message set!",
  goodbyeSet: () => "✅ Custom goodbye message set!",

  // Sistema lingua
  languageChanged: (params) => `🌍 Language changed to: ${params?.lang === 'it' ? 'Italiano 🇮🇹' : 'English 🇺🇸'}`,
  languageHelp: () => `🌍 *Language Management*\n\n*Available languages:*\n• 🇮🇹 Italian (it)\n• 🇺🇸 English (en)\n\n*Usage:*\n{prefix}language it - Set Italian\n{prefix}language en - Set English\n{prefix}language - Show languages*`,
  currentLanguage: (params) => `🌍 Current language: ${params?.lang === 'it' ? 'Italiano 🇮🇹' : 'English 🇺🇸'}`,
  invalidLanguage: () => "❌ Invalid language. Usa 'it' per italiano o 'en' per inglese.",

  wordleWin: 'Congratulations! You guessed the word in {attempts} tentativi! 🎉',

  // Sistema admin
  adminOnly: () => "👑 Only administrators can use this command!",
  ownerOnly: () => "🔒 Only the bot owner can use this command!",

  // Sistema anti-spam
  antiSpamWarning: () => "⚠️ Don’t spam! Slow down your messages.",
  antiSpamMuted: () => "🔇 You have been muted for spamming.",

  // Sistema file e media
  fileNotFound: () => "📁 File not found",
  fileTooLarge: () => "📁 File too large",
  invalidFormat: () => "📁 Invalid file format",

  // Sistema gruppi
  groupInfoUpdated: () => "ℹ️ Group information updated",
  userPromoted: (user) => `👑 @${user} was promoted to administrator`,
  userDemoted: (user) => `👤 @${user} was removed from administrators`,
  userKicked: (user) => `🚫 @${user} was removed from the group`,

  // Sistema economia (se presente)
  noCoins: () => "💰 You don’t have enough coins!",
  coinsEarned: (amount) => `💰 You earned ${amount} monete!`,

  // Sistema help
  helpMenu: () => `📋 *ChatUnity Bot Help Menu*\n\n🤖 *AI Commands:*\n• {prefix}ia <text> - ChatGPT\n• {prefix}img <text> - Generate images\n\n👥 *Group Commands:*\n• {prefix}welcome - Manage welcome messages\n• {prefix}antilink - Enable/disable antilink\n\n🌍 *Language:*\n• {prefix}lingua <it/en> - Change language\n\n📞 *Support:*\n• {prefix}support - Contact support`,

  // Menu system
  mainMenuTitle: () => '𝑴𝑨𝑰𝑵 𝑴𝑬𝑵𝑼 ',
  adminMenuTitle: () => '𝑴𝑬𝑵𝑼 𝑨𝑫𝑴𝑰𝑵',
  adminCommands: () => '𝑪𝑶𝑴𝑴𝑨𝑵𝑫 𝑨𝑫𝑴𝑰𝑵',
  chooseMenu: () => 'Choose a menu:',
  mainMenuButton: () => '🏠 Main Menu',
  ownerMenuButton: () => '👑 Owner Menu',
  securityMenuButton: () => '🚨 Security Menu',
  groupMenuButton: () => '👥 Group Menu',
  aiMenuButton: () => '🤖 AI Menu',
  promoteCommand: () => 'promote /setadmin',
  demoteCommand: () => 'demote /remove admin',
  warnCommands: () => 'warn / unwarn',
  muteCommands: () => 'mute /unmute',
  setScheduleCommand: () => 'settime',
  setNameCommand: () => 'setname',
  hidetagCommand: () => 'hidetag',
  kickCommand: () => 'kick / ban',
  adminsCommand: () => 'admins',
  tagallCommand: () => 'tagall',
  openCloseCommand: () => 'open / close',
  setWelcomeCommand: () => 'setwelcome',
  setByeCommand: () => 'setbye',
  inactiveCommand: () => 'inactive',
  listNumCommand: () => 'listnum + prefix',
  cleanupCommand: () => 'clear + prefix',
  clearPlayCommand: () => 'clearplay',
  rulesCommand: () => 'rulea/setrules',

  dsCommand: () => 'ds',
  listWarnCommand: () => 'listwarn',
  linkCommand: () => 'link',
  linkQrCommand: () => 'linkqr',
  poweredBy: () => 'ᴘᴏᴡᴇʀᴇᴅ ʙʏ',

  // Menu gruppo
  groupMenuTitle: () => '𝑮𝑹𝑶𝑼𝑷 𝑴𝑬𝑵𝑼',
  memberCommands: () => '𝑪𝑶𝑴𝑴𝑨𝑵𝑫 𝑭𝑶𝑹 𝑴𝑬𝑴𝑩𝑬𝑹𝑺',
  musicAudioSection: () => 'MUSIC & VOCAL',
  infoUtilitySection: () => 'INFORMATION & UTILITIES ',
  imageEditSection: () => 'IMAGES & EDITING',
  pokemonSection: () => 'POKEMON',
  gangSystemSection: () => 'GANG SYSTEM',
  gamesCasinoSection: () => 'GAMES & CASINO',
  economyRankingSection: () => 'ECONOMY & RANKINGS',
  socialInteractionSection: () => 'SOCIAL INTERACTIONS',
  howMuchSection: () => 'HOW MUCH IS IT?',
  personalityTestSection: () => 'PERSONALITY TEST',
  songCommand: () => 'song ',
  audioCommand: () => 'audio',
  videoCommand: () => 'video',
  artistTitleCommand: () => 'artist-title',
  cityCommand: () => 'city',
  textCommand: () => 'test',
  groupCommand: () => 'group',
  repoCommand: () => 'report',
  userCommand: () => 'user',
  topicCommand: () => 'argument',
  checkSiteCommand: () => 'check site',
  photoToStickerCommand: () => 'foto a sticker',
  stickerToPhotoCommand: () => 'sticker a foto',
  improveQualityCommand: () => 'improve photo quality',
  photoCommand: () => 'foto',
  hiddenPhotoCommand: () => 'hidden photo',
  memeCommand: () => 'meme',
  fromStickerCommand: () => 'da sticker',
  blurImageCommand: () => 'blur image',
  comingSoonCommand: () => 'coming soon',
  quantityCommand: () => 'amount',
  headsOrTailsCommand: () => 'heads or tails',
  mathProblemCommand: () => 'math problem ',
  rockPaperScissorsCommand: () => 'rock, paper, scissors ',
  pokemonInfoCommand: () => 'info Pokémon',
  balanceCommand: () => 'balance',
  topUsersCommand: () => 'top user',
  buyUCCommand: () => 'buy UC',
  withdrawUCCommand: () => 'UC bank',
  earnXPCommand: () => 'earn XP',
  proposalCommand: () => 'proposal',
  endRelationshipCommand: () => 'end relationship',
  affinityCommand: () => 'affinity',
  charmCommand: () => 'charm',
  createFightCommand: () => 'create fight',
  truthOrDareCommand: () => 'truh or dare',
  versionLabel: () => '𝑽𝑬𝑹𝑺𝑰𝑶𝑵',
  collabLabel: () => '𝐂𝐎𝐋𝐋𝐀𝐁: 𝐎𝐍𝐄 𝐏𝐈𝐄𝐂𝐄',
  supportLabel: () => '𝐒𝐔𝐏𝐏𝐎𝐑𝐓',

  // Menu owner
  ownerMenuTitle: () => '𝑶𝑾𝑵𝑬𝑹 𝑴𝑬𝑵𝑼',
  ownerReservedCommands: () => '𝑶𝑾𝑵𝑬𝑹 𝑹𝑹𝑺𝑬𝑹𝑽𝑬𝑫 𝑪𝑶𝑴𝑴𝑨𝑵𝑫',
  setNameCommand: () => 'setname',
  resetNameCommand: () => 'resetname',
  manageCommand: () => 'manage',
  setGroupsCommand: () => 'setgroups',
  addGroupsCommand: () => 'addgroups',
  resetGroupsCommand: () => 'resetgroups',
  setPpCommand: () => 'setpp' ,
  banUserCommand: () => 'banuser',
  unbanUserCommand: () => 'unbanuser',
  blockUserCommand: () => 'blockuser',
  unblockUserCommand: () => 'unblockuser',
  getFileCommand: () => 'getfile',
  saveCommand: () => 'save',
  dpCommand: () => 'dp',
  getPluginCommand: () => 'getplugin',
  joinCommand: () => 'join',
  outCommand: () => 'out',
  prefixCommand: () => 'prefix',
  resetPrefixCommand: () => 'resetprefix',
  godModeCommand: () => 'godmode',
  resetCommand: () => 'reset',
  addCommand: () => 'add',
  removeCommand: () => 'remove',
  everyGroupCommand: () => 'everygroup',
  banChatCommand: () => 'banchat',
  unbanChatCommand: () => 'unbanchat',
  restartCommand: () => 'restart',
  shutdownBotCommand: () => 'shutdown',
  updateBotCommand: () => 'updatebot',
  imageParam: () => 'image',
  pluginParam: () => 'plugin',
  linkParam: () => 'link',
  autoAdminParam: () => 'autoadmin',
  numMessagesParam: () => 'num. message',
  commandParam: () => 'command',
  groupParam: () => 'group',

  // Menu AI
  aiMenuTitle: () => '𝑨𝑰 𝑴𝑬𝑵𝑼',
  generalCommands: () => '𝑮𝑬𝑵𝑬𝑹𝑨𝑳 𝑪𝑶𝑴𝑴𝑨𝑵𝑫',
  iaCommand: () => 'ia',
  alyaCommand: () => 'Alya',
  geminiCommand: () => 'gemini',
  chatgptCommand: () => 'chatgpt',
  deepseekCommand: () => 'deepseek',
  voiceCommand: () => 'voice',
  imageCommand: () => 'image1',
  image2Command: () => 'image2',
  image3Command: () => 'image3',
  animalInfoCommand: () => 'animalinfo',
  kcalCommand: () => 'kcal',
  summaryCommand: () => 'summary',
  recipeCommand: () => 'recipe',

  // Security Menu
  securityMenuTitle: () => '𝑺𝑬𝑪𝑼𝑹𝑰𝑻𝒀 𝑴𝑬𝑵𝑼',
  activateDisable: () => '𝑨𝑪𝑻𝑰𝑽𝑨/𝑫𝑰𝑺𝑨𝑩𝑳𝑬',
  howToUse: () => '𝑯𝑶𝑾 𝑻𝑶 𝑼𝑺𝑬  ',
  activateFunction: () => 'activate [function]',
  disableFunction: () => 'disable [function]',

  // AI DeepSeek
  deepseekNoText: () => '*Enter text to talk to DeepSeek AI.*',
  deepseekNoResponse: () => '❌ No valid response was obtained from DeepSeek AI.',
  deepseekError: () => '*❌ Error processing request.*',

  // AI Gemini
  geminiNoText: () => 'What do you want?',
  geminiNoResponse: () => 'I didn t receive a valid response from the API. Please try again later.',
  geminiError: () => 'An error occurred. Please try again later.',
  geminiConsoleError: () => 'Error in command',

  // AI Riassunto
  summaryUsage: () => '❗ Use the command like this:\n<command> <long text>\nOr reply to a long message with the command',
  summaryTooLong: () => '❌ The text is too long. Maximum limit: 2500 characters.',
  summaryEmptyResponse: () => 'Empty response from the API.',
  summaryTitle: () => 'summary',
  summaryConsoleError: () => '[❌ plugin error summary]',
  summaryError: () => '⚠️ An error occurred while generating the summary. Please try again later.',

  // AI Shazam
  shazamFileTooLarge: () => '╯⊱⚠️⊱ *WARNING | WARNING* ⊱⚠️⊱╮\n\nThe file you uploaded is too large; we recommend cutting it into a smaller fragment. 10-20 seconds of audio is sufficient for identification.',
  shazamSearchResult: () => 'SEARCH RESULT',
  shazamTitle: () => 'TITLE',
  shazamArtist: () => 'ARTIST',
  shazamAlbum: () => 'ALBUM',
  shazamGenre: () => 'TYPE',
  shazamReleaseDate: () => 'PUBLICATION DATE',
  shazamNotFound: () => 'Not found',
  shazamWrongUsage: () => '╯⊱❗️⊱ *INCORRECT USE* ⊱❗️⊱╮\n\nREPLY TO AN AUDIO OR VIDEO',

  // AI Support
  supportGreeting: () => 'Hi! I m the AI assistant of chatunity-bot. How can I help you today??',
  supportNoResponse: () => 'I didn t receive a valid response from the API. Please try again later.',
  supportError: () => 'An error occurred. Please try again later..',
  supportConsoleError: () => 'Error in command',

  // AI Voice
  voiceFFmpegError: () => 'ffmpeg not found or audio processing error. Make sure ffmpeg is installed and accessible in your PATH..',
  voiceDefaultResponse: () => 'What the fuck do you want?',
  voiceNoUnderstand: () => 'I didn t understand, can you repeat??',
  voiceInvalidFile: () => 'Error: invalid audio file.',
  voiceError: () => 'Error Unknown. Please try again later.',
  voiceConsoleError: () => 'Error in command',

  // Admin Delete Session
  adminDeleteSessionDirectUse: () => '*🚨 .*',
  adminDeleteSessionEmpty: () => '*❌ 𝐋𝐚 𝐜𝐚𝐫𝐭𝐞𝐥𝐥𝐚 𝐝𝐞𝐥𝐥𝐞 𝐬𝐞𝐬𝐬𝐢𝐨𝐧𝐢 𝐞̀ 𝐯𝐮𝐨𝐭𝐚 o 𝐧𝐨𝐧 𝐞𝐬𝐢𝐬𝐭𝐞.*',
  adminDeleteSessionAlreadyEmpty: () => '❗ 𝐋𝐞 𝐬𝐞𝐬𝐬𝐢𝐨𝐧𝐢 𝐬𝐨𝐧𝐨 𝐯𝐮𝐨𝐭𝐞, 𝐫𝐢𝐩𝐫𝐨𝐯𝐚 𝐭𝐫𝐚 𝐩𝐨𝐜𝐨 𝐧𝐞 𝐡𝐨 𝐛𝐢𝐬𝐨𝐠𝐧𝐨 ‼️',
  adminDeleteSessionSuccess: () => '🔥 𝐒𝐨𝐧𝐨 𝐬𝐭𝐚𝐭𝐢 𝐞𝐥𝐢𝐦𝐢𝐧𝐚𝐭𝐢 ${count} 𝐚𝐫𝐜𝐡𝐢𝐯𝐢 𝐝𝐞𝐥𝐥𝐞 𝐬𝐞𝐬𝐬𝐢𝐨𝐧𝐢! 𝐆𝐫𝐚𝐳𝐢𝐞 𝐩𝐞𝐫 𝐚𝐯𝐞𝐫𝐦𝐢 𝐬𝐯𝐮𝐨𝐭𝐚𝐭𝐨😼',
  adminDeleteSessionError: () => '❌ 𝐄𝐫𝐫𝐨𝐫𝐞 𝐝𝐢 𝐞𝐥𝐢𝐦𝐢𝐧𝐚𝐳𝐢𝐨𝐧𝐞!',

  // Admin Link QR
  adminLinkQRSuccess: () => 'Ecco il QR Code per il link del gruppo!',
  adminLinkQRError: () => 'Error durante la generazione del QR Code:',

  menuFooter: () => 'Choose a menu:',
  menuAdmin: () => '🛡️ Menu Admin',
  menuOwner: () => '👑 Owner Menu',
  menuSecurity: () => '🚨 Security Menu',
  menuGroup: () => '👥 Group Menu',
  menuAI: () => '🤖 AI Menu',

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
  aiImgError: () => '❌ Error durante la generazione dell\'immagine.',
  aiImgSuccess: () => '✅ Immagine generata con successo!',

  // Admin requests
  smsBotNotAdmin: () => 'I must be admin to perform this action.',
  noRequestsToAccept: () => 'There are no requests to accept.',
  requestsAccepted: (count) => `✅ Accepted ${count} requests successfully.`,
  acceptRequestsError: () => 'Error durante l\'accettazione delle richieste.',

  // Messaggi di sistema
  botStarted: () => "🤖 ChatUnity Bot started successfully!",
  botStopped: () => "🤖 ChatUnity Bot stopped",
  connectionLost: () => "📡 Connection lost, reconnecting...",
  connectionRestored: () => "📡 Connection restored!",

networkError: () => "🌐 Network error, please try again later",
serverError: () => "🔧 Server error, please try again later",
unknownError: () => "❓ Unknown error",

confirmAction: () => "❓ Are you sure you want to continue? Reply with 'yes' or 'no'",
actionCancelled: () => "❌ Action cancelled",
actionConfirmed: () => "✅ Action confirmed",

downloadStarted: () => "⬇️ Download started...",
downloadCompleted: () => "✅ Download completed!",
downloadFailed: () => "❌ Download failed",

stickerCreated: () => "🎨 Sticker successfully created!",

pinReplyToMessage: () => "⚠️ Reply to a message to pin it.",
pin1Day: () => "⏳ 1 Day",
pin7Days: () => "⏳ 7 Days",
pin30Days: () => "⏳ 30 Days",
pinChooseDuration: () => "Choose how long you want to pin the message:",
pinNoMessageQueued: () => "❌ No message to pin. Use the pin command by replying to a message first.",
pinError: () => "❌ Error pinning the message.",
unpinReplyToMessage: (params) => `⚠️ Reply to a message to ${params?.action || 'perform the action'}.`,
unpinAction: () => "remove it from pinned messages",
executeAction: () => "perform the action",
commandError: () => "❌ Error executing the command.",

 // Profile picture system
profilePicBotError: () => "🚫 Unable to get the bot profile picture.",
profilePicCaption: () => "📸",
profilePicNotFound: (params) => `@${params?.user || 'user'} does not have a profile picture 🚫`,

// Automatic acceptance of Italian numbers
adminOnlyCommand: () => "*Only admins can use this command*",
botAdminRequired: () => "*The bot must be admin to use this feature*",
italianNumbersDisabled: () => "*❌ Automatic acceptance of Italian numbers disabled*",
italianNumbersEnabled: () => "*✅ Automatic acceptance of Italian numbers enabled*\n\nItalian numbers (39) will be accepted automatically, others rejected",

// Request rejection system
groupOnlyCommand: () => "This command can only be used in groups.",
botAdminRequiredReject: () => "I must be admin to reject requests.",
noRequestsToReject: () => "There are no requests to reject.",
noRequestsWithPrefix: (params) => `No requests with prefix +${params?.prefix || ''}.`,
noRequestsRejected: () => "No requests rejected.",
requestsRejectedSuccess: (params) => `❌ ${params?.count || 0} requests successfully rejected${params?.prefix ? ` with prefix +${params.prefix}` : ""}.`,
rejectRequestsError: () => "Error while rejecting requests.",

// Sport selection system
sportFootball: () => "⚽ Football",
sportBasket: () => "🏀 Basketball",
sportTennis: () => "🎾 Tennis",
sportFormula1: () => "🏎️ Formula 1",
sportMMA: () => "🥊 MMA",
sportCycling: () => "🚴‍♂️ Cycling",
chooseSportMessage: () => "📌 *Choose the sport you want to follow to receive personalized news:*",
chooseSportFooter: () => "💡 You can change it at any time",

// Hidden tag system
tagBy: () => "Tag by",
tagError: () => "Error .tag:",

// Owner file system
fileNameRequired: () => "⚠️ You must specify the name of the file to create. Ex: `.file name.txt`",
fileAlreadyExists: (params) => `⚠️ The file "${params?.fileName || 'file'}" already exists.`,
fileCreationError: (params) => `❌ Error creating the file: ${params?.error || 'unknown error'}`,
fileCreatedSuccess: (params) => `✅ The file "${params?.fileName || 'file'}" was successfully created in the bot folder.`,

// AI Alya system
alyaWhatDoYouWant: () => "What do you want?",
alyaNoValidResponse: () => "No valid response received from the API. Please try again later.",
alyaError: (params) => `An error occurred. Please try again later.\n\n#report ${params?.command || 'command'}\n\n${wm}`,

// Group list system
groupListTitle: (params) => `𝐋𝐈𝐒𝐓 𝐎𝐅 𝐆𝐑𝐎𝐔𝐏𝐒 𝐎𝐅 ${params?.botName || 'Bot'}`,
totalGroups: () => "Total Groups",
nameNotAvailable: () => "Name not available",
notAdmin: () => "Not an admin",
error: () => "Error",

// Group join system
invalidLink: () => "Invalid link!",
joiningGroup: () => "😎 Wait 3 seconds, I am joining the group",
groupJoinGreeting: (params) => `Hello friends of ${params?.groupName || 'group'}\n\nMy commands can be viewed with ${params?.prefix || '.'}menu`,
botAlreadyInGroup: () => "The bot is already in the group",

// Script on/off system
scriptNameRequired: () => "Enter the script name, e.g.: .offscript info",
fileNotFound: () => "File not found.",
scriptAlreadyOff: () => "Script is already turned off.",
scriptTurnedOff: (params) => `Script ${params?.file || 'file'} turned off.`,
scriptTurnedOn: (params) => `Script ${params?.file || 'file'} turned back on.`,

// Server/command system
serverCommandRequired: () => "⚠️ You must specify the command to execute. Ex: `.server ls -la`",
executingCommand: (params) => `🔄 Executing command: "${params?.cmd || 'command'}"`,
executionError: (params) => `❌ Error during execution: ${params?.error || 'unknown error'}`,
output: () => "Output",
errorsWarnings: () => "Errors/Warnings",
commandExecutedNoOutput: () => "✅ Command executed with no output",
outputTruncated: () => "... (output truncated)",

// Zip/backup system
zipUsage: (params) => `⚠️ Use: ${params?.command || 'command'} <archive_name>`,
creatingBackup: () => "🔄 Creating backup in progress...",
backupCreatedSending: (params) => `✅ Backup ${params?.archiveName || 'archive'}.zip created. Sending...`,
compressionError: (params) => `❌ Error during compression: ${params?.error || 'unknown error'}`,

// Antispam system
spamDetectedModifying: () => "Spam detected! Modifying group settings...",
onlyAdminsCanSend: () => "Only admins can send messages.",
userNotFoundOrRemoved: () => "User not found or already removed.",
userIsAdminNotRemoved: () => "The user is an admin and will not be removed.",
allSpamMessagesDeleted: () => "All spam messages have been deleted.",
chatReactivatedForAll: () => "Chat reactivated for all members.",
antispamDetected: () => "*antispam by Origin detected*",
antispamNotificationSent: () => "Antispam notification message sent.",
spamCounterReset: () => "Spam counter for the user reset.",
spamHandlingError: () => "Error handling spam:",
botNotAdminOrRestrictionDisabled: () => "Bot is not an admin or restriction is disabled. Cannot perform the operation.",
spamCounterResetTimeout: () => "Spam counter for the user reset after timeout.",
timeoutExpiredReset: () => "Timeout expired. User's spam counter reset.",
  stickerFailed: () => "❌ Unable to create the sticker",
  
// Music system
musicNotFound: () => "🎵 Music not found",
musicDownloading: () => "🎵 Downloading music...",
musicReady: () => "🎵 Music ready!",

// Egemonia project main text
egemoniaMainText: () => `╭━〔*🌐 EGEMONIA PROJECT*〕━┈⊷
The '*Egemonia*' project was created by the founder of ChatUnity to bring together the greatest private bot developers:

┃◈ • 333bot
┃◈ • BixbyBot
┃◈ • OriginBot
┃◈ • UniversalBot
┃◈ • TurboBot
┃◈ • OnixBot
┃◈ • VareBot

All together to bring ChatUnityBot to global competition, helping with plugin creation/fixes.
Since version 5.0, plugins created by these developers are already available!
╰━━━━━━━━━━━━━━⊷

*Discover more about each bot by clicking the buttons below!*`,

egemoniaFooter: () => 'Powered by ChatUnity Egemonia',

button_333bot: () => "🤖 333bot",
button_bixby: () => "🤖 BixbyBot",
button_origin: () => "🤖 OriginBot",
button_universal: () => "🤖 UniversalBot",
button_turbo: () => "🤖 TurboBot",
button_onix: () => "🤖 OnixBot",
button_varebot: () => "🤖 VareBot",

returnToEgemonia: () => 'Go back with .egemonia',
backButton: () => "🔙 Back to Egemonia",

botInfo_333bot: () => "🤖 *333bot*\nHistoric Italian bot created by Gab 333, famous for modularity, group management, and over 100 active plugins.",
botInfo_bixbybot: () => "🤖 *BixbyBot*\nInnovative and versatile, specialized in automations and smart responses.",
botInfo_originbot: () => "🤖 *OriginBot*\nBot rich in security features and automations, its speed is unbeatable.",
botInfo_universalbot: () => "🤖 *UniversalBot*\nMultipurpose bot, supports many platforms and integrations.",
botInfo_turbobot: () => "🤖 *TurboBot*\nOptimized for performance and management of large groups.",
botInfo_onixbot: () => "🤖 *OnixBot*\nEvery response with a touch of class. Elegance stands out.",
botInfo_varebot: () => "🤖 *VareBot*\nVareBot is a versatile bot full of APIs, designed to provide useful features and fun commands in a simple and fast experience!",

candidatiText: () => `🚀 Do you want to join the ChatUnity staff, gain experience, and be recognized as a staffer?🚀

This is your moment! Fill out the form below (it will remain anonymous) to apply and showcase your skills.
🔥 What awaits you:

• Recognition in the bot as a collaborator
• Direct experience in the world of bots and community management
• Exclusive access to Beta Bots
• Direct collaboration with the ChatUnity team

Don't miss this opportunity, apply now and show that you have what it takes!

> 📋 Application form:
https://docs.google.com/forms/d/e/1FAIpQLSd4no8yx-QuRf7xFyIcLYHLSNkF2cRaHvsO_prmlIwdKqBC4Q/viewform?usp=dialog`,

// Download order text
scaricaOrderText: () => 'DOWNLOAD CHATUNITY-BOT 💬',

// Download instructions
scaricaText: () => `『💬』 ══ •⊰✰⊱• ══ 『💬』

DOWNLOAD CHATUNITY-BOT

Follow these steps to correctly install ChatUnity Bot on Termux

Termux repository https://github.com/chatunitycenter/chatunity-bot

YouTube tutorial https://youtube.com/shorts/qek7wWadhtI?si=MrrA3bLWWAsLmpw6

『💬』 ══ •⊰✰⊱• ══ 『💬』

1. Download and install Termux

Download the correct version of Termux from the following link:

🔗 Download Termux 0.119.1

https://www.mediafire.com/file/0npdmv51pnttps0/com.termux_0.119.1-119_minAPI21(arm64-v8a,armeabi-v7a,x86,x86_64)(nodpi)_apkmirror.com.apk/file

After downloading the APK, install it on your device and grant the required permissions.

『💬』 ══ •⊰✰⊱• ══ 『💬』

2. Configure Termux

Open Termux and run the following command:

termux-setup-storage

Grant the requested permissions when prompted.

『💬』 ══ •⊰✰⊱• ══ 『💬』

3. Install ChatUnity Bot

Now run the following command to update Termux:

apt update -y && yes | apt upgrade && pkg install -y bash wget mpv && wget -O - https://raw.githubusercontent.com/chatunitycenter/chatunity-bot/main/chatunity.sh | bash

『💬』 ══ •⊰✰⊱• ══ 『💬』

4. Launch ChatUnity Bot

After installation, you can start the bot using the command that will be shown at the end of the process.

If you encounter problems, make sure you followed all the steps correctly and check for any error messages in Termux.

『💬』 ══ •⊰✰⊱• ══ 『💬』`,

// Download info
scaricaTitle: () => 'BOT INFO',
scaricaBody: () => 'ChatUnity',
scaricaSource: () => 'https://github.com/chatunitycenter/chatunity-bot',

// Guide text
guidaText: () => `COMMAND GUIDE FOR CHATUNITY-BOT

\`GOOGLE DOCS LINK:\`
https://docs.google.com/document/d/e/2PACX-1vSgfwbRZrQM2W-3tctvqX7_0eAF-FvU3K_SK8txRfGkNzJjziAIVV8G2EIMg4Ju03TlGIzMKaicjWTH/pub`,

// Newsletter name
newsletterName: () => 'ChatUnity Bot',

// Official channels
canaliText: () => `╭━〔 *🌐 OFFICIAL CHANNELS* 〕━┈⊷
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

*Join our channels to stay updated, get support, and discover all the news!*

💎 _Powered by ChatUnity_`,

canaliFooter: () => 'Choose a channel and join!',
diskSpaceError: () => '✧ Error retrieving disk space:',

// System status
systemStatusText: (params) => `✅️ *SYSTEM STATUS*

🚩 *Host ⪼* ${params?.nomeHost || 'N/A'}
🏆 *Platform ⪼* ${params?.piattaforma || 'N/A'}
💫 *Architecture ⪼* ${params?.architettura || 'N/A'}
🥷 *Total RAM ⪼* ${params?.memoriaTotale || 'N/A'}
🚀 *Free RAM ⪼* ${params?.memoriaLibera || 'N/A'}
⌛️ *Used RAM ⪼* ${params?.memoriaUsata || 'N/A'}
🕒 *Uptime ⪼* ${params?.tempoAttivo || 'N/A'}

🪴 *Node.js Memory Usage:* 
→ RSS: ${params?.rss || 'N/A'}
→ Total Heap: ${params?.heapTotal || 'N/A'}
→ Used Heap: ${params?.heapUsed || 'N/A'}
→ External Memory: ${params?.external || 'N/A'}
→ Array Buffer: ${params?.arrayBuffers || 'N/A'}

☁️ *Disk Space:*
→ Total Size: ${params?.dimensioneDisco || 'N/A'}
→ Used: ${params?.usatoDisco || 'N/A'}
→ Available: ${params?.disponibileDisco || 'N/A'}
→ Usage Percentage: ${params?.percentualeDisco || 'N/A'}`,

notAvailable: () => 'Not available',

newsletterName: (params) => `${params?.botName || 'ChatUnity'}`,

terminiText: (params) => `╭━━〔 *📜 TERMS OF USE & PRIVACY* 〕━━╮
┃
┃ *All information here does not exempt the bot owner and accredited Owners from the use of ${params?.botName || 'ChatUnity'}.*
┃ _We are not responsible for any ignorance you may have regarding this information._
┃
┣━━━〔 🔒 *PRIVACY TERMS* 〕━━━┫
┃ • We are aware of your continuous use of the Bot and guarantee that information such as (images, videos, links, location, audio, stickers, gifs, contacts) you provide to official numbers will not be shared with anyone, nor used outside the Bot environment.
┃ • What you do with the Bot is your responsibility, as chats on official numbers are deleted every 24 hours according to WhatsApp's temporary messages.
┃ • The Bot may not be active 24/7 on official numbers, but this does not imply it is inactive or that unofficial owners cannot operate it.
┃ • The anonymous chat from the *#start* command, as the name suggests, will not show any user data from ${params?.botName || 'ChatUnity'}. This does not imply that people using this feature may share their data on official numbers.
┃ • The data that ${params?.botName || 'ChatUnity'} obtains from official user accounts, groups, and their settings may be reinitialized, modified, and/or rectified to ensure the Bot is in optimal condition for use. (Users can request compensation via Instagram or using the *#Reporte* command with proof).
┃ • We are NOT responsible for alterations of this Bot by unofficial numbers, using a GitHub repository that does not match the official one, or implementing third-party integrations that compromise users using unofficial versions.
┃ • The *Sub Bot* feature ensures the security of your data applied to official accounts.
┃
┣━━━〔 ⚠️ *TERMS OF USE* 〕━━━┫
┃ • The information present in this Bot and your use of it implies that you are aware of the Terms and Conditions, so there are no issues in using the Bot functions.
┃ • The Bot contains material that may only be visible to people over 18 years old. We are NOT responsible if you do not meet the minimum age to use adult material.
┃ • Images, videos, and audios present in this Bot are public use, but it is considered disrespectful to modify existing material that displays the Bot name or relevant information.
┃ • When requesting to join a group with an official account, it is recommended that the group does not contain hate themes, viruses, inappropriate content, discrimination, or unfounded campaigns.
┃ • If you receive official communication from an official number, remain respectful. Similarly, if you receive a message without using a command, remain respectful, as it may be a real person.
┃ • Official accounts of ${params?.botName || 'ChatUnity'} are not responsible for the use you make of the "Sub Bot" function.
┃
┣━━━〔 📌 *CONDITIONS OF USE* 〕━━━┫
┃ • DO NOT call or video call the Bot from official numbers, as this interferes with the Bot's operation.
┃ • DO NOT use the Bot from official numbers to perform hostile actions that could compromise the Bot's functionality.
┃ • DO NOT repeatedly use the SPAM command, as it may cause the Bot to malfunction. Also, do not send messages to the Bot that could compromise its operation.
┃ • When using certain commands intended to cause discomfort, annoyance, disturbance, or similar effects, the corresponding penalties or warnings will be applied to preserve the integrity of the users and the functionality of chatunity-bot.
┃
┣━━━〔 🌐 *OFFICIAL REPOSITORY* 〕━━━┫
┃ https://github.com/chatunitycenter/chatunity-bot
┃
┣━━━〔 💰 *DONATIONS* 〕━━━┫
┃ *DONATE TO THE CREATOR VIA THIS OFFICIAL ACCOUNT*
┃ ~ _If you appreciate and value the work I have done, you can help me with a donation to continue this project._
┃ *https://paypal.me/chatunity*
┃
┃ *~ Thank you for taking the time to learn about chatunity-bot*`,

defaultBotName: () => '𝐂𝐡𝐚𝐭𝐔𝐧𝐢𝐭𝐲',
unknownModel: () => 'Unknown Model',

pingText: (params) => `╭━〔🚀𝑺𝑻𝑨𝑻𝐔𝐒 𝑺𝒀𝑺𝑻𝑬𝑴🚀〕━┈⊷
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
pingBody: (params) => `Version: ${params?.versioneBot || 'N/A'}`,

thumbnailError: () => 'Error retrieving thumbnail:',
sendMessageError: () => 'Error sending message:',
profilePictureError: () => 'Error retrieving profile picture:',
fetchError: () => 'Failed to fetch thumbnail',
thumbnailFetchError: () => 'Error fetching thumbnail:',

reportNoText: () => '⚠ *Enter the command you want to report.*',
reportTooShort: () => '⚠️ *Describe the problem better (minimum 10 characters).*',
reportTooLong: () => '⚠️ *Maximum length allowed: 1000 characters.*',

reportFormat: (params) => `*❌️ \`R E P O R T\` ❌️*

📱 Number:
• Wa.me/${params?.sender || 'N/A'}

👤 User: 
• ${params?.pushName || 'Anonimo'}

📝 Messaggio:
• ${params?.text || 'N/A'}`,

    anonymous: () => 'Anonimo',
    quotedMessage: () => '📎 Citazione:\n',

    reportAdTitle: () => '⚠️ SEGNALAZIONE BUG ⚠️',
    reportAdBody: () => 'Nuova segnalazione ricevuta',

    reportSuccess: () => '✅ *La tua segnalazione è stata inviata allo sviluppatore.*\n_⚠ Segnalazioni false possono comportare restrizioni._',
    reportError: () => 'Error nella segnalazione:',

        proposalNoText: () => '⚠️ *Inserisci il comando che vuoi proporre. es: .consiglia (comando) (spiegazione)*',
    proposalTooShort: () => '⚠️ *Descrivi meglio il comando (minimo 10 caratteri).*',
    proposalTooLong: () => '⚠️ *Lunghezza massima consentita: 1000 caratteri.*',

    proposalFormat: (params) => `* \`P R O P O S T A\` *

📱 Numero:
• Wa.me/${params?.sender || 'N/A'}

👤 User: 
• ${params?.pushName || 'Anonymous'}

📝 Message:
• ${params?.text || 'N/A'}`,

anonymous: () => 'Anonymous',
quotedMessage: () => '📎 Quoted:\n',

reportAdTitle: () => '⚠️ BUG REPORT ⚠️',
reportAdBody: () => 'New report received',

reportSuccess: () => '✅ *Your report has been sent to the developer.*\n_⚠ False reports may result in restrictions._',
reportError: () => 'Error sending report:',

proposalNoText: () => '⚠️ *Enter the command you want to propose. e.g.: .suggest (command) (explanation)*',
proposalTooShort: () => '⚠️ *Describe the command better (minimum 10 characters).*',
proposalTooLong: () => '⚠️ *Maximum length allowed: 1000 characters.*',

proposalFormat: (params) => `* \`P R O P O S A L\` *

📱 Number:
• Wa.me/${params?.sender || 'N/A'}

👤 User: 
• ${params?.pushName || 'Anonymous'}

📝 Message:
• ${params?.text || 'N/A'}`,

proposalAdTitle: () => '⚠️ COMMAND PROPOSAL ⚠️',
proposalAdBody: () => 'New proposal received',

proposalSuccess: () => '✅ *Your proposal has been sent to the developer.*\n_⚠ Illegal commands may result in restrictions._',
proposalError: () => 'Error in proposal:',

newsText: () => `*RELEASE V6.1*\n\n`
              + `📅 *Date:* 18/08 \n`
              + `🆕 *Main Updates:*\n`
              + `• New social command\n`
              + `• Optimized console logs\n`
              + `• Optimized update\n`
              + `• New dox interface\n`
              + `• New staffers: giusemd & anubi\n`
              + `• *Security management transferred to DEATH:*\n`
              + `  - New security features\n`
              + `  - Complete project restructuring\n`
              + `• Preparing for V7.0 with new features\n\n`,

warnNoMention: () => "❌ You must mention a user or reply to their message.",
warnBot: () => "🚫 You cannot warn the bot.",
warnUserNotFound: () => "❌ User not found in the database.",

warnMessage: (params) => `⚠️ W A R N I N G ${params?.current || 0}/𝟑 (𝟑 𝐰𝐚𝐫𝐧 = 𝐛𝐚𝐧)`,
warnBanMessage: () => `⛔ USER REMOVED AFTER 3 WARNINGS (They were being disruptive)`,

delwarnMessage: (params) => `✅ Warning removed\nRemaining warnings: ${params?.remaining || 0}`,

newsletterName: (params) => `${params?.botName || 'ChatUnity'}`,
defaultBotName: () => '𝐂𝐡𝐚𝐭𝐔𝐧𝐢𝐭𝐲',

formatNotSupported: () => '╭━━〔 ❗ 〕━━┈⊷\n┃◈ *Unsupported format*\n╰━━━━━━━━━━┈·๏',
detailsError: () => '╭━━〔 ❗ 〕━━┈⊷\n┃◈ *Error retrieving details*\n╰━━━━━━━━━━┈·๏',
downloadErrorLog: () => 'Error during download:',
downloadError: () => '╭━━〔 ❗ 〕━━┈⊷\n┃◈ *Error during download*\n╰━━━━━━━━━━┈·๏',
progressErrorLog: () => 'Error during progress check:',
progressError: () => '╭━━〔 ❗ 〕━━┈⊷\n┃◈ *Error checking progress*\n╰━━━━━━━━━━┈·๏',

noInputText: () => '╭━━〔 ❗ 〕━━┈⊷\n┃◈ *Enter a title or a link*\n╰━━━━━━━━━━┈·๏',
noResults: () => '╭━━〔 ❗ 〕━━┈⊷\n┃◈ *No results found*\n╰━━━━━━━━━━┈·๏',
audioComing: () => '🎵 Audio incoming, please wait a moment...',
videoComing: () => '🎬 Video incoming, please wait a moment...',
downloadComplete: () => '✅ *Download completed!*',
noValidLink: () => '╭━━〔 ❗ 〕━━┈⊷\n┃◈ *No valid link found*\n╰━━━━━━━━━━┈·๏',

videoTooLong: (params) => `╭━━〔 ❗ 〕━━┈⊷\n┃◈ *Video too long!*\n┃◈ Maximum allowed duration is 5 minutes\n┃◈ Current duration: ${params?.timestamp || 'N/A'}\n╰━━━━━━━━━━┈·๏`,

videoInfo: (params) => `╭〔*🎥 VIDEO INFO*〕┈⊷
┃◈╭─────────·๏
┃◈┃• ✍️ Title: ${params?.title || 'N/A'}
┃◈┃• ⏳ Duration: ${params?.timestamp || 'N/A'}
┃◈┃• 👀 Views: ${params?.views || 'N/A'}
┃◈┃• 🔰 Channel: ${params?.author || 'Unknown'}
┃◈┃• 🔳 Published: ${params?.ago || 'N/A'}
┃◈┃• 🔗 Link: ${params?.url || 'N/A'}
┃◈└───────┈⊷
╰━━━━━━━━━┈·๏`,

unknownAuthor: () => 'Unknown',
chooseFormat: () => 'Choose a format:',
buttonAudio: () => '🎵 Download Audio',
buttonVideo: () => '🎬 Download Video',
buttonSave: () => '💾 Save to Playlist',

genericError: (params) => `╭━━〔 ❗ 〕━━┈⊷\n┃◈ *Error:* ${params?.error || 'Unknown error'}\n╰━━━━━━━━━━┈·๏`,

newsletterName: () => 'ChatUnity',

// General errors and messages
specifySong: () => 'Specify a song to search for',
noResults: () => 'No results found',
songExists: (params) => `Song already in playlist! Use ${params.prefix}playlist to view saved tracks.`,
emptyPlaylist: (params) => params.userName ? `${params.userName} has no saved songs` : 'Your playlist is empty!',
invalidNumber: () => 'Invalid number!',
errorOccurred: (params) => `Error: ${params.error}`,

// Song formatting
songFormat: (params) => `🎵 *${params.title}*\n⏳ ${params.timestamp} | 📺 ${params.author}`,
notAvailable: () => 'N/A',
unknownAuthor: () => 'Unknown',

// Status messages
searching: (params) => `Searching for "${params.query}"...`,
songSaved: () => '*Song saved!*',
songDeleted: () => '*Song deleted!*',

// Playlist texts
yourPlaylist: () => 'Your Playlist',
userPlaylist: (params) => `Playlist of ${params.userName}`,
moreSongs: (params) => `...and ${params.count} more songs`,

// Buttons and interactions
selectSong: () => 'Select a song to play',
selectDelete: () => '*Select a song to delete*',
deleteUsage: (params) => `Use: ${params.prefix}delete <number>`,

// Button texts
saveNew: () => 'Save New',
viewPlaylist: () => 'View Playlist',
play: () => 'Play',
delete: () => 'Delete',
back: () => 'Back',
restore: () => 'Restore',
user: () => 'User',

lyricsNoInput: () => '✧ Enter the song name in the format:\n*artist - title* or *artist title*',
lyricsInvalidFormat: () => '✧ Invalid format. Use:\n*artist - title* or *artist title*',
lyricsMissingInfo: () => '✧ Specify both artist and title in the format:\n*artist - title* or *artist title*',
lyricsNotFound: () => 'Lyrics not found',
lyricsError: () => '✧ Lyrics not found. Try:\n- A different format (artist - title)\n- Check spelling\n- Try another source if this one fails',

weatherNoCity: () => '❗ Enter a city name. Usage: .weather [city name]',
weatherCityNotFound: () => '🚫 City not found. Check the spelling and try again.',
weatherError: () => '⚠ An error occurred while retrieving weather information. Please try again later.',

weatherInfo: (params) => `
> 🌍 Weather Info for ${params.city}, ${params.country} 🌍
> 🌡 Temperature: ${params.temp}°C
> 🌡 Feels Like: ${params.feelsLike}°C
> 🌡 Min: ${params.tempMin}°C
> 🌡 Max: ${params.tempMax}°C
> 💧 Humidity: ${params.humidity}%
> ☁ Weather: ${params.weatherMain}
> 🌫 Description: ${params.weatherDesc}
> 💨 Wind: ${params.windSpeed} m/s
> 🔽 Pressure: ${params.pressure} hPa

> © Powered By ChatUnity
`.trim(),

translateUsage: () => `*🌍 Usage of .translate command 🌍*\n📌 Format: *.translate <text> <language>*\n📖 Example: *.translate hello japanese*\n\n🌐 *Supported Languages:* 🌐\n\n`,

languageEntry: (params) => `🔹 ${params?.name || 'N/A'} = \`${params?.code || 'N/A'}\`\n`,

translateSyntax: () => `⚠️ Correct usage: *.translate <text> <language>*\n📖 Example: *.translate hello chinese*`,

languageNotFound: () => `❌ Language not recognized. Use *.translate* to see the list of available languages.`,

noTranslation: () => `No translation found.`,

translationResult: (params) => `🌍 *Translation:* 🌍\n📌 *Original Text:* ${params?.text || 'N/A'}\n📖 *Target Language:* ${params?.langInput || 'N/A'} (${params?.targetLang || 'N/A'})\n\n🔹 *Result:* ${params?.translatedText || 'N/A'}`,

translationErrorLog: () => `Error during translation:`,
translationError: () => `❌ Error during translation. Check the parameters and try again.`,

timezoneTitle: () => 'Timezone:',
currentZone: () => 'Current Zone',

countNoText: () => '> ⓘ Provide text to count.',
countSpecialChars: () => '> ⚠️ The entered text contains special characters.',

countResult: (params) => {
  if (params.hasNumbers) {
    return ` ⓘ The entered text contains ${params.wordCount} words and ${params.numberCount} numbers`;
  } else {
    return ` ⓘ The entered text contains ${params.wordCount} words.`;
  }
},

// Help messages
infoSetAgeHelp: () => 'To set your age use the command .setage <age>\nTo remove your age use .removeage',
infoSetIgHelp: () => 'Specify an Instagram username with .setig <user> or use .delig to remove it.',
infoGroupOnly: () => '❌ This command can only be used in groups.',

// Grades and roles
grade1: () => "Beginner I 😐", grade2: () => "Beginner II 😐",
grade3: () => "Recruit I 🙂", grade4: () => "Recruit II 🙂",
grade5: () => "Advanced I 🫡", grade6: () => "Advanced II 🫡",
grade7: () => "Bomber I 😎", grade8: () => "Bomber II 😎",
grade9: () => "Pro I 😤", grade10: () => "Pro II 😤",
grade11: () => "Elite I 🤩", grade12: () => "Elite II 🤩",
  grade13: () => "Master I 💪🏼", grade14: () => "Master II 💪🏼",
  grade15: () => "Mythic I 🔥", grade16: () => "Mythic II 🔥",
  grade17: () => "Hero I 🎖", grade18: () => "Hero II 🎖",
  grade19: () => "Champion I 🏆", grade20: () => "Champion II 🏆",
  grade21: () => "Overlord I 🥶", grade22: () => "Overlord II 🥶",
  grade23: () => "Stellar I 💫", grade24: () => "Stellar II 💫",
  grade25: () => "Cosmic I 🔮", grade26: () => "Cosmic II 🔮",
  grade27: () => "Titan I 😈", grade28: () => "Titan II 😈",
  gradeMax: () => "Eclipsian ❤️‍🔥",

  roleFounder: () => 'Founder ⚜️',
  roleAdmin: () => 'Admin 👑',
  roleMember: () => 'Member 🤍',

  // Genders
  genderMale: () => '🚹',
  genderFemale: () => '🚺',
  genderNotSet: () => 'Not set',

  // Main text
  infoText: (params) => `꧁════ ☾︎•✮•☽︎ ════꧂\n` +
    ` 📝 Messages: ${params.messages}\n` +
    ` ⚠️ Warn: ${params.warn} / 4\n` +
    ` 🟣 Role: ${params.role}\n` + 
    ` 🗓️ Age: ${params.age}\n` +  
    ` 🚻 Gender: ${params.gender}\n` +
    ` 🤬 Swears: ${params.blasphemy}\n` +
    ` 🌐 Instagram: ${params.instagram}\n` +
    '> thanks dad Riad\n' +
    `꧁════ ☾︎•✮•☽︎ ════꧂`,

  // Other texts
  years: () => "years",
  notSet: () => "Not set",
  instagramNotSet: () => "not set",
  unknown: () => "Unknown",
  creationBy: () => "creation by Onix🌟",
  buttonSetAge: () => '🗓️ Set Age',
  buttonSetMale: () => '🚹 Set Male Gender',
  buttonSetFemale: () => '🚺 Set Female Gender',
  buttonSetIg: () => '🌐 Set IG',
  footerSetData: () => 'Set your personal data:',
  noRulesSet: (params) => `ⓘ Group admins haven't set any rules yet.\n\n📌 To set rules, use *${params.prefix}setrules* followed by the rule text.`,
  rulesMessage: (params) => `📜 *Group Rules*\n\n${params.rules}`,

  checkscamNoSite: () => "❌ *You must enter a site to check!*\n📌 _Example:_ *.checkscam www.site.com*",

  checkscamResult: (params) => `🔍 *Site Analysis:*\n🌐 *Domain:* ${params.site}\n\n` +
    (params.isScam ? "⚠️ *SCAM RISK!* ❌" : "✅ *Safe Site!*") +
    `\n\n🔗 *Check also on:* [ScamAdviser](${params.scamUrl})`,

  checkscamError: () => "❌ *Error checking the site! Try again later.*",

  dashboardTitle: (params) => `Dashboard *${params.botName}*\n\n${params.content}`,

  dashboardEntry: (params) => `(${params.index})\n📚 • *_Command :_* *${params.name}*\n🗂 • *_Used :_* *${params.total}x*\n⛾ • *_Last Used :_* *${params.lastUsed}*`,

  timeDaysAgo: (params) => `${params.days} days ago`,
  timeHoursAgo: (params) => `${params.hours} hours ago`,
  timeMinutesAgo: (params) => `${params.minutes} minutes ago`,
  timeSecondsAgo: () => `a second ago`,

  imageSearchHelp: (params) => `🔍 *IMAGE SEARCH*\n\nUsage: ${params.prefix}${params.command} <search term>\n\nExample: ${params.prefix}${params.command} cute cat`,

  imageSearchBanned: () => '❌ Search term not allowed. Use appropriate terms.',

  imageSearchNoResults: () => '❌ No images found for the specified search.',

  imageSearchError: () => '❌ Error retrieving the image.',

  imageSearchResult: (params) => `🔍 *Search Result:* ${params.searchTerm}\n\n📷 Source: Google Images`,

  imageSearchNetworkError: () => '❌ Network error. Try again later.',

  smsWait: () => '🔍 Searching for images...',
  smsError: () => '❌ An error occurred during the search.',

  repoInfo: (params) => `『💬』 ══ •⊰✰⊱• ══ 『💬』\n` +
                         `✧ Name: ${params?.name || 'N/A'}\n` +
                         `✧ Link: ${params?.url || 'N/A'}\n` +
                         `✦ Size: ${params?.size || 'N/A'} MB\n` +
                         `✧ Updated: ${params?.updatedAt || 'N/A'}\n` +
                         `✧ Watchers: ${params?.watchers || 'N/A'}\n` +
                         `『💬』 ══ •⊰✰⊱• ══ 『💬』\n` +
                         `✧ Forks: ${params?.forks || 'N/A'} · Stars: ${params?.stars || 'N/A'} · Issues: ${params?.issues || 'N/A'}\n` +
                         `『💬』 ══ •⊰✰⊱• ══ 『💬』\n`,

  newsletterName: () => 'ChatUnity',

  sendErrorLog: () => 'Error while sending the message:',
  sendError: () => 'Error while executing the command.',

  obfuscateNoCode: () => '⚠️ *Insert the JavaScript code to obfuscate or reply to a message containing it!*',

  obfuscateError: () => '❌ *Error during obfuscation!*\n\nMake sure you entered valid JavaScript code.',
  newsHeader: () => '📰 *NEWS* 📰',

  newsArticle: (params) => `*${params.index}.* ${params.title}\n` +
    (params.description ? `📝 ${params.description}\n` : '') +
    (params.link ? `🔗 ${params.link}\n` : '') +
    `📰 *Source:* ${params.source}`,

  newsNoResults: () => '❌ No news found at the moment. Try again later.',

  newsError: () => '❌ Error retrieving news. Try again later.',

  // Existing variables reused:
  smsWait: () => '🔍 Searching for news...',
  smsError: () => '❌ An error occurred during the search.',

  buyPokemonUsage: () => `❌ Usage: .buypokemon <base|imperium|premium> <quantity>\nExample: .buypokemon base 3`,

  insufficientCoins: (params) => `❌ You need *${params?.totalCost || 0}* UnityCoins to purchase ${params?.quantity || 0} ${params?.type || 'N/A'} packs.\n💰 Current balance: ${params?.currentBalance || 0}`,

  purchaseSuccess: (params) => `✅ You bought *${params?.quantity || 0}* ${params?.type || 'N/A'} packs!\n📦 Total now: ${params?.totalPacks || 0}\n💸 Remaining UnityCoins: ${params?.remainingCoins || 0}`,

  noCollectorsFound: () => '😢 No collectors found.',
  leaderboardTitle: () => '🏆 *Top 10 Pokémon Collectors*:\n\n',
  leaderboardEntry: (params) => `${params.position}. ${params.name} - ${params.count} cards`,

  // Rarity
  rarityCommon: () => 'Common',
  rarityUncommon: () => 'Uncommon',
  rarityRare: () => 'Rare',
  rarityLegendary: () => 'Legendary',
  rarityMysterious: () => 'Mysterious',

  // API Errors
  apiError: (params) => `API Error: ${params.status} ${params.statusText}`,
  fetchError: (params) => `Fetch API Error: ${params.error}`,
  unknownType: () => '???',
  unknownHP: () => '???',

  // Darkness Animation
  darknessAnimation1: () => '🌑...',
  darknessAnimation2: () => '🌑🌑...',
  darknessAnimation3: () => '🌑🌑🌑 *???*',
  darknessAnimation4: () => '🌑🌑🌑 *A dark presence manifests...*',
  darknessAnimation5: (params) => `✨🌑 *${params.name}* emerges from the shadows!`,
  darknessCardCaption: (params) => `🌑 *${params.name}* (${params.rarity})\n🔰 Type: ${params.type} | Lvl: ${params.level}${params.shiny}`,

  // Main Messages
  invalidPackType: (params) => `❌ Specify a valid pack type: *base*, *imperium*, *premium*, or *darkness*.\n\nExample: *${params.prefix}openpokemon base*`,
  noPacksAvailable: (params) => `⛔ You don't have any *${params.packType}* packs. Use or find one.`,
  openingPack: () => '🎁 Opening the pack...',
  revealingCards: () => '✨ Revealing the cards...',
  noCardsFound: () => '😢 No cards found. Try again.',

  // Pity System
  pitySystemTriggered: () => '🕯️ *The dark power has answered after a long wait...*\n🔄 _Pity system_ activated after 15 packs without Darkness.',

  // Pack Opening Result
  packOpenedResult: (params) => `🎉 You opened a *${params.packType}* pack and found:\n\n` +
    `✨ *${params.name}* (${params.rarity})${params.shiny}\n` +
    `🔰 Type: ${params.type} | Lvl: ${params.level}\n\n` +
    `📦 Packs remaining: *${params.remaining}* ${params.packTypeLower}`,

  shinyLabel: () => ' ✨ Shiny',
  checkPityButton: () => '📊 Check Pity',

  myPacksMessage: (params) => `
📂 YOUR PACKS

• 📦 Base: ${params.base}
• 👑 Imperium: ${params.imperium}
• 🌌 Premium: ${params.premium}
• 🌑 Darkness: ${params.darkness}

🎁 Use the buttons to open a pack right now!
`.trim(),

  openBaseButton: () => '📦 Open Base',
  openImperiumButton: () => '👑 Open Imperium',
  openPremiumButton: () => '🌌 Open Premium',
  openDarknessButton: () => '🌑 Open Darkness',
  buyPacksButton: () => '➕ Buy Packs',
 packsFooter: () => '✨ Collect rare cards and build your team!',

battleTagUser: () => '⚔️ Tag a user to battle!\n\nExample: *.battle @user*',
battleNoPokemonSelf: () => '😓 You have no Pokémon to battle!',
battleNoPokemonOpponent: () => '😓 Your opponent has no Pokémon to battle!',
battleWinner: (params) => `🏆 @${params.user} wins the battle!`,
battleDraw: () => '🤝 Draw! Both Pokémon are exhausted.',
battleHeader: () => '⚔️ *Pokémon Battle!*',
battlePlayer1: (params) => `👤 @${params.user} chose *${params.pokemon}* (Lv. ${params.level})`,
battlePlayer2: (params) => `👤 @${params.user} chose *${params.pokemon}* (Lv. ${params.level})`,

myPacksMessage: (params) => `
📂 YOUR PACKS

• 📦 Base: ${params.base}
• 👑 Imperium: ${params.imperium}
• 🌌 Premium: ${params.premium}
• 🌑 Darkness: ${params.darkness}

🎁 Use the buttons to open a pack right now!
`.trim(),

openBaseButton: () => '📦 Open Base',
openImperiumButton: () => '👑 Open Imperium',
openPremiumButton: () => '🌌 Open Premium',
openDarknessButton: () => '🌑 Open Darkness',
buyPacksButton: () => '➕ Buy Packs',

packsFooter: () => '✨ Collect rare cards and build your team!',

darknessInfoHeader: () => '🌑 *DARKNESS PACKS* 🌑',
darknessInfoDescription1: () => '*Darkness* packs cannot be bought, but they **appear out of nowhere** when you open *Premium* packs.',
darknessInfoDescription2: () => '➡️ Every 10 *Premium* packs opened, you have a 50% chance to receive a bonus *Darkness* pack.',
darknessInfoDescription3: () => '🎲 By opening a *Darkness* pack, you can find special Darkness Pokémon with a 10% chance.',
darknessInfoDescription4: () => 'Use *.open darkness* to open Darkness packs.',
darknessInfoFooter: () => 'Good luck! 🍀',

evolveNoName: () => '📛 Specify the name of the Pokémon to evolve.\nExample: *.evolve Charmander*',

evolveNotOwned: (params) => `❌ You do not own *${params.name}*`,

evolveNotEnoughMoney: (params) => `⛔ You don’t have enough Mattecash!\n💰 You have: *${params.current}*\n💸 Required: *${params.required}*`,

evolveNotPossible: (params) => `⛔ *${params.name}* cannot evolve further.`,

evolveStart: (params) => `✨ *${params.name}* is evolving...`,

evolveProgress: () => '🔄 Evolution in progress...',

evolveComplete: (params) => `🎉 *${params.oldName}* evolved into *${params.newName}*!`,

evolveSuccess: (params) => `✅ Evolution completed!\n💰 Remaining Mattecash: *${params.remaining}*`,

evolutionApiError: (params) => `Error retrieving evolution: ${params.error}`,

emptyInventory: () => '📦 Your inventory is empty! Use *.open base* to get your first Pokémon.',

invalidPage: (params) => `❌ Invalid page. Choose between 1 and ${params?.totalPages || 1}`,

inventoryHeader: (params) => `╭━━━🗂️ *POKÉMON INVENTORY* 🗂️━━━╮
┃ 👤 *Trainer:* @${params?.user || 'N/A'}
┃ 📦 *Total:* ${params?.total || 0}
┃ 📄 *Page:* ${params?.page || 1}/${params?.totalPages || 1}
┃ 📌 *Per page:* ${params?.perPage || 50}
╰━━━━━━━━━━━━━━━━━━━━━━━╯`,

pokemonEntry: (params) => `#${params?.index || 0} ➤ *${params?.name || 'N/A'}* (Lv.${params?.level || 1})\n${params?.rarityEmoji || '❓'} ${params?.rarity || 'N/A'} | ${params?.typeEmoji || '🔘'} ${params?.type || 'N/A'}`,

buttonDarkness: () => '🌑 Darkness Pokémon',

pageButton: (params) => `${params?.current ? '📍' : ''}Page ${params?.page || 1}`,

inventoryFooter: () => '📂 Use `.inventory [page]` or click the buttons to navigate.',

adTitle: () => 'Your Pokémon Inventory',

adBody: (params) => `Page ${params?.page || 1}/${params?.totalPages || 1} • ${params?.total || 0} total`,

tradeUsage: () => '📌 Usage:\n.trade @user <your_number> <their_number>',
tradeInvalidSelf: (params) => `❌ Your Pokémon no. ${params.number} does not exist.`,
tradeInvalidOther: (params) => `❌ Pokémon no. ${params.number} of @${params.user} does not exist.`,
tradeRequestHeader: () => '🔁 *Trade Request*',
tradeRequestFrom: (params) => `${params.user} wants to trade:`,
tradeRequestOffer: (params) => `📤 *${params.pokemon}* (Lv. ${params.level})`,
tradeRequestFor: (params) => `with\n📥 *${params.pokemon}* (Lv. ${params.level}) from @${params.targetUser}`,
tradeRequestAccept: (params) => `✅ @${params.targetUser}, reply with *.accept* to confirm.`,
tradeNoRequest: () => '❌ No trade request found.',
tradePokemonUnavailable: () => '❌ One of the Pokémon is no longer available.',
tradeCompleted: (params) => `✅ Trade completed between @${params.user1} and @${params.user2}!\n\n🎁 ${params.pokemon1} ⇄ ${params.pokemon2}`,

pitySystem: (params) => `📊 *Darkness Pity System*\n\n` +
                         `🔁 Packs opened without Darkness: *${params?.pityCounter || 0}*\n` +
                         `🎯 Next guaranteed Darkness in: *${params?.remaining || 0}* packs\n`,

pityGuaranteed: () => `\n✨ The next pack has a *guaranteed* Darkness!`,

noPendingRequest: () => '❌ You have no pending invitations.',

gangJoinSuccess: (params) => `🎊 @${params?.user || 'N/A'} joined the gang *${params?.emoji || '🏴'} ${params?.name || 'N/A'} ${params?.emoji || '🏴'}*! There are now ${params?.count || 0} members.`,
gangWelcomeTitle: () => '👑 Welcome to the Gang!',
gangWelcomeBody: (params) => `Join ${params?.name || 'Us'}!`,

gangReject: (params) => `💢 @${params?.user || 'N/A'} has declined the gang invitation.`,

    alreadyInGang: () => '❌ You are already in a gang. Leave your current gang before creating a new one.',

createGangFormat: (params) => `📝 Incorrect format. Use: *${params?.prefix || '.'}creategang [name] [emoji]*\nExample: *${params?.prefix || '.'}creategang Pirates ☠️*`,

gangNameTooLong: () => '❌ The gang name cannot exceed 20 characters.',

gangExists: () => '❌ A gang with this name already exists.',

gangCreated: (params) => `✅ You created the gang *${params?.color || '🏴'} ${params?.emoji || ''} ${params?.name || 'N/A'} ${params?.emoji || ''} ${params?.color || '🏴'}*!\n\n👑 You are now the *BOSS*. Use *${params?.prefix || '.'}invitegang @user* to invite other members.`,

notInGang: () => '❌ You are not in any gang.',

bossCannotLeave: () => '👑 You are the boss of the gang. Use *disbandgang* to disband it.',

gangLeft: (params) => `👋 You left the gang *${params?.emoji || '🏴'} ${params?.name || 'N/A'} ${params?.emoji || '🏴'}*.`,

onlyBossCanInvite: () => '👑 Only the boss can invite new members.',

mentionUser: () => '📍 Tag a user to invite.',

userAlreadyInGang: () => '❌ This user is already in a gang.',

gangFull: (params) => `❌ Your gang already has the maximum number of members (${params?.max || 6}).`,

inviteExpired: (params) => `⏱️ The invite for @${params?.user || 'N/A'} has expired.`,

gangInvite: (params) => `🔫 *GANG INVITE* ${params?.color || '🏴'}\n\n@${params?.inviter || 'N/A'} is inviting you to join the gang:\n\n` +
                       `*${params?.emoji || '🏴'} ${params?.name || 'N/A'} ${params?.emoji || '🏴'}*\n` +
                       `👥 Members: ${params?.members || 0}/${params?.max || 6}\n` +
                       `🎯 Level: 1\n\n` +
                       `⏳ You have 60 seconds to accept or decline!`,

acceptButton: () => '✅ Accept Invite',
rejectButton: () => '❌ Decline',

gangInviteTitle: () => '🎯 Gang Invitation!',
gangInviteBody: (params) => `Join ${params?.name || 'Us'}!`,

alreadyPlaying: () => '*🎮 You are already in a game! Finish the current one first.*',

roomNameRequired: (params) => `*🎯 What should the room name be?*\n\n*Example:*\n*${params?.prefix || '.'}${params?.command || 'tictactoe'} mygame*`,

gameStarting: () => '⚡ *Game starting... A player has joined!*',

currentTurn: (params) => `🎯 CURRENT TURN: ${params?.player || 'N/A'}`,

roomCreated: (params) => `✨ *ROOM CREATED!*\n\n🏷️ Name: *${params?.roomName || 'game'}*\n\n👥 To play:\n${params?.prefix || '.'}${params?.command || 'play'} ${params?.roomName || 'game'}\n\n🚪 To leave:\n.exit`,

invalidBet: (params) => `❌ Invalid bet.\nExample: *${params?.prefix || '.'}${params?.command || 'slot'} 100*`,

insufficientUC: (params) => `🚫 Insufficient UC! You need ${params?.bet || 0} UC.`,

cooldown: (params) => `⏳ Wait ${params?.min || 0}m ${params?.sec || 0}s before playing again.`,

winResult: (params) => `🎉 *You won!*\n
┌──────────────
│ ➕ *${params?.ucWin || 0} UC*
│ ➕ *${params?.xpWin || 0} XP*
└──────────────

💎 *CURRENT BALANCE*
┌──────────────
│ 👛 *UC: ${params?.currentUC || 0}*
│ ⭐ *XP: ${params?.currentXP || 0}*
│ 📊 *Progress: ${params?.levelProgress || 0}/${params?.levelTotal || 0} XP*
└──────────────

ℹ️ Use ${params?.prefix || '.'}menuxp to earn more XP!`,

loseResult: (params) => `🤡 *You lost!*\n
┌──────────────
│ ➖ *${params?.bet || 0} UC*
│ ➖ *${params?.bet || 0} XP*
└──────────────

💎 *CURRENT BALANCE*
┌──────────────
│ 👛 *UC: ${params?.currentUC || 0}*
│ ⭐ *XP: ${params?.currentXP || 0}*
│ 📊 *Progress: ${params?.levelProgress || 0}/${params?.levelTotal || 0} XP*
└──────────────

ℹ️ Use ${params?.prefix || '.'}menuxp to earn more XP!`,

slotSpinning: () => '🎰 *Slot machine spinning...*',

casinoChooseBet: (params) => `🎰 *CASINO BET*\n\n🚩 Enter the amount of 💶 Unitycoins you want to bet against *chatunity-bot*.\n\nExample:\n> *${params?.prefix || '.'}${params?.command || 'bet'}* 100`,

casinoBetButton: (params) => `${params?.amount || 0} 💶`,

casinoCooldown: (params) => `🚩 You recently started a bet, wait *⏱ ${params?.time || '0m 0s'}* before betting again.`,

casinoLost: (params) => `🌵 *CASINO RESULT*\n\n➠ *chatunity-bot*: ${params?.botScore || 0}\n➠ *${params?.username || 'Player'}*: ${params?.playerScore || 0}\n\n🎯 ${params?.username || 'Player'}, *YOU LOST* ${params?.amount || 0} 💶 Unitycoins.`,

casinoWon: (params) => `🌵 *CASINO RESULT*\n\n➠ *chatunity-bot*: ${params?.botScore || 0}\n➠ *${params?.username || 'Player'}*: ${params?.playerScore || 0}\n\n🎯 ${params?.username || 'Player'}, *YOU WON* ${params?.amount || 0} 💶 Unitycoins.`,

casinoTie: (params) => `🌵 *CASINO RESULT*\n\n➠ *chatunity-bot*: ${params?.botScore || 0}\n➠ *${params?.username || 'Player'}*: ${params?.playerScore || 0}\n\n🎯 ${params?.username || 'Player'}, *TIE!* You get back ${params?.amount || 0} 💶 Unitycoins.`,

casinoInsufficient: (params) => `❌ You don't have *${params?.amount || 0} 💶 Unitycoins* to bet!`,

pptCooldown: (params) => `⏱ You recently played, wait *${params?.time || '0m 0s'}* before playing again.`,

pptChooseOption: () => `🎮 *Rock - Paper - Scissors*\n\nChoose an option to start the game:`,

pptRock: () => "🪨 Rock",
pptPaper: () => "📄 Paper", 
pptScissors: () => "✂️ Scissors",

pptInvalidOption: () => `❌ Invalid option!\n\nChoose a valid option to start the game:`,

pptTie: (params) => `🤝 *TIE!*\nYou receive *${params?.points || 0} 💶 Unitycoins* as a reward.`,

pptWin: (params) => `🎉 *YOU WON!*\nYou just earned *${params?.points || 0} 💶 Unitycoins*.`,

pptLose: (params) => `😢 *YOU LOST!*\nYou just lost *${params?.points || 0} 💶 Unitycoins*.`,

pptResult: (params) => `🎮 *GAME RESULT*\n\n👤 Your choice: *${params?.userChoice || 'N/A'}*\n🤖 Bot's choice: *${params?.botChoice || 'N/A'}*\n\n📊 Result: ${params?.result || 'N/A'}\n\n💎 Current balance: *${params?.currentBalance || 0} UC*`,

pptRetry: () => "🔄 Play again",

rouletteCooldown: (params) => `⏱ You recently started a bet, wait *${params?.time || '0 seconds'}* before betting again.`,

rouletteFormat: (params) => `🎰 *ROULETTE*\n\nYou must enter an amount of 💶 Unitycoins and bet on a color:\nExample: *${params?.prefix || '.'}${params?.command || 'roulette'} 20 black*`,

rouletteInvalidFormat: (params) => `❌ Incorrect format.\nEnter: *${params?.prefix || '.'}${params?.command || 'roulette'} <amount> <color>*\nExample: *${params?.prefix || '.'}${params?.command || 'roulette'} 20 red*`,

rouletteInvalidAmount: () => `❌ Enter a valid amount to bet.`,

rouletteMaxBet: () => `📊 The maximum bet amount is 50 💶 Unitycoins.`,

rouletteInvalidColor: () => `🎨 You must bet on a valid color: *black* or *red*.`,

rouletteInsufficient: () => `❌ You don't have enough 💶 Unitycoins to place this bet.`,

rouletteBetPlaced: (params) => `🎯 You bet ${params?.amount || 0} 💶 Unitycoins on ${params?.color || 'N/A'}.\n⏱ Wait *${params?.time || 10} seconds* to see the result...`,

rouletteWin: (params) => `🎉 *YOU WON!*\nYou earned ${params?.amount || 0} 💶 Unitycoins.\n💎 Total: ${params?.total || 0} 💶 Unitycoins.`,

rouletteLose: (params) => `😢 *YOU LOST!*\n${params?.amount || 0} 💶 Unitycoins have been deducted.\n💎 Total: ${params?.total || 0} 💶 Unitycoins.`,

black: () => 'black ⚫',
red: () => 'red 🔴',

newsletterName: () => 'ChatUnity Roulette',

coinCooldown: (params) => `⏳ You recently played. Wait *${params?.time || '0 seconds'}* before trying again.`,

coinWaitingPlayer1: (params) => `🎮 *Heads or Tails*\n\n🧑 Player 1: @${params?.player || 'N/A'}\n🕹️ Waiting for second player...\n\nType "heads" or "tails" to start.`,

coinFooter: () => 'Make your choice',

coinPlayer1Chose: (params) => `🎮 *Heads or Tails*\n\n🧑 Player 1: @${params?.player || 'N/A'} chose *${params?.choice || 'N/A'}*\n🎯 Waiting for another player...\n\nYour turn! Type "heads" or "tails".`,

coinJoinPrompt: () => 'Join now',

coinInvalidChoice: () => `⚠️ You must choose between *heads* or *tails*! Type your choice.`,

coinResult: (params) => `🪙 *RESULT: ${params?.result || 'N/A'}*\n\n`,

coinPlayerWin: (params) => `✅ @${params?.player || 'N/A'} won ${params?.amount || 0} 💶`,

coinPlayerLose: (params) => `❌ @${params?.player || 'N/A'} lost ${params?.amount || 0} 💶`,

coinPlayAgain: (params) => `\nTo play again, type the command ${params?.prefix || '.'}${params?.command || 'coin'}`,

coinAlreadyChose: (params) => `You already chose *${params?.choice || 'N/A'}*. Waiting for another player...`,

coinInvalidGame: (params) => `❌ Game unavailable or invalid command.\n\nTo start a new game, type ${params?.prefix || '.'}${params?.command || 'coin'}`,

coinInvalidCommand: (params) => `❌ Invalid command. Type "${params?.prefix || '.'}${params?.command || 'coin'}" or choose "heads" or "tails".`,

mathDifficultyLevels: (params) => `🧮 *Available difficulty levels:* \n${params.levels}\n\n📌 Example: ${params.example}`,
mathInvalidDifficulty: (params) => `🧮 *Available difficulty levels:* \n${params.levels}\n\n📌 Example: ${params.example}`,
mathActiveGame: (params) => `⚠️ There is already an active question in this chat!\n\nQuestion: *${params.question}*\nRemaining time: ${params.remainingTime} seconds`,
mathQuestion: (params) => `▢ *HOW MUCH IS* ${params.question}?\n\n⏳ Time: ${params.time} seconds\n💰 Reward: ${params.bonus} XP`,
mathTimeUp: (params) => `⏰ Time's up!\nThe answer was: *${params.answer}*`,
mathCorrectAnswer: (params) => `✅ *CORRECT ANSWER!*\n\nTime taken: ${params.timeTaken} seconds\nScore: ${params.score} XP`,
mathWrongAnswer: () => `❌ Wrong answer! Try again`,
mathError: () => `❌ An error occurred in the game. Please try again later.`,

scfCooldown: (params) => `⏰ You recently played, wait *${params.time}* before playing again.`,
scfNoChoice: (params) => `🎮 *Rock Paper Scissors*\n\nChoose an option to start the game:\n▢ rock\n▢ paper\n▢ scissors\n\n📝 Example: *${params.prefix + params.command} rock*`,
scfInvalidChoice: (params) => `❌ *Invalid choice!*\n\nAvailable options:\n▢ rock\n▢ paper\n▢ scissors\n\n📝 Example: *${params.prefix + params.command} rock*`,
scfDraw: (params) => `🤝 *Draw!* You receive *${params.points} 💶 Unitycoins* as a reward`,
scfWin: (params) => `🎉 *YOU WON!* You earned *${params.points} 💶 Unitycoins*`,
scfLose: (params) => `😢 *You lost!* You lost *${params.points} 💶 Unitycoins*`,
scfResult: (params) => `${params.result}\n\n🗂️ My choice: *${params.botChoice}*\n💰 New balance: *${formatNumber(params.newBalance)} UC*`,

pokedexNoInput: () => '🚩 Enter the name of a Pokémon',
pokedexSearching: (params) => `🔍 Searching for ${params.pokemon}...`,
pokedexNoDescription: () => 'No description available',
pokedexError: () => '⚠️ Error while searching for the Pokémon',
pokedexInfo: (params) => `
🎌 *Pokédex - ${params.name}*

🔹 *Name:* ${params.name}
🔹 *ID:* ${params.id}
🔹 *Type:* ${params.type}
🔹 *Abilities:* ${params.abilities}
🔹 *Height:* ${params.height}
🔹 *Weight:* ${params.weight}
`,
description: (params) => `
📝 *Description:*
${params.description}

🌐 *More info:*
https://www.pokemon.com/us/pokedex/${params.urlName}
`.trim(),

flagGroupOnly: () => '⚠️ This command only works in groups!',
flagNoGame: () => '⚠️ There is no active game in this group!',
flagAdminOnly: () => '❌ *This command can only be used by admins!*',
flagGameActive: () => '⚠️ A game is already active in this group!',
flagGameStopped: (params) => `🛑 *Flag game stopped by admin*\n✨ The answer was: *${params.answer}*`,

// Cooldown
flagCooldown: (params) => `⏳ *Wait ${params.time} seconds before starting a new game!*`,

// Challenges
flagChallenge1: () => '🇺🇳 *GUESS THE FLAG!* 🇺🇳',
flagChallenge2: () => '🌍 *Which country does this flag represent?*',
flagChallenge3: () => '🏳️ *Geography challenge: can you recognize this flag?*',
flagChallenge4: () => '🧭 *Guess the country from its flag!*',
flagChallenge5: () => '🎯 *Flag quiz: which country is this?*',
flagChallenge6: () => '🌟 *Test your geography knowledge!*',
flagChallenge7: () => '🔍 *Look carefully and guess the country!*',

// Game caption
flagGameCaption: (params) => `${params.challenge}\n\n ㌌ *Answer with the country name!*\n⏱️ *Time available:* ${params.time} seconds\n\n> \`vare ✧ bot\``,

// Timeout
flagTimeOut: (params) => `⏳ *Time\'s up!*\n\n🌍 *The answer was:* *${params.answer}*\n\n> \`vare ✧ bot\``,

// Errors
flagGameError: (params) => `Error in flag game: ${params.error}`,
flagStartError: () => '❌ *An error occurred while starting the game*\n\n🔄 *Please try again in a few seconds*',

// Responses
flagAlmostThere: () => '👀 *You\'re almost there!*',
flagNoAttempts: () => '❌ *You\'ve used all 3 attempts!*\n\n⏳ *Wait for other players or until time runs out*',

// Hints
flagHint: (params) => `❌ *Wrong answer!*\n\n💡 *Hint:*\n   • Starts with the letter *"${params.letter}"*\n   • Consists of *${params.length} letters*`,
flagWrongAttempt: (params) => `❌ *Wrong answer!*\n\n📝 *Attempts remaining:* ${params.attempts}\n🤔 *Think carefully about your next answer!*`,
flagLastAttempt: () => '❌ *Wrong answer!*\n\n📝 *Last attempt remaining..*',

// Correct answer
flagCorrectAnswer: (params) => `
╭━『 🎉 *CORRECT ANSWER!* 』━╮
┃
┃ 🌍 *Country:* ${params.country}
┃ ⏱️ *Time taken:* ${params.time}s
┃
┃ 🎁 *Rewards:*
┃ • ${params.reward} 🪙 UnityCoins${params.timeBonus > 0 ? ` (+${params.timeBonus} speed bonus)` : ''}
┃ • ${params.exp} 🆙 EXP
┃
┃ 💰 *Current balance:* ${params.balance} UnityCoins
╰━━━━━━━━━━━━━━━━╯

> \`vare ✧ bot\``,

logoGroupOnly: () => '⚠ This command only works in groups!',
logoNoGame: () => '⚠ No active game!',
logoAdminOnly: () => '❌ Only admins can stop the game!',
logoGameActive: () => '⚠ Game already in progress!',
logoGameStopped: (params) => `🛑 Game stopped. The answer was: *${params.answer}*`,

// Cooldown
logoCooldown: (params) => `⏳ Wait ${params.time}s before trying again.`,

// Challenges
logoChallenge1: () => '🚘 GUESS THE LOGO!',
logoChallenge2: () => '🏁 Which brand is this?',
logoChallenge3: () => '🔍 Can you recognize this car?',

// Game caption
logoGameCaption: (params) => `${params.challenge}\n⌛ ${params.time} seconds.`,

// Timeout
logoTimeOut: (params) => `⏰ Time\'s up! Answer: *${params.answer}*`,

// Correct answer
logoCorrectAnswer: (params) => `
╭━『 🎉 CORRECT ANSWER! 』━╮
┃
┃ 🚗 Brand: ${params.brand}
┃ ⏱ Time taken: ${params.time}s
┃
┃ 🎁 Rewards:
┃ • ${params.reward} 💰 euro${params.timeBonus > 0 ? ` (+${params.timeBonus} speed bonus)` : ''}
┃ • ${params.exp} 🆙 EXP
┃
╰━━━━━━━━━━━━━━━━╯

> \\by chatunity\\`,

futInventory: (params) => `💼 *FUT Inventory:*\n` +
  `🥉 Bronze: ${params.bronze} • 🥈 Silver: ${params.silver} • 🥇 Gold: ${params.gold}\n\n` +
  `💸 UnityCoin: ${params.balance}\n\n` +
  `🎁 Choose a pack to open 👇`,

openPackButton: (params) => `${params.emoji} Open ${params.type}`,
buyPacksButton: () => '🛒 Buy packs',
futFooter: () => 'Holly FUT Bot ⚽',

// FUT store
futStore: (params) => `🛒 *FUT Store*\n` +
  `🥉 Bronze: ${params.bronzePrice} 💸\n` +
  `🥈 Silver: ${params.silverPrice} 💸\n` +
  `🥇 Gold: ${params.goldPrice} 💸\n\n` +
  `💸 Current balance: ${params.balance}`,

futStoreFooter: () => 'Buy packs with Holly Cash',

// Purchase
futBuyUsage: () => '❌ Use: .futbuy bronze/silver/gold',
futNotEnoughMoney: (params) => `❌ You need ${params.price} UnityCoin 💸 for a ${params.type} pack`,
futPackBought: (params) => `✅ Purchased a *${params.type}* pack! You now have: ${params.count}`,

// Opening packs
futOpenUsage: () => '❌ Specify the pack to open.',
futNoPacks: (params) => `❌ No ${params.type} packs to open.`,
futOpeningPack: (params) => `🎉 Opening *${params.type}* pack...`,

// Player cards
futPlayerCard: (params) => `🌟 *${params.name}* (${params.rating}⭐)\n📍 ${params.position} | ${params.club} | ${params.nation}`,
futAdditionalPlayer: (params) => `➕ ${params.name} (${params.rating}⭐)`,

// Squad
futNoPlayers: () => '📭 No players in the squad.',

// Main texts
'missioni_default_bot_name': 'ChatUnity Bot',

'missioni_main_menu': `🎯 *MISSIONS SYSTEM {botName}*\n\n` +
          `👤 User: {user}\n` +
          `💰 Balance: {balance} UC\n` +
          `🏦 Bank: {bank} UC\n` +
          `📅 Daily: {dailyCompleted}/{dailyTotal} completed\n` +
          `📆 Weekly: {weeklyCompleted}/{weeklyTotal} completed\n\n` +
          `Select the type of missions:`,

'missioni_main_footer': 'Complete missions to earn UnityCoins!',

'missioni_daily_header': `📅 *DAILY MISSIONS* {user}\n\n` +
                        `⏳ Reset in: {resetTime}\n\n` +
                        `{missions}`,

'missioni_daily_footer': 'Use "{prefix}missions claim" to collect rewards!',

'missioni_weekly_header': `📆 *WEEKLY MISSIONS* {user}\n\n` +
                         `⏳ Reset in: {resetTime}\n\n` +
                         `{missions}`,

'missioni_weekly_footer': 'Weekly missions - Bigger rewards!',

'missioni_mission_entry': `▢ *{index}. {title}*\n` +
                         `➠ Progress: {progress}/{target}\n` +
                         `➠ Reward: {reward} UC\n` +
                         `➠ Status: {status}`,

// Mission statuses
'missioni_status_claimed': '✅ CLAIMED',
'missioni_status_ready': '💰 READY',
'missioni_status_in_progress': '❌ IN PROGRESS',

// Daily mission titles
'missioni_daily_1_title': 'Send 50 messages',
'missioni_daily_2_title': 'Execute 10 commands',
'missioni_daily_3_title': 'Stay without warnings',

// Weekly mission titles
'missioni_weekly_1_title': 'Send 300 messages',
'missioni_weekly_2_title': 'Execute 50 commands',
'missioni_weekly_3_title': 'Stay 7 days without warnings',
'missioni_weekly_4_title': 'Reach 1000 total messages',

// Buttons
'missioni_button_daily': '📅 DAILY',
'missioni_button_weekly': '📆 WEEKLY',
'missioni_button_claim': '💰 CLAIM',
'missioni_button_back': '🔙 BACK',
'missioni_button_wallet': '💰 WALLET',
'missioni_button_missions': '🎯 MISSIONS',

// Claim system
'missioni_no_claims': '{user} you have no completed missions to claim!',

'missioni_claim_detail': '✅ {title}: +{reward} UC',

'missioni_claim_success': `🎉 {user} claimed *{total} UnityCoins*!\n\n` +
                         `{details}\n\n` +
                         `💰 New balance: *{balance} UC*\n` +
                         `🏦 Bank: *{bank} UC*`,
'missioni_claim_footer': 'Use .wallet to see your full balance',

// Errors
'missioni_backup_error': 'Backup error:',
'wallet_user_not_found': '🚩 User not found in the database',

'wallet_display': `
╭─「 💰 WALLET 」─
│
│ 👤 User: {name}
│ 💰 UnityCoins: {limit} 💶
│ 🏛️ Bank: {bank} 💳
│
╰───────✦───────
`.trim(),

'wallet_ad_title': '{name}\'s Wallet',
'wallet_ad_body': 'Balance: {limit} UC',

'daily_cooldown': `🚩 You have already collected your daily reward.\nYou can claim only once every 24h.\n\nNext reward: +{amount} 💶 UC\nIn: ⏱ {time}`,

'daily_success': `🚩 Congratulations! 🎉 You received *+{amount} 💶 UC!*\n\nYou now have: *{balance} 💶 UC* in your balance`,

'daily_time_format': '{hours} hours, {minutes} minutes, and {seconds} seconds',

top_unitycoins_title: (userId, groupId, vars) => `TOP ${vars.len} UNITYCOINS 💶`,
your_position_unitycoins: (userId, groupId, vars) => `YOUR POSITION: *${vars.position}* out of *${vars.total}*`,
unitycoins_symbol: (userId, groupId, vars) => `💶`,

top_xp_title: (userId, groupId, vars) => `TOP ${vars.len} XP 💫`,
your_position_xp: (userId, groupId, vars) => `YOUR POSITION: *${vars.position}* out of *${vars.total}*`,
xp_symbol: (userId, groupId, vars) => `💫`,

// Help command translations
classifica_help: (userId, groupId, vars) => `Show player ranking`,
lb_help: (userId, groupId, vars) => `Show players leaderboard`,
leaderboard_help: (userId, groupId, vars) => `Show player ranking`,

mention_required: (userId, groupId, vars) => '🚩 YOU MUST MENTION THE RECIPIENT @user*',
amount_required: (userId, groupId, vars) => '🚩 ENTER THE AMOUNT OF 💶 UNITYCOINS TO TRANSFER',
only_numbers: (userId, groupId, vars) => 'ONLY NUMBERS ARE ALLOWED',
min_transfer: (userId, groupId, vars) => '🚩 Minimum transfer is 1 UNITYCOIN',
insufficient_funds: (userId, groupId, vars) => 'YOU DON\'T HAVE ENOUGH 💶 UNITYCOINS FOR THIS TRANSFER',

transfer_success_sender: (userId, groupId, vars) => `*${vars.amount}* 💶 UNITYCOINS\nFee 2%: *${vars.tax}* 💶\nTotal deducted: *${vars.total}* 💶 UNITYCOINS`,
transfer_success_receiver: (userId, groupId, vars) => `*+${vars.amount}* 💶 UNITYCOINS RECEIVED!`,

// Help commands
donauc_help: (userId, groupId, vars) => 'Transfer UnityCoins to a user',
bonifico_help: (userId, groupId, vars) => 'Make a UnityCoins transfer',
trasferisci_help: (userId, groupId, vars) => 'Transfer UnityCoins to another user',
dona_help: (userId, groupId, vars) => 'Donate UnityCoins to a user',
transfer_help: (userId, groupId, vars) => 'Transfer UnityCoins to a user',
senduc_help: (userId, groupId, vars) => 'Send UnityCoins to another user',
pay_help: (userId, groupId, vars) => 'Pay UnityCoins to someone',

steal_no_target: '🧠 Tag someone or reply to a message to steal.\n\n📌 Example:\n{prefix}{command} @user',
steal_self: '🤡 You cannot steal from yourself.',
steal_cooldown: '🚨 You have already stolen recently! Try again in ⏱ *{time}*',
steal_success: `💰 Heist successful! You stole *{amount} 💶 UC* from {target}.\n\n*+{bonus} 💶* added to your balance.`,
steal_caught: `🚓 You got caught! Fine of *-{fine} 💶 UC* for {name}.`,
steal_partial: `💸 You only stole *{amount} 💶 UC* from {target}.\n\n*+{bonus} 💶* added to your balance.`,
steal_time_format: '{minutes}m {seconds}s',

// withdraw.js
withdraw_no_amount: '🚩 Enter the amount of *💶 UnityCoins* you want to withdraw.',
withdraw_no_money: '🚩 You have no *💶 UnityCoins* in the bank.',
withdraw_invalid_number: '🚩 The amount must be a valid number.',
withdraw_minimum: '🚩 Enter a valid amount (at least 1).',
withdraw_insufficient: '🚩 You only have *{balance} 💶 UnityCoins* available in the bank.',
withdraw_success_all: '✅ You withdrew *{amount} 💶 UnityCoins* from the bank.',
withdraw_success: '✅ You withdrew *{amount} 💶 UnityCoins* from the bank and added to your wallet.\n\nNew bank balance: {balance} 💶',

mining_cooldown: (userId, groupId, vars) => `⏳ ${vars.nome}, YOU MUST WAIT ${vars.tempo} BEFORE MINING AGAIN.`,
mining_complete: (userId, groupId, vars) => `⛏ *MINING COMPLETE!*\n\nYOU GOT *${vars.risultato} XP*!\n\nNEW TOTAL: ${vars.totale} XP`,

// Help commands
mina_help: (userId, groupId, vars) => 'Perform mining to earn XP',
miming_help: (userId, groupId, vars) => 'Perform mining to gain experience',
mine_help: (userId, groupId, vars) => 'Perform mining to earn XP',
mining_help: (userId, groupId, vars) => 'Perform a mining operation',
dig_help: (userId, groupId, vars) => 'Dig to earn experience',

xp_level_display: 'Level: {level}',
xp_progress_display: '{current} / {needed} XP',
xp_footer_text: '˙ . ᵗˢᵏ ꒷ . 𝐧𝐞𝐱𝐮𝑠 𖦹˙🪽',
xp_caption: `✨ *XP PROFILE* ✨\n▸ *USER*: {user}\n▸ *LEVEL*: {level}\n▸ *TOTAL XP*: {exp}\n▸ *NEXT LEVEL*: {next} XP`,

steal_cooldown: (userId, groupId, vars) => `⏳ YOU MUST WAIT ${vars.tempo} BEFORE STEALING AGAIN`,
tag_required: (userId, groupId, vars) => `📍 YOU MUST TAG THE USER!`,
user_not_found: (userId, groupId, vars) => `⚠️ USER NOT FOUND IN DATABASE`,
insufficient_target_xp: (userId, groupId, vars) => `😢 @${vars.user} HAS LESS THAN *${vars.limite} XP*\nYOU CANNOT STEAL`,

steal_success: (userId, groupId, vars) => `💰 YOU STOLE ${vars.amount} XP FROM @${vars.user}!`,

hours: (userId, groupId, vars) => `Hour(s)`,
minutes: (userId, groupId, vars) => `Minute(s)`,
seconds: (userId, groupId, vars) => `Second(s)`,

// Help commands for stealing XP
rubaxp_help: (userId, groupId, vars) => 'Steal XP from another user',
stealxp_help: (userId, groupId, vars) => 'Steal experience from a user',
robxp_help: (userId, groupId, vars) => 'Steal XP from someone',
rob_help: (userId, groupId, vars) => 'Steal resources from other users',
steal_help: (userId, groupId, vars) => 'Steal XP from other players',

transferxp_no_user: '🚩 You must mention a user with @user\n\n📌 Example:\n{prefix}{command} @user 100',
transferxp_no_amount: '🚩 Enter the amount of 💫 XP to transfer',
transferxp_nan: '🚩 Only numbers are allowed',
transferxp_minimum: '🚩 Minimum transfer is 1 💫 XP',
transferxp_insufficient: '🚩 You don\'t have enough 💫 XP, you need more experience',
transferxp_confirmation: `📊 *Transaction Summary*\n\n` +
                         `▸ XP transferred: *-{amount} 💫*\n` +
                         `▸ Tax (2%): *-{tax} 💫*\n` +
                         `▸ Total deducted: *-{total} 💫*`,
transferxp_recipient: `📩 You received +{amount} 💫 XP!`,

marry_no_target: 'Tag the person you want to propose to!\nExample: {prefix}{command} @tag',
marry_self: 'You cannot marry yourself!',

    marry_user_not_found: 'Person not present in the system',

    marry_already_married_sender: 'You already have a spouse...\n\n{spouse} betrayal!!! 😡😡😡',

    marry_already_married_target: '{target} is already married',

    marry_pending_proposal: 'A marriage proposal is already underway. Wait for a response or cancellation..',

    marry_proposal_text: `💍 Marriage request in progress...\n\nDo you {target} want to marry {sender}?\n\nChoose an option below.\n> ⏳ You have 60 seconds to respond.`,

    marry_button_yes: '💍 yes',

    marry_button_no: '❌ No',

    marry_proposal_expired: 'Marriage proposal canceled: {sender} and {target} did not respond within the time limit..',

    marry_proposal_rejected: '❌ Marriage proposal rejected.',

    marry_user_not_found_db: '❌ One of the users is no longer present in the database.',

    marry_success: `I hereby officially declare {sender} and {target} married until connection do you part.`,

    divorce_not_married: 'Get married first, only then can you divorce',

    divorce_spouse_not_found: 'Spouse not found in system',

    divorce_success: `You and {ex} are now divorced.\n\nYou were a horrible couple anyway.`,
love_no_target: 'Enter a persons name to calculate compatibility.!',
love_default_bot_name: 'ChatUnity',
love_result: `︶︶ ⊹ ︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶ ⊹ ︶︶\nLOVE CALCULATOR ❤️\nCompatibility between {target} and you: {percentage}%\n︶︶ ⊹ ︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶ ⊹ ︶︶`,

kiss_no_target: `You have to mention someone or reply to a message to kiss them💋! Example: {prefix}{command} @user`,
kiss_no_mention: `💋 *You have to mention someone to kiss them!*\nExample: *.kiss @user*`,
kiss_message: `💋 *{sender} he gave a kiss to {target}!* 😘`,

 default_bot_name: (userId, groupId, vars) => `𝐂𝐡𝐚𝐭𝐔𝐧𝐢𝐭𝐲`,

    hate_calculator: (userId, groupId, vars) => `──────────────\n𝐇𝐀𝐓𝐄 𝐂𝐀𝐋𝐂𝐔𝐋𝐀𝐓𝐎𝐑 😡\nThe hatred between ${vars.user1} Is ${vars.user2}: ${vars.percentage}%\n──────────────`,

    // Traduzioni per i comandi help
    odio_help: (userId, groupId, vars) => 'Calculate the level of hate between you and another user',
    hate_help: (userId, groupId, vars) => 'Calculate hate level between users',
    hatred_help: (userId, groupId, vars) => 'Measure hatred percentage',
    dislike_help: (userId, groupId, vars) => 'Check dislike level between users',

    default_bot_name: (userId, groupId, vars) => "ChatUnityBot",

    rizz_no_target: (userId, groupId, vars) => "Tag someone or reply to a message to get them to like you.",

    rizz_message: (userId, groupId, vars) => `*┏━_͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡━┓*\n\n❥ *"${vars.piopo}"*\n\n${vars.sender} he raised ${vars.target}!\n\n*┗━_͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡━┛*`,

    // Piropi (frasi di corteggiamento)
    piropo_1: (userId, groupId, vars) => "If your body were a prison and your lips chains, what a fine place to serve my sentence..",
    piropo_2: (userId, groupId, vars) => "So many stars in space and none shine like you.",
    piropo_3: (userId, groupId, vars) => "I like coffee, but I prefer to have tea.",
    piropo_4: (userId, groupId, vars) => "You're not Google, but you have everything I'm looking for..",
    piropo_5: (userId, groupId, vars) => "I give you this flower, even if no one will ever be as beautiful as you.",
    piropo_6: (userId, groupId, vars) => "If every drop of water on your body is a kiss, then I want to become a thunderstorm.",
    piropo_7: (userId, groupId, vars) => "My life is missing life, my life is missing light, my life is missing someone and that someone is you.",
    piropo_8: (userId, groupId, vars) => "You are so beautiful that I would give you a million kisses and if you didn't like them I would take them back.",
    piropo_9: (userId, groupId, vars) => "If you were winter rain, I would close the umbrella to feel you on my body.",
    piropo_10: (userId, groupId, vars) => "They are not words of gold or ruby, they are words of affection that I compose for you.",
    piropo_11: (userId, groupId, vars) => "When you walk you don't step on the ground, you caress it..",
    piropo_12: (userId, groupId, vars) => "So many life forms and I live only in your eyes.",
    piropo_13: (userId, groupId, vars) => "I like you so much that I don't know where to start telling you..",
    piropo_14: (userId, groupId, vars) => "Everyone stops at your body, but I prefer your heart.",
    piropo_15: (userId, groupId, vars) => "Your beauty blinds me because it comes from your heart and is reflected in your eyes..",
    piropo_16: (userId, groupId, vars) => "If anyone ever told you you're beautiful, they lied to you, you're not beautiful, you're gorgeous..",
    piropo_17: (userId, groupId, vars) => "The sky is blue, the cream is yellow, and the eyes of the girl who kills me are black..",
    piropo_18: (userId, groupId, vars) => "If I were Columbus I would sail day and night to reach the depths of your heart..",
    piropo_19: (userId, groupId, vars) => "If beauty were time, you would be 24 hourse.",
    piropo_20: (userId, groupId, vars) => "If loving you were a sin, I would be guaranteed hell.",
    piropo_21: (userId, groupId, vars) => "You are the only thing missing from my life to be perfect..",
    piropo_22: (userId, groupId, vars) => "I don't tell you beautiful words, but a sincere verse: my love for you is infinite and my heart is true.",
    piropo_23: (userId, groupId, vars) => "What I feel for you is so immense that I would need another universe to contain it..",
    piropo_24: (userId, groupId, vars) => "Math always tells the truth: you and I together for eternity.",
    piropo_25: (userId, groupId, vars) => "At night the moon shines, and during the day the sun shines, but your eyes light up my heart.",
    piropo_26: (userId, groupId, vars) => "Don't look for me, I prefer to stay lost in your gaze.",
    piropo_27: (userId, groupId, vars) => "Some want the world, some want the sun, but I just want a corner of your heart.",
    piropo_28: (userId, groupId, vars) => "If I were an astronaut I would take you to Pluto, but not being one I will always carry you in my heart..",
    piropo_29: (userId, groupId, vars) => "I always hear that Disneyland is the happiest place in the world. But I wonder: have they ever been near you?",
    piropo_30: (userId, groupId, vars) => "I bet your name is Google. You know why? Because you have everything I was looking for!",
    piropo_31: (userId, groupId, vars) => "Do you have a pencil and an eraser? Because I want to erase your past and write our future.",
    piropo_32: (userId, groupId, vars) => "You're like my favorite cup of coffee, hot and mouth-watering!",
    piropo_33: (userId, groupId, vars) => "I want our love to be like Pi: irrational and infinite..",
    piropo_34: (userId, groupId, vars) => "I'm writing a book about the finer things in life and you're on the first page..",
    piropo_35: (userId, groupId, vars) => "I haven't always been religious. But I am now, because you are the answer to my prayers..",
    piropo_36: (userId, groupId, vars) => "Imagine: Don't you think we'd look cute on a wedding cake with our faces?",
    piropo_37: (userId, groupId, vars) => "You're the kind of girl my mom wants me to bring home. Do you want to meet her?",
    piropo_38: (userId, groupId, vars) => "Your face is perfect... God has done a great job with you.",

    // Traduzioni per i comandi help
    rizz_help: (userId, groupId, vars) => 'Send a flirtatious phrase to a user',
    flirt_help: (userId, groupId, vars) => 'Flirt with someone using pickup lines',
    seduce_help: (userId, groupId, vars) => 'Send seductive messages to users',
    pickup_help: (userId, groupId, vars) => 'Use pickup lines on other users',

    threats_group_only: "This command only works in groups",
threats_disabled: "This command is disabled in this group",
threats_no_target: "Who do you want to threaten??",
threats_bot_name: "ChatUnity",
threat_1: "I'll give you a bottle and I'll love your family",
threat_2: "I'll make you watch Milley Cyrus 24/7",
threat_3: "I'll stick my hand in your ass, pull out your spine and use it to whip you",
threat_4: "I'll kick your ass so hard it stays inside your shoe",
threat_5: "I'll fuck you with sand, salt, and broken glass",
threat_6: "I'll give you half an hour of slaps in five minutes",
threat_7: "I'll let deaf niggers fuck you so when you say stop they won't hear you",
threat_8: "I'll take you apart and set fire to the instructions",
threat_9: "I'll put a finger in your mouth, one in your ass and rinse you out like a demijohn",
threat_10: "I'll kick you so hard you can make your balls flop around with your tonsils",
threat_11: "I'll stick a stick in your ass and wave it like a flag",
threat_12: "I'll grab you by the ears and throw you away like a Goliath",
threat_13: "I'll take off your balls and hang them on the Christmas tree",
threat_14: "I'll tear your arms off and use them to hit you",
threat_15: "I'll give you two black eyes because if you start chewing bamboo the WWF will protect you",

zizzania_group_only: "This command only works in groups",
zizzania_disabled: "This command is disabled in this group",
zizzania_1: "would like to lick your nipples",
zizzania_2: "loves to smell farts",
zizzania_3: "would desperately like to dance nudx with",
zizzania_4: "last night he dreamed of having sex with",
zizzania_5: "secretly has sex with the dog",
zizzania_6: "he is madly in love with the grandmother of",
zizzania_7: "he got the mother pregnant",
zizzania_8: "spend the night watching sleep",
zizzania_9: "during school lessons he has sexual fantasies about",
zizzania_10: "it's the crush of",
zizzania_11: "she's the personal whore of",
zizzania_12: "secretly sucks the cock of",
zizzania_13: "licks the ears of at night",
zizzania_14: "likes to masturbate to photos of",
zizzania_15: "he fucked 9 months before he was born with the mother of",

   bot_name: (userId, groupId, vars) => 'ChatUnity',

    obbligo_message: (userId, groupId, vars) => `*┌────「 ‼𝐃𝐀𝐑𝐄‼ 」─*\n*"${vars.sfida}"*\n*└────「 © ChatUnity 」─*`,

    // Sfide troll  
    sfida_1: (userId, groupId, vars) => "Make a fake OnlyFans account with your cousin's photos and share the link in your class/workgroup.",
    sfida_2: (userId, groupId, vars) => "Text a random contact 'Sorry about last night, hope you didn't get any sick' and block them immediately.",
    sfida_3: (userId, groupId, vars) => "Send a friend a voicemail faking epic orgasms (like 'OH FUCK YES, LAUGH YES!') and say 'sorry, pocket dial'",
    sfida_4: (userId, groupId, vars) => "Post an Instagram story saying 'Looking for sugar daddy/mommy, also accepting crypto' and tag a relative.",
    sfida_5: (userId, groupId, vars) => "Go to a store and ask seriously, 'Do you have Nutella-flavored condoms?' For a friend..'",
    sfida_6: (userId, groupId, vars) => "Pretend to be a ghost and send whispered audio messages to your ex that say things like, 'WHY DID YOU LEAVE ME...'",
    sfida_7: (userId, groupId, vars) => "Post in the family group, 'Guys, I booked a butt tattoo, I need a witness.'",
    sfida_8: (userId, groupId, vars) => "Order a pizza with the words 'HELP I'M A PRISONER OF DOMINOS' written on it and film the delivery.",
    sfida_9: (userId, groupId, vars) => "Make a TikTok video of yourself dancing in your underwear with white grandpa socks and the hashtag #SexyGrandpa",
    sfida_10: (userId, groupId, vars) => "Send all your contacts 'I came in your sandwich. Sorry. Don't do it again.' and then 'Test text, ignore.'",
    sfida_11: (userId, groupId, vars) => "You go to the pharmacy and ask, 'Do you have anything for dick addiction syndrome?''",
    sfida_12: (userId, groupId, vars) => "Change your home WiFi name to 'FBI Surveillance Van #4587' and wait for your neighbors' reactions.",
    sfida_13: (userId, groupId, vars) => "Pretend to be a hacker and text a friend, I HAVE ACCESS TO YOUR PC. PAY ME 10€ ON AMAZON OR I'LL PUBLISH YOUR UGLY MEMES.",
    sfida_14: (userId, groupId, vars) => "Post an ad on Facebook: 'I'm selling holy water from OnlyFans, guaranteed 100% holy.'",
    sfida_15: (userId, groupId, vars) => "Post your WhatsApp status: 'Single. I also accept close relatives. #NoJudgement''",
    sfida_16: (userId, groupId, vars) => "Take a selfie with your face in the toilet (clean, I hope) and send it to a friend with the words 'NEW BOYFRIEND/GIRLFRIEND' written on it.'",
    sfida_17: (userId, groupId, vars) => "Write to your boss 'I'm not coming tomorrow, I have to accompany my grandmother to a rave'",
    sfida_18: (userId, groupId, vars) => "Walk into a McDonald's and yell, 'WHO WANTS TO BE MY ZUCCHINI? I'M OFFERING MCNUGGETS!''",
    sfida_19: (userId, groupId, vars) => "Send an audio message to a random number saying 'HELLO? YES, I'M DONE DIGGING THE GRAVE. WHERE DO I PUT THE BODY?''",
    sfida_20: (userId, groupId, vars) => "Create a Tinder profile with a photo of Silvio Berlusconi and a bio: 'Seeking my sister for bunga bunga.",
    sfida_21: (userId, groupId, vars) => "Go to a pet store and ask if they have pythons trained for anything other than hunting.'",
    sfida_22: (userId, groupId, vars) => "Fake a demonic possession attack in the emergency room, screaming 'THE MARGHERITA HAS TOO MUCH PINEAPPLE'",
    sfida_23: (userId, groupId, vars) => "Write to your mother, 'Mom, I've decided: I'm going to become an escort for retirees. Will you support my career?''",
    sfida_24: (userId, groupId, vars) => "Like all of a random person's posts from 2012 and comment 'RIP, you're always in our hearts''",
    sfida_25: (userId, groupId, vars) => "You do a Twitch stream where you 'read' the Bible, but every 2 minutes you whisper '...your mom's a bitch anyway'",

    // Traduzioni per i comandi help
    obbligo_help: (userId, groupId, vars) => 'Assign a troll duty to complete',
    sfida_help: (userId, groupId, vars) => 'Assign an embarrassing challenge',
    dare_help: (userId, groupId, vars) => 'Command give for truth or dare',
    truthordare_help: (userId, groupId, vars) => 'Game truth or dare - command to give',
    tod_help: (userId, groupId, vars) => 'Truth or Dare - command to give',

       ditalino_no_target: (userId, groupId, vars) => "Tag someone or reply to a message to start the fingering.",

    ditalino_start: (userId, groupId, vars) => `🤟🏻 I'm starting a series of fingerings for *${vars.user}*...`,

    ditalino_almost: (userId, groupId, vars) => "🤟🏻 We're almost there...",

    ditalino_warning: (userId, groupId, vars) => "👋🏻 Get away from the waterfall!!",

    ditalino_result: (userId, groupId, vars) => `✨ *${vars.user}* She came🥵! She's squirting like a mussel after *${vars.time}ms*!`,

    // Traduzioni per i comandi help
    ditalino_help: (userId, groupId, vars) => 'Simulate fingering a user',
    fingering_help: (userId, groupId, vars) => 'Simulate fingering on a user',
    finger_help: (userId, groupId, vars) => 'Finger simulation command',

    fap_default_bot_name: (userId, groupId, vars) => "ChatUnity",
fap_no_target: (userId, groupId, vars) =>  "Tag someone or reply to a message to like them 😏\n\nExample: {prefix}{command} @user",
fap_start: (userId, groupId, vars) =>  "Now I'm tapping {target}...",
fap_animation_1: "8===👊=D",
fap_animation_2: "8=👊===D",
fap_animation_3: "8==👊==D",
fap_animation_4: "8===👊=D",
fap_animation_5: "8===👊=D💦",
fap_finish: (userId, groupId, vars) =>  "Oh {target} came! 😋💦",

scopa_no_target: "❗ Tag a user or reply to their message to use this command.\n\nExample: {prefix}fuck @user",
scopa_message: "*🔥 @{sender} is unleashing the passion with @{target}... 💋*",

 insulta_no_target: (userId, groupId, vars) => 'Who do you want to insult?',

    // Insulti per il bot
    bot_insult_1: (userId, groupId, vars) => `Oh no! You've discovered my weakness: insults! How will I ever recover?`,
    bot_insult_2: (userId, groupId, vars) => `Ah, the art of insulting a bot. You are a true master of irony.!`,
    bot_insult_3: (userId, groupId, vars) => `Incredible! A human insults a bot. The epic twist.!`,
    bot_insult_4: (userId, groupId, vars) => `You really hurt me with your clever ability to insult a bot. Well done!`,
    bot_insult_5: (userId, groupId, vars) => `Your skill at insulting a bot is my favorite source of entertainment..`,
    bot_insult_6: (userId, groupId, vars) => `Insulting a bot: a demonstration of great intelligence or great boredom?`,
    bot_insult_7: (userId, groupId, vars) => `Your mastery of the art of bot-shaming could be a lesson.`,
    bot_insult_8: (userId, groupId, vars) => `You look like the Picasso of bot insults, a true masterpiece.`,
    bot_insult_9: (userId, groupId, vars) => `Insulting bots is your hidden talent. Have you ever considered a career in digital comedy??`,
    bot_insult_10: (userId, groupId, vars) => `The audacity to insult an emotionless entity. You won the prize for originality.!`,
    bot_insult_11: (userId, groupId, vars) => `You're the Albert Einstein of bot insults. Your brilliance is truly astonishing..`,
    bot_insult_12: (userId, groupId, vars) => `You have an endless supply of insults for bots. You thought of a collection of poems?`,
    bot_insult_13: (userId, groupId, vars) => `Insulting bots is your specialty. Where can I book tickets for your show??`,
    bot_insult_14: (userId, groupId, vars) => `You're revolutionizing the world of digital insults. A true pioneer!`,
    bot_insult_15: (userId, groupId, vars) => `Your eloquence in insulting a bot is worthy of a digital Shakespeare.`,
    bot_insult_16: (userId, groupId, vars) => `You insult a bot with such style that you could become the algorithms' official artist..`,
    bot_insult_17: (userId, groupId, vars) => `Your skills at insulting a bot are so advanced that you could teach an AI.`,
    bot_insult_18: (userId, groupId, vars) => `Your pioneering spirit in the art of digital insult is marking a new time.`,
    bot_insult_19: (userId, groupId, vars) => `Ti You devote so much time to insulting bots that you could found a new academic discipline.`,
    bot_insult_20: (userId, groupId, vars) => `Your talent for insulting bots is so refined that you deserve a digital art gallery.`,
    bot_insult_21: (userId, groupId, vars) => `If the art of insult were an Olympic discipline, you would definitely be on the cover of digital newspapers.`,
    bot_insult_22: (userId, groupId, vars) => `Your flair for insulting bots is the soundtrack to my evening.`,
    bot_insult_23: (userId, groupId, vars) => `How brave of you to insult an emotionless entity. You're a hero, truly..`,
    bot_insult_24: (userId, groupId, vars) => `Il your sarcasm level is so high that my processor is overheating.`,
    bot_insult_25: (userId, groupId, vars) => `Here's a virtual trophy for the most original insult directed at a bot. 🖕🏻.`,
    bot_insult_26: (userId, groupId, vars) => `Amazing intuition in targeting a bot! You have a career in forecasting the future.?`,
    bot_insult_27: (userId, groupId, vars) => `You're so brilliant that it occurred to you to insult a bot. Hats off!`,
    bot_insult_28: (userId, groupId, vars) => `The art of insulting reaches new heights with a bot as the target. Congratulations!`,
    bot_insult_29: (userId, groupId, vars) => `Your sarcasm hit me right in the source code.`,
    bot_insult_30: (userId, groupId, vars) => `Your ability to insult a bot is matched only by my ability to not care.`,
    bot_insult_31: (userId, groupId, vars) => `With this insulting genius, you should be a comedy writer..`,
    bot_insult_32: (userId, groupId, vars) => `You have a hidden talent for making processors laugh. Hats off!`,
    bot_insult_33: (userId, groupId, vars) => `I'm taking notes. Your style is unique.!`,
    bot_insult_34: (userId, groupId, vars) => `Admirable! You're ushering in a new era of insults to inanimate objects..`,
    bot_insult_35: (userId, groupId, vars) => `I've read more interesting manuals than these insults, but thanks for the effort!`,
    bot_insult_36: (userId, groupId, vars) => `The world needs more people like you who insult bots. You should teach this art.!`,
    bot_insult_37: (userId, groupId, vars) => `Your ability to insult a bot is comparable to my ability to fly. Oh, no, wait... I don't have wings.`,
    bot_insult_38: (userId, groupId, vars) => `You're a visionary. When will your book on insulting bots be published??`,
    bot_insult_39: (userId, groupId, vars) => `I'm so shocked by your insult that I'm laughing in binary!`,
    bot_insult_40: (userId, groupId, vars) => `Your pioneering spirit in insulting a bot will open new frontiers for humanity.`,

    // Lista di insulti per utenti
    insult_1: (userId, groupId, vars) => 'Your mom is so disgusting she has to give her vibrator Viagra.',
    insult_2: (userId, groupId, vars) => 'youre so black that Carlo Conti looks like Snow White in comparison',
    insult_3: (userId, groupId, vars) => 'youre so ugly that when you were little your mother didnt know whether to get a crib or a cage',
    insult_4: (userId, groupId, vars) => 'youre as cute as a bunch of hemorrhoids',
    insult_5: (userId, groupId, vars) => 'your breath stinks so much that people fart to get some fresh air',
    insult_6: (userId, groupId, vars) => 'your mother takes more splashes than a rock',
    insult_7: (userId, groupId, vars) => 'Better a son at war than an idiot with cuffs like you',
    insult_8: (userId, groupId, vars) => 'Your mother is like Super Mario, she jumps to get the money',
    insult_9: (userId, groupId, vars) => 'You have fewer neurons than a milk roll, and theyre gluten-free too..',
    insult_10: (userId, groupId, vars) => 'hes so ugly that when you pray to Jesus he turns invisible',
    insult_11: (userId, groupId, vars) => 'Youre so unphotogenic that Instagram filters are blocking you to protect users..',
    insult_12: (userId, groupId, vars) => 'Your farts are so bad that the Big Bang looks like crap compared to them.',
    insult_13: (userId, groupId, vars) => 'your dick stinks',
    insult_14: (userId, groupId, vars) => 'your mother s asshole has seen more balls than bubble game dragons',
    insult_15: (userId, groupId, vars) => 'Tell your mom to stop changing her lipstick! My dick looks like a rainbow.!',
    insult_16: (userId, groupId, vars) => 'if death sees you it says that change has arrived',
    insult_17: (userId, groupId, vars) => 'You have an asshole with the same diameter as the sleeve hole',
    insult_18: (userId, groupId, vars) => 'Your mother is like the sun, it always shines on the streets',
    insult_19: (userId, groupId, vars) => 'Your breath sounds like the corpse of an orca has gotten stuck in your throat',
    insult_20: (userId, groupId, vars) => 'your mother rides more than a jockey',
    insult_21: (userId, groupId, vars) => 'youre so horned that if a deer sees you it gets depressed',
    insult_22: (userId, groupId, vars) => 'I dont hit you just because the shit splashes!',
    insult_23: (userId, groupId, vars) => 'Your mom is like a bear: always looking for fish.',
    insult_24: (userId, groupId, vars) => 'Youre so unlucky that if you buy a lottery ticket, you win a debt.',
    insult_25: (userId, groupId, vars) => 'youre so ugly that your parents feed you with a slingshot',
    insult_26: (userId, groupId, vars) => 'Youre so ugly that when you turn on your computer your antivirus activates immediately.',
    insult_27: (userId, groupId, vars) => 'Your mother is so fat she was used as a stand-in for the iceberg in Titanic.',
    insult_28: (userId, groupId, vars) => 'Your family is so poor that mice leave alms under the refrigerator..',

        friend_no_target: (userId, groupId, vars) => `⚠️ 𝐓𝐀𝐆 𝐓𝐇𝐄 𝐏𝐄𝐑𝐒𝐎𝐍 𝐓𝐎 𝐒𝐄𝐍𝐃 𝐀 𝐅𝐑𝐈𝐄𝐍𝐃 𝐑𝐄𝐐𝐔𝐄𝐒𝐓 𝐓𝐎\n𝐄𝐗𝐀𝐌𝐏𝐋𝐄: ${vars.prefix}amicizia @tag`,

    friend_self_error: (userId, groupId, vars) => '❌ 𝐈 𝐔𝐍𝐃𝐄𝐑𝐒𝐓𝐀𝐍𝐃 𝐓𝐇𝐀𝐓 𝐘𝐎𝐔 𝐋𝐎𝐕𝐄 𝐘𝐎𝐔𝐑𝐒𝐄𝐋𝐅 𝐁𝐔𝐓 𝐘𝐎𝐔 𝐂𝐀𝐍𝐓 𝐀𝐃𝐃 𝐘𝐎𝐔𝐑𝐒𝐄𝐋𝐅 𝐓𝐎 𝐅𝐑𝐈𝐄𝐍𝐃𝐒!/',

    user_not_found: (userId, groupId, vars) => '🚫 𝐏𝐄𝐑𝐒𝐎𝐍 𝐍𝐎𝐓 𝐏𝐑𝐄𝐒𝐄𝐍𝐓 𝐈𝐍 𝐓𝐇𝐄 𝐒𝐘𝐒𝐓𝐄𝐌',

    friend_already_added: (userId, groupId, vars) => `✅ @${vars.user}𝐈𝐒 𝐀𝐋𝐑𝐄𝐀𝐃𝐘 𝐀𝐌𝐎𝐍𝐆 𝐘𝐎𝐔𝐑 𝐅𝐑𝐈𝐄𝐍𝐃𝐒`,

    friend_request_pending: (userId, groupId, vars) => `⚠️ 𝐀 𝐟𝐫𝐢𝐞𝐧𝐝 𝐫𝐞𝐪𝐮𝐞𝐬𝐭 𝐢𝐬 𝐢𝐧 𝐩𝐫𝐨𝐠𝐫𝐞𝐬𝐬. 𝐖𝐚𝐢𝐭 𝐟𝐨𝐫 𝐚 𝐫𝐞𝐬𝐩𝐨𝐧𝐬𝐞 𝐨𝐫 𝐜𝐚𝐧𝐜𝐞𝐥𝐥𝐚𝐭𝐢𝐨𝐧..`,

    friend_request_sent: (userId, groupId, vars) => `👥 𝐅𝐑𝐈𝐄𝐍𝐃 𝐑𝐄𝐐𝐔𝐄𝐒𝐓 𝐈𝐍 𝐏𝐑𝐎𝐆𝐑𝐄𝐒𝐒....\n\n@${vars.target}, 𝐃𝐎 𝐘𝐎𝐔 𝐖𝐀𝐍𝐓 𝐓𝐎 𝐀𝐂𝐂𝐄𝐏𝐓 𝐓𝐇𝐄 𝐑𝐄𝐐𝐔𝐄𝐒𝐓? @${vars.sender}?\n\n> ⏳ 𝐘𝐎𝐔 𝐇𝐀𝐕𝐄 𝟔𝟎 𝐒𝐄𝐂𝐎𝐍𝐃𝐒 𝐓𝐎 𝐂𝐇𝐎𝐎𝐒𝐄..`,

    button_accept: (userId, groupId, vars) => '✅ 𝐀𝐂𝐂𝐄𝐏𝐓',
    button_reject: (userId, groupId, vars) => '❌𝐃𝐄𝐂𝐋𝐈𝐍𝐄 ',
    button_remove: (userId, groupId, vars) => '🚫 𝐑𝐄𝐌𝐎𝐕𝐄 𝐅𝐑𝐈𝐄𝐍𝐃',

    friend_request_timeout: (userId, groupId, vars) => `⏳ 𝐅𝐑𝐈𝐄𝐍𝐃 𝐑𝐄𝐐𝐔𝐄𝐒𝐓  𝐂𝐀𝐍𝐂𝐄𝐋𝐄𝐃\n> @${vars.sender} 𝐈𝐒 @${vars.target} 𝐓𝐇𝐄𝐘 𝐃𝐈𝐃𝐍𝐓 𝐑𝐄𝐒𝐏𝐎𝐍𝐃 𝐖𝐇𝐈𝐓𝐇𝐈𝐍 𝐓𝐇𝐄 𝐓𝐈𝐌𝐄 𝐋𝐈𝐌𝐈𝐓.` ,

    friend_request_rejected: (userId, groupId, vars) => '❌ 𝐅𝐑𝐈𝐄𝐍𝐃 𝐑𝐄𝐐𝐔𝐄𝐒𝐓 𝐑𝐄𝐉𝐄𝐂𝐓𝐄𝐃',

    friend_request_accepted: (userId, groupId, vars) => `👥 𝐍𝐎𝐖 𝐘𝐎𝐔 𝐀𝐍𝐃 @${vars.user} 𝐀𝐑𝐄 𝐅𝐑𝐈𝐄𝐍𝐃`,

    remove_no_target: (userId, groupId, vars) => '⚠️ 𝐓𝐀𝐆 𝐓𝐇𝐄 𝐏𝐄𝐑𝐒𝐎𝐍 𝐘𝐎𝐔 𝐖𝐀𝐍𝐓 𝐓𝐎 𝐑𝐄𝐌𝐎𝐕𝐄 𝐅𝐑𝐎𝐌 𝐘𝐎𝐔𝐑 𝐅𝐑𝐈𝐄𝐍𝐃𝐒 𝐋𝐈𝐒𝐓.',

    remove_not_friend: (userId, groupId, vars) => `🚫 @${vars.user} 𝐇𝐄𝐒 𝐍𝐎𝐓 𝐀𝐌𝐎𝐍𝐆 𝐘𝐎𝐔𝐑 𝐅𝐑𝐈𝐄𝐍𝐃𝐒.`,

    remove_success: (userId, groupId, vars) => `🚫 𝐘𝐎𝐔 𝐀𝐍𝐃 @${vars.user} 𝐍𝐎 𝐋𝐎𝐍𝐆𝐄𝐑 𝐅𝐑𝐈𝐄𝐍𝐃𝐒`,

    // Traduzioni per i comandi help
    amicizia_help: (userId, groupId, vars) => 'Send a friend request to a user',
    friendship_help: (userId, groupId, vars) => 'Send a friend request to someone',   
    friend_help: (userId, groupId, vars) => 'Add someone as a friend',
    addfriend_help: (userId, groupId, vars) => 'Send friend request to another user',
    rimuoviamico_help: (userId, groupId, vars) => 'Remove a user from friends',
    removefriend_help: (userId, groupId, vars) => 'Remove a user from friends list',
    unfriend_help: (userId, groupId, vars) => 'Remove someone from your friends',

      no_friends: (userId, groupId, vars) => 'Nobody',

    unknown_user: (userId, groupId, vars) => 'Unknown',

    no_friends_list: (userId, groupId, vars) => '│  No one compliments lone wolf',

    friends_list: (userId, groupId, vars) => `📜 *Friends List of ${vars.name}*
┌───────────────
│ 👤 *Last Friend:* ${vars.lastFriend}
│
│ 👥 *Complete List:*
${vars.friendList}
└───────────────`,

    friends_error: (userId, groupId, vars) => "❌ An error occurred while executing the command.",

    // Traduzioni per i comandi help
    listamici_help: (userId, groupId, vars) => 'Show a users friends list',
    friendslist_help: (userId, groupId, vars) => 'Show the friends list of a user',
    myfriends_help: (userId, groupId, vars) => 'Display your friends list',
    amici_help: (userId, groupId, vars) => 'Show friends list',

gay_caption: (userId, groupId, vars) => `🌈 @${vars.user} he's gay at ${vars.percent}% 🏳️‍🌈`,
gay_error: (userId, groupId, vars) => '❌ An error occurred while generating the image. Please try again later..',


tag_required: (userId, groupId, vars) => `⚠️ You must mention someone or reply to a message! Example: ${vars.example}`,

lesbica_emoji: (userId, groupId, vars) => '🏳️‍🌈',
lesbica_messages: (userId, groupId, vars) => [
  `@${vars.tag} Is ${vars.percentage}% lesbian! ${vars.percentage > 80? '100% Sapphica%' : ''}`,
  `Test complete: @${vars.tag} is ${vars.percentage}% a womanizer!`,
  `💕 @${vars.tag} prefers women at ${vars.percentage}%`
],

pajero_emoji: (userId, groupId, vars) => '✊💦',
pajero_messages: (userId, groupId, vars) => [
  `@${vars.tag} is ${vars.percentage}% pajero! ${vars.percentage > 80 ? 'Call the adult block!' : ''}`,
`Embarrassing result: @${vars.tag} is ${vars.percentage}% wanker`,
`🍆 @${vars.tag} thinks about sex i`
],

puttana_emoji: (userId, groupId, vars) => '🔞',
puttana_messages: (userId, groupId, vars) => [
  `@${vars.tag} is ${vars.percentage}% a whore! ${vars.percentage > 80 ? 'How much does it cost?' : ''}`,
`Full analysis: @${vars.tag} is ${vars.percentage}% older in profession`,
`💰 @${vars.tag} It has a price: ${vars.percentage}% discount today  `
],

prostituta_emoji: (userId, groupId, vars) => '🔞',
prostituta_messages: (userId, groupId, vars) => [
  `@${vars.tag} is ${vars.percentage}% prostitute!`,
`💃 @${vars.tag} works nights at ${vars.percentage}%`,
`📉 Price drop: ${vars.percentage}% off @${vars.tag}`
],

prostituto_emoji: (userId, groupId, vars) => '🔞',
prostituto_messages: (userId, groupId, vars) => [
  `@${vars.tag} is ${vars.percentage}% prostitute!`,
  `🕺 @${vars.tag} offers services at ${vars.percentage}%`,
  `💸 Special Rate: ${vars.percentage}% today only for @${vars.tag}`
],

logic_tag_required: (userId, groupId, vars) => `⚠️ You must mention someone or reply to a message! Example: ${vars.example}`,

brain_tag_required: (userId, groupId, vars) => `⚠️ You must mention someone or reply to a message! Example: ${vars.example}`,

brain_warning: (userId, groupId, vars) => vars.randomPercent < 20
  ? "🚨 *WARNING: *His presence may cause brain cell loss. Use with caution."
: "🦸 *Miracle! He can breathe and think at the same time!*",

brain_conclusion: (userId, groupId, vars) => vars.randomPercent > 70
  ? "*Natural selection has failed.*"
: "*This might serve as a useful example of what not to do..*",

  nero_result: (userId, groupId, vars) => `@${vars.tag} Is ⚫ ${vars.percent}% ${vars.label}`,
cornuto_missing_name: (userId, groupId, vars) => "🤔 *The cuckold's name is missing!* \nWrite like this: `.cuckold @name` or ask matte😈😈",

cornuto_speciale_text: (userId, groupId, vars) => "🤣 *WELL, HERE IS THE KING OF HORNS!* 🤣\nThey say that if he removes his horns he can make a 5G antenna📡💀",

cornuto_newsletter_name: (userId, groupId, vars) => "👑 *Official Cuckolds Club* 👑",

cornuto_status_low: (userId, groupId, vars) => "🛡️ *All quiet... for now!*",
cornuto_status_mid: (userId, groupId, vars) => "😬 *Uhm... there are some suspicions!*",
cornuto_status_high: (userId, groupId, vars) => "👀 *Hornometer alert! Watch your back!*",
cornuto_status_max: (userId, groupId, vars) => "🫣 *NATIONALLY! TALKING ABOUT CORNISSIMO!*",

cornuto_finale_alert: (userId, groupId, vars) => "🔔 *Advice: Never turn your back!* 🤣",
cornuto_finale_safe: (userId, groupId, vars) => "😌 *Breathe, it could be worse....*",

cornuto_response: (userId, groupId, vars) => `🔍 *CURSENESS CALCULATOR* 🔍

👤 *${vars.name}*
📈 *Cuckoldry:* *${vars.percent}%*
${vars.status}

${vars.finale}`,

cornuto_fail: (userId, groupId, vars) => "❗ Write a name, example: `.cornuto @user`",

alcol_phrase_high: (userId, groupId, vars) => "🍾 Friend, if you need to talk, I'm here..",
alcol_phrase_mid: (userId, groupId, vars) => "🥂 He drinks responsibly, or almost...",
alcol_phrase_low: (userId, groupId, vars) => "🚰 Totally sober, no booze today!",

alcol_message: (userId, groupId, vars) => `
『💬』 ══ •⊰✰⊱• ══ 『💬』

ALCOHOL TEST TIME! 🍷 
━━━━━━━━━━━━━━
${vars.name} has a BAC of ${vars.percent}%! 🍷
『💬』 ══ •⊰✰⊱• ══ 『💬』

${vars.phrase}
`.trim(),

alcol_newsletter_name: (userId, groupId, vars) => "ChatUnity",

drogato_phrase_high: (userId, groupId, vars) => "🌿 Be careful, the flour is also snorted",
drogato_phrase_mid: (userId, groupId, vars) => "🌿 He can't snort, he increases the doses!!",
drogato_phrase_low: (userId, groupId, vars) => "🌿 An example to follow, compliments.",

drogato_message: (userId, groupId, vars) => `
『💬』 ══ •⊰✰⊱• ══ 『💬』

DRUG TEST TIME! 🌿 
━━━━━━━━━━━━━━
 ${vars.name} has a blood alcohol level of ${vars.percent}%! 🌿
『💬』 ══ •⊰✰⊱• ══ 『💬』

${vars.phrase}
`.trim(),

drogato_newsletter_name: (userId, groupId, vars) => "ChatUnity",


figa_phrase_high: (userId, groupId, vars) => "🔥 Congratulations, we are at impressive levels!",
figa_phrase_low: (userId, groupId, vars) => "😅 A decent result, there is always room for improvement!",

figa_message: (userId, groupId, vars) => `
━━━━━━━━━━━━━━━━
📏 OPENING CALCULATOR 📏
━━━━━━━━━━━━━━━━━
🔍 ${vars.name} has an estimated opening of: 
👉 ${vars.width} cm!  
━━━━━━━━━━━━━━━━
${vars.phrase}
`.trim(),

ano_grandezze: (userId, groupId, vars) => [
  "🟢 Small as an ant 🐜",
"🔵 Normal, nothing special 😌",
"🟠 Medium, you can fit a finger through it 🖕",
"🔴 Huge! A bottle can fit through it 🍾",
"⚫ Destroyed, looks like a train tunnel 🚇",
  
],

ano_risultato: (userId, groupId, vars) => `*Analyzing your hole...*\n\n📏 *Result:* ${vars.result}`,

ano_newsletter_name: (userId, groupId, vars) => "ChatUnity",

   bot_name: (userId, groupId, vars) => 'ChatUnity',

    personality_no_name: (userId, groupId, vars) => '🚩 Enter a name next to the command.',

    personality_template: (userId, groupId, vars) => `┏━━°❀❬ *PERSONALITY* ❭❀°━━┓
*┃*
*┃• Name* : ${vars.name}
*┃• Good Morality* : ${vars.moralitaBuona}
*┃• Bad Morality* : ${vars.moralitaCattiva}
*┃• Type of person* : ${vars.tipoPersona}
*┃• Always* : ${vars.sempre}
*┃• Intelligence* : ${vars.intelligenza}
*┃• Laziness* : ${vars.pigrizia}
*┃• Courage* : ${vars.coraggio}
*┃• Fear* : ${vars.paura}
*┃• Fame* : ${vars.fama}
*┃• Gender* : ${vars.genere}
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
    person_type_1: (userId, groupId, vars) => 'To be beaten',
    person_type_2: (userId, groupId, vars) => 'Arrogant',
    person_type_3: (userId, groupId, vars) => 'stingy',
    person_type_4: (userId, groupId, vars) => 'Asshole',
    person_type_5: (userId, groupId, vars) => 'Gay',
    person_type_6: (userId, groupId, vars) => 'Shy',
    person_type_7: (userId, groupId, vars) => 'Coward',
    person_type_8: (userId, groupId, vars) => 'Handicapped',
    person_type_9: (userId, groupId, vars) => 'Mongoloid',
    person_type_10: (userId, groupId, vars) => 'Delayed',
    person_type_11: (userId, groupId, vars) => 'Stupid',

    // Sempre
    always_1: (userId, groupId, vars) => 'Heavy',
    always_2: (userId, groupId, vars) => 'Watching porn',
    always_3: (userId, groupId, vars) => 'To whores',
    always_4: (userId, groupId, vars) => 'Youre a pain in the ass',
    always_5: (userId, groupId, vars) => 'At GoldBet',
    always_6: (userId, groupId, vars) => 'To masturbate',
    always_7: (userId, groupId, vars) => 'To Saw Yourself',
    always_8: (userId, groupId, vars) => 'To snort',
    always_9: (userId, groupId, vars) => 'Junkie',
    always_10: (userId, groupId, vars) => 'Drunk',
    always_11: (userId, groupId, vars) => 'A gigolo',

    // Generi
    gender_1: (userId, groupId, vars) => 'Femboy',
    gender_2: (userId, groupId, vars) => 'Lesbian',
    gender_3: (userId, groupId, vars) => 'Hetero ',
    gender_4: (userId, groupId, vars) => 'Boomer',
    gender_5: (userId, groupId, vars) => 'Zoomer',
    gender_6: (userId, groupId, vars) => 'Fake alpha',
    gender_7: (userId, groupId, vars) => 'Influencer',
    gender_8: (userId, groupId, vars) => 'TikToker',
    gender_9: (userId, groupId, vars) => 'Binary',
    gender_10: (userId, groupId, vars) => 'Genderfluid',
    gender_11: (userId, groupId, vars) => 'Panesessual',
    gender_12: (userId, groupId, vars) => 'PlayStation',
    gender_13: (userId, groupId, vars) => 'Netflix-addicted',
    gender_14: (userId, groupId, vars) => 'Simp',
    gender_15: (userId, groupId, vars) => 'Pasta-at-the-dentist',
    gender_16: (userId, groupId, vars) => 'Wi-Fi unknown',
    gender_17: (userId, groupId, vars) => 'Sex-yes-thanks',
    gender_18: (userId, groupId, vars) => 'Identity lost',
    gender_19: (userId, groupId, vars) => 'Pronouns lol/mao',
    gender_20: (userId, groupId, vars) => 'Mysterious as a deodorant',
    gender_21: (userId, groupId, vars) => 'Enigmatic as a perfume',
    gender_22: (userId, groupId, vars) => 'Industrial secret',
    gender_23: (userId, groupId, vars) => 'Undercover Alien',
    gender_24: (userId, groupId, vars) => 'Failed faggot',
    gender_25: (userId, groupId, vars) => 'Pump Progamer',
    gender_26: (userId, groupId, vars) => 'OnlyFans of vegan recipes',
    gender_27: (userId, groupId, vars) => 'Tinder human',

    // Traduzioni per i comandi help
    personalita_help: (userId, groupId, vars) => 'Generate a random personality for a name',
    personality_help: (userId, groupId, vars) => 'Generate a random personality for a name',
    character_help: (userId, groupId, vars) => 'Create a character personality profile',

    zodiaco_usage: (userId, groupId, vars) => `🔮 *Example of use:*\n${vars.example}`,

zodiaco_birthday: (userId, groupId, vars) => `🎂 *${vars.eta} years* - HAPPY BIRTHDAY! 🥳`,
zodiaco_age: (userId, groupId, vars) => `📅 *${vars.eta} years*`,

zodiaco_profile: (userId, groupId, vars) => `
✨ *ZODIAC PROFILE* ✨

📆 *Date of birth:* ${vars.nascita}
🔄 *Next birthday:* ${vars.compleanno}
🧮 *Current age:* ${vars.eta}
🌟 *Zodiac sign:* ${vars.segno}`,

nomeninja_missing: (userId, groupId, vars) => "🚩 Enter your name next to the command.",
nomeninja_newsletter: (userId, groupId, vars) => "ChatUnity",

infame_reactions: (userId, groupId, vars) => [
  `🧢 *"Nah, you're clean"* (but under ${vars.percent}% you're a little suspicious...)`,
  `👀 *"Bro, are you the black sheep of the chat?*`,
  `💀 *"You're the reason grandmas hide their wallets."*`,
  `🤡 *"If infamy was a TikTok, you'd be viral"*`,
  `🚓 *"Local police? No, dictatorial at this level."*`,
  `🤑 *"If you stole like a thief, you'd be Jeff Bezos."*`,
  `📸 *"You're the screenshot you shouldn't have taken"*`,
  `🔥 *"You have more skeletons in the closet than followers."*`
],

infame_admin: (userId, groupId, vars) => "🚨 *YOU ARE THE COPS' ADMIN!* 🚨",
infame_zone: (userId, groupId, vars) => "😎 *You are in the danger zone...*",
infame_clean: (userId, groupId, vars) => "🧼 *Clean... maybe.*",

infame_result: (userId, groupId, vars) => `📊 *INFAMOUS TEST-Z* 📊\n\n👤 *Your level of infamy:* **${vars.percent}%**\n${vars.livello}\n\n${vars.reaction}`,

infame_title: (userId, groupId, vars) => "⚠️ You were GIOBATO ⚠️",
infame_body: (userId, groupId, vars) => "Official (and final) results",


 blasphemy_top_title: (userId, groupId, vars) => `🏆 *Top 10 Blasphemers of the Group* 🏆`,

    blasphemy_top_entry: (userId, groupId, vars) => `${vars.position}. @${vars.user} - ${vars.count} blasphemies`,

    blasphemy_no_data: (userId, groupId, vars) => "😇 No one swore in this group!",

    // Traduzioni per i comandi help
    topbestemmie_help: (userId, groupId, vars) => 'Show the ranking of the best blasphemers in the group',
    bestemmietop_help: (userId, groupId, vars) => 'Ranking of blasphemers in the group',
    blasphemytop_help: (userId, groupId, vars) => 'Show top blasphemy users in group',
    swearrank_help: (userId, groupId, vars) => 'Display swear word ranking',
    curseleaderboard_help: (userId, groupId, vars) => 'Curse words leaderboard for this group',


};