with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

pos = html.find('framer-puj1sb-container')
if pos != -1:
    print(html[pos-100:pos+1500])
