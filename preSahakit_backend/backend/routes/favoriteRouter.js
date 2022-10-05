const express = require('express')
const router = express.Router()
const {getAllFavorite, getFavoriteByUserName, addFavorite, getFavorite2, removeFavorite, updateFavorite} = require("../controllers/favoriteController")

router.route('/').get(getAllFavorite).post(updateFavorite)
router.route('/justID/:id').get(getFavorite2)
router.route('/:id').get(getFavoriteByUserName).delete(removeFavorite).post(addFavorite)

module.exports = router