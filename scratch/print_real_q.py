with open('questions.js', 'r', encoding='utf-8') as f:
    text = f.read()

import re
matches = [m.start() for m in re.finditer(r'desert soils', text, re.IGNORECASE)]
print("desert soils matches:", len(matches))
for idx in matches[:2]:
    print(text[max(0, idx-100):min(len(text), idx+200)])
