with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

print("CSS length:", len(css))
for section in ['.od-top-bar', '.od-tile-matrix', '.od-tile', '.btn-save-answer', '.lobby-view', 'body']:
    idx = css.find(section)
    if idx != -1:
        print(f"--- {section} ---")
        print(css[idx:idx+300])
