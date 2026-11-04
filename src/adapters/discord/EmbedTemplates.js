// Draxe GPT - Plantillas de embeds para anuncios automáticos.
// Funciones puras: reciben datos y devuelven un EmbedBuilder. No envían nada.

const { EmbedBuilder } = require('discord.js');

const TYPES = {
    version:     { color: 0x5865F2, label: 'Nueva versión',  icon: '🚀' },
    update:      { color: 0x5865F2, label: 'Actualización',  icon: '🛠️' },
    maintenance: { color: 0xF0B232, label: 'Mantenimiento',  icon: '🔧' },
    incident:    { color: 0xED4245, label: 'Incidencia',     icon: '🚨' },
    minecraft:   { color: 0x57F287, label: 'Minecraft',      icon: '⛏️' }
};

const SECTIONS = [
    ['features', '✨ Novedades'],
    ['improvements', '🛠️ Mejoras'],
    ['fixes', '🐞 Correcciones'],
    ['breaking', '⚠️ Cambios importantes']
];

const cut = (text, max) => {
    const s = String(text ?? '').trim();
    return s.length > max ? s.slice(0, max - 1) + '…' : s;
};

const bullets = items =>
    cut((items || []).filter(Boolean).slice(0, 12).map(i => `• ${cut(i, 180)}`).join('\n'), 1024);

function isValidType(type) {
    return Object.prototype.hasOwnProperty.call(TYPES, type);
}

/**
 * data (todos opcionales salvo title/version según el tipo):
 *   version, title, description, date (ISO), url,
 *   features[], improvements[], fixes[], breaking[],
 *   start, duration, impact        (mantenimiento / incidencia)
 *   server, gameVersion            (minecraft)
 */
function build(type, data = {}) {
    if (!isValidType(type)) throw new Error(`Tipo de anuncio desconocido: ${type}`);
    const t = TYPES[type];

    const title = type === 'version'
        ? `${t.icon} Draxe GPT v${cut(data.version || '?', 32)}`
        : `${t.icon} ${cut(data.title || t.label, 240)}`;

    const embed = new EmbedBuilder()
        .setColor(t.color)
        .setAuthor({ name: `⚡ Draxe GPT • ${t.label}` })
        .setTitle(title)
        .setFooter({ text: 'Draxe GPT • Novedades' })
        .setTimestamp(data.date ? new Date(data.date) : new Date());

    if (data.url) embed.setURL(data.url);
    if (data.description) embed.setDescription(cut(data.description, 2000));

    for (const [key, name] of SECTIONS) {
        const value = bullets(data[key]);
        if (value) embed.addFields({ name, value });
    }

    if (type === 'maintenance' || type === 'incident') {
        const extra = [['🕒 Inicio', data.start], ['⏱️ Duración', data.duration], ['📌 Impacto', data.impact]];
        for (const [name, value] of extra) {
            if (value) embed.addFields({ name, value: cut(value, 1024), inline: true });
        }
    }

    if (type === 'minecraft') {
        if (data.server) embed.addFields({ name: '🎮 Servidor', value: cut(data.server, 256), inline: true });
        if (data.gameVersion) embed.addFields({ name: '🔖 Versión del juego', value: cut(data.gameVersion, 64), inline: true });
    }

    return embed;
}

module.exports = { TYPES, build, isValidType };
