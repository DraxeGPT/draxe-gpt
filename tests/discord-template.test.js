const test = require('node:test');
const assert = require('node:assert');
const template = require('../config/discord-template.json');
const { PermissionFlagsBits } = require('discord.js');
const { buildServer } = require('../scripts/setup-discord-server.js');

function fakeGuild() {
    let n = 0;
    const roles = new Map();
    const channels = new Map();
    const make = (store, data) => {
        const obj = { id: String(++n), ...data, messages: { fetch: async () => ({ size: obj.sent ? 1 : 0 }) }, send: async () => { obj.sent = true; } };
        store.set(obj.id, obj); return obj;
    };
    return {
        roles: { cache: roles, everyone: { id: 'everyone' }, create: async d => make(roles, d) },
        channels: { cache: channels, create: async d => make(channels, d) }
    };
}

test('la plantilla es válida: permisos reales y referencias existentes', () => {
    const names = new Set(template.roles.map(r => r.name));
    for (const r of template.roles) for (const p of r.permissions) assert.ok(p in PermissionFlagsBits, p);
    for (const s of template.staffRoles) assert.ok(names.has(s), s);
    for (const c of template.categories) for (const ch of c.channels) if (ch.embed) assert.ok(template.embeds[ch.embed], ch.embed);
});

test('crea todo la primera vez y nada la segunda (idempotente)', async () => {
    const guild = fakeGuild();
    const first = await buildServer(guild, template, { log: () => {} });
    assert.strictEqual(first.roles, template.roles.length);
    assert.strictEqual(first.categories, template.categories.length);
    assert.strictEqual(first.channels, template.categories.reduce((a, c) => a + c.channels.length, 0));
    const second = await buildServer(guild, template, { log: () => {} });
    assert.strictEqual(second.roles + second.categories + second.channels + second.embeds, 0);
});

test('el modo simulación no crea nada', async () => {
    const guild = fakeGuild();
    const s = await buildServer(guild, template, { dryRun: true, log: () => {} });
    assert.ok(s.channels > 0);
    assert.strictEqual(guild.roles.cache.size + guild.channels.cache.size, 0);
});

test('canales de staff niegan la vista a @everyone', async () => {
    const guild = fakeGuild();
    await buildServer(guild, template, { log: () => {} });
    const staff = [...guild.channels.cache.values()].find(c => c.name === '🔒┃staff');
    const ev = staff.permissionOverwrites.find(o => o.id === 'everyone');
    assert.ok((ev.deny & PermissionFlagsBits.ViewChannel) !== 0n);
});
