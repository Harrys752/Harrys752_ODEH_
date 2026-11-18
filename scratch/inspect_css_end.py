with open('styles.css', 'r', encoding='utf-8') as f:
    lines = f.readlines()

print("Total lines in styles.css:", len(lines))
for line in lines[-30:]:
    print(line, end='')
