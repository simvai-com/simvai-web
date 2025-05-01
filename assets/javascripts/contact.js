const sgMail = require('@sendgrid/mail');
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const handleContactForm = async (req, res) => {
  const { name, email, message, subject } = req.body; // ✅ добавили subject

  const msg = {
    to: 'simvai@simvai.com',
    from: 'noreply@simvai.com',
    replyTo: email,
    subject: subject || 'Новое сообщение с формы', // безопасный fallback
    text: `Имя: ${name}\nEmail: ${email}\n\nСообщение:\n${message}`,
  };

  try {
    await sgMail.send(msg);
    res.status(200).json({ success: true, message: 'Письмо отправлено!' });
  } catch (error) {
    console.error('[SendGrid Error]', error.response?.body || error.message); // логируем по-человечески
    res.status(500).json({ success: false, error: 'Ошибка при отправке письма.' });
  }
};

module.exports = handleContactForm;
