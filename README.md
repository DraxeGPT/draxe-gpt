<div align="center">

# ⚡ Draxe GPT

**Plataforma multicanal de automatización e inteligencia artificial**

Un único núcleo. Múltiples canales. Discord hoy; Telegram, WhatsApp e Instagram en camino.

[![CI](https://github.com/DraxeGPT/draxe-gpt/actions/workflows/ci.yml/badge.svg)](https://github.com/DraxeGPT/draxe-gpt/actions/workflows/ci.yml)
![Estado](https://img.shields.io/badge/estado-en%20desarrollo-yellow?style=flat-square)
![Node](https://img.shields.io/badge/Node.js-%E2%89%A5%2018-339933?style=flat-square&logo=node.js&logoColor=white)
![discord.js](https://img.shields.io/badge/discord.js-v14-5865F2?style=flat-square&logo=discord&logoColor=white)
![Licencia](https://img.shields.io/badge/licencia-propietaria-red?style=flat-square)

[Inicio rápido](#inicio-rápido) · [Comandos](#comandos) · [Registro automático](#registro-automático) · [Arquitectura](#arquitectura) · [Ecosistema](#ecosistema) · [Hoja de ruta](#hoja-de-ruta) · [Documentación](#documentación)

**Atajos:** [📚 Docs](docs/README.md) · [🚀 Guía rápida](docs/basico/guia-rapida.md) · [⛏️ DraxeCraft](docs/minecraft/README.md) · [💬 Discord](docs/discord/comunidad.md) · [🧾 Bitácora](docs/registro/bitacora.md)

</div>

---

## Acerca del proyecto

Draxe GPT comenzó como un bot de Discord y evoluciona hacia una plataforma de automatización e IA que opera en varios canales desde un **núcleo independiente de la plataforma**. Cada canal se conecta mediante un *adapter*, de modo que la lógica de negocio se escribe una sola vez.

| Plataforma | Estado |
|------------|--------|
| Discord    | ✅ Activa |
| Telegram   | 🛠️ Planificada |
| WhatsApp   | 🛠️ Planificada |
| Instagram  | 🛠️ Planificada |

> **Nota de alcance:** las capacidades de WhatsApp e Instagram dependen de las APIs oficiales de Meta y se verificarán contra su documentación vigente antes de implementarse.

---

## Inicio rápido

**Requisitos:** Node.js 18 o superior, npm y un bot creado en el [Portal de Desarrolladores de Discord](https://discord.com/developers/applications).

```bash
git clone https://github.com/DraxeGPT/draxe-gpt.git
cd draxe-gpt
npm install
cp .env.example .env      # en Windows: copy .env.example .env
```

Edita `.env` con tus datos y arranca:

```bash
npm run dev     # desarrollo (reinicio automático)
npm start       # producción
npm test        # pruebas
```

### Variables de entorno

| Variable | Obligatoria | Descripción |
|----------|:-----------:|-------------|
| `DISCORD_TOKEN` | Sí | Token del bot. **Nunca lo compartas ni lo subas a Git.** |
| `CLIENT_ID` | Sí | ID de la aplicación (usado por `d!invite`). |
| `OWNER_ID` | Sí | ID del propietario, para comandos restringidos. |
| `PREFIX` | No | Prefijo de comandos. Por defecto `d!`. |

### Intents requeridos

Activa en el portal: **Server Members** y **Message Content**. El bot usa los intents `Guilds`, `GuildMessages`, `MessageContent`, `GuildMembers` y `GuildModeration` (este último para registrar baneos).

---

## Comandos

Prefijo por defecto: `d!`

### Información
| Comando | Descripción |
|---------|-------------|
| `d!help` | Centro de ayuda interactivo |
| `d!userinfo` | Información de un usuario |
| `d!serverinfo` | Información del servidor |
| `d!botinfo` | Información del bot *(solo propietario)* |
| `d!host` | Monitor del host *(solo propietario)* |

### Utilidades
| Comando | Descripción |
|---------|-------------|
| `d!suggestion` | Sugerencias con votación |
| `d!invite` | Enlace para invitar el bot |
| `d!8ball` | Bola 8 mágica |
| `d!ship` | Compatibilidad entre dos usuarios |
| `d!setlogchannel` | Configura el canal de registro *(requiere Gestionar servidor)* |
| `d!setannounce` | Configura los canales de anuncios con embed *(requiere Gestionar servidor)* |
| `d!announce` | Lanza un anuncio de versión, actualización o mantenimiento *(solo propietario)* |

### En desarrollo
| Área | Comandos previstos |
|------|--------------------|
| Confesiones anónimas | `d!confess` `d!setconfessionchannel` |
| Moderación | `d!ban` `d!unban` `d!clear` `d!warn` `d!unwarn` `d!checkwarn` `d!resetwarn` `d!lock` `d!unlock` |
| Tickets | `d!tickets` `d!close` |

---

## Registro automático

Draxe GPT registra la actividad del servidor como embeds en el canal que elijas.

```text
d!setlogchannel #registro     activar
d!setlogchannel off           desactivar
```

**Se registra:** entradas y salidas de miembros, cambios de roles y apodos, mensajes editados y eliminados, baneos, canales y roles creados o eliminados, y el uso de comandos.

**Privacidad por diseño**
- De los comandos solo se guarda el **nombre**, nunca los argumentos.
- `d!confess` **no se registra jamás**, para proteger el anonimato.
- Los mensajes de bots y del propio canal de registro se ignoran.
- Las menciones en los registros no notifican a nadie.

> Informa a los miembros de tu servidor de que existe este registro. Más detalles en [docs/tecnica/logging.md](docs/tecnica/logging.md).

---

## Arquitectura

```text
Plataforma ──▶ Adapter ──▶ Draxe Core ──▶ Servicios
(Discord…)     (traduce)   (lógica)       (Logging · Configuración · IA)
```

```text
src/
├─ core/services/      LoggingService · ConfigurationService
├─ adapters/discord/   DiscordLogger
└─ commands/           Comandos por categoría
tests/                 Pruebas con node:test
docs/                  Documentación (basico · tecnica · discord · minecraft · registro)
```

Principios: núcleo sin dependencias de plataforma, configuración por servidor (multi-tenant), persistencia sustituible (JSON hoy, SQLite próximamente) y secretos únicamente en variables de entorno. Más en [docs/tecnica/architecture.md](docs/tecnica/architecture.md).

---

## Ecosistema

Draxe GPT forma parte de un conjunto de proyectos que crecen juntos:

| Proyecto | Descripción | Estado | Documentación |
|----------|-------------|--------|---------------|
| 🤖 **Bot de Discord** | Comandos, registro automático y anuncios con embed | ✅ Activo | [Guía rápida](docs/basico/guia-rapida.md) |
| 💬 **Discord oficial** | Comunidad, versiones y actualizaciones | 🛠️ En montaje | [Comunidad](docs/discord/comunidad.md) · [Plantilla](docs/discord/plantilla.md) |
| ⛏️ **DraxeCraft Network** | Servidor de Minecraft Java + Bedrock: Survival custom y Skyblock OP | 🛠️ En preparación | [Ficha](docs/minecraft/README.md) |

### ⛏️ DraxeCraft Network

Red con proxy **Velocity**, servidores **Paper** (lobby, survival, skyblock), **Geyser/Floodgate** para Bedrock y **AuthMe** para jugadores no premium. Hosting en PC propio.

| Guía | Contenido |
|------|-----------|
| [Ficha y decisiones](docs/minecraft/README.md) | Nombre, modalidades, versión y autenticación |
| [Red DraxeCraft](docs/minecraft/draxecraft-network.md) | Proxy y modalidades |
| [Java + Bedrock](docs/minecraft/java-bedrock.md) | Geyser, Floodgate y compatibilidad |
| [Instalación paso a paso](docs/minecraft/instalacion-paso-a-paso.md) | Orden de ejecución |
| [Scripts](docs/minecraft/scripts/README.md) | Windows y Linux |
| [Comandos universales](docs/minecraft/comandos-universales.md) | `/ip` `/discord` `/tiktok` `/tienda` |
| [Video tutorial](docs/minecraft/video/prompts-nano-banana.md) | Guion y prompts |

> Los scripts y varios plugins están **pendientes de verificación en un equipo real**; cada guía indica qué falta confirmar.

---

## Hoja de ruta

- [x] Sistema de comandos modular
- [x] Centro de ayuda interactivo
- [x] Sugerencias con votación
- [x] Registro automático de eventos
- [x] Anuncios con embeds (versiones, actualizaciones, mantenimiento)
- [ ] Anuncio automático al publicar una versión en GitHub
- [ ] Consolidación del núcleo (mover `messageCreate` a `src/events`, `OWNER_ID` a `.env`)
- [ ] Confesiones anónimas
- [ ] Moderación completa
- [ ] Sistema de tickets
- [ ] Persistencia con SQLite
- [ ] Adapters de Telegram, WhatsApp e Instagram
- [ ] Panel web
- [x] Documentación, scripts y guías de DraxeCraft Network
- [ ] Comunidad oficial en Discord y lanzamiento de DraxeCraft Network

---

## Documentación

Índice completo: **[docs/README.md](docs/README.md)**

| Área | Documentos |
|------|-----------|
| 📘 [Básico](docs/basico/) | [Guía rápida](docs/basico/guia-rapida.md) · [Comandos](docs/basico/comandos.md) · [FAQ](docs/basico/faq.md) |
| 🏗️ [Técnica](docs/tecnica/) | [Arquitectura](docs/tecnica/architecture.md) · [Registro automático](docs/tecnica/logging.md) |
| 💬 [Discord](docs/discord/) | [Comunidad](docs/discord/comunidad.md) · [Plantilla](docs/discord/plantilla.md) · [Registro de cambios](docs/discord/registro-de-cambios.md) |
| ⛏️ [Minecraft](docs/minecraft/) | [Ficha](docs/minecraft/README.md) · [Red](docs/minecraft/draxecraft-network.md) · [Java + Bedrock](docs/minecraft/java-bedrock.md) |
| 🧾 [Registro](docs/registro/) | [Bitácora](docs/registro/bitacora.md) · [CHANGELOG](CHANGELOG.md) |
| ⚖️ Legal | [LICENSE](LICENSE) · [Privacidad](PRIVACY_POLICY.md) *(borrador)* · [Términos](TERMS_OF_SERVICE.md) *(borrador)* · [Avisos](NOTICE.md) |
| 🤝 Comunidad | [Contribuir](CONTRIBUTING.md) · [Código de conducta](CODE_OF_CONDUCT.md) · [Seguridad](SECURITY.md) · [Soporte](SUPPORT.md) |

---

## Seguridad

Si encuentras una vulnerabilidad, **no abras un issue público**: sigue el proceso de [SECURITY.md](SECURITY.md).

## Licencia

Copyright © 2026 Draxe GPT. Todos los derechos reservados.
Software propietario: consulta [LICENSE](LICENSE). Los textos legales del repositorio son borradores y no sustituyen asesoría jurídica.

<div align="center">

**⚡ Draxe GPT**

</div>
