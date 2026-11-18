with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

import re
rules = [
    r'\.od-top-bar\s*\{[^}]+\}',
    r'\.od-top-exam-block\s*\{[^}]+\}',
    r'\.nav-tile\s*\{[^}]+\}',
    r'\.nav-tile\.active\s*\{[^}]+\}',
    r'\.nav-tile\.answered\s*\{[^}]+\}',
    r'\.nav-tile\.unanswered\s*\{[^}]+\}',
    r'\.btn-od-save\s*\{[^}]+\}',
    r'\.od-question-card\s*\{[^}]+\}',
]

for r in rules:
    m = re.search(r, css)
    if m:
        print(m.group(0))
        print("---")
