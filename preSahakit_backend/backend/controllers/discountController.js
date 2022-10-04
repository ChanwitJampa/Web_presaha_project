
const asyncHandler = require('express-async-handler')
const Discount = require('../models/discountModel')
const User = require('../models/userModel')
const mongoose = require("mongoose");
const itemModel = require('../models/itemModel');
const ObjectId = require('mongoose').Types.ObjectId;
const getDiscountByUserID = asyncHandler(async (req, res) => {
    const userID = req.params.id



    if (!ObjectId.isValid(userID)) {
        res.status(400)
        throw new Error(`${userID} is not Object ID type`)
    }

    const listDiscount = await Discount.find()
    if (!listDiscount) {
        res.status(400)
        throw new Error('Discount id not found')
    }

    console.log(listDiscount)

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
            console.log(listDiscount[i].listUserUsed[j] + " " + mongoose.Types.ObjectId(userID) + "   " + listDiscount[i].listUserUsed[j].equals(mongoose.Types.ObjectId(userID)))
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
        listUser.push(req.body.userID)
        Discount.findByIdAndUpdate(mongoose.Types.ObjectId(discountID), { listUserUsed: listUser }, function (err, result) {
            if (err)
                console.log(err)
        })
        res.status(200).json("sucesss")

    }

})

module.exports = {
    getDiscountByUserID,
    setDiscount,
    useDiscount
}