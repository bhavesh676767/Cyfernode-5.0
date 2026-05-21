const nodemailer = require('nodemailer');

const EVENT_NAME = 'Cyfernode 5.0';
const MAIN_WEBSITE_URL = 'https://cyfernode.com/';
const PROMPTS_URL =
  'https://www.notion.so/Event-Prompts-902c3288d8d243d1942f2a64582bd5c2';
const INSTAGRAM_URL = 'https://www.instagram.com/cyfernode_4.0/';
const DEFAULT_BANNER_URL =
  'https://i.ibb.co/Lzsh2Rth/banner-email-cyfernode.jpg';

let transporter;

function getTransporter() {
  if (transporter) return transporter;

  const user = process.env.BREVO_SMTP_USER;
  const pass = process.env.BREVO_SMTP_PASS;
  if (!user || !pass) throw new Error('BREVO_SMTP_USER and BREVO_SMTP_PASS must be set');

  transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false,
    auth: { user, pass }
  });

  return transporter;
}

function senderAddress() {
  const email = process.env.BREVO_SENDER_EMAIL || 'hello@cyfernode.com';
  const name = process.env.BREVO_SENDER_NAME || 'Cyfernode';
  return `"${name}" <${email}>`;
}

function bannerImageUrl() {
  return process.env.BANNER_IMAGE_URL || DEFAULT_BANNER_URL;
}

function escapeHtml(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatEventList(events) {
  const list = [...events];
  if (list.length === 1) return escapeHtml(list[0]);
  return list.map((e) => escapeHtml(e)).join(', ');
}

/** Split payload into participant and teacher in-charge recipients */
function buildRecipientLists(payload) {
  const participants = new Map();
  const teachers = new Map();

  for (const ev of payload.events || []) {
    const eventName = ev.eventName || 'your event';

    for (const p of ev.participants || []) {
      if (!p.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email)) continue;
      const key = p.email.trim().toLowerCase();
      if (!participants.has(key)) {
        participants.set(key, { email: p.email.trim(), name: p.name || 'Participant', events: new Set() });
      }
      const entry = participants.get(key);
      if (p.name) entry.name = p.name;
      entry.events.add(eventName);
    }

    const t = ev.teacherIncharge || {};
    if (t.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t.email)) {
      const key = t.email.trim().toLowerCase();
      if (!teachers.has(key)) {
        teachers.set(key, { email: t.email.trim(), name: t.name || 'Event In-Charge', events: new Set() });
      }
      const entry = teachers.get(key);
      if (t.name) entry.name = t.name;
      entry.events.add(eventName);
    }
  }

  // Same email as teacher → teacher email only
  for (const key of teachers.keys()) {
    participants.delete(key);
  }

  return {
    participants: Array.from(participants.values()).map((r) => ({
      ...r,
      events: Array.from(r.events)
    })),
    teachers: Array.from(teachers.values()).map((r) => ({
      ...r,
      events: Array.from(r.events)
    }))
  };
}

function wrapEmail(bodyHtml) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0"><tr>
<td align="center" style="padding:24px 12px;">
<table width="520" cellpadding="0" cellspacing="0" style="max-width:520px;background:#ffffff;border-radius:6px;">
<tr><td style="line-height:0;">
<img src="${bannerImageUrl()}" alt="${EVENT_NAME}" width="520" style="display:block;width:100%;height:auto;border:0;" />
</td></tr>
<tr><td style="padding:28px 24px;font-size:15px;line-height:1.6;color:#333333;">
${bodyHtml}
<p style="margin:24px 0 0;padding-top:20px;border-top:1px solid #eeeeee;font-size:14px;color:#666666;">
<strong style="color:#333;">Dates</strong><br>
Online submissions — 9 July<br>
Final round &amp; ceremony — 10 July
</p>
<p style="margin:16px 0 0;font-size:14px;color:#666666;">
<a href="${MAIN_WEBSITE_URL}" style="color:#111;">Website</a> &nbsp;·&nbsp;
<a href="${PROMPTS_URL}" style="color:#111;">Prompts</a> &nbsp;·&nbsp;
<a href="${INSTAGRAM_URL}" style="color:#111;">Instagram</a>
</p>
<p style="margin:20px 0 0;font-size:12px;color:#999999;">— ${EVENT_NAME}</p>
</td></tr>
</table>
</td></tr></table>
</body></html>`;
}

function buildParticipantEmailHtml({ name, events }) {
  const eventLine = formatEventList(events);
  return wrapEmail(`
