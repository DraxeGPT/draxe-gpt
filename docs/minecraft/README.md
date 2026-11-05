# Servidor de Minecraft — Plan y documentación

> **Estado: en planificación.** No hay un servidor publicado. Los datos marcados `[PENDIENTE]` se completarán cuando estén confirmados; hasta entonces no se publicarán direcciones, versiones ni promesas de disponibilidad.

Proyecto **independiente** de Draxe GPT: no se reutilizan configuraciones de otros servidores sin adaptarlas.

## Ficha del servidor
| Dato | Valor |
|------|-------|
| Nombre | DraxeCraft Network |
| Modalidades | Survival custom (encantamientos custom, crates, dungeons) · Skyblock OP |
| Edición | Java + Bedrock (Geyser y Floodgate) — ver [guía](java-bedrock.md) |
| Versión del juego | 1.21.11 como base (a confirmar con Geyser; ver guía) |
| Software | Paper (backends) + Velocity (proxy) |
| Hosting | PC propio (Windows 10) |
| Dirección | `[PENDIENTE]` |
| Estética | Identidad de Draxe GPT (`#5865F2`) — por confirmar |

Guías: [Java + Bedrock](java-bedrock.md) · [Red DraxeCraft (proxy + modalidades)](draxecraft-network.md).

**Decisiones tomadas:** modo B (acepta jugadores no premium, con AuthMe), alojado en PC propio.

## Decisión clave: autenticación de jugadores
Define antes de abrir el servidor quién puede entrar, porque condiciona la seguridad:

| Modo | Implicación |
|------|-------------|
| **Cuentas oficiales** (`online-mode=true`) | Cada nombre pertenece a una cuenta verificada; la vinculación Discord ↔ Minecraft es fiable. |
| **Sin verificación** (`online-mode=false`, p. ej. launchers no oficiales como TLauncher) | Cualquiera puede entrar con el nombre de otra persona, incluido un administrador. Exige un plugin de registro e inicio de sesión, permisos estrictos para el staff y desactivar operadores por nombre. La vinculación con Discord pierde fiabilidad. |

Verifica la compatibilidad de cada plugin con la versión elegida antes de instalarlo.

## Plugins previstos `[PENDIENTE: verificar versión y compatibilidad]`
| Función | Opción a evaluar |
|---------|------------------|
| Permisos y rangos | LuckPerms |
| Vinculación con Discord | DiscordSRV u otra opción compatible |
| Inicio de sesión (solo si no hay cuentas oficiales) | Un plugin de autenticación mantenido |
| Scoreboard / lista de jugadores | Según identidad visual elegida |

No se asume que un hosting gratuito ofrezca todos los plugins: se comprueba su catálogo y límites.

## Rangos `[PENDIENTE]`
Mínimo recomendado: Propietario, Administrador, Moderador, Colaborador, Jugador. Los rangos de staff se mantienen separados de cualquier progresión de jugadores.

## Vinculación con Discord
- Usar IDs reales de roles y verificar los permisos del bot.
- Evitar sincronizaciones bidireccionales de rangos: sincronizar en una sola dirección.
- Los anuncios llegan a `📰┃novedades-mc` con el embed `minecraft` del bot (`d!setannounce minecraft #canal`).

## Antes de anunciar
- [ ] Ficha completa y confirmada
- [ ] Modo de autenticación decidido
- [ ] Normas del servidor y política de datos de jugadores
- [ ] Copias de seguridad configuradas
- [ ] Prueba cerrada con el equipo
- [ ] Datos publicados en `⛏️┃info-servidor`

## Qué no se afirmará sin comprobarlo
Disponibilidad garantizada, protección contra ataques, soporte permanente o rendimiento concreto.
