with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

import re
m = re.search(r'(<div\s+class=["\']candidate-session-card["\'].*?)(<div\s+id=["\']exam-view["\'])', html, re.DOTALL)
if m:
    print(m.group(1)[:1500])
    print("--- END SNIPPET ---")
    print(m.group(1)[-800:])
