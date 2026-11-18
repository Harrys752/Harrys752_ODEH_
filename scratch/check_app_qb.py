with open('app.js', 'r', encoding='utf-8') as f:
    code = f.read()

import re
matches = [m.start() for m in re.finditer(r'QUESTION_BANK', code)]
print(f"QUESTION_BANK appears {len(matches)} times in app.js")
for idx in matches:
    print(code[max(0, idx-40):min(len(code), idx+120)].replace('\n', ' '))
