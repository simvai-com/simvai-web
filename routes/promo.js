const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma.cjs');

router.post('/promo-check', async (req, res) => {
  const { code, price } = req.body;

  const promo = await prisma.promoCode.findUnique({
    where: { code: code.trim().toUpperCase() }
  });

  if (!promo) return res.status(400).json({ error: 'Promo code not found' });

  const discount = promo.discount;
  const newPrice = Math.max(0.01, price - (price * discount / 100));

  res.json({ newPrice: newPrice.toFixed(2), discount });
});

module.exports = router;
