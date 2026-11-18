with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

import re
m = re.search(r'\.nav-tile\.answered\s*\{[^}]+\}', css)
if m:
    print(m.group(0))
else:
    print("nav-tile.answered not found")
