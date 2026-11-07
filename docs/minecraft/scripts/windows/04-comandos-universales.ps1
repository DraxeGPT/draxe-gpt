# DraxeCraft - Genera el archivo de comandos universales (/ip, /discord, /tiktok, /tienda)
# para el plugin VelocityCustomCommand. Te pregunta tus datos; Enter = dejar "Proximamente".
$out = "C:\DraxeCraft\proxy\comandos-vcc.yml"

function Preguntar($texto, $defecto) {
    $v = Read-Host "$texto $defecto"
    if ([string]::IsNullOrWhiteSpace($v)) { return $defecto } else { return $v.Trim() }
}
$ip      = Preguntar "IP o dominio de la red (Java)" ""
$bport   = Preguntar "Puerto Bedrock" "19132"
$discord = Preguntar "Enlace de invitacion de Discord (https://...)" ""
$tiktok  = Preguntar "Enlace de TikTok (https://...)" ""
$tienda  = Preguntar "Enlace de la tienda (https://...)" ""

function Bloque($nombre, $alias, $titulo, $lineas, $accion, $hover) {
    $b = "$nombre`:`n  aliases:`n"
    foreach ($a in $alias) { $b += "    - $a`n" }
    $b += "  permission:`n    enabled: false`n    permission: `"vcc.$nombre`"`n"
    $b += "  message:`n    enabled: true`n    content:`n"
    $b += "      - `" `"`n      - `"<gradient:#5865F2:#8B9DFF><bold>$titulo</bold></gradient>`"`n"
    foreach ($l in $lineas) { $b += "      - `"$l`"`n" }
    $b += "      - `" `"`n"
    if ($accion) {
        $b += "    mhover:`n      lines:`n        - `"$hover`"`n"
        $b += "    maction:`n      action: `"$accion`"`n"
    }
    return $b
}

$yaml = ""
if ($ip) {
    $yaml += Bloque "ip" @("play") "DRAXECRAFT NETWORK" @("<gray>IP Java: <white>$ip", "<gray>Bedrock: <white>$ip <gray>puerto <white>$bport", "<gray>Version: <white>1.21.11") "CLIP_BOARD:$ip" "<yellow>Clic para copiar la IP"
} else {
    $yaml += Bloque "ip" @("play") "DRAXECRAFT NETWORK" @("<gray>La IP se anunciara pronto.") $null $null
}
if ($discord) { $yaml += "`n" + (Bloque "discord" @("dc") "DISCORD" @("<gray>Unete a la comunidad:", "<white>$discord") "OPEN_LINK:$discord" "<yellow>Clic para abrir") }
else          { $yaml += "`n" + (Bloque "discord" @("dc") "DISCORD" @("<gray>Proximamente.") $null $null) }
if ($tiktok)  { $yaml += "`n" + (Bloque "tiktok" @("tt") "TIKTOK" @("<gray>Siguenos:", "<white>$tiktok") "OPEN_LINK:$tiktok" "<yellow>Clic para abrir") }
else          { $yaml += "`n" + (Bloque "tiktok" @("tt") "TIKTOK" @("<gray>Proximamente.") $null $null) }
if ($tienda)  { $yaml += "`n" + (Bloque "tienda" @("store", "shop") "TIENDA" @("<gray>Visita la tienda:", "<white>$tienda") "OPEN_LINK:$tienda" "<yellow>Clic para abrir") }
else          { $yaml += "`n" + (Bloque "tienda" @("store", "shop") "TIENDA" @("<gray>Proximamente.") $null $null) }

[System.IO.File]::WriteAllText($out, $yaml, (New-Object System.Text.UTF8Encoding($false)))
Write-Host "Archivo creado: $out" -ForegroundColor Green
Write-Host "Copia su contenido al config que genera VelocityCustomCommand en C:\DraxeCraft\proxy\plugins\ (carpeta del plugin)."
Write-Host "Los enlaces tambien salen como texto visible: los jugadores Bedrock pueden no poder hacer clic."
