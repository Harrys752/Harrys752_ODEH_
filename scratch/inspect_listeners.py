with open('app.js', 'r', encoding='utf-8') as f:
    code = f.read()

import re
matches = re.findall(r'btn-start-[A-Za-z0-9_-]+', code)
print("Start button IDs:", set(matches))

matches_init = re.findall(r'DOM\.btnStart[A-Za-z0-9_]+', code)
print("DOM start buttons:", set(matches_init))
