
const asyncHandler = require('express-async-handler')
const Order = require('../models/orderModel')
const { hidden } = require('colors');
const ObjectId = require('mongoose').Types.ObjectId;
const mongoose = require("mongoose");
const Item = require('../models/itemModel')
const User = require('../models/userModel');
const e = require('express');


const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find()
    res.status(200).json(orders)
})




const updateOrder = asyncHandler(async (req, res) => {
    if (!ObjectId.isValid(req.body.itemID)) {
        res.status(400)
        throw new Error(`${req.body.itemID} is not Object ID type`)
    }
    if (!ObjectId.isValid(req.body.userID)) {
        res.status(400)
        throw new Error(`${req.body.userID} is not Object ID type`)
    }
    if (req.body.amount < 0) {
        res.status(400)
        throw new Error(`amount should not be less than 0`)
    }

    var item = await Item.findById(mongoose.Types.ObjectId(req.body.itemID))
    var user = await User.findById(mongoose.Types.ObjectId(req.body.userID))

    if (!item) {
        res.status(400)
        throw new Error(`${req.body.itemID} not found item with this id`)
    }
    if (!user) {
        res.status(400)
        throw new Error(`${req.body.userID} not found user with this id`)
    }


    var order = await Order.findOne({ itemID: mongoose.Types.ObjectId(req.body.itemID), userID: mongoose.Types.ObjectId(req.body.userID) })

    if (order) {
        if (req.body.amount <= 0) {
            const deleteOrder = await Order.findByIdAndDelete(mongoose.Types.ObjectId(order._id))
            res.status(200).json({ message: "delete success", id: req.params.id })
        }
        else {
            const updatedOrder = await Order.findByIdAndUpdate(mongoose.Types.ObjectId(order._id), req.body, { new: true })
            res.status(200).json(updatedOrder)
        }

    } else {
        if(req.body.amount>0){
            const order = await Order.create({
                itemID: req.body.itemID,
                userID: req.body.userID,
                amount: req.body.amount,
            })
            res.status(200).json(order)
        }
        else{
            res.status(400)
            throw new Error(`amount should be more than 0`)
        }
       
    }




})

const getOrderByUserID = asyncHandler(async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400)
        throw new Error(`${req.params.id} is not Object ID type`)
    }
    const order = await Order.findOne({userID:req.params.id})
    res.status(200).json(order)
})




module.exports = {
    getOrders,
    updateOrder,
    getOrderByUserID
}