// Draxe Core - LoggingService
// Independiente de la plataforma: no depende de discord.js.
// Los adapters registran "sinks" que reciben cada entrada de registro.

const sinks = new Set();

/**
 * Entrada de registro:
 * {
 *   platform: 'discord',      // plataforma de origen
 *   contextId: '123',         // guildId / chatId / etc. (multi-tenant)
 *   level: 'info',            // debug | info | warn | error
 *   category: 'miembros',     // agrupa eventos
 *   title: 'Miembro se unio',
 *   description: '...',
 *   fields: [{ name, value, inline }],
 *   color, thumbnail          // opcionales (presentacion)
 * }
 */
function log(entry) {
    const e = {
        timestamp: new Date(),
        level: 'info',
        category: 'general',
        title: '(sin titulo)',
        ...entry
    };

    const line = `[${e.timestamp.toISOString()}] [${String(e.level).toUpperCase()}] ` +
        `[${e.platform || 'core'}${e.contextId ? ':' + e.contextId : ''}] ` +
        `[${e.category}] ${e.title}`;

    if (e.level === 'error') console.error(line);
    else if (e.level === 'warn') console.warn(line);
    else console.log(line);

    for (const sink of sinks) {
        Promise.resolve()
            .then(() => sink(e))
            .catch(err => console.error('[LOG] Error en sink:', err.message));
    }
    return e;
}

function addSink(fn) {
    sinks.add(fn);
    return () => sinks.delete(fn);
}

function clearSinks() {
    sinks.clear();
}

module.exports = {
    log,
    addSink,
    clearSinks,
    debug: entry => log({ ...entry, level: 'debug' }),
    info: entry => log({ ...entry, level: 'info' }),
    warn: entry => log({ ...entry, level: 'warn' }),
    error: entry => log({ ...entry, level: 'error' })
};
