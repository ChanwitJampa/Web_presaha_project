
const asyncHandler = require('express-async-handler')
const { hidden } = require('colors');
const mongoose = require("mongoose");

const Cart = require('../models/cartModel');
const Item = require('../models/itemModel');
const User = require('../models/userModel');

const ObjectId = require('mongoose').Types.ObjectId;


const getCarts = asyncHandler(async (req, res) => {
    const carts = await Cart.find()
    res.status(200).json(carts)
})

const addItemToCart = asyncHandler(async (req, res) => {
    const user = await User.findOne({ userName: req.params.id })

    if (!user) {
        res.status(400)
        throw new Error(`userID ${req.params.id} is not found`)
    }

    const item = await Item.findById(req.body.itemID)

    if (!item) {
        res.status(400)
        throw new Error(`item ${req.body.itemID} is not found`)
    }

    const cart = await Cart.findOne({ userID: user._id })


    if (!cart) {
        var newCart = await Cart.create({
            userID: user._id,
            Items: [{ itemID: item._id, name: item.name, price: item.price, description: item.description, imagePath: item.imagePath, amount: req.body.amount }]
        })
        res.status(200).json(newCart)
    }
    else {
        let check = 0
        var listItems = cart.Items
        for (let i = 0; i < listItems.length; i++) {
            if (listItems[i].itemID.equals(req.body.itemID)) {

                listItems[i].amount += req.body.amount
                if (listItems[i].amount <= 0) {
                    console.log(listItems[i].amount)
                    listItems.splice(i, 1)
                    const newCart = await Cart.findByIdAndUpdate(cart._id, { Items: listItems }, { new: true })
                    res.status(200).json(newCart)
                    check = 1
                    break;

                } else {
                    console.log(listItems[i].amount)
                    const newCart = await Cart.findByIdAndUpdate(cart._id, { Items: listItems }, { new: true })
                    res.status(200).json(newCart)
                    check = 1
                    break;
                }
                

            }

        }
        if (check == 0 && amount >0) {
            const foundItem = await Item.findById(req.body.itemID)
            cart.Items.push({ itemID: foundItem._id, name: foundItem.name, price: foundItem.price, description: foundItem.description, imagePath: foundItem.imagePath, amount: req.body.amount })
            const newCart = await Cart.findByIdAndUpdate(cart._id, { Items: cart.Items }, { new: true })
            res.status(200).json(newCart)
        }else if(check==0){
            res.status(400)
            throw new Error(`can't `)
        }
    }


})

const updateCart = asyncHandler(async (req, res) => {

    const user = await User.findOne({ userName: req.body.userName })

    if (!user) {
        res.status(400)
        throw new Error(`userID ${req.body.userName} is not found`)
    }

    const userID = user._id
    var newListItems = []
    var listItems = req.body.Items
    for (let i = 0; i < listItems.length; i++) {
        if (!ObjectId.isValid(listItems[i].itemID)) {
            res.status(400)
            throw new Error(`${listItems[i].itemID} is not Object ID type`)
        }
        const itemFound = await Item.findById(listItems[i].itemID)
        if (!itemFound) {
            res.status(400)
            throw new Error(`${listItems[i].itemID} item is not found`)
        }
        if (!listItems[i].amount > 0) {
            res.status(400)
            throw new Error(`${listItems[i].itemID}  amount should be more than 0`)
        }
        newListItems.push({ itemID: itemFound._id, name: itemFound.name, price: itemFound.price, description: itemFound.description, imagePath: itemFound.imagePath, amount: listItems[i].amount })

    }

    const cart = await Cart.findOne({ userID: userID })

    if (cart) {
        try {
            const updateCart = await Cart.findByIdAndUpdate(cart._id, { userID: userID, Items: newListItems }, { new: true })
            res.status(200).json(updateCart)
        } catch (err) {
            res.status(400)
            throw new Error(`${err}`)
        }
    }
    else {

        const newCart = new Cart({ userID: userID, Items: newListItems });
        try {
            const saveCart = await newCart.save()
            res.status(200).json(saveCart)
        } catch (err) {
            console.log(err)
            res.status(400)
            throw new Error(`can't create Cart`)
        }
    }

})


const deleteCart = asyncHandler(async (req, res) => {

    if (!ObjectId.isValid(req.params.id)) {
        res.status(400)
        throw new Error(`${req.params.id} is not Object ID type`)
    }
    await Cart.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: "delete succuess ", id: req.params.id })
})



const getCartByUserName = asyncHandler(async (req, res) => {

    const user = await User.findOne({ userName: req.params.id })
    if (!user) {
        res.status(400)
        throw new Error(`${req.params.id} userName not found`)
    }
    const userID = user._id
    const cart = await Cart.findOne({ userID: userID })
    if (!cart) {
        res.status(200).json([])

    } else {
        let count = 0;
        for (let i = 0; i < cart.Items.length; i++) {
            // console.log(cart.Items[i].itemID)
            let findItem = await Item.findById(cart.Items[i].itemID)
            if (!findItem) {
                //  console.log("found " + findItem)
                cart.Items.splice(i, 1)
                i--
                count++
            }

        }
        if (count > 0) {
            await Cart.findByIdAndUpdate(cart._id, { userID: userID, Items: cart.Items }, { new: true })
            console.log("update someitem disapear")
        }
        if (cart.Items.length == 0) {
            const newCart2 = await Cart.findByIdAndDelete(cart._id)
            console.log(cart._id)
            res.status(200).json([])
        } else {
            res.status(200).json(cart)
        }

    }

})




module.exports = {
    getCartByUserName,
    getCarts,
    updateCart,
    deleteCart,
    addItemToCart
}