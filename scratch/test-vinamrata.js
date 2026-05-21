const fs = require('fs');
const path = require('path');
const https = require('https');

const discordUrl = "https://cdn.discordapp.com/attachments/1284568055644553303/1505569805728743466/41191d15-d867-48ac-b0df-9a257519bfaf.png?ex=6a0b1aa5&is=6a09c925&hm=6dc529b6a9a2fad58eb37283dc704e94b3599f5dacf52aac9ffa3d1022964d90&";
const dest = path.join(__dirname, '..', 'images', 'team', 'vinamrata.png');

https.get(discordUrl, (res) => {
  if (res.statusCode !== 200) {
    console.error(`Failed: status code ${res.statusCode}`);
    return;
  }
  
  const stream = fs.createWriteStream(dest);
  res.pipe(stream);
  
  stream.on('finish', () => {
    stream.close();
    console.log(`Success! Saved to ${dest}`);
  });
}).on('error', (err) => {
  console.error('Error:', err.message);
});
