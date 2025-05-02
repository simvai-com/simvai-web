const paypal = require('@paypal/checkout-server-sdk');

function environment() {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  return new paypal.core.LiveEnvironment(clientId, clientSecret);
}

function client() {
  return new paypal.core.PayPalHttpClient(environment());
}

// Создание заказа с передачей суммы
async function createOrder(price) {
  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer("return=representation");

  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [{
      amount: {
        currency_code: "EUR",
        value: price.toString()
      }
    }]
  });

  try {
    const order = await client().execute(request);
    return order.result;
  } catch (err) {
    console.error('PayPal createOrder error:', err);
    throw err;
  }
}

async function captureOrder(orderId) {
  const request = new paypal.orders.OrdersCaptureRequest(orderId);
  request.requestBody({});
  try {
    const capture = await client().execute(request);
    return capture.result;
  } catch (err) {
    console.error('PayPal captureOrder error:', err);
    throw err;
  }
}

module.exports = { createOrder, captureOrder };
