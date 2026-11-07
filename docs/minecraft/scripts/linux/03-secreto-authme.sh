#!/usr/bin/env bash
# DraxeCraft (Linux/ChromeOS) - clave compartida AuthMe. Arranca cada backend con AuthMe una vez antes.
BASE="${DRAXE_BASE:-$HOME/draxecraft}"; sf="$BASE/secreto-authme.txt"
if [ -f "$sf" ]; then S=$(tr -d '\n' <"$sf"); else S=$(tr -dc 'A-Za-z0-9' </dev/urandom | head -c 40); (umask 077; echo "$S" >"$sf"); echo "Clave nueva en $sf (no la subas a Git)."; fi
for n in lobby survival skyblock; do
  c="$BASE/$n/plugins/AuthMe/config.yml"; echo "== $n =="
  [ -f "$c" ] || { echo "  Falta $c (arranca el servidor con AuthMe una vez)."; continue; }
  cp -f "$c" "$c.bak"
  sed -i -E "s/^( *)bungeecord:.*/\1bungeecord: true/; s/^( *)proxySharedSecret:.*/\1proxySharedSecret: '$S'/; s/^( *)caching:.*/\1caching: false/" "$c"
  grep -E '^ *(bungeecord|sendPlayerTo|proxySharedSecret|caching):' "$c" | sed "s/$S/<clave>/"
done
echo "Falta en el PROXY: misma clave en authme-velocity (ver proxy/authme-velocity.cambios.txt). Clave en: $sf"
