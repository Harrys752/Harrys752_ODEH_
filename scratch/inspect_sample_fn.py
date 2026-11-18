with open('app.js', 'r', encoding='utf-8') as f:
    code = f.read()

idx = code.find('function sampleQuestions')
print(code[idx+2400:idx+3600])
