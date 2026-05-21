/**
 * Test Brevo SMTP via Nodemailer.
 * Usage: node send.js your.email@gmail.com
 */
require('./lib/env');

const nodemailer = require('nodemailer');
const { sendRegistrationEmails } = require('./lib/email');

const testEmail = process.argv[2];

async function sendSimpleTest() {
  const user = process.env.BREVO_SMTP_USER;
  const pass = process.env.BREVO_SMTP_PASS;
  if (!pass) {
    console.error('Set BREVO_SMTP_PASS in your .env file');
    process.exit(1);
  }

  const transport = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false,
    auth: { user, pass }
  });

  await transport.sendMail({
    from: `"${process.env.BREVO_SENDER_NAME || 'Cyfernode'}" <${process.env.BREVO_SENDER_EMAIL || 'hello@cyfernode.com'}>`,
    to: testEmail,
    subject: 'Cyfernode Test',
    html: `
      <h1>Hello 👋</h1>
      <p>Your Brevo SMTP works perfectly.</p>
    `
  });

  console.log('Simple test email sent to', testEmail);
}

async function sendFullRegistrationTest() {
  const samplePayload = {
    registrationId: `CYFRN5_TEST_${Date.now()}`,
    timestamp: new Date().toISOString(),
    registrationMode: 'multi',
    events: [
      {
        eventId: 'logic-league',
        eventName: 'Logic League',
        schoolName: 'Summer Fields School',
        teamName: 'Team Alpha',
        participants: [
          {
            no: 1,
            name: 'Bhavesh Rout',
            phone: "'9876543210",
            email: testEmail,
            grade: '11th'
          }
        ],
      teacherIncharge: {
        name: 'Dr. Test Teacher',
        phone: "'9876500000",
        email: 'teacher@school.edu'
      }
      }
    ]
  };

  const result = await sendRegistrationEmails(samplePayload);
  console.log('Registration email result:', result);
  if (result.failed > 0) {
    console.error('Errors:', result.errors);
    process.exit(1);
  }
  console.log('Full registration email sent to', testEmail);
}

if (!testEmail) {
  console.error('Usage: node send.js YOUR_EMAIL@gmail.com [--full]');
  process.exit(1);
}

const runFull = process.argv.includes('--full');

(runFull ? sendFullRegistrationTest() : sendSimpleTest()).catch((err) => {
  console.error('Failed to send:', err);
  process.exit(1);
});
