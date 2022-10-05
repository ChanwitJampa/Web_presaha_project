const express = require('express')
const router = express.Router()
const {userStripe } = require("../controllers/stripeController")
 router.route('/').post(userStripe)


module.exports = router