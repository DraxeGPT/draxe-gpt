// Draxe Core - ConfigurationService
// Configuracion por plataforma + contexto (guildId, chatId...).
// Almacenamiento temporal en JSON; se reemplazara por un repository SQLite.

const fs = require('fs');
const path = require('path');

const DATA_DIR = process.env.DRAXE_DATA_DIR ||
    path.join(__dirname, '..', '..', '..', 'data');
const FILE = path.join(DATA_DIR, 'guild-config.json');

let cache = null;

function load() {
    if (cache) return cache;
    try {
        cache = JSON.parse(fs.readFileSync(FILE, 'utf8'));
    } catch {
        cache = {};
    }
    return cache;
}

function save() {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    const tmp = FILE + '.tmp';
    fs.writeFileSync(tmp, JSON.stringify(cache, null, 2));
    fs.renameSync(tmp, FILE);
}

const scope = (platform, contextId) => `${platform}:${contextId}`;

function get(platform, contextId, name, fallback = null) {
    const ctx = load()[scope(platform, contextId)];
    return ctx && name in ctx ? ctx[name] : fallback;
}

function set(platform, contextId, name, value) {
    const data = load();
    const key = scope(platform, contextId);
    data[key] = data[key] || {};
    data[key][name] = value;
    save();
}

function unset(platform, contextId, name) {
    const data = load();
    const key = scope(platform, contextId);
    if (data[key] && name in data[key]) {
        delete data[key][name];
        save();
    }
}

module.exports = { get, set, unset };
