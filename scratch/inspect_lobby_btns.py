with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

import re
matches = re.findall(r'<button[^>]*id=["\']([^"\']+)["\'][^>]*>', html)
for m in matches:
    if any(k in m.lower() for k in ['start', 'launch', 'resume', 'mode', 'field', 'exam']):
        print("Lobby/Exam button ID:", m)
