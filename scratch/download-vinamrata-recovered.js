const fs = require('fs');
const path = require('path');
const https = require('https');

const recoveredUrls = [
  'https://i.postimg.cc/byMG6xMS/vinamrata.png',
  'https://i.postimg.cc/GTp1S9Bf/vinamrata.png'
];

const dest = path.join(__dirname, '..', 'images', 'team', 'vinamrata.png');

function download(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed with status code ${res.statusCode}`));
        return;
      }
      
      const stream = fs.createWriteStream(dest);
      res.pipe(stream);
      
      stream.on('finish', () => {
        stream.close();
        console.log(`Successfully downloaded Vinamrata photo from ${url}!`);
        resolve();
      });
      
      stream.on('error', (err) => {
        fs.unlink(dest, () => {});
        reject(err);
      });
    }).on('error', reject);
  });
}

async function start() {
  for (const url of recoveredUrls) {
    try {
      console.log(`Trying ${url}...`);
      await download(url);
      console.log('Download successful!');
      return;
    } catch (err) {
      console.error(`Failed to download from ${url}: ${err.message}`);
    }
  }
  console.error('All recovered URLs failed.');
}

start();
