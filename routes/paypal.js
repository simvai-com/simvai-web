const express = require('express');
const router = express.Router();

const { createOrder, captureOrder } = require('../lib/paypal');
const prisma = require('../lib/prisma.cjs');
const { sendPaymentConfirmationEmail } = require('../lib/email');

// POST /api/paypal/order
router.post('/order', async (req, res) => {
  try {
    const { price } = req.body;
    const finalPrice = parseFloat(price);

    if (!finalPrice || isNaN(finalPrice)) {
      return res.status(400).json({ error: 'Invalid price provided' });
    }

    const order = await createOrder(finalPrice.toFixed(2));
    res.json({ order, finalPrice });
  } catch (err) {
    console.error('Error creating PayPal order:', err);
    res.status(500).send('Error creating PayPal order');
  }
});

// POST /api/paypal/capture/:orderId
router.post('/capture/:orderId', async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const { promoCode } = req.body; // ✅ получаем промокод от клиента

  try {
    const result = await captureOrder(req.params.orderId);
    const purchase = result.purchase_units?.[0]?.payments?.captures?.[0];

    if (!purchase) {
      return res.status(400).json({ error: 'Invalid PayPal response' });
    }

    const amount = parseFloat(purchase.amount.value);
    const currency = purchase.amount.currency_code;
    const status = purchase.status;

    const transaction = await prisma.transaction.create({
      data: {
        userId: user.id,
        amount,
        currency,
        status: status.toLowerCase(),
        promoCode: promoCode || null, // ✅ сохраняем
      },
    });

    if (status === 'COMPLETED') {
      sendPaymentConfirmationEmail({ to: user.email, amount }).catch(console.error);
    }

    res.json({ success: true, transaction });
  } catch (err) {
    console.error('PayPal capture error:', err);
    res.status(500).send('Error capturing PayPal order');
  }
});

module.exports = router;
