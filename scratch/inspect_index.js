const fs = require('fs');
const path = require('path');

const indexHtmlPath = path.join(__dirname, '..', 'index.html');
if (fs.existsSync(indexHtmlPath)) {
  const content = fs.readFileSync(indexHtmlPath, 'utf8');
  
  // Find instances of class="framer-e4e94c"
  const regex = /<[a-z0-9]+[^>]*class="[^"]*framer-e4e94c[^"]*"[^>]*>([\s\S]*?)<\/[a-z0-9]+>/gi;
  let match;
  let index = 1;
  while ((match = regex.exec(content)) !== null) {
    console.log(`--- MATCH ${index} ---`);
    console.log(match[0]);
    index++;
  }
} else {
  console.log('index.html not found at', indexHtmlPath);
}
