const express = require('express')
const router = express.Router()
const { getDiscountByUserID, setDiscount, useDiscount} = require("../controllers/discountController")

router.route('/useDiscount').post(useDiscount)
router.route('/').post(setDiscount)
router.route('/:id').get(getDiscountByUserID)

module.exports = router