# Comandos universales de DraxeCraft Network

Comandos que funcionan en **todos** los servidores de la red (lobby, survival, skyblock), porque viven en el proxy Velocity y no en cada servidor.

| Comando | Alias | Qué hace |
|---|---|---|
| `/ip` | `/play` | Muestra la IP Java y el puerto Bedrock; permite copiarla |
| `/discord` | `/dc` | Enlace al Discord oficial |
| `/tiktok` | `/tt` | Enlace al TikTok oficial |
| `/tienda` | `/store`, `/shop` | Enlace a la tienda |

## Cómo se implementan
Con el plugin **VelocityCustomCommand** (VCC), que ejecuta acciones definidas en su configuración (texto MiniMessage, abrir enlace, copiar al portapapeles, ejecutar o sugerir comando).

1. Instala VCC en `proxy/plugins/` y arranca el proxy una vez.
2. Ejecuta `scripts/windows/04-comandos-universales.ps1` (pide IP, puerto Bedrock y enlaces). Genera `comandos-vcc.yml`.
3. Pega ese contenido en el archivo de configuración que VCC creó en `proxy/plugins/`.
4. Reinicia el proxy y prueba `/ip`.

Si un enlace queda vacío, el comando responde «Próximamente».

## Pendiente de verificar
- Nombre exacto del archivo de configuración de VCC.
- Que los jugadores de **Bedrock** puedan pulsar enlaces del chat; si no, mostrar el texto plano.
