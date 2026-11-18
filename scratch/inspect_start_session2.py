with open('app.js', 'r', encoding='utf-8') as f:
    code = f.read()

idx = code.find('function startExamSession')
print(code[idx:idx+800])
