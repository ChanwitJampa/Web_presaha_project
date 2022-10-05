const express = require('express')
const router = express.Router()
const { getDiscountByUserName, getAllDiscount, setDiscount, deleteDiscount, putDiscount, useDiscount} = require("../controllers/discountController")

router.route('/useDiscount').post(useDiscount)
router.route('/').post(setDiscount).get(getAllDiscount)
router.route('/:id').get(getDiscountByUserName).delete(deleteDiscount).put(putDiscount)

module.exports = router