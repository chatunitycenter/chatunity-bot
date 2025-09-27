
import {performance} from 'perf_hooks';
const handler = async (m, {conn, text}) => {
const start = performance.now();    
const end = performance.now();
const executionTime = (end - start);
async function loading() {
var hawemod = [
    "Iniettando Malware",
    " █ 10%",
    " █ █ 20%",
    " █ █ █ 30%",
    " █ █ █ █ 40%",
    " █ █ █ █ █ 50%",
    " █ █ █ █ █ █ 60%",
    " █ █ █ █ █ █ █ 70%",
    " █ █ █ █ █ █ █ █ 80%",
    " █ █ █ █ █ █ █ █ █ 90%",
    " █ █ █ █ █ █ █ █ █ █ 100%",
    "Violazione del sistema in corso.. \n Connessione al server errore 404 ",
    "Dispositivo connesso con successo... \n Ricezione dati...",
    "Dati sottratti dal dispositivo 100% completato \n Eliminazione di tutte le prove ed eliminazione di tutti i malware...",
    " HACKING COMPLETATO ",
    " INVIO DEI LOG...",
    " DATI INVIATI CON SUCCESSO E Connessione disconnessa",
    "REGISTRI PULITI"
  ];
      let { key } = await conn.sendMessage(m.chat, {text: `*☠ ¡¡Avvio del doxxing!! ☠*`}, {quoted: m})
 for (let i = 0; i < hawemod.length; i++) {
   await new Promise(resolve => setTimeout(resolve, 1000)); 
   await conn.sendMessage(m.chat, {text: hawemod[i], edit: key}, {quoted: m}); 
  }     
 }
loading()    
};
handler.help = ['doxxing <nome> | <@tag>'];
handler.tags = ['divertimento'];
handler.command = ['dox']
handler.group = true


export default handler;

function getRandomValue(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}