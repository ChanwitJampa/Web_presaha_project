const express = require('express')
const router = express.Router()
const {getAllFavorite, getFavoriteByUserName, updateFavorite, getFavorite2} = require("../controllers/favoriteController")

router.route('/').get(getAllFavorite).post(updateFavorite)
router.route('/justID/:id').get(getFavorite2)
router.route('/:id').get(getFavoriteByUserName)

module.exports = router