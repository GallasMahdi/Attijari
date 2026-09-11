Add-Type -AssemblyName System.Drawing
$srcPath = "$PSScriptRoot\..\public\porsche-cayenne-e4-hero.jpg"
$destPath = "$PSScriptRoot\..\public\porsche-cayenne-e4-hero.jpg"
$tempPath = "$PSScriptRoot\..\public\porsche-cayenne-e4-hero-temp.jpg"

$img = [System.Drawing.Image]::FromFile($srcPath)
$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
$encParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]82)

$img.Save($tempPath, $codec, $encParams)
$img.Dispose()

$origLen = (Get-Item $srcPath).Length
$newLen = (Get-Item $tempPath).Length

Move-Item -Path $tempPath -Destination $srcPath -Force

Write-Host "Original size: $origLen bytes"
Write-Host "Optimized size: $newLen bytes"
Write-Host "Savings: $([math]::Round((1 - ($newLen / $origLen)) * 100, 1))%"
