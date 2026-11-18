with open('app.js', 'r', encoding='utf-8') as f:
    code = f.read()

import re
matches = [m.start() for m in re.finditer(r'STORAGE_KEY', code)]
for idx in matches:
    print(code[max(0, idx-20):min(len(code), idx+100)].replace('\n', ' '))
