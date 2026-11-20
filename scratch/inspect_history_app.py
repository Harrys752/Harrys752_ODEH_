with open('app.js', 'r', encoding='utf-8') as f:
    code = f.read()

idx = code.find('function renderAttemptHistory')
print(code[idx+1800:idx+3500])
