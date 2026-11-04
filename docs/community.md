# Comunidad oficial — Plantilla del servidor de Discord

Plantilla para el servidor oficial de **Draxe GPT**: versiones, actualizaciones, soporte y, a futuro, el servidor de Minecraft. Los elementos marcados con `[PENDIENTE]` aún no están definidos; no se publican datos que no estén confirmados.

Identidad: color `#5865F2` (moderación `#ED4245`), estética tecnológica, minimalista y premium. Prefijo de nombres de canal: minúsculas con guiones.

---

## 1. Estructura de categorías y canales

### 📌 INICIO
| Canal | Tipo | Quién escribe | Propósito |
|-------|------|---------------|-----------|
| `📜┃reglas` | Texto | Solo staff | Normas y condiciones de la comunidad |
| `👋┃bienvenida` | Texto | Solo staff | Presentación y enlaces clave |
| `🧭┃guia-rapida` | Texto | Solo staff | Cómo usar Draxe GPT, enlaces a la documentación |
| `🎭┃roles` | Texto | Solo staff | Roles de notificación por reacción o menú |

### 📣 NOVEDADES
| Canal | Tipo | Quién escribe | Propósito |
|-------|------|---------------|-----------|
| `📣┃anuncios` | Anuncios | Solo staff | Comunicados oficiales |
| `🚀┃versiones` | Anuncios | Solo staff / automático | Cada versión publicada (release) |
| `🛠️┃actualizaciones` | Anuncios | Solo staff / automático | Cambios y *commits* relevantes |
| `🔧┃mantenimiento` | Anuncios | Solo staff | Avisos de mantenimiento e incidencias |
| `🗺️┃hoja-de-ruta` | Texto | Solo staff | Qué viene y en qué estado está |

### 💬 COMUNIDAD
| Canal | Tipo | Quién escribe | Propósito |
|-------|------|---------------|-----------|
| `💬┃general` | Texto | Todos | Conversación general |
| `💡┃sugerencias` | Texto | Todos (vía `d!suggestion`) | Ideas con votación |
| `🖼️┃creaciones` | Texto | Todos | Lo que la comunidad construye con Draxe GPT |
| `🤖┃comandos` | Texto | Todos | Uso del bot, para no saturar otros canales |

### 🆘 SOPORTE
| Canal | Tipo | Quién escribe | Propósito |
|-------|------|---------------|-----------|
| `❓┃ayuda` | Foro | Todos | Una publicación por consulta |
| `🐞┃reportar-errores` | Foro | Todos | Errores con pasos para reproducirlos |
| `🎫┃tickets` | Texto | Todos (botón) | Asuntos privados con el equipo |

### ⛏️ MINECRAFT `[PENDIENTE: se activa al confirmar el servidor]`
| Canal | Tipo | Quién escribe | Propósito |
|-------|------|---------------|-----------|
| `⛏️┃info-servidor` | Texto | Solo staff | Dirección, versión, normas y modalidad |
| `📰┃novedades-mc` | Anuncios | Solo staff / automático | Actualizaciones, eventos y mantenimiento |
| `🎮┃chat-mc` | Texto | Todos | Conversación de jugadores |
| `🔗┃vincular-cuenta` | Texto | Todos | Vincular Discord con Minecraft |

### 👥 EQUIPO (privado)
| Canal | Propósito |
|-------|-----------|
| `🔒┃staff` | Coordinación del equipo |
| `🧾┃registro` | Canal de `d!setlogchannel` (registro automático) |
| `🔔┃despliegues` | Avisos automáticos de GitHub y errores del bot |

---

## 2. Roles

| Rol | Color | Permisos clave |
|-----|-------|----------------|
| Propietario | `#5865F2` | Administrador |
| Administrador | `#ED4245` | Gestionar servidor, roles y canales |
| Moderador | `#F0B232` | Expulsar, silenciar, gestionar mensajes |
| Colaborador | `#57F287` | Acceso a `🔔┃despliegues` |
| Miembro | `#99AAB5` | Rol base tras aceptar las reglas |
| Bot | `#5865F2` | Solo lo necesario (ver sección 5) |

**Roles de notificación** (opcionales, autoasignables): `Versiones`, `Actualizaciones`, `Mantenimiento`, `Minecraft`.

Principio: el rol base no recibe permisos de mención masiva. `@everyone` solo lo usa el staff para incidencias.

---

## 3. Permisos recomendados

