const express = require('express')
const router = express.Router()
const { getFavoriteItem, setFavoriteItem, removeFavoriteItem} = require("../controllers/favoriteController")

router.route('/:userName').get(getFavoriteItem).post(setFavoriteItem).delete(removeFavoriteItem)


module.exports = router