const express = require('express')
const router = express.Router()
const { getItem,deleteItem,getItems,putItem,setItem } = require("../controllers/ItemController")

router.route('/').get(getItems).post(setItem)
router.route('/:id').put(putItem).delete(deleteItem).get(getItem)

module.exports = router