# DraxeCraft Network — Guía de instalación en tu PC

Red de Minecraft **Java + Bedrock**, con jugadores **premium y no premium**, versión base **1.21.11**, con dos modalidades:

| Servidor | Modalidad | Puerto interno |
|----------|-----------|:--------------:|
| `proxy` (Velocity) | Entrada única de la red | **25565** (Java) · **19132** (Bedrock) |
| `lobby` | Login y reparto de jugadores | 25566 |
| `survival` | Survival custom: encantamientos custom, crates, dungeons | 25567 |
| `skyblock` | Skyblock OP | 25568 |

```
Java ──TCP 25565──┐
                  ├─▶ Velocity (proxy, offline) ─▶ lobby ─▶ survival
Bedrock ─UDP 19132┘      │  Geyser + Floodgate + AuthMe        └▶ skyblock
```
Los servidores internos escuchan solo en `127.0.0.1`: nadie entra sin pasar por el proxy.

## ⚠️ Antes de empezar (verificado en la documentación)
1. **Modo B (no premium) = menor seguridad.** Sin verificación de cuentas, alguien puede usar el nombre de otro jugador hasta que AuthMe se lo impida. Usa whitelist, contraseñas largas y no des `op` por nombre.
2. **Geyser solo soporta oficialmente servidores en modo online.** Servidor offline + Geyser + Floodgate + AuthMe **no está documentado** por el equipo de Geyser: hay que probarlo.
3. **La documentación de AuthMe no menciona Floodgate ni Bedrock.** Debes comprobar que un jugador Bedrock **no** tenga que registrarse/loguearse en AuthMe (o decidir cómo gestionarlo).
4. **Versión:** la página de versiones de Geyser indica que **emula un cliente Java 26.3** y Bedrock 26.40–26.62, y **no menciona 1.21.11**. Para que Geyser conecte con un servidor 1.21.11 puede hacer falta **ViaVersion**; **no lo he verificado**. Alternativas: (a) 1.21.11 + ViaVersion, probado en cerrado; (b) subir todo a la versión que Geyser soporta de forma nativa, **solo si** los plugins de ambas modalidades la soportan (ahora mismo ExcellentEnchants lista 1.21.8–26.1.2 y BSkyBlock 1.20.0 pide Paper 1.21.11).
5. **Tu PC (i5-4460S, 8 GB):** correr proxy + lobby + survival + skyblock a la vez es **muy justo** (estimación: ~5 GB solo de Java, más Windows). Empieza con proxy + lobby + survival y arranca skyblock cuando lo necesites, o baja la memoria de `start.bat`. Un jugador por encima de ~10 simultáneos pedirá más hardware.

## 1. Descargas (oficiales)
| Pieza | Dónde |
|-------|-------|
| Paper (backends) | https://papermc.io/downloads |
| Velocity (proxy) | https://papermc.io/downloads (sección Velocity) |
| Geyser-Velocity y Floodgate (proxy y Paper) | https://geysermc.org/download |
| AuthMe Reloaded + authme-velocity | https://github.com/AuthMe/AuthMeReloaded |
| LuckPerms | https://luckperms.net/download |
| NightCore + ExcellentEnchants | https://hangar.papermc.io/NightExpress/ExcellentEnchants |
| BentoBox + BSkyBlock | https://hangar.papermc.io/BentoboxWorld/SkyBlock-BSkyBlock · https://docs.bentobox.world |

Comprueba en cada página que la versión descargada **lista tu versión de Minecraft** como compatible (la propia de cada plugin manda).

