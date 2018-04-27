const keys = require('../config')
const stripe = require('stripe')(keys.STRIPE_SECRET)

module.exports = app => {
        try {
        app.post('/payment/stripe', (req, res) => {
            stripe.charges.create({
                amount: req.body[0],
                currency: 'usd',
                description: `Order Purchase of $${req.body[0] / 100}`,
                source: req.body[1].id
            }).then(response => {
               res.send({
                    trans_id: response.id,
                    trans_amount: response.amount,
                    timestamp: response.created,
                    pmt_type: response.source.object,
                    cc_brand: response.source.brand,
                    last4: response.source.last4,
                    user: response.source.name
                })
            })
        })
    } catch (error) { return error}
}