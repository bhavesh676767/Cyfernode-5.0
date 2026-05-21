require('./lib/env');

const express = require('express');
const path = require('path');
const { sendRegistrationEmails, sendInviteEmail } = require('./lib/email');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '2mb' }));

// Serve local team images with long-term aggressive caching (1 year)
app.use('/images/team', express.static(path.join(__dirname, 'images', 'team'), {
  maxAge: '365d',
  immutable: true
}));

// Serve other static assets (css, js, sw.js) with 1-day caching
app.use(express.static(__dirname, {
  maxAge: '1d'
}));

// Registration confirmation emails (after Google Sheets submit)
app.post('/api/send-registration-email', async (req, res) => {
  try {
    const payload = req.body;
    if (!payload || !Array.isArray(payload.events) || payload.events.length === 0) {
      return res.status(400).json({ ok: false, error: 'Invalid registration payload' });
    }
    const result = await sendRegistrationEmails(payload);
    res.json({ ok: true, ...result });
  } catch (err) {
    console.error('[email] registration send failed:', err);
    res.status(500).json({ ok: false, error: err.message || 'Failed to send email' });
  }
});

app.post('/api/send-invite-email', async (req, res) => {
  try {
    const { email, name } = req.body || {};
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ ok: false, error: 'Valid email required' });
    }
    await sendInviteEmail({ email: email.trim(), name: name || 'School Coordinator' });
    res.json({ ok: true, sent: 1 });
  } catch (err) {
    console.error('[email] invite send failed:', err);
    res.status(500).json({ ok: false, error: err.message || 'Failed to send email' });
  }
});

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
