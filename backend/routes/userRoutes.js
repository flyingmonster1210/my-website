const express = require('express')
const router = express.Router()

const { loginUser, updateUser, getMe } = require('../controllers/userControllers')

router.route('/login').post(loginUser)
router.route('/update').put(updateUser)
router.route('/me').get(getMe)

module.exports = router