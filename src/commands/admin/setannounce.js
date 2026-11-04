const { PermissionFlagsBits } = require('discord.js');
const Announcer = require('../../adapters/discord/Announcer');
const { TYPES, isValidType } = require('../../adapters/discord/EmbedTemplates');

const reply = (message, content) => message.reply({ content, allowedMentions: { repliedUser: false } });

module.exports = {
    name: 'setannounce',

    async execute(message, args) {
        const isOwner = !!process.env.OWNER_ID && message.author.id === process.env.OWNER_ID;
        if (!isOwner && !message.member?.permissions.has(PermissionFlagsBits.ManageGuild)) {
            return reply(message, '❌ Necesitas el permiso **Gestionar servidor**.');
        }

        const type = args[0]?.toLowerCase();
        if (!isValidType(type)) {
            return reply(message,
                `❌ Indica el tipo: ${Object.keys(TYPES).map(t => `\`${t}\``).join(', ')}.\n\n` +
                'Ejemplos: `d!setannounce version #versiones @🔔 Versiones` · `d!setannounce version off`');
        }

        if (args[1]?.toLowerCase() === 'off') {
            Announcer.disable(message.guild.id, type);
            return reply(message, `🔕 Anuncios de tipo \`${type}\` **desactivados**.`);
        }

        const channel = message.mentions.channels.first();
        if (!channel || !channel.isTextBased()) return reply(message, '❌ Menciona un canal de texto válido.');

        const role = message.mentions.roles.first();
        Announcer.configure(message.guild.id, type, channel.id, role?.id);
        return reply(message, `✅ Los anuncios \`${type}\` se enviarán a ${channel}${role ? ` mencionando a **${role.name}**` : ''}.`);
    }
};
