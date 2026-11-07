# Changelog

Formato basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/)
y versionado semántico ([SemVer](https://semver.org/lang/es/)).

## [Sin publicar]

### Agregado
- Scripts de instalación (Windows/Linux), comandos universales y guion de video de DraxeCraft Network.
- Sistema de **registro automático** en Discord: miembros (entradas, salidas,
  cambios de rol y apodo), mensajes (editados y eliminados), baneos,
  canales, roles y uso de comandos.
- `LoggingService` (core) independiente de la plataforma, con sinks.
- `ConfigurationService` con configuración por servidor (persistida en JSON).
- Comando `d!setlogchannel` para elegir o desactivar el canal de registro.
- Documentación oficial: README, LICENSE, CONTRIBUTING, CODE_OF_CONDUCT,
  SECURITY, PRIVACY_POLICY y TERMS_OF_SERVICE.
- Plantillas de issues y pull requests, CODEOWNERS, Dependabot y CI
  (Node 18/20/22).
- `package.json`, `.editorconfig`, `.gitattributes`, `SUPPORT.md`, `NOTICE.md`.
- `docs/architecture.md` e índice de documentación.
- Secciones `docs/basico/` (guía rápida, comandos, FAQ) y `docs/registro/` (bitácora).
- Anuncios con embeds: `EmbedTemplates` y `Announcer` (versión, actualización, mantenimiento, incidencia y Minecraft), comandos `d!setannounce` y `d!announce`.
- Plantilla del Discord para copiar y pegar y registro de cambios del Discord (`docs/discord/`).
- `docs/minecraft/draxecraft-network.md`: guía de la red DraxeCraft (proxy, lobby, survival custom y skyblock OP).
- `docs/minecraft/java-bedrock.md`: guía de servidor Java + Bedrock con Geyser y Floodgate.
- `docs/minecraft/`: plan y ficha del servidor de Minecraft (datos pendientes).
- `docs/community.md`: plantilla del Discord oficial y plan del servidor de Minecraft.

### Cambiado
- Licencia propietaria v1.0 reestructurada (definiciones, contribuciones, ley aplicable).

### Pendiente
- Mover `OWNER_ID` a `.env`.
- Mover el handler de `messageCreate` a `src/events/`.
- Persistir votos de sugerencias en base de datos.

## [1.0.0]

### Agregado
- Sistema modular de comandos con carga recursiva.
- Help Center interactivo (`d!help`) con menú y botones.
- Comandos: `userinfo`, `serverinfo`, `botinfo`, `host`, `invite`, `8ball`,
  `ship` y `suggestion` (con votación).
- Restricción de `botinfo` y `host` al propietario.
