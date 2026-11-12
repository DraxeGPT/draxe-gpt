# Arquitectura

```
Plataforma ──▶ Adapter ──▶ Draxe Core ──▶ Servicios
(Discord, …)   (traduce)   (lógica)       (Logging, Configuración, IA)
```

## Principios
- El **núcleo** no depende de ninguna plataforma (sin `discord.js`).
- Cada plataforma es un **adapter** independiente que traduce eventos.
- La configuración es **multi-tenant**: clave `plataforma:contextoId`.
- Persistencia actual en JSON (`data/`, fuera de Git); prevista migración a SQLite.

## Estructura actual
```
src/
├─ core/services/      LoggingService, ConfigurationService
├─ adapters/discord/   DiscordLogger
└─ commands/utils/     setlogchannel
tests/                 Pruebas con node:test
docs/                  Documentación
```

## Reglas de seguridad
Secretos solo en `.env` (nunca en el código ni en los registros), sin registrar
argumentos de comandos y `allowedMentions` restringido en mensajes automáticos.
