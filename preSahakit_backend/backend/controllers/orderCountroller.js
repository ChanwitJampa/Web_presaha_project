
const asyncHandler = require('express-async-handler')
const { hidden } = require('colors');
const mongoose = require("mongoose");

const Item = require('../models/itemModel');
const User = require('../models/userModel');
const Order = require('../models/orderModel');

const ObjectId = require('mongoose').Types.ObjectId;


const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find()
    res.status(200).json(orders)
})



const updateOrder = asyncHandler(async (req, res) => {


    const user = await User.findOne({ userName: req.body.userName })

    if (!user) {
        res.status(400)
        throw new Error(`userID ${req.body.userName} is not found`)
    }

    const userID = user._id


    const order = await Order.findOne({ userID: userID })

    if (order) {
        try {
            const updateOrder = await Order.findByIdAndUpdate(order._id, { userID: userID, Items: req.body.Items }, { new: true })
            res.status(200).json(updateOrder)
        } catch (err) {
            res.status(400)
            throw new Error(`${err}`)
        }
    }
    else {
        const newOrder = new Order({userID:userID, Items:req.body.Items, address:req.body.address, total:req.body.total});
        try {
            const saveOrder = await newOrder.save()
            res.status(200).json(saveOrder)
        } catch (err) {
            console.log(err)
            res.status(400)
            throw new Error(`can't create Order`)
        }
    }

})





const deleteOrder = asyncHandler(async (req, res) => {

    if (!ObjectId.isValid(req.params.id)) {
        res.status(400)
        throw new Error(`${req.params.id} is not Object ID type`)
    }
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "delete succuess ", id: req.params.id })
    } catch (error) {
        res.status(400)
        throw new Error(`${error}`)
    }
    
   
})



const getOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (!order) {
        res.status(400)
        throw new Error('order not found')
    }
    res.status(200).json(order)
})




module.exports = {
    getOrder,
    getOrders,
    updateOrder,
    deleteOrder
}