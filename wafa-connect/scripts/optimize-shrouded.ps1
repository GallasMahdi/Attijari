Add-Type -AssemblyName System.Drawing

$src = "C:\Users\User\.gemini\antigravity-ide\brain\95b4f5f9-85b2-4eaa-9636-31a5b69dcaae\cayenne_e4_shrouded_teaser_1789049833877.jpg"
$dest = "c:\Users\User\Downloads\Attijari-main\Attijari-main\wafa-connect\public\porsche-shrouded.jpg"
$backup = "c:\Users\User\Downloads\Attijari-main\Attijari-main\wafa-connect\public\porsche-shrouded-old.jpg"

if (Test-Path $dest) {
    Copy-Item $dest $backup -Force
}

$img = [System.Drawing.Image]::FromFile($src)
$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]85)

$img.Save($dest, $codec, $encoderParams)
$img.Dispose()

$originalSize = (Get-Item $src).Length
$newSize = (Get-Item $dest).Length
Write-Host "Compressed Cayenne E4 Shrouded image from $originalSize to $newSize bytes."
