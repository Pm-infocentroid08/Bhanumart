const path = require('path')
const express = require('express')
const stripe = require('stripe')('sk_test_51ItsK4SItlXBImGoC0WN2RIzPotChXHybi48es7QCZhX2L0y92UTxTqYFzc2W3sjGkFfcRekYXnKOEQuFcQfpJSO00tMn45AUH')
const cors = require('cors')

const app = express()
app.use(cors())

app.post('/api/payments/mobile/create', async (req, res) => {
    const total = req.query.total;
    const token = req.query.token;

    console.log(`Payment Request Recieved for the amount : ${total} >>> token: ${token}`)

    stripe.charges.create({
        amount: total,
        currency: 'inr',
        source: token
    }).then(charge => {
        res.status(200).send(charge);
    }).catch(e => console.log(e));

})

app.listen(4000);