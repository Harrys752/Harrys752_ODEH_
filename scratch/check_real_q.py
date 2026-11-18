with open('questions.js', 'r', encoding='utf-8') as f:
    text = f.read()

for query in ["desert soils", "metamorphic rocks", "800 mm", "precipitation fell"]:
    print(f"'{query}' in questions.js:", query.lower() in text.lower())
