const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const examplePath = path.join(root, '.env.example');
const envPath = path.join(root, '.env');

require('dotenv').config({ path: examplePath });
if (fs.existsSync(envPath)) {
  require('dotenv').config({ path: envPath, override: true });
}
