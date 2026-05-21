const https = require('https');

const url = 'https://postimg.cc/Zn8KndJJ';

https.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log(`Status Code: ${res.statusCode}`);
    if (res.statusCode === 200) {
      // Look for any image URLs in the HTML content
      const regex = /https:\/\/i\.postimg\.cc\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+/g;
      const matches = data.match(regex);
      if (matches) {
        console.log('Found image URLs on the page:');
        console.log(Array.from(new Set(matches)));
      } else {
        console.log('No direct image URLs found on page HTML.');
        // Let's print a small snippet of HTML to inspect
        console.log(data.substring(0, 1000));
      }
    } else {
      console.log('Page not found or returned error.');
    }
  });
}).on('error', (err) => {
  console.error('Error:', err.message);
});
