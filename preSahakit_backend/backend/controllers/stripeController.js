
const asyncHandler = require('express-async-handler')
const stripe = require("stripe")(process.env.STRIPE_KEY)

// const User = require('../models/');
const Cart = require('../models/cartModel');
const Item = require('../models/itemModel');

const userStripe = asyncHandler(async (req, res) => {
    console.log(req.body.cartID)
    const cart = await Cart.findById(req.body.cartID)

    if(!cart){
        res.status(400)
        throw new Error(`cart not found with this cartID`)
    }

    var listItem = cart.Items
    let total=0
    for(let i=0; i<listItem.length; i++){
        const item = await Item.findById(listItem[i].itemID)
        total +=item.price*listItem[i].amount
    }
    console.log(total)
    stripe.charges.create({
        source: req.body.tokenId,
        amount: total,
        currency: "USD"
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