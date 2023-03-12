const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const stripe = Stripe("sk_test_51MkaXICXb1FSA7Fj6UCtnpwxj4U7UIrdnCXQmxLIwYGEamCrMtNn4v3TYdDZ12fXAyFrAY1BnxKhxbSDNLX2dbC500OsJKFoHw")

app.post('/stripe/checkout', async (req, res) => {
    try {
        console.log(req.body);
        const { id, amount } = req.body;
        const payment = await stripe.paymentIntents.create({
        amount: amount,
        currency: "USD",
        description: "Unlocked Phone",
        payment_method: id,
        confirm: true
        
    });
    console.log(payment);
    res.send({message: 'Succesfull Payment'});
    } catch (error) {
        console.log(error);
        res.json({message: error.raw.message})
    }
})

app.listen(3001, () => {
    console.log('server on port 3001')
})