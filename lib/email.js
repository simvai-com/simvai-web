const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY); // Или вставь ключ напрямую

async function sendPaymentConfirmationEmail({ to, amount }) {
  try {
    const msg = {
      to,
      from: 'noreply@simvai.com', // <-- обязательно настроить домен в SendGrid
      subject: 'Оплата прошла успешно',
      html: `
  <div style="font-family: Arial, sans-serif; background: #ffffff; color: #000; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px;">
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="https://simvai.com/assets/images/simvai/simvai-full-logo.png" alt="SIMVAI" style="max-width: 180px;" />
    </div>
    <h2 style="color: #D80027; text-align: center;">Запись на конференцию подтверждена</h2>
    <p style="font-size: 16px; line-height: 1.6;">
      Спасибо за оплату! Вы успешно зарегистрировались на участие в конференции SIMVAI.
    </p>
    <ul style="font-size: 16px; line-height: 1.6; padding-left: 20px;">
      <li>💼 Участие в конференции</li>
      <li>📜 Сертификат</li>
      <li>🌐 Онлайн трансляция</li>
      <li>💳 Сумма оплаты: <strong>$${amount}</strong></li>
    </ul>
    <p style="font-size: 14px; color: #555;">Если у вас есть вопросы — просто ответьте на это письмо.</p>
    <div style="text-align: center; margin-top: 30px;">
      <a href="https://simvai.com" style="background: #D80027; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-size: 16px;">
        Вернуться на сайт
      </a>
    </div>
  </div>
`,
    };

    await sgMail.send(msg);
    console.log(`📧 Email успешно отправлен на ${to}`);
  } catch (error) {
    console.error('❌ Ошибка отправки:', error.response?.body || error.message);
  }
}

module.exports = { sendPaymentConfirmationEmail };
