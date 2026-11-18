with open('app.js', 'r', encoding='utf-8') as f:
    code = f.read()

idx = code.find('function sampleQuestions')
print("sampleQuestions:")
print(code[idx:idx+300])

idx_p = code.find('function instantiateParametricVariants')
print("\ninstantiateParametricVariants:")
print(code[idx_p:idx_p+300])
