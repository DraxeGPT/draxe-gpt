# Plantilla del servidor de Discord — para copiar y pegar

Todo está listo para copiar. Los datos de Minecraft quedan `[PENDIENTE]` hasta confirmarlos.

---

## 1. Roles (créalos en este orden, de arriba abajo)

| Rol | Color | Mostrar por separado | Permisos |
|-----|-------|:--------------------:|----------|
| Administrador | `#ED4245` | Sí | Gestionar servidor, roles y canales; expulsar, banear, silenciar; gestionar mensajes; ver registro de auditoría |
| Moderador | `#F0B232` | Sí | Expulsar, silenciar, gestionar mensajes, ver registro de auditoría |
| Colaborador | `#57F287` | Sí | Ninguno extra (solo acceso a canales de equipo) |
| Miembro | `#99AAB5` | No | Ninguno extra (rol base) |
| 🔔 Versiones | `#5865F2` | No | Ninguno · permitir mención |
| 🔔 Actualizaciones | `#5865F2` | No | Ninguno · permitir mención |
| 🔔 Mantenimiento | `#5865F2` | No | Ninguno · permitir mención |
| 🔔 Minecraft | `#57F287` | No | Ninguno · permitir mención |

El rol del bot debe quedar **por encima** de los roles que gestione y **sin Administrador**.

---

## 2. Canales (copia los nombres tal cual)

```
📌 INICIO                    · todos leen, solo staff escribe
  📜┃reglas
  👋┃bienvenida
  🧭┃guia-rapida
  🎭┃roles

📣 NOVEDADES                 · todos leen, solo staff escribe
  📣┃anuncios                (tipo Anuncios)
  🚀┃versiones               (tipo Anuncios)
  🛠️┃actualizaciones        (tipo Anuncios)
  🔧┃mantenimiento           (tipo Anuncios)
  🗺️┃hoja-de-ruta

💬 COMUNIDAD                 · solo rol Miembro
  💬┃general
  💡┃sugerencias
  🖼️┃creaciones
  🤖┃comandos

🆘 SOPORTE                   · solo rol Miembro
  ❓┃ayuda                   (tipo Foro)
  🐞┃reportar-errores        (tipo Foro)
  🎫┃tickets

⛏️ MINECRAFT                 · solo rol Miembro · [PENDIENTE]
  ⛏️┃info-servidor           (solo lectura)
  📰┃novedades-mc            (solo lectura)
  🎮┃chat-mc
  🔗┃vincular-cuenta

👥 EQUIPO                    · privado: Colaborador, Moderador, Administrador
  🔒┃staff
  🧾┃registro                (canal de d!setlogchannel)
  🔔┃despliegues             (avisos de GitHub y errores)
```

**Permisos de canal:** en las categorías públicas de lectura, `@everyone` ve y lee el historial pero no escribe; en las de Miembro, `@everyone` no ve el canal y `Miembro` sí; en EQUIPO, `@everyone` no ve nada.

**Descripciones de canal (tema):**
- reglas: `Normas de la comunidad. Léelas antes de participar.`
- versiones: `Cada versión publicada de Draxe GPT.`
- actualizaciones: `Cambios y avances del proyecto.`
- mantenimiento: `Mantenimiento e incidencias.`
- reportar-errores: `Incluye pasos para reproducir el error. Nunca compartas tokens.`
- registro: `Registro automático del servidor.`

---

## 3. Mensajes para pegar

### 📜 #reglas
```
# 📜 Reglas de la comunidad
Al participar aceptas estas normas.

**1 · Respeto** — Trata a todas las personas con respeto. No se toleran acoso, discriminación ni amenazas.
**2 · Sin spam** — Nada de spam, autopromoción no autorizada ni enlaces engañosos.
**3 · Cada tema en su canal** — Usa cada canal para su propósito.
**4 · Privacidad y seguridad** — No compartas datos personales, tokens, claves ni credenciales, tuyos o ajenos.
**5 · Vulnerabilidades** — Repórtalas en privado (consulta SECURITY.md en GitHub), nunca en público.
**6 · Discord** — Respeta los Términos de Servicio y las Directrices de la Comunidad de Discord.
**7 · Moderación** — Las decisiones del equipo son finales; puedes apelar abriendo un ticket.

ℹ️ **Registro:** este servidor usa un registro automático de eventos (entradas, salidas, mensajes editados o eliminados, baneos y cambios de canales o roles).
```

### 👋 #bienvenida
```
# ⚡ Bienvenido a Draxe GPT
Aquí publicamos versiones, actualizaciones y novedades del proyecto.

• Lee las reglas en **#reglas**.
• Elige tus notificaciones en **#roles**.
• ¿Dudas? Abre una publicación en **#ayuda**.

📚 Documentación: https://github.com/DraxeGPT/draxe-gpt
```

### 🧭 #guia-rapida
```
# 🧭 Guía rápida
Escribe `d!help` para abrir el centro de ayuda.

**Información** — `d!userinfo` · `d!serverinfo`
**Utilidades** — `d!suggestion` · `d!8ball` · `d!ship` · `d!invite`
**Administración** — `d!setlogchannel` (requiere Gestionar servidor)
```

### 🎭 #roles
```
# 🎭 Roles de notificación
Pide al equipo los avisos que te interesen:

🔔 **Versiones** — nuevas versiones publicadas
🔔 **Actualizaciones** — cambios y avances del proyecto
🔔 **Mantenimiento** — mantenimiento e incidencias
🔔 **Minecraft** — novedades del servidor de Minecraft
```

### 🚀 Plantilla de versión (#versiones)
```
# 🚀 Draxe GPT vX.Y.Z
📅 Fecha: AAAA-MM-DD · 🔖 Tipo: Mayor / Menor / Corrección

✨ **Novedades**
• …
🛠️ **Mejoras**
• …
🐞 **Correcciones**
• …
⚠️ **Cambios importantes**
• …

📖 Detalle: <enlace al CHANGELOG>
```

### 🛠️ Plantilla de actualización (#actualizaciones)
```
# 🛠️ Actualización — <título corto>
**Qué cambió:** …
**Por qué:** …
**Cómo afecta:** …
**Enlace:** <commit o pull request>
```

### 🔧 Plantilla de mantenimiento (#mantenimiento)
```
# 🔧 Mantenimiento programado
🕒 Inicio: <hora y zona horaria>
⏱️ Duración estimada: …
📌 Impacto: …
Te avisaremos cuando finalice.
```

### ⛏️ Plantilla de Minecraft (#novedades-mc) · [PENDIENTE]
```
# ⛏️ <Nombre del servidor> — <asunto>
**Versión:** <confirmada>
**Cambios:** …
**Eventos / mantenimiento:** …
```

---

## 4. Bots

| Bot / integración | Función | Permisos mínimos |
|-------------------|---------|------------------|
| **Draxe GPT** | Comandos, sugerencias y registro automático | Ver canales, Enviar mensajes, Insertar enlaces, Leer historial, Gestionar mensajes |
| Flujo de n8n (GitHub → Discord) | Avisos de cada actualización | Solo un webhook en el canal de destino |

Intents del bot en el portal: *Server Members* y *Message Content*. Después de crear el canal de registro, ejecuta `d!setlogchannel #🧾┃registro`.

---

## 5. Ajustes del servidor recomendados
- Verificación *Media* y filtro de contenido explícito activado.
- Pantalla de reglas (*Rules Screening*) activada; al aceptarla se asigna **Miembro**.
- `@everyone` reservado al staff para incidencias.
