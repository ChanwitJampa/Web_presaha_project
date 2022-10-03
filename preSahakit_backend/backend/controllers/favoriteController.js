
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')


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
    const {itemID} = req.body
    if (!user) {
        res.status(400)
        throw new Error('user id not found')
    }
    else {

        var test = user.favoriteItem
        test.push(itemID)
      

        var myquery = { userName:req.params.userName  };
        var newvalues = { $set: { favoriteItem: user.favoriteItem } };
        User.updateOne(myquery, newvalues, function (err, res) {
            throw new Error('cant update')
        })

        res.status(200).json(user.favoriteItem)
    }

})



module.exports = {
    getFavoriteItem,
    setFavoriteItem
}