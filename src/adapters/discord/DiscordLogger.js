// Draxe - Adapter de Discord para el registro automatico.
// Traduce eventos de discord.js a entradas del LoggingService (core)
// y entrega las entradas como embeds en el canal de registro del servidor.

const { EmbedBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');
const Logging = require('../../core/services/LoggingService');
const Config = require('../../core/services/ConfigurationService');

const COLORS = {
    brand: 0x5865F2,
    success: 0x57F287,
    warn: 0xFEE75C,
    danger: 0xED4245
};

// Comandos que NUNCA se registran (protegen anonimato / datos sensibles).
const NO_LOG_COMMANDS = new Set(['confess']);

const queues = new Map();
const initialized = new WeakSet();

const cut = (text, max) => {
    const s = String(text ?? '');
    return s.length > max ? s.slice(0, max - 3) + '...' : s;
};
const ts = ms => Math.floor(ms / 1000);
const who = u => `<@${u.id}> (\`${u.username}\`)`;

function buildEmbed(entry) {
    const embed = new EmbedBuilder()
        .setColor(entry.color ?? COLORS.brand)
        .setAuthor({ name: `⚡ Draxe GPT • Registro • ${entry.category}` })
        .setTitle(cut(entry.title, 256))
        .setFooter({ text: 'Draxe GPT • Logging' })
        .setTimestamp(entry.timestamp);

    if (entry.description) embed.setDescription(cut(entry.description, 4000));
    if (entry.thumbnail) embed.setThumbnail(entry.thumbnail);

    for (const f of (entry.fields || []).slice(0, 25)) {
        embed.addFields({
            name: cut(f.name, 256) || '-',
            value: cut(f.value, 1024) || '-',
            inline: !!f.inline
        });
    }
    return embed;
}

function getLogChannel(client, guildId) {
    const channelId = Config.get('discord', guildId, 'logChannelId');
    if (!channelId) return null;

    const guild = client.guilds.cache.get(guildId);
    const channel = guild?.channels.cache.get(channelId);
    if (!channel || !channel.isTextBased()) return null;

    const perms = channel.permissionsFor(guild.members.me);
    const needed = [
        PermissionFlagsBits.ViewChannel,
        PermissionFlagsBits.SendMessages,
        PermissionFlagsBits.EmbedLinks
    ];
    if (!perms || !perms.has(needed)) return null;
    return channel;
}

function deliver(client, entry) {
    if (entry.platform !== 'discord' || !entry.contextId) return;
    const channel = getLogChannel(client, entry.contextId);
    if (!channel) return;

    // Cola por servidor: conserva el orden y evita rafagas simultaneas.
    const prev = queues.get(entry.contextId) || Promise.resolve();
    const next = prev
        .then(() => channel.send({
            embeds: [buildEmbed(entry)],
            allowedMentions: { parse: [] }
        }))
        .catch(err => console.error('[LOG] No se pudo enviar al canal:', err.message));
    queues.set(entry.contextId, next);
}

const emit = (guild, data) =>
    Logging.log({ platform: 'discord', contextId: guild.id, ...data });

const isLogChannel = (guildId, channelId) =>
    Config.get('discord', guildId, 'logChannelId') === channelId;

function on(client, event, handler) {
    client.on(event, (...args) => {
        try {
            handler(...args);
        } catch (err) {
            console.error(`[LOG] Error en handler ${event}:`, err.message);
        }
    });
}

function init(client) {
    if (initialized.has(client)) return;
    initialized.add(client);

    Logging.addSink(entry => deliver(client, entry));

    // ── Miembros ────────────────────────────────────────────
    on(client, 'guildMemberAdd', member => {
        emit(member.guild, {
            category: 'miembros',
            title: 'Miembro se unió',
            color: COLORS.success,
            thumbnail: member.user.displayAvatarURL?.({ size: 256 }),
            description: `${who(member.user)} se unió al servidor.`,
            fields: [
                { name: 'ID', value: `\`${member.id}\``, inline: true },
                { name: 'Cuenta creada', value: `<t:${ts(member.user.createdTimestamp)}:R>`, inline: true },
                { name: 'Miembros', value: String(member.guild.memberCount), inline: true }
            ]
        });
    });

    on(client, 'guildMemberRemove', member => {
        const roles = member.roles?.cache
            ?.filter(r => r.id !== member.guild.id)
            .map(r => r.name)
            .slice(0, 15)
            .join(', ');
        emit(member.guild, {
            category: 'miembros',
            title: 'Miembro salió',
            color: COLORS.danger,
            thumbnail: member.user.displayAvatarURL?.({ size: 256 }),
            description: `${who(member.user)} salió del servidor.`,
            fields: [
                { name: 'ID', value: `\`${member.id}\``, inline: true },
                { name: 'Roles', value: roles || 'Ninguno' }
            ]
        });
    });

    on(client, 'guildMemberUpdate', (oldM, newM) => {
        if (oldM.partial) return;

        const added = newM.roles.cache.filter(r => !oldM.roles.cache.has(r.id));
        const removed = oldM.roles.cache.filter(r => !newM.roles.cache.has(r.id));

        if (added.size || removed.size) {
            const fields = [];
            if (added.size) fields.push({ name: 'Roles añadidos', value: added.map(r => r.name).join(', ') });
            if (removed.size) fields.push({ name: 'Roles quitados', value: removed.map(r => r.name).join(', ') });
            emit(newM.guild, {
                category: 'miembros',
                title: 'Roles de miembro actualizados',
                color: COLORS.warn,
                description: who(newM.user),
                fields
            });
        }

        if (oldM.nickname !== newM.nickname) {
            emit(newM.guild, {
                category: 'miembros',
                title: 'Apodo cambiado',
                color: COLORS.warn,
                description: who(newM.user),
                fields: [
                    { name: 'Antes', value: oldM.nickname || '(ninguno)', inline: true },
                    { name: 'Después', value: newM.nickname || '(ninguno)', inline: true }
                ]
            });
        }
    });

    // ── Mensajes ────────────────────────────────────────────
    on(client, 'messageDelete', message => {
        if (!message.guild || message.author?.bot) return;
        if (isLogChannel(message.guild.id, message.channelId)) return;

        const files = message.attachments?.size || 0;
        emit(message.guild, {
            category: 'mensajes',
            title: 'Mensaje eliminado',
            color: COLORS.danger,
            description: message.content
                ? cut(message.content, 1500)
                : '(contenido no disponible)',
            fields: [
                { name: 'Autor', value: message.author ? who(message.author) : 'Desconocido', inline: true },
                { name: 'Canal', value: `<#${message.channelId}>`, inline: true },
                ...(files ? [{ name: 'Adjuntos', value: String(files), inline: true }] : [])
            ]
        });
    });

    on(client, 'messageUpdate', (oldMsg, newMsg) => {
        if (!newMsg.guild || newMsg.author?.bot) return;
        if (oldMsg.content === newMsg.content) return;
        if (isLogChannel(newMsg.guild.id, newMsg.channelId)) return;

        emit(newMsg.guild, {
            category: 'mensajes',
            title: 'Mensaje editado',
            color: COLORS.warn,
            description: newMsg.url ? `[Ir al mensaje](${newMsg.url})` : undefined,
            fields: [
                { name: 'Autor', value: newMsg.author ? who(newMsg.author) : 'Desconocido', inline: true },
                { name: 'Canal', value: `<#${newMsg.channelId}>`, inline: true },
                { name: 'Antes', value: oldMsg.content ? cut(oldMsg.content, 900) : '(no disponible)' },
                { name: 'Después', value: cut(newMsg.content || '(vacío)', 900) }
            ]
        });
    });

    // ── Moderación ──────────────────────────────────────────
    on(client, 'guildBanAdd', ban => {
        emit(ban.guild, {
            category: 'moderación',
            title: 'Usuario baneado',
            color: COLORS.danger,
            description: who(ban.user),
            fields: [{ name: 'Razón', value: ban.reason || 'No especificada / no disponible' }]
        });
    });

    on(client, 'guildBanRemove', ban => {
        emit(ban.guild, {
            category: 'moderación',
            title: 'Usuario desbaneado',
            color: COLORS.success,
            description: who(ban.user)
        });
    });

    // ── Estructura del servidor ─────────────────────────────
    on(client, 'channelCreate', channel => {
        if (!channel.guild) return;
        emit(channel.guild, {
            category: 'servidor',
            title: 'Canal creado',
            color: COLORS.success,
            description: `<#${channel.id}> (\`${channel.name}\`)`,
            fields: [{ name: 'Tipo', value: ChannelType[channel.type] ?? String(channel.type), inline: true }]
        });
    });

    on(client, 'channelDelete', channel => {
        if (!channel.guild) return;
        emit(channel.guild, {
            category: 'servidor',
            title: 'Canal eliminado',
            color: COLORS.danger,
            description: `\`${channel.name}\``,
            fields: [{ name: 'Tipo', value: ChannelType[channel.type] ?? String(channel.type), inline: true }]
        });
    });

    on(client, 'roleCreate', role => {
        emit(role.guild, {
            category: 'servidor',
            title: 'Rol creado',
            color: COLORS.success,
            description: `\`${role.name}\``
        });
    });

    on(client, 'roleDelete', role => {
        emit(role.guild, {
            category: 'servidor',
            title: 'Rol eliminado',
            color: COLORS.danger,
            description: `\`${role.name}\``
        });
    });

    // ── Uso de comandos (solo nombre, nunca argumentos) ─────
    on(client, 'messageCreate', message => {
        if (message.author.bot || !message.guild) return;

        const prefix = process.env.PREFIX || 'd!';
        if (!message.content.startsWith(prefix)) return;

        const name = message.content.slice(prefix.length).trim().split(/\s+/)[0]?.toLowerCase();
        if (!name || NO_LOG_COMMANDS.has(name) || !client.commands?.has(name)) return;

        emit(message.guild, {
            category: 'comandos',
            title: 'Comando usado',
            color: COLORS.brand,
            description: `${who(message.author)} usó \`${prefix}${name}\``,
            fields: [{ name: 'Canal', value: `<#${message.channelId}>`, inline: true }]
        });
    });

    // ── Errores del proceso (solo consola) ──────────────────
    client.on('error', err => Logging.error({
        platform: 'discord', category: 'sistema', title: `Error del cliente: ${err.message}`
    }));
    process.on('unhandledRejection', reason => Logging.error({
        category: 'sistema', title: `Promesa rechazada: ${reason?.message || reason}`
    }));

    console.log('[LOG] Registro automático de Discord activo.');
}

module.exports = { init, buildEmbed, NO_LOG_COMMANDS };
