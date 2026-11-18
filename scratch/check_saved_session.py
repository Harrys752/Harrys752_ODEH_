with open('app.js', 'r', encoding='utf-8') as f:
    code = f.read()

idx = code.find('function checkSavedSessionBanner')
print(code[idx:idx+1500])
