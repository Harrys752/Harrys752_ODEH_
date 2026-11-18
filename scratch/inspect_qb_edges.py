with open('questions.js', 'r', encoding='utf-8') as f:
    text = f.read()

print("Top 200 chars:")
print(text[:200])

print("\nBottom 200 chars:")
print(text[-200:])
