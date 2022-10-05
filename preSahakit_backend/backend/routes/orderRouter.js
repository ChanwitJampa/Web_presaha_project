const express = require('express')
const router = express.Router()
const { deleteOrder, getOrder, getOrders, addOrder, getAllOrderByUserName} = require("../controllers/orderCountroller")

router.route('/').get(getOrders).post(addOrder)
router.route('/getByUsername/:id').get(getAllOrderByUserName)
router.route('/:id').delete(deleteOrder).get(getOrder)

module.exports = router