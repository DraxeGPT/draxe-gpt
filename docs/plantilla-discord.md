# Plantilla del servidor de Discord

Plantilla completa y **ejecutable** del servidor oficial: roles, categorías, canales, permisos, reglas y mensajes (embeds). La estructura vive en [`config/discord-template.json`](../config/discord-template.json) y se aplica con un script.

Para el contexto de la comunidad y el plan de Minecraft, consulta [community.md](community.md).

## Aplicarla

1. Crea (o elige) un servidor vacío y activa **Comunidad** en Ajustes del servidor (necesario para canales de anuncios y foros; si no está activo, se crean como texto).
2. Invita a Draxe GPT con **Gestionar roles**, **Gestionar canales**, **Ver canales**, **Enviar mensajes** e **Insertar enlaces**.
3. Con el modo de desarrollador activado, copia el ID del servidor y ejecuta:

```bash
npm run setup:discord -- <GUILD_ID> --dry-run    # simula, no toca nada
npm run setup:discord -- <GUILD_ID>              # aplica
```

**Garantías:** nunca borra nada; lo que ya existe (por nombre) se conserva; los mensajes solo se publican en canales vacíos; es seguro ejecutarlo varias veces.

Después: sube el rol del bot por encima de los roles que deba gestionar, asígnate **Administrador**, activa la pantalla de reglas y retira los permisos de gestión al bot si ya no los necesita.

## Roles

| Rol | Color | Función |
|-----|-------|---------|
| Administrador | `#ED4245` | Gestión del servidor y moderación completa |
| Moderador | `#F0B232` | Expulsar, silenciar, gestionar mensajes |
| Colaborador | `#57F287` | Acceso a canales de equipo |
| Miembro | `#99AAB5` | Rol base para participar |
| 🔔 Versiones · Actualizaciones · Mantenimiento · Minecraft | `#5865F2` / `#57F287` | Notificaciones opcionales y mencionables |

El propietario del servidor no necesita rol. Asigna **Miembro** a quien acepte las reglas.

## Canales y acceso

| Categoría | Canales | Acceso |
|-----------|---------|--------|
| 📌 INICIO | reglas · bienvenida · guia-rapida · roles | Todos leen; solo staff escribe |
| 📣 NOVEDADES | anuncios · versiones · actualizaciones · mantenimiento · hoja-de-ruta | Todos leen; solo staff escribe |
| 💬 COMUNIDAD | general · sugerencias · creaciones · comandos | Solo Miembro |
| 🆘 SOPORTE | ayuda (foro) · reportar-errores (foro) · tickets | Solo Miembro |
| ⛏️ MINECRAFT | info-servidor · novedades-mc · chat-mc · vincular-cuenta | Solo Miembro (informativos en solo lectura) |
| 👥 EQUIPO | staff · registro · despliegues | Colaborador, Moderador y Administrador |

La categoría de Minecraft queda lista pero con datos **pendientes de confirmar** (ver [community.md](community.md#8-plan-para-el-servidor-de-minecraft)).

## Mensajes (embeds) iniciales

Se publican en `reglas`, `bienvenida`, `guia-rapida` y `roles`, con la identidad de Draxe GPT (`#5865F2`). El de reglas incluye un aviso sobre el [registro automático](logging.md). Edita los textos en el JSON antes de aplicar la plantilla.

## Bots e integraciones

| Pieza | Función | Estado |
|-------|---------|--------|
| **Draxe GPT** | Comandos, sugerencias y registro automático (`d!setlogchannel #🧾┃registro`) | Activo |
| Moderación y tickets de Draxe GPT | Baneos, advertencias, tickets | En desarrollo |
| Flujo de n8n «GitHub push a Discord» | Avisos a `🛠️┃actualizaciones` o `🔔┃despliegues` | Creado; falta la URL del webhook |
| Segundo flujo de n8n (*releases*) | Avisos a `🚀┃versiones` | Planificado |

Principios: permisos mínimos para cada bot, nada de Administrador salvo en la configuración inicial, y las URLs de webhook y tokens fuera del repositorio.

## Reglas y verificación recomendadas

- Nivel de verificación *Medio* y filtro de contenido explícito activado.
- Pantalla de reglas (*Rules Screening*) activada.
- `@everyone` reservado al staff para incidencias.
- Informar a los miembros del registro automático (ya incluido en el embed de reglas).
