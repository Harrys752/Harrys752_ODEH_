with open('app.js', 'r', encoding='utf-8') as f:
    code = f.read()

idx = code.find('let state =')
end_idx = code.find('};', idx)
print(repr(code[idx:end_idx+2]))
