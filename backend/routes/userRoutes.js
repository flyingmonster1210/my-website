const express = require('express')
const router = express.Router()

const { loginUser, updateUser, getMe, registerUser, deleteUser } = require('../controllers/userControllers')
const { protect } = require('../middlewares/authMiddleware')

router.route('/login').post(loginUser)
router.route('/register').post(registerUser)
router.route('/delete/:id').delete(protect, deleteUser)
router.route('/update/:id').put(protect, updateUser)
router.route('/me').get(protect, getMe)

module.exports = router