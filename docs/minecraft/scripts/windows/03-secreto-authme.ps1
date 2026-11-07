# DraxeCraft - Genera la clave compartida de AuthMe y la aplica a los backends.
# Requiere que AuthMe ya haya creado su config.yml (arranca cada backend una vez con el plugin).
$base = "C:\DraxeCraft"
$secretFile = Join-Path $base "secreto-authme.txt"

if (Test-Path $secretFile) {
    $secret = (Get-Content $secretFile -Raw).Trim()
    Write-Host "Usando la clave existente en $secretFile"
} else {
    $secret = -join ((48..57) + (65..90) + (97..122) | Get-Random -Count 40 | ForEach-Object { [char]$_ })
    Set-Content $secretFile $secret -Encoding ASCII
    Write-Host "Clave nueva guardada en $secretFile (NO la compartas ni la subas a Git)."
}

foreach ($name in @("lobby", "survival", "skyblock")) {
    $cfg = Join-Path $base "$name\plugins\AuthMe\config.yml"
    Write-Host "== $name ==" -ForegroundColor Cyan
    if (-not (Test-Path $cfg)) { Write-Host "  Falta $cfg (arranca el servidor con AuthMe una vez)." -ForegroundColor Yellow; continue }
    Copy-Item $cfg "$cfg.bak" -Force
    $t = Get-Content $cfg -Raw
    $t = $t -replace '(?m)^(\s*)bungeecord:\s*.*$', '${1}bungeecord: true'
    $t = $t -replace "(?m)^(\s*)proxySharedSecret:\s*.*$", ('${1}proxySharedSecret: ''' + $secret + '''')
    $t = $t -replace '(?m)^(\s*)caching:\s*.*$', '${1}caching: false'
    Set-Content $cfg $t -Encoding ASCII
    Select-String -Path $cfg -Pattern '^\s*(bungeecord|sendPlayerTo|proxySharedSecret|caching):' | ForEach-Object { $_.Line -replace $secret, '<clave>' }
}
Write-Host ""
Write-Host "Falta en el PROXY: pon la misma clave en el config de authme-velocity (proxySharedSecret)," -ForegroundColor Yellow
Write-Host "authServers y toServerAfterLogin segun proxy\authme-velocity.cambios.txt." -ForegroundColor Yellow
Write-Host "Tu clave esta en: $secretFile"
