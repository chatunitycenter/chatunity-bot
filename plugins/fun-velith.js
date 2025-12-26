// plugin fatto da Death
let handler = async (m, { conn, command, text }) => {
  const message = `𝕍𝕖𝕝𝕚𝕥𝕙 é 𝕝𝕒 𝕞𝕠𝕘𝕝𝕚𝕖 𝕕𝕚 𝔹𝕝𝕠𝕠𝕕, 𝕚𝕟𝕥𝕠𝕔𝕔𝕒𝕓𝕚𝕝𝕖 𝕤𝕠𝕥𝕥𝕠 𝕥𝕦𝕥𝕥𝕚 𝕚 𝕡𝕦𝕟𝕥𝕚 𝕕𝕚 𝕧𝕚𝕤𝕥𝕒.  
𝕄𝕖𝕘𝕝𝕚𝕠 𝕡𝕖𝕣 𝕧𝕠𝕚 𝕤𝕥𝕒𝕣𝕖 𝕝𝕠𝕟𝕥𝕒𝕟𝕚 𝕡𝕖𝕣𝕔𝕙é 𝔹𝕝𝕠𝕠𝕕 𝕧𝕚 𝕕𝕚𝕤𝕥𝕣𝕦𝕘𝕘𝕖 𝕤𝕖𝕟𝕫𝕒 𝕡𝕚𝕖𝕥à.  
𝕆𝕔𝕔𝕙𝕚𝕠 𝕔𝕙𝕖 𝕤𝕖 𝕝𝕒 𝕥𝕠𝕔𝕔𝕒𝕥𝕖 𝔹𝕝𝕠𝕠𝕕 𝕟𝕠𝕟 𝕘𝕦𝕒𝕣𝕕𝕒 𝕚𝕟 𝕗𝕒𝕔𝕔𝕚𝕒 𝕟𝕖𝕤𝕤𝕦𝕟𝕠.`;
  // manda il messaggio nella chat dove il comando è stato usato, citandolo
  await conn.sendMessage(m.chat, { text: message }, { quoted: m });
};

handler.help = ['velith'];
handler.tags = ['fun'];
handler.command = /^velith|mogliediblood$/i;

export default handler;