## 2. Pasos
1. Crea cada carpeta (`proxy`, `lobby`, `survival`, `skyblock`) con su `.jar` (`velocity.jar` / `paper.jar`).
2. Arranca **cada Paper** con su `start.bat`; se detendrá por el EULA. Léelo (https://aka.ms/MinecraftEULA) y, si lo aceptas, cambia tú `eula=true`. Vuelve a arrancar y ejecuta `stop`.
3. Aplica `server.properties.ejemplo` y `spigot.yml.cambios` en cada backend.
4. Arranca el proxy una vez y aplica `velocity.toml.cambios`. **Reinicia.**
5. Instala los plugins de cada carpeta (`plugins/LEEME.txt`).
6. Genera la clave compartida: la `key.pem` de Floodgate del **proxy** debe ser **la misma** en los backends que lleven Floodgate. Haz copia y no la compartas.
7. Configura AuthMe: `authme-velocity.cambios.txt` en el proxy y `authme.config.cambios.txt` en los tres backends. Genera **una** clave larga aleatoria para `proxySharedSecret` y úsala en todas partes.
8. Orden de arranque: `lobby` → `survival` (y `skyblock` si hay RAM) → `proxy`.

## 3. Puertos y acceso desde fuera
- **Desde tu casa (Java):** TCP 25565 hacia tu PC. **Bedrock:** UDP 19132 (y TCP, según la documentación de Geyser). Abre el Firewall de Windows y el router, o usa **playit.gg** (TCP+UDP; ngrok no vale por no tener UDP).
- **NO** abras 25566-25568: son internos.
- Jugadores Java: `tu-dirección:25565`. Bedrock: misma dirección, puerto `19132`.
- Tu IP de casa queda expuesta si no usas un túnel: ten en cuenta esa implicación antes de publicarla.

## 4. Modalidad Survival custom
Objetivo: progresión con encantamientos propios, crates, dungeons y economía.
| Sistema | Pieza | Estado |
|---------|-------|--------|
| Encantamientos custom | NightCore + ExcellentEnchants | Listado compatible con 1.21.11 (la página dice que lo no listado **no** está soportado) |
| Crates | ExcellentCrates | **Por verificar** (versión y dependencias) |
| Dungeons | — | **Por evaluar:** no he verificado ninguna opción; criterios: compatibilidad 1.21.11, mantenimiento activo, que funcione en Bedrock vía Geyser |
| Economía y rangos | LuckPerms + economía a elegir | Por definir |

Los nombres exactos de claves de configuración de cada plugin se toman de su archivo generado: no se inventan aquí.

## 5. Modalidad Skyblock OP
- Base: **BentoBox + BSkyBlock** (BSkyBlock 1.20.0 exige BentoBox 3.13.0+ y Paper 1.21.11).
- «OP» = progresión muy acelerada: define las reglas (generadores mejorados, límites de isla ampliados, recompensas altas) **antes** de configurar; se aplican con los ajustes de BentoBox/BSkyBlock y addons compatibles, verificados uno a uno.
- Instalación: BentoBox → arrancar una vez → BSkyBlock en la carpeta `addons` → reiniciar → editar `config.yml` → reiniciar.

## 6. Pruebas antes de abrir
- [ ] Java premium y Java no premium entran por el proxy y se identifican en el lobby.
- [ ] Un jugador Bedrock entra; comprobado **qué** pasa con AuthMe.
- [ ] Un nombre no premium no puede suplantar a un admin.
- [ ] Pasar lobby → survival → skyblock y volver.
- [ ] Los puertos internos 25566-25568 **no** son accesibles desde fuera.
- [ ] Enchants, crates y islas funcionan también en Bedrock.
- [ ] Copia de seguridad de mundos, `key.pem` y bases de AuthMe.

## Fuentes
[Geyser · Setup](https://geysermc.org/wiki/geyser/setup/) · [Geyser · FAQ](https://geysermc.org/wiki/geyser/faq/) · [Geyser · Versiones](https://geysermc.org/wiki/geyser/supported-versions) · [AuthMe · Proxy](https://github.com/AuthMe/AuthMeReloaded/wiki/Proxy-Configuration) · [ExcellentEnchants](https://hangar.papermc.io/NightExpress/ExcellentEnchants) · [BSkyBlock](https://docs.bentobox.world/en/latest/gamemodes/BSkyBlock/)
