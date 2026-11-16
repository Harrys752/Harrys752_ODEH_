# -*- coding: utf-8 -*-
import json
import os

all_questions = []

# Field 1
env1 = {}
with open(r'c:\OD-simulation\make_bank.py', 'r', encoding='utf-8') as f:
    exec(f.read(), env1)
all_questions.extend(env1['questions'])

# Fields 2 to 7
for fname in [
    'make_bank_field2.py',
    'make_bank_field3.py',
    'make_bank_field4.py',
    'make_bank_field5.py',
    'make_bank_field6.py',
    'make_bank_field7.py'
]:
    env = {'add_q': all_questions.append, 'questions': all_questions}
    with open(os.path.join(r'c:\OD-simulation', fname), 'r', encoding='utf-8') as f:
        exec(f.read(), env)

print(f"Total questions collected: {len(all_questions)}")

ids = [q['id'] for q in all_questions]
assert len(ids) == len(set(ids)), f"Duplicate IDs found: {len(ids)} vs {len(set(ids))}"

difficulties = {}
fields = {}
types = {}
for q in all_questions:
    difficulties[q['difficulty']] = difficulties.get(q['difficulty'], 0) + 1
    fields[q['field']] = fields.get(q['field'], 0) + 1
    types[q['type']] = types.get(q['type'], 0) + 1

print("Difficulties:", difficulties)
print("Fields:", json.dumps(fields, indent=2))
print("Types:", types)

js_content = "/**\n * Open Doors International Olympiad: Earth and Environmental Sciences for Sustainability\n"
js_content += " * Second-Round Practice Question Bank\n"
js_content += f" * Total verified tasks: {len(all_questions)}\n"
js_content += " */\n\n"
js_content += "const QUESTION_BANK = " + json.dumps(all_questions, indent=2, ensure_ascii=False) + ";\n\n"
js_content += "if (typeof module !== 'undefined' && module.exports) {\n  module.exports = { QUESTION_BANK };\n}\n"
js_content += "if (typeof window !== 'undefined') {\n  window.QUESTION_BANK = QUESTION_BANK;\n}\n"

with open(r'c:\OD-simulation\questions.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print(f"Successfully generated c:\\OD-simulation\\questions.js ({os.path.getsize(r'c:\OD-simulation\questions.js')} bytes)")
