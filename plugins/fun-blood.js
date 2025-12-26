// plugin fatto da Death
let handler = async (m, { conn, command, text }) => {
  const message = `𝔹𝕝𝕠𝕠𝕕 é 𝕚𝕝 𝕔𝕒𝕥𝕒𝕟𝕖𝕤𝕖 𝕡𝕚ù 𝕤𝕚𝕞𝕡𝕒𝕥𝕚𝕔𝕠 𝕕𝕖𝕝𝕝𝕖 𝕔𝕠𝕞𝕞, 𝕚𝕝 𝕞𝕚𝕠 𝕞𝕚𝕘𝕝𝕚𝕠𝕣𝕖 𝕒𝕞𝕚𝕔𝕠 𝕖 𝕚𝕝 𝕞𝕒𝕣𝕚𝕥𝕠 𝕕𝕚 𝕍𝕖𝕝𝕚𝕥𝕙.  
ℕ𝕠𝕟 𝕝𝕠 𝕗𝕒𝕥𝕖 𝕚𝕟𝕔𝕒𝕫𝕫𝕒𝕣𝕖 𝕠 𝕧𝕚 𝕤𝕒𝕝𝕥𝕒𝕟𝕠 𝕚 𝕟𝕦𝕞𝕖𝕣𝕚 𝕖 𝕡𝕒𝕣𝕥𝕠𝕟𝕠 𝕚 𝕕𝕠𝕩𝕩 𝕕𝕠𝕧𝕖 𝕧𝕚 𝕡𝕣𝕖𝕟𝕕𝕖 𝕡𝕦𝕣𝕖 𝕚 𝕡𝕖𝕝𝕚 𝕕𝕖𝕝 𝕔𝕦𝕝𝕠.`;
  // manda il messaggio nella chat dove il comando è stato usato, citandolo
  await conn.sendMessage(m.chat, { text: message }, { quoted: m });
};

handler.help = ['blood'];
handler.tags = ['fun'];
handler.command = /^blood|maritodivelith$/i;

export default handler;