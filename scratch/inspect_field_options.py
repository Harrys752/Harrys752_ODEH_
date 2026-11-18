with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

import re
m = re.search(r'<select\s+id=["\']practice-target-field["\'].*?</select>', html, re.DOTALL)
if m:
    print(m.group(0))
