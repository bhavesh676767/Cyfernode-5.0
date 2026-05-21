with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

classes = [
    'framer-yshl83-container',
    'framer-6stad1-container',
    'framer-296ee2-container',
    'framer-ov0d3q',
    'framer-puj1sb-container'
]

for cls in classes:
    print(f"\n==================== CLASS: {cls} ====================")
    pos = html.find(cls)
    if pos != -1:
        start = max(0, pos - 150)
        end = min(len(html), pos + 1000)
        print(html[start:end])
        print("="*60)
