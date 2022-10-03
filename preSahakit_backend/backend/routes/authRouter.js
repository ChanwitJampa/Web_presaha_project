const express = require('express')
const router = express.Router()
const { login} = require('../controllers/authController')


// router.route('/').get(getlogins).post(setlogin)
// router.route('/:id').put(putlogin).delete(deletelogin).get(getlogin)


// router.get('/', getlogin)
router.post('/',login)

// router.put('/:id', putlogin)
// router.delete('/:id', deletelogin)

module.exports = router