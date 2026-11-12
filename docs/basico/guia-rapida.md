# Guía rápida

**Requisitos:** Node.js 18+, npm y un bot creado en el [Portal de Desarrolladores](https://discord.com/developers/applications).

## 1. Instalar
```bash
git clone https://github.com/DraxeGPT/draxe-gpt.git
cd draxe-gpt
npm install
cp .env.example .env     # Windows: copy .env.example .env
```

## 2. Configurar `.env`
| Variable | Obligatoria | Descripción |
|----------|:-----------:|-------------|
| `DISCORD_TOKEN` | Sí | Token del bot |
| `CLIENT_ID` | Sí | ID de la aplicación (lo usa `d!invite`) |
| `OWNER_ID` | Sí | ID del propietario, para comandos restringidos |
| `PREFIX` | No | Prefijo de comandos (por defecto `d!`) |

> ⚠️ **Nunca** subas `.env` a Git ni compartas el token.

## 3. Portal de Discord
Activa en tu aplicación los intents **Server Members** y **Message Content**.
El bot usa `Guilds`, `GuildMessages`, `MessageContent`, `GuildMembers` y `GuildModeration` (este último para registrar baneos).

## 4. Ejecutar
```bash
npm run dev    # desarrollo
npm start      # producción
npm test       # pruebas
```

## 5. Primeros pasos en el servidor
1. Invita al bot con `d!invite`.
2. Escribe `d!help` para ver el centro de ayuda.
3. Activa el registro: `d!setlogchannel #registro`.

Siguiente: [Comandos](comandos.md) · [FAQ](faq.md)
