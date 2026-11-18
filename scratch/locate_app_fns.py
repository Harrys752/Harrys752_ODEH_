with open('app.js', 'r', encoding='utf-8') as f:
    code = f.read()

idx = code.find('function init()')
print(code[idx-600:idx+600])
