# Política de seguridad — Draxe GPT

## Versiones con soporte

| Versión | Soporte |
|---------|---------|
| 1.x     | Sí      |
| < 1.0   | No      |

## Cómo reportar una vulnerabilidad

**No abras un issue público.** Usa el reporte privado de GitHub:

`Security` → `Report a vulnerability` (en la pestaña del repositorio).

Incluye, si puedes:

- Descripción del problema e impacto estimado.
- Pasos para reproducirlo.
- Versión o commit afectado.
- Sugerencia de corrección (opcional).

## Tiempos de respuesta objetivo

| Etapa | Objetivo |
|-------|----------|
| Acuse de recibo | 72 horas |
| Evaluación inicial | 7 días |
| Corrección o plan de mitigación | 30 días (según severidad) |

## Alcance

Dentro del alcance: el bot de Discord, los adapters, los webhooks
(WhatsApp, Instagram, Telegram), el manejo de tokens y credenciales, la
persistencia de datos y el control de permisos.

Fuera del alcance: vulnerabilidades en Discord, Meta, Telegram u otras
plataformas de terceros (repórtalas a sus programas), ingeniería social y
ataques de denegación de servicio.

## Buenas prácticas del proyecto

- Los secretos viven solo en variables de entorno (`.env`, nunca en Git).
- Los webhooks se validan (firma/token) antes de procesarse.
- El bot solicita únicamente los permisos que necesita.
- Los logs no incluyen tokens ni credenciales.

## Si se filtra un secreto

1. Revócalo y genera uno nuevo en el panel correspondiente
   (Discord Developer Portal, Meta, Telegram BotFather).
2. Actualiza el `.env` y reinicia el bot.
3. Revisa el historial de Git; si el secreto llegó a un commit, considéralo
   comprometido aunque lo borres después.
