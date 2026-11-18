with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

idx = text.find('rules-summary-card')
end_idx = text.find('</details>', idx)
print(text[end_idx:end_idx+300])
