const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve local team images with long-term aggressive caching (1 year)
app.use('/images/team', express.static(path.join(__dirname, 'images', 'team'), {
  maxAge: '365d',
  immutable: true
}));

// Serve other static assets (css, js, sw.js) with 1-day caching
app.use(express.static(__dirname, {
  maxAge: '1d'
}));

// Clean URL routes
app.get('/',               (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/team',           (req, res) => res.sendFile(path.join(__dirname, 'team.html')));
app.get('/register',       (req, res) => res.sendFile(path.join(__dirname, 'register.html')));
app.get('/request-invite', (req, res) => res.sendFile(path.join(__dirname, 'request-invite.html')));

// 404 fallback
app.use((req, res) => res.redirect('/'));

app.listen(PORT, () => {
  console.log(`\n  CYFERNODE 5.0  →  http://localhost:${PORT}\n`);
});
