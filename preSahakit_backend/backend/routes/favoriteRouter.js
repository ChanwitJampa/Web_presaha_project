const express = require('express')
const router = express.Router()
const {getAllFavorite, getFavoriteByUserName, updateFavorite, getFavorite2, removeFavorite} = require("../controllers/favoriteController")

router.route('/').get(getAllFavorite).post(updateFavorite)
router.route('/justID/:id').get(getFavorite2)
router.route('/:id').get(getFavoriteByUserName).delete(removeFavorite)

module.exports = router