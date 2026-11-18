with open('app.js', 'r', encoding='utf-8') as f:
    code = f.read()

idx = code.find('DOM.btnLobbyStartPractice.addEventListener')
print(code[idx:idx+800])
