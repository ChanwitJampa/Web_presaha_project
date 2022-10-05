const express = require('express')
const router = express.Router()
const { getDiscountByUserName, getAllDiscount, setDiscount, deleteDiscount, useDiscount} = require("../controllers/discountController")

router.route('/useDiscount').post(useDiscount)
router.route('/').post(setDiscount).get(getAllDiscount)
router.route('/:id').get(getDiscountByUserName).delete(deleteDiscount)

module.exports = router