<p style="margin:0 0 12px;font-size:13px;color:#888888;text-transform:uppercase;letter-spacing:1px;">Participant</p>
<p style="margin:0 0 16px;font-size:22px;font-weight:600;color:#111111;">Hi ${escapeHtml(name)},</p>
<p style="margin:0;">
You are successfully registered for <strong>${eventLine}</strong> at <strong>${EVENT_NAME}</strong>.
We look forward to seeing you compete.
</p>
<p style="margin:16px 0 0;">Check the event prompts and stay updated via our links below.</p>
`);
}

function buildTeacherEmailHtml({ name, events }) {
  const eventLine = formatEventList(events);
  return wrapEmail(`
<p style="margin:0 0 12px;font-size:13px;color:#888888;text-transform:uppercase;letter-spacing:1px;">Event In-Charge</p>
<p style="margin:0 0 16px;font-size:22px;font-weight:600;color:#111111;">Hi ${escapeHtml(name)},</p>
<p style="margin:0;">
Thank you for registering as <strong>Event In-Charge</strong> for <strong>${eventLine}</strong> at <strong>${EVENT_NAME}</strong>.
We have recorded your school&rsquo;s entry and will share further updates with you as needed.
</p>
<p style="margin:16px 0 0;">Please ensure your participants are prepared for the dates below.</p>
`);
}

function buildInviteEmailHtml({ recipientName }) {
  return wrapEmail(`
<p style="margin:0 0 16px;font-size:22px;font-weight:600;color:#111111;">Hi ${escapeHtml(recipientName)},</p>
<p style="margin:0;">We received your invite request for <strong>${EVENT_NAME}</strong>. Our team will be in touch soon.</p>
`);
}

async function sendOne({ toEmail, toName, subject, htmlContent }) {
  const transport = getTransporter();
  return transport.sendMail({
    from: senderAddress(),
    to: toName ? `"${toName}" <${toEmail}>` : toEmail,
    subject,
    html: htmlContent
  });
}

async function sendRegistrationEmails(payload) {
  const { participants, teachers } = buildRecipientLists(payload);
  const jobs = [];

  for (const p of participants) {
    jobs.push(
      sendOne({
        toEmail: p.email,
        toName: p.name,
        subject: `${EVENT_NAME} — Registered for ${p.events[0] || 'your event'}`,
        htmlContent: buildParticipantEmailHtml({ name: p.name, events: p.events })
      })
    );
  }

  for (const t of teachers) {
    jobs.push(
      sendOne({
        toEmail: t.email,
        toName: t.name,
        subject: `${EVENT_NAME} — Event In-Charge for ${t.events[0] || 'your event'}`,
        htmlContent: buildTeacherEmailHtml({ name: t.name, events: t.events })
      })
    );
  }

  if (!jobs.length) {
    return { sent: 0, failed: 0, skipped: 'no_valid_emails' };
  }

  const results = await Promise.allSettled(jobs);
  const sent = results.filter((x) => x.status === 'fulfilled').length;
  const failed = results.filter((x) => x.status === 'rejected').length;
  const errors = results
    .filter((x) => x.status === 'rejected')
    .map((x) => x.reason?.message || String(x.reason));

  return {
    sent,
    failed,
    total: jobs.length,
    participants: participants.length,
    teachers: teachers.length,
    errors
  };
}

async function sendInviteEmail({ email, name }) {
  await sendOne({
    toEmail: email,
    toName: name || 'there',
    subject: `${EVENT_NAME} — Invite request received`,
    htmlContent: buildInviteEmailHtml({ recipientName: name || 'there' })
  });
  return { sent: 1 };
}

module.exports = {
  sendRegistrationEmails,
  sendInviteEmail,
  sendOne,
  buildRecipientLists,
  buildParticipantEmailHtml,
  buildTeacherEmailHtml
};
