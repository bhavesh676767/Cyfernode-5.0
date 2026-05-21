import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

classes = [
    'framer-yshl83-container',
    'framer-6stad1-container',
    'framer-296ee2-container',
    'framer-ov0d3q',
    'framer-1hireqr-container',
    'framer-PDnFr',
    'framer-puj1sb-container'
]

output = []

for cls in classes:
    output.append(f"=== Class: {cls} ===")
    matches = list(re.finditer(re.escape(cls), html))
    output.append(f"Found {len(matches)} occurrences.")
    for idx, match in enumerate(matches):
        start = max(0, match.start() - 150)
        end = min(len(html), match.end() + 250)
        snippet = html[start:end].replace('\n', ' ')
        output.append(f"Match {idx+1}: ...{snippet}...")
    output.append("="*80 + "\n")

with open('scratch/matches.txt', 'w', encoding='utf-8') as f:
    f.write('\n'.join(output))

print("Wrote search results to scratch/matches.txt")
