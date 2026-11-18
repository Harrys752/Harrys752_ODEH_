with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

idx = css.find('.btn-od-save')
print("--- btn-od-save ---")
print(css[idx:idx+600])

idx_tile = css.find('.nav-tile')
print("\n--- nav-tile ---")
print(css[idx_tile:idx_tile+800])
