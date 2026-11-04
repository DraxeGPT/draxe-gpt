#!/usr/bin/env node
/**
 * Draxe GPT — Configurador del servidor de Discord oficial.
 *
 * Crea roles, categorías, canales, permisos y los mensajes (embeds) iniciales
 * a partir de config/discord-template.json.
 *
 * Seguro por diseño:
 *   - Idempotente: lo que ya existe (por nombre) se conserva; nunca borra nada.
 *   - Modo simulación: --dry-run muestra qué haría sin tocar el servidor.
 *   - Los embeds solo se publican en canales sin mensajes previos.
 *
 * Uso:   node scripts/setup-discord-server.js <GUILD_ID> [--dry-run]
 * Requiere DISCORD_TOKEN en .env y que el bot tenga Gestionar roles,
 * Gestionar canales, Enviar mensajes e Insertar enlaces en ese servidor.
 */
const path = require('path');
const { PermissionFlagsBits, ChannelType, EmbedBuilder } = require('discord.js');

const TEMPLATE_PATH = path.join(__dirname, '..', 'config', 'discord-template.json');

const norm = s => String(s).toLowerCase();
const findByName = (cache, name) => [...cache.values()].find(x => norm(x.name) === norm(name));

function perms(list) {
    return list.reduce((acc, n) => {
        if (!(n in PermissionFlagsBits)) throw new Error(`Permiso desconocido: ${n}`);
        return acc | PermissionFlagsBits[n];
    }, 0n);
}

function overwritesFor(access, guild, roles, staffNames) {
    const everyone = guild.roles.everyone.id;
    const member = roles.get('Miembro');
    const staff = staffNames.map(n => roles.get(n)).filter(Boolean);
    const VIEW = PermissionFlagsBits.ViewChannel | PermissionFlagsBits.ReadMessageHistory;
    const SEND = PermissionFlagsBits.SendMessages | PermissionFlagsBits.SendMessagesInThreads | PermissionFlagsBits.CreatePublicThreads;
    const out = [];
    const allow = (id, bits) => out.push({ id, allow: bits });

    switch (access) {
        case 'readonly':
            out.push({ id: everyone, allow: VIEW, deny: SEND | PermissionFlagsBits.AddReactions });
            staff.forEach(r => allow(r.id, SEND));
            break;
        case 'members-readonly':
            out.push({ id: everyone, deny: PermissionFlagsBits.ViewChannel });
            if (member) out.push({ id: member.id, allow: VIEW, deny: SEND });
            staff.forEach(r => allow(r.id, VIEW | SEND));
            break;
        case 'members':
            out.push({ id: everyone, deny: PermissionFlagsBits.ViewChannel });
            if (member) allow(member.id, VIEW | SEND);
            staff.forEach(r => allow(r.id, VIEW | SEND));
            break;
        case 'staff': {
            out.push({ id: everyone, deny: PermissionFlagsBits.ViewChannel });
            const collab = roles.get('Colaborador');
            [...staff, collab].filter(Boolean).forEach(r => allow(r.id, VIEW | SEND));
            break;
        }
        default:
            break;
    }
    return out;
}

function buildEmbed(def, brand) {
    return new EmbedBuilder()
        .setColor(brand.color)
        .setAuthor({ name: '⚡ Draxe GPT' })
        .setTitle(def.title)
        .setDescription(def.description || null)
        .addFields(def.fields || [])
        .setFooter({ text: brand.footer })
        .setTimestamp();
}

