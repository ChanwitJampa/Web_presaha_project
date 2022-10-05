const express = require('express')
const router = express.Router()
const { getCartByUserName, deleteCart, getCarts, updateCart, addItemToCart} = require("../controllers/cartController")

router.route('/').get(getCarts).post(updateCart)
router.route('/addItem/:id').post(addItemToCart)
router.route('/:id').delete(deleteCart).get(getCartByUserName)

module.exports = router