with open('app.js', 'r', encoding='utf-8') as f:
    code = f.read()

import re
matches = re.findall(r'nav-tile[^\n]+', code)
for m in matches:
    print(m)
