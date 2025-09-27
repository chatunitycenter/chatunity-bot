//Plugins fatto da Gabs333 Velocizzato
import fs from 'fs'
import path from 'path'

const handler = async (m, { conn, args, command }) => {
    try {
        if (!args[0]) throw new Error('Scrivi il nome dello script, esempio: .offscript info');

        let file = args[0].endsWith('.js') ? args[0] : args[0] + '.js';
        const filePath = path.join('./plugins', file);
        
        if (!fs.existsSync(filePath)) throw new Error('File non trovato.');

        let content = fs.readFileSync(filePath, 'utf-8');

        if (command === 'offscript') {
            if (content.includes('/*') && content.includes('*/')) {
                throw new Error('Script è già spento.');
            }
            
            const lines = content.split('\n');
            const preservedLine = lines.find(line => line.includes('Plugin fatto da Gabs & 333 Staff'));
            const restLines = lines.filter(line => !line.includes('Plugin fatto da Gabs & 333 Staff'));
            const newContent = `${preservedLine || ''}\n/*\n${restLines.join('\n')}\n*/`;
            
            fs.writeFileSync(filePath, newContent);
            return m.reply(`Script ${file} spento.`);
        }

        if (command === 'onscript') {
            const newContent = content.replace(/^\/\*/gm, '').replace(/\*\/$/gm, '');
            fs.writeFileSync(filePath, newContent.trim());
            return m.reply(`Script ${file} riattivato.`);
        }

    } catch (e) {
        if (e.message && (e.message.includes('Scrivi il nome') || e.message.includes('File non') || e.message.includes('già spento'))) {
            return m.reply(e.message);
        }
        
        console.error('[SCRIPT_TOGGLE_ERROR]', e);
        return m.reply('Errore durante la modifica dello script.');
    }
};

handler.command = /^(offscript|onscript)$/i;
handler.rowner = true;

export default handler;