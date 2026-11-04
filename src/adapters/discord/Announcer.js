// Draxe GPT - Envío de anuncios (embeds) al canal configurado de cada servidor.

const { PermissionFlagsBits } = require('discord.js');
const Config = require('../../core/services/ConfigurationService');
const Logging = require('../../core/services/LoggingService');
const Templates = require('./EmbedTemplates');

const channelKey = type => `announce:${type}:channel`;
const roleKey = type => `announce:${type}:role`;

function configure(guildId, type, channelId, roleId) {
    Config.set('discord', guildId, channelKey(type), channelId);
    if (roleId) Config.set('discord', guildId, roleKey(type), roleId);
    else Config.unset('discord', guildId, roleKey(type));
}

function disable(guildId, type) {
    Config.unset('discord', guildId, channelKey(type));
    Config.unset('discord', guildId, roleKey(type));
}

/** Devuelve { ok, reason } y nunca lanza por errores de envío. */
async function announce(client, guildId, type, data) {
    if (!Templates.isValidType(type)) return { ok: false, reason: 'tipo-invalido' };

    const channelId = Config.get('discord', guildId, channelKey(type));
    if (!channelId) return { ok: false, reason: 'sin-canal' };

    const guild = client.guilds.cache.get(guildId);
    const channel = guild?.channels.cache.get(channelId);
    if (!channel || !channel.isTextBased()) return { ok: false, reason: 'canal-no-disponible' };

    const perms = channel.permissionsFor(guild.members.me);
    if (!perms?.has([PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.EmbedLinks])) {
        return { ok: false, reason: 'sin-permisos' };
    }

    const roleId = Config.get('discord', guildId, roleKey(type));
    try {
        await channel.send({
            content: roleId ? `<@&${roleId}>` : undefined,
            embeds: [Templates.build(type, data)],
            // Solo se puede mencionar el rol configurado, nunca @everyone.
            allowedMentions: roleId ? { roles: [roleId] } : { parse: [] }
        });
    } catch (err) {
        Logging.error({ platform: 'discord', contextId: guildId, category: 'anuncios', title: `No se pudo enviar el anuncio: ${err.message}` });
        return { ok: false, reason: 'error-envio' };
    }

    Logging.info({ platform: 'discord', contextId: guildId, category: 'anuncios', title: `Anuncio enviado: ${type}`, description: data.version ? `Versión ${data.version}` : data.title });
    return { ok: true };
}

module.exports = { announce, configure, disable, channelKey, roleKey };
