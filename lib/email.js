const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendPaymentConfirmationEmail({ to, amount }) {
  try {
    const msg = {
      to,
      from: 'noreply@simvai.com',
      subject: 'Your SIMVAI Conference Registration is Confirmed!',
      html: `
        <div style="font-family: 'Segoe UI', Roboto, Arial, sans-serif; background-color: #f9f9f9; padding: 40px 20px;">
          <div style="max-width: 600px; margin: auto; background: white; border-radius: 10px; padding: 30px; box-shadow: 0 5px 20px rgba(0,0,0,0.05);">
            <div style="text-align: center; margin-bottom: 20px;">
              <img src="https://simvai.com/assets/images/simvai/simvai-full-logo.png" alt="SIMVAI" style="max-width: 180px;" />
            </div>
            <h2 style="color: #D80027; text-align: center; margin-bottom: 10px;">Registration Confirmed ✅</h2>
            <p style="font-size: 16px; color: #333; text-align: center;">
              Thank you for your payment! You have successfully registered for the SIMVAI Conference.
            </p>
            <ul style="font-size: 15px; line-height: 1.7; color: #555; margin-top: 20px; padding-left: 20px;">
              <li>🎤 Full access to the conference</li>
              <li>📄 Participation certificate</li>
              <li>🌐 Live stream access</li>
              <li>💳 Payment Amount: <strong>€${amount}</strong></li>
              <li>👤 Registered Email: <strong>${to}</strong></li>
              <li>📍 Event Location: <a href="https://maps.app.goo.gl/yLSLbCJCu5gKEC3F6" target="_blank">View on Google Maps</a></li>
            </ul>
            <p style="font-size: 14px; color: #777; text-align: center; margin-top: 30px;">
              For any questions, please contact us at <a href="mailto:simvai@simvai.com">simvai@simvai.com</a>.
            </p>
            <p style="font-size: 14px; color: #777; text-align: center; margin-top: 10px;">
              Follow the event updates on <a href="https://simvai.com/event">https://simvai.com/event</a>
            </p>
            <div style="text-align: center; margin-top: 30px;">
              <a href="https://simvai.com" style="background: #D80027; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500;">
                Return to Website
              </a>
            </div>
          </div>
        </div>
      `,
    };

    await sgMail.send(msg);
    console.log(`📧 Confirmation email sent to ${to}`);
  } catch (error) {
    console.error('❌ Error sending payment confirmation:', error.response?.body || error.message);
  }
}


async function sendWelcomeEmail({ to, name }) {
  try {
    const msg = {
      to,
      from: 'noreply@simvai.com',
      subject: 'Welcome to SIMVAI!',
      html: `
        <div style="font-family: 'Segoe UI', Roboto, Arial, sans-serif; background-color: #f9f9f9; padding: 40px 20px;">
          <div style="max-width: 600px; margin: auto; background: white; border-radius: 10px; padding: 30px; box-shadow: 0 5px 20px rgba(0,0,0,0.05);">
            <div style="text-align: center; margin-bottom: 20px;">
              <img src="https://simvai.com/assets/images/simvai/simvai-full-logo.png" alt="SIMVAI" style="max-width: 180px;" />
            </div>
            <h2 style="color: #D80027; text-align: center;">Welcome, ${name || 'Participant'} 👋</h2>
            <p style="font-size: 16px; color: #333; text-align: center;">
              You have successfully signed in to the SIMVAI platform using your Google account.
            </p>
            <p style="font-size: 15px; line-height: 1.6; color: #555; margin-top: 20px;">
              From your dashboard, you can now:
            </p>
            <ul style="font-size: 15px; color: #555; line-height: 1.7; padding-left: 20px;">
              <li>🎟 Purchase tickets</li>
              <li>🗓 Follow the event schedule</li>
              <li>🤝 Join live discussions and networking</li>
            </ul>
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://simvai.com/event" style="padding: 12px 24px; background: #D80027; color: white; text-decoration: none; border-radius: 6px; font-weight: 500;">
                View Ticket Options
              </a>
            </div>
            <p style="font-size: 13px; color: #999; text-align: center;">If you didn't register, you can safely ignore this message.</p>
          </div>
        </div>
      `
    };

    await sgMail.send(msg);
    console.log(`📨 Welcome email sent to ${to}`);
  } catch (error) {
    console.error('❌ Error sending welcome email:', error.response?.body || error.message);
  }
}

module.exports = {
  sendPaymentConfirmationEmail,
  sendWelcomeEmail
};
