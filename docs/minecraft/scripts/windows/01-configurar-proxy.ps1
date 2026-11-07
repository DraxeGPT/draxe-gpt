# DraxeCraft - Configura velocity.toml. Requiere haber arrancado el proxy una vez.
$file = "C:\DraxeCraft\proxy\velocity.toml"
if (-not (Test-Path $file)) {
    Write-Host "Falta velocity.toml: arranca el proxy una vez (.\start.bat) y escribe 'end'." -ForegroundColor Yellow
    exit 1
}
Copy-Item $file "$file.bak" -Force
$t = Get-Content $file -Raw
$t = $t -replace '(?m)^bind\s*=.*$', 'bind = "0.0.0.0:25565"'
$t = $t -replace '(?m)^online-mode\s*=.*$', 'online-mode = false'
$t = $t -replace '(?m)^player-info-forwarding-mode\s*=.*$', 'player-info-forwarding-mode = "legacy"'
$t = $t -replace '(?m)^show-max-players\s*=.*$', 'show-max-players = 50'
$servers = "[servers]`nlobby = `"127.0.0.1:25566`"`nsurvival = `"127.0.0.1:25567`"`nskyblock = `"127.0.0.1:25568`"`ntry = [`"lobby`"]`n`n"
$t = [regex]::Replace($t, '(?ms)^\[servers\].*?(?=^\[)', $servers)
Set-Content $file $t -Encoding ASCII
Select-String -Path $file -Pattern '^(bind|online-mode|player-info-forwarding-mode|show-max-players|lobby|survival|skyblock|try)\s*='
Write-Host "Listo. Copia de seguridad: velocity.toml.bak" -ForegroundColor Green
