import os
import re

html_files = ['index.html', 'team.html', 'register.html', 'request-invite.html']
classes = [
    'framer-yshl83-container',
    'framer-6stad1-container',
    'framer-296ee2-container',
    'framer-ov0d3q',
    'framer-1hireqr-container',
    'framer-PDnFr',
    'framer-puj1sb-container'
]

for filename in html_files:
    print(f"\n==================== FILE: {filename} ====================")
    if not os.path.exists(filename):
        print("Does not exist")
        continue
    with open(filename, 'r', encoding='utf-8') as f:
        html = f.read()
    
    body_start = html.find('<body')
    if body_start == -1:
        body_start = 0
        
    for cls in classes:
        # search after body_start
        matches = list(re.finditer(re.escape(cls), html[body_start:]))
        if matches:
            print(f"Class '{cls}' found {len(matches)} times in body")
        else:
            # check if found at all
            all_matches = list(re.finditer(re.escape(cls), html))
            if all_matches:
                print(f"Class '{cls}' found {len(all_matches)} times (only in styles/meta)")
