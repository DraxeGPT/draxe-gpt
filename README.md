<div align="center">

# ⚡ DRAXE GPT

**Plataforma multicanal de automatización e inteligencia artificial**

[![Status](https://img.shields.io/badge/status-en%20desarrollo-yellow?style=flat-square)]()
[![Discord](https://img.shields.io/badge/plataforma-Discord-5865F2?style=flat-square&logo=discord)]()
[![License](https://img.shields.io/badge/licencia-Propietaria-red?style=flat-square)]()
[![Node](https://img.shields.io/badge/Node.js-18%2B-green?style=flat-square&logo=node.js)]()

</div>

---

## ¿Qué es Draxe GPT?

Draxe GPT es una plataforma de automatización e IA diseñada para operar en múltiples canales de comunicación desde un único núcleo central.

Comenzó como un bot de Discord y está evolucionando hacia una plataforma completa que soporta:

- **Discord** — plataforma principal (activa)
- **Telegram** — en desarrollo
- **WhatsApp** — en desarrollo
- **Instagram** — en desarrollo

---

## Arquitectura

```
             ⚡ DRAXE GPT
                  │
           DRAXE CORE
                  │
   ┌──────────────┼──────────────┐
   │              │              │
Discord       Telegram      WhatsApp
                                 │
                             Instagram
```

El núcleo contiene la lógica de negocio. Cada plataforma funciona como un adapter independiente.

---

## Comandos disponibles (Discord)

### 📌 Información
| Comando | Descripción |
|---------|-------------|
| `d!help` | Centro de ayuda interactivo |
| `d!userinfo` | Información de un usuario |
| `d!serverinfo` | Información del servidor |
| `d!botinfo` | Información del bot (solo owner) |
| `d!host` | Monitor del host (solo owner) |

### 🛠️ Utilidades
| Comando | Descripción |
|---------|-------------|
| `d!suggestion` | Sistema de sugerencias con votación |
| `d!invite` | Invitar Draxe GPT a un servidor |
| `d!8ball` | Bola 8 mágica |
| `d!ship` | Compatibilidad entre usuarios |
| `d!confess` | Sistema de confesiones anónimas |
| `d!setlogchannel` | Configura el canal de registro automático |

### 🛡️ Moderación *(en desarrollo)*
`d!ban` `d!unban` `d!clear` `d!warn` `d!unwarn` `d!checkwarn` `d!resetwarn` `d!lock` `d!unlock`

### 🎫 Tickets *(en desarrollo)*
`d!tickets` `d!close`

---

## Instalación

### Requisitos
- Node.js 18 o superior
- npm 9 o superior
- Token de bot de Discord

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/draxe-gpt.git
cd draxe-gpt

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Edita .env con tus credenciales

# 4. Iniciar en desarrollo
npm run dev

# 5. Iniciar en producción
npm start
```

### Variables de entorno

```env
DISCORD_TOKEN=tu_token_aqui
CLIENT_ID=tu_client_id_aqui
OWNER_ID=tu_id_de_discord_aqui
PREFIX=d!
```

---

## Stack tecnológico

| Tecnología | Uso |
|-----------|-----|
| Node.js | Runtime principal |
| discord.js v14 | Adapter de Discord |
| dotenv | Variables de entorno |
| SQLite *(próximo)* | Persistencia de datos |

---

## Roadmap

- [x] Sistema de comandos modular
- [x] Help Center interactivo
- [x] Sistema de sugerencias con votación
- [x] Registro automático de eventos (logs en Discord)
- [ ] Sistema de confesiones
- [ ] Moderación completa
- [ ] Sistema de tickets
- [ ] Persistencia con SQLite
- [ ] Draxe Core (servicios centrales)
- [ ] Adapter Telegram
- [ ] Adapter WhatsApp
- [ ] Adapter Instagram
- [ ] Dashboard web
- [ ] Draxe Brand Agent (app móvil)

---

## Licencia

Copyright © 2026 Draxe GPT. Todos los derechos reservados.

Este software es propietario. Consulta el archivo [LICENSE](LICENSE) para más información.

---

<div align="center">

**⚡ Draxe GPT** — Tu plataforma de automatización e IA multicanal

</div>
