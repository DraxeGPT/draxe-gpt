# Servidor de Minecraft Java + Bedrock (Geyser) — Guía paso a paso

Objetivo: un servidor **Java** al que también entren jugadores de **Bedrock** (Geyser + Floodgate) y que admita **launchers no premium**.

> Este paquete no incluye los `.jar` de los plugins: descárgalos tú de las fuentes oficiales (sección 3) para tener la versión exacta que coincide con tu servidor.

---

## 0. Decide el modo (importante)

| Modo | Java | Bedrock | Seguridad |
|------|------|---------|-----------|
| **A · Recomendado** — `online-mode=true` + Geyser + Floodgate | Solo cuentas oficiales | Entran **sin** cuenta de Java gracias a Floodgate | Alta: los nombres están verificados |
| **B · Tu caso** — `online-mode=false` + AuthMe + Geyser + Floodgate | Launchers no premium y premium | Entran con Floodgate | **Menor**: cualquiera puede escribir el nombre de otro jugador, incluido un admin, hasta que un plugin de login lo impida |

Lo que dice la documentación oficial de Geyser: *«Geyser no soporta el modo offline»*, y usar Geyser con un servidor en modo offline **sin Floodgate** es *«inmantenible y peligroso»*. Con Floodgate, Geyser funciona de forma soportada con servidores en modo online. **La combinación del modo B (servidor offline + Geyser + Floodgate + AuthMe) no la documenta el equipo de Geyser**: pruébala en cerrado antes de abrirla al público, en especial que los jugadores Bedrock no tengan que registrarse ni iniciar sesión con AuthMe.

Si no estás seguro, empieza en **A** y pasa a **B** solo cuando necesites a los jugadores no premium.

---

## 1. Requisitos
- Windows 10, 8 GB de RAM (el servidor usará ~4 GB como máximo) y buena conexión.
- **Java** de la versión que pida tu build de Paper (se indica en la página de descarga de Paper).
- Los puertos abiertos (sección 5).

## 2. Servidor Paper
1. Elige una **versión de Minecraft que soporten a la vez Paper, Geyser y Floodgate** (compruébalo en sus páginas de descarga).
2. Descarga Paper de https://papermc.io/downloads y guárdalo como `servidor/paper.jar`.
3. Ejecuta `start.bat`. Se detendrá y creará `eula.txt`.
4. Lee el EULA (https://aka.ms/MinecraftEULA) y, si lo aceptas, cambia tú `eula=false` por `eula=true`.
5. Vuelve a ejecutar `start.bat`. Cuando termine de cargar, escribe `stop`.
6. Aplica los valores de `server.properties.ejemplo` en el `server.properties` generado.

## 3. Plugins (oficiales)
| Plugin | Descarga | Para qué |
|--------|----------|----------|
| Geyser (Spigot) | https://geysermc.org/download | Permite entrar desde Bedrock |
| Floodgate | https://geysermc.org/download | Bedrock sin cuenta de Java |
| LuckPerms | https://luckperms.net/download | Rangos y permisos |
| AuthMe Reloaded | Página del proyecto en SpigotMC/GitHub (modo B) | Registro e inicio de sesión de los no premium |

Pon los `.jar` en `servidor/plugins/` y reinicia. Verifica con `geyser version` y `floodgate version`.

## 4. Configuración
1. **Geyser** → `plugins/Geyser-Spigot/config.yml`: ver `plugins/Geyser-Spigot.config.cambios.yml` (`auth-type: floodgate`, puerto Bedrock `19132`).
2. **Floodgate** → `plugins/floodgate/config.yml`: ver `plugins/Floodgate.config.cambios.yml`. Haz **copia de seguridad de `key.pem`** y no la compartas.
3. **LuckPerms** → ejecuta los comandos de `luckperms-inicial.txt`.
4. **Whitelist** (recomendada en modo B): `whitelist add NombreJava` · `fwhitelist add NombreBedrock` (sin el prefijo `.`).
5. Si usas AuthMe (modo B): los jugadores usan `/register <contraseña> <contraseña>` y luego `/login <contraseña>`.

## 5. Puertos y acceso desde fuera
| Quién | Puerto | Protocolo |
|-------|--------|-----------|
| Java | 25565 | TCP |
| Bedrock | 19132 | UDP (y TCP, según la documentación de Geyser) |

- **Desde tu casa:** abre esos puertos en el router y en el Firewall de Windows hacia tu PC.
- **Sin abrir puertos:** un túnel como **playit.gg** soporta TCP y UDP (la documentación de Geyser lo recomienda; ngrok **no** sirve porque no maneja UDP).
- **Hosting externo:** antes de contratar, confirma que permite el puerto **UDP** de Bedrock. **No he podido verificar** si Aternos admite Geyser con Bedrock; compruébalo en su documentación.
- Jugadores Java: `tu-dirección:25565`. Jugadores Bedrock: la misma dirección y el puerto `19132`.

## 6. Pruebas antes de abrirlo
- [ ] Un jugador Java premium entra.
- [ ] Un jugador Java no premium entra, se registra y se identifica (modo B).
- [ ] Un jugador Bedrock entra **sin** pedirle registro de AuthMe.
- [ ] Un nombre no premium **no** puede suplantar a un admin (sin login no hace nada).
- [ ] Los permisos de staff funcionan por grupo.
- [ ] Reinicio completo y copia de seguridad hechos.

## 7. Seguridad (modo B)
- Nadie con rango de staff debe ser `op` por nombre; usa grupos de LuckPerms.
- Whitelist activa y contraseñas largas en AuthMe.
- Copia de seguridad semanal del mundo y de `key.pem`.
- Mantén servidor y plugins actualizados.

## 8. Discord
Anuncios del servidor con el bot: `d!setannounce minecraft #📰┃novedades-mc` y `d!announce minecraft …`. La vinculación de cuentas con Discord (p. ej. DiscordSRV) se evalúa aparte: con jugadores no premium la identidad no es fiable, así que no la uses para dar rangos automáticamente.

## Fuentes consultadas
- Documentación de Geyser: [Setup](https://geysermc.org/wiki/geyser/setup/) y [FAQ](https://geysermc.org/wiki/geyser/faq/)
- [Nodecraft — Geyser y Floodgate](https://nodecraft.com/support/games/minecraft/setup/setting-up-geyser-and-floodgate-for-java-bedrock-crossplay)
- [MineGuard — Floodgate](https://mineguard.pro/en/blog/floodgate-bedrock-java-account-setup-guide)

Los nombres exactos de las claves de configuración pueden cambiar entre versiones: ante cualquier diferencia, manda la documentación oficial de cada plugin.
