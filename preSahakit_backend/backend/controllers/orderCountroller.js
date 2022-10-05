
const asyncHandler = require('express-async-handler')
const { hidden } = require('colors');
const mongoose = require("mongoose");

const Item = require('../models/itemModel');
const User = require('../models/userModel');
const Order = require('../models/orderModel');
const Cart = require('../models/cartModel');

const ObjectId = require('mongoose').Types.ObjectId;


const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find()
    res.status(200).json(orders)
})



const addOrder = asyncHandler(async (req, res) => {
    if(!ObjectId.isValid(req.body.cartID)){
        res.status(400)
        throw new Error(`${req.body.cartID} is not Object ID type`)
    }
    if(req.body.address==null){
        res.status(400)
        throw new Error(`require address`)
    }

    const user = await User.findOne({userName:req.body.userName})
    if(!user){
        res.status(400)
        throw new Error(`${req.body.userName} user not found`)
    }
    const userID = user._id

    const cart = await Cart.findById(req.body.cartID)
    if(!cart){
        res.status(400)
        throw new Error(`${req.body.cartID} cart id is not found`)
    }

    if(!cart.userID.equals(user._id)){
        res.status(400)
        throw new Error(`user and cartID not match not found cart on this user`)
    }

    let total =0;
    let count=0;
    for(let i=0; i< cart.Items.length; i++){
        var foundItem = await Item.findById(cart.Items[i].itemID)
        if(!foundItem){
            cart.Items.splice(i,1)
            i--
            count++;
        }
        else{
            total+=foundItem.price*cart.Items[i].amount
        }
    }

    if (count > 0) {
        await Cart.findByIdAndUpdate(cart._id, { userID: userID, Items: cart.Items }, { new: true })
        console.log("update someitem disapear")
    }
    if (cart.Items.length == 0) {
        await Cart.findByIdAndDelete(cart._id)
        console.log("delete cart because items is 0") 
    } 

    const newOrder = await Order.create({
        userID: userID,
        Items: cart.Items,
        total: total,
        address: req.body.address,
    })

    res.status(200).json(newOrder)

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


const getAllOrderByUserName = asyncHandler(async (req, res) => {

    const user = await User.findOne({userName:req.params.id})
    if(!user){
        res.status(400)
        throw new Error(`${req.params.id} userName is not found`)
    }
    const userID = user._id
    
    const order = await Order.find({userID:userID})

    if (!order) {
        res.status(400)
        throw new Error('order not found')
    }
    res.status(200).json(order)
})



module.exports = {
    getOrder,
    getOrders,
    addOrder,
    deleteOrder,
    getAllOrderByUserName
}