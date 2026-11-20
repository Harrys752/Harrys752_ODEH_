import json, re

with open('questions.js', 'r', encoding='utf-8') as f:
    text = f.read()

m = re.search(r'var\s+QUESTION_BANK\s*=\s*(\[.*?\]);', text, re.DOTALL)
if m:
    bank = json.loads(m.group(1))
    print(f"Total questions in bank: {len(bank)}")
    field_counts = {}
    ids = set()
    for q in bank:
        ids.add(q['id'])
        f = q['field']
        diff = q['difficulty']
        if f not in field_counts: field_counts[f] = {'total': 0, 'basic': 0, 'intermediate': 0, 'advanced': 0}
        field_counts[f]['total'] += 1
        field_counts[f][diff] += 1
    print("Unique IDs count:", len(ids))
    for f, c in sorted(field_counts.items()):
        print(f"  {f}: Total={c['total']} (B={c['basic']}, I={c['intermediate']}, A={c['advanced']})")
