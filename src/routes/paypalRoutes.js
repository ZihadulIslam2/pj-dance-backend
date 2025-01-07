const express = require('express')
const { createPayment, capturePayment } = require('../controllers/paypal.controller')
const routes = express.Router()

// PayPal routes
// Create Payment
routes.post('/create-payment', createPayment)

// Capture Payment
routes.post('/capture-payment', capturePayment)

module.exports = routes