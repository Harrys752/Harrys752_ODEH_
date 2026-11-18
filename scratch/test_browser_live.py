import subprocess
import time
import json
import urllib.request

chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
port = 9222
url = f"http://localhost:{port}"

# Launch Chrome with remote debugging
proc = subprocess.Popen([
    chrome_path,
    f"--remote-debugging-port={port}",
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    "--no-default-browser-check",
    "http://127.0.0.1:8000/index.html"
])

print(f"Launched Chrome PID {proc.pid}")

# Wait for Chrome to be ready
time.sleep(2)
try:
    with urllib.request.urlopen(f"{url}/json") as resp:
        targets = json.loads(resp.read().decode('utf-8'))
        print("Chrome debugging targets:")
        for t in targets:
            print(" -", t.get('title'), t.get('url'))
finally:
    proc.terminate()
    proc.wait()
    print("Chrome terminated.")
