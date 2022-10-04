
const asyncHandler = require('express-async-handler')
const Discount = require('../models/discountModel')
const User = require('../models/userModel')
const mongoose = require("mongoose")
const ObjectId = require('mongoose').Types.ObjectId;
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

const useDiscount = asyncHandler(async (req, res) => {
    const { userID, discountID } = req.body

    if (!ObjectId.isValid(discountID)) {
        res.status(400) 
        throw new Error(`${discountID} is not Object ID type`)
    }
    if (!ObjectId.isValid(userID)) {
        res.status(400) 
        throw new Error(`${userID} is not Object ID type`)
    }


    const user = await User.findById(mongoose.Types.ObjectId(userID))
    const discount = await Discount.findById(mongoose.Types.ObjectId(discountID))

    if (!user) {
        res.status(400)
        throw new Error(`${userID} User id not found`)
    }
    else {
        if(!discount){
            res.status(400)
            throw new Error(`${discountID} discount ID not found`)
        }

        var listUser = discount.listUserUsed
        var isUsed = listUser.includes(req.body.userID)
        if (isUsed) {
            console.log(listUser)
            res.status(400)
            throw new Error(`Discount ${discountID} has already been used`)
        } 
            
        listUser.push(req.body.userID)
        Discount.findByIdAndUpdate(mongoose.Types.ObjectId(discountID), { listUserUsed: listUser }, function (err, result) {
            if (err)
                console.log(err)
        })
        res.status(200).json("sucesss")
        
    }

})

module.exports = {
    getDiscount,
    setDiscount,
    useDiscount
}