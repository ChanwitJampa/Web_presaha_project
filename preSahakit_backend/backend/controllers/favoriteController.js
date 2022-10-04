
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Item = require('../models/itemModel')
const { default: mongoose } = require('mongoose');
const e = require('express');
const ObjectId = require('mongoose').Types.ObjectId;
//@desc Get favorite
//@route GET /api/users/favoriteItem
//@access Private
const getFavoriteItem = asyncHandler(async (req, res) => {
    const user = await User.findOne({ userName: req.params.userName })
    if (!user) {
        res.status(400)
        throw new Error('user id not found')
    }
    res.status(200).json(user.favoriteItem)
})

//@desc Get user
//@route GET /api/users/:id
//@access Private
const setFavoriteItem = asyncHandler(async (req, res) => {

    const user = await User.findOne({ userName: req.params.userName })
    const { itemID } = req.body
    if (!user) {
        res.status(400)
        throw new Error('user id not found')
    }
    else {
        if (!ObjectId.isValid(itemID)) {
            res.status(400)
            throw new Error('is not Object ID type')
        }
        const item = await Item.findById(mongoose.Types.ObjectId(itemID))

        if (item) {
            var test = user.favoriteItem
            if (!test.includes(itemID)) {
                test.push(itemID)
                var myquery = { userName: req.params.userName };
                var newvalues = { $set: { favoriteItem: user.favoriteItem } };
                User.updateOne(myquery, newvalues, function (err, res) {
                    if (err)
                        console.log(err)
                })
                res.status(200).json(user.favoriteItem)
            }
            else {
                res.status(400)
                throw new Error('Item id is aleady in favorite')
            }


        }
        else {
            res.status(400)
            throw new Error('Item id not found')
        }

    }

})


const removeFavoriteItem = asyncHandler(async (req, res) => {

    const user = await User.findOne({ userName: req.params.userName })
    const { itemID } = req.body
    if (!user) {
        res.status(400)
        throw new Error(`${itemID} user id not found`)
    }
    else {
        if (!ObjectId.isValid(itemID)) {
            res.status(400) 
            throw new Error(`${itemID} is not Object ID type`)
        }
        const item = await Item.findById(mongoose.Types.ObjectId(itemID))

        if (item) {
            var test = user.favoriteItem
            if (test.includes(itemID)) {
                // test.forEach(Myfunction);
                // function Myfunction(e){
                //     console.log(e+ " " +mongoose.Types.ObjectId(itemID)+ "  | "+e.equals(mongoose.Types.ObjectId(itemID)))
                // }

                test = test.filter(e => !e.equals(mongoose.Types.ObjectId(itemID)) );
                var myquery = { userName: req.params.userName };
                var newvalues = { $set: { favoriteItem: test } };
                User.updateOne(myquery, newvalues, function (err, res) {
                    if (err)
                        console.log(err)
                })
                res.status(200).json("delete "+ itemID+" success")
            }
            else {
                res.status(400)
                throw new Error('item ID not found on users favorite')
            }


        }
        else {
            res.status(400)
            throw new Error('Item id not found')
        }

    }

})



module.exports = {
    getFavoriteItem,
    setFavoriteItem,
    removeFavoriteItem
}