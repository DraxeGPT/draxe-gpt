const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const Config = require('../../core/services/ConfigurationService');
const Logging = require('../../core/services/LoggingService');

const reply = (message, content) =>
    message.reply({ content, allowedMentions: { repliedUser: false } });

module.exports = {
    name: 'setlogchannel',

    async execute(message, args) {
        const isOwner = !!process.env.OWNER_ID && message.author.id === process.env.OWNER_ID;
        const canManage = message.member?.permissions.has(PermissionFlagsBits.ManageGuild);

        if (!isOwner && !canManage) {
            return reply(message, '❌ Necesitas el permiso **Gestionar servidor** para usar este comando.');
        }

        const guildId = message.guild.id;

        if (args[0]?.toLowerCase() === 'off') {
            Config.unset('discord', guildId, 'logChannelId');
            return reply(message, '🔕 Registro automático **desactivado** en este servidor.');
        }

        const channel =
            message.mentions.channels.first() ||
            message.guild.channels.cache.get(args[0]) ||
            (args.length === 0 ? message.channel : null);

        if (!channel || !channel.isTextBased()) {
            return reply(message,
                '❌ Indica un canal de texto válido.\n\n' +
                'Ejemplos: `d!setlogchannel #registro` · `d!setlogchannel off`');
        }

        const perms = channel.permissionsFor(message.guild.members.me);
        if (!perms?.has([
            PermissionFlagsBits.ViewChannel,
            PermissionFlagsBits.SendMessages,
            PermissionFlagsBits.EmbedLinks
        ])) {
            return reply(message,
                `❌ No tengo permisos en ${channel} (necesito **Ver canal**, **Enviar mensajes** e **Insertar enlaces**).`);
        }

        Config.set('discord', guildId, 'logChannelId', channel.id);

        Logging.log({
            platform: 'discord',
            contextId: guildId,
            category: 'sistema',
            title: 'Registro automático activado',
            description: `Configurado por <@${message.author.id}>. Aquí aparecerán los eventos del servidor.`,
            color: 0x57F287
        });

        const embed = new EmbedBuilder()
            .setColor('#5865F2')
            .setAuthor({ name: '⚡ Draxe GPT • Registro' })
            .setDescription(`✅ Registro automático activado en ${channel}.`)
            .setFooter({ text: 'Draxe GPT • Logging' });

        return message.channel.send({ embeds: [embed] });
    }
};
