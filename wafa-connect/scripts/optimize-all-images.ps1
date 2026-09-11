Add-Type -AssemblyName System.Drawing
$publicDir = "$PSScriptRoot\..\public"
$images = Get-ChildItem -Path $publicDir -Filter "*.jpg"

$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
$encParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]82)

foreach ($file in $images) {
    if ($file.Length -gt 250000) {
        $tempPath = "$publicDir\$($file.BaseName)-temp.jpg"
        $img = [System.Drawing.Image]::FromFile($file.FullName)
        $img.Save($tempPath, $codec, $encParams)
        $img.Dispose()
        
        $origLen = $file.Length
        $newLen = (Get-Item $tempPath).Length
        
        Move-Item -Path $tempPath -Destination $file.FullName -Force
        Write-Host "$($file.Name): $origLen -> $newLen bytes ($([math]::Round((1 - ($newLen / $origLen)) * 100, 1))% saved)"
    }
}
