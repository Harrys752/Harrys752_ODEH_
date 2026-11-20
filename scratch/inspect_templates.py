import json, re

with open('questions.js', 'r', encoding='utf-8') as f:
    text = f.read()

m = re.search(r'var\s+QUESTION_BANK\s*=\s*(\[.*?\]);', text, re.DOTALL)
if m:
    bank = json.loads(m.group(1))
    templates = {}
    for q in bank:
        tId = q.get('templateId')
        if tId:
            if tId not in templates:
                templates[tId] = []
            templates[tId].append(q)
    print(f"Total unique parametric templates: {len(templates)}")
    for tId, qs in sorted(templates.items()):
        print(f"Template '{tId}': {len(qs)} variants")
        print(f"  Field: {qs[0].get('field')}")
        print(f"  Title: {qs[0].get('title')}")
        print(f"  Params sample: {qs[0].get('params')}")
        print(f"  Stem sample: {qs[0].get('content')[:120]}...")
        print("---")
