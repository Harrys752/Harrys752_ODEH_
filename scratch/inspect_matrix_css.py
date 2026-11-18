with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

idx = css.find('.od-matrix-container')
print(css[idx:idx+800])
