# Preguntas frecuentes

**¿Es software libre?** No. Es propietario; consulta [LICENSE](../../LICENSE).

**¿Qué plataformas soporta?** Discord. Telegram, WhatsApp e Instagram están planificadas.

**El bot no responde a los comandos.** Revisa que el prefijo sea correcto, que el intent *Message Content* esté activado y que el bot tenga permiso para ver y escribir en el canal.

**El registro automático no publica nada.** Verifica que ejecutaste `d!setlogchannel`, que el bot tiene *Ver canal*, *Enviar mensajes* e *Insertar enlaces* en ese canal y que el intent *Server Members* está activo.

**¿Qué datos registra el bot?** Eventos del servidor (miembros, mensajes, baneos, canales, roles) y el *nombre* de los comandos usados. Nunca los argumentos, y `d!confess` jamás. Ver [logging](../logging.md).

**¿Cómo reporto un error o una vulnerabilidad?** Errores: [Issues](https://github.com/DraxeGPT/draxe-gpt/issues/new/choose). Vulnerabilidades: en privado, según [SECURITY.md](../../SECURITY.md).
