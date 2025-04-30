const express = require('express');
const router = express.Router();
const { createOrder, captureOrder } = require('../lib/paypal');
const prisma = require('../lib/prisma.cjs'); // CJS-обёртка Prisma

router.post('/api/paypal/order', async (req, res) => {
  try {
    const order = await createOrder();
    res.json(order);
  } catch (err) {
    res.status(500).send('Error creating PayPal order');
  }
});

router.post('/api/paypal/capture/:orderId', async (req, res) => {
  try {
    const result = await captureOrder(req.params.orderId);

    const payer = result.payer;
    const purchase = result.purchase_units?.[0]?.payments?.captures?.[0];

    if (!payer || !purchase) {
      return res.status(400).json({ error: 'Invalid PayPal response' });
    }

    const email = payer.email_address;
    const amount = parseFloat(purchase.amount.value);
    const currency = purchase.amount.currency_code;
    const status = purchase.status;

    // Найдём пользователя по email
    const user = await prisma.userSimvai.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found in DB' });
    }

    // Сохраняем транзакцию
    const transaction = await prisma.transaction.create({
      data: {
        userId: user.id,
        amount,
        currency,
        status: status.toLowerCase(),
      },
    });

    res.json({ success: true, transaction });
  } catch (err) {
    console.error('PayPal capture error:', err);
    res.status(500).send('Error capturing PayPal order');
  }
});

module.exports = router;
