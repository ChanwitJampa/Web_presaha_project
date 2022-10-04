const express = require('express')
const router = express.Router()
const { getOrderByUserID, updateOrder, getOrders } = require("../controllers/orderCountroller")

router.route('/').get(getOrders).post(updateOrder)
router.route('/:id').get(getOrderByUserID)

module.exports = router