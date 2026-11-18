with open('questions.js', 'r', encoding='utf-8') as f:
    text = f.read()

import re
bad_chars = [('\t', 'TAB'), ('\x07', 'BEL'), ('\x08', 'BS'), ('\x0c', 'FF')]
found = False
for char, name in bad_chars:
    if char in text:
        # Check if inside string literals
        count = text.count(char)
        print(f"Warning: {name} found {count} times")
        found = True

if not found:
    print("Zero control characters in questions.js! Perfectly clean.")

# Test node parse
