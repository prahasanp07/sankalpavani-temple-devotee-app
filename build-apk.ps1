# Sankalpavani APK Builder Script
# Run this script in PowerShell to compile the web files, sync Capacitor, and build the APK.

$ErrorActionPreference = "Stop"

Write-Host "=== Sankalpavani APK Builder ===" -ForegroundColor Yellow

# Locate Android SDK
$defaultSdk = "C:\Users\$env:USERNAME\AppData\Local\Android\Sdk"
Write-Host "Detecting Android SDK..."
$sdkPath = Read-Host "Enter Android SDK path [Press Enter for default: $defaultSdk]"

if ([string]::IsNullOrWhiteSpace($sdkPath)) {
    $sdkPath = $defaultSdk
}

if (-not (Test-Path $sdkPath)) {
    Write-Error "Android SDK directory not found at '$sdkPath'. Please install Android Studio/SDK first, or verify the path."
}

Write-Host "SDK detected at: $sdkPath" -ForegroundColor Green

# Write android/local.properties file
$localPropertiesFile = "android\local.properties"
$escapedPath = $sdkPath -replace '\\', '\\\\'
"sdk.dir=$escapedPath" | Out-File -FilePath $localPropertiesFile -Encoding utf8 -Force
Write-Host "Created local.properties configuration." -ForegroundColor Green

# Step 1: Build Web App
Write-Host "`n[Step 1/3] Compiling web production distribution..." -ForegroundColor Cyan
npm run build

# Step 2: Sync Capacitor assets
Write-Host "`n[Step 2/3] Syncing assets to Capacitor android folder..." -ForegroundColor Cyan
npx cap sync android

# Step 3: Build Native APK using Gradle Wrapper
Write-Host "`n[Step 3/3] Compiling native Android classes & assembling APK..." -ForegroundColor Cyan
Set-Location -Path "android"
.\gradlew.bat assembleDebug
Set-Location -Path ".."

# Check output
$apkPath = "android\app\build\outputs\apk\debug\app-debug.apk"
if (Test-Path $apkPath) {
    Write-Host "`n==================================================" -ForegroundColor Green
    Write-Host "Success! Android APK built successfully." -ForegroundColor Green
    Write-Host "File Location: $PSScriptRoot\$apkPath" -ForegroundColor Yellow
    Write-Host "==================================================" -ForegroundColor Green
} else {
    Write-Error "Gradle build completed but the APK could not be found at '$apkPath'."
}
