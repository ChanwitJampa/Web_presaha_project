
const asyncHandler = require('express-async-handler')
const Discount = require('../models/discountModel')

const getDiscount = asyncHandler(async (req, res) => {
    const discount = await Discount.find()
    if (!discount) {
        res.status(400)
        throw new Error('Discount id not found')
    }
    res.status(200).json(discount)
})


const setDiscount = asyncHandler(async (req, res) => {
    const user = await Discount.create({
        name: req.body.name,
        discountType: req.body.discountType,
        discount: req.body.discount,
        condition: req.body.condition,
    })
    res.status(200).json(user)
})

module.exports = {
    getDiscount,
    setDiscount
}