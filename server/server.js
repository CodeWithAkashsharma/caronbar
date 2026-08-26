import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { connectDB } from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Middleware
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

// Razorpay Instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || process.env.VITE_RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { error: 'Too many requests from this IP, please try again later.' }
});
app.use('/api', limiter);

// Connect DB
connectDB();

// Mock Data In-Memory Collections for standalone execution
import { SERVICES_DATA } from '../src/data/servicesData.js';
import { PACKAGES_DATA, ADDONS_DATA } from '../src/data/packagesData.js';
import { VEHICLE_TYPES } from '../src/data/vehicleTypes.js';
import { INITIAL_MOCK_BOOKINGS } from '../src/data/mockBookings.js';

let mockBookingsDB = [...INITIAL_MOCK_BOOKINGS];

// Healthcheck
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'AURA DETAILED REST API',
    timestamp: new Date().toISOString(),
    version: '2026.1.0'
  });
});

// Services endpoints
app.get('/api/services', (req, res) => {
  res.json({ success: true, count: SERVICES_DATA.length, data: SERVICES_DATA });
});

app.get('/api/services/:slug', (req, res) => {
  const service = SERVICES_DATA.find(s => s.slug === req.params.slug || s.id === req.params.slug);
  if (!service) {
    return res.status(404).json({ success: false, message: 'Service not found' });
  }
  res.json({ success: true, data: service });
});

// Packages endpoints
app.get('/api/packages', (req, res) => {
  res.json({ success: true, data: PACKAGES_DATA, addons: ADDONS_DATA });
});

// Vehicle types
app.get('/api/vehicles', (req, res) => {
  res.json({ success: true, data: VEHICLE_TYPES });
});

// Bookings endpoints
app.get('/api/bookings', (req, res) => {
  res.json({ success: true, count: mockBookingsDB.length, data: mockBookingsDB });
});

app.get('/api/bookings/:id', (req, res) => {
  const booking = mockBookingsDB.find(b => b.id.toLowerCase() === req.params.id.toLowerCase());
  if (!booking) {
    return res.status(404).json({ success: false, message: 'Booking ID not found' });
  }
  res.json({ success: true, data: booking });
});

app.post('/api/bookings', (req, res) => {
  const { customerName, customerEmail, customerPhone, serviceName, vehicleType, totalAmount, date, timeSlot, address } = req.body;
  const newBooking = {
    id: `GC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    customerName,
    customerEmail,
    customerPhone,
    serviceName,
    vehicleType,
    totalAmount,
    date,
    timeSlot,
    address,
    status: 'Confirmed',
    paymentStatus: 'Paid',
    createdAt: new Date().toISOString()
  };
  mockBookingsDB.unshift(newBooking);
  res.status(201).json({ success: true, message: 'Booking created successfully', data: newBooking });
});

app.patch('/api/bookings/:id/status', (req, res) => {
  const { status, detailerName } = req.body;
  const bookingIndex = mockBookingsDB.findIndex(b => b.id.toLowerCase() === req.params.id.toLowerCase());
  if (bookingIndex === -1) {
    return res.status(404).json({ success: false, message: 'Booking not found' });
  }
  mockBookingsDB[bookingIndex].status = status;
  if (detailerName) mockBookingsDB[bookingIndex].detailerName = detailerName;
  res.json({ success: true, message: 'Status updated', data: mockBookingsDB[bookingIndex] });
});

// Admin stats
app.get('/api/admin/analytics', (req, res) => {
  const totalRevenue = mockBookingsDB.reduce((sum, b) => sum + (b.totalAmount || 0), 0);
  const totalBookings = mockBookingsDB.length;
  const pendingCount = mockBookingsDB.filter(b => b.status === 'Confirmed' || b.status === 'On The Way').length;
  const completedCount = mockBookingsDB.filter(b => b.status === 'Completed').length;

  res.json({
    success: true,
    data: {
      totalRevenue,
      totalBookings,
      pendingCount,
      completedCount,
      monthlyRevenue: [
        { month: 'Mar', revenue: 14200 },
        { month: 'Apr', revenue: 18900 },
        { month: 'May', revenue: 22400 },
        { month: 'Jun', revenue: 26800 },
        { month: 'Jul', revenue: 31500 },
        { month: 'Aug', revenue: 38900 }
      ],
      vehicleDistribution: [
        { name: 'SUV / Crossover', percentage: 42 },
        { name: 'Executive Sedan', percentage: 33 },
        { name: 'Exotic Supercar', percentage: 15 },
        { name: 'Hatchback', percentage: 10 }
      ]
    }
  });
});

// ==========================================
// RAZORPAY STANDARD CHECKOUT BACKEND ROUTES
// ==========================================

// STEP 1: BACKEND - Create Order
// Endpoint: POST /api/create-order
app.post('/api/create-order', async (req, res) => {
  try {
    const { amount, currency = 'INR', receipt, notes } = req.body;

    // Validate amount >= 100 paise (₹1.00)
    const amountNum = Number(amount);
    if (!amountNum || amountNum < 100) {
      return res.status(400).json({
        success: false,
        error: 'Amount must be at least 100 paise (₹1.00)'
      });
    }

    if (!process.env.RAZORPAY_KEY_SECRET && !process.env.VITE_RAZORPAY_KEY_ID) {
      return res.status(401).json({
        success: false,
        error: 'Razorpay API credentials not configured on server'
      });
    }

    const options = {
      amount: Math.round(amountNum),
      currency,
      receipt: receipt || `rcpt_${Date.now()}`,
      notes: notes || {}
    };

    const order = await razorpay.orders.create(options);

    return res.status(200).json({
      success: true,
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt
    });
  } catch (error) {
    console.error('Razorpay Create Order Error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to create Razorpay order'
    });
  }
});

// STEP 3: BACKEND - Verify Signature
// Endpoint: POST /api/verify-payment
app.post('/api/verify-payment', (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        error: 'Missing required payment verification fields'
      });
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      return res.status(401).json({
        success: false,
        error: 'Razorpay Key Secret is not configured on server'
      });
    }

    // Algorithm: HMAC-SHA256(order_id + "|" + payment_id, KEY_SECRET)
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(body)
      .digest('hex');

    if (expectedSignature === razorpay_signature) {
      return res.status(200).json({
        success: true,
        message: 'Payment signature verified successfully',
        payment_id: razorpay_payment_id,
        order_id: razorpay_order_id
      });
    } else {
      return res.status(400).json({
        success: false,
        error: 'Invalid payment signature. Signature mismatch.'
      });
    }
  } catch (error) {
    console.error('Razorpay Verify Payment Error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Payment verification failed'
    });
  }
});

app.listen(PORT, () => {
  console.log(`[AURA REST API] Operating live on http://localhost:${PORT}`);
});
