# Registro automático (Logging)

Draxe GPT registra eventos del servidor como embeds en un canal elegido.

## Activar
`d!setlogchannel #registro` (requiere **Gestionar servidor**). `d!setlogchannel off` lo desactiva.
El bot necesita **Ver canal**, **Enviar mensajes** e **Insertar enlaces** en ese canal.

## Eventos registrados
- Miembros: entrada, salida, cambio de roles y apodo
- Mensajes: eliminados y editados (excluye bots y el propio canal de registro)
- Moderación: bans y desbans
- Servidor: canales y roles creados/eliminados
- Comandos: solo el nombre (nunca argumentos). `d!confess` nunca se registra.

## Privacidad
Informa a tus miembros de que el servidor registra estos eventos. Los menciones no notifican (`allowedMentions: { parse: [] }`).

## Integración (2 cambios en src/index.js)
1. Añadir `GatewayIntentBits.GuildModeration` a los intents.
2. Tras `loadCommands(commandsPath);` añadir:
   `require('./adapters/discord/DiscordLogger').init(client);`

Añade `data/` a `.gitignore` (la configuración se guarda en `data/guild-config.json`).

## Arquitectura
`LoggingService` (core, sin discord.js) → sinks → `DiscordLogger` (adapter). `ConfigurationService` guarda la config por `plataforma:contexto`, preparado para migrar a SQLite.
