const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const os = require('os');
const path = require('path');

process.env.DRAXE_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), 'draxe-ann-'));

const Templates = require('../src/adapters/discord/EmbedTemplates');
const Announcer = require('../src/adapters/discord/Announcer');
const announce = require('../src/commands/admin/announce');

function fakeClient() {
    const sent = [];
    const channel = { id: 'C1', isTextBased: () => true, permissionsFor: () => ({ has: () => true }), send: async p => { sent.push(p); } };
    const guild = { id: 'G1', members: { me: {} }, channels: { cache: new Map([['C1', channel]]) } };
    return { sent, client: { guilds: { cache: new Map([['G1', guild]]) } } };
}

test('embed de versión incluye secciones y recorta textos largos', () => {
    const e = Templates.build('version', { version: '1.2.0', features: ['a', 'b'], fixes: ['x'.repeat(500)] }).data;
    assert.strictEqual(e.title, '🚀 Draxe GPT v1.2.0');
    assert.deepStrictEqual(e.fields.map(f => f.name), ['✨ Novedades', '🐞 Correcciones']);
    assert.ok(e.fields[1].value.length <= 1024);
});

test('mantenimiento muestra inicio, duración e impacto', () => {
    const e = Templates.build('maintenance', { title: 'Mantenimiento', start: '10:00', duration: '1 h', impact: 'Bot sin respuesta' }).data;
    assert.strictEqual(e.fields.length, 3);
});

test('un tipo desconocido se rechaza', () => {
    assert.throws(() => Templates.build('nada', {}));
});

test('sin canal configurado no se envía; configurado, sí', async () => {
    const { client, sent } = fakeClient();
    assert.deepStrictEqual(await Announcer.announce(client, 'G1', 'version', { version: '1.0.0' }), { ok: false, reason: 'sin-canal' });
    Announcer.configure('G1', 'version', 'C1', '999');
    assert.deepStrictEqual(await Announcer.announce(client, 'G1', 'version', { version: '1.0.0' }), { ok: true });
    assert.strictEqual(sent.length, 1);
});

test('solo se menciona el rol configurado, nunca everyone', async () => {
    const { client, sent } = fakeClient();
    Announcer.configure('G1', 'update', 'C1', '555');
    await Announcer.announce(client, 'G1', 'update', { title: 'Hola' });
    assert.deepStrictEqual(sent[0].allowedMentions, { roles: ['555'] });
    Announcer.configure('G1', 'update', 'C1');
    await Announcer.announce(client, 'G1', 'update', { title: 'Hola' });
    assert.deepStrictEqual(sent[1].allowedMentions, { parse: [] });
});

test('el comando interpreta el formato de versión', () => {
    const d = announce.parse('version', '1.2.0 | uno ; dos | mejora | arreglo');
    assert.deepStrictEqual(d, { version: '1.2.0', features: ['uno', 'dos'], improvements: ['mejora'], fixes: ['arreglo'] });
    assert.strictEqual(announce.parse('version', ''), null);
});
