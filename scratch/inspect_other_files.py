import re

files = ['team.html', 'register.html', 'request-invite.html']

for filename in files:
    print(f"\n==================== FILE: {filename} ====================")
    with open(filename, 'r', encoding='utf-8') as f:
        html = f.read()
    
    # Print all <a > tags in the body
    body_start = html.find('<body')
    if body_start == -1:
        body_start = 0
    body_html = html[body_start:]
    
    links = re.findall(r'<a\s+[^>]*>[\s\S]*?</a>', body_html)
    print(f"Found {len(links)} links:")
    for link in links[:15]:  # print first 15 links
        print("  ", link.strip()[:150].replace('\n', ' '))
    if len(links) > 15:
        print(f"  ... and {len(links) - 15} more")
