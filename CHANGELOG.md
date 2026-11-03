# Changelog

Formato basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/)
y versionado semántico ([SemVer](https://semver.org/lang/es/)).

## [Sin publicar]

### Agregado
- Sistema de **registro automático** en Discord: miembros (entradas, salidas,
  cambios de rol y apodo), mensajes (editados y eliminados), baneos,
  canales, roles y uso de comandos.
- `LoggingService` (core) independiente de la plataforma, con sinks.
- `ConfigurationService` con configuración por servidor (persistida en JSON).
- Comando `d!setlogchannel` para elegir o desactivar el canal de registro.
- Documentación oficial: README, LICENSE, CONTRIBUTING, CODE_OF_CONDUCT,
  SECURITY, PRIVACY_POLICY y TERMS_OF_SERVICE.

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
