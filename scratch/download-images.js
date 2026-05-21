const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const images = [
  { url: 'https://i.postimg.cc/wvKpNjfN/bhavesh.png', name: 'bhavesh.png' },
  { url: 'https://i.postimg.cc/j2FvWLvs/aazim.png', name: 'aazim.png' },
  { url: 'https://i.ibb.co/G4t8CQmT/c1ee8175-999a-400b-8e07-0f1a057781c2.png', name: 'aarav.png' },
  { url: 'https://i.postimg.cc/KvTt7q8D/arnab.png', name: 'arnab.png' },
  { url: 'https://i.postimg.cc/Zn8KndJJ/vinamrata.png', name: 'vinamrata.png' },
  { url: 'https://i.postimg.cc/65pDyZWn/namish.png', name: 'namish.png' },
  { url: 'https://i.ibb.co/5h45cYyV/image.png', name: 'manas.png' },
  { url: 'https://i.postimg.cc/pL4bNdt4/sampada.png', name: 'sampada.png' },
  { url: 'https://i.postimg.cc/QdBwqrW4/yashwardan.png', name: 'yashvardhan.png' },
  { url: 'https://i.postimg.cc/VvdWczwW/pranav.png', name: 'pranav.png' },
  { url: 'https://i.postimg.cc/hjK2NFfq/nikumbh.png', name: 'nikumbh.png' },
  { url: 'https://i.postimg.cc/9fhbq3PH/shaurya.png', name: 'shaurya.png' },
  { url: 'https://i.postimg.cc/6q2nmzV1/yuvraj.png', name: 'yuvraj.png' },
  { url: 'https://i.postimg.cc/Bv45nTsn/gyanada.png', name: 'gyanada.png' }
];

const targetDir = path.join(__dirname, '..', 'images', 'team');

// Ensure target directory exists
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
  console.log(`Created directory: ${targetDir}`);
}

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    protocol.get(url, (res) => {
      // Handle redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        console.log(`Redirecting to: ${res.headers.location}`);
        return downloadFile(res.headers.location, destPath).then(resolve).catch(reject);
      }
      
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: status code ${res.statusCode}`));
        return;
      }
      
      const fileStream = fs.createWriteStream(destPath);
      res.pipe(fileStream);
      
      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`Successfully downloaded to: ${destPath}`);
        resolve();
      });
      
      fileStream.on('error', (err) => {
        fs.unlink(destPath, () => {}); // delete partial file on error
        reject(err);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function startDownloads() {
  console.log(`Starting download of ${images.length} team images...`);
  
  for (const img of images) {
    const dest = path.join(targetDir, img.name);
    console.log(`\nDownloading ${img.name} from ${img.url}...`);
    try {
      await downloadFile(img.url, dest);
    } catch (err) {
      console.error(`Error downloading ${img.name}: ${err.message}`);
    }
  }
  
  console.log('\nAll downloads complete!');
}

startDownloads();
