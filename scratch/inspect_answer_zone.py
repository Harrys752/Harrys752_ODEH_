with open('app.js', 'r', encoding='utf-8') as f:
    code = f.read()

idx = code.find('function renderAnswerZone')
print(code[idx+1400:idx+2800])
