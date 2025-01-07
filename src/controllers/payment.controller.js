const Stripe = require("stripe");
const dotenv = require("dotenv");
const Order = require("../models/order.model");
const NewsLetter = require("../models/newsLetter.model");

dotenv.config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const stripePayment = async (req, res) => {
  const { amount, currency } = req.body

  if (!amount || !currency) {
    res.status(404).json({ message: 'Amount and currency are required!' })
    return
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      // Fix typo here
      amount,
      currency,
    })

    const totalAmountInCents = amount * 100

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name: 'Purchase',
            },
            unit_amount: totalAmountInCents,
          },
          quantity: 1,
        },
      ],
      success_url: 'http://localhost:3001/success',
      cancel_url: 'http://localhost:3001/cancel',
    })
    res.status(200).json({
      message: 'Payment Successful!',
      url: session.url,
    })
  } catch (error) {
    res.status(400).json({ message: 'Fail to payment!', error: error.message })
  }
}

// for payment
// const paypalPayment = async (req, res) => {
//   try {
//     const { ticket, name, email, phoneNumber } = req.body;
//     const orderTicket = await Order.create({
//       ticket,
//       name,
//       email,
//       phoneNumber,
//     });

//     res.status(201).json({
//       status: 201,
//       message: "payment successful",
//       data: orderTicket,
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: 500,
//       message: "payment unsuccessful",
//     });
//   }
// };



module.exports = {  stripePayment };