async function buildServer(guild, template, { dryRun = false, log = console.log } = {}) {
    const summary = { roles: 0, categories: 0, channels: 0, embeds: 0, skipped: 0 };
    const act = (msg) => log(`${dryRun ? '[simulación] ' : ''}${msg}`);

    // Roles
    const roles = new Map();
    for (const def of template.roles) {
        const existing = findByName(guild.roles.cache, def.name);
        if (existing) { roles.set(def.name, existing); summary.skipped++; continue; }
        act(`+ rol ${def.name}`);
        summary.roles++;
        if (dryRun) { roles.set(def.name, { id: `sim-${def.name}`, name: def.name }); continue; }
        const role = await guild.roles.create({
            name: def.name,
            color: def.color,
            hoist: !!def.hoist,
            mentionable: !!def.mentionable,
            permissions: perms(def.permissions),
            reason: 'Plantilla Draxe GPT'
        });
        roles.set(def.name, role);
    }

    // Categorías y canales
    for (const cat of template.categories) {
        let category = findByName(guild.channels.cache, cat.name);
        if (!category) {
            act(`+ categoría ${cat.name}`);
            summary.categories++;
            if (!dryRun) {
                category = await guild.channels.create({ name: cat.name, type: ChannelType.GuildCategory, reason: 'Plantilla Draxe GPT' });
            }
        } else summary.skipped++;

        for (const ch of cat.channels) {
            let channel = findByName(guild.channels.cache, ch.name);
            if (!channel) {
                act(`+ canal ${ch.name} (${ch.access})`);
                summary.channels++;
                if (!dryRun) {
                    const types = { announcement: ChannelType.GuildAnnouncement, forum: ChannelType.GuildForum };
                    const base = {
                        name: ch.name,
                        parent: category?.id,
                        topic: ch.topic,
                        permissionOverwrites: overwritesFor(ch.access, guild, roles, template.staffRoles),
                        reason: 'Plantilla Draxe GPT'
                    };
                    try {
                        channel = await guild.channels.create({ ...base, type: types[ch.kind] ?? ChannelType.GuildText });
                    } catch (err) {
                        if (!types[ch.kind]) throw err;
                        log(`  ! ${ch.kind} no disponible (${err.message}); se crea como texto.`);
                        channel = await guild.channels.create({ ...base, type: ChannelType.GuildText });
                    }
                }
            } else summary.skipped++;

            // Embed inicial solo si el canal está vacío
            if (ch.embed && channel && channel.messages) {
                const last = await channel.messages.fetch({ limit: 1 }).catch(() => null);
                if (last && last.size === 0) {
                    act(`+ mensaje «${template.embeds[ch.embed].title}» en ${ch.name}`);
                    summary.embeds++;
                    if (!dryRun) {
                        await channel.send({
                            embeds: [buildEmbed(template.embeds[ch.embed], template.brand)],
                            allowedMentions: { parse: [] }
                        });
                    }
                }
            } else if (ch.embed && dryRun) {
                act(`+ mensaje «${template.embeds[ch.embed].title}» en ${ch.name}`);
                summary.embeds++;
            }
        }
    }
    return summary;
}

async function main() {
    require('dotenv').config();
    const { Client, GatewayIntentBits } = require('discord.js');
    const guildId = process.argv[2];
    const dryRun = process.argv.includes('--dry-run');

    if (!guildId || !/^\d{15,25}$/.test(guildId)) {
        console.error('Uso: node scripts/setup-discord-server.js <GUILD_ID> [--dry-run]');
        process.exit(1);
    }
    if (!process.env.DISCORD_TOKEN) {
        console.error('Falta DISCORD_TOKEN en el entorno (.env).');
        process.exit(1);
    }

    const template = require(TEMPLATE_PATH);
    const client = new Client({ intents: [GatewayIntentBits.Guilds] });
    await client.login(process.env.DISCORD_TOKEN);
    try {
        const guild = await client.guilds.fetch(guildId);
        await guild.roles.fetch();
        await guild.channels.fetch();
        console.log(`Servidor: ${guild.name}${dryRun ? ' (modo simulación)' : ''}`);
        const s = await buildServer(guild, template, { dryRun });
        console.log(`\nListo. Roles: ${s.roles} · Categorías: ${s.categories} · Canales: ${s.channels} · Mensajes: ${s.embeds} · Ya existentes: ${s.skipped}`);
    } finally {
        await client.destroy();
    }
}

if (require.main === module) {
    main().catch(err => { console.error('Error:', err.message); process.exit(1); });
}

module.exports = { buildServer, overwritesFor };
