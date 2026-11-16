# -*- coding: utf-8 -*-
import json
import os

# Load existing 90 questions
with open(r'c:\OD-simulation\questions.js', 'r', encoding='utf-8') as f:
    text = f.read()

start_idx = text.find('const QUESTION_BANK = ') + len('const QUESTION_BANK = ')
end_idx = text.rfind(';\n\nif (typeof module')
existing_bank = json.loads(text[start_idx:end_idx].strip())

# Load 25 new questions
with open(r'c:\OD-simulation\add_extra_questions.py', 'r', encoding='utf-8') as f:
    env = {}
    exec(f.read(), env)
    new_questions = env['new_questions']

combined = existing_bank + new_questions
print(f"Total combined questions: {len(combined)}")

# Validation
ids = set()
for q in combined:
    assert q['id'] not in ids, f"Duplicate ID: {q['id']}"
    ids.add(q['id'])

difficulties = {}
fields = {}
types = {}
for q in combined:
    difficulties[q['difficulty']] = difficulties.get(q['difficulty'], 0) + 1
    fields[q['field']] = fields.get(q['field'], 0) + 1
    types[q['type']] = types.get(q['type'], 0) + 1

print("Difficulties:", difficulties)
print("Fields:", json.dumps(fields, indent=2))
print("Types:", types)

js_content = "/**\n * Open Doors International Olympiad: Earth and Environmental Sciences for Sustainability\n"
js_content += " * Dual-Mode Question Bank (Entry Drill + Stage 2 Second Round)\n"
js_content += f" * Total verified tasks: {len(combined)}\n"
js_content += " */\n\n"
js_content += "const QUESTION_BANK = " + json.dumps(combined, indent=2, ensure_ascii=False) + ";\n\n"
js_content += "if (typeof module !== 'undefined' && module.exports) {\n  module.exports = { QUESTION_BANK };\n}\n"
js_content += "if (typeof window !== 'undefined') {\n  window.QUESTION_BANK = QUESTION_BANK;\n}\n"

with open(r'c:\OD-simulation\questions.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print(f"Updated c:\\OD-simulation\\questions.js ({os.path.getsize(r'c:\OD-simulation\questions.js')} bytes)")
