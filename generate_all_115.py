# -*- coding: utf-8 -*-
"""
Extended Question Bank Builder: 115 Olympiad Tasks
"""

import json

all_questions = []
ids = set()

def q(obj):
    assert obj['id'] not in ids, f"Duplicate ID: {obj['id']}"
    ids.add(obj['id'])
    all_questions.append(obj)

# Load existing 90 questions first
with open(r'c:\OD-simulation\questions.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Extract json from questions.js
start_idx = text.find('const QUESTION_BANK = ') + len('const QUESTION_BANK = ')
end_idx = text.rfind(';\n\nif (typeof module')
existing_bank = json.loads(text[start_idx:end_idx].strip())
print(f"Loaded {len(existing_bank)} existing questions.")

for item in existing_bank:
    q(item)

print(f"Current IDs registered: {len(ids)}")
