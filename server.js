const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static assets (css, js, images)
app.use(express.static(__dirname));

// Clean URL routes
app.get('/',        (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/team',    (req, res) => res.sendFile(path.join(__dirname, 'team.html')));
app.get('/register',(req, res) => res.sendFile(path.join(__dirname, 'register.html')));

// 404 fallback
app.use((req, res) => res.redirect('/'));

app.listen(PORT, () => {
  console.log(`\n  CYFERNODE 5.0  →  http://localhost:${PORT}\n`);
});
