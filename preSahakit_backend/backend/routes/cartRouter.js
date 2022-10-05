const express = require('express')
const router = express.Router()
const { getCart, deleteCart, getCarts, putCart, setCart} = require("../controllers/cartController")

router.route('/').get(getCarts).post(setCart)
router.route('/:id').put(putCart).delete(deleteCart).get(getCart)

module.exports = router