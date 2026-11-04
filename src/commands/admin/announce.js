const Announcer = require('../../adapters/discord/Announcer');
const { TYPES, isValidType } = require('../../adapters/discord/EmbedTemplates');

const reply = (message, content) => message.reply({ content, allowedMentions: { repliedUser: false } });
const list = s => s.split(';').map(x => x.trim()).filter(Boolean);

/**
 * Formato:
 *   d!announce version 1.2.0 | novedad 1 ; novedad 2 | mejora 1 | corrección 1
 *   d!announce update Título | descripción
 *   d!announce maintenance Título | inicio | duración | impacto
 */
function parse(type, text) {
    const parts = text.split('|').map(p => p.trim());
    if (type === 'version') {
        const [version, features, improvements, fixes] = parts;
        return version ? { version, features: list(features || ''), improvements: list(improvements || ''), fixes: list(fixes || '') } : null;
    }
    if (type === 'maintenance' || type === 'incident') {
        const [title, start, duration, impact] = parts;
        return title ? { title, start, duration, impact } : null;
    }
    const [title, description] = parts;
    return title ? { title, description } : null;
}

module.exports = {
    name: 'announce',
    parse,

    async execute(message, args) {
        // Solo el propietario del bot puede lanzar anuncios manuales.
        if (!process.env.OWNER_ID || message.author.id !== process.env.OWNER_ID) {
            return reply(message, '❌ Este comando es solo para el propietario.');
        }

        const type = args[0]?.toLowerCase();
        if (!isValidType(type)) {
            return reply(message, `❌ Tipos válidos: ${Object.keys(TYPES).map(t => `\`${t}\``).join(', ')}.`);
        }

        const data = parse(type, args.slice(1).join(' '));
        if (!data) return reply(message, '❌ Faltan datos. Ejemplo: `d!announce version 1.2.0 | novedad 1 ; novedad 2 | mejora | corrección`');

        const result = await Announcer.announce(message.client, message.guild.id, type, data);
        const reasons = {
            'sin-canal': `Configura antes el canal con \`d!setannounce ${type} #canal\`.`,
            'canal-no-disponible': 'El canal configurado ya no existe.',
            'sin-permisos': 'No tengo permisos para escribir con embeds en ese canal.',
            'error-envio': 'Discord rechazó el envío.'
        };
        return reply(message, result.ok ? '✅ Anuncio enviado.' : `❌ No se envió: ${reasons[result.reason] || result.reason}`);
    }
};
