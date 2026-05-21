import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Find the start of the body
body_start = html.find('<body')
if body_start == -1:
    body_start = 0

body_html = html[body_start:]

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
    # Search in body_html
    matches = list(re.finditer(re.escape(cls), body_html))
    output.append(f"Found {len(matches)} occurrences inside <body>")
    for idx, match in enumerate(matches):
        pos = match.start() + body_start
        start_tag_pos = html.rfind('<', 0, pos)
        if start_tag_pos != -1:
            context_start = max(0, start_tag_pos - 150)
            context_end = min(len(html), pos + 350)
            output.append(f"\n--- Occurrence {idx+1} (char index {pos}) ---")
            output.append("CONTEXT BEFORE:")
            output.append(html[context_start:start_tag_pos])
            output.append("TAG & CONTEXT AFTER:")
            output.append(html[start_tag_pos:context_end])
            output.append("-" * 50)

with open('scratch/body_matches.txt', 'w', encoding='utf-8') as f:
    f.write('\n'.join(output))

print("Wrote body matches to scratch/body_matches.txt")
