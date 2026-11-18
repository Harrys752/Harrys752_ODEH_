import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

m = re.search(r'(<div\s+id=["\']exam-view["\'].*?)(<div\s+id=["\'](?:upload|oral|review)-view["\'])', html, re.DOTALL)
if m:
    print(m.group(1)[1000:3000])
