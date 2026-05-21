with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

body_start = html.find('<body')
if body_start == -1:
    body_start = 0

pos = html.find('framer-puj1sb-container', body_start)
if pos != -1:
    print(html[pos-100:pos+1500])
