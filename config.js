import { watchFile, unwatchFile } from 'fs';
import chalk from 'chalk';
import fs from 'fs';
import { fileURLToPath } from 'url';

global.botnumber = '';
global.confirmCode = '';
global.nomebot = '𝐂𝐡𝐚𝐭𝐔𝐧𝐢𝐭𝐲-𝐁𝐨𝐭';
global.packname = '𝐂𝐡𝐚𝐭𝐔𝐧𝐢𝐭𝐲-𝐁𝐨𝐭';
global.author = '𝐌𝐝';
global.vs = '7.2';
global.wm = global.nomebot;
global.wait = 'ⓘ 𝐂𝐚𝐫𝐢𝐜𝐚𝐦𝐞𝐧𝐭𝐨 ...';


global.owner = [
  ['393773842461', '𝐂𝐡𝐚𝐭𝐔𝐧𝐢𝐭𝐲', true],
  ['421233456345', 'Kinderino', true],
  ['66621409462', 'matte', true],
  ['393509368693', 'Gab', true],
  ['393533869409', 'Kekko', true],
  ['393445461546', 'kekko 2', true],
  ['xxxxxxxxxx']
];
global.mods = ['xxxxxxxxxx'];
global.prems = ['xxxxxxxxxx', 'xxxxxxxxxx'];


const pickRandom = arr => arr[Math.floor(Math.random() * arr.length)];

global.keysZens = ['c2459db922', '37CC845916', '6fb0eff124'];
global.keysxteammm = ['29d4b59a4aa687ca', '5LTV57azwaid7dXfz5fzJu', 'cb15ed422c71a2fb', '5bd33b276d41d6b4', 'HIRO', 'kurrxd09', 'ebb6251cc00f9c63'];
global.keysneoxrrr = ['5VC9rvNx', 'cfALv5'];
global.lolkeysapi = ['BrunoSobrino'];

global.keysxxx = pickRandom(global.keysZens);
global.keysxteam = pickRandom(global.keysxteammm);
global.keysneoxr = pickRandom(global.keysneoxrrr);

global.APIs = {
  xteam: 'https://api.xteam.xyz',
  nrtm: 'https://fg-nrtm-nhie.onrender.com',
  bg: 'http://bochil.ddns.net',
  fgmods: 'https://api-fgmods.ddns.net',
  dzx: 'https://api.dhamzxploit.my.id',
  lol: 'https://api.lolhuman.xyz',
  violetics: 'https://violetics.pw',
  neoxr: 'https://api.neoxr.my.id',
  zenzapis: 'https://zenzapis.xyz',
  akuari: 'https://api.akuari.my.id',
  akuari2: 'https://apimu.my.id'
};

global.APIKeys = {
  'https://api.xteam.xyz': global.keysxteam,
  'https://api.lolhuman.xyz': '85faf717d0545d14074659ad',
  'https://api.neoxr.my.id': global.keysneoxr,
  'https://violetics.pw': 'beta'
};

global.multiplier = 69;
global.maxwarn = '4';


global.flaaa = [
  'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=water-logo&fontsize=100&scaleWidth=800&scaleHeight=500&fillTextColor=%23000&shadowGlowColor=%23000&backgroundColor=%23000&text=',
  'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=crafts-logo&fontsize=90&scaleWidth=800&scaleHeight=500&text=',
  'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=amped-logo&scaleWidth=800&scaleHeight=500&text=',
  'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&fontsize=100&fillTextType=1&fillTextPattern=Warning!&scaleWidth=800&scaleHeight=500&text=',
  'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&fontsize=100&fillTextType=1&fillTextPattern=Warning!&fillColor1Color=%23f2aa4c&fillOutlineColor=%23f2aa4c&backgroundColor=%23101820&scaleWidth=800&scaleHeight=500&text='
];

const file = fileURLToPath(import.meta.url);
watchFile(file, () => {
  unwatchFile(file);
  console.log(chalk.redBright("🔄 Config aggiornato: 'config.js'"));
  import(`${file}?update=${Date.now()}`);
});
