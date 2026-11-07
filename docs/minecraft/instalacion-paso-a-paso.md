# Orden de ejecucion (todo en PowerShell, carpeta C:\DraxeCraft)

Primera vez (desbloquear los scripts):
```powershell
cd C:\DraxeCraft
Get-ChildItem .\scripts\*.ps1 | Unblock-File
```
Ejecutar un script:  `powershell -ExecutionPolicy Bypass -File .\scripts\NOMBRE.ps1`

| Orden | Script | Cuando |
|:-----:|--------|--------|
| 1 | 00-configurar-backends.ps1 | Tras el primer arranque (y EULA) de lobby, survival y skyblock |
| 2 | 01-configurar-proxy.ps1 | Tras el primer arranque del proxy |
| 3 | 02-instalar-plugins.ps1 | Tras descargar los .jar a Descargas |
| 4 | 03-secreto-authme.ps1 | Tras arrancar cada backend CON AuthMe una vez |
| 5 | 04-comandos-universales.ps1 | Cuando tengas tus enlaces |

Todos son seguros de repetir; los que modifican archivos hacen copia .bak.
