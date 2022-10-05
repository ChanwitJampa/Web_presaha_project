
const asyncHandler = require('express-async-handler')
const { hidden } = require('colors');
const mongoose = require("mongoose");
const Cart = require('../models/cartModel');
const ObjectId = require('mongoose').Types.ObjectId;


const getCarts = asyncHandler(async (req, res) => {
    const carts = await Cart.find()
    res.status(200).json(carts)
})



const setCart = asyncHandler(async (req, res) => {
    if (!ObjectId.isValid(userID)) {
        res.status(400)
        throw new Error(`${userID} is not Object ID type`)
    }
    const newCart = new Cart(req.body);
    try {
        const saveCart = await newCart.save()
        res.status(200).json(saveCart)
    } catch (err) {
        console.log(err)
        res.status(400)
        throw new Error(`can't create Cart`)
    }
})





const putCart = asyncHandler(async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id,
            { $set: req.body, },
            { new: true }
        );
        res.status(200).json(updatedCart);
    } catch (err) {
        res.status(400)
        throw new Error(`can't update create Cart`)
    }
})



const deleteCart = asyncHandler(async (req, res) => {
   
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400)
        throw new Error(`${userID} is not Object ID type`)
    }
    await Item.findByIdAndDelete(req.params.id)
    res.status(200).json({message:"delete succuess ", id: req.params.id })
})



const getCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findById(req.params.id)
    if (!cart) {
        res.status(400)
        throw new Error('cart not found')
    }
    res.status(200).json(cart)
})




module.exports = {
    getCart,
    getCarts,
    setCart,
    putCart,
    deleteCart
}