const express = require('express')
const router = express.Router()
const { getCartByUserName, deleteCart, getCarts, updateCart} = require("../controllers/cartController")

router.route('/').get(getCarts).post(updateCart)
router.route('/:id').delete(deleteCart).get(getCartByUserName)

module.exports = router