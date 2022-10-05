const express = require('express')
const router = express.Router()
const {getAllFavorite, getFavoriteByUserName, updateFavorite} = require("../controllers/favoriteController")

router.route('/').get(getAllFavorite).post(updateFavorite)
router.route('/:id').get(getFavoriteByUserName)

module.exports = router