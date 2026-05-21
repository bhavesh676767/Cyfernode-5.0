"""
fix_navigation.py
Modifies index.html to add proper <a> href attributes to navigation elements.

Elements to fix:
1. framer-296ee2-container (YouTube social icon) - wrap with <a href="https://www.youtube.com/@CyferNauts" target="_blank">
2. framer-6stad1-container (Discord social icon) - wrap with <a href="https://discord.gg/wVHcUDWj3" target="_blank">
3. framer-yshl83-container (Instagram social icon) - wrap with <a href="https://www.instagram.com/cyfernode_4.0/" target="_blank">
4. framer-1hireqr-container (footer Instagram icon) - add href to inner <a>
5. framer-811ryh-container (footer YouTube icon) - add href to inner <a>
6. framer-ov0d3q (Register button) - wrap with <a href="/register">
7. framer-puj1sb-container (Prompts button) - add href to inner <a>
"""

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

body_start = html.find('<body')
if body_start == -1:
    body_start = 0

original = html  # keep backup

# ------------------------------------------------------------------
# Helper: replace the exact slice html[start:end] with replacement
# We keep all replacements in a list and apply them from back-to-front 
# so indexes don't shift.
replacements = []

# ------------------------------------------------------------------
# 1. Fix footer Instagram icon (framer-1hireqr-container Match 1)
# Inner <a> tag has no href - change ga4xd6ins="Twitter" to point to Instagram
# Current: <a ga4xd6ins="Twitter" class="framer-el8xql framer-a0qk21" ... style="height:100%;width:100%">
# We need to inject href="https://www.instagram.com/cyfernode_4.0/" target="_blank" rel="noopener noreferrer"

FOOTER_IG_A_TAG = '<a ga4xd6ins="Twitter" class="framer-el8xql framer-a0qk21" data-framer-name="Variant 1" style="height:100%;width:100%">'
IG_URL = "https://www.instagram.com/cyfernode_4.0/"
YT_URL = "https://www.youtube.com/@CyferNauts"

# Find the FIRST occurrence of the footer social <a> tag after body_start
# It appears 4 times (2 for each footer variant) - first pair is IG+YT, second pair (in different SSR variant) is IG+YT again

# The two framer-1hireqr-container occurrences are at char 609282 and 613264
# The two framer-811ryh-container occurrences are at char 609631 and 613613

# All 4 inner <a> tags inside these containers have the same empty format:
# <a ga4xd6ins="Twitter" class="framer-el8xql framer-a0qk21" data-framer-name="Variant 1" style="height:100%;width:100%">

# We need to replace them with appropriate href:
# - framer-1hireqr-container -> Instagram
# - framer-811ryh-container -> YouTube

# Approach: find each container's inner <a> tag by position and replace

def find_inner_a(html_str, container_start, container_end):
    """Find the inner empty <a> tag in the container and return its position."""
    snippet = html_str[container_start:container_end]
    pos = snippet.find('<a ')
    if pos != -1:
        return container_start + pos
    return -1

# Container positions (from find_tag_boundaries.py output)
containers = [
    # (start, end, url, label)
    (609282, 609631, IG_URL, "footer-instagram-1"),
    (609631, 609979, YT_URL, "footer-youtube-1"),
    (613264, 613613, IG_URL, "footer-instagram-2"),
    (613613, 613961, YT_URL, "footer-youtube-2"),
]

for (cstart, cend, url, label) in containers:
    a_pos = find_inner_a(html, cstart, cend)
    if a_pos == -1:
        print(f"WARNING: Could not find inner <a> in {label} container")
        continue
    # Find the end of the opening <a> tag
    tag_end = html.find('>', a_pos)
    if tag_end == -1:
        print(f"WARNING: Could not find end of <a> in {label}")
        continue
    
    old_tag = html[a_pos:tag_end+1]
    # Inject href and target before the closing >
    new_tag = old_tag[:-1] + f' href="{url}" target="_blank" rel="noopener noreferrer">'
    
    replacements.append((a_pos, tag_end+1, new_tag))
    print(f"[{label}] Will add href='{url}' to inner <a>")

# ------------------------------------------------------------------
# 2. Fix framer-puj1sb-container (Prompts button) inner <a>
# Container: positions 396382 to 397725
# Already has an <a> tag but with no href
PROMPTS_URL = "https://www.notion.so/Event-Prompts-902c3288d8d243d1942f2a64582bd5c2"

c_start, c_end = 396382, 397725
a_pos = find_inner_a(html, c_start, c_end)
if a_pos != -1:
    tag_end = html.find('>', a_pos)
    if tag_end != -1:
        old_tag = html[a_pos:tag_end+1]
        new_tag = old_tag[:-1] + f' href="{PROMPTS_URL}" target="_blank" rel="noopener noreferrer">'
        replacements.append((a_pos, tag_end+1, new_tag))
        print(f"[framer-puj1sb-container] Will add href='{PROMPTS_URL}' to inner <a>")

# ------------------------------------------------------------------
# 3. Wrap social icon containers (YouTube, Discord, Instagram) with <a> tags
# These are divs that need to be wrapped:
# framer-296ee2-container: 251577 to 252588 -> YouTube
# framer-6stad1-container: 252588 to 253204 -> Discord
# framer-yshl83-container: 253204 to 254722 -> Instagram

social_wrappers = [
    (251577, 252588, YT_URL, "YouTube (framer-296ee2-container)"),
    (252588, 253204, "https://discord.gg/wVHcUDWj3", "Discord (framer-6stad1-container)"),
    (253204, 254722, IG_URL, "Instagram (framer-yshl83-container)"),
]

for (cstart, cend, url, label) in social_wrappers:
    old_content = html[cstart:cend]
    new_content = f'<a href="{url}" target="_blank" rel="noopener noreferrer" style="display:contents">{old_content}</a>'
    replacements.append((cstart, cend, new_content))
    print(f"[{label}] Will wrap with <a href='{url}'>")

# ------------------------------------------------------------------
# 4. Wrap framer-ov0d3q (Register button) with <a href="/register">
# Position: 255342 to 256523
REG_START, REG_END = 255342, 256523
old_content = html[REG_START:REG_END]
new_content = f'<a href="/register" style="display:contents">{old_content}</a>'
replacements.append((REG_START, REG_END, new_content))
print("[framer-ov0d3q Register] Will wrap with <a href='/register'>")

# ------------------------------------------------------------------
# Apply all replacements from back to front (so positions stay valid)
replacements.sort(key=lambda x: x[0], reverse=True)

for (start, end, new_content) in replacements:
    html = html[:start] + new_content + html[end:]

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("\nDone! All replacements applied to index.html")

# Verify
with open('index.html', 'r', encoding='utf-8') as f:
    verify = f.read()

checks = [
    ('href="https://www.instagram.com/cyfernode_4.0/"', 'Instagram href'),
    ('href="https://discord.gg/wVHcUDWj3"', 'Discord href'),
    ('href="https://www.youtube.com/@CyferNauts"', 'YouTube href'),
    ('href="/register"', 'Register href'),
    ('href="https://www.notion.so/Event-Prompts', 'Prompts href'),
]

print("\nVerification:")
for (needle, label) in checks:
    count = verify.count(needle)
    print(f"  {label}: {count} occurrences of '{needle}'")
