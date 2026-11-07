#!/usr/bin/env bash
# DraxeCraft (Linux/ChromeOS) - copia jars de ~/Descargas (o ~/Downloads) a cada plugins/.
BASE="${DRAXE_BASE:-$HOME/draxecraft}"
DL="${DRAXE_DL:-$HOME/Downloads}"; [ -d "$DL" ] || DL="$HOME/Descargas"
put(){ # patron destinos...
  pat="$1"; shift; f=$(ls "$DL"/$pat 2>/dev/null | grep -vi "$EXCL" | head -1)
  if [ -z "$f" ]; then echo "[FALTA] $pat"; return; fi
  for d in "$@"; do mkdir -p "$BASE/$d/plugins"; cp -f "$f" "$BASE/$d/plugins/"; done; echo "[OK] $(basename "$f") -> $*"
}
EXCL='^$'; put 'Geyser-Velocity*.jar' proxy
EXCL='^$'; put 'floodgate-velocity*.jar' proxy
EXCL='^$'; put 'authme-velocity*.jar' proxy
EXCL='^$'; put '[Vv]elocity[Cc]ustom[Cc]ommand*.jar' proxy
EXCL='velocity'; put '[Aa]uth[Mm]e*.jar' lobby survival skyblock
EXCL='^$'; put 'floodgate-spigot*.jar' lobby survival skyblock
EXCL='^$'; put 'LuckPerms-Bukkit*.jar' lobby survival skyblock
EXCL='^$'; put 'NightCore*.jar' survival
EXCL='^$'; put 'ExcellentEnchants*.jar' survival
EXCL='^$'; put 'BentoBox*.jar' skyblock
