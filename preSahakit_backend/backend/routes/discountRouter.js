const express = require('express')
const router = express.Router()
const { getDiscount, setDiscount} = require("../controllers/discountController")

router.route('/').get(getDiscount).post(setDiscount)


module.exports = router