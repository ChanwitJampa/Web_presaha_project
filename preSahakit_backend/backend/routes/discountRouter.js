const express = require('express')
const router = express.Router()
const { getDiscount, setDiscount, useDiscount} = require("../controllers/discountController")

router.route('/useDiscount').post(useDiscount)
router.route('/').get(getDiscount).post(setDiscount)


module.exports = router