
const asyncHandler = require('express-async-handler')
const stripe = require("stripe")(process.env.STRIPE_KEY)

const userStripe = asyncHandler(async (req, res) => {

    stripe.charges.create({
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "baht"
    }, (stipeErr, stripeResponse) => {
        if(stipeErr){
            res.status(400).json({messge:"error from stripe ",error:stipeErr})
        }else{
            res.status(200).json({message:"success",response:stripeResponse})
        }
    }
    )
})


module.exports = {
    userStripe
}