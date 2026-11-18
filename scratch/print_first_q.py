with open('questions.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Let's inspect the first question in questions.js
import re
idx = text.find('{')
end_idx = text.find('},', idx)
print(text[idx:end_idx+2])
