# Guía de contribución — Draxe GPT

Draxe GPT es un proyecto **propietario** (ver [LICENSE](LICENSE)). Las
contribuciones se aceptan **solo por invitación** del titular del proyecto.

## Antes de empezar

1. Recibe confirmación del titular de que puedes colaborar.
2. Acepta por escrito que el código que aportes pasa a ser propiedad del
   proyecto y que tienes derecho a aportarlo.
3. Lee [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) y [SECURITY.md](SECURITY.md).

## Flujo de trabajo

```text
main        → rama estable (protegida, sin commits directos)
dev         → integración
feat/xxx    → nuevas funciones
fix/xxx     → correcciones
docs/xxx    → documentación
```

1. Crea tu rama desde `dev`.
2. Haz commits pequeños con mensajes claros (`feat:`, `fix:`, `docs:`,
   `refactor:`, `test:`, `chore:`).
3. Abre un Pull Request hacia `dev` describiendo qué cambia, por qué y cómo
   se probó.
4. Espera la revisión del titular. No hagas merge de tu propio PR.

## Reglas técnicas

- **Node.js 18+**, **CommonJS**, discord.js v14.
- **Sin lógica de negocio en los adapters.** La lógica vive en `src/core/`;
  los adapters (Discord, Telegram, WhatsApp, Instagram) solo traducen.
- **No dupliques lógica por plataforma.** Una función de negocio, varios adapters.
- Los comandos de Discord usan el prefijo `d!` y viven en `src/commands/`.
- Mantén la identidad visual: color `#5865F2` (moderación `#ED4245`),
  estética limpia y minimalista.
- Los datos importantes deben persistir (no solo `Map()` o `Set()` en memoria).
- Escribe pruebas para servicios, repositorios y verificación de permisos.

## Seguridad (obligatorio)

- **Nunca** subas tokens, claves de API, credenciales ni archivos `.env`.
- Usa variables de entorno y mantén `.env` en `.gitignore`.
- No imprimas secretos en logs.
- Si expones un secreto por error, avisa de inmediato y rótalo.

## Checklist del Pull Request

- [ ] El código corre con `npm run dev` sin errores
- [ ] No hay secretos en el diff
- [ ] No se rompió el Help Center (`helpmenu`) ni comandos existentes
- [ ] Se agregaron o actualizaron pruebas
- [ ] Se actualizó `CHANGELOG.md` y la documentación afectada
