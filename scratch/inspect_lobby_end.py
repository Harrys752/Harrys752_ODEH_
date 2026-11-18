with open('index.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if 'VIEW 2: AUTHENTIC' in line:
        start = max(0, i - 30)
        end = min(len(lines), i + 10)
        for j in range(start, end):
            print(f"{j+1}: {lines[j]}", end='')
        break
