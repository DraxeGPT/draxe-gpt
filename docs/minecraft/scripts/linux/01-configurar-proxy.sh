#!/usr/bin/env bash
# DraxeCraft (Linux/ChromeOS) - configura velocity.toml. Arranca el proxy una vez antes.
BASE="${DRAXE_BASE:-$HOME/draxecraft}"; f="$BASE/proxy/velocity.toml"
[ -f "$f" ] || { echo "Falta velocity.toml: arranca el proxy una vez (./start.sh) y escribe 'end'."; exit 1; }
cp -f "$f" "$f.bak"
sed -i -E 's|^bind *=.*|bind = "0.0.0.0:25565"|; s|^online-mode *=.*|online-mode = false|; s|^player-info-forwarding-mode *=.*|player-info-forwarding-mode = "legacy"|; s|^show-max-players *=.*|show-max-players = 50|' "$f"
python3 - "$f" <<'PY'
import re,sys
f=sys.argv[1]; t=open(f).read()
s='[servers]\nlobby = "127.0.0.1:25566"\nsurvival = "127.0.0.1:25567"\nskyblock = "127.0.0.1:25568"\ntry = ["lobby"]\n\n'
t=re.sub(r'(?ms)^\[servers\].*?(?=^\[)',s,t); open(f,'w').write(t)
PY
grep -E '^(bind|online-mode|player-info-forwarding-mode|show-max-players|lobby|survival|skyblock|try) *=' "$f"
echo "Listo. Respaldo: velocity.toml.bak"
