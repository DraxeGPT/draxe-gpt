# Scripts de instalación

Automatizan la configuración de DraxeCraft Network. Todos crean copias `.bak` antes de modificar un archivo y se pueden repetir.

**No se han probado en un equipo real todavía**; revisa los cambios antes de arrancar.

| Paso | Windows (`windows/`) | Linux (`linux/`) | Qué hace |
|---|---|---|---|
| 00 | `00-configurar-backends.ps1` | `.sh` | Puertos internos 25566–25568, `online-mode=false`, `bungeecord: true` |
| 01 | `01-configurar-proxy.ps1` | `.sh` | `velocity.toml`: bind 25565, forwarding legacy, servidores, `try` |
| 02 | `02-instalar-plugins.ps1` | `.sh` | Copia los jars descargados a cada `plugins/` |
| 03 | `03-secreto-authme.ps1` | `.sh` | Genera y aplica la clave compartida de AuthMe |
| 04 | `04-comandos-universales.ps1` | — | Genera `comandos-vcc.yml` |

Windows: `Get-ChildItem .\scripts\windows\*.ps1 | Unblock-File` y luego `powershell -ExecutionPolicy Bypass -File .\NOMBRE.ps1`.
Linux: `bash NOMBRE.sh`. ChromeOS solo sirve si el equipo trae el entorno de Linux; ChromeOS sin Linux no puede alojar el servidor.

La clave `secreto-authme.txt` **nunca** se sube a Git.
