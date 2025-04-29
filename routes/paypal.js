const express = require('express');
const router = express.Router();
const { createOrder, captureOrder } = require('../lib/paypal');

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
    const capture = await captureOrder(req.params.orderId);
    res.json(capture);
  } catch (err) {
    res.status(500).send('Error capturing PayPal order');
  }
});

module.exports = router;
