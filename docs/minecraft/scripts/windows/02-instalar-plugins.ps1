# DraxeCraft - Copia los .jar descargados (carpeta Descargas) a la carpeta plugins correcta.
# Solo copia; nunca borra. Informa de lo que encontro y de lo que falta.
$dl = Join-Path $HOME "Downloads"
$base = "C:\DraxeCraft"

function Copiar($patron, $excluir, $destinos, $etiqueta) {
    $f = Get-ChildItem $dl -Filter *.jar -ErrorAction SilentlyContinue |
         Where-Object { $_.Name -like $patron -and ($excluir -eq $null -or $_.Name -notlike $excluir) } |
         Sort-Object LastWriteTime -Descending | Select-Object -First 1
    if ($null -eq $f) { Write-Host "  [FALTA] $etiqueta" -ForegroundColor Yellow; return }
    foreach ($d in $destinos) {
        $dest = Join-Path (Join-Path $base $d) "plugins"
        if (-not (Test-Path $dest)) { New-Item -ItemType Directory -Path $dest | Out-Null }
        Copy-Item $f.FullName $dest -Force
    }
    Write-Host "  [OK]    $etiqueta -> $($f.Name) -> $($destinos -join ', ')" -ForegroundColor Green
}

$todos = @("lobby", "survival", "skyblock")
Write-Host "Buscando en $dl ..."
Copiar "*geyser*velocity*"       $null        @("proxy")   "Geyser (Velocity)"
Copiar "*floodgate*velocity*"    $null        @("proxy")   "Floodgate (Velocity)"
Copiar "*authme*velocity*"       $null        @("proxy")   "AuthMe para Velocity"
Copiar "*velocity*custom*"       $null        @("proxy")   "VelocityCustomCommand"
Copiar "*vcc*"                   $null        @("proxy")   "VelocityCustomCommand (alt.)"
Copiar "AuthMe*"                 "*velocity*" $todos       "AuthMe (backends)"
Copiar "*floodgate*spigot*"      $null        $todos       "Floodgate (backends)"
Copiar "LuckPerms*Bukkit*"       $null        $todos       "LuckPerms (backends)"
Copiar "NightCore*"              $null        @("survival") "NightCore"
Copiar "ExcellentEnchants*"      $null        @("survival") "ExcellentEnchants"
Copiar "BentoBox*"               $null        @("skyblock") "BentoBox"
Write-Host "Reinicia los servidores afectados. Revisa lo que diga [FALTA]." 
