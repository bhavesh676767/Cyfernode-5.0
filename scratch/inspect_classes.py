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
    output.append(f"\n==================== CLASS: {cls} ====================")
    matches = list(re.finditer(re.escape(cls), html))
    output.append(f"Found {len(matches)} occurrences")
    for idx, match in enumerate(matches):
        pos = match.start()
        start_tag_pos = html.rfind('<', 0, pos)
        if start_tag_pos != -1:
            context_start = max(0, start_tag_pos - 250)
            context_end = min(len(html), pos + 750)
            output.append(f"\n--- Occurrence {idx+1} (char index {pos}) ---")
            output.append("CONTEXT BEFORE:")
            output.append(html[context_start:start_tag_pos])
            output.append("TAG & CONTEXT AFTER:")
            output.append(html[start_tag_pos:context_end])
            output.append("-" * 50)

with open('scratch/detailed_matches.txt', 'w', encoding='utf-8') as f:
    f.write('\n'.join(output))

print("Wrote detailed results to scratch/detailed_matches.txt")
