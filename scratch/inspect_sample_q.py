with open('app.js', 'r', encoding='utf-8') as f:
    code = f.read()

import re
m = re.search(r'function\s+sampleQuestions.*?function\s+shuffleArray', code, re.DOTALL)
if m:
    print(m.group(0))
else:
    m2 = re.search(r'function\s+sampleQuestions.*?(?=\n\s*function\s+)', code, re.DOTALL)
    if m2:
        print(m2.group(0))
