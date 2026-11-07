#!/usr/bin/env bash
# Prepara Linux (Debian) en ChromeOS: Java 25 si existe en apt, o Temurin, y crea carpetas.
set -e
sudo apt update && sudo apt install -y curl unzip python3 ca-certificates gnupg screen
java -version 2>&1 | head -1 || true
echo "Si Java < 21 (o Velocity pide 25): instala Temurin 25 desde https://adoptium.net (paquete .deb o tar.gz para Linux x64/aarch64)."
mkdir -p "$HOME/draxecraft"/{proxy,lobby,survival,skyblock}
echo "Listo: $HOME/draxecraft"
