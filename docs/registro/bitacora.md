# Bitácora

### 2026-11-06 — Guías, scripts y comandos universales de DraxeCraft
- Scripts de instalación para Windows y Linux ([scripts/](minecraft/scripts/README.md)).
- Comandos universales `/ip`, `/discord`, `/tiktok`, `/tienda` ([guía](minecraft/comandos-universales.md)).
- Guion y prompts para el video tutorial animado ([video](minecraft/video/prompts-nano-banana.md)).
- Decisión: el servidor se aloja en el PC con Windows; ChromeOS sin Linux no puede alojarlo.
- **Pendiente:** probar scripts, verificar VCC, Geyser con 1.21.11 y Bedrock con AuthMe.

### 2026-11-05 — DraxeCraft Network definida
- Red con Velocity + lobby + survival custom + skyblock OP, en PC propio, modo B (no premium con AuthMe) y Bedrock con Geyser/Floodgate.
- Verificado en documentación: ExcellentEnchants (1.21.11), BSkyBlock 1.20.0 (Paper 1.21.11), configuración de AuthMe con proxy offline.
- **Sin verificar:** versión de Geyser frente a 1.21.11 (ViaVersion), Bedrock con AuthMe, ExcellentCrates, plugin de dungeons.
- **Aviso:** 8 GB de RAM es justo para 4 servidores a la vez.

### 2026-11-05 — Guía del servidor Java + Bedrock
- Guía de Paper + Geyser + Floodgate con dos modos (A: solo cuentas oficiales; B: también no premium con AuthMe).
- El modo B no está documentado por el equipo de Geyser: requiere pruebas cerradas. Compatibilidad de Aternos con Bedrock **sin verificar**.
- **Pendiente:** elegir versión, hosting y modo.

### 2026-11-05 — Documentación del servidor de Minecraft
- `docs/minecraft/`: ficha con campos pendientes, decisión de autenticación de jugadores (cuentas oficiales vs. sin verificación), plugins por evaluar y lista previa al anuncio.
- **Pendiente:** completar la ficha con los datos reales.

### 2026-11-04 — Anuncios con embeds automáticos
- Plantillas de embed y `Announcer` en el bot; comandos `d!setannounce` y `d!announce`; 12 pruebas.
- Canales de novedades alimentados por el bot; nuevos `🟢┃estado` y `🗳️┃encuestas`.
- **Pendiente:** disparo automático al publicar una versión en GitHub.

### 2026-11-04 — Plantilla del Discord y su registro de cambios
- Plantilla para copiar y pegar y registro de cambios del Discord en `docs/discord/`.
- Se descartó el script de instalación automática: la plantilla se aplica a mano.
- **Pendiente:** montar el servidor oficial y confirmar los datos de Minecraft.

### 2026-11-04 — Comunidad oficial y plan de Minecraft
- Plantilla del Discord oficial ([community.md](../community.md)): canales, roles, permisos y textos.
- Servidor de Minecraft **en planificación**: nombre, modalidad, versión y hosting pendientes de confirmar.

### 2026-11-04 — Estructura profesional del repositorio
- CI (Node 18/20/22), plantillas de issues y PR, CODEOWNERS, Dependabot, `SUPPORT.md`, `NOTICE.md`.
- README y licencia v1.0 reescritos.

### 2026-11-03 — Repositorio en GitHub y aviso a Discord
- Repositorio `DraxeGPT/draxe-gpt` creado y publicado con documentación y sistema de registro.
- Flujo de n8n «GitHub push a Discord» creado. **Pendiente:** URL del webhook de Discord y webhook de GitHub.

### 2026-11-02 — Registro automático y documentación oficial
- Sistema de registro automático (LoggingService, ConfigurationService, DiscordLogger, `d!setlogchannel`) con 6 pruebas.
- Licencia propietaria y documentos legales (borradores, pendientes de revisión legal).
- **Pendiente:** completar titular, contacto y ley aplicable en `LICENSE`.
