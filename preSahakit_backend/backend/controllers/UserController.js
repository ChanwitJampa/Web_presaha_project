
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { getMaxListeners } = require('../models/userModel');
const { hidden } = require('colors');

//@desc Get users
//@route GET /api/users
//@access Private
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find()
    res.status(200).json(users)
})



//@desc Set user
//@route POST /api/users
//@access Private
const setUser = asyncHandler(async (req, res) => {

    const { userName: userName, password } = req.body
    var oldUser
    if (userName) {
        oldUser = await User.findOne({ userName: userName })

        if (oldUser) {
            res.status(400)
            throw new Error('userName user is aleady use')
        }
    }
    else {
        res.status(400)
        throw new Error(' please add userName value')
    }

    encryptedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
        userName: req.body.userName,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address : req.body.address,
        role: req.body.role,
        hospitalID: req.body.hospitalID,
        // role: req.body.role === undefined ? "hospital" : req.body.role
    })
    oldUser = await User.findOne({ userName }).select('+role')
    //create token
    const token = jwt.sign(
        { user_id: user._id, userName, role: oldUser.role },
        process.env.TOKEN_KEY, {
        expiresIn: "24h"
    }
    )

    //save user token
    user.token = token


    res.status(200).json(oldUser)

})




//@desc Update user
//@route PUT /api/users/:id
//@access Private
const putUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        res.status(400)
        throw new Error('user id not found')
    }

    const updateduser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(updateduser)
})

//@desc Delete user
//@route DELETE /api/users
//@access Private
const deleteUserByGmail = asyncHandler(async (req, res) => {
    const { userName: userName } = req.body
    const user = await User.findOne({ userName: userName })
    if (!user) {
        res.status(400)
        throw new Error('user not found')
    }
    user.remove()


    res.status(200).json({ userName: userName })
})




//@desc Delete user
//@route DELETE /api/users/:id
//@access Private
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        res.status(400)
        throw new Error('user id not found')
    }
    const deleteuser = await User.findByIdAndDelete(req.params.id)
    res.status(200).json({ id: req.params.id })
})



//@desc Get user
//@route GET /api/users/:id
//@access Private
const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        res.status(400)
        throw new Error('user id not found')
    }
    res.status(200).json(user)
})

//@desc Get favorite
//@route GET /api/users/favoriteItem
//@access Private
const getFavoriteItem = asyncHandler(async (req, res) => {
    const { userName: userName } = req.body
    const user = await User.findOne({ userName })
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
    console.log("1")
    const { itemID, userName } = req.body
    const user = await User.findOne({ userName })
    if (!user) {
        res.status(400)
        throw new Error('user id not found')
    }
    else {

        var test = user.favoriteItem
        test.push(itemID)
      

        var myquery = { userName };
        var newvalues = { $set: { favoriteItem: user.favoriteItem } };
        User.updateOne(myquery, newvalues, function (err, res) {
            throw new Error('cant update')
        })

        res.status(200).json(user.favoriteItem)
    }

})



module.exports = {
    deleteUserByGmail,
    getUsers,
    setUser,
    putUser,
    deleteUser,
    getUser,
    getFavoriteItem,
    setFavoriteItem
}