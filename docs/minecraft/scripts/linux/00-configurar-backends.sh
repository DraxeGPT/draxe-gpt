#!/usr/bin/env bash
# DraxeCraft (Linux/ChromeOS) - configura lobby, survival y skyblock. Seguro de repetir.
BASE="${DRAXE_BASE:-$HOME/draxecraft}"
declare -A PORTS=([lobby]=25566 [survival]=25567 [skyblock]=25568)
for n in lobby survival skyblock; do
  d="$BASE/$n"; p="$d/server.properties"; echo "== $n =="
  [ -f "$p" ] || { echo "  Falta server.properties: arranca $n una vez (./start.sh), acepta el EULA y repite."; continue; }
  cp -f "$p" "$p.bak"
  sed -i -E "s/^server-port=.*/server-port=${PORTS[$n]}/; s/^server-ip=.*/server-ip=127.0.0.1/; s/^online-mode=.*/online-mode=false/; s/^enforce-secure-profile=.*/enforce-secure-profile=false/" "$p"
  grep -E '^(server-ip|server-port|online-mode|enforce-secure-profile)=' "$p"
  s="$d/spigot.yml"
  if [ -f "$s" ]; then cp -f "$s" "$s.bak"; sed -i 's/bungeecord: false/bungeecord: true/' "$s"; grep bungeecord "$s"
  else echo "  Falta spigot.yml (arranca el servidor una vez)."; fi
done
echo Listo.
