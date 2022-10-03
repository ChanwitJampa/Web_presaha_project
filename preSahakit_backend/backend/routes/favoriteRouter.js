const express = require('express')
const router = express.Router()
const { getFavoriteItem,setFavoriteItem} = require("../controllers/favoriteController")

router.route('/:userName').get(getFavoriteItem).post(setFavoriteItem)


module.exports = router