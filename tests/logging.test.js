const test = require('node:test');
const assert = require('node:assert');
const { EventEmitter } = require('node:events');
const fs = require('fs');
const os = require('os');
const path = require('path');

process.env.DRAXE_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), 'draxe-test-'));
process.env.PREFIX = 'd!';

const Logging = require('../src/core/services/LoggingService');
const Config = require('../src/core/services/ConfigurationService');
const DiscordLogger = require('../src/adapters/discord/DiscordLogger');

const wait = () => new Promise(r => setTimeout(r, 20));

function makeClient() {
    const sent = [];
    const channel = {
        id: 'C1',
        isTextBased: () => true,
        permissionsFor: () => ({ has: () => true }),
        send: async payload => { sent.push(payload); }
    };
    const guild = {
        id: 'G1',
        memberCount: 10,
        members: { me: {} },
        channels: { cache: new Map([['C1', channel]]) }
    };
    const client = Object.assign(new EventEmitter(), {
        guilds: { cache: new Map([['G1', guild]]) },
        commands: new Map([['help', {}], ['confess', {}]])
    });
    return { client, guild, sent };
}

const user = { id: 'U1', username: 'hecto', bot: false, createdTimestamp: Date.now() - 86400000 };

test.beforeEach(() => Logging.clearSinks());

test('ConfigurationService aisla la configuración por servidor', () => {
    Config.set('discord', 'A', 'logChannelId', '1');
    Config.set('discord', 'B', 'logChannelId', '2');
    assert.strictEqual(Config.get('discord', 'A', 'logChannelId'), '1');
    assert.strictEqual(Config.get('discord', 'B', 'logChannelId'), '2');
    Config.unset('discord', 'A', 'logChannelId');
    assert.strictEqual(Config.get('discord', 'A', 'logChannelId'), null);
    assert.strictEqual(Config.get('discord', 'B', 'logChannelId'), '2');
});

test('entrada de miembro se envía al canal configurado', async () => {
    Config.set('discord', 'G1', 'logChannelId', 'C1');
    const { client, guild, sent } = makeClient();
    DiscordLogger.init(client);
    client.emit('guildMemberAdd', { id: 'U1', user, guild });
    await wait();
    assert.strictEqual(sent.length, 1);
    assert.strictEqual(sent[0].embeds[0].data.title, 'Miembro se unió');
    assert.deepStrictEqual(sent[0].allowedMentions, { parse: [] });
});

test('sin canal configurado no se envía nada', async () => {
    Config.unset('discord', 'G1', 'logChannelId');
    const { client, guild, sent } = makeClient();
    DiscordLogger.init(client);
    client.emit('guildMemberAdd', { id: 'U1', user, guild });
    await wait();
    assert.strictEqual(sent.length, 0);
});

test('mensajes de bots eliminados no se registran', async () => {
    Config.set('discord', 'G1', 'logChannelId', 'C1');
    const { client, guild, sent } = makeClient();
    DiscordLogger.init(client);
    client.emit('messageDelete', { guild, channelId: 'X', author: { ...user, bot: true }, content: 'hola' });
    client.emit('messageDelete', { guild, channelId: 'X', author: user, content: 'hola', attachments: new Map() });
    await wait();
    assert.strictEqual(sent.length, 1);
    assert.strictEqual(sent[0].embeds[0].data.title, 'Mensaje eliminado');
});

test('d!confess NO se registra, d!help sí (solo nombre)', async () => {
    Config.set('discord', 'G1', 'logChannelId', 'C1');
    const { client, guild, sent } = makeClient();
    DiscordLogger.init(client);
    const base = { guild, channelId: 'X', author: user };
    client.emit('messageCreate', { ...base, content: 'd!confess algo secreto' });
    client.emit('messageCreate', { ...base, content: 'd!help argumento-privado' });
    await wait();
    assert.strictEqual(sent.length, 1);
    const text = JSON.stringify(sent[0].embeds[0].data);
    assert.ok(text.includes('d!help'));
    assert.ok(!text.includes('argumento-privado'));
});

test('los mensajes dentro del canal de registro no se re-registran', async () => {
    Config.set('discord', 'G1', 'logChannelId', 'C1');
    const { client, guild, sent } = makeClient();
    DiscordLogger.init(client);
    client.emit('messageDelete', { guild, channelId: 'C1', author: user, content: 'x', attachments: new Map() });
    await wait();
    assert.strictEqual(sent.length, 0);
});
