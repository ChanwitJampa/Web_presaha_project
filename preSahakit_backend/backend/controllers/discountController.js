
const asyncHandler = require('express-async-handler')
const Discount = require('../models/discountModel')
const User = require('../models/userModel')
const mongoose = require("mongoose");
const itemModel = require('../models/itemModel');
const ObjectId = require('mongoose').Types.ObjectId;

const getAllDiscount = asyncHandler(async (req, res) => {
    const discounts = await Discount.find()
    res.status(200).json(discounts)
})



const getDiscountByUserName = asyncHandler(async (req, res) => {

    const listDiscount = await Discount.find()
    if (!listDiscount) {
        res.status(400)
        throw new Error('Discount id not found')
    }


    const user = await User.findOne({ userName: req.params.id })
    console.log(user)
    if (!user) {
        res.status(400)
        throw new Error(`${req.params.id} userID is not found`)
    }
    const userID = user._id
    console.log("user ID  is" + userID)
    // listDiscount.forEach(myfunction);
    // function myfunction(item,index){   
    //     item.listUserUsed.forEach(myfunction2);
    //     function myfunction2(item2,index2){
    //         console.log(item2 + " " + mongoose.Types.ObjectId(userID) + "   "+ item2.equals(mongoose.Types.ObjectId(userID)) )
    //         if(item2.equals(mongoose.Types.ObjectId(userID))){

    //            // listDiscount.splice(index,1)
    //         }
    //     }

    // }
    for (let i = 0; i < listDiscount.length; i++) {
        for (let j = 0; j < listDiscount[i].listUserUsed.length; j++) {
            console.log(listDiscount[i].listUserUsed[j] + " " + mongoose.Types.ObjectId(userID) + "   ")
            console.log(listDiscount[i].listUserUsed[j].equals(mongoose.Types.ObjectId(userID)))
            if (listDiscount[i].listUserUsed[j].equals(mongoose.Types.ObjectId(userID))) {
                listDiscount.splice(i, 1)
                i--;
                break;
            }

        }
    }


    res.status(200).json(listDiscount)
})


const setDiscount = asyncHandler(async (req, res) => {
    const user = await Discount.create({
        name: req.body.name,
        discountType: req.body.discountType,
        discount: req.body.discount,
        condition: req.body.condition,
        description: req.body.description,
    })
    res.status(200).json(user)
})

const useDiscount = asyncHandler(async (req, res) => {
    const { userName, discountID } = req.body

    if (!ObjectId.isValid(discountID)) {
        res.status(400)
        throw new Error(`${discountID} is not Object ID type`)
    }


    const user = await User.findOne({ userName: userName })
    if (!user) {
        res.status(400)
        throw new Error(`${userName} userName is not found`)
    }
    const userID = user._id
    if(userID==null){
        res.status(400)
        throw new Error(` error from backend userID == null`)
    }
    const discount = await Discount.findById(mongoose.Types.ObjectId(discountID))

    if (!user) {
        res.status(400)
        throw new Error(`${userID} User id not found`)
    }
    else {
        if (!discount) {
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
        listUser.push(userID)
        Discount.findByIdAndUpdate(mongoose.Types.ObjectId(discountID), { listUserUsed: listUser }, function (err, result) {
            if (err)
                console.log(err)
        })
        res.status(200).json("sucesss")

    }

  
    

})

const deleteDiscount = asyncHandler(async (req, res) => {
    const discount = await Discount.findById(req.params.id)
    if (!discount) {
        res.status(400)
        throw new Error('discount id not found')
    }
    await Discount.findByIdAndDelete(req.params.id)
    res.status(200).json(`delete discount success ${req.params.id}`)
})



module.exports = {
    getDiscountByUserName,
    setDiscount,
    useDiscount,
    getAllDiscount,
    deleteDiscount
}