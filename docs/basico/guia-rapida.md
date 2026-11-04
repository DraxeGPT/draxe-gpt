# Guía rápida

## 1. Instalar
```bash
git clone https://github.com/DraxeGPT/draxe-gpt.git
cd draxe-gpt
npm install
cp .env.example .env     # Windows: copy .env.example .env
```

## 2. Configurar `.env`
Completa `DISCORD_TOKEN`, `CLIENT_ID`, `OWNER_ID` y, si quieres, `PREFIX`.
**Nunca** subas `.env` a Git ni compartas el token.

## 3. Portal de Discord
Activa los intents *Server Members* y *Message Content* en tu aplicación.

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
