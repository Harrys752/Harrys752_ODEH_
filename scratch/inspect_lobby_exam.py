with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

import re
m_card = re.search(r'(<div\s+class=["\']od-question-card["\'].*?)(</main>)', html, re.DOTALL)
if m_card:
    print(m_card.group(1)[1200:3000])
