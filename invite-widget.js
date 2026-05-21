/**
 * CYFERNODE 5.0 — Invite Request Widget
 * Usage: <script src="invite-widget.js"></script>
 */
(function () {
  'use strict';

  const INVITE_ENDPOINT =
    'https://script.google.com/macros/s/AKfycbx7L-RqLlbnpiz19fFvJGWph_QfkLB7xnTnfEZU4zp0pEfcLCrqwixgvHX1N220oWJPYA/exec';

  /* ─────────────────── STYLES ────────────────────────────── */
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400;700&family=DM+Sans:wght@400;500&display=swap');

    /* ── FAB ── */
    #cyfrn-fab {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9000;
      display: flex;
      align-items: center;
      height: 46px;
      width: 46px;
      min-width: 46px;
      padding: 0 14px;
      background: #141414;
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 8px;
      cursor: pointer;
      overflow: hidden;
      transition:
        width 0.4s cubic-bezier(0.22,1,0.36,1),
        border-color 0.3s;
      outline: none;
      white-space: nowrap;
      box-shadow: 0 4px 24px rgba(0,0,0,0.4);
    }
    #cyfrn-fab:hover {
      width: 198px;
      border-color: rgba(255,255,255,0.2);
    }
    #cyfrn-fab:active { transform: scale(0.97); }

    #cyfrn-fab-icon {
      flex-shrink: 0;
      width: 18px;
      height: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    #cyfrn-fab-icon svg {
      width: 18px;
      height: 18px;
      fill: none;
      stroke: rgba(255,255,255,0.8);
      stroke-width: 1.6;
      stroke-linecap: square;
      stroke-linejoin: miter;
    }
    #cyfrn-fab-label {
      margin-left: 11px;
      font-family: 'Pixelify Sans', monospace;
      font-size: 10px;
      letter-spacing: 1.6px;
      text-transform: uppercase;
      color: rgba(255,255,255,0.8);
      opacity: 0;
      transform: translateX(-6px);
      transition: opacity 0.2s ease 0.05s, transform 0.2s ease 0.05s;
      pointer-events: none;
    }
    #cyfrn-fab:hover #cyfrn-fab-label {
      opacity: 1;
      transform: none;
    }

    /* ── OVERLAY ── */
    #cyfrn-overlay {
      position: fixed;
      inset: 0;
      z-index: 9001;
      background: rgba(0,0,0,0.5);
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.28s ease, visibility 0.28s;
    }
    #cyfrn-overlay.open { opacity: 1; visibility: visible; }

    /* ── MODAL CARD ── */
    #cyfrn-modal {
      position: fixed;
      bottom: 82px;
      right: 24px;
      z-index: 9002;
      width: 360px;
      max-width: calc(100vw - 32px);
      background: #111111;
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 24px 72px rgba(0,0,0,0.55);
      opacity: 0;
      visibility: hidden;
      transform: translateY(10px) scale(0.98);
      transform-origin: bottom right;
      transition: opacity 0.28s ease, visibility 0.28s, transform 0.28s cubic-bezier(0.22,1,0.36,1);
    }
    #cyfrn-modal.open {
      opacity: 1;
      visibility: visible;
      transform: none;
    }

    /* 3px lime accent strip at top */
    #cyfrn-modal::before {
      content: '';
      display: block;
      height: 3px;
      background: #00ff41;
    }

    /* ── MODAL HEADER ── */
    .ci-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 22px 22px 0;
    }
    .ci-title {
      font-family: 'Pixelify Sans', monospace;
      font-size: 14px;
      font-weight: 700;
      letter-spacing: 2.5px;
      text-transform: uppercase;
      color: #fff;
    }
    .ci-actions {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .ci-icon-btn {
      width: 30px;
      height: 30px;
      border-radius: 6px;
      border: none;
      background: transparent;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s;
      padding: 0;
    }
    .ci-icon-btn:hover { background: rgba(255,255,255,0.05); }
    .ci-icon-btn svg {
      width: 14px;
      height: 14px;
      stroke: rgba(255,255,255,0.4);
      fill: none;
      stroke-width: 1.8;
      stroke-linecap: round;
      stroke-linejoin: round;
      transition: stroke 0.2s;
    }
    .ci-icon-btn:hover svg { stroke: rgba(255,255,255,0.75); }

    /* ── MODAL BODY ── */
    .ci-body {
      padding: 18px 22px 26px;
    }
    .ci-sub {
      font-family: 'DM Sans', sans-serif;
      font-size: 13px;
      color: rgba(255,255,255,0.38);
      line-height: 1.65;
      margin-bottom: 20px;
    }
    .ci-sub b {
      color: rgba(255,255,255,0.7);
      font-weight: 500;
    }

    /* Input */
    .ci-input {
      width: 100%;
      box-sizing: border-box;
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 8px;
      color: #fff;
      font-family: 'DM Sans', sans-serif;
      font-size: 14px;
      padding: 13px 15px;
      outline: none;
      transition: border-color 0.25s, background 0.25s;
    }
    .ci-input:focus {
      border-color: #00ff41;
      background: rgba(255,255,255,0.05);
    }
    .ci-input::placeholder { color: rgba(255,255,255,0.18); }

    .ci-hint {
      font-family: 'DM Sans', sans-serif;
      font-size: 11px;
      color: rgba(255,255,255,0.2);
      margin-top: 8px;
    }
    .ci-err {
      font-family: 'DM Sans', sans-serif;
      font-size: 11px;
      color: #f87171;
      margin-top: 8px;
      display: none;
    }
    .ci-err.show { display: block; }

    /* Submit button */
    .ci-submit {
      width: 100%;
      margin-top: 18px;
      padding: 13px 20px;
      background: #fff;
      color: #000;
      border: none;
      border-radius: 8px;
      font-family: 'Pixelify Sans', monospace;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 1.8px;
      text-transform: uppercase;
      cursor: pointer;
      transition: opacity 0.2s, transform 0.15s;
    }
    .ci-submit:hover { opacity: 0.88; }
    .ci-submit:active { transform: scale(0.98); }
    .ci-submit:disabled { opacity: 0.3; cursor: not-allowed; }

    /* ── SUCCESS ── */
    .ci-success {
      display: none;
      padding: 40px 22px 44px;
      text-align: center;
    }
    .ci-success.show { display: block; }
    .ci-success svg {
      width: 36px;
      height: 36px;
      stroke: #fff;
      fill: none;
      stroke-width: 1.6;
      stroke-linecap: round;
      stroke-linejoin: round;
      margin-bottom: 18px;
    }
    .ci-success-title {
      font-family: 'Pixelify Sans', monospace;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #fff;
      margin-bottom: 8px;
    }
    .ci-success-sub {
      font-family: 'DM Sans', sans-serif;
      font-size: 12px;
      color: rgba(255,255,255,0.35);
      line-height: 1.65;
    }

    @media (max-width: 600px) {
      #cyfrn-fab { bottom: 16px; right: 16px; }
      #cyfrn-modal { bottom: 74px; right: 16px; width: calc(100vw - 32px); }
    }
  `;

  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  /* ─────────────────── SVG ICONS ─────────────────────────── */

  // Pixel-art envelope — white stroked
  const iconEnvelope = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="5" width="20" height="14"/>
    <polyline points="2,5 12,14 22,5"/>
    <line x1="2" y1="19" x2="8" y2="13"/>
    <line x1="22" y1="19" x2="16" y2="13"/>
  </svg>`;

  // Open external page (notch / new-tab icon)
  const iconNewTab = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>`;

  // Close X
  const iconClose = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <line x1="6" y1="6" x2="18" y2="18"/>
    <line x1="18" y1="6" x2="6" y2="18"/>
  </svg>`;

  // Success checkmark
  const iconCheck = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="8 12 11 15 16 9"/>
  </svg>`;

  /* ─────────────────── HTML ───────────────────────────────── */
  const html = `
    <button id="cyfrn-fab" aria-label="Request Invite" type="button">
      <span id="cyfrn-fab-icon">${iconEnvelope}</span>
      <span id="cyfrn-fab-label">Request Invite</span>
    </button>

    <div id="cyfrn-overlay"></div>

    <div id="cyfrn-modal" role="dialog" aria-modal="true" aria-label="Request Invite">
      <div class="ci-form-wrap">
        <div class="ci-header">
          <div class="ci-title">Request Invite</div>
          <div class="ci-actions">
            <button class="ci-icon-btn" id="cyfrn-newtab" aria-label="Open full page" title="Open full page" type="button">${iconNewTab}</button>
            <button class="ci-icon-btn" id="cyfrn-close" aria-label="Close" type="button">${iconClose}</button>
          </div>
        </div>
        <div class="ci-body">
          <p class="ci-sub">Submit your school's official email — we'll send a formal invitation to <b>Cyfernode 5.0</b>.</p>
          <input class="ci-input" id="cyfrn-email" type="email" placeholder="school@example.edu.in" autocomplete="email" spellcheck="false"/>
          <div class="ci-hint">Use your school's official email address</div>
          <div class="ci-err" id="cyfrn-err"></div>
          <button class="ci-submit" id="cyfrn-send" type="button">Send Request</button>
        </div>
      </div>
      <div class="ci-success" id="cyfrn-success">
        ${iconCheck}
        <div class="ci-success-title">Request Sent</div>
        <div class="ci-success-sub">We'll dispatch the official invite to your email shortly.</div>
      </div>
    </div>
  `;

  const root = document.createElement('div');
  root.id = 'cyfrn-widget';
  root.innerHTML = html;
  document.body.appendChild(root);

  /* ─────────────────── LOGIC ─────────────────────────────── */
  const fab      = document.getElementById('cyfrn-fab');
  const overlay  = document.getElementById('cyfrn-overlay');
  const modal    = document.getElementById('cyfrn-modal');
  const closeBtn = document.getElementById('cyfrn-close');
  const newTabBtn= document.getElementById('cyfrn-newtab');
  const emailEl  = document.getElementById('cyfrn-email');
  const errEl    = document.getElementById('cyfrn-err');
  const sendBtn  = document.getElementById('cyfrn-send');
  const formWrap = modal.querySelector('.ci-form-wrap');
  const success  = document.getElementById('cyfrn-success');

  function openModal() {
    overlay.classList.add('open');
    modal.classList.add('open');
    formWrap.style.display = '';
    success.classList.remove('show');
    errEl.classList.remove('show');
    sendBtn.disabled = false;
    sendBtn.textContent = 'Send Request';
    setTimeout(() => emailEl.focus(), 100);
  }

  function closeModal() {
    overlay.classList.remove('open');
    modal.classList.remove('open');
  }

  fab.addEventListener('click', openModal);
  overlay.addEventListener('click', closeModal);
  closeBtn.addEventListener('click', closeModal);

  newTabBtn.addEventListener('click', () => {
    closeModal();
    window.open('/request-invite', '_blank');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });

  emailEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendBtn.click();
  });

  sendBtn.addEventListener('click', async () => {
    const email = emailEl.value.trim();

    if (!email) { showErr('Please enter your school email address.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showErr('Please enter a valid email address.'); return; }

    errEl.classList.remove('show');
    sendBtn.disabled = true;
    sendBtn.textContent = 'Sending…';

    try {
      await fetch(INVITE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ email, timestamp: new Date().toISOString(), page: window.location.pathname }),
        mode: 'no-cors'
      });
      showSuccess();
    } catch {
      showErr('Network error — please try again.');
      sendBtn.disabled = false;
      sendBtn.textContent = 'Send Request';
    }
  });

  function showErr(msg) {
    errEl.textContent = msg;
    errEl.classList.add('show');
  }

  function showSuccess() {
    formWrap.style.display = 'none';
    success.classList.add('show');
    emailEl.value = '';
    setTimeout(closeModal, 3000);
  }

})();
