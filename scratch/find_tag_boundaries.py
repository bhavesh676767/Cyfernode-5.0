import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

body_start = html.find('<body')
if body_start == -1:
    body_start = 0

classes = [
    'framer-811ryh-container'
]

def find_matching_close_tag(html_str, start_pos):
    tag_match = re.match(r'<([a-zA-Z0-9]+)', html_str[start_pos:])
    if not tag_match:
        return -1
    tag_name = tag_match.group(1)
    
    pos = start_pos
    depth = 0
    while pos < len(html_str):
        next_open = html_str.find(f'<{tag_name}', pos)
        next_close = html_str.find(f'</{tag_name}>', pos)
        
        if next_close == -1:
            return -1
            
        if next_open != -1 and next_open < next_close:
            depth += 1
            pos = next_open + 1
        else:
            depth -= 1
            if depth == 0:
                return next_close + len(f'</{tag_name}>')
            pos = next_close + 1
    return -1

for cls in classes:
    print(f"\n==================== CLASS: {cls} ====================")
    idx = 0
    pos = html.find(cls, body_start)
    while pos != -1:
        idx += 1
        start_tag_pos = html.rfind('<', body_start, pos)
        if start_tag_pos != -1:
            end_tag_pos = find_matching_close_tag(html, start_tag_pos)
            print(f"Match {idx}: positions {start_tag_pos} to {end_tag_pos}")
            if end_tag_pos != -1:
                print("CONTENT:")
                print(html[start_tag_pos:end_tag_pos][:400] + "...")
            else:
                print("Could not find matching close tag")
        pos = html.find(cls, pos + 1)
