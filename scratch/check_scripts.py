with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

import re
matches = re.findall(r'<script[^>]*src=["\']([^"\']+)["\'][^>]*>', html)
print("Scripts loaded in index.html:")
for m in matches:
    print(" -", m)
