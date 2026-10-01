# Simple PowerShell HTTP Web Server for WealthRise App
$http = New-Object System.Net.HttpListener
$http.Prefixes.Add("http://localhost:8080/")
$http.Start()
Write-Host "Server running at http://localhost:8080/"

$root = $PSScriptRoot

while ($http.IsListening) {
    try {
        $context = $http.GetContext()
        $request = $context.Request
        $response = $context.Response

        $path = $request.Url.LocalPath
        if ($path -eq "/") { $path = "/index.html" }
        $localPath = Join-Path $root $path.TrimStart('/').Replace('/', '\')

        if (Test-Path $localPath -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($localPath)
            $ext = [System.IO.Path]::GetExtension($localPath).ToLower()
            switch ($ext) {
                ".html" { $contentType = "text/html; charset=utf-8" }
                ".css"  { $contentType = "text/css; charset=utf-8" }
                ".js"   { $contentType = "text/javascript; charset=utf-8" }
                ".jpg"  { $contentType = "image/jpeg" }
                ".png"  { $contentType = "image/png" }
                ".json" { $contentType = "application/json" }
                default { $contentType = "application/octet-stream" }
            }
            $response.ContentType = $contentType
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
        }
        $response.OutputStream.Close()
    } catch {
        # continue loop
    }
}
