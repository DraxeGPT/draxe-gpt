# DraxeCraft - Configura lobby, survival y skyblock (puertos internos + modo proxy).
# Seguro de repetir. Requiere haber arrancado cada servidor UNA vez (para que existan los archivos).
$base = "C:\DraxeCraft"
$servers = @{ "lobby" = 25566; "survival" = 25567; "skyblock" = 25568 }

foreach ($name in $servers.Keys) {
    $dir = Join-Path $base $name
    $props = Join-Path $dir "server.properties"
    $spigot = Join-Path $dir "spigot.yml"
    Write-Host "== $name ==" -ForegroundColor Cyan

    if (-not (Test-Path $props)) {
        Write-Host "  Falta server.properties: arranca $name una vez (.\start.bat), acepta el EULA, y vuelve a ejecutar." -ForegroundColor Yellow
        continue
    }
    $port = $servers[$name]
    (Get-Content $props) `
        -replace '^server-port=.*', "server-port=$port" `
        -replace '^server-ip=.*', 'server-ip=127.0.0.1' `
        -replace '^online-mode=.*', 'online-mode=false' `
        -replace '^enforce-secure-profile=.*', 'enforce-secure-profile=false' |
        Set-Content $props -Encoding ASCII
    Select-String -Path $props -Pattern '^(server-ip|server-port|online-mode|enforce-secure-profile)='

    if (Test-Path $spigot) {
        (Get-Content $spigot) -replace 'bungeecord: false', 'bungeecord: true' | Set-Content $spigot -Encoding ASCII
        Select-String -Path $spigot -Pattern 'bungeecord'
    } else {
        Write-Host "  Falta spigot.yml (arranca el servidor una vez)." -ForegroundColor Yellow
    }
}
Write-Host "Listo." -ForegroundColor Green
