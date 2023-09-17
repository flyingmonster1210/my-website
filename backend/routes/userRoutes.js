const express = require('express')
const router = express.Router()

const { loginUser, updateUser, getMe, registerUser } = require('../controllers/userControllers')

router.route('/login').post(loginUser)
router.route('/register').post(registerUser)
router.route('/update/:id').put(updateUser)
router.route('/me').get(getMe)

module.exports = router