- **Canales de NOVEDADES e INICIO:** `@everyone` puede ver y leer el historial; **no** escribir ni reaccionar con emojis nuevos. Solo el staff publica.
- **Anuncios:** habilita "Seguir canal" para que otras comunidades puedan recibir las novedades.
- **EQUIPO:** visible solo para Colaborador y superiores.
- **Verificación:** nivel *Medio* y filtro de contenido explícito activado. Pantalla de reglas (*Rules Screening*) activada.
- **Bot:** no le des Administrador en el servidor oficial; consulta la sección 5.

---

## 4. Textos listos para usar

### Reglas
1. Trata a todas las personas con respeto. No se toleran acoso, discriminación ni amenazas.
2. Nada de spam, autopromoción no autorizada ni enlaces engañosos.
3. Usa cada canal para su propósito.
4. No compartas datos personales, tokens, claves ni credenciales, tuyos o ajenos.
5. Las vulnerabilidades se reportan en privado (ver `SECURITY.md`), nunca en público.
6. Respeta los [Términos de Servicio de Discord](https://discord.com/terms) y sus directrices de comunidad.
7. Las decisiones del equipo de moderación son finales; puedes apelar por ticket.

### Bienvenida
```
⚡ Bienvenido a la comunidad oficial de Draxe GPT

Aquí publicamos versiones, actualizaciones y novedades del proyecto.
• Lee las reglas en #reglas y acéptalas para acceder al servidor.
• Elige tus notificaciones en #roles.
• ¿Dudas? Abre una publicación en #ayuda.

Documentación: https://github.com/DraxeGPT/draxe-gpt
```

---

## 5. Bot en el servidor oficial

Invita a Draxe GPT con permisos concretos en lugar de Administrador:

`Ver canales` · `Enviar mensajes` · `Insertar enlaces` · `Leer historial` · `Gestionar mensajes` · `Añadir reacciones` · `Gestionar roles` (solo si se usan roles por menú).

1. Ejecuta `d!setlogchannel #registro` en `🧾┃registro`.
2. Activa en el portal los intents *Server Members* y *Message Content*.
3. Informa a los miembros del registro automático en las reglas o en `👋┃bienvenida`.

---

## 6. Plantillas de publicación

### 🚀 Versión (`🚀┃versiones`)
```
🚀 Draxe GPT vX.Y.Z

📅 Fecha: AAAA-MM-DD
🔖 Tipo: Mayor / Menor / Corrección

✨ Novedades
• …

🛠️ Mejoras
• …

🐞 Correcciones
• …

⚠️ Cambios importantes (si los hay)
• …

📖 Detalle completo: <enlace al CHANGELOG o release>
```

### 🛠️ Actualización (`🛠️┃actualizaciones`)
```
🛠️ Actualización — <título corto>

Qué cambió: …
Por qué: …
Cómo afecta a los usuarios: …
Enlace: <commit o pull request>
```

### 🔧 Mantenimiento (`🔧┃mantenimiento`)
```
🔧 Mantenimiento programado

🕒 Inicio: <hora y zona horaria>
⏱️ Duración estimada: …
📌 Impacto: …

Te avisaremos cuando finalice.
```

### ⛏️ Novedades de Minecraft (`📰┃novedades-mc`) `[PENDIENTE]`
```
⛏️ <Nombre del servidor> — <asunto>

Versión: <versión confirmada>
Cambios: …
Eventos / mantenimiento: …
```
Los datos del servidor (nombre, dirección, versión, modalidad) se publican **solo después de confirmarlos**.

---

## 7. Automatización

| Qué | Cómo | Estado |
|-----|------|--------|
| Aviso de cada `push` a `🛠️┃actualizaciones` | Flujo de n8n «Draxe GPT – GitHub push a Discord» + webhook de GitHub | Creado; falta la URL del webhook de Discord |
| Aviso de cada *release* a `🚀┃versiones` | Segundo flujo de n8n con el evento *Release* de GitHub | Planificado |
| Registro del servidor | `d!setlogchannel` | Disponible |

Las URLs de webhook son credenciales: guárdalas en n8n o en `.env`, nunca en el repositorio.

---

## 8. Plan para el servidor de Minecraft

Aún no hay datos confirmados. Antes de anunciarlo, define:

- [ ] Nombre, modalidad (supervivencia, BoxPvP, etc.) y versión del juego
- [ ] Hosting, dirección y plugins (verificar compatibilidad y versión de cada uno)
- [ ] Rangos y permisos (LuckPerms) y vinculación con Discord (p. ej. DiscordSRV, verificando compatibilidad)
- [ ] Normas propias y política de datos de jugadores
- [ ] Qué canales de la categoría ⛏️ MINECRAFT se activan

En GitHub: se documentará en `docs/` y se tratará como proyecto independiente de Draxe GPT, sin mezclar configuraciones con otros servidores. No se afirmará disponibilidad, protección ni soporte que no esté implementado y comprobado.
