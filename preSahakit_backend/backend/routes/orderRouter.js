const express = require('express')
const router = express.Router()
const { deleteOrder, getOrder, getOrders, updateOrder} = require("../controllers/orderCountroller")

router.route('/').get(getOrders).post(updateOrder)
router.route('/:id').delete(deleteOrder).get(getOrder)

module.exports = router