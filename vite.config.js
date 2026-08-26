import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import Razorpay from 'razorpay'
import crypto from 'crypto'

// Razorpay backend API middleware plugin for Vite dev server
function razorpayDevApiPlugin() {
  return {
    name: 'razorpay-dev-api-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const env = loadEnv('development', process.cwd(), '');
        const keyId = env.RAZORPAY_KEY_ID || env.VITE_RAZORPAY_KEY_ID;
        const keySecret = env.RAZORPAY_KEY_SECRET;

        // 1. Create Order Endpoint
        if (req.url === '/api/create-order' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => (body += chunk));
          req.on('end', async () => {
            try {
              const { amount, currency = 'INR', receipt, notes } = JSON.parse(body || '{}');
              const amountNum = Number(amount);
              if (!amountNum || amountNum < 100) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({ success: false, error: 'Amount must be at least 100 paise (₹1.00)' }));
              }

              if (!keySecret) {
                res.statusCode = 401;
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({ success: false, error: 'Razorpay Key Secret is not configured' }));
              }

              const rzp = new Razorpay({ key_id: keyId, key_secret: keySecret });
              const order = await rzp.orders.create({
                amount: Math.round(amountNum),
                currency,
                receipt: receipt || `rcpt_${Date.now()}`,
                notes: notes || {}
              });

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                success: true,
                order_id: order.id,
                amount: order.amount,
                currency: order.currency,
                receipt: order.receipt
              }));
            } catch (err) {
              console.error('Vite Dev Razorpay Order Error:', err);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, error: err.message || 'Failed to create order' }));
            }
          });
          return;
        }

        // 2. Verify Signature Endpoint
        if (req.url === '/api/verify-payment' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => (body += chunk));
          req.on('end', () => {
            try {
              const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = JSON.parse(body || '{}');
              if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({ success: false, error: 'Missing required payment verification fields' }));
              }

              if (!keySecret) {
                res.statusCode = 401;
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({ success: false, error: 'Razorpay Key Secret is not configured' }));
              }

              const expectedSignature = crypto
                .createHmac('sha256', keySecret)
                .update(`${razorpay_order_id}|${razorpay_payment_id}`)
                .digest('hex');

              if (expectedSignature === razorpay_signature) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({
                  success: true,
                  message: 'Payment signature verified successfully',
                  payment_id: razorpay_payment_id,
                  order_id: razorpay_order_id
                }));
              } else {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({ success: false, error: 'Invalid payment signature' }));
              }
            } catch (err) {
              console.error('Vite Dev Razorpay Verify Error:', err);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, error: err.message || 'Verification failed' }));
            }
          });
          return;
        }

        next();
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), razorpayDevApiPlugin()],
  server: {
    host: true,
    allowedHosts: true,
  },
})
